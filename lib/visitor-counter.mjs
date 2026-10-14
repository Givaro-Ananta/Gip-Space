import { randomUUID } from "node:crypto"
import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"

export const VISIT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const INITIAL_COUNT = 158
const RETRY_WINDOW_SECONDS = 86400
const queuesKey = Symbol.for("gip-space.visitor-storage-queues")
const queues = globalThis[queuesKey] ||= new Map()

async function redisCount(visitId) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token || new URL(url).protocol !== "https:") {
    throw new Error("Visit storage is not configured")
  }

  const key = process.env.VISITOR_COUNTER_KEY || "gip-space:total-visits:v1"
  // Seed once, then increment once per document load. Retries reuse the visit ID.
  const script = `
    redis.call('SET', KEYS[1], ARGV[1], 'NX')
    if #KEYS == 2 and redis.call('SET', KEYS[2], '1', 'NX', 'EX', ARGV[2]) then
      return redis.call('INCR', KEYS[1])
    end
    return tonumber(redis.call('GET', KEYS[1]))
  `
  const keys = visitId ? [key, `${key}:request:${visitId}`] : [key]
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["EVAL", script, String(keys.length), ...keys, String(INITIAL_COUNT), String(RETRY_WINDOW_SECONDS)]),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) throw new Error("Visit storage request failed")
  const data = await response.json()
  if (data.error || !Number.isSafeInteger(data.result) || data.result < 0) {
    throw new Error("Invalid visit storage response")
  }
  return data.result
}

async function localCount(visitId) {
  const file = process.env.VISITOR_DATA_FILE || path.join(process.cwd(), ".data", "visits.json")
  const previous = queues.get(file) || Promise.resolve()
  const operation = previous.catch(() => {}).then(async () => {
    let data
    try {
      data = JSON.parse(await readFile(file, "utf8"))
    } catch (error) {
      if (error.code !== "ENOENT") throw error
      data = { version: 1, count: INITIAL_COUNT, recentVisits: {} }
    }
    if (data.version !== 1 || !Number.isSafeInteger(data.count) || data.count < 0 ||
        !data.recentVisits || typeof data.recentVisits !== "object" || Array.isArray(data.recentVisits) ||
        Object.entries(data.recentVisits).some(([id, expiry]) => !VISIT_ID_PATTERN.test(id) || !Number.isFinite(expiry))) {
      throw new Error("Invalid local visit storage")
    }
    if (visitId) {
      const now = Date.now()
      data.recentVisits = Object.fromEntries(Object.entries(data.recentVisits).filter(([, expiry]) => expiry > now))
      if (!data.recentVisits[visitId]) {
        data.count += 1
        data.recentVisits[visitId] = now + RETRY_WINDOW_SECONDS * 1000
        await mkdir(path.dirname(file), { recursive: true })
        const temporaryFile = `${file}.${randomUUID()}.tmp`
        await writeFile(temporaryFile, JSON.stringify(data), { mode: 0o600 })
        await rename(temporaryFile, file)
      }
    }
    return data.count
  })
  queues.set(file, operation)
  try {
    return await operation
  } finally {
    if (queues.get(file) === operation) queues.delete(file)
  }
}

export async function getVisitorCount(visitId) {
  if (visitId !== undefined && !VISIT_ID_PATTERN.test(visitId)) {
    throw new Error("Invalid visit ID")
  }
  if (process.env.UPSTASH_REDIS_REST_URL || process.env.UPSTASH_REDIS_REST_TOKEN) {
    return redisCount(visitId)
  }
  // Local files survive dev-server restarts. Serverless production requires Redis.
  if (process.env.NODE_ENV !== "production") return localCount(visitId)
  throw new Error("Visit storage is not configured")
}
