<template>
  <component :is="icons[name]" :size="size" :stroke-width="strokeWidth" aria-hidden="true" class="shrink-0" />
</template>
<script setup lang="ts">
// Import only the icons we render; the barrel includes the entire library in Vite dev.
import X from '@lucide/vue/dist/esm/icons/x.mjs'
import Copy from '@lucide/vue/dist/esm/icons/copy.mjs'
import Download from '@lucide/vue/dist/esm/icons/download.mjs'
import ScanText from '@lucide/vue/dist/esm/icons/scan-text.mjs'
import LibraryBig from '@lucide/vue/dist/esm/icons/library-big.mjs'
import ListFilter from '@lucide/vue/dist/esm/icons/list-filter.mjs'
import LayoutGrid from '@lucide/vue/dist/esm/icons/layout-grid.mjs'
withDefaults(defineProps<{
  name: 'close' | 'copy' | 'download' | 'select' | 'publish' | 'filter' | 'dashboard'
  size?: number
  strokeWidth?: number
}>(), {
  size: 20,
  strokeWidth: 2,
})
const icons = {
  close: X,
  copy: Copy,
  download: Download,
  select: ScanText,
  publish: LibraryBig,
  filter: ListFilter,
  dashboard: LayoutGrid,
}
</script>
