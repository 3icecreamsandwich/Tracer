import { invoke } from '@tauri-apps/api/core'
import type { AiCredentialKind } from './errors'
import { hasTauriRuntime } from '../tauri'

type VaultSecretErrorShape = {
  code: string
  message: string
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function toVaultSecretError(err: unknown): VaultSecretErrorShape {
  if (isRecord(err) && typeof err.code === 'string' && typeof err.message === 'string') {
    return { code: err.code, message: err.message }
  }
  if (err instanceof Error) return { code: 'unknown', message: err.message }
  return { code: 'unknown', message: typeof err === 'string' ? err : 'Unexpected error' }
}

function hasTauriInternalsNow(): boolean {
  return hasTauriRuntime()
}

const inMemorySecrets = new Map<string, string>()

export type OpenAiCompatConfig = {
  baseURL: string
  modelId: string
}

export type ProviderApiKeyId = 'openai' | 'anthropic' | 'gemini' | 'openai_compat'

export type ProviderApiKeyPresence = Record<ProviderApiKeyId, boolean>

export type ProviderApiKeyDrafts = Partial<Record<ProviderApiKeyId, string>>

export type ProviderSettingsSaveInput = {
  apiKeys?: ProviderApiKeyDrafts
  openAiCompatConfig?: OpenAiCompatConfig
}

export type ProviderSettingsSaveResult = {
  savedApiKeyIds: ProviderApiKeyId[]
  savedOpenAiCompatConfig: boolean
}

const providerApiKeyIds: ProviderApiKeyId[] = [
  'openai',
  'anthropic',
  'gemini',
  'openai_compat'
]

const providerApiKeyCredentialKinds: Record<ProviderApiKeyId, AiCredentialKind> = {
  openai: 'openai_api_key',
  anthropic: 'anthropic_api_key',
  gemini: 'gemini_api_key',
  openai_compat: 'openai_compat_api_key'
}

export class VaultSecretError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'VaultSecretError'
    this.code = code
  }
}

function emptyProviderApiKeyPresence(): ProviderApiKeyPresence {
  return {
    openai: false,
    anthropic: false,
    gemini: false,
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

function normalizeOpenAiCompatConfig(config: OpenAiCompatConfig): OpenAiCompatConfig {
  return {
    baseURL: config.baseURL.trim(),
    modelId: config.modelId.trim()
  }
}

function normalizeProviderSettingsSaveResult(raw: unknown): ProviderSettingsSaveResult {
  const maybe = isRecord(raw) ? raw : {}
  const rawIds = Array.isArray(maybe.savedApiKeyIds) ? maybe.savedApiKeyIds : []
  return {
    savedApiKeyIds: rawIds.filter(isProviderApiKeyId),
    savedOpenAiCompatConfig: maybe.savedOpenAiCompatConfig === true
  }
}

export async function aiSecretsGet(kind: AiCredentialKind): Promise<string | null> {
  if (!hasTauriInternalsNow()) {
    return inMemorySecrets.get(kind) ?? null
  }
  try {
    const value = await invoke<string | null>('ai_secrets_get', { kind })
    if (typeof value !== 'string' || value.trim().length === 0) return null
    return value
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}

export async function aiSecretsSet(kind: AiCredentialKind, value: string): Promise<void> {
  const trimmed = value.trim()
  if (!hasTauriInternalsNow()) {
    if (!trimmed) {
      inMemorySecrets.delete(kind)
    } else {
      inMemorySecrets.set(kind, trimmed)
    }
    return
  }
  try {
    await invoke('ai_secrets_set', { kind, value: trimmed })
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}

export async function aiSecretsDelete(kind: AiCredentialKind): Promise<void> {
  if (!hasTauriInternalsNow()) {
    inMemorySecrets.delete(kind)
    return
  }
  try {
    await invoke('ai_secrets_delete', { kind })
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
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
      inMemorySecrets.set('openai_compat_config', JSON.stringify(openAiCompatConfig))
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

export async function aiOpenAiCompatGetConfig(): Promise<OpenAiCompatConfig | null> {
  if (!hasTauriInternalsNow()) {
    const raw = inMemorySecrets.get('openai_compat_config')
    if (!raw) return null
    try {
      return JSON.parse(raw) as OpenAiCompatConfig
    } catch {
      return null
    }
  }

  try {
    const raw = await invoke<string | null>('ai_openai_compat_get_config')
    if (!raw) return null
    const parsed = JSON.parse(raw) as OpenAiCompatConfig
    if (!parsed?.baseURL || !parsed?.modelId) return null
    return parsed
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}

export async function aiOpenAiCompatSetConfig(config: OpenAiCompatConfig): Promise<void> {
  const payload = {
    baseURL: config.baseURL.trim(),
    modelId: config.modelId.trim()
  }
  if (!hasTauriInternalsNow()) {
    inMemorySecrets.set('openai_compat_config', JSON.stringify(payload))
    return
  }
  try {
    await invoke('ai_openai_compat_set_config', { args: { configJson: JSON.stringify(payload) } })
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}
