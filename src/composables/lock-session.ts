import { ref } from 'vue'
import { clearCachedHomeDashboard } from './home-dashboard-cache'

const STORAGE_KEY = 'tracer:unlockedThisSession'

function readSessionFlag(): boolean {
  try {
    const storage = (globalThis as any)?.sessionStorage as Storage | undefined
    if (!storage) return false
    return storage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function writeSessionFlag(value: boolean) {
  try {
    const storage = (globalThis as any)?.sessionStorage as Storage | undefined
    if (!storage) return
    if (value) storage.setItem(STORAGE_KEY, '1')
    else storage.removeItem(STORAGE_KEY)
  } catch {
  }
}

const unlockedThisSession = ref(readSessionFlag())

export function useLockSession() {
  function markUnlocked() {
    unlockedThisSession.value = true
    writeSessionFlag(true)
  }

  function markLocked() {
    unlockedThisSession.value = false
    writeSessionFlag(false)
    clearCachedHomeDashboard()
  }

  return {
    unlockedThisSession,
    markUnlocked,
    markLocked
  }
}
