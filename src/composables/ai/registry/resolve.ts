import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import type { LanguageModel } from 'ai'
import { AiRegistryError } from '../errors'
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

export async function resolveAiModel(qualifiedId: string): Promise<LanguageModel> {
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
