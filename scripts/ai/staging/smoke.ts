import {containsWaterFormula} from './reference'
import {readFile,writeFile} from 'node:fs/promises'
import assert from 'node:assert/strict'
import {readBuiltinEvents} from '../../../src/composables/ai/builtin/events'
const config=JSON.parse(await readFile('/tmp/tracer-ai-staging/session.json','utf8'))
assert.equal(config.project,'incejztkdiregaaxltiv')
const origin=process.env.TRACER_AI_STAGING_GATEWAY_URL||'http://127.0.0.1:3111'
assert.ok(origin==='http://127.0.0.1:3111'||/^https:\/\/tracer-ai-test\.[a-z0-9-]+\.workers\.dev$/.test(origin),'Only isolated staging gateways are allowed')
const session=config.accounts[0],other=config.accounts[1]
const headers={Authorization:`Bearer ${session.access_token}`,'Content-Type':'application/json'}
const sessionId=crypto.randomUUID(),results:any[]=[]
async function usage(token=session.access_token){const response=await fetch(`${origin}/api/ai/usage`,{headers:{Authorization:`Bearer ${token}`}});assert.equal(response.status,200);return response.json()}
async function action(operation:string,input:any){
 const requestId=crypto.randomUUID(),body=JSON.stringify({operation,input,requestId,sessionId})
 let response:Response|undefined
 for(let i=0;i<3;i++){
  response=await fetch(`${origin}/api/ai/requests`,{method:'POST',headers,body,signal:AbortSignal.timeout(185000)})
  if(response.status!==429)break
  const error=await response.clone().json() as any
  if(!['throttled','concurrent'].includes(error.data?.code))break
  const delay=Math.min(65,Math.max(1,Number(response.headers.get('retry-after'))||60))
  console.log(JSON.stringify({operation,waitingSeconds:delay,reason:error.data.code}))
  await Bun.sleep(delay*1000)
 }
 assert.equal(response?.status,200,`${operation} was not admitted (${response?.status})`)
 let text='';for await(const event of readBuiltinEvents(response!))if(event.type==='delta'||event.type==='result')text+=event.text
 assert.ok(text.trim(),`${operation} returned no text`)
 results.push({operation,success:true,outputCharacters:text.length})
 console.log(JSON.stringify(results.at(-1)))
 return {requestId,text,body}
}
assert.equal((await fetch(`${origin}/api/ai/usage`)).status,401)
const initial=await usage();assert.equal((await usage(other.access_token)).limit,65);assert.ok(initial.remaining>=4,'At least four actions must remain')
const chat=await action('chat',{context:'Water has the chemical formula H2O.',title:'Water',messages:[{role:'user',content:'What is the formula of water? Reply briefly.'}]})
assert.ok(containsWaterFormula(chat.text),'Chat failed the synthetic water reference')
const duplicate=await fetch(`${origin}/api/ai/requests`,{method:'POST',headers,body:chat.body});assert.equal(duplicate.status,409)
const recovered=await fetch(`${origin}/api/ai/requests/${chat.requestId}`,{headers});assert.equal(recovered.status,200);assert.equal((await recovered.json() as any).text,chat.text)
assert.equal((await fetch(`${origin}/api/ai/requests/${chat.requestId}`,{headers:{Authorization:`Bearer ${other.access_token}`}})).status,404)
await action('fact-check',{draft:{title:'Water',description:'Water facts',cards:[{front:'Formula of water',back:'H2O'}]},language:'en'})
await action('generate',{sources:[{id:'water',filename:'water.txt',kind:'text',text:'Water has the molecular formula H2O. It consists of hydrogen and oxygen. At standard atmospheric pressure, pure water freezes at 0 degrees Celsius and boils at 100 degrees Celsius.',method:'text'}],instructions:'Create two flashcards and a short study guide.'})
await action('grade',{question:'What is the formula of water?',referenceAnswer:'H2O',studentAnswer:'H2O'})
const final=await usage();assert.equal(final.used,initial.used+4);assert.equal(final.reserved,0)
await writeFile('/tmp/tracer-ai-staging/smoke-results.json',JSON.stringify({project:config.project,operations:results,accounting:{used:final.used,remaining:final.remaining},duplicateDenied:true,ownerRecoveryVerified:true,crossAccountDenied:true}),{mode:0o600})
console.log(JSON.stringify({liveStagingPassed:true,used:final.used,remaining:final.remaining,duplicateDenied:true,crossAccountDenied:true}))
