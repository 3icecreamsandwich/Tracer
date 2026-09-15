const staticDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Nuxt SPA bootstrap emits an inline import map and runtime-config script.
  // It escapes serialized values, but requires inline script execution.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
]

function configuredSupabaseOrigin(env: Cloudflare.Env) {
  try {
    const url = new URL(env.NUXT_SUPABASE_URL)
    return url.protocol === 'https:' ? url.origin : null
  } catch {
    return null
  }
}

export function contentSecurityPolicy(env: Cloudflare.Env) {
  const supabase = configuredSupabaseOrigin(env)
  const images = ["'self'", 'data:', 'blob:', ...(supabase ? [supabase] : [])]
  const connections = ["'self'", ...(supabase ? [supabase, supabase.replace('https://', 'wss://')] : [])]
  return [
    ...staticDirectives,
    `img-src ${images.join(' ')}`,
    `connect-src ${connections.join(' ')}`,
  ].join('; ')
}

export function applySecurityHeaders(headers: Headers, env: Cloudflare.Env) {
  headers.delete('X-Powered-By')
  headers.set('Content-Security-Policy', contentSecurityPolicy(env))
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  // OAuth opens a separate provider window; allow that popup without allowing
  // another site to retain a reference to the Tracer window.
  headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
}
