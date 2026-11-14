import { beforeEach, expect, it, vi } from 'vitest'
const state = vi.hoisted(() => ({ signInWithPassword: vi.fn(), setSession: vi.fn(), invoke: vi.fn(), onAuthStateChange: vi.fn(), unsubscribe: vi.fn() }))
vi.mock('../../src/composables/auth/client', () => ({ getSupabaseClient: () => ({ auth: { signInWithPassword: state.signInWithPassword, setSession: state.setSession, onAuthStateChange: state.onAuthStateChange }, functions: { invoke: state.invoke } }) }))
vi.mock('../../src/composables/tauri', () => ({ hasTauriRuntime: () => false }))
import { signInWithEmail, waitForEmailVerification } from '../../src/composables/auth/account'
const session = { access_token: 'access', refresh_token: 'refresh', user: { id: 'owner', email: 'test@example.invalid' } } as any
beforeEach(() => { vi.clearAllMocks(); state.signInWithPassword.mockResolvedValue({ data: { session }, error: null }); state.setSession.mockResolvedValue({ data: { session }, error: null }); state.invoke.mockResolvedValue({ data: { session }, error: null }) })
it('signs in by email using the password flow', async () => {
  await expect(signInWithEmail(' test@example.invalid ', 'password')).resolves.toEqual(session)
  expect(state.signInWithPassword).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.invalid', password: 'password' }))
})
it('signs in by username and restores the returned session', async () => {
  await expect(signInWithEmail('@example', 'password')).resolves.toEqual(session)
  expect(state.invoke).toHaveBeenCalledWith('username-sign-in', expect.objectContaining({ body: expect.objectContaining({ username: '@example' }) }))
  expect(state.setSession).toHaveBeenCalledWith({ access_token: 'access', refresh_token: 'refresh' })
})
it('continues email verification after the auth callback returns', async () => {
  vi.useFakeTimers()
  try {
    let callback!: (event: string, session: any) => void
    state.onAuthStateChange.mockImplementation((fn) => { callback = fn; return { data: { subscription: { unsubscribe: state.unsubscribe } } } })
    const pending = waitForEmailVerification({ listener: { id: 'browser', port: 0 }, email: 'test@example.invalid', role: 'student' })
    let resolved = false
    void pending.then(() => { resolved = true })
    callback('SIGNED_IN', session)
    await Promise.resolve()
    expect(resolved).toBe(false)
    await vi.runAllTimersAsync()
    await expect(pending).resolves.toEqual(session)
    expect(state.unsubscribe).toHaveBeenCalledOnce()
  } finally { vi.useRealTimers() }
})
