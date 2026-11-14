<template>
  <component :is="icons[name] ?? Globe" :size="22" :stroke-width="1.8" aria-hidden="true" />
</template>
<script setup lang="ts">
import BookCopy from '@lucide/vue/dist/esm/icons/book-copy.mjs'
import GraduationCap from '@lucide/vue/dist/esm/icons/graduation-cap.mjs'
import Pencil from '@lucide/vue/dist/esm/icons/pencil.mjs'
import Layers from '@lucide/vue/dist/esm/icons/layers.mjs'
import Sparkles from '@lucide/vue/dist/esm/icons/sparkles.mjs'
import Send from '@lucide/vue/dist/esm/icons/send.mjs'
import LayoutGrid from '@lucide/vue/dist/esm/icons/layout-grid.mjs'
import ChartNoAxesColumn from '@lucide/vue/dist/esm/icons/chart-no-axes-column.mjs'
import Globe from '@lucide/vue/dist/esm/icons/globe.mjs'
defineProps<{ name: string }>()
const icons: Record<string, unknown> = { cards: BookCopy, classes: GraduationCap, basic: Pencil, synthesize: Layers, generate: Sparkles, request: Send, dashboard: LayoutGrid, insights: ChartNoAxesColumn, public: Globe }
</script>
