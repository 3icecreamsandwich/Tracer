import { computed, ref, readonly } from 'vue'
import type { Update } from '@tauri-apps/plugin-updater'
import { hasTauriRuntime } from './tauri'
import { useAutomaticUpdates } from './automatic-updates'

type UpdateStatus = 'idle' | 'checking' | 'up-to-date' | 'available' | 'downloading' | 'ready' | 'error' | 'installing' | 'installed' | 'restarting'

const status = ref<UpdateStatus>('idle')
const currentVersion = ref<string | null>(null)
const availableVersion = ref<string | null>(null)
const downloadedBytes = ref<number>(0)
const totalBytes = ref<number | null>(null)
const error = ref<string | null>(null)

let pendingUpdate: Update | null = null
let versionRequest: Promise<void> | null = null
let startupStarted = false
const startupError = ref<string | null>(null)

const busy = computed(() =>
  ['checking', 'downloading', 'installing', 'restarting'].includes(status.value)
)

const downloadPercent = computed(() => {
  if (status.value === "ready") return 100
  if (!totalBytes.value) return null

  return Math.min(99, Math.floor((downloadedBytes.value / totalBytes.value) * 100))
})

function errorMessage(cause: unknown): string {
  if (cause instanceof Error) return cause.message
  if (typeof cause === 'string') return cause
  return "Unable to update Tracer. Please try again."
}

async function initializeVersion(): Promise<void> {
  if (!hasTauriRuntime() || currentVersion.value) return

  if (!versionRequest) {
    versionRequest = (async () => {
      const { getVersion } = await import('@tauri-apps/api/app')
      currentVersion.value = await getVersion()
    })().finally(() => {
      versionRequest = null
    })
  }

  await versionRequest
}

async function releasePendingUpdate(): Promise<void> {
  if (!pendingUpdate) return

  const update = pendingUpdate
  pendingUpdate = null
  await update.close()
}

async function checkUpdate(): Promise<boolean> {
  if (
    !hasTauriRuntime() ||
    busy.value ||
    status.value === 'ready' ||
    status.value === 'installed'
  ) {
    return false
  }

  status.value = 'checking'
  error.value = null
  availableVersion.value = null
  downloadedBytes.value = 0
  totalBytes.value = null

  try {
    await releasePendingUpdate()
    await initializeVersion()

    const { check } = await import('@tauri-apps/plugin-updater')
    pendingUpdate = await check({ timeout: 50_000 })

    if (!pendingUpdate) {
      status.value = 'up-to-date'
      return false
    }

    availableVersion.value = pendingUpdate.version
    status.value = 'available'
    return true
  } catch (e) {
    error.value = errorMessage(e)
    status.value = 'error'
    return false
  }
}

async function downloadUpdate(): Promise<boolean> {
  if (!hasTauriRuntime() || busy.value || status.value !== 'available' || !pendingUpdate) return false

  const update = pendingUpdate
  status.value = 'downloading'
  error.value = null
  downloadedBytes.value = 0
  totalBytes.value = null

  try {
    await update.download((event) => {
      if (event.event === "Started") {
        const length = event.data.contentLength
        totalBytes.value = typeof length === "number" && length > 0 ? length : null
      } else if (event.event === "Progress") {
        downloadedBytes.value += event.data.chunkLength
      }
    }, ({ timeout: 500_000 }))

    status.value = 'ready'
    return true
  } catch (e) {
    error.value = errorMessage(e)
    status.value = 'error'
    return false
  }
}

async function startCheckUpdates(): Promise<void> {
  if (!hasTauriRuntime() || startupStarted) return

  startupStarted = true
  startupError.value = null

  try {
    const preference = useAutomaticUpdates()
    await preference.initialize()

    await initializeVersion()

    if (!preference.enabled.value) return

    const available = await checkUpdate()

    if (available && preference.enabled.value) {
      await downloadUpdate()
    }
  } catch (e) {
    startupError.value = errorMessage(e)
  }
}

async function installAndRestart(): Promise<boolean> {
  if (!hasTauriRuntime() || busy.value || !['ready', 'installed'].includes(status.value)) return false

  const alreadyInstalled = status.value === 'installed'
  if (!alreadyInstalled && !pendingUpdate) return false

  status.value = alreadyInstalled ? 'restarting' : 'installing'
  error.value = null

  let installationCompleted = alreadyInstalled
  let installationAttempted = false

  try {
    const { invoke } = await import('@tauri-apps/api/core')
    const { relaunch } = await import('@tauri-apps/plugin-process')

    const windows = await invoke<boolean>('updater_preflight')

    if (!alreadyInstalled) {
      installationAttempted = true

      await pendingUpdate?.install({ restartAfterInstall: true })
      installationCompleted = true
      pendingUpdate = null

      if (windows) return true
    }

    status.value = 'restarting'
    await relaunch()
    return true
  } catch (e) {
    error.value = errorMessage(e)

    if (installationCompleted) {
      status.value = 'installed'

    } else if (installationAttempted) {
      await releasePendingUpdate().catch(() => { })
      status.value = 'error'
    } else {
      status.value = 'ready'
    }

    return false
  }
}

export function useAppUpdates() {
  return {
    status: readonly(status),
    currentVersion: readonly(currentVersion),
    availableVersion: readonly(availableVersion),
    downloadedBytes: readonly(downloadedBytes),
    totalBytes: readonly(totalBytes),
    error: readonly(error),
    startupError: readonly(startupError),
    busy,
    downloadPercent,
    initializeVersion,
    checkUpdate,
    startAutomaticUpdates: startCheckUpdates,
    downloadUpdate,
    installAndRestart,
  }
}