<template>
  <PolicyPage title="Report public content">
    <section aria-labelledby="report-content">
      <h2 id="report-content" class="text-xl font-semibold text-slate-950 dark:text-white">Tell us what is wrong</h2>
      <p class="mt-3">Use this form to report a public set that may violate someone’s rights, privacy, or safety. Reports are reviewed by our moderation team; submitting one does not automatically remove content.</p>

      <form class="mt-6 space-y-5" @submit.prevent="submitReport">
        <div v-if="setTitle" class="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-sm text-slate-600 dark:text-slate-300">Reporting</p>
          <p class="mt-1 font-medium text-slate-950 dark:text-white">{{ setTitle }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 dark:text-slate-100" for="report-reason">Reason</label>
          <select id="report-reason" v-model="reason" class="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
            <option value="privacy">Private or personal information</option>
            <option value="harassment">Harassment or hateful content</option>
            <option value="illegal">Illegal or unsafe content</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 dark:text-slate-100" for="report-details">What should we review?</label>
          <textarea id="report-details" v-model="details" required minlength="3" maxlength="2000" rows="6" class="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="Include enough detail for us to find the issue. Do not include passwords or secrets." />
        </div>

        <p v-if="error" role="alert" class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
        <p v-if="submitted" role="status" class="text-sm text-emerald-700 dark:text-emerald-300">Your report was sent. Thank you.</p>

        <button type="submit" :disabled="busy || submitted" class="inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-white dark:text-slate-950">
          {{ busy ? 'Sending…' : 'Send report' }}
        </button>
      </form>
    </section>
  </PolicyPage>
</template>

<script setup lang="ts">
import { getSupabaseClient } from '~/src/composables/auth/client'
import { canReportPublishedSet, getPublishedSet } from '~/src/composables/published-sets'

useHead({ title: 'Report public content' })

const route = useRoute()
const reportSetId = computed(() => typeof route.query.set === 'string' ? route.query.set : '')
const reason = ref<'privacy' | 'harassment' | 'illegal' | 'other'>('privacy')
const details = ref('')
const setTitle = ref('')
const busy = ref(false)
const submitted = ref(false)
const error = ref('')
const canReport = ref(false)

onMounted(async () => {
  if (!reportSetId.value) return
  try {
    setTitle.value = (await getPublishedSet(reportSetId.value)).title
    if (!await canReportPublishedSet(reportSetId.value)) {
      error.value = 'You cannot report a set you published.'
      return
    }
    canReport.value = true
  } catch {
    error.value = 'This public set could not be found.'
  }
})

async function submitReport() {
  error.value = ''
  if (!reportSetId.value) {
    error.value = 'Open this page from the public set you want to report.'
    return
  }
  if (!canReport.value) {
    error.value = 'You cannot report a set you published.'
    return
  }
  const { data: { user } } = await getSupabaseClient().auth.getUser()
  if (!user) {
    error.value = 'Sign in before sending a report.'
    return
  }
  busy.value = true
  try {
    const { error: insertError } = await getSupabaseClient().from('public_set_reports').insert({
      published_set_id: reportSetId.value,
      reporter_id: user.id,
      reason: reason.value,
      details: details.value.trim(),
    })
    if (insertError) throw insertError
    submitted.value = true
  } catch {
    error.value = 'Your report could not be sent. Please try again.'
  } finally {
    busy.value = false
  }
}
</script>
