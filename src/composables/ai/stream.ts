import { EmptyAiResponseError } from './registry/route'

export async function* checkedAiText(
  stream: AsyncIterable<{ type: string; text?: string; error?: unknown }>,
  signal?: AbortSignal,
): AsyncGenerator<string> {
  let hasText = false
  for await (const part of stream) {
    signal?.throwIfAborted()
    if (part.type === 'error') throw part.error
    if (part.type === 'abort') throw new DOMException('Request cancelled', 'AbortError')
    if (part.type === 'text-delta' && part.text) {
      hasText ||= part.text.trim().length > 0
      yield part.text
    }
  }
  signal?.throwIfAborted()
  if (!hasText) throw new EmptyAiResponseError()
}

