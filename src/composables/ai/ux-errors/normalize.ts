import { AiRegistryError, MissingAiCredentialError } from '../errors'
import { GenerateContractParseError } from '../generate-contract'
import { GenerateTextRequestFormatError } from '../generate-request'
import { TermsValidationError, TsvParseError } from '../../db/validators'
import { redactSensitiveText } from '../../security/redact'
import type { AiErrorUx } from './types'
import { errorStatus, isFetchOfflineError, isRateLimitError } from './predicates'

export function normalizeAiError(err: unknown): AiErrorUx {
  if (err instanceof TsvParseError || err instanceof TermsValidationError || err instanceof GenerateContractParseError) {
    return {
      key: 'parse_error_tsv',
      title: 'AI output could not be parsed',
      message: redactSensitiveText(
        err.message || 'The AI output was not valid TSV. Copy the raw output and try again.'
      ),
      showGoToSettings: false
    }
  }

  if (err instanceof GenerateTextRequestFormatError) {
    return {
      key: 'provider_error',
      title: 'AI request was rejected',
      message: redactSensitiveText(err.message),
      showGoToSettings: false
    }
  }

  if (err instanceof MissingAiCredentialError) {
    if (err.providerId === 'github' && err.credentialKind === 'github_models_token') {
      return {
        key: 'oauth_not_authenticated',
        title: 'GitHub Models not authenticated',
        message: 'Authenticate GitHub Models in Settings to use this provider.',
        providerId: err.providerId,
        showGoToSettings: true
      }
    }
    return {
      key: 'missing_credentials',
      title: 'Missing provider credentials',
      message: 'Configure your AI provider credentials in Settings to continue.',
      providerId: err.providerId,
      showGoToSettings: true
    }
  }

  if (err instanceof AiRegistryError) {
    if (err.code === 'missing_credential' || err.code === 'missing_provider_config') {
      return {
        key: 'missing_credentials',
        title: 'Missing provider credentials',
        message: redactSensitiveText(err.message || 'Configure this provider in Settings.'),
        providerId: err.providerId,
        showGoToSettings: true
      }
    }
  }

  if (isFetchOfflineError(err)) {
    return {
      key: 'network_offline',
      title: 'You are offline',
      message: 'Reconnect to the internet and try again.',
      showGoToSettings: false
    }
  }

  if (isRateLimitError(err)) {
    return {
      key: 'provider_rate_limited',
      title: 'Rate limit reached',
      message: 'The AI provider is rate limited. Wait a moment and try again.',
      showGoToSettings: false
    }
  }

  const status = errorStatus(err)
  if (typeof status === 'number' && status >= 500) {
    return {
      key: 'provider_error',
      title: 'Provider error',
      message: `The AI provider failed (${status}). Try again in a moment.`,
      showGoToSettings: false
    }
  }

  if (err instanceof Error) {
    return {
      key: 'provider_error',
      title: 'AI request failed',
      message: redactSensitiveText(err.message || 'Unexpected AI error.'),
      showGoToSettings: false
    }
  }

  return {
    key: 'provider_error',
    title: 'AI request failed',
    message: 'Unexpected AI error.',
    showGoToSettings: false
  }
}

export function isAiErrorCandidate(err: unknown): boolean {
  if (err instanceof TsvParseError) return true
  if (err instanceof TermsValidationError) return true
  if (err instanceof GenerateContractParseError) return true
  if (err instanceof AiRegistryError) return true
  if (err instanceof MissingAiCredentialError) return true
  if (isFetchOfflineError(err)) return true
  if (isRateLimitError(err)) return true
  if (errorStatus(err) !== null) return true
  return false
}
