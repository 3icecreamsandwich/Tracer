import { readWebJson } from '../../utils/web-body'
import { resolveWebAiTarget } from '../../../src/composables/platform/ai-target'
import { authenticatedWebClient } from '../../utils/web-auth'

export default defineEventHandler(async (event) => {
  const client = await authenticatedWebClient(event)
  const config = useRuntimeConfig(event)
  const body = await readWebJson(event, 5 * 1024 * 1024)
  if (typeof body?.url !== 'string' || typeof body?.body !== 'string' || body.body.length > 4 * 1024 * 1024) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid AI request or source too large.' })
  }
  const target = resolveWebAiTarget(body.url, body.method, config.webAiCompatibleOrigin)
  if (!target) throw createError({ statusCode: 400, statusMessage: 'This endpoint is not enabled for web AI. Choose a cloud provider in Settings.' })
  const headers = new Headers({ 'Content-Type': 'application/json' })
  let upstreamBody = body.body
  // SDK options may carry safe protocol-version headers, never arbitrary auth.
  for (const name of ['accept', 'anthropic-version', 'anthropic-beta', 'x-github-api-version']) {
    if (typeof body.headers?.[name] === 'string') headers.set(name, body.headers[name])
  }
  if (target.oauth) {
    const params = new URLSearchParams(body.body)
    if (!process.env.VITE_GITHUB_OAUTH_CLIENT_ID || params.get('client_id') !== process.env.VITE_GITHUB_OAUTH_CLIENT_ID) {
      throw createError({ statusCode: 400, statusMessage: 'GitHub Models is not configured for this deployment.' })
    }
    if (target.url.pathname.endsWith('/code')) upstreamBody = new URLSearchParams({ client_id: params.get('client_id')!, scope: 'models:read' }).toString()
    else {
      if (params.get('grant_type') !== 'urn:ietf:params:oauth:grant-type:device_code' || !params.get('device_code')) throw createError({ statusCode: 400, statusMessage: 'Invalid device authorization.' })
      upstreamBody = new URLSearchParams({ client_id: params.get('client_id')!, device_code: params.get('device_code')!, grant_type: params.get('grant_type')! }).toString()
    }
    headers.set('Content-Type', 'application/x-www-form-urlencoded')
    headers.set('Accept', 'application/json')
  } else {
    let key: string | undefined
    if (target.provider === 'github') key = typeof body.githubToken === 'string' && body.githubToken.length <= 8192 ? body.githubToken : undefined
    else {
      const { data, error } = await client.rpc('list_tracer_user_api_keys')
      if (error) throw createError({ statusCode: 502, statusMessage: 'Could not access your provider key.' })
      key = data?.find((row: { provider_id: string }) => row.provider_id === target.provider)?.api_key
    }
    if (!key) throw createError({ statusCode: 400, statusMessage: 'Add a key for this provider in Settings.' })
    target.url.searchParams.delete('key')
    if (target.provider === 'anthropic') headers.set('x-api-key', key)
    else if (target.provider === 'gemini') headers.set('x-goog-api-key', key)
    else headers.set('Authorization', `Bearer ${key}`)
  }
  let response: Response
  try {
    response = await fetch(target.url, {
      method: body.method,
      headers,
      body: body.method === 'GET' ? undefined : upstreamBody,
      redirect: 'error',
      signal: AbortSignal.timeout(180_000),
    })
  } catch { throw createError({ statusCode: 502, statusMessage: 'The AI provider could not be reached. Try again.' }) }
  setResponseStatus(event, response.status)
  setHeader(event, 'Content-Type', response.headers.get('content-type') ?? 'application/json')
  setHeader(event, 'X-Accel-Buffering', 'no')
  // Do not echo upstream error bodies, which may include credentials or prompts.
  if (!response.ok) return { error: { message: `The AI provider returned ${response.status}. Check its key and quota in Settings.` } }
  return response.body ? sendStream(event, response.body) : ''
})
