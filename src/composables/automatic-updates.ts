import { readonly, ref } from 'vue'
import { createSettingsRepo, useTracerDb } from './db'
import { clearAppSettingsRequest } from './app-settings-cache'
import { hasTauriRuntime } from './tauri'

const enabled = ref(true)
const ready = ref(false)

let initialization: Promise<void> | null = null

async function initialize(): Promise<void> {
  if (!hasTauriRuntime() || ready.value) return

  if (!initialization) {
    initialization = (async () => {
      const db = useTracerDb()
      const settings = await createSettingsRepo(db).get()

      enabled.value = settings.automaticUpdatesEnabled
      ready.value = true
    })().finally(() => {
      initialization = null
    })
  }

  await initialization
}

async function setEnabled(value: boolean): Promise<void> {
  if (!hasTauriRuntime()) return

  await initialize()

  const db = useTracerDb()
  const settings = await createSettingsRepo(db).set({ automaticUpdatesEnabled: value })
  
  enabled.value = settings.automaticUpdatesEnabled
  clearAppSettingsRequest()
}

export function useAutomaticUpdates() {
  return {
    enabled: readonly(enabled),
    ready: readonly(ready),
    initialize,
    setEnabled,
  }
}