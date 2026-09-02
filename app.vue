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

const { unlockedThisSession } = useLockSession()
let linkedFolderStartTimer: number | null = null
let linkedFolderModule: Promise<typeof import('~/src/composables/generate/linked-folders')> | null = null

function scheduleLinkedFolderSync() {
  if (linkedFolderStartTimer !== null || linkedFolderModule) return
  linkedFolderStartTimer = window.setTimeout(() => {
    linkedFolderStartTimer = null
    linkedFolderModule = import('~/src/composables/generate/linked-folders')
    void linkedFolderModule.then(({ startLinkedFolderSyncManager }) => {
      return startLinkedFolderSyncManager()
    }).catch(() => {})
  }, 5000)
}

function stopLinkedFolderSync() {
  if (linkedFolderStartTimer !== null) {
    window.clearTimeout(linkedFolderStartTimer)
    linkedFolderStartTimer = null
  }
  if (linkedFolderModule) {
    void linkedFolderModule.then(({ stopLinkedFolderSyncManager }) => stopLinkedFolderSyncManager())
  }
}

onMounted(() => {
  installConnectionStatusListeners()
  themeInitFromDb().catch(() => {})
  languageInit().catch(() => {})
  textScaleInit().catch(() => {})
  floatingChatInitFromDb().catch(() => {})
  if (hasTauriRuntime() && unlockedThisSession.value) {
    scheduleLinkedFolderSync()
    initializeConnectionStatuses().catch(() => {})
  }
})

watch(unlockedThisSession, (unlocked) => {
  if (!hasTauriRuntime()) return
  if (unlocked) {
    scheduleLinkedFolderSync()
    initializeConnectionStatuses().catch(() => {})
  }
  else stopLinkedFolderSync()
})

onBeforeUnmount(() => {
  stopLinkedFolderSync()
  uninstallConnectionStatusListeners()
})
</script>
