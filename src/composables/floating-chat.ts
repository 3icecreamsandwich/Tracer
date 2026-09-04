import { ref } from 'vue'
import { createSettingsRepo, useTracerDb } from './db'
import { loadAppSettingsOnce } from './app-settings-cache'
import { hasTauriRuntime } from './tauri'

const floatingChatEnabled = ref(true)
const floatingChatReady = ref(false)

export function useFloatingChatPreference() {
  return { floatingChatEnabled, floatingChatReady }
}

export async function floatingChatInitFromDb() {
  try {
    if (hasTauriRuntime()) {
      const settings = await loadAppSettingsOnce()
      floatingChatEnabled.value = settings.floatingChatEnabled
    }
    return floatingChatEnabled.value
  } finally {
    floatingChatReady.value = true
  }
}

export async function floatingChatSetEnabled(enabled: boolean) {
  if (hasTauriRuntime()) {
    const db = await useTracerDb()
    const settings = await createSettingsRepo(db).set({ floatingChatEnabled: enabled })
    floatingChatEnabled.value = settings.floatingChatEnabled
  } else {
    floatingChatEnabled.value = enabled
  }
  floatingChatReady.value = true
  return floatingChatEnabled.value
}
