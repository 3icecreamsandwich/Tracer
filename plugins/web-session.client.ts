import { hasTauriRuntime } from '~/src/composables/tauri'
import { getSupabaseClient, isSupabaseConfigured } from '~/src/composables/auth/client'
import { appUrl, isWebPreviewRuntime } from '~/src/composables/platform/web'

export default defineNuxtPlugin(() => {
  if (hasTauriRuntime() || isWebPreviewRuntime() || !isSupabaseConfigured()) return
  let initialized = false
  let owner: string | null = null
  getSupabaseClient().auth.onAuthStateChange((event, session) => {
    const nextOwner = session?.user.id ?? null
    if (initialized && nextOwner !== owner) {
      // Includes changes from other tabs: never retain another account's UI/cache.
      // Account completion resumes on first-run after a document reload.
      window.location.replace(appUrl('first-run'))
    }
    if (event === 'INITIAL_SESSION') initialized = true
    owner = nextOwner
  })
})
