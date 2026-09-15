import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  body: {} as any,
  rpc: vi.fn(),
  auth: vi.fn(),
  limit: vi.fn(),
}))
vi.mock('../../server/utils/web-auth', () => ({ authenticatedWebContext: state.auth, limitWebAi: state.limit }))
vi.mock('../../server/utils/web-body', () => ({ readWebJson: async () => state.body }))
vi.stubGlobal('defineEventHandler', (handler: unknown) => handler)
vi.stubGlobal('useRuntimeConfig', () => ({ webAiCompatibleOrigin: '' }))
vi.stubGlobal('createError', (input: any) => Object.assign(new Error(input.statusMessage), input))
vi.stubGlobal('setResponseStatus', vi.fn())
vi.stubGlobal('setHeader', vi.fn())
vi.stubGlobal('sendStream', (_event: unknown, stream: unknown) => stream)
const { default: handler } = await import('../../server/api/web/ai.post')

describe('authenticated web AI forwarding', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    state.auth.mockResolvedValue({ client: { rpc: state.rpc }, userId: 'verified-account' })
    state.limit.mockResolvedValue(undefined)
    state.rpc.mockResolvedValue({ data: [{ provider_id: 'openai', api_key: 'server-secret' }] })
    state.body = { url: 'https://api.openai.com/v1/responses', method: 'POST', headers: { authorization: 'Bearer attacker', 'x-api-key': 'attacker' }, body: '{"input":"hello"}' }
  })
  it('uses the account key and streams a successful response', async () => {
    const upstream = new Response('data: hello\n\n', { headers: { 'content-type': 'text/event-stream' } })
    const fetch = vi.fn().mockResolvedValue(upstream)
    vi.stubGlobal('fetch', fetch)
    expect(await handler({ context: {} } as any)).toBe(upstream.body)
    const [url, options] = fetch.mock.calls[0]!
    expect(url.href).toBe(state.body.url)
    expect(options.headers.get('authorization')).toBe('Bearer server-secret')
    expect(options.headers.get('x-api-key')).toBeNull()
    expect(options.redirect).toBe('manual')
    expect(options.body).toBe(state.body.body)
    expect(state.limit).toHaveBeenCalledWith(expect.anything(), 'verified-account')
  })
  it('rejects arbitrary destinations before reading provider secrets', async () => {
    state.body.url = 'http://127.0.0.1/private'
    await expect(handler({ context: {} } as any)).rejects.toMatchObject({ statusCode: 400 })
    expect(state.rpc).not.toHaveBeenCalled()
  })
  it('does not return upstream error bodies containing secrets', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('server-secret', { status: 401 })))
    const result = await handler({ context: {} } as any)
    expect(JSON.stringify(result)).not.toContain('server-secret')
    expect(JSON.stringify(result)).toContain('401')
  })
  it('rejects provider redirects without following their destination', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 307, headers: { location: 'https://attacker.example/' } })))
    const result = await handler({ context: {} } as any)
    expect(result).toEqual({ error: { message: 'The AI provider redirected unexpectedly. Try again later.' } })
    expect(setResponseStatus).toHaveBeenLastCalledWith(expect.anything(), 502)
  })
  it('logs only a sanitized provider fetch failure', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('network connection lost')))
    await expect(handler({ context: {} } as any)).rejects.toMatchObject({ statusCode: 502 })
    expect(log).toHaveBeenCalledWith(JSON.stringify({
      event: 'web_ai_upstream_error',
      provider: 'openai',
      errorName: 'TypeError',
      errorMessage: 'network connection lost',
    }))
    expect(log.mock.calls.flat().join(' ')).not.toContain('server-secret')
  })
})
