<template>
  <button
    type="button"
    :disabled="isDisabled"
    class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-slate-900/5 backdrop-blur hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-800 dark:bg-slate-950/85 dark:text-slate-50 dark:shadow-black/25 dark:hover:bg-slate-950"
    @click="onBack"
  >
    <span class="text-base">{{ language === 'ar' ? '→' : '←' }}</span>
    <span>{{ t('common.back') }}</span>
  </button>
</template>

<script setup lang="ts">
import { navigateBack } from '~/src/composables/navigation/app-navigation'
import { useAppLanguage } from '~/src/composables/language'

const router = useRouter()
const route = useRoute()
const { language, t } = useAppLanguage()

const isDisabled = computed(() => {
  const path = route.path
  // Disable back button on homepage
  return path === '/'
})

function onBack() {
  navigateBack(router, route.path, window.history.state)
}
</script>
