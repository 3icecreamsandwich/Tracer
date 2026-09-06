<template>
  <component :is="icons[name]" :size="20" :stroke-width="2" aria-hidden="true" class="shrink-0" />
</template>
<script setup lang="ts">
import { X, Copy, Download, TextSelect, Globe, ListFilter, LayoutDashboard } from 'lucide-vue-next'
defineProps<{
  name: 'close' | 'copy' | 'download' | 'select' | 'publish' | 'filter' | 'dashboard'
}>()
const icons = {
  close: X,
  copy: Copy,
  download: Download,
  select: TextSelect,
  publish: Globe,
  filter: ListFilter,
  dashboard: LayoutDashboard,
}
</script>
