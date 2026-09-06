<template>
  <main class="min-h-screen bg-white text-neutral-950 dark:bg-slate-950 dark:text-slate-50">
    <div class="mx-auto w-full max-w-[437px] px-8 pb-12 pt-11">
      <h1 class="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-orange-400
               bg-clip-text text-[32px] font-bold leading-tight text-transparent">{{ t('auth.firstRunTitle') }}</h1>

      <template v-if="stage === 'account'">

        <div
          v-if="mode === 'signup'"
          class="mt-4 grid h-10 grid-cols-2 rounded-[10px] border border-neutral-300 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          role="group"
          :aria-label="t('auth.accountType')"
        >
          <button
            v-for="option in roleOptions"
            :key="option.value"
            type="button"
            class="rounded-lg text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            :class="accountRole === option.value ? 'bg-neutral-800 text-white' : 'bg-transparent text-neutral-950 dark:text-slate-50'"
            :aria-pressed="accountRole === option.value"
            :disabled="busy"
            @click="accountRole = option.value"
          >
            {{ t(option.label) }}
          </button>
        </div>

        <div v-if="!configured" class="mt-6 rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          {{ t('auth.notConfigured') }}
        </div>

        <button
          type="button"
          class="mt-[18px] flex h-11 w-full items-center justify-center rounded-[10px] border border-neutral-300 bg-white px-4 font-medium text-neutral-950 shadow-sm hover:bg-neutral-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
          :disabled="busy || !configured"
          @click="onGoogle"
        >
          <LoadingSpinner v-if="busyProvider === 'google'" class="mr-auto" size="sm" :show-label="false" />
          <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="mr-auto h-6 w-6">
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.37l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.62A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.39 13.92A6.02 6.02 0 0 1 6.07 12c0-.67.12-1.32.32-1.92V7.46H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.54l3.35-2.62Z" />
            <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.46l3.35 2.62C7.18 7.71 9.39 5.95 12 5.95Z" />
          </svg>
          <span class="mr-auto">{{ busyProvider === 'google' ? t('auth.openingBrowser') : t(mode === 'signup' ? 'auth.google' : 'auth.googleSignIn') }}</span>
        </button>

        <div class="my-[18px] flex items-center gap-3 text-sm uppercase text-neutral-400">
          <span class="h-px flex-1 bg-neutral-300 dark:bg-slate-700" />
          {{ t('auth.or') }}
          <span class="h-px flex-1 bg-neutral-300 dark:bg-slate-700" />
        </div>

        <form class="space-y-2" @submit.prevent="onEmail">
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
            <div class="relative">
              <input
                id="account-password"
                v-model="accountPassword"
                :type="showAccountPassword ? 'text' : 'password'"
                :autocomplete="mode === 'signup' ? 'new-password' : 'current-password'"
                class="auth-input auth-password-input"
              />
              <button
                type="button"
                class="absolute bottom-0 right-0 flex h-10 w-11 items-center justify-center rounded-r-[10px] text-neutral-500 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-500 dark:text-slate-400 dark:hover:text-white"
                :aria-label="t(showAccountPassword ? 'auth.hidePassword' : 'auth.showPassword')"
                :aria-pressed="showAccountPassword"
                @click="showAccountPassword = !showAccountPassword"
              >
                <svg v-if="showAccountPassword" aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
                  <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9 6 9 6a18.5 18.5 0 0 1-2.1 2.8" />
                  <path d="M6.6 6.6C4.4 8 3 10 3 10s3.5 6 9 6a9.7 9.7 0 0 0 3-.5" />
                </svg>
                <svg v-else aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </button>
            </div>
          </div>
          <label v-if="mode === 'signup'" class="flex items-center gap-5 px-4 pb-3 pt-2 text-sm leading-[18px] text-neutral-800 dark:text-slate-200">
            <input
              v-model="acceptedTerms"
              type="checkbox"
              class="h-5 w-5 shrink-0 rounded border-neutral-300 accent-neutral-800"
              :disabled="busy"
            />
            <span>
              {{ t('auth.agreePrefix') }}
              <span class="underline underline-offset-2">{{ t('auth.termsOfService') }}</span>
              {{ t('auth.and') }}
              <span class="underline underline-offset-2">{{ t('auth.privacyPolicy') }}</span>
            </span>
          </label>
          <button type="submit" class="auth-primary" :disabled="busy || !configured">
            <LoadingSpinner v-if="busyProvider === 'email'" size="sm" />
            <template v-else>{{ mode === 'signup' ? t('auth.letsGo') : t('auth.signInEmail') }}</template>
          </button>
        </form>

        <button type="button" class="mt-2 w-full text-sm text-neutral-700 underline underline-offset-2 hover:text-neutral-950 dark:text-slate-300 dark:hover:text-white" :disabled="busy" @click="toggleMode">
          {{ mode === 'signup' ? t('auth.haveAccount') : t('auth.needAccount') }}
        </button>

        <div v-if="authorizationUrl && errorCode === 'browser_open_failed'" class="mt-4 rounded border border-slate-300 p-3 text-sm dark:border-slate-700">
          <p>{{ t('auth.copyBrowserLink') }}</p>
          <button type="button" class="mt-2 font-medium text-blue-700 hover:underline dark:text-blue-300" @click="copyAuthorizationUrl"><AppIcon name="copy" class="mr-1 inline-block align-middle" />{{ t('common.copy') }}</button>
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
        <div class="mt-5 rounded border border-slate-200 p-3 text-sm dark:border-slate-700">
          <div class="font-medium">{{ authenticatedEmail }}</div>
          <div class="mt-1 text-slate-500 dark:text-slate-400">
            {{ t(usesGoogleDeviceKey ? 'auth.googleAccountConnected' : 'auth.emailAccountConnected') }}
          </div>
        </div>
        <form class="mt-6 space-y-4" @submit.prevent="onLocalSetup">
          <div>
            <label class="block text-sm font-medium" for="profile-name">{{ t('auth.name') }}</label>
            <input id="profile-name" v-model="name" autocomplete="name" class="auth-input" />
          </div>
          <div v-if="usesGoogleDeviceKey" class="rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
            <p class="font-medium">{{ t('auth.deviceKeyTitle') }}</p>
            <p class="mt-2">{{ t('auth.deviceKeyDescription') }}</p>
            <p class="mt-2">{{ t('auth.deviceKeyTradeoff') }}</p>
          </div>
          <div v-else-if="usesEmailAccountPassword" class="rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
            {{ t('auth.emailPasswordReuse') }}
          </div>
          <div v-else>
            <label class="block text-sm font-medium" for="local-password">{{ t('auth.localPassword') }}</label>
            <input id="local-password" v-model="localPassword" type="password" autocomplete="new-password" class="auth-input" />
          </div>
          <div v-if="!usesGoogleDeviceKey && !usesEmailAccountPassword">
            <label class="block text-sm font-medium" for="local-confirm">{{ t('auth.confirmPassword') }}</label>
            <input id="local-confirm" v-model="localConfirm" type="password" autocomplete="new-password" class="auth-input" />
          </div>
          <label v-if="pendingSignupRole && usesGoogleDeviceKey" class="flex items-center gap-5 px-4 py-2 text-sm leading-[18px] text-neutral-800 dark:text-slate-200">
            <input
              v-model="acceptedTerms"
              type="checkbox"
              class="h-5 w-5 shrink-0 rounded border-neutral-300 accent-neutral-800"
              :disabled="busy"
            />
            <span>
              {{ t('auth.agreePrefix') }}
              <span class="underline underline-offset-2">{{ t('auth.termsOfService') }}</span>
              {{ t('auth.and') }}
              <span class="underline underline-offset-2">{{ t('auth.privacyPolicy') }}</span>
            </span>
          </label>
          <button type="submit" class="auth-primary" :disabled="busy">
            <LoadingSpinner v-if="busy" size="sm" />
            <template v-else>{{ usesGoogleDeviceKey ? t('auth.continueWithoutPassword') : t('auth.finishSetup') }}</template>
          </button>
        </form>
      </template>

      <p v-if="error" role="alert" class="mt-4 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      <button
        v-if="showsResetRecovery"
        type="button"
        class="mt-3 w-full rounded-[10px] border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950"
        :disabled="busy"
        @click="openResetConfirmation"
      >
        {{ t('settings.resetTracer') }}
      </button>
    </div>

    <ResetTracerDialog
      :open="showResetConfirmation"
      :busy="busy"
      :error="resetError"
      @cancel="closeResetConfirmation"
      @confirm="onConfirmReset"
    />
  </main>
