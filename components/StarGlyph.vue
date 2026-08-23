<template>
  <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 !text-amber-500" :fill="active ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">
    <path d="m12 3 2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 17.03l-5.5 2.89 1.05-6.12L3.1 9.47l6.15-.9L12 3Z" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ active?: boolean }>()
</script>
