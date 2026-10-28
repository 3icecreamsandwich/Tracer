import type { LanguageModelV4,LanguageModelV4CallOptions,LanguageModelV4StreamPart } from '@ai-sdk/provider'
import { InterruptedAiResponseError } from '../../../src/composables/ai/registry/route'
function usage(raw:any={}) {return {inputTokens:{total:raw.prompt_tokens,noCache:undefined,cacheRead:undefined,cacheWrite:undefined},outputTokens:{total:raw.completion_tokens,text:undefined,reasoning:undefined}}}
function messages(options:LanguageModelV4CallOptions) {
  return options.prompt.map(message=>({role:message.role,content:typeof message.content==='string'?message.content:message.content.map(part=>{
    if(part.type!=='text') throw new Error('Built-in AI accepts text only')
    return part.text
  }).join('\n')}))
}
export function cloudflareModel(modelId:string,binding:any):LanguageModelV4 {
  return {specificationVersion:'v4',provider:'workers-ai',modelId,supportedUrls:{},
    async doGenerate(options) {
      const result=await binding.run(modelId,{messages:messages(options),max_tokens:options.maxOutputTokens,stream:false},{signal:options.abortSignal})
      return {content:[{type:'text',text:result.response||''}],finishReason:{unified:'stop',raw:'stop'},usage:usage(result.usage),warnings:[]}
    },
    async doStream(options) {
      const raw=await binding.run(modelId,{messages:messages(options),max_tokens:options.maxOutputTokens,stream:true},{signal:options.abortSignal})
      if(!(raw instanceof ReadableStream)) throw new InterruptedAiResponseError()
      const reader=raw.getReader(),decoder=new TextDecoder()
      async function* parts():AsyncGenerator<LanguageModelV4StreamPart,void> {
        let pending='',done=false
        yield {type:'stream-start',warnings:[]};yield {type:'text-start',id:'answer'}
        try {
          while(!done) {
            options.abortSignal?.throwIfAborted()
            const next=await reader.read()
            pending+=next.done?decoder.decode():decoder.decode(next.value,{stream:true})
            let newline:number
            while((newline=pending.indexOf('\n'))>=0) {
              const line=pending.slice(0,newline).trim();pending=pending.slice(newline+1)
              if(!line.startsWith('data:')) continue
              const value=line.slice(5).trim()
              if(value==='[DONE]') {done=true;break}
              const data=JSON.parse(value)
              if(data.error || data.errors?.length) throw new InterruptedAiResponseError()
              if(typeof data.response==='string') yield {type:'text-delta',id:'answer',delta:data.response}
            }
            if(next.done && !done) throw new InterruptedAiResponseError()
            if(pending.length>1024*1024) throw new InterruptedAiResponseError()
          }
          yield {type:'text-end',id:'answer'};yield {type:'finish',finishReason:{unified:'stop',raw:'stop'},usage:usage()}
        } finally {void reader.cancel().catch(()=>{})}
      }
      const iterator=parts()
      return {stream:new ReadableStream({
        async pull(controller) {
          try {const next=await iterator.next();if(next.done) controller.close();else controller.enqueue(next.value)}
          catch(error) {controller.enqueue({type:'error',error});controller.close()}
        },
        async cancel() {await reader.cancel();await iterator.return()},
      },{highWaterMark:0})}
    },
  }
}
