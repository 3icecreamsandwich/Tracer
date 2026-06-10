import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  aiSecretsDelete: vi.fn(async () => undefined),
  aiSecretsGet: vi.fn(async () => null as string | null),
  aiSecretsSet: vi.fn(async () => undefined)
}))

vi.mock('../../src/composables/ai/credentials', () => {
  return {
    aiSecretsDelete: mocks.aiSecretsDelete,
    aiSecretsGet: mocks.aiSecretsGet,
    aiSecretsSet: mocks.aiSecretsSet
  }
})

describe('provider settings API key helpers', () => {
  beforeEach(() => {
    mocks.aiSecretsDelete.mockReset()
    mocks.aiSecretsDelete.mockResolvedValue(undefined)
    mocks.aiSecretsGet.mockReset()
    mocks.aiSecretsGet.mockResolvedValue(null)
    mocks.aiSecretsSet.mockReset()
    mocks.aiSecretsSet.mockResolvedValue(undefined)
  })

  it('does not save blank drafts', async () => {
    const { saveProviderApiKeyDrafts } = await import('../../src/composables/ai/provider-settings')

    await saveProviderApiKeyDrafts({
      openai: '',
      anthropic: '   ',
      gemini: undefined,
      openai_compat: '\n\t'
    })

    expect(mocks.aiSecretsSet).not.toHaveBeenCalled()
  })

  it('saves only non-empty drafts with trimmed values', async () => {
    const { saveProviderApiKeyDrafts } = await import('../../src/composables/ai/provider-settings')

    await saveProviderApiKeyDrafts({
      openai: ' sk-openai ',
      anthropic: '',
      gemini: 'AIza-test\n',
      openai_compat: '   '
    })

    expect(mocks.aiSecretsSet).toHaveBeenCalledTimes(2)
    expect(mocks.aiSecretsSet).toHaveBeenCalledWith('openai_api_key', 'sk-openai')
    expect(mocks.aiSecretsSet).toHaveBeenCalledWith('gemini_api_key', 'AIza-test')
  })

  it('loads only boolean key presence without exposing secret values', async () => {
    const { loadProviderApiKeyPresence } = await import('../../src/composables/ai/provider-settings')
    mocks.aiSecretsGet.mockImplementation(async (kind: string) => {
      if (kind === 'openai_api_key') return 'sk-secret'
      if (kind === 'gemini_api_key') return '   '
      if (kind === 'openai_compat_api_key') return 'compat-secret'
      return null
    })

    const presence = await loadProviderApiKeyPresence()

    expect(presence).toEqual({
      openai: true,
      anthropic: false,
      gemini: false,
      openai_compat: true
    })
    expect(Object.values(presence)).toEqual([true, false, false, true])
  })

  it('clears provider keys using delete, not empty secret writes', async () => {
    const { clearProviderApiKey } = await import('../../src/composables/ai/provider-settings')

    await clearProviderApiKey('openai_compat')

    expect(mocks.aiSecretsDelete).toHaveBeenCalledTimes(1)
    expect(mocks.aiSecretsDelete).toHaveBeenCalledWith('openai_compat_api_key')
    expect(mocks.aiSecretsSet).not.toHaveBeenCalled()
  })
})
