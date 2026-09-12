<template>
  <AppDialog
    :open="open"
    :busy="busy"
    role="alertdialog"
    :title="t('settings.deleteAccount')"
    :description="t('settings.deleteAccountDescription')"
    :close-label="t('common.close')"
    @close="cancel"
  >
    <label for="delete-account-confirmation" class="mt-5 block text-sm font-medium text-slate-900 dark:text-slate-100">
      {{ t('settings.deleteAccountConfirm') }}
    </label>
    <input
      id="delete-account-confirmation"
      data-autofocus
      type="text"
      autocomplete="off"
      spellcheck="false"
      class="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-950 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
      :value="confirmation"
      :disabled="busy"
      @input="emit('update:confirmation', ($event.target as HTMLInputElement).value)"
    />

    <p v-if="error" class="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">
      {{ error }}
    </p>

    <div class="mt-5 flex flex-wrap justify-end gap-2">
      <button
        type="button"
        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
        :disabled="busy"
        @click="cancel"
      >
        {{ t('common.cancel') }}
      </button>
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-700 dark:hover:bg-red-600 dark:focus-visible:ring-offset-slate-950"
        :disabled="busy || confirmation !== 'DELETE'"
        @click="emit('confirm')"
      >
        <LoadingSpinner v-if="busy" size="sm" />
        <template v-else>{{ t('settings.deleteAccount') }}</template>
      </button>
    </div>
  </AppDialog>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'

const props = defineProps<{
  open: boolean
  busy?: boolean
  error?: string | null
  confirmation: string
}>()
const emit = defineEmits<{
  cancel: []
  confirm: []
  'update:confirmation': [value: string]
}>()
const { t } = useAppLanguage()

function cancel() {
  if (!props.busy) emit('cancel')
}
</script>
