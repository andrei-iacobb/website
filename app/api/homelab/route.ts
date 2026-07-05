import { NextResponse } from "next/server"
import { EXTERNAL_SERVICES } from "@/lib/homelab-external"
import { checkService, mapLimit, type ServiceStatus } from "@/lib/homelab-check"
import { cacheGet, cacheSet } from "@/lib/redis"

export const dynamic = "force-dynamic"

const CACHE_KEY = "homelab:external:v1"
const CACHE_TTL = 60 // seconds
const TIMEOUT_MS = 6000
const CONCURRENCY = 5

interface HomelabPayload {
  services: ServiceStatus[]
  online: number
  total: number
  checkedAt: string
}

// Module-level guards: one in-flight probe per process (single-flight) plus an
// in-memory copy of the last payload, so a Redis outage or concurrent cache
// misses cannot amplify into repeated full fan-outs.
let inflight: Promise<HomelabPayload> | null = null
let lastPayload: HomelabPayload | null = null
let lastAt = 0

async function probeAll(): Promise<HomelabPayload> {
  const services = await mapLimit(EXTERNAL_SERVICES, CONCURRENCY, (s) =>
    checkService(s.url, TIMEOUT_MS, s.name)
  )
  const online = services.filter((s) => s.status !== "offline").length
  const payload: HomelabPayload = {
    services,
    online,
    total: services.length,
    checkedAt: new Date().toISOString(),
  }
  lastPayload = payload
  lastAt = Date.now()
  await cacheSet(CACHE_KEY, payload, CACHE_TTL).catch(() => {})
  return payload
}

export async function GET() {
  try {
    const cached = await cacheGet<HomelabPayload>(CACHE_KEY)
    if (cached) return NextResponse.json(cached)

    if (lastPayload && Date.now() - lastAt < CACHE_TTL * 1000) {
      return NextResponse.json(lastPayload)
    }

    if (!inflight) {
      inflight = probeAll().finally(() => {
        inflight = null
      })
    }
    return NextResponse.json(await inflight)
  } catch {
    return NextResponse.json({ services: [], online: 0, total: 0, checkedAt: new Date().toISOString() })
  }
}
