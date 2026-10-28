import { defineEventHandler,createError,setHeader,sendStream } from 'h3'
import { authenticatedWebContext } from '../../utils/web-auth'
import { readWebJson } from '../../utils/web-body'
import { gatewayContext } from '../../utils/ai/store'
import { gatewayUnavailable } from '../../utils/ai/config'
import { parseBuiltinRequest } from '../../utils/ai/contract'
import { runBuiltin } from '../../utils/ai/run'
import { BuiltinAiError } from '../../../src/composables/ai/builtin/types'

export default defineEventHandler(async event=>{
  try {
    const {userId}=await authenticatedWebContext(event)
    const request=parseBuiltinRequest(await readWebJson(event,256*1024))
    const context=await gatewayContext(event,userId)
    if(!context.enabled || !context.candidates.length) gatewayUnavailable()
    const controller=new AbortController()
    const upstream=event.context.cloudflare?.request?.signal ?? event.web?.request?.signal
    upstream?.addEventListener('abort',()=>controller.abort(),{once:true})
    event.node?.res?.once('close',()=>controller.abort())
    const iterator=runBuiltin(request,context,controller.signal)
    // Start admission before sending headers, so quota failures have proper
    // HTTP status codes. Later interruptions travel as typed stream events.
    const first=await iterator.next()
    let initial=true
    const encoder=new TextEncoder()
    setHeader(event,'Content-Type','text/event-stream; charset=utf-8')
    setHeader(event,'X-Accel-Buffering','no')
    setHeader(event,'Cache-Control','private, no-store')
    return sendStream(event,new ReadableStream({
      async pull(stream) {
        try {
          const next=initial?first:await iterator.next(); initial=false
          if(next.done) stream.close()
          else stream.enqueue(encoder.encode(`data: ${JSON.stringify(next.value)}\n\n`))
        } catch(error) {
          const safe=error instanceof BuiltinAiError?error:new BuiltinAiError('unavailable','Built-in AI could not finish this request. Try again later.')
          stream.enqueue(encoder.encode(`data: ${JSON.stringify({type:'error',code:safe.code,message:safe.message,retryAfter:safe.retryAfter})}\n\n`))
          stream.close()
        }
      },
      async cancel() {controller.abort(); await iterator.return()},
    },{highWaterMark:0}))
  } catch(error) {
    if(error instanceof BuiltinAiError) {
      if(error.retryAfter) setHeader(event,'Retry-After',String(error.retryAfter))
      throw createError({statusCode:error.statusCode,statusMessage:error.message,data:{code:error.code,message:error.message,retryAfter:error.retryAfter}})
    }
    // Known input/auth H3 errors are already sanitized by their source.
    if((error as any)?.statusCode && (error as any).statusCode<500) throw error
    throw createError({statusCode:503,statusMessage:'Built-in AI is temporarily unavailable.'})
  }
})
