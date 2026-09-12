import { beforeEach, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ getUser: vi.fn(), createClient: vi.fn(), limit: vi.fn() }))
vi.mock('@supabase/supabase-js', () => ({ createClient: state.createClient }))
vi.mock('h3', () => ({
  createError: (input: any) => Object.assign(new Error(input.statusMessage), input),
  getHeader: (event: any, name: string) => event.headers[name],
  setHeader: vi.fn(),
}))
vi.stubGlobal('useRuntimeConfig', () => ({ supabaseUrl: 'fallback', supabasePublishableKey: 'fallback' }))
const { authenticatedWebClient } = await import('../../server/utils/web-auth')

function event() {
  return { headers: { authorization: 'Bearer untrusted-token' }, context: { cloudflare: { env: {
    NUXT_SUPABASE_URL: 'https://fixture.supabase.co', NUXT_SUPABASE_PUBLISHABLE_KEY: 'public-key',
    WEB_RATE_LIMITER: { limit: state.limit },
  } } } } as any
}
beforeEach(() => {
  vi.clearAllMocks()
  state.createClient.mockReturnValue({ auth: { getUser: state.getUser } })
  state.getUser.mockResolvedValue({ data: { user: { id: 'verified-account' } }, error: null })
  state.limit.mockResolvedValue({ success: true })
})
it('uses runtime bindings and keys limits by the verified account', async () => {
  await authenticatedWebClient(event())
  expect(state.createClient.mock.calls[0]?.slice(0, 2)).toEqual(['https://fixture.supabase.co', 'public-key'])
  expect(state.getUser).toHaveBeenCalledWith('untrusted-token')
  expect(state.limit).toHaveBeenCalledWith({ key: 'verified-account' })
})
it('does not allocate rate keys for invalid bearer tokens', async () => {
  state.getUser.mockResolvedValue({ data: { user: null }, error: new Error('expired') })
  await expect(authenticatedWebClient(event())).rejects.toMatchObject({ statusCode: 401 })
  expect(state.limit).not.toHaveBeenCalled()
})
it('rejects over-limit accounts and missing production bindings', async () => {
  state.limit.mockResolvedValue({ success: false })
  await expect(authenticatedWebClient(event())).rejects.toMatchObject({ statusCode: 429 })
  const missing = event()
  delete missing.context.cloudflare.env.WEB_RATE_LIMITER
  await expect(authenticatedWebClient(missing)).rejects.toMatchObject({ statusCode: 503 })
})
