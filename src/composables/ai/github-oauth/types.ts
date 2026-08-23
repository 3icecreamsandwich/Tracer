export type GithubDeviceCodeResponse = {
  device_code: string
  user_code: string
  verification_uri: string
  expires_in: number
  interval: number
}

export type GithubDeviceTokenSuccess = {
  access_token: string
  token_type: string
  scope: string
}

export type GithubDeviceTokenErrorCode =
  | 'authorization_pending'
  | 'slow_down'
  | 'expired_token'
  | 'access_denied'
  | 'device_flow_disabled'
  | 'unsupported_grant_type'
  | 'incorrect_client_credentials'
  | 'incorrect_device_code'

export type GithubDeviceTokenError = {
  error: GithubDeviceTokenErrorCode | string
  error_description?: string
  error_uri?: string
}

export type GithubDevicePollEvent =
  | { type: 'pending'; nextIntervalSec: number }
  | { type: 'slow_down'; nextIntervalSec: number }
  | { type: 'success'; token: GithubDeviceTokenSuccess }
  | { type: 'expired' }
  | { type: 'denied' }
  | { type: 'device_flow_disabled' }
  | { type: 'error'; message: string }

export type GithubPkceStartResult = {
  id: string
  port: number
}

export type GithubPkceCallback = {
  code: string
  state: string
}
