import { loadSupabaseRuntimeConfig } from '~/src/composables/auth/client'

export default defineNuxtPlugin(async () => {
  await loadSupabaseRuntimeConfig()
})
