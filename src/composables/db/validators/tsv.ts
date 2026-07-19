import type { TermInput } from './terms'

export class TsvParseError extends Error {
  override name = 'TsvParseError'
}

type TermsDelimiter = 'tab' | 'comma' | 'pipe' | 'semicolon' | 'colon' | 'dash'

const DELIMITERS: TermsDelimiter[] = ['tab', 'comma', 'pipe', 'semicolon', 'colon', 'dash']

function cleanLine(line: string) {
  return line.split('\r').join('')
}

function stripBom(s: string) {
  return s.replace(/^\uFEFF/, '')
}

function normalizeGeneratedLine(raw: string) {
  return stripBom(raw)
    .trim()
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+[.)]\s+/, '')
}

function delimiterChar(delimiter: Exclude<TermsDelimiter, 'dash'>) {
  if (delimiter === 'tab') return '\t'
  if (delimiter === 'comma') return ','
  if (delimiter === 'pipe') return '|'
  if (delimiter === 'semicolon') return ';'
  return ':'
}

function isDashSeparatorAt(line: string, index: number) {
  const ch = line[index]
  if (ch !== '-' && ch !== '–' && ch !== '—') return false
  return /\s/.test(line[index - 1] ?? '') && /\s/.test(line[index + 1] ?? '')
}

function countDelimiterOutsideQuotes(line: string, delimiter: TermsDelimiter) {
  const sep = delimiter === 'dash' ? null : delimiterChar(delimiter)
  let count = 0
  let inQuotes = false
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (!inQuotes && delimiter === 'dash' && isDashSeparatorAt(line, i)) count += 1
    if (!inQuotes && sep && ch === sep) count += 1
  }
  return count
}

function detectDelimiter(lines: string[]): TermsDelimiter {
  let best: TermsDelimiter = 'tab'
  let bestScore = 0
  for (const delimiter of DELIMITERS) {
    let score = 0
    for (const line of lines) {
      score += countDelimiterOutsideQuotes(line, delimiter)
    }
    if (score > bestScore) {
      best = delimiter
      bestScore = score
    }
  }
  return best
}

function parseDelimitedLine(line: string, delimiter: TermsDelimiter, lineNumber: number) {
  const sep = delimiter === 'dash' ? null : delimiterChar(delimiter)
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (!inQuotes && delimiter === 'dash' && isDashSeparatorAt(line, i)) {
      fields.push(current.trim())
      current = ''
      continue
    }
    if (!inQuotes && sep && ch === sep) {
      fields.push(current.trim())
      current = ''
      continue
    }
    current += ch
  }

  if (inQuotes) {
    throw new TsvParseError(`line ${lineNumber} contains an unclosed quote`)
  }

  fields.push(current.trim())
  if (delimiter === 'pipe') {
    while (fields[0] === '') fields.shift()
    while (fields.at(-1) === '') fields.pop()
  }
  return fields
}

function looksLikeHeader(front: string, back: string) {
  const a = front.trim().toLowerCase()
  const b = back.trim().toLowerCase()
  return (a === 'term' || a === 'front') && (b === 'definition' || b === 'back')
}

function isMarkdownTableSeparator(line: string) {
  const parts = line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)

  return parts.length >= 2 && parts.every((part) => /^:?-{3,}:?$/.test(part))
}

function isLikelyGeneratedPreamble(line: string) {
  const text = line.trim().toLowerCase()
  if (!text) return true
  if (/^#{1,6}\s+/.test(text)) return true
  if (/^(generated\s+)?flashcards?\s*(\([^)]*\))?\s*:?\s*$/.test(text)) return true
  if (/^(sure[,.! ]+)?here\s+(are|is)\b/.test(text)) return true
  if (/^(sure[,.! ]+)?below\s+(are|is)\b/.test(text)) return true
  if (/^the following\b/.test(text)) return true
  return false
}

function parseDelimitedLineWithFallbacks(line: string, preferred: TermsDelimiter, lineNumber: number) {
  const candidates = [
    preferred,
    ...DELIMITERS.filter((delimiter) => delimiter !== preferred)
  ]

  for (const delimiter of candidates) {
    const fields = parseDelimitedLine(line, delimiter, lineNumber)
    if (fields.length >= 2) return fields
  }

  return [line]
}

export function parseTermsTsv(tsv: string): TermInput[] {
  if (typeof tsv !== 'string') throw new TsvParseError('tsv must be a string')

  const lines = cleanLine(tsv).split('\n')
  const terms: TermInput[] = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i] ?? ''
    const line = raw.trim()
    if (!line) continue

    const tabIndex = line.indexOf('\t')
    if (tabIndex < 0) {
      throw new TsvParseError(`line ${i + 1} must contain a tab separator`)
    }
    if (line.indexOf('\t', tabIndex + 1) !== -1) {
      throw new TsvParseError(`line ${i + 1} must contain exactly one tab separator`)
    }

    const front = line.slice(0, tabIndex)
    const back = line.slice(tabIndex + 1)

    terms.push({ front, back })
  }

  if (terms.length === 0) throw new TsvParseError('no terms found')
  return terms
}

export function parseTermsCsvLike(csv: string): TermInput[] {
  if (typeof csv !== 'string') throw new TsvParseError('csv must be a string')

  const lines = cleanLine(csv).split('\n')
  const terms: TermInput[] = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i] ?? ''
    const line = raw.trim()
    if (!line) continue

    const commaIndex = line.indexOf(',')
    if (commaIndex < 0) {
      throw new TsvParseError(`line ${i + 1} must contain a comma separator`)
    }

    const front = line.slice(0, commaIndex).trim()
    const back = line.slice(commaIndex + 1).trim()
    if (!front || !back) {
      throw new TsvParseError(`line ${i + 1} must contain term and definition`)
    }

    terms.push({ front, back })
  }

  if (terms.length === 0) throw new TsvParseError('no terms found')
  return terms
}

export function parseTermsDelimited(
  input: string,
  opts?: {
    delimiter?: TermsDelimiter | 'auto'
    skipHeader?: boolean
    allowContinuationLines?: boolean
  }
): TermInput[] {
  if (typeof input !== 'string') throw new TsvParseError('input must be a string')

  const lines = cleanLine(input)
    .split('\n')
    .map(normalizeGeneratedLine)
    .filter((line) => line && !line.startsWith('```'))

  const preferred =
    opts?.delimiter && opts.delimiter !== 'auto'
      ? opts.delimiter
      : detectDelimiter(lines)
  const skipHeader = opts?.skipHeader ?? true
  const terms: TermInput[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? ''
    const lineNumber = i + 1

    if (isMarkdownTableSeparator(line)) continue
    if (terms.length === 0 && isLikelyGeneratedPreamble(line)) continue

    const fields = parseDelimitedLineWithFallbacks(line, preferred, lineNumber)

    if (fields.length < 2) {
      const previous = terms.at(-1)
      if (opts?.allowContinuationLines && previous) {
        previous.back = `${previous.back}\n${line}`.trim()
        continue
      }
      throw new TsvParseError(`line ${lineNumber} must contain a comma or tab separator, Markdown table pipe, colon, semicolon, or spaced dash`)
    }

    const front = (fields[0] ?? '').trim()
    const back = (fields[1] ?? '').trim()

    if (skipHeader && terms.length === 0 && looksLikeHeader(front, back)) {
      continue
    }

    if (!front || !back) {
      throw new TsvParseError(`line ${lineNumber} must contain term and definition`)
    }

    terms.push({ front, back })
  }

  if (terms.length === 0) throw new TsvParseError('no terms found')
  return terms
}
