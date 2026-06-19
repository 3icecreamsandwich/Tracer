export type {
  OpenAiCompatConfig,
  ProviderApiKeyDrafts,
  ProviderApiKeyId,
  ProviderApiKeyPresence,
  ProviderSettingsSaveInput,
  ProviderSettingsSaveResult
} from './credentials/types'

export { VaultSecretError } from './credentials/errors'
export { aiSecretsDelete, aiSecretsGet, aiSecretsSet } from './credentials/secrets'
export { aiOpenAiCompatGetConfig, aiOpenAiCompatSetConfig } from './credentials/openai-compat'
export { aiProviderApiKeyPresence, aiProviderSettingsSave } from './credentials/provider-keys'
