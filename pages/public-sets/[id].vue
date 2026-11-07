<template>
  <SetViewer :key="String(route.params.id)" :public-set-id="String(route.params.id)" />
</template>
<script setup lang="ts">
import SetViewer from '~/pages/set/[id].vue'
import { recordPublishedSetOpen } from '~/src/composables/published-sets'
const route = useRoute()
onMounted(() => { void recordPublishedSetOpen(String(route.params.id)).catch(() => {}) })
</script>
