<template>
  <main class="min-h-screen bg-white text-neutral-950 dark:bg-slate-950 dark:text-slate-50">
    <div class="tracer-page mx-auto w-full max-w-[437px] px-8 pb-12 pt-11">
      <h1 class="text-2xl font-bold">Parent consent</h1>
      <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">Ask a parent or guardian to enter their own email address. We will send them a secure link to review this request. Do not enter the child’s email here.</p>
      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <label class="block text-sm font-medium" for="parent-email">Parent or guardian email</label>
        <input id="parent-email" v-model="parentEmail" type="email" autocomplete="email" required class="auth-input" />
        <button type="submit" class="auth-primary" :disabled="busy || !configured">{{ busy ? 'Sending…' : 'Email parent' }}</button>
      </form>
      <p v-if="message" class="mt-4 text-sm text-emerald-700 dark:text-emerald-300" role="status">{{ message }}</p>
      <p v-if="error" class="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{{ error }}</p>
      <NuxtLink to="/first-run" class="mt-5 inline-block text-sm underline underline-offset-2">Back to sign in</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getSupabaseClient, isSupabaseConfigured } from '~/src/composables/auth/client'
import { appUrl } from '~/src/composables/platform/web'

definePageMeta({ hideNavbar: true, hideFloatingChat: true, hideBackButton: true })
const configured = isSupabaseConfigured()
const parentEmail = ref('')
const busy = ref(false)
const error = ref('')
const message = ref('')

async function submit() {
  error.value = ''; message.value = ''
  const email = parentEmail.value.trim().toLowerCase()
  if (!email) return
  busy.value = true
  try {
    const client = getSupabaseClient()
    const { error: requestError } = await client.from('child_consent_requests').insert({ parent_email: email })
    if (requestError) throw requestError
    const { error: magicLinkError } = await client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: new URL(appUrl('parent-consent'), location.origin).href },
    })
    if (magicLinkError) throw magicLinkError
    message.value = 'We sent the parent a secure consent link.'
  } catch (input) {
    error.value = input instanceof Error ? input.message : 'We could not send the parent consent email.'
  } finally { busy.value = false }
}
</script>
