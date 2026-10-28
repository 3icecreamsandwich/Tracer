import { afterEach, describe, expect, it, vi } from 'vitest'

import { ensureReadableStreamValues } from '../../src/composables/platform/readable-stream'

const NativeReadableStream = globalThis.ReadableStream
function webKitStreams() {
  class WebKitReadableStream<T> extends NativeReadableStream<T> {}
  // Bun's native methods can be non-configurable. Shadow them on an isolated
  // prototype to reproduce older WebKit without modifying runtime intrinsics.
  Object.defineProperty(WebKitReadableStream.prototype, 'values', { configurable: true, value: undefined })
  Object.defineProperty(WebKitReadableStream.prototype, Symbol.asyncIterator, { configurable: true, value: undefined })
  vi.stubGlobal('ReadableStream', WebKitReadableStream)
  ensureReadableStreamValues()
  return WebKitReadableStream
}

afterEach(() => vi.unstubAllGlobals())
describe('ReadableStream compatibility', () => {
  it('polyfills values for WebKit-compatible PDF and AI streams', async () => {
    const Streams = webKitStreams()
    const proto = Streams.prototype as any
    expect(typeof proto.values).toBe('function')
    expect(proto[Symbol.asyncIterator]).toBe(proto.values)
    const stream = new Streams<Uint8Array>({ start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]))
      controller.close()
    } })
    const chunks: number[][] = []
    for await (const chunk of (stream as any).values()) chunks.push(Array.from(chunk))
    expect(chunks).toEqual([[1, 2, 3]])
    expect(stream.locked).toBe(false)
  })

  it.each([false, true])('releases the reader on early exit with preventCancel=%s', async preventCancel => {
    const Streams = webKitStreams()
    const cancel = vi.fn()
    const stream = new Streams({ start(controller) { controller.enqueue('partial') }, cancel })
    for await (const chunk of (stream as any).values({ preventCancel })) {
      expect(chunk).toBe('partial')
      break
    }
    expect(cancel).toHaveBeenCalledTimes(preventCancel ? 0 : 1)
    expect(stream.locked).toBe(false)
  })

  it('keeps native streaming methods when they are already available', () => {
    const values = ReadableStream.prototype.values
    const iterator = ReadableStream.prototype[Symbol.asyncIterator]
    ensureReadableStreamValues()
    expect(ReadableStream.prototype.values).toBe(values)
    expect(ReadableStream.prototype[Symbol.asyncIterator]).toBe(iterator)
  })
})
