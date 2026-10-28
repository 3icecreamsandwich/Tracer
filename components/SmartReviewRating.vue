<template>
  <div class="smart-review-rating" role="group" :aria-label="t('set.recallRating')">
    <div class="mb-2 flex items-center justify-center gap-2">
      <p class="text-center text-xs text-slate-500 dark:text-slate-400">{{ t('set.recallHint') }}</p>
      <button type="button" class="shrink-0 rounded-md px-2 py-1 text-amber-500" :disabled="starDisabled" :aria-pressed="starred" :aria-label="starred ? 'Unstar card' : 'Star card'" @click="$emit('star')">{{ starred ? '★' : '☆' }}</button>
    </div>
    <div class="grid grid-cols-5 gap-2">
      <button v-for="grade in grades" :key="grade" type="button"
        class="tracer-button tracer-button--white smart-review-rating__button"
        :disabled="disabled" :aria-label="`${grade} · ${t(`set.recallGrade${grade}`)}`"
        :title="`${grade} · ${t(`set.recallGrade${grade}`)} (key ${grade})`"
        @click="$emit('rate', grade)">
        <span class="text-lg font-semibold">{{ grade }}</span>
        <span class="text-[10px] sm:text-xs">{{ t(`set.recallGrade${grade}`) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
import type { ReviewRating } from '~/src/composables/cards/spaced-repetition'
defineProps<{ disabled: boolean; starred: boolean; starDisabled: boolean }>()
defineEmits<{ rate: [rating: ReviewRating]; star: [] }>()
const { t } = useAppLanguage()
const grades: ReviewRating[] = [1, 2, 3, 4, 5]
</script>
