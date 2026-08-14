import { invoke } from '@tauri-apps/api/core'

import { isTracerTestMode } from '../ai/test-mode'

export type OAuthCallbackListener = { id: string; port: number }
export type OAuthCallbackResult = {
  code: string | null
  state: string | null
  error: string | null
  errorDescription: string | null
}

export async function startOAuthCallback(): Promise<OAuthCallbackListener> {
  if (isTracerTestMode()) return { id: 'tracer_test_oauth', port: 0 }
  return invoke<OAuthCallbackListener>('oauth_callback_start')
}

export async function finishOAuthCallback(
  id: string,
  timeoutMs = 120_000,
): Promise<OAuthCallbackResult> {
  if (isTracerTestMode()) {
    return { code: 'tracer_test_code', state: null, error: null, errorDescription: null }
  }
  return invoke<OAuthCallbackResult>('oauth_callback_finish', {
    id,
    args: { timeoutMs },
  })
}

export async function cancelOAuthCallback(id: string): Promise<void> {
  if (isTracerTestMode()) return
  await invoke('oauth_callback_cancel', { id })
}

export function callbackUrl(port: number): string {
  return `http://127.0.0.1:${port}/callback`
}
