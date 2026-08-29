import { useTracerDb } from '../db'
import { createSettingsRepo } from '../db/repos'
import { curatedModelsByProvider } from './catalog'
import { aiOpenAiCompatGetConfig } from './credentials'
import type { ProviderApiKeyId } from './credentials/types'

type ProviderModelDefaultOptions = {
  openAiCompatModelId?: string
}

export function providerDefaultModelId(
  providerId: ProviderApiKeyId,
  options: ProviderModelDefaultOptions = {},
): string | null {
  if (providerId === 'openai_compat') {
    const modelId = options.openAiCompatModelId?.trim() ?? ''
    return modelId ? `openai_compat:${modelId}` : null
  }
  const modelId = curatedModelsByProvider[providerId][0]?.id
  return modelId ? `${providerId}:${modelId}` : null
}

export function addProviderDefaultsToModelRoute(
  currentRoute: readonly string[],
  providerIds: readonly ProviderApiKeyId[],
  options: ProviderModelDefaultOptions = {},
): string[] {
  const route = [...new Set(currentRoute.map((id) => id.trim()).filter(Boolean))]
  for (const providerId of providerIds) {
    const modelId = providerDefaultModelId(providerId, options)
    if (modelId && !route.includes(modelId)) route.push(modelId)
  }
  return route
}

export async function ensureProviderDefaultModels(
  providerIds: readonly ProviderApiKeyId[],
  options: ProviderModelDefaultOptions = {},
): Promise<string[]> {
  const uniqueProviderIds = [...new Set(providerIds)]
  if (uniqueProviderIds.length === 0) return []

  let openAiCompatModelId = options.openAiCompatModelId?.trim() ?? ''
  if (uniqueProviderIds.includes('openai_compat') && !openAiCompatModelId) {
    try {
      openAiCompatModelId = (await aiOpenAiCompatGetConfig()).modelId.trim()
    } catch {
      // A compatible model cannot be added until its endpoint configuration exists.
    }
  }

  const db = await useTracerDb()
  const repo = createSettingsRepo(db)
  const settings = await repo.get()
  const currentRoute = settings.defaultModelId
    ? [settings.defaultModelId, ...settings.fallbackModelIds]
    : []
  const nextRoute = addProviderDefaultsToModelRoute(currentRoute, uniqueProviderIds, {
    openAiCompatModelId,
  })

  if (nextRoute.length !== currentRoute.length) {
    await repo.set({
      defaultModelId: nextRoute[0] ?? null,
      fallbackModelIds: nextRoute.slice(1),
    })
  }
  return nextRoute
}
