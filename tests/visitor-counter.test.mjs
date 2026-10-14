import test, { after, before } from "node:test"
import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { getVisitorCount } from "../lib/visitor-counter.mjs"

const originalEnv = { ...process.env }
const originalFetch = globalThis.fetch
let directory

before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "gip-visitors-test-"))
  process.env.NODE_ENV = "test"
  process.env.VISITOR_DATA_FILE = path.join(directory, "visitors.json")
  delete process.env.UPSTASH_REDIS_REST_URL
  delete process.env.UPSTASH_REDIS_REST_TOKEN
})
after(async () => {
  globalThis.fetch = originalFetch
  process.env = originalEnv
  await rm(directory, { recursive: true, force: true })
})

test("a fresh counter starts at 158 without registering a visit", async () => {
  assert.equal(await getVisitorCount(), 158)
})

test("Strict Mode and simultaneous retries count one document load once", async () => {
  const id = randomUUID()
  const results = await Promise.all(Array.from({ length: 20 }, () => getVisitorCount(id)))
  assert.ok(results.every(count => count === 159))
  assert.equal(await getVisitorCount(id), 159)
})

test("a new load or refresh from the same browser adds another visit", async () => {
  assert.equal(await getVisitorCount(randomUUID()), 160)
})

test("simultaneous document loads do not lose increments", async () => {
  await Promise.all(Array.from({ length: 10 }, () => getVisitorCount(randomUUID())))
  assert.equal(await getVisitorCount(), 170)
})

test("count and duplicate IDs survive a process restart", async () => {
  const stored = JSON.parse(await readFile(process.env.VISITOR_DATA_FILE, "utf8"))
  const moduleUrl = new URL("../lib/visitor-counter.mjs", import.meta.url).href
  const script = `import { getVisitorCount } from ${JSON.stringify(moduleUrl)}; console.log(await getVisitorCount(${JSON.stringify(Object.keys(stored.recentVisits)[0])}))`
  assert.equal(execFileSync(process.execPath, ["--input-type=module", "-e", script], { encoding: "utf8" }).trim(), "170")
})

test("invalid IDs cannot change the count", async () => {
  await assert.rejects(getVisitorCount("invalid-id"), /Invalid visit ID/)
  assert.equal(await getVisitorCount(), 170)
})

test("production requires configured Redis instead of using a local count", async () => {
  process.env.NODE_ENV = "production"
  await assert.rejects(getVisitorCount(), /not configured/)
  process.env.NODE_ENV = "test"
})

test("Redis uses atomic duplicate registration and validates the response", async () => {
  process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io"
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-only-token"
  process.env.VISITOR_COUNTER_KEY = "test:visitors"
  const id = randomUUID()
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://example.upstash.io")
    assert.equal(options.headers.Authorization, "Bearer test-only-token")
    const command = JSON.parse(options.body)
    assert.equal(command[0], "EVAL")
    assert.match(command[1], /INCR/)
    assert.match(command[1], /NX/)
    assert.match(command[1], /EX/)
    assert.deepEqual(command.slice(2), ["2", "test:visitors", `test:visitors:request:${id}`, "158", "86400"])
    assert.equal(options.cache, "no-store")
    return Response.json({ result: 42 })
  }
  assert.equal(await getVisitorCount(id), 42)
  globalThis.fetch = async (_, options) => {
    const command = JSON.parse(options.body)
    assert.equal(command[0], "EVAL")
    assert.deepEqual(command.slice(2), ["1", "test:visitors", "158", "86400"])
    return Response.json({ result: 42 })
  }
  assert.equal(await getVisitorCount(), 42)
  globalThis.fetch = async () => Response.json({ error: "ERR unavailable" })
  await assert.rejects(getVisitorCount(), /Invalid visit storage response/)
  globalThis.fetch = async () => Response.json({ result: "42" })
  await assert.rejects(getVisitorCount(), /Invalid visit storage response/)
  globalThis.fetch = originalFetch
  delete process.env.UPSTASH_REDIS_REST_URL
  delete process.env.UPSTASH_REDIS_REST_TOKEN
})
