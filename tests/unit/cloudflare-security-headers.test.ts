import { describe, expect, it } from 'vitest'
import { applySecurityHeaders, contentSecurityPolicy } from '../../cloudflare/security-headers'

const env = { NUXT_SUPABASE_URL: 'https://project.supabase.co' } as Cloudflare.Env

describe('Cloudflare security headers', () => {
  it('enforces a narrow CSP with clickjacking protection', () => {
    const policy = contentSecurityPolicy(env)
    expect(policy).toContain("default-src 'self'")
    expect(policy).toContain("frame-ancestors 'none'")
    expect(policy).toContain("object-src 'none'")
    expect(policy).toContain("connect-src 'self' https://project.supabase.co wss://project.supabase.co")
    expect(policy).toContain("img-src 'self' data: blob: https://project.supabase.co")
    expect(policy).not.toContain('*')
    expect(policy).not.toContain('unsafe-eval')
  })

  it('sets transport, referrer, permissions, MIME, and frame headers', () => {
    const headers = new Headers({ 'X-Powered-By': 'framework' })
    applySecurityHeaders(headers, env)
    expect(headers.get('strict-transport-security')).toBe('max-age=31536000; includeSubDomains')
    expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')
    expect(headers.get('permissions-policy')).toContain('camera=()')
    expect(headers.get('x-content-type-options')).toBe('nosniff')
    expect(headers.get('x-frame-options')).toBe('DENY')
    expect(headers.has('x-powered-by')).toBe(false)
  })
})
