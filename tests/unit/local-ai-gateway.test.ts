import { afterEach, beforeEach, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ proxy:vi.fn(), bindings:vi.fn() }))
vi.mock('h3', () => ({ defineEventHandler:(fn:any)=>fn, getRequestURL:(event:any)=>new URL(event.url), proxyRequest:mocks.proxy }))
vi.mock('../../server/utils/web-config', () => ({webBindings:mocks.bindings}))
import handler from '../../server/middleware/local-ai-gateway'
beforeEach(() => {
  vi.stubEnv('BUILTIN_AI_ENABLED',undefined)
  vi.stubGlobal('useRuntimeConfig',()=>({aiGatewayUrl:'https://app.tracerquiz.com'}))
  mocks.proxy.mockResolvedValue({ok:true}); mocks.bindings.mockReturnValue(undefined)
})
afterEach(()=>{ vi.unstubAllEnvs();vi.unstubAllGlobals();vi.clearAllMocks() })
it('forwards an unconfigured loopback AI request without changing its authenticated request',async()=>{
  const event={url:'http://localhost:3000/api/ai/usage?scope=month',headers:{authorization:'Bearer fixture'}} as any
  await handler(event)
  expect(mocks.proxy).toHaveBeenCalledWith(event,'https://app.tracerquiz.com/api/ai/usage?scope=month',{fetchOptions:{redirect:'manual'}})
})
it.each(['0','1'])('keeps an explicitly configured gateway authoritative (%s)',async value=>{
  vi.stubEnv('BUILTIN_AI_ENABLED',value)
  await handler({url:'http://localhost:3000/api/ai/usage'} as any)
  expect(mocks.proxy).not.toHaveBeenCalled()
})
it('does not forward deployed bindings, public hosts, or unrelated APIs',async()=>{
  await handler({url:'https://app.tracerquiz.com/api/ai/usage'} as any)
  await handler({url:'http://localhost:3000/api/web/credentials'} as any)
  mocks.bindings.mockReturnValue({})
  await handler({url:'http://localhost:3000/api/ai/usage'} as any)
  expect(mocks.proxy).not.toHaveBeenCalled()
})
