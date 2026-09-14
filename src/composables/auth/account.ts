import type { Session, User } from '@supabase/supabase-js'

import { openExternal } from '../ai/github-oauth'
import type { AppLanguage, Profile } from '../db'
import { createProfileRepo, useTracerDb } from '../db'
import { redactSensitiveText } from '../security/redact'
import { getSupabaseClient } from './client'
import { TracerAuthError, normalizeAuthError } from './errors'
import { hasTauriRuntime } from '../tauri'
import { appUrl, browserStorageKey } from '../platform/web'
import { callbackUrl, cancelOAuthCallback, finishOAuthCallback, startOAuthCallback, type OAuthCallbackListener } from './oauth-callback'

export type SignupAccountRole = 'student' | 'teacher'
export type AccountRole = SignupAccountRole | 'super'
export type AccountProfileIdentity = { displayName: string; username: string }
export type PendingEmailVerification = { listener: OAuthCallbackListener; email: string; role: SignupAccountRole }
const browserVerificationSubscriptions = new Map<PendingEmailVerification, () => void>()

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

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase()
}

export function validateUsername(value: string): string | null {
  const username = normalizeUsername(value)
  if (username.length < 3 || username.length > 30) return 'Username must be 3–30 characters.'
  if (!/^[a-z0-9][a-z0-9_]*$/.test(username)) {
    return 'Use only lowercase letters, numbers, and underscores; start with a letter or number.'
  }
  return null
}

export async function loadAccountProfileIdentity(): Promise<AccountProfileIdentity | null> {
  const client = getSupabaseClient()
  const { data: { user }, error: userError } = await client.auth.getUser()
  if (userError) throw userError
  if (!user) return null
  const { data, error } = await client.from('profiles').select('display_name,username').eq('id', user.id).single()
  if (error) throw error
  return { displayName: data.display_name, username: data.username }
}

export async function updateAccountProfileIdentity(input: AccountProfileIdentity): Promise<AccountProfileIdentity> {
  const displayName = input.displayName.trim()
  const username = normalizeUsername(input.username)
  if (!displayName || displayName.length > 80) throw new Error('Display name must be 1–80 characters.')
  const usernameError = validateUsername(username)
  if (usernameError) throw new Error(usernameError)

  const client = getSupabaseClient()
  const { data: { user }, error: userError } = await client.auth.getUser()
  if (userError) throw userError
  if (!user?.email) throw new Error('Sign in before changing your profile.')
  const { error } = await client.from('profiles').update({
    display_name: displayName,
    username,
    updated_at: new Date().toISOString(),
  }).eq('id', user.id)
  if (error?.code === '23505') throw new Error('That username is already taken.')
  if (error) throw error

  const localProfile = await createProfileRepo(await useTracerDb()).set({
    name: displayName,
    email: user.email,
    supabaseUserId: user.id,
  })
  return { displayName: localProfile.name, username }
}

export async function signInWithGoogle(
  onAuthorizationUrl?: (url: string) => void,
): Promise<Session> {
  if (!hasTauriRuntime()) {
    const { data, error } = await getSupabaseClient().auth.signInWithOAuth({
      provider: 'google', options: { redirectTo: new URL(appUrl('auth/callback'), location.origin).href, skipBrowserRedirect: true },
    })
    if (error || !data.url) throw normalizeAuthError(error ?? new Error('Could not start Google sign-in.'))
    window.location.assign(data.url)
    return new Promise<Session>(() => { }) // The callback completes in the new document.
  }
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
    await cancelOAuthCallback(listener.id).catch(() => { })
    throw normalizeAuthError(error)
  }
}

export async function signUpWithEmail(input: {
  name: string
  email: string
  password: string
  role: SignupAccountRole
  captchaToken?: string
}): Promise<Session | PendingEmailVerification> {
  if (!hasTauriRuntime()) {
    localStorage.setItem(browserStorageKey('signup-role'), input.role)
    const { data, error } = await getSupabaseClient().auth.signUp({
      email: input.email.trim(), password: input.password,
      options: {
        emailRedirectTo: new URL(appUrl('auth/callback'), location.origin).href,
        data: { full_name: input.name.trim() },
        captchaToken: input.captchaToken,
      },
    })
    if (error) throw normalizeAuthError(error)
    return data.session ?? { listener: { id: 'browser', port: 0 }, email: input.email.trim(), role: input.role }
  }
  const listener = await startOAuthCallback()
  const email = input.email.trim()
  try {
    const { data, error } = await getSupabaseClient().auth.signUp({
      email,
      password: input.password,
      options: {
        emailRedirectTo: callbackUrl(listener.port),
        data: { full_name: input.name.trim() },
        captchaToken: input.captchaToken,
      },
    })
    if (error) throw error
    if (data.session) {
      await cancelOAuthCallback(listener.id).catch(() => { })
      return data.session
    }
    return { listener, email, role: input.role }
  } catch (error) {
    await cancelOAuthCallback(listener.id).catch(() => { })
    throw normalizeAuthError(error)
  }
}

