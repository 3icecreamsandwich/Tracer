import { invoke } from '@tauri-apps/api/core'
import type { Session, User } from '@supabase/supabase-js'

import { hasTauriRuntime } from '../tauri'
import { syncCloudProviderApiKeysToDevice } from '../ai/cloud-provider-keys'
import { clearSupabaseMemorySession, getSupabaseClient } from './client'
import { normalizeAuthError } from './errors'

export type StoredAuthSession = {
  accessToken: string
  refreshToken: string
  expiresAt: number | null
  user: { id: string; email: string; userMetadata: Record<string, unknown> }
}

export type AuthIdentity = StoredAuthSession['user']
export type RestoredAuthSession = { identity: AuthIdentity; online: boolean }

let restoreSessionRequest: Promise<RestoredAuthSession | null> | null = null

export function isInvalidStoredSessionError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false
  const code = String((error as { code?: unknown }).code ?? '')
  return code === 'refresh_token_already_used'
    || code === 'refresh_token_not_found'
    || code === 'invalid_refresh_token'
}

export function identityFromUser(user: User): AuthIdentity {
  return {
    id: user.id,
    email: user.email?.trim() ?? '',
    userMetadata: user.user_metadata ?? {},
  }
}

export function serializeSession(session: Session): string {
  return JSON.stringify({
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at ?? null,
    user: identityFromUser(session.user),
  } satisfies StoredAuthSession)
}

export function parseStoredSession(raw: string): StoredAuthSession | null {
  try {
    const value = JSON.parse(raw) as Partial<StoredAuthSession>
    if (!value.accessToken || !value.refreshToken || !value.user?.id || !value.user.email) return null
    return value as StoredAuthSession
  } catch {
    return null
  }
}

export async function persistAuthSession(session: Session): Promise<void> {
  if (!hasTauriRuntime()) return
  await invoke('auth_session_set', { sessionJson: serializeSession(session) })
}

export async function readStoredAuthSession(): Promise<StoredAuthSession | null> {
  if (!hasTauriRuntime()) return null
  const raw = await invoke<string | null>('auth_session_get')
  return raw ? parseStoredSession(raw) : null
}

async function persistRestoredSession(session: Session): Promise<void> {
  let lastError: unknown = null
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await persistAuthSession(session)
      return
    } catch (error) {
      lastError = error
      if (attempt === 0) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
  }
  throw lastError
}

async function runRestoreAuthSession(): Promise<RestoredAuthSession | null> {
  const stored = await readStoredAuthSession()
  if (!stored) return null
  try {
    const { data, error } = await getSupabaseClient().auth.setSession({
      access_token: stored.accessToken,
      refresh_token: stored.refreshToken,
    })
    if (error || !data.session) throw error ?? new Error('Session unavailable')
    try {
      await persistRestoredSession(data.session)
    } catch {
      // The refreshed session is already usable in memory. Do not misreport a
      // keychain write problem as lost connectivity for the current launch.
      console.error('[Tracer auth] Could not persist refreshed session')
    }
    try {
      await syncCloudProviderApiKeysToDevice()
    } catch {
      console.error('[Tracer auth] Could not restore cloud provider API keys')
    }
    return { identity: identityFromUser(data.session.user), online: true }
  } catch (error) {
    if (normalizeAuthError(error).code === 'network') {
      return { identity: stored.user, online: false }
    }

    if (isInvalidStoredSessionError(error)) {
      // Invalid/reused refresh tokens require reconnecting. Removing the stale
      // token prevents every Retry or startup from repeating the failed refresh.
      await clearAuthSession({ remote: false })
      return null
    }
    throw error
  }
}

export async function restoreAuthSession(): Promise<RestoredAuthSession | null> {
  if (restoreSessionRequest) return restoreSessionRequest
  const request = runRestoreAuthSession().finally(() => {
    if (restoreSessionRequest === request) restoreSessionRequest = null
  })
  restoreSessionRequest = request
  return request
}

export async function clearAuthSession(options: { remote?: boolean } = {}): Promise<void> {
  if (options.remote !== false) {
    try { await getSupabaseClient().auth.signOut({ scope: 'local' }) } catch {}
  }
  clearSupabaseMemorySession()
  if (hasTauriRuntime()) {
    try { await invoke('auth_session_delete') } catch {}
  }
}
