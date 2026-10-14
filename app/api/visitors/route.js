import { NextResponse } from "next/server"
import { getVisitorCount, VISIT_ID_PATTERN } from "@/lib/visitor-counter.mjs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const headers = { "Cache-Control": "no-store, max-age=0" }

function unavailable() {
  return NextResponse.json({ error: "Visitor count is temporarily unavailable." }, { status: 503, headers })
}

export async function GET() {
  try {
    return NextResponse.json({ count: await getVisitorCount() }, { headers })
  } catch {
    return unavailable()
  }
}

export async function POST(request) {
  const origin = request.headers.get("origin")
  let sameOrigin = false
  try { sameOrigin = Boolean(origin) && new URL(origin).host === request.headers.get("host") }
  catch { /* Invalid origins are rejected below. */ }
  if (!sameOrigin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers })
  }
  if (!body || !VISIT_ID_PATTERN.test(body.visitId || "")) {
    return NextResponse.json({ error: "Invalid visit ID." }, { status: 400, headers })
  }

  // Search crawlers and link previews can read the total without adding a visitor.
  const isBot = /bot|crawler|spider|slurp|headless|preview/i.test(request.headers.get("user-agent") || "")
  try {
    const count = await getVisitorCount(isBot ? undefined : body.visitId)
    return NextResponse.json({ count }, { headers })
  } catch {
    return unavailable()
  }
}
