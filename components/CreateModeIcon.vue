<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-[var(--tracer-radius-control)] p-2.5"
    :class="modeStyles[name]"
    aria-hidden="true"
  >
    <component :is="modeIcons[name]" :stroke-width="2" class="h-full w-full" />
  </span>
</template>

<script setup lang="ts">
import Layers from '@lucide/vue/dist/esm/icons/layers.mjs'
import Pencil from '@lucide/vue/dist/esm/icons/pencil.mjs'
import Sparkles from '@lucide/vue/dist/esm/icons/sparkles.mjs'

type CreateMode = 'basic' | 'synthesize' | 'generate'

defineProps<{ name: CreateMode }>()

const modeIcons = {
  basic: Pencil,
  synthesize: Layers,
  generate: Sparkles,
}

const modeStyles = {
  basic: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
  synthesize: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
  generate: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
}
</script>
