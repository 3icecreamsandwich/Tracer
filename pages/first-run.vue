<template>
  <main>
    <div class="mx-auto max-w-md p-8">
      <h1 class="text-2xl font-semibold">{{ t('auth.firstRunTitle') }}</h1>

      <template v-if="stage === 'account'">
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ t('auth.accountDescription') }}</p>

        <div v-if="!configured" class="mt-6 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          {{ t('auth.notConfigured') }}
        </div>

        <button
          type="button"
          class="mt-6 flex w-full items-center justify-center gap-3 rounded border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-900 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
          :disabled="busy || !configured"
          @click="onGoogle"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5">
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.37l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.39 13.92A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.54l3.35-2.62Z" />
            <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
          </svg>
          {{ busyProvider === 'google' ? t('auth.openingBrowser') : t('auth.google') }}
        </button>

        <div class="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
          <span class="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          {{ t('auth.orEmail') }}
          <span class="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        <form class="space-y-4" @submit.prevent="onEmail">
          <div v-if="mode === 'signup'">
            <label class="block text-sm font-medium" for="account-name">{{ t('auth.name') }}</label>
            <input id="account-name" v-model="name" autocomplete="name" class="auth-input" />
          </div>
          <div>
            <label class="block text-sm font-medium" for="account-email">{{ t('auth.email') }}</label>
            <input id="account-email" v-model="email" type="email" autocomplete="email" class="auth-input" />
          </div>
          <div>
            <label class="block text-sm font-medium" for="account-password">{{ t('auth.accountPassword') }}</label>
            <input id="account-password" v-model="accountPassword" type="password" :autocomplete="mode === 'signup' ? 'new-password' : 'current-password'" class="auth-input" />
          </div>
          <button type="submit" class="auth-primary" :disabled="busy || !configured">
            {{ busyProvider === 'email' ? t('common.loading') : mode === 'signup' ? t('auth.signUpEmail') : t('auth.signInEmail') }}
          </button>
        </form>

        <button type="button" class="mt-4 w-full text-sm text-blue-700 hover:underline dark:text-blue-300" :disabled="busy" @click="toggleMode">
          {{ mode === 'signup' ? t('auth.haveAccount') : t('auth.needAccount') }}
        </button>

        <div v-if="authorizationUrl && errorCode === 'browser_open_failed'" class="mt-4 rounded border border-slate-300 p-3 text-sm dark:border-slate-700">
          <p>{{ t('auth.copyBrowserLink') }}</p>
          <button type="button" class="mt-2 font-medium text-blue-700 hover:underline dark:text-blue-300" @click="copyAuthorizationUrl">{{ t('common.copy') }}</button>
        </div>
      </template>

      <template v-else-if="stage === 'verify'">
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ t('auth.checkEmail', { email }) }}</p>
        <div class="mt-6 rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
          {{ t('auth.waitingVerification') }}
        </div>
        <button type="button" class="auth-primary mt-5" :disabled="busy || resendCooldown > 0" @click="onResend">
          {{ resendCooldown > 0 ? t('auth.resendIn', { seconds: resendCooldown }) : t('auth.resend') }}
        </button>
        <button type="button" class="mt-4 w-full text-sm text-blue-700 hover:underline dark:text-blue-300" @click="returnToSignIn">{{ t('auth.returnToSignIn') }}</button>
      </template>

      <template v-else>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ t('auth.localPasswordDescription') }}</p>
        <div class="mt-5 rounded border border-slate-200 p-3 text-sm dark:border-slate-700">
          <div class="font-medium">{{ authenticatedEmail }}</div>
          <div class="mt-1 text-slate-500 dark:text-slate-400">{{ t('auth.accountConnected') }}</div>
        </div>
        <form class="mt-6 space-y-4" @submit.prevent="onLocalSetup">
          <div>
            <label class="block text-sm font-medium" for="profile-name">{{ t('auth.name') }}</label>
            <input id="profile-name" v-model="name" autocomplete="name" class="auth-input" />
          </div>
          <div>
            <label class="block text-sm font-medium" for="local-password">{{ t('auth.localPassword') }}</label>
            <input id="local-password" v-model="localPassword" type="password" autocomplete="new-password" class="auth-input" />
          </div>
          <div>
            <label class="block text-sm font-medium" for="local-confirm">{{ t('auth.confirmPassword') }}</label>
            <input id="local-confirm" v-model="localConfirm" type="password" autocomplete="new-password" class="auth-input" />
          </div>
          <button type="submit" class="auth-primary" :disabled="busy">{{ busy ? t('common.loading') : t('auth.finishSetup') }}</button>
        </form>
      </template>

      <p v-if="error" role="alert" class="mt-4 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Session } from '@supabase/supabase-js'

import {
  displayNameFromUser,
  cancelPendingEmailVerification,
  isSupabaseConfigured,
  normalizeAuthError,
  persistAuthSession,
  prepareAuthenticatedProfile,
  resendVerification,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  waitForEmailVerification,
  type AuthErrorCode,
  type PendingEmailVerification,
} from '../src/composables/auth'
import { createProfileRepo, useTracerDb } from '../src/composables/db'
import { lockFirstRunSetPassword, lockGetStatus } from '../src/composables/lock'
import { useLockSession } from '../src/composables/lock-session'
import { useAppLanguage } from '../src/composables/language'
import { hasTauriRuntime } from '../src/composables/tauri'

definePageMeta({ hideNavbar: true })

const router = useRouter()
const { markUnlocked } = useLockSession()
const { language, t } = useAppLanguage()

