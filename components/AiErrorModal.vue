<template>
  <AppDialog :open="open" :title="error?.title ?? 'Something went wrong'" :description="error?.message" :close-label="t('common.close')" @close="$emit('close')">
      <div class="mt-4 flex flex-wrap gap-2">
        <NuxtLink
          v-if="settingsHref"
          :to="settingsHref"
          class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          @click="$emit('close')"
        >
          {{ t('nav.settings') }}
        </NuxtLink>

        <button
          v-if="showRetry"
          type="button"
          class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          @click="$emit('retry')"
        >
          {{ t('common.retry') }}
        </button>
      </div>
  </AppDialog>
</template>

<script setup lang="ts">
import type { AiErrorUx } from '~/src/composables/ai/ux-errors'
import { aiErrorSettingsReason } from '~/src/composables/ai/ux-errors'
import { useAppLanguage } from '~/src/composables/language'

const { t } = useAppLanguage()

const props = defineProps<{ open: boolean; error: AiErrorUx | null; from?: string; showRetry?: boolean }>()

defineEmits<{ (e: 'close'): void; (e: 'retry'): void }>()

const settingsHref = computed(() => {
  const err = props.error
  if (!props.open || !err) return null
  if (!err.showGoToSettings) return null
  const reason = aiErrorSettingsReason(err.key)
  if (!reason) return '/settings'
  const from = props.from?.trim() ? props.from!.trim() : undefined
  return { path: '/settings', query: { reason, ...(from ? { from } : {}) } }
})

const showRetry = computed(() => {
  if (!props.open) return false
  if (!props.showRetry) return false
  const key = props.error?.key
  if (!key) return false
  return key !== 'missing_default_model' && key !== 'missing_credentials' && key !== 'oauth_not_authenticated'
})
</script>
