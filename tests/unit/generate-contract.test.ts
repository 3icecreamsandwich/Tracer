import { describe, expect, it } from 'vitest'
import {
  parseGenerateContractOutput,
  GenerateContractParseError
} from '../../src/composables/ai/generate-contract'

describe('parseGenerateContractOutput', () => {
  it('preserves nested code examples and all content after them', () => {
    const guide = '# Java\n```java\nSystem.out.println("Hi");\n```\n## Summary\nKeep this too.'
    expect(parseGenerateContractOutput(`\`\`\`study_guide_md\n${guide}\n\`\`\`\n\`\`\`flashcards_tsv\na\tb\n\`\`\``).studyGuideMarkdown).toBe(guide)
  })

  it('rejects a truncated guide even when the flashcard block is complete', () => {
    expect(() => parseGenerateContractOutput('```study_guide_md\n# Guide\n```flashcards_tsv\na\tb\n```')).toThrow('Missing closing fence')
  })

  it('does not mistake an inner closing fence for a missing outer guide boundary', () => {
    expect(() => parseGenerateContractOutput('```study_guide_md\n# Java\n```java\ncode\n```\nStill writing\n```flashcards_tsv\na\tb\n```')).toThrow('Missing closing fence')
  })
  it('extracts study guide markdown and flashcards tsv blocks', () => {
    const raw = [
      '```study_guide_md',
      '# Guide',
      '- a',
      '```',
      '',
      '```flashcards_tsv',
      'term\tdef',
      '```'
    ].join('\n')

    expect(parseGenerateContractOutput(raw)).toEqual({
      studyGuideMarkdown: ['# Guide', '- a'].join('\n'),
      flashcardsTsv: 'term\tdef'
    })
  })

  it('rejects missing blocks', () => {
    expect(() => parseGenerateContractOutput('nope')).toThrow(GenerateContractParseError)
    expect(() => parseGenerateContractOutput('nope')).toThrow('Missing fenced block')
  })

  it('rejects empty fenced blocks', () => {
    const raw = ['```study_guide_md', '', '```', '```flashcards_tsv', 'a\tb', '```'].join('\n')
    expect(() => parseGenerateContractOutput(raw)).toThrow(GenerateContractParseError)
    expect(() => parseGenerateContractOutput(raw)).toThrow('Empty fenced block: study_guide_md')
  })

  it('accepts common markdown and tsv fence names', () => {
    const raw = ['```markdown', '# Guide', '```', '```tsv', 'a\tb', '```'].join('\n')

    expect(parseGenerateContractOutput(raw)).toEqual({
      studyGuideMarkdown: '# Guide',
      flashcardsTsv: 'a\tb'
    })
  })
})
