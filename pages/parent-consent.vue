<template>
  <main class="min-h-screen bg-white text-neutral-950 dark:bg-slate-950 dark:text-slate-50">
    <div class="tracer-page mx-auto w-full max-w-[560px] px-8 pb-12 pt-11">
      <h1 class="text-2xl font-bold">Parent consent</h1>
      <p v-if="loading" class="mt-4 text-sm text-slate-600 dark:text-slate-300">Opening your consent request…</p>
      <template v-else>
        <p v-if="status === 'pending'" class="mt-4 text-sm text-slate-600 dark:text-slate-300">Your request is waiting for manual review. We will not create a child account until it has been approved.</p>
        <p v-else-if="status === 'approved'" class="mt-4 text-sm text-emerald-700 dark:text-emerald-300">Your consent request has been approved. Reply to the review email if you need help finishing the child’s account.</p>
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
      .from('child_consent_requests').select('status').order('created_at', { ascending: false }).limit(1).maybeSingle()
    if (requestError) throw requestError
    status.value = data?.status === 'pending' || data?.status === 'approved' || data?.status === 'rejected' ? data.status : null
  } catch (input) { error.value = input instanceof Error ? input.message : 'We could not open the consent request.' }
  finally { loading.value = false }
})
</script>
