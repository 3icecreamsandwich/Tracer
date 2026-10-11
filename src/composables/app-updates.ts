import { computed, ref, readonly } from 'vue'
import type { Update } from '@tauri-apps/plugin-updater'
import { hasTauriRuntime } from './tauri'
import { useAutomaticUpdates } from './automatic-updates'

type UpdateStatus = 'idle' | 'checking' | 'up-to-date' | 'available' | 'downloading' | 'ready' | 'error'

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

const busy = computed(() => status.value === 'checking' || status.value === 'downloading')

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
  if (!hasTauriRuntime() || busy.value || status.value == 'ready') return false

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
        downloadedBytes.value = event.data.chunkLength
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

export function useAppUpdates() {
  return {
    status: readonly(status),
    currentVersion: readonly(currentVersion),
    availableVersion: readonly(availableVersion),
    downloadedBytes: readonly(downloadedBytes),
    totalBytes: readonly(totalBytes),
    error: readonly(error),
    busy,
    downloadPercent,
    initializeVersion,
    checkUpdate,
    downloadUpdate,
  }
}