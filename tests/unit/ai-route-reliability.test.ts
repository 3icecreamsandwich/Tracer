import { afterEach, describe, expect, it, vi } from 'vitest'
import type { LanguageModelV4, LanguageModelV4StreamPart } from '@ai-sdk/provider'
import { generateText, streamText } from 'ai'
import { createRoutedModel } from '../../src/composables/ai/registry/route'
import { checkedAiText } from '../../src/composables/ai/stream'
import { streamGroundedChatText } from '../../src/composables/ai/chat'
import { streamFactCheckText } from '../../src/composables/ai/fact-check'
import { normalizeAiError } from '../../src/composables/ai/ux-errors'

const usage = { inputTokens: { total: 1, noCache: 1, cacheRead: 0, cacheWrite: 0 }, outputTokens: { total: 1, text: 1, reasoning: 0 } }
const finish: LanguageModelV4StreamPart = { type: 'finish', finishReason: { unified: 'stop', raw: 'stop' }, usage }
function text(value: string): LanguageModelV4StreamPart[] {
  return [{ type: 'text-start', id: 't' }, { type: 'text-delta', id: 't', delta: value }, { type: 'text-end', id: 't' }, finish]
}
function model(parts: LanguageModelV4StreamPart[], answer = 'ok'): LanguageModelV4 {
  return {
    specificationVersion: 'v4', provider: 'fixture', modelId: 'fixture', supportedUrls: {},
    doGenerate: vi.fn(async () => ({ content: [{ type: 'text', text: answer }], finishReason: { unified: 'stop', raw: 'stop' }, usage, warnings: [] })),
    doStream: vi.fn(async () => ({ stream: new ReadableStream({ start(controller) { parts.forEach(part => controller.enqueue(part)); controller.close() } }) })),
  }
}
async function answer(route: LanguageModelV4, signal?: AbortSignal) {
  const result = streamText({ model: route, prompt: 'hello', abortSignal: signal, maxRetries: 0, onError: () => {} })
  let content = ''
  for await (const chunk of checkedAiText(result.fullStream, signal)) content += chunk
  return content
}
function routed(primary: LanguageModelV4, fallback = model(text('fallback')), timeouts?: { totalMs: number; firstTextMs: number; idleMs: number }) {
  const resolve = vi.fn(async (id: string) => id === 'primary' ? primary : fallback)
  return { route: createRoutedModel(['primary', 'fallback'], resolve, timeouts), resolve, fallback }
}

