<template>
  <UButton color="primary" variant="ghost" type="button" :class="bottom ? 'bottom-1' : 'top-1'" class="absolute right-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-[var(--tracer-radius-control)] !bg-transparent hover:!bg-transparent active:!bg-transparent text-2xl leading-none text-amber-500 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" :disabled="disabled" :aria-pressed="starred" :aria-label="starred ? 'Unstar card' : 'Star card'" @click="$emit('toggle')"><StarGlyph :active="starred" /></UButton>
</template>
<script setup lang="ts">
defineProps<{ starred: boolean; disabled: boolean; bottom?: boolean }>()
defineEmits<{ toggle: [] }>()
</script>
