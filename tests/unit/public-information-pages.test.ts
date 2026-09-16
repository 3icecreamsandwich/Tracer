import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (path: string) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8')

describe('public information pages', () => {
  it('keeps the required policy and accessibility links in the web footer', () => {
    const footer = read('../../components/PublicFooter.vue')
    expect(footer).toContain('to="/privacy"')
    expect(footer).toContain('to="/terms"')
    expect(footer).toContain('to="/accessibility"')
    expect(footer).toContain('to="/contact#accessibility-feedback"')
  })

  it('documents actual account, content, provider, deletion, and age behavior', () => {
    const privacy = read('../../pages/privacy.vue')
    for (const text of [
      'display name, username, email address',
      'files and images you attach',
      'OpenAI, Anthropic, Google Gemini, GitHub Models, Ollama Cloud',
      'Supabase',
      'Cloudflare',
      'publisher identity is replaced with',
      'people age 13 and older',
      'jurisdiction-specific legal review',
    ]) expect(privacy).toContain(text)
  })
})
