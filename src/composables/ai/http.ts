import { fetch as tauriFetch } from '@tauri-apps/plugin-http'
import { hasTauriRuntime } from '../tauri'
import { ensureReadableStreamValues } from '../platform/readable-stream'
import { isTracerLiveAiEnabled, isTracerTestMode } from './test-mode'

export function aiHttpFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  if (isTracerTestMode() && !isTracerLiveAiEnabled()) {
    throw new Error('Network is disabled in TRACER_TEST_MODE (set TRACER_LIVE_AI=1 to allow live calls).')
  }
  ensureReadableStreamValues()
  if (hasTauriRuntime()) return tauriFetch(input, init)
  return browserAiFetch(input, init)
}

async function browserAiFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const { webApiFetch } = await import('../platform/web-api')
  const request = new Request(input, init)
  const headers = Object.fromEntries(request.headers.entries())
  const url = new URL(request.url)
  // GitHub device tokens stay in memory. Provider keys are resolved server-side.
  const githubToken = url.hostname === 'models.github.ai' ? request.headers.get('authorization')?.replace(/^Bearer /i, '') : undefined
  delete headers.authorization
  delete headers['x-api-key']
  delete headers['x-goog-api-key']
  url.searchParams.delete('key')
  return webApiFetch('ai', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: request.signal,
    body: JSON.stringify({ url: url.href, method: request.method, headers, githubToken, body: request.method === 'GET' ? '' : await request.text() }),
  })
}
