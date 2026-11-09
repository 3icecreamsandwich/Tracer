import { afterEach, expect, it, vi } from 'vitest'
vi.mock('../../src/composables/tauri', () => ({ hasTauriRuntime: () => false }))
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.resetModules() })
it('loads missing public web configuration from runtime without mixing projects', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://old.supabase.co')
  vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '')
  vi.stubGlobal('window', {})
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ url: 'https://runtime.supabase.co', publishableKey: 'sb_publishable_test' }) }))
  const client = await import('../../src/composables/auth/client')
  expect(await client.loadSupabaseRuntimeConfig()).toBe(true)
  expect(client.getSupabaseConfig()).toEqual({ url: 'https://runtime.supabase.co', publishableKey: 'sb_publishable_test' })
})
