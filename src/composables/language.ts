import { computed, readonly, ref } from 'vue'
import { createSettingsRepo, useTracerDb, type AppLanguage } from './db'
import { loadAppSettingsOnce } from './app-settings-cache'
import { hasTauriRuntime } from './tauri'
import { languageOptions, messages } from '../i18n/messages'

const STORAGE_KEY = 'tracer:language'
const activeLanguage = ref<AppLanguage>('en')

function isAppLanguage(value: unknown): value is AppLanguage {
  return languageOptions.some((option) => option.code === value)
}

function interpolate(message: string, params?: Record<string, string | number>) {
  if (!params) return message
  return message.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`))
}

export function applyAppLanguage(language: AppLanguage) {
  activeLanguage.value = language
  if (typeof document === 'undefined') return
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}

export function useAppLanguage() {
  const language = readonly(activeLanguage)
  const currentLanguageOption = computed(
    () => languageOptions.find((option) => option.code === activeLanguage.value) ?? languageOptions[0]!,
  )

  function t(key: string, params?: Record<string, string | number>) {
    const message = messages[activeLanguage.value][key] ?? messages.en[key] ?? key
    return interpolate(message, params)
  }

  function translateAppGeneratedText(value: string) {
    const synthesizedPrefix = 'Synthesized from:'
    if (!value.startsWith(synthesizedPrefix)) return value
    return `${t('set.synthesizedFrom')} ${value.slice(synthesizedPrefix.length).trim()}`
  }

  return { language, currentLanguageOption, t, translateAppGeneratedText }
}

export async function languageInit() {
  if (typeof window === 'undefined') return activeLanguage.value

  const stored = window.localStorage.getItem(STORAGE_KEY)
  applyAppLanguage(isAppLanguage(stored) ? stored : activeLanguage.value)

  if (!hasTauriRuntime()) return activeLanguage.value

  const settings = await loadAppSettingsOnce()
  applyAppLanguage(settings.language)
  window.localStorage.setItem(STORAGE_KEY, settings.language)
  return settings.language
}

export async function languageSet(language: AppLanguage) {
  applyAppLanguage(language)
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, language)
  if (!hasTauriRuntime()) return

  const db = await useTracerDb()
  await createSettingsRepo(db).set({ language })
}
