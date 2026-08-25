import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  aiProviderApiKeyPresence: vi.fn(async () => ({
    openai: false,
    anthropic: false,
    gemini: false,
    ollama_cloud: false,
    openai_compat: false
  })),
  aiProviderSettingsSave: vi.fn(async () => ({
    savedApiKeyIds: [] as string[],
    savedOpenAiCompatConfig: false
  })),
  aiSecretsDelete: vi.fn(async () => undefined),
}))

vi.mock('../../src/composables/ai/credentials', () => {
  return {
    aiProviderApiKeyPresence: mocks.aiProviderApiKeyPresence,
    aiProviderSettingsSave: mocks.aiProviderSettingsSave,
    aiSecretsDelete: mocks.aiSecretsDelete,
  }
})

describe('provider settings API key helpers', () => {
  beforeEach(() => {
    mocks.aiProviderApiKeyPresence.mockReset()
    mocks.aiProviderApiKeyPresence.mockResolvedValue({
      openai: false,
      anthropic: false,
      gemini: false,
      ollama_cloud: false,
      openai_compat: false
    })
    mocks.aiProviderSettingsSave.mockReset()
    mocks.aiProviderSettingsSave.mockResolvedValue({
      savedApiKeyIds: [],
      savedOpenAiCompatConfig: false
    })
    mocks.aiSecretsDelete.mockReset()
    mocks.aiSecretsDelete.mockResolvedValue(undefined)
  })

  it('does not invoke key save for blank drafts', async () => {
    const { saveProviderApiKeyDrafts } = await import('../../src/composables/ai/provider-settings')

    const result = await saveProviderApiKeyDrafts({
      openai: '',
      anthropic: '   ',
      gemini: undefined,
      openai_compat: '\n\t'
    })

    expect(result).toEqual({ savedApiKeyIds: [], savedOpenAiCompatConfig: false })
    expect(mocks.aiProviderSettingsSave).not.toHaveBeenCalled()
  })

  it('sends multiple non-empty drafts through one batched save call', async () => {
    const { saveProviderApiKeyDrafts } = await import('../../src/composables/ai/provider-settings')
    mocks.aiProviderSettingsSave.mockResolvedValue({
      savedApiKeyIds: ['openai', 'gemini'],
      savedOpenAiCompatConfig: false
    })

    const result = await saveProviderApiKeyDrafts({
      openai: ' sk-openai ',
      anthropic: '',
      gemini: 'AIza-test\n',
      openai_compat: '   '
    })

    expect(result).toEqual({
      savedApiKeyIds: ['openai', 'gemini'],
      savedOpenAiCompatConfig: false
    })
    expect(mocks.aiProviderSettingsSave).toHaveBeenCalledTimes(1)
    expect(mocks.aiProviderSettingsSave).toHaveBeenCalledWith({
      apiKeys: {
        openai: 'sk-openai',
        gemini: 'AIza-test'
      },
      openAiCompatConfig: undefined
    })
  })

  it('passes OpenAI Compatible config through the batched save call', async () => {
    const { saveProviderApiKeyDrafts } = await import('../../src/composables/ai/provider-settings')
    mocks.aiProviderSettingsSave.mockResolvedValue({
      savedApiKeyIds: [],
      savedOpenAiCompatConfig: true
    })

    const result = await saveProviderApiKeyDrafts(
      {},
      { openAiCompatConfig: { baseURL: 'https://example.com/v1', modelId: 'model-x' } }
    )

    expect(result).toEqual({
      savedApiKeyIds: [],
      savedOpenAiCompatConfig: true
    })
    expect(mocks.aiProviderSettingsSave).toHaveBeenCalledTimes(1)
    expect(mocks.aiProviderSettingsSave).toHaveBeenCalledWith({
      apiKeys: {},
      openAiCompatConfig: { baseURL: 'https://example.com/v1', modelId: 'model-x' }
    })
  })

  it('loads only boolean key presence without exposing secret values', async () => {
    const { loadProviderApiKeyPresence } = await import('../../src/composables/ai/provider-settings')
    mocks.aiProviderApiKeyPresence.mockResolvedValue({
      openai: true,
      anthropic: false,
      gemini: false,
      ollama_cloud: true,
      openai_compat: true
    })

    const presence = await loadProviderApiKeyPresence()

    expect(presence).toEqual({
      openai: true,
      anthropic: false,
      gemini: false,
      ollama_cloud: true,
      openai_compat: true
    })
    expect(Object.values(presence)).toEqual([true, false, false, true, true])
    expect(mocks.aiProviderApiKeyPresence).toHaveBeenCalledTimes(1)
  })

  it('clears provider keys using delete, not empty secret writes', async () => {
    const { clearProviderApiKey } = await import('../../src/composables/ai/provider-settings')

    await clearProviderApiKey('openai_compat')

    expect(mocks.aiSecretsDelete).toHaveBeenCalledTimes(1)
    expect(mocks.aiSecretsDelete).toHaveBeenCalledWith('openai_compat_api_key')
    expect(mocks.aiProviderSettingsSave).not.toHaveBeenCalled()
  })
})
