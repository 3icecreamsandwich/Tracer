<template>
  <AppShell>
    <NuxtPage />
  </AppShell>
</template>

<script setup lang="ts">
import { themeInitFromDb } from '~/src/composables/theme'
import { languageInit } from '~/src/composables/language'
import { textScaleInit } from '~/src/composables/text-scale'
import { useLockSession } from '~/src/composables/lock-session'
import { hasTauriRuntime } from '~/src/composables/tauri'
import {
  startLinkedFolderSyncManager,
  stopLinkedFolderSyncManager
} from '~/src/composables/generate/linked-folders'

const { unlockedThisSession } = useLockSession()

onMounted(() => {
  themeInitFromDb().catch(() => {})
  languageInit().catch(() => {})
  textScaleInit().catch(() => {})
  if (hasTauriRuntime() && unlockedThisSession.value) {
    startLinkedFolderSyncManager().catch(() => {})
  }
})

watch(unlockedThisSession, (unlocked) => {
  if (!hasTauriRuntime()) return
  if (unlocked) startLinkedFolderSyncManager().catch(() => {})
  else stopLinkedFolderSyncManager()
})

onBeforeUnmount(stopLinkedFolderSyncManager)
</script>
