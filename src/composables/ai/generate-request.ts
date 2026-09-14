export { assertGenerateSourceLimits, buildGenerateTextPrompt } from '../generate/source-extraction'

export class GenerateTextRequestFormatError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GenerateTextRequestFormatError'
  }
}

function errorMessage(err: unknown): string {
  if (typeof err === 'string') return err
  if (err instanceof Error) return err.message
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const message = (err as { message?: unknown }).message
    if (typeof message === 'string') return message
  }
  return ''
}

function nestedAiError(err: unknown): unknown {
  let current = err
  const visited = new Set<unknown>()
  for (let depth = 0; depth < 4 && typeof current === 'object' && current !== null; depth += 1) {
    if (visited.has(current)) break
    visited.add(current)
    const value = current as { lastError?: unknown; cause?: unknown }
    const next = value.lastError ?? value.cause
    if (!next) break
    const currentMessage = errorMessage(current).trim()
    const nextMessage = errorMessage(next).trim()
    if (nextMessage && (!currentMessage || currentMessage.includes('Last error:'))) current = next
    else break
  }
  return current
}

export function normalizeGenerateRequestError(err: unknown): unknown {
  if (err instanceof GenerateTextRequestFormatError) return err

  err = nestedAiError(err)

  const message = errorMessage(err).toLowerCase()
  if (
    message.includes('invalid message format') ||
    message.includes('unsupported functionality') ||
    message.includes('file part') ||
    message.includes('media type')
  ) {
    return new GenerateTextRequestFormatError(
      'Tracer parsed the uploaded files into text before sending the Generate request, but the AI provider rejected the text-only message format unexpectedly. Check the selected provider/model and try again.'
    )
  }

  return err
}
