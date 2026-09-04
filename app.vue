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
  CONNECTION_STARTUP_STATE_KEY,
  isDocumentReload,
  parseConnectionStartupState,
  shouldRunConnectionStartup,
} from '~/src/composables/refresh-startup'

const { unlockedThisSession } = useLockSession()
themeInitFromCache()
let linkedFolderStartTimer: number | null = null
let linkedFolderModule: Promise<typeof import('~/src/composables/generate/linked-folders')> | null = null
let linkedFolderSyncGeneration = 0
const LINKED_FOLDER_SESSION_STARTED_KEY = 'tracer:linked-folder-manager-started'
let connectionStartTimer: number | null = null
let connectionIdleHandle: number | null = null
let connectionModule: Promise<typeof import('~/src/composables/connection-status')> | null = null
let connectionStartupGeneration = 0

function readConnectionStartupState() {
  try {
    return parseConnectionStartupState(window.sessionStorage.getItem(CONNECTION_STARTUP_STATE_KEY))
  } catch {
    return parseConnectionStartupState(null)
  }
}

function writeConnectionStartupState(state: { attemptedAt: number; completedAt: number }) {
  try {
    window.sessionStorage.setItem(CONNECTION_STARTUP_STATE_KEY, JSON.stringify(state))
  } catch {}
}

function scheduleConnectionStartup() {
  if (connectionStartTimer !== null || connectionIdleHandle !== null || connectionModule) return
  const navigationEntries = typeof performance === 'undefined'
    ? undefined
    : performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  if (isDocumentReload(navigationEntries)) return
  const now = Date.now()
  const state = readConnectionStartupState()
  if (!shouldRunConnectionStartup(state, now)) return
  writeConnectionStartupState({ ...state, attemptedAt: now })
  const generation = ++connectionStartupGeneration
  connectionStartTimer = window.setTimeout(() => {
    connectionStartTimer = null
    const run = () => {
      connectionIdleHandle = null
      if (generation !== connectionStartupGeneration || !unlockedThisSession.value) return
      connectionModule = import('~/src/composables/connection-status')
      void connectionModule.then(async (connection) => {
        if (generation !== connectionStartupGeneration) return
        connection.installConnectionStatusListeners()
        await connection.initializeConnectionStatuses()
        const latest = readConnectionStartupState()
        writeConnectionStartupState({ ...latest, completedAt: Date.now() })
      }).catch(() => {})
    }
    if ('requestIdleCallback' in window) {
      connectionIdleHandle = window.requestIdleCallback(run, { timeout: 2_000 })
    } else run()
  }, 1_000)
}

function stopConnectionStartup() {
  connectionStartupGeneration += 1
  if (connectionStartTimer !== null) {
    window.clearTimeout(connectionStartTimer)
    connectionStartTimer = null
  }
  if (connectionIdleHandle !== null && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(connectionIdleHandle)
    connectionIdleHandle = null
  }
  if (connectionModule) {
    void connectionModule.then((connection) => connection.uninstallConnectionStatusListeners())
  }
}

function scheduleLinkedFolderSync() {
  if (linkedFolderStartTimer !== null || linkedFolderModule) return
  const generation = ++linkedFolderSyncGeneration
  linkedFolderStartTimer = window.setTimeout(() => {
    linkedFolderStartTimer = null
    linkedFolderModule = import('~/src/composables/generate/linked-folders')
    void linkedFolderModule.then(async ({ startLinkedFolderSyncManager }) => {
      if (generation !== linkedFolderSyncGeneration || !unlockedThisSession.value) return
      let syncOnStart = true
      try {
        syncOnStart = window.sessionStorage.getItem(LINKED_FOLDER_SESSION_STARTED_KEY) !== 'true'
      } catch {}
      await startLinkedFolderSyncManager({ syncOnStart })
      try {
        window.sessionStorage.setItem(LINKED_FOLDER_SESSION_STARTED_KEY, 'true')
      } catch {}
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
  stopConnectionStartup()
}

onMounted(() => {
  window.addEventListener('pagehide', onPageHide)
  themeInitFromDb().catch(() => {})
  languageInit().catch(() => {})
  textScaleInit().catch(() => {})
  floatingChatInitFromDb().catch(() => {})
  if (hasTauriRuntime() && unlockedThisSession.value) {
    scheduleLinkedFolderSync()
    scheduleConnectionStartup()
  }
})

watch(unlockedThisSession, (unlocked) => {
  if (!hasTauriRuntime()) return
  if (unlocked) {
    scheduleLinkedFolderSync()
    scheduleConnectionStartup()
  }
  else {
    stopLinkedFolderSync()
    stopConnectionStartup()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('pagehide', onPageHide)
  stopLinkedFolderSync()
  stopConnectionStartup()
})
</script>
