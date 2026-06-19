import type { AiProviderId } from '../ids'

export type AiErrorKey =
  | 'missing_default_model'
  | 'missing_credentials'
  | 'oauth_not_authenticated'
  | 'provider_rate_limited'
  | 'network_offline'
  | 'provider_error'
  | 'parse_error_tsv'

export type AiErrorUx = {
  key: AiErrorKey
  title: string
  message: string
  providerId?: AiProviderId
  showGoToSettings: boolean
}
