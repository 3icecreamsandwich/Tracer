<template>
  <main class="tracer-page mx-auto max-w-md px-5 py-16">
    <h1 class="text-2xl font-semibold">{{ t('auth.firstRunTitle') }}</h1>
    <p v-if="error" class="mt-4 text-sm text-red-700 dark:text-red-300" role="alert">{{ error }}</p>
    <LoadingSpinner v-else class="mt-5" />
    <a v-if="error" href="https://tracerquiz.com/signup/" class="mt-5 inline-block underline">{{ t('auth.signInEmail') }}</a>
  </main>
</template>

<script setup lang="ts">
import { getSupabaseClient } from '~/src/composables/auth/client'
import { appUrl, browserStorageKey } from '~/src/composables/platform/web'
import { useAppLanguage } from '~/src/composables/language'

definePageMeta({ hideNavbar: true, hideFloatingChat: true, hideBackButton: true })
useHead({ meta: [{ name: 'referrer', content: 'no-referrer' }] })

const { t } = useAppLanguage()
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch(appUrl('api/web/auth/handoff/consume'), {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
    const payload = await response.json().catch(() => null)
    if (!response.ok || typeof payload?.accessToken !== 'string' || typeof payload?.refreshToken !== 'string') {
      throw new Error(payload?.statusMessage || t('auth.errorUnknown'))
    }
    const { data, error: sessionError } = await getSupabaseClient().auth.setSession({
      access_token: payload.accessToken,
      refresh_token: payload.refreshToken,
    })
    if (sessionError || !data.session) throw new Error(t('auth.errorUnknown'))
    sessionStorage.setItem(browserStorageKey('complete-signin'), '1')
    location.replace(appUrl('first-run'))
  } catch (input) {
    error.value = input instanceof Error ? input.message : t('auth.errorUnknown')
  }
})
</script>
