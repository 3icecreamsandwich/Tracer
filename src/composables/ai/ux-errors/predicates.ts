export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

export function errorStatus(err: unknown): number | null {
  const maybe: any = err
  const status = maybe?.status
  if (typeof status === 'number' && Number.isFinite(status)) return status

  const responseStatus = maybe?.response?.status
  if (typeof responseStatus === 'number' && Number.isFinite(responseStatus)) return responseStatus

  const causeStatus = maybe?.cause?.status
  if (typeof causeStatus === 'number' && Number.isFinite(causeStatus)) return causeStatus

  return null
}

function isOffline(): boolean {
  const nav: any = (globalThis as any)?.navigator
  if (!nav) return false
  if (typeof nav.onLine !== 'boolean') return false
  return nav.onLine === false
}

export function isFetchOfflineError(err: unknown): boolean {
  if (isOffline()) return true
  if (!(err instanceof Error)) return false
  const msg = err.message.toLowerCase()
  if (msg.includes('failed to fetch')) return true
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
