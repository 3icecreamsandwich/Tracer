<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center p-6"
    role="dialog"
    aria-modal="true"
    :aria-label="t('duplicates.title')"
    @keydown.esc="emit('cancel')"
  >
    <button
      type="button"
      class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
      :aria-label="t('common.close')"
      @click="emit('cancel')"
    />

    <div class="relative w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {{ t('duplicates.title') }}
          </h2>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {{ t('duplicates.description') }}
          </p>
        </div>

        <button
          type="button"
          class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          :aria-label="t('common.close')"
          @click="emit('cancel')"
        >
          x
        </button>
      </div>

      <div class="mt-4 max-h-[55vh] overflow-auto rounded-md border border-slate-200 dark:border-slate-800">
        <div
          v-for="issue in issues"
          :key="issue.id"
          class="grid gap-3 border-b border-slate-200 p-3 last:border-b-0 dark:border-slate-800 sm:grid-cols-[1fr_auto]"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {{ issue.side === 'term' ? t('create.term') : t('create.definition') }}
              </span>
              <span class="text-sm font-medium text-slate-900 dark:text-slate-50">
                {{ t('duplicates.cardLabel', { number: issue.cardIndex + 1 }) }}
              </span>
            </div>
            <p class="mt-2 break-words text-sm text-slate-700 dark:text-slate-200">
              {{ issue.value }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ t('duplicates.matchesCards', { cards: issue.duplicateCardIndexes.map((index) => index + 1).join(', ') }) }}
            </p>
          </div>

          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border text-base font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              :class="decisionFor(issue.id) === 'keep'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-100'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900'"
              :aria-label="t('duplicates.keepCard', { number: issue.cardIndex + 1 })"
              @click="setDecision(issue.id, 'keep')"
            >
              &#10003;
            </button>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border text-base font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              :class="decisionFor(issue.id) === 'remove'
                ? 'border-red-300 bg-red-50 text-red-800 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-100'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900'"
              :aria-label="t('duplicates.removeCard', { number: issue.cardIndex + 1 })"
              @click="setDecision(issue.id, 'remove')"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {{ t('duplicates.removeHint') }}
      </p>

      <div class="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
          @click="emit('cancel')"
        >
          {{ t('common.cancel') }}
        </button>
        <button
          type="button"
          class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          @click="confirm"
        >
          {{ t('duplicates.continue') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DuplicateCardIssue } from '~/src/composables/cards/duplicates'
import { useAppLanguage } from '~/src/composables/language'

type DuplicateDecision = 'keep' | 'remove'

const props = defineProps<{
  open: boolean
  issues: DuplicateCardIssue[]
}>()

const emit = defineEmits<{
  cancel: []
  confirm: [decisions: Record<string, DuplicateDecision>]
}>()

const { t } = useAppLanguage()
const decisions = ref<Record<string, DuplicateDecision>>({})

watch(
  () => props.issues,
  (issues) => {
    decisions.value = Object.fromEntries(issues.map((issue) => [issue.id, 'keep']))
  },
  { immediate: true }
)

function decisionFor(issueId: string) {
  return decisions.value[issueId] ?? 'keep'
}

function setDecision(issueId: string, decision: DuplicateDecision) {
  decisions.value = { ...decisions.value, [issueId]: decision }
}

function confirm() {
  emit('confirm', decisions.value)
}
</script>
