import { expect, it, vi } from 'vitest'
const mock = vi.hoisted(() => ({ invoke: vi.fn(), setSession: vi.fn(), signInWithPassword: vi.fn() }))
vi.mock('../../src/composables/auth/client', () => ({ getSupabaseClient: () => ({ functions: { invoke: mock.invoke }, auth: { setSession: mock.setSession, signInWithPassword: mock.signInWithPassword } }) }))
const { signInWithEmail } = await import('../../src/composables/auth/account')
it('signs in a username via the function and persists the returned session', async () => {
  const session = { access_token: 'access', refresh_token: 'refresh', user: { id: 'user' } }
  mock.invoke.mockResolvedValue({ data: { session }, error: null })
  mock.setSession.mockResolvedValue({ data: { session }, error: null })
  expect(await signInWithEmail('@Example', 'password', 'captcha')).toBe(session)
  expect(mock.invoke).toHaveBeenCalledWith('username-sign-in', { body: { username: '@Example', password: 'password', captchaToken: 'captcha' } })
  expect(mock.setSession).toHaveBeenCalledWith({ access_token: 'access', refresh_token: 'refresh' })
})
it('keeps email sign-in on the normal Supabase auth path', async () => {
  const session = { access_token: 'a', refresh_token: 'r' }
  mock.signInWithPassword.mockResolvedValue({ data: { session }, error: null })
  expect(await signInWithEmail('user@example.com', 'password')).toBe(session)
})
