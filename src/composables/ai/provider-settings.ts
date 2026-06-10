import type { AiCredentialKind } from './errors'
import { aiSecretsDelete, aiSecretsGet, aiSecretsSet } from './credentials'

export type ProviderApiKeyId = 'openai' | 'anthropic' | 'gemini' | 'openai_compat'

export type ProviderApiKeyPresence = Record<ProviderApiKeyId, boolean>

export type ProviderApiKeyDrafts = Partial<Record<ProviderApiKeyId, string>>

const providerApiKeyKinds: Record<ProviderApiKeyId, AiCredentialKind> = {
  openai: 'openai_api_key',
  anthropic: 'anthropic_api_key',
  gemini: 'gemini_api_key',
  openai_compat: 'openai_compat_api_key'
}

export function emptyProviderApiKeyPresence(): ProviderApiKeyPresence {
  return {
    openai: false,
    anthropic: false,
    gemini: false,
    openai_compat: false
  }
}

export async function loadProviderApiKeyPresence(): Promise<ProviderApiKeyPresence> {
  const out = emptyProviderApiKeyPresence()
  for (const id of Object.keys(providerApiKeyKinds) as ProviderApiKeyId[]) {
    const value = await aiSecretsGet(providerApiKeyKinds[id])
    out[id] = typeof value === 'string' && value.trim().length > 0
  }
  return out
}

export async function saveProviderApiKeyDrafts(drafts: ProviderApiKeyDrafts): Promise<void> {
  for (const id of Object.keys(providerApiKeyKinds) as ProviderApiKeyId[]) {
    const value = drafts[id]?.trim() ?? ''
    if (!value) continue
    await aiSecretsSet(providerApiKeyKinds[id], value)
  }
}

export async function clearProviderApiKey(id: ProviderApiKeyId): Promise<void> {
  await aiSecretsDelete(providerApiKeyKinds[id])
}
