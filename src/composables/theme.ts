import { createSettingsRepo, useTracerDb } from './db'
import { loadAppSettingsOnce } from './app-settings-cache'
import { browserStorageKey } from './platform/web'
import { hasTauriRuntime } from './tauri'

const DARK_MODE_CACHE_KEY = browserStorageKey('dark-mode')

type ThemeCache = {
  enabled: boolean
  userId?: string
}

function applyDarkClass(enabled: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', enabled)
}

function currentWebUserId(): string | null {
  if (hasTauriRuntime()) return null
  try {
    const session = JSON.parse(window.localStorage.getItem(browserStorageKey('auth')) ?? 'null') as { user?: { id?: unknown } } | null
    return typeof session?.user?.id === 'string' ? session.user.id : null
  } catch {
    return null
  }
}

function cacheDarkMode(enabled: boolean) {
  try {
    const userId = currentWebUserId()
    if (!hasTauriRuntime() && !userId) return
    window.localStorage.setItem(DARK_MODE_CACHE_KEY, JSON.stringify({ enabled, userId } satisfies ThemeCache))
  } catch {}
}

export function themeInitFromCache() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(DARK_MODE_CACHE_KEY) ?? 'null') as ThemeCache | null
    if (!cached || typeof cached.enabled !== 'boolean') return null
    if (!hasTauriRuntime() && cached.userId !== currentWebUserId()) return null
    const enabled = cached.enabled
    applyDarkClass(enabled)
    return enabled
  } catch {
    return null
  }
}

export async function themeInitFromDb() {
  const settings = await loadAppSettingsOnce()
  applyDarkClass(settings.darkMode)
  cacheDarkMode(settings.darkMode)
  return settings.darkMode
}

export async function themeSetDarkMode(enabled: boolean) {
  applyDarkClass(enabled)
  cacheDarkMode(enabled)
  const db = await useTracerDb()
  const repo = createSettingsRepo(db)
  await repo.set({ darkMode: enabled })
}
