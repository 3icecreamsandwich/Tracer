<template>
  <span
    class="inline-flex shrink-0 items-center justify-center rounded-xl p-2.5"
    :class="modeStyles[name]"
    aria-hidden="true"
  >
    <component :is="modeIcons[name]" :stroke-width="2" class="h-full w-full" />
  </span>
</template>

<script setup lang="ts">
import Layers from '@lucide/vue/dist/esm/icons/layers.mjs'
import Pencil from '@lucide/vue/dist/esm/icons/pencil.mjs'
import WandSparkles from '@lucide/vue/dist/esm/icons/wand-sparkles.mjs'

type CreateMode = 'basic' | 'synthesize' | 'generate'

defineProps<{ name: CreateMode }>()

const modeIcons = {
  basic: Pencil,
  synthesize: Layers,
  generate: WandSparkles,
}

const modeStyles = {
  basic: 'bg-amber-100 text-amber-600 dark:bg-amber-300 dark:text-amber-600',
  synthesize: 'bg-orange-200 text-orange-600 dark:bg-orange-600 dark:text-orange-200',
  generate: 'bg-rose-200 text-rose-600 dark:bg-rose-600 dark:text-rose-200',
}
</script>
