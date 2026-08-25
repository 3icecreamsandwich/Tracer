import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { createOllama } from 'ollama-ai-provider-v2'
import type { LanguageModel } from 'ai'
import type { LanguageModelV3, LanguageModelV3CallOptions } from '@ai-sdk/provider'
import { AiRegistryError, AiVaultLockedError } from '../errors'
import { aiHttpFetch } from '../http'
import {
  type AiProviderId,
  isAiProviderId,
  parseQualifiedModelId
} from '../ids'
import { isTracerLiveAiEnabled, isTracerTestMode } from '../test-mode'
import { createTracerDeterministicTestModel } from '../test-stub-model'
import {
  ensureInCuratedCatalog,
  markInvalidIfUnauthorized,
  requireOpenAiCompatConfig,
  requireSecret
} from './requirements'

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2026-03-10'
}

function errorStatus(error: unknown): number | null {
  const value = error as any
  const status = value?.status ?? value?.response?.status ?? value?.cause?.status
  return typeof status === 'number' && Number.isFinite(status) ? status : null
}

function isOffline(): boolean {
  const navigator = (globalThis as any)?.navigator
  return typeof navigator?.onLine === 'boolean' && navigator.onLine === false
}

function shouldTryFallback(error: unknown): boolean {
  if (isOffline() || error instanceof AiVaultLockedError) return false
  if (error instanceof AiRegistryError) {
    return error.code === 'missing_credential' ||
      error.code === 'missing_provider_config' ||
      error.code === 'unknown_model' ||
      error.code === 'unknown_provider'
  }
  const DomException = (globalThis as any)?.DOMException
  if (typeof DomException === 'function' && error instanceof DomException && (error as Error).name === 'AbortError') return false
  const status = errorStatus(error)
  if (status === 401 || status === 403 || status === 404 || status === 408 || status === 429) return true
  if (status !== null && status >= 500) return true
  const message = error instanceof Error ? error.message.toLowerCase() : ''
  return message.includes('timed out') || message.includes('timeout') || message.includes('temporarily unavailable')
}

function createRoutedModel(modelIds: readonly string[]): LanguageModelV3 {
  const route = [...new Set(modelIds.map((id) => id.trim()).filter(Boolean))]
  if (route.length === 0) throw new AiRegistryError('invalid_model_id', 'At least one AI model is required.')

  async function attempt<T>(call: (model: LanguageModelV3, options: LanguageModelV3CallOptions) => PromiseLike<T>, options: LanguageModelV3CallOptions): Promise<T> {
    let lastError: unknown
    for (let index = 0; index < route.length; index += 1) {
      try {
        const model = await resolveSingleAiModel(route[index]!)
        if (typeof model === 'string' || model.specificationVersion !== 'v3') {
          throw new AiRegistryError('unknown_model', `Model '${route[index]}' is not compatible with AI routing.`)
        }
        return await call(model, options)
      } catch (error) {
        lastError = error
        if (index === route.length - 1 || !shouldTryFallback(error)) throw error
      }
    }
    throw lastError
  }

  return {
    specificationVersion: 'v3',
    provider: 'tracer.route',
    modelId: route.join(' -> '),
    supportedUrls: {},
    doGenerate: (options) => attempt((model, current) => model.doGenerate(current), options),
    doStream: (options) => attempt((model, current) => model.doStream(current), options)
  }
}

export async function resolveAiModel(qualifiedId: string | readonly string[]): Promise<LanguageModel> {
  if (Array.isArray(qualifiedId)) return createRoutedModel(qualifiedId)
  return resolveSingleAiModel(qualifiedId as string)
}

async function resolveSingleAiModel(qualifiedId: string): Promise<LanguageModel> {
  if (isTracerTestMode() && !isTracerLiveAiEnabled()) {
    return createTracerDeterministicTestModel({ provider: 'tracer_test', modelId: qualifiedId })
  }

  let parsed: { providerId: AiProviderId; modelId: string }
  try {
    parsed = parseQualifiedModelId(qualifiedId)
  } catch {
    throw new AiRegistryError('invalid_model_id', `Invalid model id: ${qualifiedId}`)
  }

  const { providerId, modelId } = parsed

  if (!isAiProviderId(providerId)) {
    throw new AiRegistryError('unknown_provider', `Unknown provider '${providerId}'.`)
  }

  if (providerId === 'openai') {
    ensureInCuratedCatalog('openai', modelId)
    const apiKey = await requireSecret('openai', 'openai_api_key')
    const openai = createOpenAI({ apiKey, fetch: aiHttpFetch })
    return openai(modelId)
  }

  if (providerId === 'anthropic') {
    ensureInCuratedCatalog('anthropic', modelId)
    const apiKey = await requireSecret('anthropic', 'anthropic_api_key')
    const anthropic = createAnthropic({ apiKey, fetch: aiHttpFetch })
    return anthropic(modelId)
  }

  if (providerId === 'gemini') {
    ensureInCuratedCatalog('gemini', modelId)
    const apiKey = await requireSecret('gemini', 'gemini_api_key')
    const google = createGoogleGenerativeAI({ apiKey, fetch: aiHttpFetch })
    return google(modelId)
  }

  if (providerId === 'github') {
    ensureInCuratedCatalog('github', modelId)
    const token = await requireSecret('github', 'github_models_token')
    const gh = createOpenAICompatible({
      name: 'github',
      apiKey: token,
      baseURL: 'https://models.github.ai/inference',
      headers: githubHeaders,
      fetch: aiHttpFetch
    })
    const model = gh.chatModel(modelId)
    return new Proxy(model as any, {
      get(target, prop, receiver) {
        const v = Reflect.get(target, prop, receiver)
        if (prop !== 'doGenerate' && prop !== 'doStream') return v
        if (typeof v !== 'function') return v
        return async (...args: any[]) => {
          try {
            return await v.apply(target, args)
          } catch (err) {
            await markInvalidIfUnauthorized('github', err)
            throw err
          }
        }
      }
    })
  }

  if (providerId === 'ollama_cloud') {
    ensureInCuratedCatalog('ollama_cloud', modelId)
    const apiKey = await requireSecret('ollama_cloud', 'ollama_cloud_api_key')
    const ollama = createOllama({
      name: 'ollama_cloud',
      baseURL: 'https://ollama.com/api',
      headers: { Authorization: `Bearer ${apiKey}` },
      compatibility: 'strict',
      fetch: aiHttpFetch
    })
    return ollama(modelId)
  }

  if (providerId === 'openai_compat') {
    const cfg = await requireOpenAiCompatConfig()
    const apiKey = await requireSecret('openai_compat', 'openai_compat_api_key')
    const compat = createOpenAICompatible({
      name: 'openai_compat',
      apiKey,
      baseURL: cfg.baseURL,
      fetch: aiHttpFetch
    })
    return compat.chatModel(cfg.modelId)
  }

  throw new AiRegistryError('unknown_provider', `Unknown provider '${providerId}'.`)
}
