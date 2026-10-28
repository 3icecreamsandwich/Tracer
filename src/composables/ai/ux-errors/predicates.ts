export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function errorStatus(err: unknown): number | null {
  const visited = new Set<unknown>()
  let current: any = err
  for (let depth = 0; current && depth < 6 && !visited.has(current); depth++) {
    visited.add(current)
    for (const status of [current.statusCode, current.status, current.response?.status]) {
      if (typeof status === 'number' && Number.isFinite(status)) return status
    }
    current = current.lastError ?? current.cause
  }
  return null
}

function isOffline(): boolean {
  const nav: any = (globalThis as any)?.navigator
  if (!nav) return false
  if (typeof nav.onLine !== 'boolean') return false
  return nav.onLine === false
}

export function isFetchOfflineError(err: unknown): boolean {
  // A browser's `Failed to fetch` also covers provider outages, CORS, a bad
  // gateway, and blocked requests. It is not proof that the user is offline.
  if (isOffline()) return true
  return false
}

export function isNetworkTransportError(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  const msg = err.message.toLowerCase()
  if (msg.includes('failed to fetch') || msg === 'load failed' || msg.includes('error sending request for url')) return true
  if (msg.includes('networkerror')) return true
  if (msg.includes('network request failed')) return true
  return false
}

export function isRateLimitError(err: unknown): boolean {
  const status = errorStatus(err)
  if (status === 429) return true

  if (err instanceof Error) {
    const msg = err.message.toLowerCase()
    if (msg.includes('rate limit')) return true
    if (msg.includes('too many requests')) return true
  }

  if (isRecord(err) && typeof err.code === 'string') {
    const code = err.code.toLowerCase()
    if (code.includes('rate_limit')) return true
    if (code === 'rate_limit_exceeded') return true
  }
  return false
}
