import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tauri-apps/api/core', () => {
  return {
    invoke: vi.fn(async () => null)
  }
})

vi.mock('../../src/composables/tauri', () => {
  return {
    hasTauriRuntime: () => true
  }
})

describe('AI credentials invoke payloads', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    delete process.env.VITE_TRACER_FORCE_WEB
  })

  it('passes nested args payload for ai_openai_compat_set_config', async () => {
    const { aiOpenAiCompatSetConfig } = await import('../../src/composables/ai/credentials')
    const { invoke } = await import('@tauri-apps/api/core')
    const invokeMock = vi.mocked(invoke)
    invokeMock.mockResolvedValue(null as any)

    await aiOpenAiCompatSetConfig({ baseURL: ' https://example.com/v1 ', modelId: '  model-x  ' })

    expect(invokeMock).toHaveBeenCalledWith('ai_openai_compat_set_config', {
      args: {
        configJson: JSON.stringify({ baseURL: 'https://example.com/v1', modelId: 'model-x' })
      }
    })
  })

  it('normalizes provider key presence to booleans', async () => {
    const { aiProviderApiKeyPresence } = await import('../../src/composables/ai/credentials')
    const { invoke } = await import('@tauri-apps/api/core')
    const invokeMock = vi.mocked(invoke)
    invokeMock.mockResolvedValue({
      openai: true,
      anthropic: 'sk-secret',
      gemini: 1,
      openai_compat: false,
      extra: 'secret'
    } as any)

    const presence = await aiProviderApiKeyPresence()

    expect(invokeMock).toHaveBeenCalledWith('ai_provider_api_key_presence')
    expect(presence).toEqual({
      openai: true,
      anthropic: false,
      gemini: false,
      openai_compat: false
    })
    expect(Object.values(presence)).toEqual([true, false, false, false])
  })

  it('skips batched provider save when drafts are blank and config is unchanged', async () => {
    const { aiProviderSettingsSave } = await import('../../src/composables/ai/credentials')
    const { invoke } = await import('@tauri-apps/api/core')
    const invokeMock = vi.mocked(invoke)

    const result = await aiProviderSettingsSave({
      apiKeys: {
        openai: '',
        anthropic: '   ',
        gemini: undefined,
        openai_compat: '\n\t'
      }
    })

    expect(result).toEqual({ savedApiKeyIds: [], savedOpenAiCompatConfig: false })
    expect(invokeMock).not.toHaveBeenCalled()
  })

  it('sends non-empty provider drafts in one batched save payload', async () => {
    const { aiProviderSettingsSave } = await import('../../src/composables/ai/credentials')
    const { invoke } = await import('@tauri-apps/api/core')
    const invokeMock = vi.mocked(invoke)
    invokeMock.mockResolvedValue({
      savedApiKeyIds: ['openai', 'not-a-provider', 'gemini'],
      savedOpenAiCompatConfig: true
    } as any)

    const result = await aiProviderSettingsSave({
      apiKeys: {
        openai: ' sk-openai ',
        anthropic: '',
        gemini: ' AIza-test\n'
      },
      openAiCompatConfig: {
        baseURL: ' https://example.com/v1 ',
        modelId: ' model-x '
      }
    })

    expect(invokeMock).toHaveBeenCalledTimes(1)
    expect(invokeMock).toHaveBeenCalledWith('ai_provider_settings_save', {
      args: {
        apiKeys: {
          openai: 'sk-openai',
          gemini: 'AIza-test'
        },
        openAiCompatConfigJson: JSON.stringify({
          baseURL: 'https://example.com/v1',
          modelId: 'model-x'
        })
      }
    })
    expect(result).toEqual({
      savedApiKeyIds: ['openai', 'gemini'],
      savedOpenAiCompatConfig: true
    })
  })
})
