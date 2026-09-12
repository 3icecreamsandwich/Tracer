import { describe, expect, it } from 'vitest'
import { BodyTooLarge, readBoundedBody } from '../../cloudflare/bounded-body'

const encode = (text: string) => new TextEncoder().encode(text)
describe('Cloudflare request boundary', () => {
  it('reads split UTF-8 bytes without corrupting text', async () => {
    const bytes = encode('你好')
    const stream = new ReadableStream({ start(c) { c.enqueue(bytes.slice(0, 2)); c.enqueue(bytes.slice(2)); c.close() } })
    expect(new TextDecoder().decode(await readBoundedBody(stream, 6))).toBe('你好')
  })
  it('cancels oversized input before the Nitro adapter buffers it', async () => {
    let cancelled = false
    const stream = new ReadableStream({ start(c) { c.enqueue(encode('12345')) }, cancel() { cancelled = true } })
    await expect(readBoundedBody(stream, 4)).rejects.toBeInstanceOf(BodyTooLarge)
    expect(cancelled).toBe(true)
  })
  it('handles empty and interrupted bodies', async () => {
    expect(await readBoundedBody(null, 1)).toHaveLength(0)
    const stream = new ReadableStream<Uint8Array>({ start(c) { c.error(new Error('aborted')) } })
    await expect(readBoundedBody(stream, 1)).rejects.toThrow('aborted')
  })
})
