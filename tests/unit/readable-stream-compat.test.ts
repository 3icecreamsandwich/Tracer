import { describe, expect, it } from 'vitest'

import { ensureReadableStreamValues } from '../../src/composables/platform/readable-stream'

describe('ReadableStream compatibility', () => {
  it('polyfills values for WebKit-compatible PDF and AI streams', async () => {
    const proto = ReadableStream.prototype as any
    const valuesDescriptor = Object.getOwnPropertyDescriptor(proto, 'values')
    const iteratorDescriptor = Object.getOwnPropertyDescriptor(proto, Symbol.asyncIterator)

    try {
      delete proto.values
      delete proto[Symbol.asyncIterator]

      ensureReadableStreamValues()

      expect(typeof proto.values).toBe('function')
      expect(proto[Symbol.asyncIterator]).toBe(proto.values)

      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new Uint8Array([1, 2, 3]))
          controller.close()
        }
      })
      const chunks: number[][] = []
      for await (const chunk of (stream as any).values()) {
        chunks.push(Array.from(chunk))
      }

      expect(chunks).toEqual([[1, 2, 3]])
    } finally {
      if (valuesDescriptor) Object.defineProperty(proto, 'values', valuesDescriptor)
      else delete proto.values

      if (iteratorDescriptor) Object.defineProperty(proto, Symbol.asyncIterator, iteratorDescriptor)
      else delete proto[Symbol.asyncIterator]
    }
  })
})
