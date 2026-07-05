import { NextResponse } from "next/server"
import { cacheGet, cacheSet } from "@/lib/redis"

export const revalidate = 3600

const CACHE_KEY = "github:contributions:andrei-iacobb:v2"
const CACHE_TTL = 3600 // 1 hour

interface ContributionDay {
  contributionCount: number
  date: string
}

interface Week {
  contributionDays: ContributionDay[]
}

interface ContributionPayload {
  weeks: Week[]
  total: number
}

function toWeeks(flat: { date: string; count: number }[]): Week[] {
  if (!flat.length) return []

  // Start from the Sunday on or before the first date
  const first = new Date(flat[0].date + "T00:00:00Z")
  const startDow = first.getUTCDay() // 0 = Sun
  const start = new Date(first)
  start.setUTCDate(start.getUTCDate() - startDow)

  const byDate: Record<string, number> = {}
  for (const d of flat) byDate[d.date] = d.count

  const weeks: Week[] = []
  const current = new Date(start)
  const end = new Date(flat[flat.length - 1].date + "T00:00:00Z")

  while (current <= end) {
    const week: Week = { contributionDays: [] }
    for (let d = 0; d < 7; d++) {
      const iso = current.toISOString().slice(0, 10)
      week.contributionDays.push({ date: iso, contributionCount: byDate[iso] ?? 0 })
      current.setUTCDate(current.getUTCDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

async function fetchFromGitHub(): Promise<ContributionPayload | null> {
  const token = process.env.GITHUB_TOKEN
  if (token) {
    const query = `query {
      user(login: "andrei-iacobb") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { contributionCount date } }
          }
        }
      }
    }`
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    })
    if (res.ok) {
      const json = await res.json()
      const cal = json?.data?.user?.contributionsCollection?.contributionCalendar
      if (cal) return { weeks: cal.weeks, total: cal.totalContributions }
    }
  }

  // Public fallback - no auth required
  const res = await fetch(
    "https://github-contributions-api.jogruber.de/v4/andrei-iacobb?y=last",
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return null

  const data = await res.json()
  const flat = (data.contributions as { date: string; count: number }[]) ?? []
  const weeks = toWeeks(flat)
  const total = (data.total?.lastYear as number) ?? flat.reduce((s, d) => s + d.count, 0)
  return { weeks, total }
}

// Forgejo activity from the homelab instance. Same merge rule as the
// profile-card generator: per-day MAX of the two sources, so commits
// mirrored between GitHub and Forgejo are not double-counted.
async function fetchForgejoByDate(): Promise<Record<string, number>> {
  const token = process.env.FORGEJO_TOKEN
  if (!token) return {}
  try {
    const res = await fetch("https://git.iacob.co.uk/api/v1/users/andrei/heatmap", {
      headers: { Authorization: `token ${token}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return {}
    const data = (await res.json()) as { timestamp: number; contributions: number }[]
    const byDate: Record<string, number> = {}
    for (const e of data) {
      const iso = new Date(e.timestamp * 1000).toISOString().slice(0, 10)
      byDate[iso] = (byDate[iso] ?? 0) + e.contributions
    }
    return byDate
  } catch {
    return {}
  }
}

function mergeMax(github: ContributionPayload, forgejo: Record<string, number>): ContributionPayload {
  let total = 0
  const weeks = github.weeks.map((w) => ({
    contributionDays: w.contributionDays.map((d) => {
      const count = Math.max(d.contributionCount, forgejo[d.date] ?? 0)
      total += count
      return { date: d.date, contributionCount: count }
    }),
  }))
  return { weeks, total }
}

export async function GET() {
  try {
    const cached = await cacheGet<ContributionPayload>(CACHE_KEY)
    if (cached) return NextResponse.json(cached)

    const [github, forgejo] = await Promise.all([fetchFromGitHub(), fetchForgejoByDate()])
    if (!github) return NextResponse.json({ weeks: [], total: 0 })

    const merged = mergeMax(github, forgejo)
    await cacheSet(CACHE_KEY, merged, CACHE_TTL)
    return NextResponse.json(merged)
  } catch {
    return NextResponse.json({ weeks: [], total: 0 })
  }
}
