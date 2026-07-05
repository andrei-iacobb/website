export type ServiceHealth = "online" | "degraded" | "offline"

export interface ServiceStatus {
  name: string
  status: ServiceHealth
  ms: number
}

async function fetchWithTimeout(url: string, method: "HEAD" | "GET", timeoutMs: number) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, {
      method,
      redirect: "manual",
      signal: ctrl.signal,
      cache: "no-store",
    })
  } finally {
    clearTimeout(timer)
  }
}

// Any HTTP reply (incl. 3xx redirects to login, 401/403 auth walls) means the
// service is up and answering. Only 5xx counts as degraded.
export async function checkService(url: string, timeoutMs: number, name: string = url): Promise<ServiceStatus> {
  const start = Date.now()
  try {
    let res = await fetchWithTimeout(url, "HEAD", timeoutMs)
    if (res.status === 405 || res.status === 501) {
      // Fresh timeout budget for the GET fallback so a slow HEAD response
      // does not cause the retry to be aborted mid-flight.
      res = await fetchWithTimeout(url, "GET", timeoutMs)
    }
    const status: ServiceHealth = res.status >= 500 && res.status < 600 ? "degraded" : "online"
    return { name, status, ms: Date.now() - start }
  } catch {
    return { name, status: "offline", ms: Date.now() - start }
  }
}

export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}
