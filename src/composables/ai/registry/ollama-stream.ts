// Validate before the adapter, which can discard error records.
export function checkedOllamaResponse(response: Response): Response {
  if (!response.ok || !response.body || !/(?:ndjson|application\/json)/i.test(response.headers.get('content-type') || '')) return response
  const decoder = new TextDecoder()
  let pending = ''
  let done = false
  let model = 'unknown'
  function check(line: string): boolean {
    if (!line.trim()) return true
    let record: any
    try { record = JSON.parse(line) } catch { return false }
    if (!record || typeof record !== 'object' || record.error) return false
    if (typeof record.model === 'string') model = record.model
    if (record.done === true) done = true
    return true
  }
  const reader = response.body.getReader()
  const encoder = new TextEncoder()
  // Carry failure through the adapter as a terminal record. A stream error
  // would discard its queued partial text; the router checks this raw reason.
  const failure = () => encoder.encode(JSON.stringify({ model, created_at: new Date().toISOString(), message: { role: 'assistant', content: '' }, done: true, done_reason: 'error' }) + '\n')
  async function* lines() {
    try {
      while (true) {
        const next = await reader.read()
        pending += next.done ? decoder.decode() : decoder.decode(next.value, { stream: true })
        let newline: number
        while ((newline = pending.indexOf('\n')) >= 0) {
          const line = pending.slice(0, newline)
          pending = pending.slice(newline + 1)
          if (!check(line)) { yield failure(); return }
          // Pull one line at a time: a later error must not discard already
          // delivered text, including lines in the same network chunk.
          yield encoder.encode(line + '\n')
        }
        if (pending.length > 4 * 1024 * 1024) { yield failure(); return }
        if (next.done) {
          if (!check(pending)) { yield failure(); return }
          if (pending) yield encoder.encode(pending)
          if (!done) yield failure()
          return
        }
      }
    } finally { void reader.cancel().catch(() => {}) }
  }
  const iterator = lines()
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const next = await iterator.next()
        if (next.done) controller.close()
        else controller.enqueue(next.value)
      } catch (error) { controller.error(error) }
    },
    async cancel() {
      await reader.cancel()
      await iterator.return()
    },
  }, { highWaterMark: 0 })
  return new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers })
}
