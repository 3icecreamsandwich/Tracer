<template>
  <div class="smart-review-rating" role="group" :aria-label="t('set.recallRating')">

    <div class="grid grid-cols-5 gap-2">
      <UButton color="primary" variant="soft" v-for="grade in grades" :key="grade" type="button"
        class="smart-review-rating__button"
        :disabled="disabled" :aria-label="`${grade} · ${t(`set.recallGrade${grade}`)}`"
        :title="`${grade} · ${t(`set.recallGrade${grade}`)} (key ${grade})`"
        @click="$emit('rate', grade)" size="md">
        <span class="text-lg font-semibold">{{ grade }}</span>
        <span class="text-[10px] sm:text-xs">{{ t(`set.recallGrade${grade}`) }}</span>
      </UButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
import type { ReviewRating } from '~/src/composables/cards/spaced-repetition'
defineProps<{ disabled: boolean }>()
defineEmits<{ rate: [rating: ReviewRating] }>()
const { t } = useAppLanguage()
const grades: ReviewRating[] = [1, 2, 3, 4, 5]
</script>
