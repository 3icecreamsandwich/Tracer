import type { LanguageModelV4, LanguageModelV4CallOptions, LanguageModelV4StreamPart } from '@ai-sdk/provider'
import { AiRegistryError, AiVaultLockedError } from '../errors'
import { errorStatus, isFetchOfflineError, isNetworkTransportError } from '../ux-errors/predicates'

export class EmptyAiResponseError extends Error {
  constructor() {
    super('The AI model returned no answer. Try again or choose another model in Settings.')
    this.name = 'EmptyAiResponseError'
  }
}

export class InterruptedAiResponseError extends Error {
  constructor() {
    super('The AI provider interrupted the response. Try again or choose another model in Settings.')
    this.name = 'InterruptedAiResponseError'
  }
}

function assertNotFiltered(reason: string) {
  if (reason === 'content-filter') throw new Error('The AI provider could not answer this request because it was filtered.')
}

function shouldTryFallback(error: unknown): boolean {
  if (isFetchOfflineError(error) || error instanceof AiVaultLockedError) return false
  if (error instanceof AiRegistryError) {
    return ['missing_credential', 'missing_provider_config', 'unknown_model', 'unknown_provider'].includes(error.code)
  }
  if (error instanceof Error && error.name === 'AbortError') return false
  const status = errorStatus(error)
  if (status !== null) return [401, 403, 404, 408, 429].includes(status) || status >= 500
  if (error instanceof EmptyAiResponseError || error instanceof InterruptedAiResponseError || isNetworkTransportError(error)) return true
  const message = error instanceof Error ? error.message.toLowerCase() : ''
  return message.includes('timeout') || message.includes('timed out') || message.includes('temporarily unavailable')
}

// Race as well as abort: not all provider implementations honor AbortSignal.
function abortable<T>(operation: PromiseLike<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason ?? new DOMException('Request cancelled', 'AbortError'))
    if (signal.aborted) { abort(); return }
    signal.addEventListener('abort', abort, { once: true })
    Promise.resolve(operation).then(resolve, reject).finally(() => signal.removeEventListener('abort', abort))
  })
}

export function createRoutedModel(
  modelIds: readonly string[],
  resolve: (id: string) => Promise<LanguageModelV4>,
  timeouts = { totalMs: 180_000, firstTextMs: 45_000, idleMs: 45_000 },
): LanguageModelV4 {
  const route = [...new Set(modelIds.map(id => id.trim()).filter(Boolean))]
  if (!route.length) throw new AiRegistryError('invalid_model_id', 'At least one AI model is required.')

  function requestSignal(options: LanguageModelV4CallOptions) {
    return AbortSignal.any([...(options.abortSignal ? [options.abortSignal] : []), AbortSignal.timeout(timeouts.totalMs)])
  }

  return {
    specificationVersion: 'v4', provider: 'tracer.route', modelId: route.join(' -> '), supportedUrls: {},
    async doGenerate(options) {
      const signal = requestSignal(options)
      for (let index = 0; index < route.length; index++) {
        try {
          signal.throwIfAborted()
          const model = await abortable(resolve(route[index]!), signal)
          const result = await abortable(model.doGenerate({ ...options, abortSignal: signal }), signal)
          assertNotFiltered(result.finishReason.unified)
          if ((result.finishReason.unified === 'error' || result.finishReason.raw === 'error')) throw new InterruptedAiResponseError()
          if (!result.content.some(part => (part.type === 'text' && part.text.trim()) || part.type === 'tool-call')) {
            throw new EmptyAiResponseError()
          }
          return result
        } catch (error) {
          if (signal.aborted || index === route.length - 1 || !shouldTryFallback(error)) throw error
        }
      }
      throw new EmptyAiResponseError()
    },
    async doStream(options) {
      const cancelled = new AbortController()
      const signal = AbortSignal.any([requestSignal(options), cancelled.signal])
      const iterator = streamRoute(options, signal)
      return { stream: new ReadableStream<LanguageModelV4StreamPart>({
        async pull(controller) {
          try {
            const next = await iterator.next()
            if (next.done) controller.close()
            else controller.enqueue(next.value)
          } catch (error) {
            controller.enqueue({ type: 'error', error })
            controller.close()
          }
        },
        async cancel() {
          cancelled.abort(new DOMException('Request cancelled', 'AbortError'))
          await iterator.return()
        },
      }) }
    },
  }

  async function* streamRoute(options: LanguageModelV4CallOptions, signal: AbortSignal): AsyncGenerator<LanguageModelV4StreamPart, void> {
    for (let index = 0; index < route.length; index++) {
      let reader: ReadableStreamDefaultReader<LanguageModelV4StreamPart> | undefined
      const attempt = new AbortController()
      const attemptSignal = AbortSignal.any([signal, attempt.signal])
      let committed = false
      let finished = false
      const pending: LanguageModelV4StreamPart[] = []
      // Reasoning/metadata chunks must not keep an answerless request alive forever.
      const firstText = AbortSignal.timeout(timeouts.firstTextMs)
      try {
        signal.throwIfAborted()
        const model = await abortable(resolve(route[index]!), AbortSignal.any([attemptSignal, firstText]))
        const opened = await abortable(model.doStream({ ...options, abortSignal: attemptSignal }), AbortSignal.any([attemptSignal, firstText]))
        reader = opened.stream.getReader()
        while (true) {
          const readSignal = AbortSignal.any([attemptSignal, committed ? AbortSignal.timeout(timeouts.idleMs) : firstText])
          const next = await abortable(reader.read(), readSignal)
          if (next.done) {
            if (!committed) throw new EmptyAiResponseError()
            if (!finished) throw new InterruptedAiResponseError()
            return
          }
          const part = next.value
          if (part.type === 'error') throw part.error
          if (part.type === 'finish') {
            assertNotFiltered(part.finishReason.unified)
            if ((part.finishReason.unified === 'error' || part.finishReason.raw === 'error')) throw new InterruptedAiResponseError()
            finished = true
          }
          if (!committed) {
            pending.push(part)
            if (!((part.type === 'text-delta' && part.delta.trim()) || part.type === 'tool-call')) continue
            committed = true
            yield* pending
            pending.length = 0
          } else yield part
        }
      } catch (error) {
        // Never splice a different model's answer into a partially delivered reply.
        if (signal.aborted || committed || index === route.length - 1 || !shouldTryFallback(error)) throw error
      } finally {
        attempt.abort()
        void reader?.cancel().catch(() => {})
      }
    }
  }
}
