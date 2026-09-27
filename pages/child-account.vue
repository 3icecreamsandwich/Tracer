<template>
  <main class="min-h-screen bg-white text-neutral-950 dark:bg-slate-950 dark:text-slate-50">
    <div class="tracer-page mx-auto w-full max-w-[437px] px-8 pb-12 pt-11">
      <h1 class="text-2xl font-bold">Create child account</h1>
      <p v-if="loading" class="mt-4 text-sm text-slate-600 dark:text-slate-300">Checking parent consent…</p>
      <template v-else-if="ready">
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">A parent or guardian has approved this one-time account setup link. Google sign-in is not available for this step.</p>
        <form class="mt-6 space-y-4" @submit.prevent="createAccount">
          <div>
            <label class="block text-sm font-medium" for="child-name">Name</label>
            <input id="child-name" v-model="name" autocomplete="name" required class="auth-input" :disabled="busy" />
          </div>
          <div>
            <label class="block text-sm font-medium" for="child-email">Email</label>
            <input id="child-email" v-model="email" type="email" autocomplete="email" required class="auth-input" :disabled="busy" />
          </div>
          <div>
            <label class="block text-sm font-medium" for="child-password">Password</label>
            <input id="child-password" v-model="password" type="password" autocomplete="new-password" minlength="8" required class="auth-input" :disabled="busy" />
          </div>
          <label class="flex items-start gap-3 text-sm leading-5 text-slate-700 dark:text-slate-200">
            <input v-model="acceptedTerms" type="checkbox" class="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-slate-900" :disabled="busy" />
            <span>I agree to the <NuxtLink to="/terms" class="underline">Terms of Service</NuxtLink> and <NuxtLink to="/privacy" class="underline">Privacy Policy</NuxtLink>.</span>
          </label>
          <button type="submit" class="auth-primary" :disabled="busy">{{ busy ? 'Creating…' : 'Create account' }}</button>
        </form>
      </template>
      <p v-if="message" class="mt-4 text-sm text-emerald-700 dark:text-emerald-300" role="status">{{ message }}</p>
      <p v-if="error" class="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{{ error }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '~/src/composables/auth/client'
import { initializeUserRole, persistAuthSession, prepareAuthenticatedProfile } from '~/src/composables/auth'
import { useAppLanguage } from '~/src/composables/language'
import { appUrl } from '~/src/composables/platform/web'

definePageMeta({ hideNavbar: true, hideFloatingChat: true, hideBackButton: true })

const { language } = useAppLanguage()
const loading = ref(true)
const ready = ref(false)
const busy = ref(false)
const error = ref('')
const message = ref('')
const token = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const acceptedTerms = ref(false)

function consentRedirectUrl() {
  return new URL(`/child-account?consent=${encodeURIComponent(token.value)}`, location.origin).href
}

async function completeAccount(session: Session) {
  const client = getSupabaseClient()
  const { error: consentError } = await client.rpc('complete_child_consent_signup', { token: token.value })
  if (consentError) throw consentError
  await prepareAuthenticatedProfile({ session, submittedName: name.value, language: language.value })
  await initializeUserRole('student')
  await persistAuthSession(session)
  location.replace(appUrl())
}

async function createAccount() {
  error.value = ''; message.value = ''
  if (!name.value.trim() || password.value.length < 8 || !acceptedTerms.value) {
    error.value = 'Enter a name, an email, a password of at least 8 characters, and accept the terms.'
    return
  }
  busy.value = true
  try {
    const { data, error: signUpError } = await getSupabaseClient().auth.signUp({
      email: email.value.trim(),
      password: password.value,
      options: { emailRedirectTo: consentRedirectUrl(), data: { full_name: name.value.trim() } },
    })
    if (signUpError) throw signUpError
    password.value = ''
    if (data.session) await completeAccount(data.session)
    else message.value = 'Check the child email address to finish account setup. This link remains valid until the account is created.'
  } catch (input) {
    error.value = input instanceof Error ? input.message : 'We could not create this account.'
  } finally { busy.value = false }
}

onMounted(async () => {
  token.value = new URLSearchParams(location.search).get('consent') ?? ''
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token.value)) {
    error.value = 'This account setup link is invalid.'
    loading.value = false
    return
  }
  try {
    const code = new URLSearchParams(location.search).get('code')
    if (code) {
      const { data, error: exchangeError } = await getSupabaseClient().auth.exchangeCodeForSession(code)
      if (exchangeError || !data.session) throw exchangeError ?? new Error('We could not verify this email.')
      await completeAccount(data.session)
      return
    }
    const { data, error: statusError } = await getSupabaseClient().rpc('child_consent_signup_status', { token: token.value })
    if (statusError || data !== 'approved') throw statusError ?? new Error('This account setup link is no longer available.')
    await getSupabaseClient().auth.signOut({ scope: 'local' })
    ready.value = true
  } catch (input) {
    error.value = input instanceof Error ? input.message : 'We could not open this account setup link.'
  } finally { loading.value = false }
})
</script>
