import { getSupabaseClient, isSupabaseConfigured, loadSupabaseRuntimeConfig } from '~/src/composables/auth/client'
import { readStoredAuthSession } from '~/src/composables/auth/session'
import { hasTauriRuntime } from '~/src/composables/tauri'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server || !/^\/(?:set|public-sets)\/[^/]+(?:\/.*)?\/?$/.test(to.path)) return

  if (hasTauriRuntime()) {
    // Keep an existing offline desktop session usable without a network check.
    if (!(await readStoredAuthSession())) return navigateTo('/first-run', { replace: true })
    return
  }

  if (!isSupabaseConfigured() && !(await loadSupabaseRuntimeConfig())) return
  try {
    const { data, error } = await getSupabaseClient().auth.getSession()
    if (!error && !data.session) return navigateTo('/first-run', { replace: true })
  } catch {
    // A transient session-storage or network failure is not proof of sign-out.
  }
})
