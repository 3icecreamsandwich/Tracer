import { invoke } from '@tauri-apps/api/core'
import { openAiCompatConfigSecretKey } from './constants'
import { VaultSecretError, toVaultSecretError } from './errors'
import { hasTauriInternalsNow, inMemorySecrets } from './runtime'
import type { OpenAiCompatConfig } from './types'

export function normalizeOpenAiCompatConfig(config: OpenAiCompatConfig): OpenAiCompatConfig {
  return {
    baseURL: config.baseURL.trim(),
    modelId: config.modelId.trim()
  }
}

export async function aiOpenAiCompatGetConfig(): Promise<OpenAiCompatConfig | null> {
  if (!hasTauriInternalsNow()) {
    const raw = inMemorySecrets.get(openAiCompatConfigSecretKey)
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
  const payload = normalizeOpenAiCompatConfig(config)
  if (!hasTauriInternalsNow()) {
    inMemorySecrets.set(openAiCompatConfigSecretKey, JSON.stringify(payload))
    return
  }
  try {
    await invoke('ai_openai_compat_set_config', { args: { configJson: JSON.stringify(payload) } })
  } catch (e) {
    const err = toVaultSecretError(e)
    throw new VaultSecretError(err.code, err.message)
  }
}
