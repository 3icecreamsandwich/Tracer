import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  aiProviderApiKeyPresence: vi.fn(),
  aiOpenAiCompatGetConfig: vi.fn(),
  githubModelsLoadAuthState: vi.fn(),
  restoreAuthSession: vi.fn(),
  waitForProviderKeySync: vi.fn(),
}))

vi.mock('../../src/composables/ai/credentials', () => ({
  aiProviderApiKeyPresence: mocks.aiProviderApiKeyPresence,
  aiOpenAiCompatGetConfig: mocks.aiOpenAiCompatGetConfig,
}))

vi.mock('../../src/composables/ai/github-state', () => ({
  githubModelsLoadAuthState: mocks.githubModelsLoadAuthState,
}))

vi.mock('../../src/composables/auth/session', () => ({
  restoreAuthSession: mocks.restoreAuthSession,
  waitForProviderKeySync: mocks.waitForProviderKeySync,
}))

import {
  initializeConnectionStatuses,
  refreshNetworkConnectionStatuses,
  resetConnectionStatusCache,
  setProviderApiKeyPresence,
  useConnectionStatus,
} from '../../src/composables/connection-status'

const emptyPresence = {
  openai: false,
  anthropic: false,
  gemini: false,
  ollama_cloud: false,
  openai_compat: false,
}

describe('session connection-status cache', () => {
  beforeEach(() => {
    resetConnectionStatusCache()
    mocks.aiProviderApiKeyPresence.mockReset()
    mocks.aiProviderApiKeyPresence.mockResolvedValue({ ...emptyPresence, openai: true })
    mocks.aiOpenAiCompatGetConfig.mockReset()
    mocks.aiOpenAiCompatGetConfig.mockResolvedValue({
      baseURL: 'https://example.com/v1',
      modelId: 'model-x',
    })
    mocks.githubModelsLoadAuthState.mockReset()
    mocks.githubModelsLoadAuthState.mockResolvedValue({
      status: 'authenticated',
      models: [{ id: 'github-model' }],
    })
    mocks.restoreAuthSession.mockReset()
    mocks.restoreAuthSession.mockResolvedValue({
      identity: { id: 'user-1', email: 'user@example.com', userMetadata: {} },
      online: true,
    })
    mocks.waitForProviderKeySync.mockReset()
    mocks.waitForProviderKeySync.mockResolvedValue(undefined)
  })

  it('loads once and reuses resolved statuses when Settings opens again', async () => {
    await initializeConnectionStatuses()
    await initializeConnectionStatuses()

    const status = useConnectionStatus()
    expect(status.accountConnectionStatus.value).toBe('online')
    expect(status.providerApiKeyPresence.value.openai).toBe(true)
    expect(status.openAiCompatConfig.value).toEqual({
      baseURL: 'https://example.com/v1',
      modelId: 'model-x',
    })
    expect(status.githubModelsAvailableModelIds.value).toEqual(['github-model'])
    expect(mocks.restoreAuthSession).toHaveBeenCalledTimes(1)
    expect(mocks.aiOpenAiCompatGetConfig).toHaveBeenCalledTimes(1)
    expect(mocks.githubModelsLoadAuthState).toHaveBeenCalledTimes(1)
  })

  it('updates local credential presence directly without refetching the vault', async () => {
    await initializeConnectionStatuses()
    const initialLoads = mocks.aiProviderApiKeyPresence.mock.calls.length

    setProviderApiKeyPresence('anthropic', true)

    expect(useConnectionStatus().providerApiKeyPresence.value.anthropic).toBe(true)
    expect(mocks.aiProviderApiKeyPresence).toHaveBeenCalledTimes(initialLoads)
  })

  it('force-refreshes network-backed state while keeping compatible config cached', async () => {
    await initializeConnectionStatuses()
    await refreshNetworkConnectionStatuses({ force: true })

    expect(mocks.restoreAuthSession).toHaveBeenCalledTimes(2)
    expect(mocks.githubModelsLoadAuthState).toHaveBeenCalledTimes(2)
    expect(mocks.aiOpenAiCompatGetConfig).toHaveBeenCalledTimes(1)
  })
})
