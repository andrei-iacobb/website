import { NextResponse } from "next/server"
import { EXTERNAL_SERVICES } from "@/lib/homelab-external"
import { cacheGet, cacheSet } from "@/lib/redis"

export const dynamic = "force-dynamic"

const CACHE_KEY = "homelab:external:v1"
const CACHE_TTL = 60 // seconds
const TIMEOUT_MS = 6000

type Status = "online" | "degraded" | "offline"

interface ServiceStatus {
  name: string
  status: Status
  ms: number
}

interface HomelabPayload {
  services: ServiceStatus[]
  online: number
  total: number
  checkedAt: string
}

async function check(name: string, url: string): Promise<ServiceStatus> {
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
    // Any HTTP reply (incl. 3xx redirects to login, 401/403 auth walls) means
    // the service is up and answering. Only 5xx counts as degraded.
    const status: Status = res.status >= 500 && res.status < 600 ? "degraded" : "online"
    return { name, status, ms }
  } catch {
    return { name, status: "offline", ms: Date.now() - start }
  } finally {
    clearTimeout(timer)
  }
}

export async function GET() {
  try {
    const cached = await cacheGet<HomelabPayload>(CACHE_KEY)
    if (cached) return NextResponse.json(cached)

    const services = await Promise.all(EXTERNAL_SERVICES.map((s) => check(s.name, s.url)))
    const online = services.filter((s) => s.status !== "offline").length
    const payload: HomelabPayload = {
      services,
      online,
      total: services.length,
      checkedAt: new Date().toISOString(),
    }

    await cacheSet(CACHE_KEY, payload, CACHE_TTL).catch(() => {})
    return NextResponse.json(payload)
  } catch {
    return NextResponse.json({ services: [], online: 0, total: 0, checkedAt: new Date().toISOString() })
  }
}
