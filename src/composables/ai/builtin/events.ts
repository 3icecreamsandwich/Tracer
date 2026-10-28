import { BuiltinAiError,type BuiltinEvent } from './types'

export async function* readBuiltinEvents(response:Response,signal?:AbortSignal):AsyncGenerator<BuiltinEvent> {
  if(!response.body) throw new BuiltinAiError('empty_response','Built-in AI returned no answer.')
  const reader=response.body.getReader(), decoder=new TextDecoder()
  let pending='',hasText=false
  const interrupted=()=>new BuiltinAiError('interrupted',hasText?'The AI response was interrupted. Any partial answer has been kept.':'The AI connection ended before an answer arrived. Try again.')
  try {
    while(true) {
      signal?.throwIfAborted()
      const next=await reader.read()
      pending+=next.done?decoder.decode()+'\n':decoder.decode(next.value,{stream:true})
      let boundary:number
      while((boundary=pending.indexOf('\n'))>=0) {
        const line=pending.slice(0,boundary).trim(); pending=pending.slice(boundary+1)
        if(!line.startsWith('data:')) continue
        let event:BuiltinEvent
        try {event=JSON.parse(line.slice(5))} catch {throw interrupted()}
        if(event.type==='error') throw new BuiltinAiError(event.code,event.message,503,event.retryAfter||0)
        if(event.type==='delta'||event.type==='result') {
          if(typeof event.text!=='string') throw interrupted()
          hasText ||= !!event.text.trim()
          yield event
        }
        if(event.type==='done') {
          if(!hasText) throw new BuiltinAiError('empty_response','Built-in AI returned no answer. Try again.')
          yield event
          return
        }
      }
      if(pending.length>1024*1024) throw new BuiltinAiError('interrupted','The AI response was too large.')
      if(next.done) break
    }
    throw interrupted()
  } catch(error) {
    signal?.throwIfAborted()
    if(error instanceof BuiltinAiError) throw error
    throw interrupted()
  } finally {void reader.cancel().catch(()=>{}); reader.releaseLock()}
}
