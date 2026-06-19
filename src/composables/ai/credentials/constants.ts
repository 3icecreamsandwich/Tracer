import type { AiCredentialKind } from '../errors'
import type { ProviderApiKeyId } from './types'

export const providerApiKeyIds: ProviderApiKeyId[] = [
  'openai',
  'anthropic',
  'gemini',
  'openai_compat'
]

export const providerApiKeyCredentialKinds: Record<ProviderApiKeyId, AiCredentialKind> = {
  openai: 'openai_api_key',
  anthropic: 'anthropic_api_key',
  gemini: 'gemini_api_key',
  openai_compat: 'openai_compat_api_key'
}

export const openAiCompatConfigSecretKey = 'openai_compat_config'
