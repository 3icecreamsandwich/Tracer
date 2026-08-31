<template>
  <AppShell>
    <NuxtPage />
  </AppShell>
</template>

<script setup lang="ts">
import { themeInitFromDb } from '~/src/composables/theme'
import { languageInit } from '~/src/composables/language'
import { textScaleInit } from '~/src/composables/text-scale'
import { floatingChatInitFromDb } from '~/src/composables/floating-chat'
import { useLockSession } from '~/src/composables/lock-session'
import { hasTauriRuntime } from '~/src/composables/tauri'
import {
  initializeConnectionStatuses,
  installConnectionStatusListeners,
  uninstallConnectionStatusListeners,
} from '~/src/composables/connection-status'
import {
  startLinkedFolderSyncManager,
  stopLinkedFolderSyncManager
} from '~/src/composables/generate/linked-folders'

const { unlockedThisSession } = useLockSession()

onMounted(() => {
  installConnectionStatusListeners()
  themeInitFromDb().catch(() => {})
  languageInit().catch(() => {})
  textScaleInit().catch(() => {})
  floatingChatInitFromDb().catch(() => {})
  if (hasTauriRuntime() && unlockedThisSession.value) {
    startLinkedFolderSyncManager().catch(() => {})
    initializeConnectionStatuses().catch(() => {})
  }
})

watch(unlockedThisSession, (unlocked) => {
  if (!hasTauriRuntime()) return
  if (unlocked) {
    startLinkedFolderSyncManager().catch(() => {})
    initializeConnectionStatuses().catch(() => {})
  }
  else stopLinkedFolderSyncManager()
})

onBeforeUnmount(() => {
  stopLinkedFolderSyncManager()
  uninstallConnectionStatusListeners()
})
</script>
