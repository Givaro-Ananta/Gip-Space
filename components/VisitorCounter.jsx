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
      className="fixed bottom-3 left-3 z-40 flex min-h-7 items-center gap-1.5 sm:min-h-11 sm:gap-2.5 rounded-full border border-purple-400/20 bg-gray-900/95 px-2.5 py-1 sm:px-4 sm:py-2 shadow-lg shadow-black/20 backdrop-blur-md sm:bottom-6 sm:left-6"
    >
      <Eye size={16} className="h-3 w-3 shrink-0 text-purple-400 sm:h-4 sm:w-4" aria-hidden="true" />
      <span className="text-[10px] font-medium leading-none text-gray-300 sm:text-xs">Total Visits</span>
      <span role="status" aria-live="polite" className="min-w-3 text-[11px] font-semibold leading-none tabular-nums text-white sm:min-w-4 sm:text-sm">
        {status === "loading" ? (
          <><Loader2 size={14} className="h-3 w-3 animate-spin sm:h-3.5 sm:w-3.5" aria-hidden="true" /><span className="sr-only">Loading visitor count</span></>
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