const configured = isSupabaseConfigured()
const stage = ref<'account' | 'verify' | 'local'>('account')
const mode = ref<'signup' | 'signin'>('signup')
const name = ref('')
const email = ref('')
const accountPassword = ref('')
const localPassword = ref('')
const localConfirm = ref('')
const authenticatedEmail = ref('')
const activeSession = shallowRef<Session | null>(null)
const pendingVerification = shallowRef<PendingEmailVerification | null>(null)
const error = ref<string | null>(null)
const errorCode = ref<AuthErrorCode | null>(null)
const busyProvider = ref<'google' | 'email' | 'resend' | 'local' | null>(null)
const busy = computed(() => busyProvider.value !== null)
const authorizationUrl = ref('')
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

function translatedError(input: unknown) {
  const normalized = normalizeAuthError(input)
  errorCode.value = normalized.code
  const keys: Partial<Record<AuthErrorCode, string>> = {
    account_mismatch: 'auth.errorAccountMismatch', browser_open_failed: 'auth.errorBrowser',
    callback_timeout: 'auth.errorTimeout', email_not_verified: 'auth.errorUnverified',
    missing_email: 'auth.errorMissingEmail', network: 'auth.errorNetwork',
    oauth_cancelled: 'auth.errorCancelled', profile_failed: 'auth.errorProfile',
    supabase_not_configured: 'auth.notConfigured', unknown: 'auth.errorUnknown',
  }
  error.value = t(keys[normalized.code] ?? 'auth.errorUnknown')
}

function clearError() { error.value = null; errorCode.value = null }
function toggleMode() { mode.value = mode.value === 'signup' ? 'signin' : 'signup'; accountPassword.value = ''; clearError() }
function returnToSignIn() { void cancelPendingEmailVerification(pendingVerification.value); pendingVerification.value = null; stage.value = 'account'; mode.value = 'signin'; accountPassword.value = ''; clearError() }

function acceptSession(session: Session, submittedName = '') {
  activeSession.value = session
  authenticatedEmail.value = session.user.email?.trim() ?? ''
  name.value = displayNameFromUser(session.user, submittedName)
  accountPassword.value = ''
  stage.value = 'local'
  clearError()
}

async function onGoogle() {
  clearError(); authorizationUrl.value = ''; busyProvider.value = 'google'
  try { acceptSession(await signInWithGoogle((url) => { authorizationUrl.value = url })) }
  catch (input) { translatedError(input) }
  finally { busyProvider.value = null }
}

async function onEmail() {
  clearError()
  if (mode.value === 'signup' && !name.value.trim()) { error.value = t('auth.errorName'); return }
  if (!email.value.trim() || accountPassword.value.length < 8) { error.value = t('auth.errorEmailPassword'); return }
  busyProvider.value = 'email'
  try {
    if (mode.value === 'signin') {
      acceptSession(await signInWithEmail(email.value, accountPassword.value), name.value)
      return
    }
    const result = await signUpWithEmail({ name: name.value, email: email.value, password: accountPassword.value })
    if ('access_token' in result) { acceptSession(result, name.value); return }
    pendingVerification.value = result
    accountPassword.value = ''
    stage.value = 'verify'
    startCooldown()
    void watchForVerification(result)
  } catch (input) { accountPassword.value = ''; translatedError(input) }
  finally { busyProvider.value = null }
}

async function watchForVerification(pending: PendingEmailVerification) {
  try { acceptSession(await waitForEmailVerification(pending), name.value) }
  catch (input) { if (stage.value === 'verify' && pendingVerification.value?.listener.id === pending.listener.id) translatedError(input) }
}

function startCooldown() {
  resendCooldown.value = 30
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    resendCooldown.value = Math.max(0, resendCooldown.value - 1)
    if (resendCooldown.value === 0 && cooldownTimer) { clearInterval(cooldownTimer); cooldownTimer = null }
  }, 1000)
}

async function onResend() {
  clearError(); busyProvider.value = 'resend'
  try {
    await cancelPendingEmailVerification(pendingVerification.value)
    const pending = await resendVerification(email.value)
    pendingVerification.value = pending
    startCooldown()
    void watchForVerification(pending)
  } catch (input) { translatedError(input) }
  finally { busyProvider.value = null }
}

async function copyAuthorizationUrl() {
  try { await navigator.clipboard.writeText(authorizationUrl.value) } catch { translatedError(new Error('copy failed')) }
}

async function onLocalSetup() {
  clearError()
  if (!activeSession.value) { stage.value = 'account'; return }
  if (!name.value.trim()) { error.value = t('auth.errorName'); return }
  if (localPassword.value.trim().length < 8) { error.value = t('auth.errorLocalPassword'); return }
  if (localPassword.value !== localConfirm.value) { error.value = t('auth.errorPasswordsMatch'); return }
  busyProvider.value = 'local'
  try {
    await prepareAuthenticatedProfile({ session: activeSession.value, submittedName: name.value, language: language.value })
    await lockFirstRunSetPassword(localPassword.value)
    await persistAuthSession(activeSession.value)
    localPassword.value = ''; localConfirm.value = ''
    markUnlocked()
    await router.replace('/')
  } catch (input) { localPassword.value = ''; localConfirm.value = ''; translatedError(input) }
  finally { busyProvider.value = null }
}

onBeforeUnmount(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
  void cancelPendingEmailVerification(pendingVerification.value)
})

onMounted(async () => {
  if (!hasTauriRuntime()) return
  try {
    const [status, existing] = await Promise.all([
      lockGetStatus(),
      useTracerDb().then((db) => createProfileRepo(db).get()),
    ])
    if (status.has_verifier && existing) {
      await router.replace(status.requires_unlock ? '/unlock' : '/')
    }
  } catch {
    // The normal first-run flow will surface actionable setup errors.
  }
})
</script>

<style scoped>
.auth-input { @apply mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50; }
.auth-primary { @apply w-full rounded bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white; }
</style>
