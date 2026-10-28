import { describe,it,expect,vi,afterEach } from 'vitest'
import { runBuiltin } from '../../server/utils/ai/run'
import type { BuiltinRequest } from '../../src/composables/ai/builtin/types'
import type { Candidate } from '../../server/utils/ai/config'
import { cloudflareModel } from '../../server/utils/ai/workers-ai'
import { streamText } from 'ai'
import { checkedAiText } from '../../src/composables/ai/stream'
const candidates:Candidate[]=[0,1,2].map(n=>({id:`GROQ_KEY_${n}`,provider:'groq',model:'openai/gpt-oss-20b',group:`groq:${n}`,key:`secret-${n}`,rpm:30,rpd:100,tpm:100000,tpd:1000000,concurrency:1,context:100000,resetTimezone:'UTC',verifiedUntil:'2099-01-01'}))
function context(){
 let attempt=0
 const call=vi.fn(async(action:string,args:any={})=>{
  if(action==='claim')return {keyId:candidates[attempt++]!.id}
  if(action==='usage')return {remaining:64,limit:65,used:1,reserved:0,available:true}
  return {ok:true}
 })
 return {store:{call},candidates,env:{}}
}
const chat={requestId:crypto.randomUUID(),sessionId:crypto.randomUUID(),operation:'chat',input:{context:'Water is H2O',messages:[{role:'user',content:'What is water?'}]}} as BuiltinRequest
function sse(text:string,error=false){return new Response([
 `data: ${JSON.stringify({id:'test',created:0,model:'fixture',choices:[{index:0,delta:{content:text},finish_reason:null}]})}\n\n`,
 error?`data: ${JSON.stringify({error:{message:'upstream secret-0',type:'server_error'}})}\n\n`:`data: ${JSON.stringify({id:'test',created:0,model:'fixture',choices:[{index:0,delta:{},finish_reason:'stop'}]})}\n\ndata: [DONE]\n\n`,
].join(''),{headers:{'content-type':'text/event-stream'}})}
async function collect(request:BuiltinRequest,ctx= context(),signal=new AbortController().signal){const events=[];for await(const e of runBuiltin(request,ctx,signal))events.push(e);return {events,ctx}}
afterEach(()=>vi.unstubAllGlobals())
describe('built-in gateway through real provider adapters',()=>{
 it('recovers from exhausted providers within one reservation and charge',async()=>{
  const fetch=vi.fn().mockResolvedValueOnce(Response.json({error:'quota'},{status:429,headers:{'retry-after':'120'}})).mockResolvedValueOnce(sse('H2O'))
  vi.stubGlobal('fetch',fetch)
  const {events,ctx}=await collect(chat)
  expect(events.filter(e=>e.type==='delta')).toEqual([{type:'delta',text:'H2O'}])
  expect(ctx.store.call.mock.calls.filter(c=>c[0]==='reserve')).toHaveLength(1)
  expect(ctx.store.call.mock.calls.filter(c=>c[0]==='charge')).toHaveLength(1)
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(ctx.store.call).toHaveBeenCalledWith('report',expect.objectContaining({status:429,retryAfter:120}))
 })
 it('does not switch providers after partial text and never exposes their error body',async()=>{
  const fetch=vi.fn().mockResolvedValue(sse('partial',true));vi.stubGlobal('fetch',fetch)
  const ctx=context(),events=[]
  await expect((async()=>{for await(const event of runBuiltin(chat,ctx,new AbortController().signal))events.push(event)})()).rejects.toThrow('temporarily unavailable')
  expect(events).toContainEqual({type:'delta',text:'partial'})
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(ctx.store.call).toHaveBeenCalledWith('finish',expect.objectContaining({charge:true,success:false,text:'partial'}))
 })
 it('bounds failed upstream attempts and refunds an answerless action',async()=>{
  const fetch=vi.fn().mockResolvedValue(Response.json({error:{message:'secret-0'}},{status:503}));vi.stubGlobal('fetch',fetch)
  const ctx=context()
  await expect(collect(chat,ctx)).rejects.toThrow('temporarily unavailable')
  expect(fetch).toHaveBeenCalledTimes(3)
  expect(ctx.store.call.mock.calls.some(c=>c[0]==='charge')).toBe(false)
  expect(ctx.store.call).toHaveBeenCalledWith('finish',expect.objectContaining({charge:false,success:false}))
 })
 it('repairs an invalid grade on the server without another allowance reservation',async()=>{
  const fetch=vi.fn().mockImplementation(async()=>Response.json({id:'test',created:0,model:'fixture',choices:[{index:0,message:{role:'assistant',content:fetch.mock.calls.length===1?'maybe':'Yes:Correct'},finish_reason:'stop'}]}))
  vi.stubGlobal('fetch',fetch)
  const {events,ctx}=await collect({...chat,operation:'grade',input:{question:'Water?',referenceAnswer:'H2O',studentAnswer:'H2O'}})
  expect(events).toContainEqual({type:'result',text:'Yes:Correct'})
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(ctx.store.call.mock.calls.filter(c=>c[0]==='reserve')).toHaveLength(1)
  expect(ctx.store.call.mock.calls.filter(c=>c[0]==='charge')).toHaveLength(1)
 })
 it('cancels without trying another provider',async()=>{
  const controller=new AbortController()
  vi.stubGlobal('fetch',vi.fn(async()=>{controller.abort();throw new DOMException('cancelled','AbortError')}))
  const ctx=context()
  await expect(collect(chat,ctx,controller.signal)).rejects.toThrow('cancelled')
  expect(ctx.store.call.mock.calls.filter(c=>c[0]==='claim')).toHaveLength(1)
 })
 it('adapts native Workers AI SSE to a checked text response',async()=>{
  const binding={run:vi.fn(async()=>new Response('data: {"response":"Water"}\n\ndata: [DONE]\n\n').body)}
  const result=streamText({model:cloudflareModel('granite',binding),prompt:'water',maxRetries:0,onError:()=>{}})
  let text='';for await(const chunk of checkedAiText(result.fullStream))text+=chunk
  expect(text).toBe('Water')
 })
})

