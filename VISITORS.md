# Total visits counter

The **Total Visits** badge starts at **158**, the last total provided by the site
owner. Every new document load (opening the website, returning later, or refreshing)
adds one visit, including revisits from the same browser. Navigating between Home
and Projects through in-site links does not add another visit. This is a cumulative
total, not a count of currently active users or unique people.

Each document load gets a new random visit ID, held only in memory. React Strict
Mode, component remounts, and request retries reuse that ID so they do not count the
same load twice. Duplicate request IDs expire after 24 hours; the accumulated total
never expires. Common crawlers and link-preview user agents are excluded. This is
not an abuse-proof analytics system.

The starting value is used only when storage is empty, and never overwrites an
existing total. The previous unique-browser counter is kept separate; old local
`visitors.json` and Redis `unique-visitors:v1` data are not converted to visit totals.

## Local preview

Run `npm run dev`. Without Redis credentials, development uses `.data/visits.json`.
This file survives dev-server restarts and is ignored by Git. Local totals are
separate from production. The file backend is for a single local dev server.

## Production on Vercel

1. Create an Upstash account and Redis database at https://console.upstash.com, or
   add Upstash Redis from your project's Vercel Marketplace integration.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `UPSTASH_REDIS_REST_URL`: the database REST URL.
   - `UPSTASH_REDIS_REST_TOKEN`: the database REST token.
   - `VISITOR_COUNTER_KEY`: `gip-space:total-visits:v1` (optional default).
   Vercel Marketplace may instead create `KV_REST_API_URL` and `KV_REST_API_TOKEN`;
   these names are also supported, so no duplicate credentials are needed.
3. Redeploy. Empty storage starts at 158; the first new browser visit makes it 159.
4. Use another database or a different `VISITOR_COUNTER_KEY` for Preview deployments.

To test Redis locally, copy `.env.example` to `.env.local`, fill in the REST values,
and restart the dev server. Keep credentials server-side; never commit `.env.local`
or use `NEXT_PUBLIC_` for the token. Seeding, incrementing, and request deduplication
use one atomic Redis Lua script to avoid losing concurrent visits.

Production does not use filesystem or temporary storage as a fallback. If Redis is
not configured or unavailable, the badge shows `—` with a retry button, and the API
returns 503. It never displays a fabricated live total or silently resets the count.

## Checks

`node --test tests/visitor-counter.test.mjs`

Reference: https://upstash.com/docs/redis/features/restapi
