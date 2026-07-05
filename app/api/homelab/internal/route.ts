import { NextResponse } from "next/server"
import { INTERNAL_SERVICE_URLS } from "@/lib/homelab-internal"
import { cacheGet, cacheSet } from "@/lib/redis"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const CACHE_KEY = "homelab:internal:v1"
const CACHE_TTL = 120 // seconds — internal checks are slow; cache longer
const TIMEOUT_MS = 4000

type Status = "online" | "degraded" | "offline"

interface ServiceStatus {
  name: string
  status: Status
  ms: number
}

interface InternalPayload {
  online: number
  total: number
  checkedAt: string
}

async function check(url: string): Promise<ServiceStatus> {
  const start = Date.now()
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      signal: ctrl.signal,
      cache: "no-store",
    })
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        redirect: "manual",
        signal: ctrl.signal,
        cache: "no-store",
      })
    }
    const ms = Date.now() - start
    const status: Status = res.status >= 500 && res.status < 600 ? "degraded" : "online"
    return { name: url, status, ms }
  } catch {
    return { name: url, status: "offline", ms: Date.now() - start }
  } finally {
    clearTimeout(timer)
  }
}

export async function GET() {
  try {
    const cached = await cacheGet<InternalPayload>(CACHE_KEY)
    if (cached) return NextResponse.json(cached)

    const results = await Promise.all(INTERNAL_SERVICE_URLS.map((url) => check(url)))
    const online = results.filter((s) => s.status !== "offline").length
    const payload: InternalPayload = {
      online,
      total: results.length,
      checkedAt: new Date().toISOString(),
    }

    await cacheSet(CACHE_KEY, payload, CACHE_TTL).catch(() => {})
    return NextResponse.json(payload)
  } catch {
    return NextResponse.json({ online: 0, total: INTERNAL_SERVICE_URLS.length, checkedAt: new Date().toISOString() })
  }
}
