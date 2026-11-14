<template>
  <Star aria-hidden="true" :size="20" :stroke-width="1.7" :class="active ? 'text-amber-500' : 'text-muted'" :fill="active ? 'currentColor' : 'none'" />
</template>

<script setup lang="ts">
import Star from '@lucide/vue/dist/esm/icons/star.mjs'
defineProps<{ active?: boolean }>()
</script>