</template>

<script setup lang="ts">
import type { Session } from '@supabase/supabase-js'

import {
  displayNameFromUser,
  assertLocalAccountOwnership,
  isGoogleUser,
  cancelPendingEmailVerification,
  clearAuthSession,
  isSupabaseConfigured,
  normalizeAuthError,
  persistAuthSession,
  saveAuthenticatedLocalProfile,
  resendVerification,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  initializeUserRole,
  upsertAuthenticatedCloudProfile,
  waitForEmailVerification,
  type AccountRole,
  type AuthErrorCode,
  type PendingEmailVerification,
} from '../src/composables/auth'
import { createProfileRepo, createSettingsRepo, useTracerDb } from '../src/composables/db'
import { lockFirstRunSetDeviceKey, lockFirstRunSetPassword, lockGetStatus, lockResetTracer } from '../src/composables/lock'
import { syncCloudProviderApiKeysToDevice } from '../src/composables/ai/cloud-provider-keys'
import { useLockSession } from '../src/composables/lock-session'
import { useAppLanguage } from '../src/composables/language'
import { hasTauriRuntime } from '../src/composables/tauri'

definePageMeta({ hideNavbar: true, hideFloatingChat: true })

const router = useRouter()
const { markUnlocked } = useLockSession()
const { language, t } = useAppLanguage()

