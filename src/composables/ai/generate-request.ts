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

function retryErrorDetails(err: unknown): Error | null {
  if (typeof err !== 'object' || err === null) return null
  const value = err as { statusCode?: unknown; status?: unknown; responseBody?: unknown; data?: unknown }
  const status = typeof value.statusCode === 'number' ? value.statusCode : typeof value.status === 'number' ? value.status : null
  const candidates = [value.responseBody, value.data]
  for (const candidate of candidates) {
    let message = ''
    if (typeof candidate === 'string') {
      try {
        const parsed = JSON.parse(candidate)
        message = errorMessage(parsed?.error ?? parsed)
      } catch {
        message = candidate
      }
    } else {
      message = errorMessage(candidate)
    }
    message = message.replace(/\s+/g, ' ').trim()
    if (message) return Object.assign(new Error(message), status === null ? {} : { status })
  }
  if (status !== null) return Object.assign(new Error(`The AI provider returned ${status}. Check its key and quota in Settings.`), { status })
  return null
}

export function normalizeGenerateRequestError(err: unknown): unknown {
  if (err instanceof GenerateTextRequestFormatError) return err

  const retryWrapper = err
  err = nestedAiError(err)
  if (errorMessage(err).trim().length === 0 || errorMessage(retryWrapper).includes('Last error:')) {
    err = retryErrorDetails(err) ?? retryErrorDetails(retryWrapper) ?? err
  }

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
