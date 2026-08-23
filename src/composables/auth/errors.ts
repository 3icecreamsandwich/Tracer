const NETWORK_PATTERN = /fetch|network|offline|connection|load failed/i

export type AuthErrorCode =
  | 'account_mismatch'
  | 'browser_open_failed'
  | 'callback_timeout'
  | 'device_key_failed'
  | 'email_rate_limited'
  | 'email_not_verified'
  | 'invalid_credentials'
  | 'local_data_failed'
  | 'missing_email'
  | 'network'
  | 'oauth_cancelled'
  | 'profile_failed'
  | 'role_failed'
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
  if (record?.code === 'over_email_send_rate_limit' || value.includes('email rate limit')) {
    return new TracerAuthError('email_rate_limited', raw)
  }
  if (record?.code === 'invalid_credentials' || value.includes('invalid login credentials')) {
    return new TracerAuthError('invalid_credentials', raw)
  }
  if (record?.code === 'keychain' || value.includes('keychain')) return new TracerAuthError('device_key_failed', raw)
  if (
    ['already_initialized', 'stronghold', 'path', 'io'].includes(String(record?.code ?? ''))
    || /database|disk i\/o|sqlite|local data|app lock is already initialized/i.test(raw)
  ) return new TracerAuthError('local_data_failed', raw)
  if (record?.code === 'timeout' || value.includes('timed out')) return new TracerAuthError('callback_timeout', raw)
  if (value.includes('cancel') || value.includes('access_denied')) return new TracerAuthError('oauth_cancelled', raw)
  if (value.includes('email not confirmed')) return new TracerAuthError('email_not_verified', raw)
  if (NETWORK_PATTERN.test(raw)) return new TracerAuthError('network', raw)
  return new TracerAuthError('unknown', raw || 'Authentication failed')
}