afterEach(() => vi.useRealTimers())
describe('AI request reliability through the installed SDK', () => {
  it.each([401, 403, 404, 408, 429, 500, 503])('falls back on SDK statusCode %i', async statusCode => {
    const primary = model([])
    vi.mocked(primary.doGenerate).mockRejectedValue(Object.assign(new Error('provider failed'), { statusCode }))
    const { route, resolve } = routed(primary)
    expect((await generateText({ model: route, prompt: 'hello', maxRetries: 0 })).text).toBe('ok')
    expect(resolve.mock.calls.map(call => call[0])).toEqual(['primary', 'fallback'])
  })

  it('does not retry rejected input', async () => {
    const primary = model([])
    vi.mocked(primary.doGenerate).mockRejectedValue(Object.assign(new Error('bad input'), { statusCode: 400 }))
    const { route, resolve } = routed(primary)
    await expect(generateText({ model: route, prompt: 'hello', maxRetries: 0 })).rejects.toThrow('bad input')
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('recovers from a stream error before text without leaking the failed prelude', async () => {
    const { route } = routed(model([{ type: 'text-start', id: 'discarded' }, { type: 'error', error: { statusCode: 429 } }]))
    expect(await answer(route)).toBe('fallback')
  })

  it('falls back on an empty answer for both streaming and generation', async () => {
    const { route } = routed(model([finish], ''))
    expect(await answer(route)).toBe('fallback')
    expect((await generateText({ model: route, prompt: 'hello' })).text).toBe('ok')
  })

  it('surfaces a terminal empty response instead of successful blank output', async () => {
    const route = createRoutedModel(['empty'], async () => model([finish], ''))
    await expect(answer(route)).rejects.toThrow('returned no answer')
  })

  it('keeps partial text and exposes an interruption without calling the fallback', async () => {
    const { route, resolve } = routed(model([...text('partial').slice(0, 2), { type: 'error', error: new Error('connection interrupted') }]))
    const result = streamText({ model: route, prompt: 'hello', maxRetries: 0, onError: () => {} })
    let content = ''
    await expect((async () => { for await (const chunk of checkedAiText(result.fullStream)) content += chunk })()).rejects.toThrow('connection interrupted')
    expect(content).toBe('partial')
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('recovers from a stalled stream even if the provider ignores cancellation', async () => {
    const primary = model([])
    vi.mocked(primary.doStream).mockResolvedValue({ stream: new ReadableStream() })
    const { route } = routed(primary, model(text('fallback')), { totalMs: 1000, firstTextMs: 15, idleMs: 15 })
    expect(await answer(route)).toBe('fallback')
  })

  it('does not route to another provider after user cancellation', async () => {
    const primary = model([])
    vi.mocked(primary.doStream).mockResolvedValue({ stream: new ReadableStream() })
    const { route, resolve } = routed(primary)
    const controller = new AbortController()
    const pending = answer(route, controller.signal)
    setTimeout(() => controller.abort(), 10)
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('bounds generation even when the provider never resolves', async () => {
    const primary = model([])
    vi.mocked(primary.doGenerate).mockReturnValue(new Promise(() => {}))
    const { route, resolve } = routed(primary, undefined, { totalMs: 15, firstTextMs: 10, idleMs: 10 })
    await expect(generateText({ model: route, prompt: 'hello', maxRetries: 0 })).rejects.toMatchObject({ name: 'TimeoutError' })
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('normalizes nested SDK rate-limit and server errors', () => {
    expect(normalizeAiError({ lastError: { statusCode: 429 } }).key).toBe('provider_rate_limited')
    expect(normalizeAiError({ cause: { statusCode: 503 } }).message).toContain('503')
  })

  it('does not evade a provider content filter through fallback', async () => {
    const { route, resolve } = routed(model([{ ...finish, finishReason: { unified: 'content-filter', raw: 'content_filter' } }]))
    await expect(answer(route)).rejects.toThrow('filtered')
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it.each(['error', 'missing'])('reports a %s finish after partial output', async kind => {
    const parts = text('partial').slice(0, 3)
    if (kind === 'error') parts.push({ ...finish, finishReason: { unified: 'error', raw: 'error' } })
    const { route, resolve } = routed(model(parts))
    await expect(answer(route)).rejects.toThrow('interrupted')
    expect(resolve).toHaveBeenCalledTimes(1)
  })


  it.each([401, 403, 404, 408, 429, 500, 503])('recovers from streaming HTTP %i exactly once', async statusCode => {
    const primary = model([])
    vi.mocked(primary.doStream).mockRejectedValue(Object.assign(new Error('provider failed'), { statusCode }))
    const { route, resolve, fallback } = routed(primary)
    expect(await answer(route)).toBe('fallback')
    expect(resolve.mock.calls.map(call => call[0])).toEqual(['primary', 'fallback'])
    expect(primary.doStream).toHaveBeenCalledTimes(1)
    expect(fallback.doStream).toHaveBeenCalledTimes(1)
  })

  it('times out a stalled partial answer without appending a fallback', async () => {
    const primary = model([])
    vi.mocked(primary.doStream).mockResolvedValue({ stream: new ReadableStream({ start(controller) {
      text('partial').slice(0, 2).forEach(part => controller.enqueue(part))
    } }) })
    const { route, resolve } = routed(primary, undefined, { totalMs: 1000, firstTextMs: 50, idleMs: 15 })
    await expect(answer(route)).rejects.toMatchObject({ name: 'TimeoutError' })
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('recovers when resolving the first provider stalls', async () => {
    const resolve = vi.fn((id: string) => id === 'primary' ? new Promise<LanguageModelV4>(() => {}) : Promise.resolve(model(text('fallback'))))
    const route = createRoutedModel(['primary', 'fallback'], resolve, { totalMs: 1000, firstTextMs: 15, idleMs: 15 })
    expect(await answer(route)).toBe('fallback')
    expect(resolve).toHaveBeenCalledTimes(2)
  })

})


const featureStreams = [
  ['Chat', (route: LanguageModelV4, signal?: AbortSignal) => streamGroundedChatText({ model: route, system: 'Answer briefly', messages: [{ role: 'user', content: 'Hello' }], abortSignal: signal })],
  ['Fact Check', (route: LanguageModelV4, signal?: AbortSignal) => streamFactCheckText({ model: route, system: 'Check facts', prompt: 'Water is H2O', abortSignal: signal })],
] as const

describe.each(featureStreams)('%s streaming entry point', (_name, start) => {
  async function consume(route: LanguageModelV4, signal?: AbortSignal) {
    const result = await start(route, signal)
    let text = ''
    for await (const chunk of result.textStream) text += chunk
    return text
  }

  it('uses a fallback after an answerless primary', async () => {
    const { route, resolve } = routed(model([finish], ''))
    expect(await consume(route)).toBe('fallback')
    expect(resolve).toHaveBeenCalledTimes(2)
  })

  it('never reports whitespace as a successful response', async () => {
    const route = createRoutedModel(['blank'], async () => model(text(' \n\t')))
    await expect(consume(route)).rejects.toThrow('returned no answer')
  })

  it('rejects reasoning without an answer', async () => {
    const route = createRoutedModel(['reasoning'], async () => model([
      { type: 'reasoning-start', id: 'r' }, { type: 'reasoning-delta', id: 'r', delta: 'Thinking' }, { type: 'reasoning-end', id: 'r' }, finish,
    ]))
    await expect(consume(route)).rejects.toThrow('returned no answer')
  })

  it('surfaces post-response errors after preserving delivered text', async () => {
    const { route, resolve } = routed(model([...text('partial').slice(0, 2), { type: 'error', error: new Error('interrupted transport') }]))
    const result = await start(route)
    let content = ''
    await expect((async () => { for await (const chunk of result.textStream) content += chunk })()).rejects.toThrow('interrupted transport')
    expect(content).toBe('partial')
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  it('respects cancellation without retrying another provider', async () => {
    const primary = model([])
    vi.mocked(primary.doStream).mockResolvedValue({ stream: new ReadableStream() })
    const { route, resolve } = routed(primary)
    const controller = new AbortController()
    const pending = consume(route, controller.signal)
    setTimeout(() => controller.abort(), 10)
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(resolve).toHaveBeenCalledTimes(1)
  })
})

describe('live Ollama wire format compatibility',()=>{
  async function ollamaRoute(records:unknown[],fallback=model(text('fallback'))) {
    const {createOllama}=await import('ollama-ai-provider-v2')
    const {wrapLanguageModel}=await import('ai')
    const {checkedOllamaResponse}=await import('../../src/composables/ai/registry/ollama-stream')
    const upstream=new Response(records.map(record=>JSON.stringify(record)).join('\n')+'\n',{headers:{'content-type':'application/json'}})
    const primary=wrapLanguageModel({model:createOllama({fetch:async()=>checkedOllamaResponse(upstream)})('gpt-oss:20b'),middleware:[]})
    return {route:createRoutedModel(['ollama','fallback'],async id=>id==='ollama'?primary:fallback),fallback}
  }
  const record=(content:string,done=false)=>({model:'gpt-oss:20b',created_at:'2026-10-27T00:00:00Z',message:{role:'assistant',content},done,...(done?{done_reason:'stop'}:{})})
  it('accepts live application/json NDJSON through the installed adapter',async()=>{
    const {route}=await ollamaRoute([record('OK'),record('',true)])
    expect(await answer(route)).toBe('OK')
  })
  it('falls back on an in-band error before text even with application/json',async()=>{
    const {route}=await ollamaRoute([{error:'temporarily unavailable'}])
    expect(await answer(route)).toBe('fallback')
  })
  it('rejects a truncated application/json stream and preserves its answer',async()=>{
    const {route,fallback}=await ollamaRoute([record('partial')])
    const result=streamText({model:route,prompt:'hello',maxRetries:0,onError:()=>{}})
    let received=''
    await expect((async()=>{for await(const chunk of checkedAiText(result.fullStream)) received+=chunk})()).rejects.toThrow('interrupted')
    expect(received).toBe('partial');expect(fallback.doStream).not.toHaveBeenCalled()
  })
  it.each(['Load failed','error sending request for url (https://ollama.com/api/chat)'])('falls back on native/WebKit transport errors: %s',async message=>{
    const primary=model([]);vi.mocked(primary.doStream).mockRejectedValue(new TypeError(message))
    expect(await answer(routed(primary).route)).toBe('fallback')
  })
})
