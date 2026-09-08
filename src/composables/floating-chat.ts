import { isWebPreviewRuntime } from './platform/web'
import { ref } from 'vue'
import { createSettingsRepo, useTracerDb } from './db'
import { loadAppSettingsOnce } from './app-settings-cache'

const floatingChatEnabled = ref(true)
const floatingChatReady = ref(false)

export function useFloatingChatPreference() {
  return { floatingChatEnabled, floatingChatReady }
}

export async function floatingChatInitFromDb() {
  try {
    if (!isWebPreviewRuntime()) {
      const settings = await loadAppSettingsOnce()
      floatingChatEnabled.value = settings.floatingChatEnabled
    }
    return floatingChatEnabled.value
  } finally {
    floatingChatReady.value = true
  }
}

export async function floatingChatSetEnabled(enabled: boolean) {
  if (!isWebPreviewRuntime()) {
    const db = await useTracerDb()
    const settings = await createSettingsRepo(db).set({ floatingChatEnabled: enabled })
    floatingChatEnabled.value = settings.floatingChatEnabled
  } else {
    floatingChatEnabled.value = enabled
  }
  floatingChatReady.value = true
  return floatingChatEnabled.value
}
