import type { AiCredentialKind } from './errors'
import {
  aiProviderApiKeyPresence,
  aiProviderSettingsSave,
  aiSecretsDelete,
  type OpenAiCompatConfig,
  type ProviderApiKeyDrafts,
  type ProviderApiKeyId,
  type ProviderApiKeyPresence,
  type ProviderSettingsSaveResult
} from './credentials'

export type {
  ProviderApiKeyDrafts,
  ProviderApiKeyId,
  ProviderApiKeyPresence,
  ProviderSettingsSaveResult
} from './credentials'

const providerApiKeyKinds: Record<ProviderApiKeyId, AiCredentialKind> = {
  openai: 'openai_api_key',
  anthropic: 'anthropic_api_key',
  gemini: 'gemini_api_key',
  ollama_cloud: 'ollama_cloud_api_key',
  openai_compat: 'openai_compat_api_key'
}

export function emptyProviderApiKeyPresence(): ProviderApiKeyPresence {
  return {
    openai: false,
    anthropic: false,
    gemini: false,
    ollama_cloud: false,
    openai_compat: false
  }
}

function nonEmptyProviderApiKeyDrafts(drafts: ProviderApiKeyDrafts): ProviderApiKeyDrafts {
  const out: ProviderApiKeyDrafts = {}
  for (const id of Object.keys(providerApiKeyKinds) as ProviderApiKeyId[]) {
    const value = drafts[id]?.trim() ?? ''
    if (value) out[id] = value
  }
  return out
}

export async function loadProviderApiKeyPresence(): Promise<ProviderApiKeyPresence> {
  return await aiProviderApiKeyPresence()
}

export async function saveProviderApiKeyDrafts(
  drafts: ProviderApiKeyDrafts,
  options?: { openAiCompatConfig?: OpenAiCompatConfig }
): Promise<ProviderSettingsSaveResult> {
  const apiKeys = nonEmptyProviderApiKeyDrafts(drafts)
  if (Object.keys(apiKeys).length === 0 && !options?.openAiCompatConfig) {
    return { savedApiKeyIds: [], savedOpenAiCompatConfig: false }
  }
  return await aiProviderSettingsSave({
    apiKeys,
    openAiCompatConfig: options?.openAiCompatConfig
  })
}

export async function clearProviderApiKey(id: ProviderApiKeyId): Promise<void> {
  await aiSecretsDelete(providerApiKeyKinds[id])
}
