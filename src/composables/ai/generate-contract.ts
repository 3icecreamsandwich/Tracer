export class GenerateContractParseError extends Error {
  name = 'GenerateContractParseError'
}

function indexOfFencedStart(haystack: string, fenceName: string): number {
  return new RegExp(`^\`{3,}${fenceName}[ \\t]*\\r?$`, 'im').exec(haystack)?.index ?? -1
}

function extractFencedBlock(text: string, fenceName: string): string {
  const startIdx = indexOfFencedStart(text, fenceName)
  if (startIdx < 0) {
    throw new GenerateContractParseError(`Missing fenced block: ${fenceName}`)
  }

  const headerLineEnd = text.indexOf('\n', startIdx)
  if (headerLineEnd < 0) {
    throw new GenerateContractParseError(`Missing newline after fenced block start: ${fenceName}`)
  }

  const contentStart = headerLineEnd + 1
  // A guide can contain code fences. Its outer boundary is the last
  // standalone fence before the flashcard contract block.
  const remainder = text.slice(contentStart)
  const nextBlock = /^(?:`{3,})(?:flashcards_tsv|tsv|csv)\s*$/im.exec(remainder)
  const segment = fenceName === 'study_guide_md' || fenceName === 'markdown' || fenceName === 'md'
    ? remainder.slice(0, nextBlock?.index ?? remainder.length)
    : remainder
  const closing = [...segment.matchAll(/^`{3,}[ \t]*\r?$/gm)].at(-1)
  if (!closing || segment.slice(closing.index + closing[0].length).trim()) {
    throw new GenerateContractParseError(`Missing closing fence: ${fenceName}`)
  }

  const body = segment.slice(0, closing.index).split('\r').join('').trim()
  if (!body) {
    throw new GenerateContractParseError(`Empty fenced block: ${fenceName}`)
  }
  return body
}

function extractFirstFencedBlock(text: string, fenceNames: string[]): string {
  const errors: string[] = []
  for (const name of fenceNames) {
    try {
      return extractFencedBlock(text, name)
    } catch (err) {
      if (err instanceof Error) errors.push(err.message)
    }
  }
  throw new GenerateContractParseError(errors[0] ?? `Missing fenced block: ${fenceNames[0]}`)
}

export function parseGenerateContractOutput(raw: string): {
  studyGuideMarkdown: string
  flashcardsTsv: string
} {
  if (typeof raw !== 'string') {
    throw new GenerateContractParseError('Output must be a string')
  }
  const text = raw.trim()
  if (!text) {
    throw new GenerateContractParseError('Output was empty')
  }

  const studyGuideMarkdown = extractFirstFencedBlock(text, ['study_guide_md', 'markdown', 'md'])
  const flashcardsTsv = extractFirstFencedBlock(text, ['flashcards_tsv', 'tsv', 'csv'])

  return { studyGuideMarkdown, flashcardsTsv }
}
