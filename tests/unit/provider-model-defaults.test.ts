import { describe, expect, it } from 'vitest'

import {
  addProviderDefaultsToModelRoute,
  providerDefaultModelId,
} from '../../src/composables/ai/provider-model-defaults'

describe('provider model defaults', () => {
  it('uses the recommended catalog model for each built-in API-key provider', () => {
    expect(providerDefaultModelId('openai')).toBe('openai:gpt-5.6-terra')
    expect(providerDefaultModelId('anthropic')).toBe('anthropic:claude-haiku-4-5-20251001')
    expect(providerDefaultModelId('gemini')).toBe('gemini:gemini-3.7-flash')
    expect(providerDefaultModelId('ollama_cloud')).toBe('ollama_cloud:gpt-oss:20b')
  })

  it('uses the configured model for OpenAI-compatible providers', () => {
    expect(providerDefaultModelId('openai_compat', { openAiCompatModelId: ' model-x ' }))
      .toBe('openai_compat:model-x')
    expect(providerDefaultModelId('openai_compat')).toBeNull()
  })

  it('makes the first provider the default when the route is empty', () => {
    expect(addProviderDefaultsToModelRoute([], ['openai', 'gemini'])).toEqual([
      'openai:gpt-5.6-terra',
      'gemini:gemini-3.7-flash',
    ])
  })

  it('appends missing provider defaults without reordering or duplicating the route', () => {
    expect(addProviderDefaultsToModelRoute(
      ['anthropic:claude-sonnet-5', 'openai:gpt-5.6-terra'],
      ['openai', 'gemini', 'gemini'],
    )).toEqual([
      'anthropic:claude-sonnet-5',
      'openai:gpt-5.6-terra',
      'gemini:gemini-3.7-flash',
    ])
  })
})
