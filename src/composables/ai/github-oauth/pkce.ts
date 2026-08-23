import { invoke } from '@tauri-apps/api/core'
import { aiHttpFetch } from '../http'
import { isTracerTestMode } from '../test-mode'
import { parseUrlEncoded } from './client'
import type {
  GithubDeviceTokenError,
  GithubDeviceTokenSuccess,
  GithubPkceCallback,
  GithubPkceStartResult
} from './types'

export async function githubPkceStart(): Promise<GithubPkceStartResult> {
  if (isTracerTestMode()) {
    return { id: 'tracer_test_pkce', port: 0 }
  }
  return await invoke<GithubPkceStartResult>('github_oauth_pkce_start')
}

export async function githubPkceFinish(opts: {
  id: string
  expectedState: string
  timeoutMs?: number
}): Promise<GithubPkceCallback> {
  if (isTracerTestMode()) {
    return { code: 'tracer_test_code', state: opts.expectedState }
  }
  return await invoke<GithubPkceCallback>('github_oauth_pkce_finish', {
    id: opts.id,
    args: {
      expectedState: opts.expectedState,
      timeoutMs: opts.timeoutMs
    }
  })
}

export async function githubPkceCancel(id: string): Promise<void> {
  if (isTracerTestMode()) return
  await invoke('github_oauth_pkce_cancel', { id })
}

function base64UrlEncode(bytes: ArrayBuffer): string {
  const u8 = new Uint8Array(bytes)
  let s = ''
  for (const b of u8) s += String.fromCharCode(b)
  const b64 = btoa(s)
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function randomPkceVerifier(): string {
  const buf = new Uint8Array(32)
  crypto.getRandomValues(buf)
  return base64UrlEncode(buf.buffer)
}

export async function pkceChallengeS256(verifier: string): Promise<string> {
  const bytes = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return base64UrlEncode(digest)
}

export async function githubPkceAuthorizeUrl(opts: {
  clientId: string
  port: number
  state: string
  scope: string
  codeChallenge: string
}): Promise<string> {
  const redirectUri = `http://127.0.0.1:${opts.port}/callback`
  const params = new URLSearchParams({
    client_id: opts.clientId,
    redirect_uri: redirectUri,
    state: opts.state,
    scope: opts.scope,
    code_challenge: opts.codeChallenge,
    code_challenge_method: 'S256'
  })
  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

export async function githubPkceExchangeToken(opts: {
  clientId: string
  code: string
  port: number
  codeVerifier: string
}): Promise<GithubDeviceTokenSuccess | GithubDeviceTokenError> {
  if (isTracerTestMode()) {
    return {
      access_token: 'tracer_test_github_models_token',
      token_type: 'bearer',
      scope: 'models:read'
    }
  }

  const redirectUri = `http://127.0.0.1:${opts.port}/callback`
  const res = await aiHttpFetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: opts.clientId,
      code: opts.code,
      redirect_uri: redirectUri,
      code_verifier: opts.codeVerifier
    })
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`Token exchange failed (${res.status})`)
  try {
    return JSON.parse(text)
  } catch {
    return parseUrlEncoded(text) as any
  }
}
