import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({
  body: {} as any,
  rpc: vi.fn(),
  auth: vi.fn(),
}))
vi.mock('../../server/utils/web-auth', () => ({ authenticatedWebClient: state.auth }))
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
    state.auth.mockResolvedValue({ rpc: state.rpc })
    state.rpc.mockResolvedValue({ data: [{ provider_id: 'openai', api_key: 'server-secret' }] })
    state.body = { url: 'https://api.openai.com/v1/responses', method: 'POST', headers: { authorization: 'Bearer attacker', 'x-api-key': 'attacker' }, body: '{"input":"hello"}' }
  })
  it('uses the account key and streams a successful response', async () => {
    const upstream = new Response('data: hello\n\n', { headers: { 'content-type': 'text/event-stream' } })
    const fetch = vi.fn().mockResolvedValue(upstream)
    vi.stubGlobal('fetch', fetch)
    expect(await handler({} as any)).toBe(upstream.body)
    const [url, options] = fetch.mock.calls[0]!
    expect(url.href).toBe(state.body.url)
    expect(options.headers.get('authorization')).toBe('Bearer server-secret')
    expect(options.headers.get('x-api-key')).toBeNull()
    expect(options.redirect).toBe('error')
    expect(options.body).toBe(state.body.body)
  })
  it('rejects arbitrary destinations before reading provider secrets', async () => {
    state.body.url = 'http://127.0.0.1/private'
    await expect(handler({} as any)).rejects.toMatchObject({ statusCode: 400 })
    expect(state.rpc).not.toHaveBeenCalled()
  })
  it('does not return upstream error bodies containing secrets', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('server-secret', { status: 401 })))
    const result = await handler({} as any)
    expect(JSON.stringify(result)).not.toContain('server-secret')
    expect(JSON.stringify(result)).toContain('401')
  })
})
