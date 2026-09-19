import { webBindings, webRuntimeConfig } from './web-config'
import { createClient } from '@supabase/supabase-js'
import { createError, getHeader, setHeader, type H3Event } from 'h3'

// Node fallback only; Cloudflare uses its binding after account verification.
// No account credentials are cached in this process.
const requests = new Map<string, { start: number; count: number }>()
const aiRequests = new Map<string, { start: number; count: number }>()
const handoffRequests = new Map<string, { start: number; count: number }>()

function limitInProcess(store: Map<string, { start: number; count: number }>, key: string, maximum: number) {
  const now = Date.now()
  for (const [id, value] of store) if (now - value.start > 60_000) store.delete(id)
  const rate = store.get(key) ?? { start: now, count: 0 }
  rate.count++
  store.set(key, rate)
  return rate.count <= maximum
}

export async function authenticatedWebContext(event: H3Event) {
  setHeader(event, 'Cache-Control', 'private, no-store')
  const config = webRuntimeConfig(event)
  const authorization = getHeader(event, 'authorization')
  if (!authorization?.startsWith('Bearer ')) throw createError({ statusCode: 401, statusMessage: 'Sign in to Tracer.' })
  if (!config.supabaseUrl || !config.supabasePublishableKey) throw createError({ statusCode: 503, statusMessage: 'Account services are not configured.' })
  const client = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  const { data, error } = await client.auth.getUser(authorization.slice(7))
  if (error || !data.user) throw createError({ statusCode: 401, statusMessage: 'Your session expired. Sign in again.' })
  const bindings = webBindings(event)
  if (bindings) {
    if (!bindings.WEB_RATE_LIMITER) throw createError({ statusCode: 503, statusMessage: 'Account services are not configured.' })
    const { success } = await bindings.WEB_RATE_LIMITER.limit({ key: data.user.id })
    if (!success) throw createError({ statusCode: 429, statusMessage: 'Too many requests. Wait a minute and retry.' })
    return { client, userId: data.user.id }
  }
  if (!limitInProcess(requests, data.user.id, 120)) throw createError({ statusCode: 429, statusMessage: 'Too many requests. Wait a minute and retry.' })
  return { client, userId: data.user.id }
}

export async function authenticatedWebClient(event: H3Event) {
  return (await authenticatedWebContext(event)).client
}

export async function limitWebAi(event: H3Event, userId: string) {
  const bindings = webBindings(event)
  if (bindings && !bindings.WEB_AI_RATE_LIMITER) throw createError({ statusCode: 503, statusMessage: 'AI services are not configured.' })
  const success = bindings ? (await bindings.WEB_AI_RATE_LIMITER.limit({ key: userId })).success : limitInProcess(aiRequests, userId, 30)
  if (!success) throw createError({ statusCode: 429, statusMessage: 'Too many AI requests. Wait a minute and retry.' })
}

export async function limitWebAuthHandoff(event: H3Event, identity?: string) {
  const address = getHeader(event, 'cf-connecting-ip') ?? getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const key = identity ? `${identity}:${address}` : address
  const bindings = webBindings(event)
  if (bindings && !bindings.WEB_AUTH_RATE_LIMITER) throw createError({ statusCode: 503, statusMessage: 'Account services are not configured.' })
  const success = bindings ? (await bindings.WEB_AUTH_RATE_LIMITER.limit({ key })).success : limitInProcess(handoffRequests, key, 20)
  if (!success) throw createError({ statusCode: 429, statusMessage: 'Too many sign-in attempts. Wait a minute and retry.' })
}

export async function readWebProviderKeys(event: H3Event) {
  const client = await authenticatedWebClient(event)
  const { data, error } = await client.rpc('list_tracer_user_api_keys')
  if (error) throw createError({ statusCode: 502, statusMessage: 'Could not access your saved provider keys.' })
  return Object.fromEntries((data ?? []).map((row: { provider_id: string; api_key: string }) => [row.provider_id, row.api_key])) as Record<string, string>
}
