<template>
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    class="h-5 w-5 shrink-0 transition"
    :class="direction === 'left' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
  >
    <path :d="direction === 'left' ? 'm13 4-6 6 6 6' : 'm7 4 6 6-6 6'" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  direction?: 'left' | 'right'
}>(), {
  direction: 'right',
})
</script>
