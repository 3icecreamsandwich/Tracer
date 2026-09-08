import { EventEmitter } from 'node:events'
import { describe, expect, it } from 'vitest'
import type { H3Event } from 'h3'
import { readWebJson } from '../../server/utils/web-body'

function request(headers: Record<string, string> = { 'content-type': 'application/json' }) {
  const req = Object.assign(new EventEmitter(), { headers })
  const event = { node: { req } } as unknown as H3Event
  return { req, event }
}

describe('web request body limits', () => {
  it('parses JSON split across network chunks', async () => {
    const { event, req } = request()
    const result = readWebJson(event, 100)
    req.emit('data', Buffer.from('{"text":'))
    req.emit('data', Buffer.from('"hello"}'))
    req.emit('end')
    await expect(result).resolves.toEqual({ text: 'hello' })
  })
  it('rejects oversized chunked input without requiring Content-Length', async () => {
    const { event, req } = request()
    const result = readWebJson(event, 4)
    req.emit('data', Buffer.from('12345'))
    req.emit('data', Buffer.from('ignored'))
    req.emit('end')
    await expect(result).rejects.toMatchObject({ statusCode: 413 })
  })
  it('rejects large declared bodies before reading', async () => {
    const { event } = request({ 'content-type': 'application/json', 'content-length': '1000' })
    await expect(readWebJson(event, 4)).rejects.toMatchObject({ statusCode: 413 })
  })
  it('rejects malformed JSON and form requests', async () => {
    const { event, req } = request()
    const result = readWebJson(event, 100)
    req.emit('data', Buffer.from('{'))
    req.emit('end')
    await expect(result).rejects.toMatchObject({ statusCode: 400 })
    await expect(readWebJson(request({ 'content-type': 'text/plain' }).event, 100)).rejects.toMatchObject({ statusCode: 415 })
  })
})
