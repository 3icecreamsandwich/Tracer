import { invoke } from '@tauri-apps/api/core'
import { openAiCompatConfigSecretKey, providerApiKeyCredentialKinds, providerApiKeyIds } from './constants'
import { VaultSecretError, isRecord, toVaultSecretError } from './errors'
import { normalizeOpenAiCompatConfig } from './openai-compat'
import { hasTauriInternalsNow, inMemorySecrets } from './runtime'
import type {
  OpenAiCompatConfig,
  ProviderApiKeyDrafts,
  ProviderApiKeyId,
  ProviderApiKeyPresence,
  ProviderSettingsSaveInput,
  ProviderSettingsSaveResult
} from './types'

function emptyProviderApiKeyPresence(): ProviderApiKeyPresence {
  return {
    openai: false,
    anthropic: false,
    gemini: false,
    ollama_cloud: false,
    openai_compat: false
  }
}

function isProviderApiKeyId(v: unknown): v is ProviderApiKeyId {
  return typeof v === 'string' && (providerApiKeyIds as string[]).includes(v)
}

function normalizeProviderApiKeyDrafts(drafts?: ProviderApiKeyDrafts): ProviderApiKeyDrafts {
  const out: ProviderApiKeyDrafts = {}
  for (const id of providerApiKeyIds) {
    const value = drafts?.[id]?.trim() ?? ''
    if (value) out[id] = value
  }
  return out
}

function normalizeProviderSettingsSaveResult(raw: unknown): ProviderSettingsSaveResult {
  const maybe = isRecord(raw) ? raw : {}
  const rawIds = Array.isArray(maybe.savedApiKeyIds) ? maybe.savedApiKeyIds : []
  return {
    savedApiKeyIds: rawIds.filter(isProviderApiKeyId),
    savedOpenAiCompatConfig: maybe.savedOpenAiCompatConfig === true
  }
}

function saveOpenAiCompatConfig(config: OpenAiCompatConfig) {
  inMemorySecrets.set(openAiCompatConfigSecretKey, JSON.stringify(config))
}

export async function aiProviderApiKeyPresence(): Promise<ProviderApiKeyPresence> {
  if (!hasTauriInternalsNow()) {
    const out = emptyProviderApiKeyPresence()
    for (const id of providerApiKeyIds) {
      const value = inMemorySecrets.get(providerApiKeyCredentialKinds[id])
      out[id] = typeof value === 'string' && value.trim().length > 0
    }
    return out
  }

  try {
    const raw = await invoke<ProviderApiKeyPresence>('ai_provider_api_key_presence')
    const maybe = isRecord(raw) ? raw : {}
    return {
      ...emptyProviderApiKeyPresence(),
      openai: maybe.openai === true,
      anthropic: maybe.anthropic === true,
      gemini: maybe.gemini === true,
      ollama_cloud: maybe.ollama_cloud === true,
      openai_compat: maybe.openai_compat === true
    }
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}

export async function aiProviderSettingsSave(
  input: ProviderSettingsSaveInput
): Promise<ProviderSettingsSaveResult> {
  const apiKeys = normalizeProviderApiKeyDrafts(input.apiKeys)
  const openAiCompatConfig = input.openAiCompatConfig
    ? normalizeOpenAiCompatConfig(input.openAiCompatConfig)
    : undefined
  const savedApiKeyIds = providerApiKeyIds.filter((id) => !!apiKeys[id])

  if (savedApiKeyIds.length === 0 && !openAiCompatConfig) {
    return { savedApiKeyIds: [], savedOpenAiCompatConfig: false }
  }

  if (!hasTauriInternalsNow()) {
    for (const id of savedApiKeyIds) {
      inMemorySecrets.set(providerApiKeyCredentialKinds[id], apiKeys[id]!)
    }
    if (openAiCompatConfig) {
      saveOpenAiCompatConfig(openAiCompatConfig)
    }
    return {
      savedApiKeyIds,
      savedOpenAiCompatConfig: !!openAiCompatConfig
    }
  }

  try {
    const raw = await invoke<ProviderSettingsSaveResult>('ai_provider_settings_save', {
      args: {
        apiKeys,
        openAiCompatConfigJson: openAiCompatConfig
          ? JSON.stringify(openAiCompatConfig)
          : undefined
      }
    })
    return normalizeProviderSettingsSaveResult(raw)
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}
