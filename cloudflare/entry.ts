// Nitro's installed adapter buffers request bodies; enforce limits before it runs.
import nitro from '../.output-cloudflare/server/index.mjs'
import { BodyTooLarge, readBoundedBody } from './bounded-body'
import { applySecurityHeaders } from './security-headers'

export default {
  async fetch(request: Request, env: Cloudflare.Env, context: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)
    const api = url.pathname.startsWith('/api/')
    const started = Date.now()
    let response: Response
    try {
      if (env.TRACER_MAINTENANCE === '1') {
        response = new Response('Tracer is temporarily unavailable. Please try again shortly.', { status: 503, headers: { 'Retry-After': '300', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
      } else if (request.body) {
        const limit = url.pathname === '/api/web/ai' ? 5 * 1024 * 1024 : 64 * 1024
        if (Number(request.headers.get('content-length')) > limit) throw new BodyTooLarge()
        const bytes = await readBoundedBody(request.body, limit)
        request = new Request(request, { body: bytes })
        response = await nitro.fetch(request, env, context)
      } else {
        response = await nitro.fetch(request, env, context)
      }
    } catch (error) {
      const status = error instanceof BodyTooLarge ? 413 : 500
      response = Response.json({ statusCode: status, statusMessage: status === 413 ? 'Request too large.' : 'Tracer could not complete the request.' }, { status })
    }
    response = new Response(response.body, response)
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    applySecurityHeaders(response.headers, env)
    response.headers.set('X-Tracer-Commit', env.TRACER_BUILD_SHA || 'unknown')
    if (api) response.headers.set('Cache-Control', 'private, no-store')
    else if (url.pathname.startsWith('/_nuxt/') && response.ok) response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    else response.headers.set('Cache-Control', 'no-cache')
    if (api) console.log(JSON.stringify({ event: 'web_request', route: ['/api/web/ai', '/api/web/credentials'].includes(url.pathname) ? url.pathname : '/api/other', status: response.status, durationMs: Date.now() - started }))
    return response
  },
} satisfies ExportedHandler<Cloudflare.Env>
