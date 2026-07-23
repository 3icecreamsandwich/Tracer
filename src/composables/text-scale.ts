import { createSettingsRepo, useTracerDb } from './db'
import { hasTauriRuntime } from './tauri'

export const textScaleLabels = ['Small', '', '', '', 'Large'] as const
const textScaleStorageKey = 'tracer:text-scale'

export function normalizeTextScale(value: unknown) {
  const number = Math.round(Number(value) || 0)
  return Math.min(4, Math.max(0, number))
}

export function applyTextScale(value: unknown) {
  if (typeof document === 'undefined') return
  const scale = normalizeTextScale(value)
  // Keep layout measurements stable. Global CSS changes only font-size utilities.
  document.documentElement.style.removeProperty('font-size')
  document.documentElement.dataset.textScale = String(scale)
}

function readStoredTextScale() {
  if (typeof window === 'undefined') return 0
  return normalizeTextScale(window.localStorage.getItem(textScaleStorageKey))
}

function storeTextScale(value: number) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(textScaleStorageKey, String(value))
}

export async function textScaleInit() {
  const storedScale = readStoredTextScale()
  applyTextScale(storedScale)

  if (!hasTauriRuntime()) {
    return storedScale
  }
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).get()
  applyTextScale(settings.textScale)
  storeTextScale(settings.textScale)
  return settings.textScale
}

export async function textScaleSet(value: unknown) {
  const scale = normalizeTextScale(value)
  applyTextScale(scale)
  storeTextScale(scale)
  if (!hasTauriRuntime()) return scale
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).set({ textScale: scale })
  return settings.textScale
}
