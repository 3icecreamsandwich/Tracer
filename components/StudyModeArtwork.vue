<template>
  <svg viewBox="0 0 24 24" fill="none" :width="size" :height="size" stroke="currentColor" :stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="study-mode-artwork" :style="{ color, width: `${size}px`, height: `${size}px` }">
    <template v-if="name === 'cards' || name === 'flashcards'"><path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2M4 7h16a2 2 0 0 1 2 2l-2 11a2 2 0 0 1-2 1H6a2 2 0 0 1-2-1L2 9a2 2 0 0 1 2-2Z"/></template>
    <template v-else-if="name === 'practice' || name === 'learn'"><path d="M11.21 3.94L12.98 2.05L14.90 2.43L15.82 4.86L17.14 5.74L19.73 5.66L20.82 7.29L19.75 9.65L20.06 11.21L21.95 12.98L21.57 14.90L19.14 15.82L18.26 17.14L18.34 19.73L16.71 20.82L14.35 19.75L12.79 20.06L11.02 21.95L9.10 21.57L8.18 19.14L6.86 18.26L4.27 18.34L3.18 16.71L4.25 14.35L3.94 12.79L2.05 11.02L2.43 9.10L4.86 8.18L5.74 6.86L5.66 4.27L7.29 3.18L9.65 4.25Z"/><circle cx="12" cy="12" r="3"/></template>
    <template v-else-if="name === 'chat'"><path d="M5 4h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3ZM18 18l4 3-1-5"/></template>
    <template v-else-if="name === 'match'"><rect x="2" y="10" width="8" height="12" rx="2"/><rect x="14" y="2" width="8" height="12" rx="2"/></template>
    <template v-else><path d="M12 5C9 3 5 3 2 4v16c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v16"/></template>
  </svg>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size:24 })
const color = computed(() => props.name === 'practice' || props.name === 'learn' ? '#ed6266' : props.name === 'cards' || props.name === 'flashcards' ? '#e8b64d' : '#e78a24')
</script>
<style scoped>.study-mode-artwork { display:block; flex-shrink:0; }</style>
