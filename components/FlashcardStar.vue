<template>
  <button type="button" class="absolute bottom-px right-px z-10 inline-flex h-11 w-11 items-center justify-center rounded-md text-2xl leading-none text-amber-500 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" :disabled="disabled" :aria-pressed="starred" :aria-label="starred ? 'Unstar card' : 'Star card'" @click="$emit('toggle')">{{ starred ? '★' : '☆' }}</button>
</template>
<script setup lang="ts">
defineProps<{ starred: boolean; disabled: boolean }>()
defineEmits<{ toggle: [] }>()
</script>
