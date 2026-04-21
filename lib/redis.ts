import { createClient, type RedisClientType } from "redis"

// Server-only singleton. Gracefully no-ops if REDIS_HOST is unset
// (local dev without the homelab Redis) or if a connection attempt fails.

let clientPromise: Promise<RedisClientType | null> | null = null

async function connect(): Promise<RedisClientType | null> {
  const host = process.env.REDIS_HOST
  const password = process.env.REDIS_PASSWORD
  if (!host) return null

  const port = parseInt(process.env.REDIS_PORT ?? "6379", 10)
  const url = `redis://${host}:${port}`

  try {
    const client: RedisClientType = createClient({
      url,
      password: password || undefined,
      socket: {
        connectTimeout: 2000,
        reconnectStrategy: (retries) => (retries > 3 ? false : Math.min(retries * 200, 1000)),
      },
    })
    client.on("error", () => {
      // swallow; we degrade to no-cache on failure
    })
    await client.connect()
    return client
  } catch {
    return null
  }
}

function getClient(): Promise<RedisClientType | null> {
  if (!clientPromise) clientPromise = connect()
  return clientPromise
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = await getClient()
    if (!client) return null
    const raw = await client.get(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export async function cacheSet<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  try {
    const client = await getClient()
    if (!client) return
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds })
  } catch {
    // ignore
  }
}
