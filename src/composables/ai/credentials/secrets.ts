import { invoke } from '@tauri-apps/api/core'
import type { AiCredentialKind } from '../errors'
import { VaultSecretError, toVaultSecretError } from './errors'
import { hasTauriInternalsNow, inMemorySecrets } from './runtime'

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
