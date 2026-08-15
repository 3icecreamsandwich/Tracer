import type { Session, User } from '@supabase/supabase-js'

import { openExternal } from '../ai/github-oauth'
import type { AppLanguage, Profile } from '../db'
import { createProfileRepo, useTracerDb } from '../db'
import { redactSensitiveText } from '../security/redact'
import { getSupabaseClient } from './client'
import { TracerAuthError, normalizeAuthError } from './errors'
import { callbackUrl, cancelOAuthCallback, finishOAuthCallback, startOAuthCallback, type OAuthCallbackListener } from './oauth-callback'

export type PendingEmailVerification = { listener: OAuthCallbackListener; email: string }

export function isGoogleUser(user: User): boolean {
  const provider = user.app_metadata?.provider
  const providers = user.app_metadata?.providers
  return provider === 'google' || (Array.isArray(providers) && providers.includes('google'))
}

export function displayNameFromUser(user: User, submittedName = ''): string {
  const submitted = submittedName.trim()
  if (submitted) return submitted
  for (const key of ['full_name', 'name', 'display_name']) {
    const value = user.user_metadata?.[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

export async function signInWithGoogle(onAuthorizationUrl?: (url: string) => void): Promise<Session> {
  const listener = await startOAuthCallback()
  try {
    const redirectTo = callbackUrl(listener.port)
    const { data, error } = await getSupabaseClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, skipBrowserRedirect: true },
    })
    if (error) throw error
    if (!data.url) throw new Error('OAuth authorization URL was not returned')
    onAuthorizationUrl?.(data.url)
    try {
      await openExternal(data.url)
    } catch (error) {
      throw new TracerAuthError('browser_open_failed', error instanceof Error ? error.message : 'Could not open browser')
    }
    const result = await finishOAuthCallback(listener.id)
    if (result.error || !result.code) {
      throw new TracerAuthError('oauth_cancelled', result.errorDescription ?? result.error ?? 'Google authorization was cancelled')
    }
    const { data: exchange, error: exchangeError } = await getSupabaseClient().auth.exchangeCodeForSession(result.code)
    if (exchangeError || !exchange.session) throw exchangeError ?? new Error('No authentication session returned')
    return exchange.session
  } catch (error) {
    await cancelOAuthCallback(listener.id).catch(() => {})
    throw normalizeAuthError(error)
  }
}

export async function signUpWithEmail(input: { name: string; email: string; password: string }): Promise<Session | PendingEmailVerification> {
  const listener = await startOAuthCallback()
  const email = input.email.trim()
  try {
    const { data, error } = await getSupabaseClient().auth.signUp({
      email,
      password: input.password,
      options: {
        emailRedirectTo: callbackUrl(listener.port),
        data: { full_name: input.name.trim() },
      },
    })
    if (error) throw error
    if (data.session) {
      await cancelOAuthCallback(listener.id).catch(() => {})
      return data.session
    }
    return { listener, email }
  } catch (error) {
    await cancelOAuthCallback(listener.id).catch(() => {})
    throw normalizeAuthError(error)
  }
}

export async function waitForEmailVerification(pending: PendingEmailVerification): Promise<Session> {
  try {
    const result = await finishOAuthCallback(pending.listener.id, 10 * 60_000)
    if (result.error || !result.code) throw new Error(result.errorDescription ?? result.error ?? 'Email verification failed')
    const { data, error } = await getSupabaseClient().auth.exchangeCodeForSession(result.code)
    if (error || !data.session) throw error ?? new Error('No authentication session returned')
    return data.session
  } catch (error) {
    throw normalizeAuthError(error)
  }
}

export async function resendVerification(email: string): Promise<PendingEmailVerification> {
  const listener = await startOAuthCallback()
  try {
    const { error } = await getSupabaseClient().auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: callbackUrl(listener.port) },
    })
    if (error) throw error
    return { listener, email }
  } catch (error) {
    await cancelOAuthCallback(listener.id).catch(() => {})
    throw normalizeAuthError(error)
  }
}

export async function cancelPendingEmailVerification(pending: PendingEmailVerification | null): Promise<void> {
  if (!pending) return
  await cancelOAuthCallback(pending.listener.id).catch(() => {})
}

export async function signInWithEmail(email: string, password: string): Promise<Session> {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email: email.trim(), password })
  if (error || !data.session) throw normalizeAuthError(error ?? new Error('No authentication session returned'))
  return data.session
}

export async function prepareAuthenticatedProfile(input: {
  session: Session
  submittedName?: string
  language: AppLanguage
}): Promise<{ profile: Profile; displayName: string; email: string }> {
  const user = input.session.user
  const email = user.email?.trim() ?? ''
  if (!email) throw new TracerAuthError('missing_email', 'The authenticated account did not provide an email address')
  const displayName = displayNameFromUser(user, input.submittedName)
  const db = await useTracerDb()
  const repo = createProfileRepo(db)
  const existing = await repo.get()
  if (existing?.supabaseUserId && existing.supabaseUserId !== user.id) {
    await getSupabaseClient().auth.signOut({ scope: 'local' }).catch(() => {})
    throw new TracerAuthError('account_mismatch', 'This installation is linked to a different account')
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  const { error } = await getSupabaseClient().from('profiles').upsert({
    id: user.id,
    display_name: displayName || email.split('@')[0],
    locale: input.language,
    timezone,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })
  if (error) {
    console.error('[Tracer auth] Cloud profile upsert failed', {
      code: error.code,
      message: redactSensitiveText(error.message),
      details: redactSensitiveText(error.details ?? ''),
      hint: redactSensitiveText(error.hint ?? ''),
    })
    throw new TracerAuthError('profile_failed', error.message)
  }

  const profile = await repo.set({
    name: displayName || email.split('@')[0] || 'User',
    email,
    supabaseUserId: user.id,
  })
  return { profile, displayName: profile.name, email }
}
