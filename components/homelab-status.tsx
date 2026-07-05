"use client"

import { useEffect, useRef, useState } from "react"
import { EXTERNAL_SERVICE_NAMES } from "@/lib/homelab-external"

type Status = "online" | "degraded" | "offline"

interface ServiceStatus {
  name: string
  status: Status
  ms: number
}

interface ExternalPayload {
  services: ServiceStatus[]
  online: number
  total: number
  checkedAt: string
}

interface InternalPayload {
  online: number
  total: number
  checkedAt: string
}

const dotClass: Record<Status, string> = {
  online: "bg-[hsl(var(--accent-soft))]",
  degraded: "bg-amber-500",
  offline: "bg-ink/25",
}

function internalStatus({ online, total }: InternalPayload): Status {
  if (online === 0) return "offline"
  if (online < total) return "degraded"
  return "online"
}

function DotSkeleton() {
  return <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-ink/10 animate-pulse" aria-hidden />
}

function MsSkeleton() {
  return <span className="h-3 w-10 shrink-0 rounded bg-ink/10 animate-pulse" aria-hidden />
}

// Isolated so the 1s tick re-renders only this label, not the whole card.
function UpdatedAgo({ checkedAt }: { checkedAt: string | null }) {
  const [ago, setAgo] = useState(0)

  // Remounted via `key={checkedAt}` on each poll, so `ago` starts fresh at 0.
  useEffect(() => {
    const tick = setInterval(() => setAgo((a) => a + 1), 1000)
    return () => clearInterval(tick)
  }, [])

  return (
    <span className="font-mono text-[11px] text-ink/65">
      {checkedAt ? (ago < 2 ? "live" : `updated ${ago}s ago`) : "live"}
    </span>
  )
}

export function HomelabStatus() {
  const [external, setExternal] = useState<ExternalPayload | null>(null)
  const [internal, setInternal] = useState<InternalPayload | null>(null)
  const [failed, setFailed] = useState(false)
  const alive = useRef(true)
  const hasExternal = useRef(false)

  useEffect(() => {
    alive.current = true

    const loadExternal = async () => {
      try {
        const r = await fetch("/api/homelab", { cache: "no-store" })
        const j: ExternalPayload = await r.json()
        if (!alive.current) return
        if (j?.services?.length) {
          hasExternal.current = true
          setExternal(j)
          setFailed(false)
        } else if (!hasExternal.current) {
          setFailed(true)
        }
      } catch {
        if (alive.current && !hasExternal.current) setFailed(true)
      }
    }

    const loadInternal = async () => {
      try {
        const r = await fetch("/api/homelab/internal", { cache: "no-store" })
        const j: InternalPayload = await r.json()
        if (!alive.current) return
        if (j?.total) setInternal(j)
      } catch {
        // Internal is optional - fail silent
      }
    }

    loadExternal()
    loadInternal()

    const pollExternal = setInterval(loadExternal, 45000)
    const pollInternal = setInterval(loadInternal, 90000)

    return () => {
      alive.current = false
      clearInterval(pollExternal)
      clearInterval(pollInternal)
    }
  }, [])

  if (failed && !external) return null

  const byName = new Map(external?.services.map((s) => [s.name, s]) ?? [])

  return (
    <div className="rounded-2xl border border-ink/12 bg-ink/[0.015] p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="status-dot" aria-hidden />
          <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/70">
            {external ? `${external.online}/${external.total} services online` : "Checking services"}
          </span>
        </div>
        <UpdatedAgo key={external?.checkedAt ?? "init"} checkedAt={external?.checkedAt ?? null} />
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
        {EXTERNAL_SERVICE_NAMES.map((name) => {
          const s = byName.get(name)
          return (
            <li
              key={name}
              className="flex items-center justify-between gap-3 border-b border-ink/[0.08] py-2.5"
            >
              <span className="flex items-center gap-2.5 min-w-0">
                {s ? (
                  <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${dotClass[s.status]}`} aria-hidden />
                ) : (
                  <DotSkeleton />
                )}
                <span className="truncate text-[14px] text-ink/80">{name}</span>
              </span>
              {s ? (
                <span className="font-mono text-[11px] text-ink/65 tabular-nums shrink-0">
                  {s.status === "offline" ? "-" : `${s.ms}ms`}
                </span>
              ) : (
                <MsSkeleton />
              )}
            </li>
          )
        })}

        <li className="col-span-2 md:col-span-3 flex items-center justify-between gap-3 border-b border-ink/[0.08] py-2.5">
          <span className="flex items-center gap-2.5 min-w-0">
            {internal ? (
              <span
                className={`h-[7px] w-[7px] shrink-0 rounded-full ${dotClass[internalStatus(internal)]}`}
                aria-hidden
              />
            ) : (
              <DotSkeleton />
            )}
            <span className="whitespace-nowrap text-[14px] text-ink/80">Internal services</span>
          </span>
          {internal ? (
            <span className="font-mono text-[11px] text-ink/65 tabular-nums shrink-0">
              {internal.online}/{internal.total} running
            </span>
          ) : (
            <MsSkeleton />
          )}
        </li>
      </ul>

      <p className="mt-6 font-sans text-[12px] text-ink/65 italic">
        It&apos;s Kubernetes - if something&apos;s down, it&apos;ll probably heal itself before you finish refreshing.
      </p>
    </div>
  )
}
