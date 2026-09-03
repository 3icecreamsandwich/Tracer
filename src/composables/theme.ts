import { createSettingsRepo, useTracerDb } from './db'

const DARK_MODE_CACHE_KEY = 'tracer:dark-mode'

function applyDarkClass(enabled: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', enabled)
}

function cacheDarkMode(enabled: boolean) {
  try { window.localStorage.setItem(DARK_MODE_CACHE_KEY, String(enabled)) } catch {}
}

export function themeInitFromCache() {
  try {
    const cached = window.localStorage.getItem(DARK_MODE_CACHE_KEY)
    if (cached === null) return null
    const enabled = cached === 'true'
    applyDarkClass(enabled)
    return enabled
  } catch {
    return null
  }
}

export async function themeInitFromDb() {
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).get()
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
