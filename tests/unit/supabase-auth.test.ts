import { describe, expect, it } from 'vitest'

import { displayNameFromUser, isGoogleUser } from '../../src/composables/auth/account'
import { normalizeAuthError } from '../../src/composables/auth/errors'
import { parseStoredSession } from '../../src/composables/auth/session'

describe('Supabase account authentication', () => {
  it('prefers a submitted display name and falls back to provider metadata', () => {
    const user = { user_metadata: { full_name: 'Google Name' } } as any
    expect(displayNameFromUser(user, 'Local Name')).toBe('Local Name')
    expect(displayNameFromUser(user)).toBe('Google Name')
    expect(displayNameFromUser({ user_metadata: {} } as any)).toBe('')
  })

  it('detects Google from server-controlled app metadata', () => {
    expect(isGoogleUser({ app_metadata: { provider: 'google' } } as any)).toBe(true)
    expect(isGoogleUser({ app_metadata: { providers: ['email', 'google'] } } as any)).toBe(true)
    expect(isGoogleUser({ app_metadata: { provider: 'email' }, user_metadata: { provider: 'google' } } as any)).toBe(false)
  })

  it('parses only complete persisted sessions', () => {
    const stored = parseStoredSession(JSON.stringify({
      accessToken: 'access', refreshToken: 'refresh', expiresAt: 123,
      user: { id: 'user-id', email: 'user@example.com', userMetadata: {} }
    }))
    expect(stored?.user.id).toBe('user-id')
    expect(parseStoredSession('{bad')).toBeNull()
    expect(parseStoredSession(JSON.stringify({ accessToken: 'access' }))).toBeNull()
  })

  it('normalizes cancellation, timeout, verification, and network failures', () => {
    expect(normalizeAuthError(new Error('access_denied')).code).toBe('oauth_cancelled')
    expect(normalizeAuthError({ code: 'timeout', message: 'late' }).code).toBe('callback_timeout')
    expect(normalizeAuthError(new Error('Email not confirmed')).code).toBe('email_not_verified')
    expect(normalizeAuthError(new Error('Failed to fetch')).code).toBe('network')
    expect(normalizeAuthError({ code: 'keychain', message: 'Access denied' }).code).toBe('device_key_failed')
  })
})
