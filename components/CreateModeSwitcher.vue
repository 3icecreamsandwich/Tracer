<template>
  <nav aria-label="Creation mode" class="creation-mode-switcher mx-auto flex w-fit gap-1 rounded-full bg-elevated p-1 mt-5 ring ring-default">
    <UButton v-for="mode in modes" :key="mode" :to="`/create/${mode}`" :variant="route.path === `/create/${mode}` ? 'solid' : 'ghost'" :aria-current="route.path === `/create/${mode}` ? 'page' : undefined" class="rounded-full capitalize" color="primary">{{ mode.charAt(0).toUpperCase() + mode.slice(1) }}</UButton>
  </nav>
</template>
<script setup lang="ts">
const route = useRoute()
const modes = ['basic', 'synthesize', 'generate']
</script>

<style scoped>
.creation-mode-switcher { border-radius:9999px; }
.creation-mode-switcher :deep([data-slot="base"]) { border-radius:9999px; }
</style>
