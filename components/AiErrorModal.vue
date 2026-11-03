<template>
  <AppDialog :open="open" :title="error?.title ?? 'Something went wrong'" :description="error?.message" :close-label="t('common.close')" @close="$emit('close')">
      <div class="mt-4 flex flex-wrap gap-2">
        <NuxtLink
          v-if="settingsHref"
          :to="settingsHref"
          class="tracer-button tracer-button--dark tracer-button--md"
          @click="$emit('close')"
        >
          {{ t('nav.settings') }}
        </NuxtLink>

        <button
          v-if="showRetry"
          type="button"
          class="tracer-button tracer-button--white tracer-button--md"
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
