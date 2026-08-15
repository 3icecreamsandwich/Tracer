const NETWORK_PATTERN = /fetch|network|offline|connection|load failed/i

export type AuthErrorCode =
  | 'account_mismatch'
  | 'browser_open_failed'
  | 'callback_timeout'
  | 'device_key_failed'
  | 'email_not_verified'
  | 'missing_email'
  | 'network'
  | 'oauth_cancelled'
  | 'profile_failed'
  | 'supabase_not_configured'
  | 'unknown'

export class TracerAuthError extends Error {
  constructor(public code: AuthErrorCode, message: string) {
    super(message)
    this.name = 'TracerAuthError'
  }
}

export function normalizeAuthError(error: unknown): TracerAuthError {
  if (error instanceof TracerAuthError) return error
  const record = typeof error === 'object' && error !== null ? error as Record<string, unknown> : null
  const raw = error instanceof Error ? error.message : typeof error === 'string' ? error : String(record?.message ?? '')
  const value = raw.toLowerCase()
  if (value === 'supabase_not_configured') return new TracerAuthError('supabase_not_configured', raw)
  if (record?.code === 'keychain' || value.includes('keychain')) return new TracerAuthError('device_key_failed', raw)
  if (record?.code === 'timeout' || value.includes('timed out')) return new TracerAuthError('callback_timeout', raw)
  if (value.includes('cancel') || value.includes('access_denied')) return new TracerAuthError('oauth_cancelled', raw)
  if (value.includes('email not confirmed')) return new TracerAuthError('email_not_verified', raw)
  if (NETWORK_PATTERN.test(raw)) return new TracerAuthError('network', raw)
  return new TracerAuthError('unknown', raw || 'Authentication failed')
}
