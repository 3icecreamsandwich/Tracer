import { expect, it, vi } from 'vitest'
vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
vi.stubGlobal('useRuntimeConfig', () => ({ supabaseUrl: '', supabasePublishableKey: '' }))
vi.stubGlobal('setHeader', vi.fn())
vi.stubGlobal('createError', (value: { statusCode: number; statusMessage: string }) => Object.assign(new Error(value.statusMessage), value))
const { default: handler } = await import('../../server/api/web/config.get')
const event = (key: string) => ({ context: { cloudflare: { env: { NUXT_SUPABASE_URL: 'https://test.supabase.co', NUXT_SUPABASE_PUBLISHABLE_KEY: key } } } }) as any
it('returns public runtime configuration and rejects secret credentials', () => {
  expect(handler(event('sb_publishable_test'))).toEqual({ url: 'https://test.supabase.co', publishableKey: 'sb_publishable_test' })
  expect(() => handler(event('sb_secret_test'))).toThrow()
  const serviceKey = `x.${btoa(JSON.stringify({ role: 'service_role' }))}.y`
  expect(() => handler(event(serviceKey))).toThrow()
})
