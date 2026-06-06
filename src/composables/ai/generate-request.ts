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

export function normalizeGenerateRequestError(err: unknown): unknown {
  if (err instanceof GenerateTextRequestFormatError) return err

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
