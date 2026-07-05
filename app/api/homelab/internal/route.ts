import { NextResponse } from "next/server"
import { INTERNAL_SERVICE_URLS } from "@/lib/homelab-internal"
import { checkService, mapLimit } from "@/lib/homelab-check"
import { cacheGet, cacheSet } from "@/lib/redis"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const CACHE_KEY = "homelab:internal:v1"
const CACHE_TTL = 120 // seconds - internal checks are slow; cache longer
const TIMEOUT_MS = 4000
const CONCURRENCY = 8

interface InternalPayload {
  online: number
  total: number
  checkedAt: string
}

// Module-level guards: one in-flight probe per process (single-flight) plus an
// in-memory copy of the last payload. Without these, every anonymous request
// during a Redis outage or a cache-miss stampede would fan out to all internal
// services at once.
let inflight: Promise<InternalPayload> | null = null
let lastPayload: InternalPayload | null = null
let lastAt = 0

async function probeAll(): Promise<InternalPayload> {
  const results = await mapLimit(INTERNAL_SERVICE_URLS, CONCURRENCY, (url) =>
    checkService(url, TIMEOUT_MS)
  )
  const online = results.filter((s) => s.status !== "offline").length
  const payload: InternalPayload = {
    online,
    total: results.length,
    checkedAt: new Date().toISOString(),
  }
  lastPayload = payload
  lastAt = Date.now()
  await cacheSet(CACHE_KEY, payload, CACHE_TTL).catch(() => {})
  return payload
}

export async function GET() {
  try {
    const cached = await cacheGet<InternalPayload>(CACHE_KEY)
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
    return NextResponse.json({ online: 0, total: INTERNAL_SERVICE_URLS.length, checkedAt: new Date().toISOString() })
  }
}
