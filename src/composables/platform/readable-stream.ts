type ReadableStreamValuesOptions = {
  preventCancel?: boolean
}

type ReadableStreamWithValues<T = unknown> = ReadableStream<T> & {
  values?: (options?: ReadableStreamValuesOptions) => AsyncIterableIterator<T>
  [Symbol.asyncIterator]?: (options?: ReadableStreamValuesOptions) => AsyncIterableIterator<T>
}

export function ensureReadableStreamValues() {
  const proto = globalThis.ReadableStream?.prototype as ReadableStreamWithValues | undefined
  if (!proto) return

  if (typeof proto.values !== 'function') {
    Object.defineProperty(proto, 'values', {
      configurable: true,
      writable: true,
      value: async function* values<T>(
        this: ReadableStream<T>,
        options?: ReadableStreamValuesOptions
      ): AsyncIterableIterator<T> {
        const reader = this.getReader()
        let completed = false
        try {
          for (;;) {
            const result = await reader.read()
            if (result.done) {
              completed = true
              return
            }
            yield result.value
          }
        } finally {
          try {
            if (!completed && !options?.preventCancel) {
              await reader.cancel()
            }
          } finally {
            reader.releaseLock()
          }
        }
      }
    })
  }

  if (typeof proto[Symbol.asyncIterator] !== 'function') {
    Object.defineProperty(proto, Symbol.asyncIterator, {
      configurable: true,
      writable: true,
      value: proto.values
    })
  }
}
