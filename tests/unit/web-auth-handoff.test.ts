import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  origin: 'https://tracerquiz.com',
  body: { refreshToken: 'landing-refresh-token' } as any,
  cookie: 'handoff-refresh-token' as string | undefined,
  authenticatedClient: { auth: { getUser: vi.fn() } },
  transferClient: { auth: { refreshSession: vi.fn() } },
  authenticate: vi.fn(),
  limitHandoff: vi.fn(),
  createClient: vi.fn(),
  setHeader: vi.fn(),
  setResponseStatus: vi.fn(),
  setCookie: vi.fn(),
  deleteCookie: vi.fn(),
}))

vi.mock('@supabase/supabase-js', () => ({ createClient: state.createClient }))
vi.mock('../../server/utils/web-auth', () => ({
  authenticatedWebContext: state.authenticate,
  limitWebAuthHandoff: state.limitHandoff,
}))
vi.mock('../../server/utils/web-body', () => ({ readWebJson: async () => state.body }))
vi.mock('../../server/utils/web-config', () => ({
  webRuntimeConfig: () => ({ supabaseUrl: 'https://project.supabase.co', supabasePublishableKey: 'public-key' }),
}))
vi.mock('h3', () => ({
  createError: (input: any) => Object.assign(new Error(input.statusMessage), input),
  getHeader: (_event: unknown, name: string) => name === 'origin' ? state.origin : undefined,
  setHeader: state.setHeader,
  setResponseStatus: state.setResponseStatus,
  setCookie: state.setCookie,
  getCookie: () => state.cookie,
  deleteCookie: state.deleteCookie,
}))
vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)

const [{ default: start }, { default: preflight }, { default: consume }] = await Promise.all([
  import('../../server/api/web/auth/handoff.post'),
  import('../../server/api/web/auth/handoff.options'),
  import('../../server/api/web/auth/handoff/consume.post'),
])

describe('landing-site auth handoff', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    state.origin = 'https://tracerquiz.com'
    state.body = { refreshToken: 'landing-refresh-token' }
    state.cookie = 'handoff-refresh-token'
    state.authenticate.mockResolvedValue({ client: state.authenticatedClient, userId: 'user-1' })
    state.limitHandoff.mockResolvedValue(undefined)
    state.authenticatedClient.auth.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } } })
    state.transferClient.auth.refreshSession.mockResolvedValue({
      data: { user: { id: 'user-1' }, session: { access_token: 'next-access', refresh_token: 'next-refresh' } },
      error: null,
    })
    state.createClient.mockReturnValue(state.transferClient)
  })

  it('allows only the landing origin in credentialed preflights', async () => {
    expect(await preflight({} as any)).toBeNull()
    expect(state.setHeader).toHaveBeenCalledWith(expect.anything(), 'Access-Control-Allow-Origin', 'https://tracerquiz.com')
    expect(state.setHeader).toHaveBeenCalledWith(expect.anything(), 'Access-Control-Allow-Credentials', 'true')
    expect(state.setResponseStatus).toHaveBeenCalledWith(expect.anything(), 204)

    state.origin = 'https://attacker.example'
    let rejected: unknown
    try { preflight({} as any) } catch (error) { rejected = error }
    expect(rejected).toMatchObject({ statusCode: 403 })
  })

  it('rotates matching credentials into a short-lived host-only HttpOnly cookie', async () => {
    expect(await start({} as any)).toBeNull()
    expect(state.transferClient.auth.refreshSession).toHaveBeenCalledWith({ refresh_token: 'landing-refresh-token' })
    expect(state.setCookie).toHaveBeenCalledWith(expect.anything(), '__Secure-tracer-auth-handoff', 'next-refresh', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 90,
      path: '/api/web/auth/handoff/consume',
    })
    expect(state.limitHandoff).toHaveBeenCalledWith(expect.anything(), 'user-1')
  })

  it('rejects session swapping when the access and refresh tokens name different users', async () => {
    state.transferClient.auth.refreshSession.mockResolvedValue({
      data: { user: { id: 'user-2' }, session: { access_token: 'other-access', refresh_token: 'other-refresh' } },
      error: null,
    })
    await expect(start({} as any)).rejects.toMatchObject({ statusCode: 401 })
    expect(state.setCookie).not.toHaveBeenCalled()
  })

  it('consumes and clears the handoff cookie once', async () => {
    expect(await consume({} as any)).toEqual({ accessToken: 'next-access', refreshToken: 'next-refresh' })
    expect(state.deleteCookie).toHaveBeenCalledWith(expect.anything(), '__Secure-tracer-auth-handoff', {
      secure: true,
      sameSite: 'strict',
      path: '/api/web/auth/handoff/consume',
    })
    state.cookie = undefined
    await expect(consume({} as any)).rejects.toMatchObject({ statusCode: 401 })
  })
})
