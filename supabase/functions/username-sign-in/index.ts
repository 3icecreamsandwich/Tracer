import { createClient } from 'npm:@supabase/supabase-js@2.116.0'

// This endpoint must be deployed with JWT verification disabled: it is used before login.
// Never log the request body, password, token, or resolved email address.
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Cache-Control': 'no-store' }
const attempts = new Map<string, { count: number; until: number }>()
Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  const reply = (body: unknown, status: number) => Response.json(body, { status, headers: cors })
  if (request.method !== 'POST') return reply({ error: 'Invalid request' }, 405)
  const address = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now(), current = attempts.get(address)
  const limit = !current || current.until <= now ? { count: 0, until: now + 60_000 } : current
  limit.count++; attempts.set(address, limit)
  if (attempts.size > 5000) {
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key)
    while (attempts.size > 5000) attempts.delete(attempts.keys().next().value!)
  }
  if (limit.count > 20) return reply({ error: 'Too many attempts. Try again later.' }, 429)
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 4096) return reply({ error: 'Invalid request' }, 413)
    const body = await request.text()
    if (body.length > 4096) return reply({ error: 'Invalid request' }, 413)
    const input = JSON.parse(body)
    const username = typeof input.username === 'string' ? input.username.trim().toLowerCase().replace(/^@/, '') : ''
    const password = typeof input.password === 'string' ? input.password : ''
    const captchaToken = typeof input.captchaToken === 'string' ? input.captchaToken : undefined
    if (!/^[a-z0-9][a-z0-9_]{2,29}$/.test(username) || !password || password.length > 1024) return reply({ error: 'Invalid credentials' }, 400)
    const url = Deno.env.get('SUPABASE_URL')!, service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, anon = Deno.env.get('SUPABASE_ANON_KEY')!
    if (!url || !service || !anon) return reply({ error: 'Sign-in service unavailable' }, 503)
    const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } })
    const hash = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))).map(byte => byte.toString(16).padStart(2, '0')).join('')
    const [ipLimit, userLimit] = await Promise.all([
      admin.rpc('consume_username_sign_in_attempt', { p_bucket: await hash(`ip:${address}`), p_limit: 20 }),
      admin.rpc('consume_username_sign_in_attempt', { p_bucket: await hash(`user:${username}`), p_limit: 10 }),
    ])
    if (ipLimit.error || userLimit.error) return reply({ error: 'Sign-in service unavailable' }, 503)
    if (!ipLimit.data || !userLimit.data) return reply({ error: 'Too many attempts. Try again later.' }, 429)
    const profile = await admin.from('profiles').select('id').eq('username', username).maybeSingle()
    if (profile.error) return reply({ error: 'Sign-in service unavailable' }, 503)
    const user = profile.data?.id ? await admin.auth.admin.getUserById(profile.data.id) : null
    const email = user?.data.user?.email ?? 'no-such-user@invalid.invalid'
    const auth = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } })
    const result = await auth.auth.signInWithPassword({ email, password, options: { captchaToken } })
    if (!profile.data || result.error || !result.data.session) return reply({ error: 'Invalid credentials' }, 401)
    return reply({ session: result.data.session }, 200)
  } catch { return reply({ error: 'Sign-in service unavailable' }, 503) }
})
