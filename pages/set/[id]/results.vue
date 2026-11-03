<template>
  <main>
    <div class="tracer-page mx-auto max-w-2xl px-5 py-10 sm:px-8">
      <div class="tracer-result-surface p-6 sm:p-8">
        <h1 class="text-3xl font-semibold text-slate-900 dark:text-slate-50">{{ t('common.results') }}</h1>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {{ modeLabel }} · {{ t('set.accuracy') }} <span class="font-medium">{{ accuracyText }}</span>
        </p>

        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Correct: {{ correct }} · Attempted: {{ attempted }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <AppButton :to="restartHref">
            {{ t('common.restart') }} {{ modeLabel }}
          </AppButton>

          <AppButton replace :to="`/set/${setId}?mode=flashcards`" variant="white">
            {{ t('set.flashcards') }}
          </AppButton>
          <AppButton replace :to="`/set/${setId}?mode=learn`" variant="white">
            {{ t('set.learn') }}
          </AppButton>
          <AppButton replace :to="`/set/${setId}?mode=match`" variant="white">
            {{ t('set.match') }}
          </AppButton>
          <AppButton replace :to="`/set/${setId}?mode=chat`" variant="white">
            {{ t('set.chat') }}
          </AppButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'

type ResultsMode = 'flashcards' | 'learn' | 'match'

const route = useRoute()
const { t } = useAppLanguage()

const setId = computed(() => {
  const id = route.params.id
  if (typeof id === 'string' && id.trim()) return id.trim()
  return 'unknown'
})

const mode = computed<ResultsMode>(() => {
  const raw = typeof route.query.mode === 'string' ? route.query.mode : 'flashcards'
  if (raw === 'flashcards' || raw === 'learn' || raw === 'match') return raw
  return 'flashcards'
})

function toInt(value: unknown) {
  const n = typeof value === 'string' ? Number.parseInt(value, 10) : NaN
  return Number.isFinite(n) && n >= 0 ? n : 0
}

const correct = computed(() => toInt(route.query.correct))
const attempted = computed(() => toInt(route.query.attempted))

const accuracyText = computed(() => {
  const a = attempted.value
  if (a <= 0) return '0%'
  const pct = Math.round((correct.value / a) * 100)
  return `${pct}% (${correct.value}/${a})`
})

const modeLabel = computed(() => {
  if (mode.value === 'flashcards') return t('set.flashcards')
  if (mode.value === 'learn') return t('set.learn')
  return t('set.match')
})

const restartHref = computed(() => {
  return `/set/${setId.value}?mode=${mode.value}`
})
</script>
