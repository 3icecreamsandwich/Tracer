import { aiHttpFetch } from '../http'
import { isTracerTestMode } from '../test-mode'
import { asNumber, parseUrlEncoded } from './client'
import type {
  GithubDeviceCodeResponse,
  GithubDevicePollEvent,
  GithubDeviceTokenError,
  GithubDeviceTokenSuccess
} from './types'

export async function githubDeviceCodeRequest(opts: {
  clientId: string
  scope: string
}): Promise<GithubDeviceCodeResponse> {
  if (isTracerTestMode()) {
    return {
      device_code: 'tracer_test_device_code',
      user_code: 'TRACER-TEST',
      verification_uri: 'https://github.com/login/device',
      expires_in: 600,
      interval: 1
    }
  }

  const res = await aiHttpFetch('https://github.com/login/device/code', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: opts.clientId,
      scope: opts.scope
    })
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Device code request failed (${res.status})`)
  }

  let parsed: any
  try {
    parsed = JSON.parse(text)
  } catch {
    parsed = parseUrlEncoded(text)
  }

  const expiresIn = asNumber(parsed.expires_in) ?? 900
  const interval = asNumber(parsed.interval) ?? 5

  const out: GithubDeviceCodeResponse = {
    device_code: String(parsed.device_code ?? ''),
    user_code: String(parsed.user_code ?? ''),
    verification_uri: String(parsed.verification_uri ?? parsed.verification_url ?? ''),
    expires_in: expiresIn,
    interval
  }

  if (!out.device_code || !out.user_code || !out.verification_uri) {
    throw new Error('Device code response missing required fields')
  }
  return out
}

export function mapDevicePollResponse(
  body: GithubDeviceTokenSuccess | GithubDeviceTokenError,
  currentIntervalSec: number
): GithubDevicePollEvent {
  const maybeSuccess = body as GithubDeviceTokenSuccess
  if (typeof maybeSuccess.access_token === 'string' && maybeSuccess.access_token.trim().length > 0) {
    return { type: 'success', token: maybeSuccess }
  }

  const err = body as GithubDeviceTokenError
  const code = String(err.error ?? 'error')
  if (code === 'authorization_pending') {
    return { type: 'pending', nextIntervalSec: currentIntervalSec }
  }
  if (code === 'slow_down') {
    return { type: 'slow_down', nextIntervalSec: currentIntervalSec + 5 }
  }
  if (code === 'expired_token') {
    return { type: 'expired' }
  }
  if (code === 'access_denied') {
    return { type: 'denied' }
  }
  if (code === 'device_flow_disabled') {
    return { type: 'device_flow_disabled' }
  }
  return {
    type: 'error',
    message: err.error_description?.trim() || `OAuth device flow error: ${code}`
  }
}

export async function githubDeviceTokenPollOnce(opts: {
  clientId: string
  deviceCode: string
}): Promise<GithubDeviceTokenSuccess | GithubDeviceTokenError> {
  if (isTracerTestMode()) {
    return {
      access_token: 'tracer_test_github_models_token',
      token_type: 'bearer',
      scope: 'models:read'
    }
  }

  const res = await aiHttpFetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: opts.clientId,
      device_code: opts.deviceCode,
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
    })
  })

  const text = await res.text()
  if (!res.ok) {
    throw new Error(`Token request failed (${res.status})`)
  }
  try {
    return JSON.parse(text)
  } catch {
    return parseUrlEncoded(text) as any
  }
}
