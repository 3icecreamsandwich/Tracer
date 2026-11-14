<template>
  <component
    :is="direction === 'left' ? ChevronLeft : ChevronRight"
    aria-hidden="true"
    class="h-5 w-5 shrink-0 transition"
    :class="direction === 'left' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'"
    :size="20"
    :stroke-width="1.8"
  />
</template>

<script setup lang="ts">
import ChevronLeft from '@lucide/vue/dist/esm/icons/chevron-left.mjs'
import ChevronRight from '@lucide/vue/dist/esm/icons/chevron-right.mjs'
withDefaults(defineProps<{
  direction?: 'left' | 'right'
}>(), {
  direction: 'right',
})
</script>