const configured = isSupabaseConfigured()
const stage = ref<'account' | 'verify' | 'local'>('account')
const mode = ref<'signup' | 'signin'>('signup')
const accountRole = ref<AccountRole>('student')
const roleOptions: Array<{ value: AccountRole; label: string }> = [
  { value: 'student', label: 'auth.students' },
  { value: 'teacher', label: 'auth.teachers' },
]
const name = ref('')
const email = ref('')
const accountPassword = ref('')
const showAccountPassword = ref(false)
const pendingEmailPassword = ref('')
const acceptedTerms = ref(false)
const localPassword = ref('')
const localConfirm = ref('')
const authenticatedEmail = ref('')
const activeSession = shallowRef<Session | null>(null)
const activeAuthProvider = ref<'google' | 'email' | null>(null)
const pendingVerification = shallowRef<PendingEmailVerification | null>(null)
const pendingSignupRole = ref<AccountRole | null>(null)
const error = ref<string | null>(null)
const errorCode = ref<AuthErrorCode | null>(null)
const busyProvider = ref<'google' | 'email' | 'resend' | 'local' | null>(null)
const busy = computed(() => busyProvider.value !== null)
const usesGoogleDeviceKey = computed(() => activeAuthProvider.value === 'google' && activeSession.value ? isGoogleUser(activeSession.value.user) : false)
const usesEmailAccountPassword = computed(() => activeAuthProvider.value === 'email' && pendingEmailPassword.value.length >= 8)
const showsResetRecovery = computed(() => errorCode.value === 'account_mismatch' || errorCode.value === 'local_data_failed')
const authorizationUrl = ref('')
const showResetConfirmation = ref(false)
const resetError = ref<string | null>(null)
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

function translatedError(input: unknown) {
  const normalized = normalizeAuthError(input)
  errorCode.value = normalized.code
  const keys: Partial<Record<AuthErrorCode, string>> = {
    account_mismatch: 'auth.errorAccountMismatch', browser_open_failed: 'auth.errorBrowser',
    callback_timeout: 'auth.errorTimeout', device_key_failed: 'auth.errorDeviceKey', email_not_verified: 'auth.errorUnverified',
    email_rate_limited: 'auth.errorEmailRateLimit', invalid_credentials: 'auth.errorInvalidCredentials',
    local_data_failed: 'auth.errorLocalData', missing_email: 'auth.errorMissingEmail', network: 'auth.errorNetwork',
    oauth_cancelled: 'auth.errorCancelled', profile_failed: 'auth.errorProfile',
    role_failed: 'auth.errorRole',
    supabase_not_configured: 'auth.notConfigured', unknown: 'auth.errorUnknown',
  }
  error.value = t(keys[normalized.code] ?? 'auth.errorUnknown')
}

function clearError() { error.value = null; errorCode.value = null }
function toggleMode() { mode.value = mode.value === 'signup' ? 'signin' : 'signup'; accountPassword.value = ''; showAccountPassword.value = false; pendingEmailPassword.value = ''; acceptedTerms.value = false; clearError() }
function returnToSignIn() { void cancelPendingEmailVerification(pendingVerification.value); pendingVerification.value = null; pendingEmailPassword.value = ''; stage.value = 'account'; mode.value = 'signin'; accountPassword.value = ''; showAccountPassword.value = false; clearError() }

function acceptSession(
  session: Session,
  provider: 'google' | 'email',
  submittedName = '',
  signupRole: AccountRole | null = null,
  emailPassword = '',
) {
  activeSession.value = session
  activeAuthProvider.value = provider
  authenticatedEmail.value = session.user.email?.trim() ?? ''
  name.value = displayNameFromUser(session.user, submittedName)
  pendingSignupRole.value = signupRole
  pendingEmailPassword.value = provider === 'email' ? emailPassword : ''
  if (provider === 'google' && signupRole) acceptedTerms.value = false
  accountPassword.value = ''
  showAccountPassword.value = false
  stage.value = 'local'
  clearError()
}

