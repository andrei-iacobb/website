import { NextResponse } from "next/server"
import { cacheGet, cacheSet } from "@/lib/redis"

export const revalidate = 3600

const CACHE_KEY = "github:repos:andrei-iacobb"
const CACHE_TTL = 3600

type Repo = { name: string; pushed_at: string }

async function fetchFromGitHub(): Promise<Repo[] | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  }
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(
    "https://api.github.com/users/andrei-iacobb/repos?sort=updated&per_page=30",
    { headers, next: { revalidate: 3600 } }
  )

  if (!res.ok) return null

  const data = (await res.json()) as Repo[]
  return data.map(({ name, pushed_at }) => ({ name, pushed_at }))
}

export async function GET() {
  try {
    const cached = await cacheGet<Repo[]>(CACHE_KEY)
    if (cached) return NextResponse.json(cached)

    const fresh = await fetchFromGitHub()
    if (!fresh) return NextResponse.json([])

    await cacheSet(CACHE_KEY, fresh, CACHE_TTL)
    return NextResponse.json(fresh)
  } catch {
    return NextResponse.json([])
  }
}
