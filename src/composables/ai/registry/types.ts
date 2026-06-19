import type { AiModelId, AiProviderId } from '../ids'

export type AiProviderModelCatalogItem = {
  id: AiModelId
  label: string
  hint?: string
}

export type AiProviderCatalogItem = {
  id: AiProviderId
  label: string
  hint: string
}

export type AiRegistryCatalog = {
  providers: AiProviderCatalogItem[]
  modelsByProvider: Record<AiProviderId, AiProviderModelCatalogItem[]>
}
