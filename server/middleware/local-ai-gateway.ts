import { defineEventHandler, getRequestURL, proxyRequest } from 'h3'
import { webBindings } from '../utils/web-config'

export default defineEventHandler(event => {
  const request = getRequestURL(event)
  if (!request.pathname.startsWith('/api/ai/')) return
  // Never override a deployed gateway or an explicitly configured local one.
  if (webBindings(event) || process.env.BUILTIN_AI_ENABLED !== undefined) return
  if (!['localhost', '127.0.0.1', '[::1]'].includes(request.hostname)) return
  const gateway = new URL(useRuntimeConfig(event).aiGatewayUrl)
  if (gateway.protocol !== 'https:' || gateway.origin === request.origin) return
  const target = `${gateway.href.replace(/\/$/, '')}${request.pathname}${request.search}`
  // h3 forwards the user's Authorization header and streams the response.
  // Local previews need no duplicate provider or accounting credentials.
  return proxyRequest(event, target, { fetchOptions: { redirect: 'manual' } })
})
