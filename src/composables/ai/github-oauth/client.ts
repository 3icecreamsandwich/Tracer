export function parseUrlEncoded(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const part of raw.split('&')) {
    const [k, v] = part.split('=', 2)
    if (!k) continue
    out[decodeURIComponent(k)] = decodeURIComponent(v ?? '')
  }
  return out
}

export function asNumber(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string') {
    const n = Number(v)
    if (Number.isFinite(n)) return n
  }
  return null
}

function getEnvClientId(): string | null {
  const v = (import.meta as any)?.env?.VITE_GITHUB_OAUTH_CLIENT_ID
  if (typeof v !== 'string') return null
  const t = v.trim()
  if (!t) return null
  return t
}

export function githubOAuthClientId(): string {
  const id = getEnvClientId()
  if (!id) {
    throw new Error('Missing VITE_GITHUB_OAUTH_CLIENT_ID')
  }
  return id
}