export async function initializeUserRole(role: SignupAccountRole): Promise<AccountRole> {
  const { data, error } = await getSupabaseClient().rpc('initialize_user_role', {
    requested_role: role,
  })
  if (error) {
    console.error('[Tracer auth] Account role initialization failed', {
      code: error.code,
      message: redactSensitiveText(error.message),
      details: redactSensitiveText(error.details ?? ''),
      hint: redactSensitiveText(error.hint ?? ''),
    })
    throw new TracerAuthError('role_failed', error.message)
  }
  if (data !== 'student' && data !== 'teacher' && data !== 'super') {
    throw new TracerAuthError('role_failed', 'Account role was not initialized')
  }
  return data
}

export async function waitForEmailVerification(pending: PendingEmailVerification): Promise<Session> {
  if (pending.listener.id === 'browser') {
    return new Promise<Session>((resolve) => {
      const { data } = getSupabaseClient().auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          data.subscription.unsubscribe()
          browserVerificationSubscriptions.delete(pending)
          resolve(session)
        }
      })
      browserVerificationSubscriptions.set(pending, () => data.subscription.unsubscribe())
    })
  }
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

export async function resendVerification(email: string, role: SignupAccountRole, captchaToken?: string): Promise<PendingEmailVerification> {
  if (!hasTauriRuntime()) {
    const { error } = await getSupabaseClient().auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: new URL(appUrl('auth/callback'), location.origin).href,
        captchaToken,
      },
    })
    if (error) throw normalizeAuthError(error)
    return { listener: { id: 'browser', port: 0 }, email, role }
  }
  const listener = await startOAuthCallback()
  try {
    const { error } = await getSupabaseClient().auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: callbackUrl(listener.port), captchaToken },
    })
    if (error) throw error
    return { listener, email, role }
  } catch (error) {
    await cancelOAuthCallback(listener.id).catch(() => { })
    throw normalizeAuthError(error)
  }
}

export async function cancelPendingEmailVerification(pending: PendingEmailVerification | null): Promise<void> {
  if (!pending) return
  if (pending.listener.id === 'browser') {
    browserVerificationSubscriptions.get(pending)?.()
    browserVerificationSubscriptions.delete(pending)
    return
  }
  await cancelOAuthCallback(pending.listener.id).catch(() => { })
}

export async function signInWithEmail(email: string, password: string, captchaToken?: string): Promise<Session> {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({
    email: email.trim(),
    password,
    options: { captchaToken },
  })
  if (error || !data.session) throw normalizeAuthError(error ?? new Error('No authentication session returned'))
  return data.session
}

export async function deleteAuthenticatedAccount(confirmation: string): Promise<void> {
  const client = getSupabaseClient()
  const { data: sessionData, error: sessionError } = await client.auth.getSession()
  if (sessionError) throw normalizeAuthError(sessionError)
  if (!sessionData.session) throw new TracerAuthError('unknown', 'Sign in before deleting your account')

  const { error } = await client.rpc('delete_own_account', { confirmation })
  if (error) throw error
}

export async function prepareAuthenticatedProfile(input: {
  session: Session
  submittedName?: string
  language: AppLanguage
}): Promise<{ profile: Profile; displayName: string; email: string }> {
  await assertLocalAccountOwnership(input.session)
  const prepared = await upsertAuthenticatedCloudProfile(input)
  const profile = await saveAuthenticatedLocalProfile({
    session: input.session,
    ...prepared,
  })
  return { profile, displayName: profile.name, email: prepared.email }
}

export async function upsertAuthenticatedCloudProfile(input: {
  session: Session
  submittedName?: string
  language: AppLanguage
}): Promise<{ displayName: string; email: string }> {
  const user = input.session.user
  const email = user.email?.trim() ?? ''
  if (!email) throw new TracerAuthError('missing_email', 'The authenticated account did not provide an email address')
  const displayName = displayNameFromUser(user, input.submittedName)

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
  const { error: identityError } = await getSupabaseClient()
    .from('profiles')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', user.id)
  if (identityError) throw new TracerAuthError('profile_failed', identityError.message)
  return { displayName: displayName || email.split('@')[0], email }
}

export async function saveAuthenticatedLocalProfile(input: {
  session: Session
  displayName: string
  email: string
}): Promise<Profile> {
  const db = await useTracerDb()
  const repo = createProfileRepo(db)
  let profile: Profile
  try {
    profile = await repo.set({
      name: input.displayName || input.email.split('@')[0] || 'User',
      email: input.email,
      supabaseUserId: input.session.user.id,
    })
  } catch (error) {
    throw new TracerAuthError('local_data_failed', error instanceof Error ? error.message : 'Could not save local profile')
  }
  return profile
}

export async function assertLocalAccountOwnership(session: Session): Promise<void> {
  const user = session.user
  const db = await useTracerDb()
  const repo = createProfileRepo(db)
  let existing: Profile | null
  try {
    existing = await repo.get()
  } catch (error) {
    throw new TracerAuthError('local_data_failed', error instanceof Error ? error.message : 'Could not read local profile')
  }
  if (existing?.supabaseUserId && existing.supabaseUserId !== user.id) {
    await getSupabaseClient().auth.signOut({ scope: 'local' }).catch(() => { })
    throw new TracerAuthError('account_mismatch', 'This installation is linked to a different account')
  }
}
