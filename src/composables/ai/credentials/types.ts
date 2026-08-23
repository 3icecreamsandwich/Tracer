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
