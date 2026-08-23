import { invoke } from '@tauri-apps/api/core'
import type { Session, User } from '@supabase/supabase-js'

import { hasTauriRuntime } from '../tauri'
import { clearSupabaseMemorySession, getSupabaseClient } from './client'

export type StoredAuthSession = {
  accessToken: string
  refreshToken: string
  expiresAt: number | null
  user: { id: string; email: string; userMetadata: Record<string, unknown> }
}

export type AuthIdentity = StoredAuthSession['user']

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

export async function restoreAuthSession(): Promise<{ identity: AuthIdentity; online: boolean } | null> {
  const stored = await readStoredAuthSession()
  if (!stored) return null
  try {
    const { data, error } = await getSupabaseClient().auth.setSession({
      access_token: stored.accessToken,
      refresh_token: stored.refreshToken,
    })
    if (error || !data.session) throw error ?? new Error('Session unavailable')
    await persistAuthSession(data.session)
    return { identity: identityFromUser(data.session.user), online: true }
  } catch {
    return { identity: stored.user, online: false }
  }
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