async function onGoogle() {
  clearError()
  authorizationUrl.value = ''; busyProvider.value = 'google'
  try {
    acceptSession(
      await signInWithGoogle((url) => { authorizationUrl.value = url }),
      'google',
      '',
      mode.value === 'signup' ? accountRole.value : null,
    )
  }
  catch (input) { translatedError(input) }
  finally { busyProvider.value = null }
}

async function onEmail() {
  clearError()
  if (mode.value === 'signup' && !name.value.trim()) { error.value = t('auth.errorName'); return }
  if (!email.value.trim() || accountPassword.value.length < 8) { error.value = t('auth.errorEmailPassword'); return }
  if (mode.value === 'signup' && !acceptedTerms.value) { error.value = t('auth.errorTerms'); return }
  busyProvider.value = 'email'
  const submittedPassword = accountPassword.value
  try {
    if (mode.value === 'signin') {
      acceptSession(await signInWithEmail(email.value, submittedPassword), 'email', name.value, null, submittedPassword)
      return
    }
    const result = await signUpWithEmail({
      name: name.value,
      email: email.value,
      password: submittedPassword,
      role: accountRole.value,
    })
    if ('access_token' in result) { acceptSession(result, 'email', name.value, accountRole.value, submittedPassword); return }
    pendingVerification.value = result
    pendingEmailPassword.value = submittedPassword
    accountPassword.value = ''
    stage.value = 'verify'
    startCooldown()
    void watchForVerification(result)
  } catch (input) { accountPassword.value = ''; showAccountPassword.value = false; translatedError(input) }
  finally { busyProvider.value = null }
}

async function watchForVerification(pending: PendingEmailVerification) {
  try {
    const session = await waitForEmailVerification(pending)
    acceptSession(session, 'email', name.value, pending.role, pendingEmailPassword.value)
  }
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
    const pending = await resendVerification(email.value, pendingVerification.value?.role ?? accountRole.value)
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
  if (pendingSignupRole.value && usesGoogleDeviceKey.value && !acceptedTerms.value) { error.value = t('auth.errorTerms'); return }
  if (!name.value.trim()) { error.value = t('auth.errorName'); return }
  const vaultPassword = usesEmailAccountPassword.value ? pendingEmailPassword.value : localPassword.value
  if (!usesGoogleDeviceKey.value && vaultPassword.trim().length < 8) { error.value = t('auth.errorLocalPassword'); return }
  if (!usesGoogleDeviceKey.value && !usesEmailAccountPassword.value && localPassword.value !== localConfirm.value) { error.value = t('auth.errorPasswordsMatch'); return }
  busyProvider.value = 'local'
  try {
    await assertLocalAccountOwnership(activeSession.value)
    if (usesGoogleDeviceKey.value) {
      await lockFirstRunSetDeviceKey()
      const db = await useTracerDb()
      await createSettingsRepo(db).set({ startupLockEnabled: false })
    } else {
      await lockFirstRunSetPassword(vaultPassword)
    }
    const prepared = await upsertAuthenticatedCloudProfile({
      session: activeSession.value,
      submittedName: name.value,
      language: language.value,
    })
    if (pendingSignupRole.value) await initializeUserRole(pendingSignupRole.value)
    await saveAuthenticatedLocalProfile({ session: activeSession.value, ...prepared })
    await persistAuthSession(activeSession.value)
    try {
      await syncCloudProviderApiKeysToDevice()
    } catch {
      console.error('[Tracer auth] Could not restore cloud provider API keys')
    }
    localPassword.value = ''; localConfirm.value = ''; pendingEmailPassword.value = ''
    markUnlocked()
    await router.replace('/')
  } catch (input) { localPassword.value = ''; localConfirm.value = ''; translatedError(input) }
  finally { busyProvider.value = null }
}

function openResetConfirmation() {
  resetError.value = null
  showResetConfirmation.value = true
}

function closeResetConfirmation() {
  if (busy.value) return
  showResetConfirmation.value = false
  resetError.value = null
}

async function onConfirmReset() {
  resetError.value = null
  busyProvider.value = 'local'
  try {
    await clearAuthSession().catch(() => {})
    await lockResetTracer()
    window.location.reload()
  } catch (input) {
    resetError.value = input instanceof Error ? input.message : t('auth.errorLocalData')
    busyProvider.value = null
  }
}

onBeforeUnmount(() => {
  pendingEmailPassword.value = ''
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
.auth-input { @apply mt-0.5 h-10 w-full rounded-[10px] border border-neutral-300 bg-white px-3 text-neutral-950 shadow-sm outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50; }
.auth-password-input { padding-right: 2.75rem; }
.auth-primary { @apply h-10 w-full rounded-[10px] bg-neutral-800 px-4 text-lg font-medium text-white hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-offset-slate-950; }
</style>
