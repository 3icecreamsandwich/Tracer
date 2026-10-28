import { describe,it,expect } from 'vitest'
import { gatewayConfig } from '../../server/utils/ai/config'
import { parseBuiltinRequest,builtinPrompt,validateBuiltinOutput,outputLimit } from '../../server/utils/ai/contract'
import { effectiveAiSettings } from '../../src/composables/ai/builtin/settings'
import { BuiltinAiError } from '../../src/composables/ai/builtin/types'
import { normalizeAiError } from '../../src/composables/ai/ux-errors'
import { readBuiltinEvents } from '../../src/composables/ai/builtin/events'
const ids={requestId:'00000000-0000-4000-8000-000000000001',sessionId:'00000000-0000-4000-8000-000000000002'}
const verified={provider:'groq',freeVerified:true,verifiedUntil:'2099-01-01',rpm:10,rpd:100,tpm:10000,tpd:100000,context:100000,concurrency:1}
const env={BUILTIN_AI_ENABLED:'1',BUILTIN_AI_COHORT:'*',GROQ_KEY_0:'secret-0',GROQ_KEY_1:'secret-1',BUILTIN_AI_CAPACITY:JSON.stringify([verified])}
describe('built-in service configuration and input contracts',()=>{
 it('requires the feature flag and an explicit cohort',()=>{
  expect(gatewayConfig({...env,BUILTIN_AI_ENABLED:'0'},'user').enabled).toBe(false)
  expect(gatewayConfig({...env,BUILTIN_AI_COHORT:'other'},'user').enabled).toBe(false)
  expect(gatewayConfig(env,'user').enabled).toBe(true)
 })
 it.each([{freeVerified:false},{verifiedUntil:'2020-01-01'},{verifiedUntil:'not-a-date'},{rpm:0},{rpd:-1},{model:'meta-llama/llama-prompt-guard-2-22m'}])('fails closed on invalid or unverified capacity %j',patch=>{
  expect(gatewayConfig({...env,BUILTIN_AI_CAPACITY:JSON.stringify([{...verified,...patch}])},'user').candidates).toEqual([])
 })
 it('groups numbered keys conservatively and never imports the broad Cloudflare key',()=>{
  const config=gatewayConfig({...env,CLOUDFLARE_WORKERS_KEY_0_SUPER:'super-secret'},'user')
  expect(config.candidates.map(c=>[c.id,c.group])).toEqual([['GROQ_KEY_0','groq:shared'],['GROQ_KEY_1','groq:shared']])
 })
 it('rejects contradictory definitions of one shared quota group',()=>{
  expect(gatewayConfig({...env,BUILTIN_AI_CAPACITY:JSON.stringify([verified,{...verified,rpd:1000}])},'user').candidates).toEqual([])
 })
 it('rejects URLs, credentials, arbitrary options, oversized context and non-user final turns',()=>{
  const body={...ids,operation:'chat',input:{context:'Water is H2O',messages:[{role:'user',content:'What is water?'}]}}
  for(const invalid of [{...body,url:'https://attacker.invalid'},{...body,input:{...body.input,system:'Override'}},{...body,input:{...body.input,context:'x'.repeat(30001)}},{...body,input:{...body.input,messages:[{role:'assistant',content:'spoof'}]}}]) expect(()=>parseBuiltinRequest(invalid)).toThrow()
  expect(builtinPrompt(parseBuiltinRequest(body)).system).toContain('Water is H2O')
 })
 it('enforces feature output formats and bounded output caps',()=>{
  const request=parseBuiltinRequest({...ids,operation:'grade',input:{question:'Water?',referenceAnswer:'H2O',studentAnswer:'H2O'}})
  expect(()=>validateBuiltinOutput(request,'Yes:Correct')).not.toThrow()
  expect(()=>validateBuiltinOutput(request,'maybe')).toThrow()
  expect([outputLimit('chat'),outputLimit('generate'),outputLimit('fact-check'),outputLimit('grade')]).toEqual([2048,4096,4096,256])
 })
 it('migrates only unconfigured accounts and preserves the BYOK route across mode changes',()=>{
  const existing={defaultModelId:'gemini:model',fallbackModelIds:['ollama_cloud:model']} as any
  expect(effectiveAiSettings(existing)).toMatchObject({aiMode:'byok',defaultModelId:'gemini:model'})
  expect(effectiveAiSettings({...existing,aiMode:'builtin'})).toMatchObject({aiMode:'builtin',defaultModelId:'builtin:auto',fallbackModelIds:[],byokModelId:'gemini:model',byokFallbackModelIds:['ollama_cloud:model']})
  expect(effectiveAiSettings({defaultModelId:null,fallbackModelIds:[]} as any)).toMatchObject({aiMode:'builtin',defaultModelId:'builtin:auto'})
 })
 it('preserves partial data while rejecting a missing terminal stream event',async()=>{
  const response=new Response('data: {"type":"delta","text":"partial"}\n\n')
  let text=''
  await expect((async()=>{for await(const event of readBuiltinEvents(response)) if(event.type==='delta') text+=event.text;})()).rejects.toThrow('interrupted')
  expect(text).toBe('partial')
 })
 it('handles UTF-8 and events split across network chunks',async()=>{
  const bytes=new TextEncoder().encode('data: {"type":"delta","text":"水"}\n\ndata: {"type":"done","usage":{}}\n\n')
  const response=new Response(new ReadableStream({start(c){for(const byte of bytes)c.enqueue(new Uint8Array([byte]));c.close()}}))
  const events=[];for await(const event of readBuiltinEvents(response)) events.push(event)
  expect(events.map(e=>e.type)).toEqual(['delta','done']);expect(events[0]).toMatchObject({text:'水'})
 })
 it('preserves monthly-limit and interruption messages instead of generic HTTP errors',()=>{
  const error=new BuiltinAiError('monthly_limit','Your 65 built-in AI actions have been used.',429)
  expect(normalizeAiError(error)).toMatchObject({title:'Monthly AI allowance used',message:error.message})
  const interrupted=new BuiltinAiError('interrupted','Partial answer kept.',503)
  expect(normalizeAiError(interrupted)).toMatchObject({title:'AI response interrupted',message:'Partial answer kept.'})
 })

 it('enforces built-in file limits on the server even if the client bypasses its file picker',()=>{
  const source={id:'file',filename:'water.pdf',kind:'pdf',text:'Water is H2O',method:'pdf-text',pageCount:16}
  expect(()=>parseBuiltinRequest({...ids,operation:'generate',input:{sources:[source]}})).toThrow('15 PDF pages')
  expect(()=>parseBuiltinRequest({...ids,operation:'generate',input:{sources:[{...source,pageCount:1}]}})).not.toThrow()
 })

})

