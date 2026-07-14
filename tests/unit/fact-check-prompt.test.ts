import { describe, expect, it } from 'vitest'

import {
  buildFactCheckSystemPrompt,
  buildFactCheckUserPrompt,
  factCheckNoSuggestionsText
} from '../../src/composables/ai/fact-check'

describe('fact-check prompt', () => {
  it('requires the exact Markdown suggestion format and conservative safety rules', () => {
    const prompt = buildFactCheckSystemPrompt('en')

    expect(prompt).toContain('**(Card <card-number>)** **term:** <actual term>: <suggestion>')
    expect(prompt).toContain('explicitly wrong or materially nuanced')
    expect(prompt).toContain('completely sure')
    expect(prompt).toContain('physically or mentally harm')
    expect(prompt).toContain('Respond only in English')
    expect(prompt).toContain(factCheckNoSuggestionsText('en'))
  })

  it('serializes the current text fields with stable card numbers and no images', () => {
    const prompt = buildFactCheckUserPrompt(
      {
        title: ' Biology ',
        description: ' Cells ',
        cards: [
          { front: 'Cell', back: 'Basic\nunit of life' },
          { front: 'DNA', back: 'C\tG' }
        ]
      },
      'en'
    )

    expect(prompt).toContain('Set title: Biology')
    expect(prompt).toContain('Set description: Cells')
    expect(prompt).toContain('1\tCell\tBasic\\nunit of life')
    expect(prompt).toContain('2\tDNA\tC G')
    expect(prompt).not.toContain('data:image')
  })

  it('uses the configured app language for instructions and fallback text', () => {
    const prompt = buildFactCheckSystemPrompt('ar')

    expect(prompt).toContain('أجب بالعربية فقط')
    expect(prompt).toContain(factCheckNoSuggestionsText('ar'))
    expect(factCheckNoSuggestionsText('ja')).toBe('修正の提案はありません。')
  })
})