it('preserves the bounded answer budget and disables OpenRouter hidden reasoning',async()=>{
 const pinned={...candidates[0]!,provider:'openrouter',model:'nvidia/nemotron-3.5-lightning:free'}
 const fetch=vi.fn().mockResolvedValue(sse('H2O'));vi.stubGlobal('fetch',fetch)
 const ctx={...context(),candidates:[pinned]}
 await collect(chat,ctx)
 const body=JSON.parse(fetch.mock.calls[0]![1].body)
 expect(body).toMatchObject({model:pinned.model,max_tokens:2048,reasoning:{enabled:false}})
 expect(body.messages.at(-1)).toMatchObject({role:'user',content:'What is water?'})
})

it('normalizes the observed angle-bracket grade without spending a repair attempt',async()=>{
 const fetch=vi.fn().mockResolvedValue(Response.json({id:'test',created:0,model:'fixture',choices:[{index:0,message:{role:'assistant',content:'<Yes>: The answer matches.\nThe formula is correct.'},finish_reason:'stop'}]}))
 vi.stubGlobal('fetch',fetch)
 const {events,ctx}=await collect({...chat,operation:'grade',input:{question:'Water?',referenceAnswer:'H2O',studentAnswer:'H2O'}})
 expect(events).toContainEqual({type:'result',text:'Yes:The answer matches. The formula is correct.'})
 expect(fetch).toHaveBeenCalledTimes(1)
 expect(ctx.store.call.mock.calls.filter(c=>c[0]==='reserve')).toHaveLength(1)
 expect(ctx.store.call.mock.calls.filter(c=>c[0]==='charge')).toHaveLength(1)
})
