import { createClient } from '@supabase/supabase-js'
import { createError, getHeader, setHeader, type H3Event } from 'h3'

// Per-process burst protection; production deployments should also rate-limit
// at the gateway. No account credentials are cached in this process.
const requests = new Map<string, { start: number; count: number }>()
export async function authenticatedWebClient(event: H3Event) {
  setHeader(event, 'Cache-Control', 'private, no-store')
  const config = useRuntimeConfig(event)
  const authorization = getHeader(event, 'authorization')
  if (!authorization?.startsWith('Bearer ')) throw createError({ statusCode: 401, statusMessage: 'Sign in to Tracer.' })
  if (!config.supabaseUrl || !config.supabasePublishableKey) throw createError({ statusCode: 503, statusMessage: 'Account services are not configured.' })
  const client = createClient(config.supabaseUrl, config.supabasePublishableKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  const { data, error } = await client.auth.getUser(authorization.slice(7))
  if (error || !data.user) throw createError({ statusCode: 401, statusMessage: 'Your session expired. Sign in again.' })
  const now = Date.now()
  for (const [id, value] of requests) if (now - value.start > 60_000) requests.delete(id)
  const rate = requests.get(data.user.id) ?? { start: now, count: 0 }
  rate.count++
  requests.set(data.user.id, rate)
  if (rate.count > 120) throw createError({ statusCode: 429, statusMessage: 'Too many requests. Wait a minute and retry.' })
  return client
}

export async function readWebProviderKeys(event: H3Event) {
  const client = await authenticatedWebClient(event)
  const { data, error } = await client.rpc('list_tracer_user_api_keys')
  if (error) throw createError({ statusCode: 502, statusMessage: 'Could not access your saved provider keys.' })
  return Object.fromEntries((data ?? []).map((row: { provider_id: string; api_key: string }) => [row.provider_id, row.api_key])) as Record<string, string>
}
