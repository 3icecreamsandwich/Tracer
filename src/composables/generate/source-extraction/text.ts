export function normalizeExtractedText(text: string) {
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t\f\v]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function isMeaningfulExtractedText(text: string) {
  return normalizeExtractedText(text).replace(/\s+/g, '').length >= 8
}
