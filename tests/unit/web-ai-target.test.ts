import { describe, expect, it } from 'vitest'
import { resolveWebAiTarget } from '../../src/composables/platform/ai-target'

describe('web AI proxy destinations', () => {
  it('allows only the provider operations Tracer uses', () => {
    expect(resolveWebAiTarget('https://api.openai.com/v1/responses', 'POST')?.provider).toBe('openai')
    expect(resolveWebAiTarget('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse', 'POST')?.provider).toBe('gemini')
    expect(resolveWebAiTarget('https://models.github.ai/catalog/models', 'GET')?.provider).toBe('github')
  })
  it.each([
    'http://api.openai.com/v1/responses',
    'https://api.openai.com.evil.example/v1/responses',
    'https://api.openai.com@evil.example/v1/responses',
    'https://api.openai.com/v1/files',
    'https://api.openai.com:8443/v1/responses',
    'http://127.0.0.1:11434/api/chat',
    'https://169.254.169.254/latest/meta-data',
  ])('rejects unauthorized URLs: %s', (url) => expect(resolveWebAiTarget(url, 'POST')).toBeNull())
  it('requires administrator configuration for compatible APIs', () => {
    const url = 'https://models.example.com/v1/chat/completions'
    expect(resolveWebAiTarget(url, 'POST')).toBeNull()
    expect(resolveWebAiTarget(url, 'POST', 'https://models.example.com')?.provider).toBe('openai_compat')
    expect(resolveWebAiTarget(url, 'DELETE', 'https://models.example.com')).toBeNull()
  })
})
