<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-xl p-2"
    :style="setIconToneStyle(tone)"
    aria-hidden="true"
  >
    <component :is="setIconComponent(name)" :stroke-width="2" class="h-full w-full" />
  </span>
</template>

<script setup lang="ts">
import { setIconComponent, setIconToneStyle } from '~/src/composables/set-icons'

withDefaults(defineProps<{
  name?: string | null
  tone?: string | null
}>(), {
  name: 'default',
  tone: 'original',
})
</script>
