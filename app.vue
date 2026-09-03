<template>
  <AppShell>
    <NuxtPage />
  </AppShell>
</template>

<script setup lang="ts">
import { themeInitFromCache, themeInitFromDb } from '~/src/composables/theme'
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
themeInitFromCache()
let linkedFolderStartTimer: number | null = null
let linkedFolderModule: Promise<typeof import('~/src/composables/generate/linked-folders')> | null = null
let linkedFolderSyncGeneration = 0

function scheduleLinkedFolderSync() {
  if (linkedFolderStartTimer !== null || linkedFolderModule) return
  const generation = ++linkedFolderSyncGeneration
  linkedFolderStartTimer = window.setTimeout(() => {
    linkedFolderStartTimer = null
    linkedFolderModule = import('~/src/composables/generate/linked-folders')
    void linkedFolderModule.then(({ startLinkedFolderSyncManager }) => {
      if (generation !== linkedFolderSyncGeneration || !unlockedThisSession.value) return
      return startLinkedFolderSyncManager()
    }).catch(() => {})
  }, 5000)
}

function stopLinkedFolderSync() {
  linkedFolderSyncGeneration += 1
  if (linkedFolderStartTimer !== null) {
    window.clearTimeout(linkedFolderStartTimer)
    linkedFolderStartTimer = null
  }
  if (linkedFolderModule) {
    void linkedFolderModule.then(({ stopLinkedFolderSyncManager }) => stopLinkedFolderSyncManager())
  }
}

function onPageHide() {
  stopLinkedFolderSync()
}

onMounted(() => {
  window.addEventListener('pagehide', onPageHide)
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
  window.removeEventListener('pagehide', onPageHide)
  stopLinkedFolderSync()
  uninstallConnectionStatusListeners()
})
</script>
