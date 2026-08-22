<template>
  <AppDialog
    :open="open"
    :title="t('classroom.addStudents')"
    :description="t('classroom.shareCodeDescription', { name: className })"
    :close-label="t('common.close')"
    @close="emit('close')"
  >
    <div class="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 text-center dark:border-slate-800 dark:bg-slate-900">
      <p class="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {{ t('classroom.classCode') }}
      </p>
      <p class="mt-3 select-all break-all font-mono text-4xl font-bold tracking-[0.14em] text-slate-950 dark:text-white">
        {{ code }}
      </p>
    </div>

    <p v-if="copyState" class="mt-3 text-center text-sm" :class="copyState === 'success' ? 'text-slate-600 dark:text-slate-300' : 'text-red-700 dark:text-red-300'" role="status">
      {{ copyState === 'success' ? t('classroom.codeCopied') : t('classroom.copyFailed') }}
    </p>

    <div class="mt-5 flex flex-wrap justify-end gap-2">
      <AppButton variant="white" @click="emit('close')">{{ t('common.close') }}</AppButton>
      <AppButton @click="copyCode">{{ t('classroom.copyCode') }}</AppButton>
    </div>
  </AppDialog>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'

const props = defineProps<{
  open: boolean
  className: string
  code: string
}>()
const emit = defineEmits<{ close: [] }>()
const { t } = useAppLanguage()
const copyState = ref<'success' | 'error' | null>(null)

watch(() => props.open, () => { copyState.value = null })

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copyState.value = 'success'
  } catch {
    copyState.value = 'error'
  }
}
</script>
