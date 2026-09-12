export class BodyTooLarge extends Error {}

/** Bound bytes before any adapter buffers or parses a request. */
export async function readBoundedBody(stream: ReadableStream<Uint8Array> | null, limit: number): Promise<Uint8Array> {
  const reader = stream?.getReader()
  if (!reader) return new Uint8Array()
  const chunks: Uint8Array[] = []
  let length = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > limit) { await reader.cancel(); throw new BodyTooLarge('Request too large.') }
      chunks.push(value)
    }
  } finally { reader.releaseLock() }
  const bytes = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  return bytes
}
