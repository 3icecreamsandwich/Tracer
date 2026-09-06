<template>
  <SetViewer :key="String(route.params.id)" :public-set-id="String(route.params.id)" />
</template>
<script setup lang="ts">
import SetViewer from '~/pages/set/[id].vue'
const route = useRoute()
</script>
