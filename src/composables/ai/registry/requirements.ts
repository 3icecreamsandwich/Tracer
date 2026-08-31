import { curatedModelsByProvider } from '../catalog'
import {
  AiRegistryError,
  AiVaultLockedError,
  MissingAiCredentialError,
  type AiCredentialKind
} from '../errors'
import type { AiProviderId } from '../ids'
import {
  aiOpenAiCompatGetConfig,
  aiSecretsGet,
  aiSecretsSet,
  VaultSecretError,
  type OpenAiCompatConfig
} from '../credentials'
import {
  setGithubConnectionState,
  setOpenAiCompatConnectionConfig,
  setProviderApiKeyPresence,
} from '../../connection-status'

export function mapVaultError(e: unknown): AiRegistryError {
  if (e instanceof VaultSecretError) {
    if (e.code === 'not_initialized' || e.code === 'wrong_password' || e.code === 'password_required') {
      return new AiVaultLockedError()
    }
    return new AiRegistryError('missing_provider_config', e.message)
  }
  if (e instanceof AiRegistryError) return e
  if (e instanceof Error) return new AiRegistryError('missing_provider_config', e.message)
  return new AiRegistryError('missing_provider_config', 'Unexpected error')
}

export function ensureInCuratedCatalog(providerId: AiProviderId, modelId: string): void {
  const list = curatedModelsByProvider[providerId]
  const ok = list.some((m) => m.id === modelId)
  if (!ok) {
    throw new AiRegistryError(
      'unknown_model',
      `Unknown model '${modelId}' for provider '${providerId}'.`,
      providerId
    )
  }
}

export async function requireSecret(providerId: AiProviderId, kind: AiCredentialKind): Promise<string> {
  let value: string | null
  try {
    value = await aiSecretsGet(kind)
  } catch (e) {
    throw mapVaultError(e)
  }
  if (!value) {
    if (providerId === 'github') {
      setGithubConnectionState({ status: 'unauthenticated' })
    } else if (providerId === 'openai' || providerId === 'anthropic' || providerId === 'gemini' || providerId === 'ollama_cloud' || providerId === 'openai_compat') {
      setProviderApiKeyPresence(providerId, false)
    }
    throw new MissingAiCredentialError(
      providerId,
      kind,
      'Missing credentials. Configure this provider in Settings.'
    )
  }
  return value
}

export async function markInvalidIfUnauthorized(providerId: AiProviderId, e: unknown): Promise<void> {
  if (providerId !== 'github') return
  const status = (e as any)?.status
  if (status !== 401 && status !== 403) return
  try {
    await aiSecretsSet('github_models_token', '')
    setGithubConnectionState({ status: 'invalid' })
  } catch {
  }
}

export async function requireOpenAiCompatConfig(): Promise<OpenAiCompatConfig> {
  let cfg: OpenAiCompatConfig | null
  try {
    cfg = await aiOpenAiCompatGetConfig()
  } catch (e) {
    throw mapVaultError(e)
  }
  if (!cfg) {
    setOpenAiCompatConnectionConfig({ baseURL: '', modelId: '' })
    throw new AiRegistryError(
      'missing_provider_config',
      'OpenAI compatible provider is not configured. Configure it in Settings.',
      'openai_compat'
    )
  }
  return cfg
}
