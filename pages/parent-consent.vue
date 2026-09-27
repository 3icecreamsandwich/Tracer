<template>
  <main class="min-h-screen bg-white text-neutral-950 dark:bg-slate-950 dark:text-slate-50">
    <div class="tracer-page mx-auto w-full max-w-[560px] px-8 pb-12 pt-11">
      <h1 class="text-2xl font-bold">Parent consent</h1>
      <p v-if="loading" class="mt-4 text-sm text-slate-600 dark:text-slate-300">Opening your consent request…</p>
      <template v-else>
        <template v-if="status === 'pending'">
          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">You are signed in as the parent or guardian. Review the request, then confirm your consent below. No child account exists yet.</p>
          <label class="mt-5 flex items-start gap-3 text-sm leading-5 text-slate-700 dark:text-slate-200">
            <input v-model="consentConfirmed" type="checkbox" class="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-slate-900" :disabled="busy" />
            <span>I am the parent or guardian and consent to creating one Tracer account for this child.</span>
          </label>
          <button type="button" class="auth-primary mt-5" :disabled="busy || !consentConfirmed" @click="approve">
            {{ busy ? 'Approving…' : 'Approve and create account link' }}
          </button>
        </template>
        <template v-else-if="status === 'approved'">
          <p class="mt-4 text-sm text-emerald-700 dark:text-emerald-300">Consent is approved. The next page creates one child account; it can only be used once.</p>
          <button v-if="childSetupUrl" type="button" class="auth-primary mt-5" @click="beginChildSetup">Continue to child account setup</button>
        </template>
        <p v-else-if="status === 'rejected'" class="mt-4 text-sm text-red-600 dark:text-red-400">This consent request was not approved.</p>
        <p v-else class="mt-4 text-sm text-slate-600 dark:text-slate-300">We could not find an active consent request for this email.</p>
      </template>
      <p v-if="error" class="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{{ error }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { getSupabaseClient } from '~/src/composables/auth/client'

definePageMeta({ hideNavbar: true, hideFloatingChat: true, hideBackButton: true })
const loading = ref(true)
const error = ref('')
const status = ref<'pending' | 'approved' | 'rejected' | null>(null)
const requestId = ref<string | null>(null)
const approvalToken = ref<string | null>(null)
const consentConfirmed = ref(false)
const busy = ref(false)
const childSetupUrl = computed(() => approvalToken.value ? `/child-account?consent=${encodeURIComponent(approvalToken.value)}` : null)

async function approve() {
  if (!requestId.value || !consentConfirmed.value) return
  error.value = ''
  busy.value = true
  try {
    const { data, error: approveError } = await getSupabaseClient().rpc('approve_own_child_consent_request', { request_id: requestId.value })
    if (approveError || typeof data !== 'string') throw approveError ?? new Error('We could not approve this request.')
    approvalToken.value = data
    status.value = 'approved'
  } catch (input) {
    error.value = input instanceof Error ? input.message : 'We could not approve this request.'
  } finally { busy.value = false }
}

async function beginChildSetup() {
  if (!childSetupUrl.value) return
  // The parent authenticated this browser with a magic link. The child setup
  // must start without inheriting that parent session.
  await getSupabaseClient().auth.signOut({ scope: 'local' })
  location.assign(childSetupUrl.value)
}

onMounted(async () => {
  try {
    const params = new URLSearchParams(location.search)
    if (params.get('code')) {
      const { error: exchangeError } = await getSupabaseClient().auth.exchangeCodeForSession(params.get('code')!)
      if (exchangeError) throw exchangeError
      history.replaceState(null, '', '/parent-consent')
    }
    const { data: userData, error: userError } = await getSupabaseClient().auth.getUser()
    if (userError || !userData.user?.email) throw userError ?? new Error('Parent email was not available.')
    const { data, error: requestError } = await getSupabaseClient()
      .from('child_consent_requests').select('id,status,approval_token').order('created_at', { ascending: false }).limit(1).maybeSingle()
    if (requestError) throw requestError
    status.value = data?.status === 'pending' || data?.status === 'approved' || data?.status === 'rejected' ? data.status : null
    requestId.value = data?.id ?? null
    approvalToken.value = data?.approval_token ?? null
  } catch (input) { error.value = input instanceof Error ? input.message : 'We could not open the consent request.' }
  finally { loading.value = false }
})
</script>
