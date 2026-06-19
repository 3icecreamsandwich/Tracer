import type { AiErrorKey, AiErrorUx } from './types'

export function aiErrorSettingsReason(key: AiErrorKey): string | null {
  if (key === 'missing_default_model') return 'missing-default-model'
  if (key === 'missing_credentials') return 'missing-credentials'
  if (key === 'oauth_not_authenticated') return 'oauth-not-authenticated'
  return null
}

export function aiErrorForMissingDefaultModel(): AiErrorUx {
  return {
    key: 'missing_default_model',
    title: 'Default AI model required',
    message: 'Choose a Default AI Model in Settings to use this feature.',
    showGoToSettings: true
  }
}
