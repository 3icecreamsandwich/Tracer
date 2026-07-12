<template>
  <AppShell>
    <NuxtPage />
  </AppShell>
</template>

<script setup lang="ts">
import { themeInitFromDb } from '~/src/composables/theme'
import { languageInit } from '~/src/composables/language'

onMounted(() => {
  themeInitFromDb().catch(() => {})
  languageInit().catch(() => {})
})
</script>
