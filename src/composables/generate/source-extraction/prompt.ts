import type { ExtractedGenerateSource } from './types'

function escapeSourceMarkdown(text: string) {
  return text.replace(/```/g, "'''")
}

function sourceHeader(source: ExtractedGenerateSource) {
  const lines = [
    `## Source: ${source.filename}`,
    `Kind: ${source.kind === 'pdf' ? 'PDF' : 'Image'}`,
    `Extraction: ${source.method}`
  ]
  if (typeof source.pageCount === 'number') lines.push(`Page count: ${source.pageCount}`)
  if (source.method !== 'pdf-text') {
    lines.push('Extraction note: OCR text may contain recognition mistakes.')
  }
  return lines.join('\n')
}

export function buildGenerateTextPrompt(input: { instructions?: string; sources: ExtractedGenerateSource[] }) {
  const extra = input.instructions?.trim()
  const sourceSections = input.sources.map((source) => {
    return `${sourceHeader(source)}\n\n${escapeSourceMarkdown(source.text)}`
  })

  return [
    'You are creating study materials from extracted source text.',
    'Return EXACTLY two fenced code blocks and NOTHING else.',
    '',
    '1) A markdown study guide:',
    '```study_guide_md',
    '(markdown)',
    '```',
    '',
    '2) Flashcards as TSV with one card per line:',
    '```flashcards_tsv',
    'term<TAB>definition',
    '... (no header row)',
    '```',
    '',
    'Flashcards TSV rules:',
    '- Output TSV only inside the flashcards_tsv fence.',
    '- One card per line.',
    '- Each line must contain exactly ONE tab separator.',
    '- Do not include tabs inside term or definition (use spaces instead).',
    '- Do not include blank lines.',
    '- Do not include numbering or bullets.',
    '- If you need a line break inside a cell, use the literal sequence "\\n" (do not insert real newlines).',
    '- Do not include a header row.',
    '',
    extra ? `User instructions: ${extra}` : '',
    '',
    'Use the extracted source text below. Do not invent facts that are not supported by these sources.',
    '',
    sourceSections.join('\n\n---\n\n')
  ]
    .filter((line) => line.length > 0)
    .join('\n')
}
