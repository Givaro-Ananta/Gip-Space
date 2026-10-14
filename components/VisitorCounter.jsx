"use client"

import { useEffect, useState } from "react"
import { Eye, Loader2, RotateCw } from "lucide-react"

// This state belongs to one document load, not to a persistent browser identity.
// A reload creates a new visit; Strict Mode, retries, and in-site navigation reuse it.
const registrationKey = Symbol.for("gip-space.visit-registration")

function registerVisit() {
  const state = globalThis[registrationKey] ||= { visitId: crypto.randomUUID() }
  if (state.registration) return state.registration
  state.registration = fetch("/api/visitors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitId: state.visitId }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  }).then(async (response) => {
    if (!response.ok) throw new Error("Visitor counter unavailable")
    const data = await response.json()
    if (!Number.isSafeInteger(data.count) || data.count < 0) throw new Error("Invalid count")
    return data.count
  }).catch((error) => {
    state.registration = undefined
    throw error
  })
  return state.registration
}

export default function VisitorCounter() {
  const [count, setCount] = useState(null)
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    let active = true
    registerVisit().then((value) => {
      if (active) { setCount(value); setStatus("ready") }
    }).catch(() => {
      if (active) setStatus("error")
    })
    return () => { active = false }
  }, [])

  const retry = async () => {
    setStatus("loading")
    try { setCount(await registerVisit()); setStatus("ready") }
    catch { setStatus("error") }
  }

  return (
    <aside
      aria-label="Total website visits"
      className="fixed bottom-4 left-4 z-40 flex min-h-11 items-center gap-2.5 rounded-full border border-purple-400/20 bg-gray-900/95 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-md sm:bottom-6 sm:left-6"
    >
      <Eye size={16} className="shrink-0 text-purple-400" aria-hidden="true" />
      <span className="text-xs font-medium text-gray-300">Total Visits</span>
      <span role="status" aria-live="polite" className="min-w-4 text-sm font-semibold tabular-nums text-white">
        {status === "loading" ? (
          <><Loader2 size={14} className="animate-spin" aria-hidden="true" /><span className="sr-only">Loading visitor count</span></>
        ) : status === "error" ? (
          <><span aria-hidden="true">—</span><span className="sr-only">Visitor count temporarily unavailable</span></>
        ) : (
          <><span aria-hidden="true">{count.toLocaleString("en-US")}</span><span className="sr-only">{count.toLocaleString("en-US")} total website visits</span></>
        )}
      </span>
      {status === "error" && (
        <button type="button" onClick={retry} aria-label="Retry loading visitor count" className="-my-2 -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-gray-400 hover:bg-gray-800 hover:text-white">
          <RotateCw size={14} aria-hidden="true" />
        </button>
      )}
    </aside>
  )
}
