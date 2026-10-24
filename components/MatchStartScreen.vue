<template>
  <div class="match-start flex min-h-64 w-full flex-col items-center justify-center gap-6 rounded-2xl border border-orange-200/70 bg-orange-50/40 px-5 py-8 text-center sm:flex-row sm:gap-10 sm:px-8 sm:py-10 sm:text-start dark:border-orange-900/60 dark:bg-orange-950/10">
    <div aria-hidden="true" class="match-start-art relative h-32 w-44 shrink-0">
      <div v-for="index in 2" :key="index" class="match-preview-card absolute top-2 flex h-28 w-24 flex-col items-center justify-center gap-3 rounded-xl border bg-white dark:bg-orange-950" :class="index === 1 ? 'left-3 border-orange-200 text-orange-500 dark:border-orange-800' : 'right-3 border-orange-300 text-orange-400 dark:border-orange-700'">
        <svg class="h-11 w-11" viewBox="0 0 48 48" fill="none">
          <path d="M24 5 30 17 43 24 30 31 24 43 18 31 5 24 18 17Z" fill="currentColor" opacity=".15" />
          <path d="M24 11 28 20 37 24 28 28 24 37 20 28 11 24 20 20Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
        </svg>
        <div class="h-1.5 w-10 rounded-full bg-current opacity-20" />
      </div>
    </div>
    <div class="relative max-w-sm">
      <h3 class="text-2xl font-bold tracking-tight text-orange-950 sm:text-3xl dark:text-orange-50">{{ t('set.matchInstructions') }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-orange-900/70 dark:text-orange-200/70">{{ t('set.matchHint') }}</p>
      <button type="button" :disabled="disabled" class="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-xl border border-orange-600 bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/15 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none dark:focus-visible:ring-offset-orange-950" @click="$emit('start')">
        {{ t('set.start') }}
        <svg aria-hidden="true" class="h-4 w-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
defineProps<{ disabled?: boolean }>()
defineEmits<{ start: [] }>()
const { t } = useAppLanguage()
</script>
