import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  invoke: vi.fn(),
  setSession: vi.fn(),
  clearMemory: vi.fn(),
  syncCloudProviderApiKeysToDevice: vi.fn(async () => []),
}))

vi.mock('@tauri-apps/api/core', () => ({ invoke: mocks.invoke }))
vi.mock('../../src/composables/tauri', () => ({ hasTauriRuntime: () => true }))
vi.mock('../../src/composables/auth/client', () => ({
  clearSupabaseMemorySession: mocks.clearMemory,
  getSupabaseClient: () => ({
    auth: {
      setSession: mocks.setSession,
      signOut: vi.fn(),
    },
  }),
}))
vi.mock('../../src/composables/ai/cloud-provider-keys', () => ({
  syncCloudProviderApiKeysToDevice: mocks.syncCloudProviderApiKeysToDevice,
}))

import { restoreAuthSession } from '../../src/composables/auth/session'

const stored = JSON.stringify({
  accessToken: 'old-access',
  refreshToken: 'old-refresh',
  expiresAt: 1,
  user: { id: 'user-1', email: 'teacher@example.com', userMetadata: {} },
})

const refreshedSession = {
  access_token: 'new-access',
  refresh_token: 'new-refresh',
  expires_at: 2,
  user: { id: 'user-1', email: 'teacher@example.com', user_metadata: {} },
}

beforeEach(() => {
  mocks.invoke.mockReset()
  mocks.setSession.mockReset()
  mocks.clearMemory.mockReset()
  mocks.syncCloudProviderApiKeysToDevice.mockReset()
  mocks.syncCloudProviderApiKeysToDevice.mockResolvedValue([])
  mocks.invoke.mockImplementation(async (command: string) => {
    if (command === 'auth_session_get') return stored
    return null
  })
})

describe('Supabase session restoration', () => {
  it('shares one refresh across simultaneous startup callers', async () => {
    mocks.setSession.mockResolvedValue({ data: { session: refreshedSession }, error: null })

    const results = await Promise.all([
      restoreAuthSession(),
      restoreAuthSession(),
      restoreAuthSession(),
    ])

    expect(mocks.setSession).toHaveBeenCalledTimes(1)
    expect(mocks.syncCloudProviderApiKeysToDevice).toHaveBeenCalledTimes(1)
    expect(mocks.invoke.mock.calls.filter(([command]) => command === 'auth_session_get')).toHaveLength(1)
    expect(results.every((result) => result?.online)).toBe(true)
  })

  it('clears an invalid rotated token instead of reporting the app offline', async () => {
    mocks.setSession.mockResolvedValue({
      data: { session: null },
      error: { code: 'refresh_token_already_used', message: 'Already used' },
    })

    await expect(restoreAuthSession()).resolves.toBeNull()
    expect(mocks.invoke).toHaveBeenCalledWith('auth_session_delete')
  })

  it('preserves the stored identity for a genuine network outage', async () => {
    mocks.setSession.mockRejectedValue(new Error('Failed to fetch'))

    await expect(restoreAuthSession()).resolves.toMatchObject({
      online: false,
      identity: { id: 'user-1' },
    })
    expect(mocks.invoke).not.toHaveBeenCalledWith('auth_session_delete')
  })
})
