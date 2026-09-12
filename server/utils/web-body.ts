import { BodyTooLarge, readBoundedBody } from '../../cloudflare/bounded-body'
import { createError, getHeader, getRequestWebStream, type H3Event } from 'h3'

/** Node hosting: cap bytes before parsing, including chunked requests. */
export async function readWebJson(event: H3Event, limit: number): Promise<any> {
  if (getHeader(event, 'content-type')?.split(';')[0].trim() !== 'application/json') {
    throw createError({ statusCode: 415, statusMessage: 'JSON is required.' })
  }
  const tooLarge = () => createError({ statusCode: 413, statusMessage: 'Request too large.' })
  if (Number(getHeader(event, 'content-length')) > limit) throw tooLarge()
  if (event.context?.cloudflare || event.web?.request) {
    try {
      const bytes = await readBoundedBody(getRequestWebStream(event) ?? null, limit)
      return JSON.parse(new TextDecoder().decode(bytes))
    } catch (error) {
      if (error instanceof BodyTooLarge) throw tooLarge()
      throw createError({ statusCode: 400, statusMessage: 'Invalid JSON.' })
    }
  }
  const bytes = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    let length = 0
    let failed = false
    const request = event.node.req
    request.on('data', (chunk: Buffer) => {
      // Continue draining without retaining bytes after rejecting an oversized body.
      if (failed) return
      length += chunk.length
      if (length > limit) {
        failed = true
        chunks.length = 0
        reject(tooLarge())
      } else chunks.push(chunk)
    })
    request.once('end', () => { if (!failed) resolve(Buffer.concat(chunks, length)) })
    request.once('error', reject)
    request.once('aborted', () => reject(createError({ statusCode: 400, statusMessage: 'Request interrupted.' })))
  })
  try { return JSON.parse(bytes.toString('utf8')) }
  catch { throw createError({ statusCode: 400, statusMessage: 'Invalid JSON.' }) }
}
