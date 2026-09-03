<template>
  <div
    v-if="open"
    ref="dialogEl"
    class="fixed inset-0 z-50 flex items-center justify-center p-6"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="reset-tracer-title"
    aria-describedby="reset-tracer-description"
    @keydown="onKeydown"
  >
    <button
      type="button"
      class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
      :aria-label="t('common.close')"
      :disabled="busy"
      tabindex="-1"
      @click="cancel"
    />

    <div class="relative w-full max-w-lg rounded-lg border border-red-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-red-900 dark:bg-slate-950 dark:shadow-black/30">
      <h2 id="reset-tracer-title" class="text-lg font-semibold text-slate-900 dark:text-slate-50">
        {{ t('settings.resetTracer') }}
      </h2>
      <p id="reset-tracer-description" class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {{ t('settings.resetDescription') }}
      </p>

      <p v-if="error" class="mt-3 text-sm text-red-700 dark:text-red-300">
        {{ error }}
      </p>

      <div class="mt-5 flex flex-wrap justify-end gap-2">
        <button
          ref="cancelButtonEl"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'

const props = defineProps<{
  open: boolean
  busy?: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const { t } = useAppLanguage()
const dialogEl = ref<HTMLElement | null>(null)
const cancelButtonEl = ref<HTMLButtonElement | null>(null)
let previouslyFocusedEl: HTMLElement | null = null

watch(
  () => props.open,
  (open) => {
    if (open) {
      previouslyFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null
      nextTick(() => cancelButtonEl.value?.focus())
      return
    }
    nextTick(() => previouslyFocusedEl?.focus())
  }
)

function cancel() {
  if (!props.busy) emit('cancel')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    cancel()
    return
  }

  if (event.key !== 'Tab' || !dialogEl.value) return
  const focusable = Array.from(
    dialogEl.value.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])')
  )
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
</script>
