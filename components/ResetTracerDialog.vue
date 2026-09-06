<template>
  <AppDialog :open="open" :busy="busy" role="alertdialog" :title="t('settings.resetTracer')" :description="t('settings.resetDescription')" :close-label="t('common.close')" @close="cancel">
      <p v-if="error" class="mt-3 text-sm text-red-700 dark:text-red-300">
        {{ error }}
      </p>

      <div class="mt-5 flex flex-wrap justify-end gap-2">
        <button
          data-autofocus
          type="button"
          class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          :disabled="busy"
          @click="cancel"
        >
          {{ t('common.cancel') }}
        </button>
        <button
          type="button"
          class="inline-flex items-center rounded-md border border-red-600 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500 dark:bg-slate-950 dark:text-red-300 dark:hover:bg-red-950/30 dark:focus-visible:ring-offset-slate-950"
          :disabled="busy"
          @click="emit('confirm')"
        >
          <LoadingSpinner v-if="busy" size="sm" />
          <template v-else>{{ t('settings.resetTracer') }}</template>
        </button>
      </div>
  </AppDialog>
</template>
<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
const props = defineProps<{ open: boolean; busy?: boolean; error?: string | null }>()
const emit = defineEmits<{ cancel: []; confirm: [] }>()
const { t } = useAppLanguage()
function cancel() { if (!props.busy) emit('cancel') }
</script>
