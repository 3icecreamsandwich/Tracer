<template>
  <PolicyPage title="Privacy request">
    <section aria-labelledby="privacy-request">
      <h2 id="privacy-request" class="text-xl font-semibold text-slate-950 dark:text-white">Request help with your data</h2>
      <p class="mt-3">You can request a copy of your hosted account information, ask us to correct it, or ask us to delete it. You must be signed in so we can connect the request to the right account.</p>

      <form class="mt-6 space-y-5" @submit.prevent="submitRequest">
        <div>
          <label class="block text-sm font-medium text-slate-900 dark:text-slate-100" for="privacy-request-type">Request type</label>
          <select id="privacy-request-type" v-model="requestType" class="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            <option value="access">Get a copy of my hosted information</option>
            <option value="correction">Correct my information</option>
            <option value="deletion">Delete hosted information</option>
            <option value="other">Other privacy request</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 dark:text-slate-100" for="privacy-request-details">Details</label>
          <textarea id="privacy-request-details" v-model="details" required minlength="3" maxlength="2000" rows="6" class="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Tell us what you need. Do not include passwords, API keys, or other secrets." />
        </div>

        <p v-if="error" role="alert" class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
        <p v-if="submitted" role="status" class="text-sm text-emerald-700 dark:text-emerald-300">Your privacy request was sent. We may contact you to verify it.</p>

        <button type="submit" :disabled="busy || submitted" class="inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-slate-950">
          {{ busy ? 'Sending…' : 'Send request' }}
        </button>
      </form>
    </section>
  </PolicyPage>
</template>

<script setup lang="ts">
import { getSupabaseClient } from '~/src/composables/auth/client'

useHead({ title: 'Privacy request' })

const requestType = ref<'access' | 'correction' | 'deletion' | 'other'>('access')
const details = ref('')
const busy = ref(false)
const submitted = ref(false)
const error = ref('')

async function submitRequest() {
  error.value = ''
  const { data: { user } } = await getSupabaseClient().auth.getUser()
  if (!user) {
    error.value = 'Sign in before sending a privacy request.'
    return
  }
  busy.value = true
  try {
    const { error: insertError } = await getSupabaseClient().from('privacy_requests').insert({
      requester_id: user.id,
      request_type: requestType.value,
      details: details.value.trim(),
    })
    if (insertError) throw insertError
    submitted.value = true
  } catch {
    error.value = 'Your privacy request could not be sent. Please try again.'
  } finally {
    busy.value = false
  }
}
</script>
