// Deterministic provider failures at the transport boundary; no live credentials.
export async function fixtureFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  init?.signal?.throwIfAborted()
  const url = String(input)
  const scenario = localStorage.getItem('ai-fixture-scenario') || 'recover'
  const ollama = url.includes('ollama.com')
  if (ollama && scenario === 'recover') return Response.json({ error: 'Provider quota exhausted' }, { status: 429 })
  if (scenario === 'error') return Response.json({ error: { message: 'Provider unavailable' } }, { status: 503 })
  if (scenario === 'partial' && ollama) return new Response(
    JSON.stringify({ model: 'gpt-oss:20b', created_at: '2026-01-01T00:00:00Z', message: { role: 'assistant', content: 'Partial answer preserved.' }, done: false }) + '\n' + JSON.stringify({ error: 'network connection lost' }) + '\n',
    { headers: { 'content-type': 'application/x-ndjson' } },
  )
  const value = scenario === 'empty' ? '' : 'Recovered answer from fallback.'
  if (ollama) return new Response(JSON.stringify({ model: 'gpt-oss:20b', created_at: '2026-01-01T00:00:00Z', message: { role: 'assistant', content: value }, done: true, done_reason: 'stop' }) + '\n', { headers: { 'content-type': 'application/x-ndjson' } })
  const result = { candidates: [{ content: { role: 'model', parts: [{ text: value }] }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 2, totalTokenCount: 3 } }
  return url.includes('streamGenerateContent')
    ? new Response(`data: ${JSON.stringify(result)}\n\n`, { headers: { 'content-type': 'text/event-stream' } })
    : Response.json(result)
}
