type CacheEntry = {
  expiresAt: number
  value: unknown
}

export type AsyncRequestCache = {
  get<T>(key: string, loader: () => Promise<T>, ttlMs?: number): Promise<T>
  peek<T>(key: string): T | undefined
  invalidate(keyPrefix?: string): void
}

export function createAsyncRequestCache(options: {
  ttlMs: number
  maxEntries?: number
  now?: () => number
}): AsyncRequestCache {
  const values = new Map<string, CacheEntry>()
  const inFlight = new Map<string, Promise<unknown>>()
  let invalidationVersion = 0
  const now = options.now ?? Date.now
  const maxEntries = Math.max(1, options.maxEntries ?? 100)

  function prune() {
    const currentTime = now()
    for (const [key, entry] of values) {
      if (entry.expiresAt <= currentTime) values.delete(key)
    }
    while (values.size >= maxEntries) {
      const oldestKey = values.keys().next().value
      if (typeof oldestKey !== 'string') break
      values.delete(oldestKey)
    }
  }

  function peek<T>(key: string): T | undefined {
    const entry = values.get(key)
    if (!entry) return undefined
    if (entry.expiresAt <= now()) {
      values.delete(key)
      return undefined
    }
    return entry.value as T
  }

  async function get<T>(key: string, loader: () => Promise<T>, ttlMs = options.ttlMs): Promise<T> {
    const cached = peek<T>(key)
    if (cached !== undefined) return cached

    const pending = inFlight.get(key)
    if (pending) return pending as Promise<T>

    const requestVersion = invalidationVersion
    const request = loader()
      .then((value) => {
        if (requestVersion === invalidationVersion) {
          prune()
          values.set(key, { value, expiresAt: now() + Math.max(0, ttlMs) })
        }
        return value
      })
      .finally(() => {
        if (inFlight.get(key) === request) inFlight.delete(key)
      })
    inFlight.set(key, request)
    return request
  }

  function invalidate(keyPrefix = '') {
    invalidationVersion += 1
    for (const key of values.keys()) {
      if (key.startsWith(keyPrefix)) values.delete(key)
    }
    for (const key of inFlight.keys()) {
      if (key.startsWith(keyPrefix)) inFlight.delete(key)
    }
  }

  return { get, peek, invalidate }
}
