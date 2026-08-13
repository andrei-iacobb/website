import { cacheLife, cacheTag } from "next/cache"

const GITHUB_LOGIN = "andrei-iacobb"

export interface ContributionDay {
  contributionCount: number
  date: string
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionPayload {
  weeks: ContributionWeek[]
  total: number
}

export interface GitHubRepository {
  name: string
  pushed_at: string
  fork: boolean
  archived: boolean
}

function toWeeks(flat: { date: string; count: number }[]): ContributionWeek[] {
  if (!flat.length) return []

  const first = new Date(`${flat[0].date}T00:00:00Z`)
  const start = new Date(first)
  start.setUTCDate(start.getUTCDate() - first.getUTCDay())

  const byDate = new Map(flat.map(({ date, count }) => [date, count]))
  const weeks: ContributionWeek[] = []
  const current = new Date(start)
  const end = new Date(`${flat.at(-1)?.date}T00:00:00Z`)

  while (current <= end) {
    const contributionDays: ContributionDay[] = []
    for (let day = 0; day < 7; day += 1) {
      const date = current.toISOString().slice(0, 10)
      contributionDays.push({ date, contributionCount: byDate.get(date) ?? 0 })
      current.setUTCDate(current.getUTCDate() + 1)
    }
    weeks.push({ contributionDays })
  }

  return weeks
}

async function fetchGitHubContributions(): Promise<ContributionPayload | null> {
  const token = process.env.GITHUB_TOKEN

  if (token) {
    const query = `query {
      user(login: "${GITHUB_LOGIN}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks { contributionDays { contributionCount date } }
          }
        }
      }
    }`
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (response.ok) {
      const json = await response.json()
      const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar
      if (calendar) {
        return {
          weeks: calendar.weeks,
          total: calendar.totalContributions,
        }
      }
    }
  }

  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_LOGIN}?y=last`,
  )
  if (!response.ok) return null

  const data = await response.json()
  const flat = (data.contributions as { date: string; count: number }[]) ?? []

  return {
    weeks: toWeeks(flat),
    total:
      (data.total?.lastYear as number) ??
      flat.reduce((sum, day) => sum + day.count, 0),
  }
}

async function fetchForgejoContributions(): Promise<Record<string, number>> {
  const token = process.env.FORGEJO_TOKEN
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    const response = await fetch(
      "https://git.iacob.co.uk/api/v1/users/andrei/heatmap",
      {
        headers: token ? { Authorization: `token ${token}` } : undefined,
        signal: controller.signal,
      },
    )
    if (!response.ok) return {}

    const data = (await response.json()) as {
      timestamp: number
      contributions: number
    }[]
    if (!Array.isArray(data)) return {}

    const byDate: Record<string, number> = {}
    for (const entry of data) {
      const date = new Date(entry.timestamp * 1000).toISOString().slice(0, 10)
      byDate[date] = (byDate[date] ?? 0) + entry.contributions
    }
    return byDate
  } catch {
    return {}
  } finally {
    clearTimeout(timeout)
  }
}

function mergeContributions(
  github: ContributionPayload,
  forgejo: Record<string, number>,
): ContributionPayload {
  let total = 0
  const weeks = github.weeks.map((week) => ({
    contributionDays: week.contributionDays.map((day) => {
      const contributionCount = Math.max(
        day.contributionCount,
        forgejo[day.date] ?? 0,
      )
      total += contributionCount
      return { ...day, contributionCount }
    }),
  }))

  return { weeks, total }
}

export async function getContributions(): Promise<ContributionPayload> {
  "use cache"
  cacheLife("hours")
  cacheTag("github-contributions")

  try {
    const [github, forgejo] = await Promise.all([
      fetchGitHubContributions(),
      fetchForgejoContributions(),
    ])
    return github ? mergeContributions(github, forgejo) : { weeks: [], total: 0 }
  } catch {
    return { weeks: [], total: 0 }
  }
}

export async function getRepositories(): Promise<GitHubRepository[]> {
  "use cache"
  cacheLife("hours")
  cacheTag("github-repositories")

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    }
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_LOGIN}/repos?sort=updated&per_page=30`,
      { headers },
    )
    if (!response.ok) return []

    const repositories = (await response.json()) as GitHubRepository[]
    return repositories.map(({ name, pushed_at, fork, archived }) => ({
      name,
      pushed_at,
      fork,
      archived,
    }))
  } catch {
    return []
  }
}
