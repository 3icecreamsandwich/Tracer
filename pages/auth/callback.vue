<template>
  <main class="tracer-page mx-auto max-w-md px-5 py-16">
    <h1 class="text-2xl font-semibold">{{ t('auth.firstRunTitle') }}</h1>
    <p v-if="error" class="mt-4 text-sm text-red-700 dark:text-red-300" role="alert">{{ error }}</p>
    <LoadingSpinner v-else class="mt-5" />
    <NuxtLink v-if="error" to="/first-run" class="mt-5 inline-block underline">{{ t('auth.signInEmail') }}</NuxtLink>
  </main>
</template>
<script setup lang="ts">
import { getSupabaseClient } from '~/src/composables/auth/client'
import { appUrl, browserStorageKey } from '~/src/composables/platform/web'
import { useAppLanguage } from '~/src/composables/language'
definePageMeta({ hideNavbar: true, hideFloatingChat: true, hideBackButton: true })
const { t } = useAppLanguage()
const error = ref('')
onMounted(async () => {
  try {
    const params = new URLSearchParams(location.search)
    if (params.has('error') || !params.get('code')) throw new Error(t('auth.errorUnknown'))
    const { data, error: exchangeError } = await getSupabaseClient().auth.exchangeCodeForSession(params.get('code')!)
    // Remove the one-use code from browser history even if completion fails.
    history.replaceState(null, '', appUrl('auth/callback'))
    if (exchangeError || !data.session) throw new Error(t('auth.errorUnknown'))
    // Reuse the existing account-completion UI (name, role and consent).
    sessionStorage.setItem(browserStorageKey('complete-signin'), '1')
    location.replace(appUrl('first-run'))
  } catch (input) { error.value = input instanceof Error ? input.message : t('auth.errorUnknown') }
})
</script>
