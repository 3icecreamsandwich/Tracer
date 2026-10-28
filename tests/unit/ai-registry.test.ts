import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  aiSecretsGet: vi.fn(async () => null as string | null),
  aiSecretsSet: vi.fn(async () => undefined),
  aiOpenAiCompatGetConfig: vi.fn(async () => null),
  aiHttpFetch: vi.fn()
}))

vi.mock('../../src/composables/ai/credentials', () => {
  return {
    aiSecretsGet: mocks.aiSecretsGet,
    aiSecretsSet: mocks.aiSecretsSet,
    aiOpenAiCompatGetConfig: mocks.aiOpenAiCompatGetConfig,
    VaultSecretError: class VaultSecretError extends Error {
      readonly code: string
      constructor(code: string, message: string) {
        super(message)
        this.code = code
      }
    }
  }
})

vi.mock('../../src/composables/ai/http', () => ({
  aiHttpFetch: mocks.aiHttpFetch
}))

import { markInvalidIfUnauthorized } from '../../src/composables/ai/registry/requirements'
import { resolveAiModel } from '../../src/composables/ai/registry'
import { AiRegistryError, MissingAiCredentialError } from '../../src/composables/ai/errors'
import { streamGroundedChatText } from '../../src/composables/ai/chat'

describe('ai registry', () => {
  beforeEach(() => {
    delete process.env.TRACER_TEST_MODE
    delete process.env.TRACER_LIVE_AI
    mocks.aiSecretsGet.mockReset()
    mocks.aiSecretsGet.mockResolvedValue(null)
    mocks.aiSecretsSet.mockReset()
    mocks.aiSecretsSet.mockResolvedValue(undefined)
    mocks.aiOpenAiCompatGetConfig.mockReset()
    mocks.aiOpenAiCompatGetConfig.mockResolvedValue(null)
    mocks.aiHttpFetch.mockReset()
  })

  it('rejects invalid qualified model ids', async () => {
    await expect(resolveAiModel('nope')).rejects.toBeInstanceOf(AiRegistryError)
    await expect(resolveAiModel('nope')).rejects.toMatchObject({ code: 'invalid_model_id' })
  })

  it('rejects unknown provider ids', async () => {
    await expect(resolveAiModel('wat:model')).rejects.toBeInstanceOf(AiRegistryError)
    await expect(resolveAiModel('wat:model')).rejects.toMatchObject({ code: 'invalid_model_id' })
  })

  it('returns missing credential error when secret absent', async () => {
    await expect(resolveAiModel('openai:gpt-5.6-terra')).rejects.toBeInstanceOf(MissingAiCredentialError)
    await expect(resolveAiModel('openai:gpt-5.6-terra')).rejects.toMatchObject({
      code: 'missing_credential',
      providerId: 'openai',
      credentialKind: 'openai_api_key'
    })
  })

  it('sends GitHub Models chat requests to the inference endpoint', async () => {
    let requestUrl = ''
    mocks.aiSecretsGet.mockImplementation(async (kind: string) => {
      if (kind === 'github_models_token') return 'github-token'
      return null
    })
    mocks.aiHttpFetch.mockImplementation(async (input: RequestInfo | URL) => {
      requestUrl = String(input)
      return new Response(
        JSON.stringify({
          id: 'chatcmpl-test',
          object: 'chat.completion',
          created: 0,
          model: 'openai/gpt-4o-mini',
          choices: [
            {
              index: 0,
              message: { role: 'assistant', content: 'ok' },
              finish_reason: 'stop'
            }
          ]
        }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      )
    })

    const model: any = await resolveAiModel('github:openai/gpt-4o-mini')
    await model.doGenerate({
      prompt: [{ role: 'user', content: [{ type: 'text', text: 'hello' }] }]
    })

    expect(requestUrl).toBe('https://models.github.ai/inference/chat/completions')
  })

  it('falls back when the primary model is missing credentials', async () => {
    mocks.aiSecretsGet.mockImplementation(async (kind: string) => {
      if (kind === 'github_models_token') return 'github-token'
      return null
    })
    mocks.aiHttpFetch.mockResolvedValue(new Response(
      JSON.stringify({
        id: 'chatcmpl-fallback',
        object: 'chat.completion',
        created: 0,
        model: 'openai/gpt-4o-mini',
        choices: [{ index: 0, message: { role: 'assistant', content: 'fallback' }, finish_reason: 'stop' }]
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    ))

    const model: any = await resolveAiModel([
      'openai:gpt-5.6-terra',
      'github:openai/gpt-4o-mini'
    ])
    const result = await model.doGenerate({
      prompt: [{ role: 'user', content: [{ type: 'text', text: 'hello' }] }]
    })

    expect(result.content).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'text', text: 'fallback' })
    ]))
  })

  it('routes the installed v4 Ollama provider and consumes its real NDJSON protocol', async () => {
    mocks.aiSecretsGet.mockResolvedValue('fixture-key')
    mocks.aiHttpFetch.mockResolvedValue(new Response(JSON.stringify({
      model: 'gpt-oss:20b', created_at: '2026-01-01T00:00:00Z',
      message: { role: 'assistant', content: 'Ollama v4 answer' }, done: true, done_reason: 'stop',
    }) + '\n', { headers: { 'content-type': 'application/x-ndjson' } }))
    const result = await streamGroundedChatText({ model: await resolveAiModel(['ollama_cloud:gpt-oss:20b']), system: 'Reply briefly', messages: [{ role: 'user', content: 'hello' }] })
    let text = ''
    for await (const chunk of result.textStream) text += chunk
    expect(text).toBe('Ollama v4 answer')
    expect(String(mocks.aiHttpFetch.mock.calls[0]?.[0])).toBe('https://ollama.com/api/chat')
  })

  it.each(['error', 'truncated', 'malformed'])('surfaces an Ollama %s stream after partial text', async ending => {
    mocks.aiSecretsGet.mockResolvedValue('fixture-key')
    mocks.aiHttpFetch.mockResolvedValue(new Response(JSON.stringify({
      model: 'gpt-oss:20b', created_at: '2026-01-01T00:00:00Z',
      message: { role: 'assistant', content: 'Partial answer' }, done: false,
    }) + '\n' + (ending === 'error' ? JSON.stringify({ error: 'network connection lost' }) : ending === 'malformed' ? '{broken' : '') + '\n', { headers: { 'content-type': 'application/x-ndjson' } }))
    const result = await streamGroundedChatText({ model: await resolveAiModel(['ollama_cloud:gpt-oss:20b']), system: 'Reply briefly', messages: [{ role: 'user', content: 'hello' }] })
    let text = ''
    await expect((async () => { for await (const chunk of result.textStream) text += chunk })()).rejects.toThrow('interrupted')
    expect(text).toBe('Partial answer')
    expect(mocks.aiHttpFetch).toHaveBeenCalledTimes(1)
  })

  it('keeps a GitHub credential on permission errors but clears an unauthorized token', async () => {
    await markInvalidIfUnauthorized('github', { statusCode: 403 })
    expect(mocks.aiSecretsSet).not.toHaveBeenCalled()
    await markInvalidIfUnauthorized('github', { cause: { statusCode: 401 } })
    expect(mocks.aiSecretsSet).toHaveBeenCalledExactlyOnceWith('github_models_token', '')
  })

})
