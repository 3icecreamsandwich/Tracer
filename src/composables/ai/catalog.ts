import type { AiProviderId } from './ids'

export type AiProviderCatalogItem = {
  id: AiProviderId
  label: string
  hint: string
}

export type AiModelCatalogItem = {
  id: string
  label: string
  hint?: string
}

export const curatedProviders: AiProviderCatalogItem[] = [
  { id: 'openai', label: 'OpenAI', hint: 'BYOK' },
  { id: 'anthropic', label: 'Anthropic', hint: 'BYOK' },
  { id: 'gemini', label: 'Gemini', hint: 'BYOK' },
  { id: 'github', label: 'GitHub Models', hint: 'OAuth' },
  { id: 'ollama_cloud', label: 'Ollama Cloud', hint: 'API key' },
  { id: 'openai_compat', label: 'OpenAI Compatible', hint: 'Advanced' }
]

export const curatedModelsByProvider: Record<AiProviderId, AiModelCatalogItem[]> = {
  openai: [
    { id: 'gpt-5.6-terra', label: 'GPT-5.6 Terra', hint: 'Recommended' },
    { id: 'gpt-5.6-luna', label: 'GPT-5.6 Luna' },
    { id: 'gpt-5.6-sol', label: 'GPT-5.6 Sol' }
  ],
  anthropic: [
    { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5', hint: 'Recommended' },
    { id: 'claude-sonnet-5', label: 'Claude Sonnet 5' }
  ],
  gemini: [
    { id: 'gemini-3.7-flash', label: 'Gemini 3.7 Flash', hint: 'Recommended' },
    { id: 'gemini-3.6-flash', label: 'Gemini 3.6 Flash' }
  ],
  github: [
    { id: 'openai/gpt-4.1', label: 'openai/gpt-4.1' },
    { id: 'openai/gpt-4o-mini', label: 'openai/gpt-4o-mini' },
    { id: 'openai/gpt-4o', label: 'openai/gpt-4o' }
  ],
  ollama_cloud: [
    { id: 'gpt-oss:20b', label: 'gpt-oss 20B', hint: 'Recommended cloud model' }
  ],
  openai_compat: [
    { id: 'configured', label: 'Configured model', hint: 'Uses Advanced endpoint settings' }
  ]
}
