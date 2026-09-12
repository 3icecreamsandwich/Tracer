import { createError, getHeader, setHeader, type H3Event } from 'h3'

export const WEB_AUTH_HANDOFF_COOKIE = '__Secure-tracer-auth-handoff'
export const WEB_AUTH_HANDOFF_COOKIE_PATH = '/api/web/auth/handoff/consume'

const LANDING_ORIGINS = new Set([
  'https://tracerquiz.com',
  'https://www.tracerquiz.com',
])

/** Allow credentialed handoff requests only from Tracer's production landing site. */
export function allowLandingAuthOrigin(event: H3Event) {
  const origin = getHeader(event, 'origin') ?? ''
  if (!LANDING_ORIGINS.has(origin)) {
    throw createError({ statusCode: 403, statusMessage: 'This sign-in handoff is not allowed.' })
  }
  setHeader(event, 'Access-Control-Allow-Origin', origin)
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  setHeader(event, 'Vary', 'Origin')
  setHeader(event, 'Cache-Control', 'private, no-store')
  return origin
}
