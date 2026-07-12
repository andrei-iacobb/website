type Repo = {
  name: string
  pushed_at: string
  fork: boolean
  archived: boolean
}

function getRelativeTime(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  )

  const units: [string, number][] = [
    ["y", 31536000],
    ["mo", 2592000],
    ["w", 604800],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ]

  for (const [label, unitSeconds] of units) {
    const value = Math.floor(seconds / unitSeconds)
    if (value >= 1) return `${value}${label} ago`
  }
  return "just now"
}

async function fetchRepos(): Promise<Repo[] | null> {
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

  return (await res.json()) as Repo[]
}

export default async function RepoStrip() {
  let recent: Repo[]
  try {
    const repos = await fetchRepos()
    if (!repos) return null

    recent = repos
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, 4)
  } catch {
    return null
  }
  if (recent.length === 0) return null

  return (
      <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <span id="repo-strip-label" className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/65">
          Recently pushed
        </span>
        <ul aria-labelledby="repo-strip-label" className="contents">
          {recent.map((repo) => (
            <li key={repo.name} className="flex items-baseline gap-1.5">
              <a
                href={`https://github.com/andrei-iacobb/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link font-mono text-[13px] text-ink/80 hover:text-ink"
              >
                {repo.name}
              </a>
              <span className="font-mono text-[13px] text-ink/45 tabular-nums">
                {getRelativeTime(repo.pushed_at)}
              </span>
            </li>
          ))}
        </ul>
      </div>
  )
}
