import {containsWaterFormula} from './reference'
// Provider eligibility checks use the exact server pipeline and bounded repairs.
// Only accounting is in-memory here: these are operator probes, not user actions.
import{writeFile,mkdir}from'node:fs/promises'
import{runBuiltin}from'../../../server/utils/ai/run'
import{parseBuiltinRequest}from'../../../server/utils/ai/contract'
const id='nvidia/nemotron-3.5-lightning:free',key=process.env.OPENROUTER_KEY_0
if(!key)throw new Error('OpenRouter key required')
const inventory=await fetch('https://openrouter.ai/api/v1/models',{headers:{Authorization:`Bearer ${key}`},redirect:'error',signal:AbortSignal.timeout(15000)}).then(r=>r.json()) as any
const listed=inventory.data?.find((m:any)=>m.id===id)
if(!listed||Number(listed.pricing.prompt)!==0||Number(listed.pricing.completion)!==0||Number(listed.pricing.request||0)!==0)throw new Error('Pinned free model is unavailable')
const originalFetch=globalThis.fetch
let currentOperation='inventory',sample=0
// Private diagnostics contain synthetic fixture output only, never app/user data.
globalThis.fetch=(async(input:any,init?:RequestInit)=>{
 const response=await originalFetch(input,init)
 if(String(input).startsWith('https://openrouter.ai/api/v1/chat/completions')&&['generate','grade'].includes(currentOperation)) {
  const body=JSON.parse(String(init?.body||'{}'))
  if(!body.stream&&response.ok) {
   const json=await response.clone().json() as any
   await mkdir('/tmp/tracer-ai-staging',{recursive:true,mode:0o700})
   await writeFile(`/tmp/tracer-ai-staging/operator-${currentOperation}-${++sample}.txt`,json.choices?.[0]?.message?.content||'',{mode:0o600})
  }
 }
 return response
})as typeof fetch
const tests=[
 {operation:'chat',input:{context:'Water has the formula H2O.',messages:[{role:'user',content:'What is the formula of water? Reply briefly.'}]}},
 {operation:'fact-check',input:{draft:{title:'Water',cards:[{front:'Water formula',back:'H2O'}]},language:'en'}},
 {operation:'generate',input:{sources:[{id:'water',filename:'water.txt',kind:'text',text:'Water has the formula H2O. It consists of hydrogen and oxygen. Pure water freezes at 0 degrees Celsius at standard atmospheric pressure.',method:'text'}],instructions:'Create two flashcards and a short study guide.'}},
 {operation:'grade',input:{question:'What is the formula of water?',referenceAnswer:'H2O',studentAnswer:'H2O'}},
]
const results=[]
for(const test of tests.filter(test=>!process.argv.includes('--grade-only')||test.operation==='grade')){
 currentOperation=test.operation
 const request=parseBuiltinRequest({...test,requestId:crypto.randomUUID(),sessionId:crypto.randomUUID()})
 let unavailable=false,text=''
 const store={async call(action:string,args:any={}){
  if(action==='claim')return unavailable?{}:{keyId:'OPENROUTER_KEY_0'}
  if(action==='report'&&args.status>=400)unavailable=true
  if(action==='usage')return{limit:65,used:1,reserved:0,remaining:64,available:true}
  return{ok:true}
 }}
 const candidate={id:'OPENROUTER_KEY_0',provider:'openrouter',model:id,key,context:65536}
 for await(const event of runBuiltin(request,{store,candidates:[candidate as any],env:{}},AbortSignal.timeout(180000)))if(event.type==='delta'||event.type==='result')text+=event.text
 if(request.operation==='chat'){await mkdir('/tmp/tracer-ai-staging',{recursive:true,mode:0o700});await writeFile('/tmp/tracer-ai-staging/operator-chat.txt',text,{mode:0o600})}
 if(request.operation==='chat'&&!containsWaterFormula(text))throw new Error('Chat failed the synthetic reference check')
 if(request.operation==='grade'&&!/^Yes\s*:/i.test(text))throw new Error('Correct synthetic answer was not graded correctly')
 results.push({operation:request.operation,success:true,outputCharacters:text.length});console.log(JSON.stringify(results.at(-1)))
}
await mkdir('/tmp/tracer-ai-staging',{recursive:true,mode:0o700})
if(results.length===4)await writeFile('/tmp/tracer-ai-staging/model-contracts.json',JSON.stringify({model:id,verifiedAt:new Date().toISOString(),results}),{mode:0o600})
console.log(JSON.stringify({model:id,allContractsPassed:results.length===4}))
