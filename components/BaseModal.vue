<template>
  <Teleport to="body">
    <div
      v-if="open"
      ref="dialogEl"
      class="fixed inset-0 z-50 flex items-center justify-center p-5"
      :role="role ?? 'dialog'"
      aria-modal="true"
      :aria-labelledby="title ? titleId : undefined"
      :aria-describedby="description ? descriptionId : undefined"
      @keydown="onKeydown"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
        :aria-label="closeLabel"
        :disabled="busy"
        tabindex="-1"
        @click="close"
      />
      <section
        :class="panelClass ?? 'max-w-xl'"
        class="relative max-h-[calc(100vh-2.5rem)] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-950 shadow-2xl shadow-slate-950/15 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:shadow-black/40"
      >
        <div class="flex items-start justify-between gap-5">
          <div class="min-w-0 flex-1">
            <h2 v-if="title" :id="titleId" class="text-2xl font-semibold">{{ title }}</h2>
            <p
              v-if="description"
              :id="descriptionId"
              class="mt-2 text-sm text-slate-600 dark:text-slate-300"
            >
              {{ description }}
            </p>
          </div>
          <button
            type="button"
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-xl text-slate-950 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            :aria-label="closeLabel"
            :disabled="busy"
            @click="close"
          >
            <AppIcon name="close" />
          </button>
        </div>
        <div :class="title ? 'mt-6' : 'pr-6'">
          <slot />
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { registerModal, unregisterModal, isTopModal } from '~/src/composables/modal-stack'
const modalId = Symbol('modal')
const props = defineProps<{
  open: boolean
  panelClass?: string
  title?: string
  role?: 'dialog' | 'alertdialog'
  description?: string
  closeLabel: string
  busy?: boolean
}>()

const emit = defineEmits<{ close: [] }>()
const dialogEl = ref<HTMLElement | null>(null)
const componentId = useId().replace(/:/g, '')
const titleId = `dialog-title-${componentId}`
const descriptionId = `dialog-description-${componentId}`
let previouslyFocused: HTMLElement | null = null

watch(
  () => props.open,
  (open) => {
    if (typeof window === 'undefined') return
    if (open) {
      registerModal(modalId)
      window.addEventListener('keydown', onWindowKeydown, true)
      previouslyFocused =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      nextTick(() => {
        const target =
          dialogEl.value?.querySelector<HTMLElement>('[data-autofocus]') ??
          dialogEl.value?.querySelector<HTMLElement>(
            'button:not(:disabled):not([tabindex="-1"]), input:not(:disabled)',
          )
        target?.focus()
      })
      return
    }
    unregisterModal(modalId)
    window.removeEventListener('keydown', onWindowKeydown, true)
    nextTick(() => previouslyFocused?.focus())
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    unregisterModal(modalId)
    window.removeEventListener('keydown', onWindowKeydown, true)
  }
})

function close() {
  if (!props.busy) emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !dialogEl.value) return

  const focusable = Array.from(
    dialogEl.value.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.getAttribute('tabindex') !== '-1' && el.getClientRects().length > 0)
  if (!focusable.length) return
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

function onWindowKeydown(event: KeyboardEvent) {
  if (!props.open || !isTopModal(modalId) || event.key !== 'Escape') return
  event.preventDefault()
  event.stopImmediatePropagation()
  close()
}
</script>