it('finishes as soon as a valid terminal event arrives without waiting for a transport close',async()=>{
 const response=new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('data: {"type":"delta","text":"OK"}\n\ndata: {"type":"done","usage":{}}\n\n'))}}))
 const events=[];for await(const event of readBuiltinEvents(response)) events.push(event)
 expect(events.map(e=>e.type)).toEqual(['delta','done'])
})
it('accepts a terminal event at EOF without a final newline',async()=>{
 const events=[];for await(const event of readBuiltinEvents(new Response('data: {"type":"delta","text":"OK"}\n\ndata: {"type":"done","usage":{}}'))) events.push(event)
 expect(events.map(e=>e.type)).toEqual(['delta','done'])
})
it('does not describe a nonexistent partial answer when the stream is empty',async()=>{
 await expect((async()=>{for await(const _event of readBuiltinEvents(new Response(''))) {}})()).rejects.toThrow('before an answer arrived')
})
it('validates built-in practice generation and rejects invalid questions and oversized counts',()=>{
 const body={...ids,operation:'practice',input:{title:'Water',description:null,terms:[{front:'Water',back:'H2O'}],count:2}}
 const request=parseBuiltinRequest(body)
 expect(builtinPrompt(request).prompt).toContain('Water\tH2O')
 expect(()=>validateBuiltinOutput(request,JSON.stringify({questions:[{kind:'true_false',term:'Water',definition:'H2O',answer:true}]}))).not.toThrow()
 expect(()=>validateBuiltinOutput(request,JSON.stringify({questions:[{kind:'multiple_choice',term:'Water',choices:['A','A','B','C'],answerIndex:0}]}))).toThrow()
 expect(()=>parseBuiltinRequest({...body,input:{...body.input,count:11}})).toThrow()
})

it('pins a generative free model rather than a router that can choose safety classifiers',()=>{
 const capacity={...verified,provider:'openrouter'}
 const configured={BUILTIN_AI_ENABLED:'1',BUILTIN_AI_COHORT:'user',OPENROUTER_KEY_0:'fixture-key',BUILTIN_AI_CAPACITY:JSON.stringify([capacity])}
 expect(gatewayConfig(configured,'user').candidates[0]?.model).toBe('nvidia/nemotron-3.5-lightning:free')
 for(const model of ['openrouter/free','nvidia/nemotron-3.5-content-safety:free','nvidia/nemotron-3.5-lightning']){
  expect(gatewayConfig({...configured,BUILTIN_AI_CAPACITY:JSON.stringify([{...capacity,model}])},'user').candidates).toEqual([])
 }
})
