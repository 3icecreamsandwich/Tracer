import { PGlite } from '@electric-sql/pglite'
import { beforeAll,afterAll,beforeEach,describe,it,expect } from 'vitest'
import { readFileSync } from 'node:fs'
let db:PGlite
const owner='00000000-0000-4000-8000-000000000001',other='00000000-0000-4000-8000-000000000002'
const sessionId='00000000-0000-4000-8000-000000000010'
const capacity={provider:'groq',model:'fixture',group:'groq:shared',rpm:1000,rpd:10000,tpm:1000000,tpd:10000000,concurrency:10,context:100000,verifiedUntil:'2099-01-01T00:00:00Z'}
async function call(action:string,args:Record<string,unknown>={},user=owner) {
  const result=await db.query<{data:any}>('select public.tracer_ai_gateway($1,$2::jsonb) as data',[action,JSON.stringify({owner:user,...args})])
  return result.rows[0]!.data
}
async function reserve(requestId=crypto.randomUUID(),user=owner) {
  return {requestId,result:await call('reserve',{requestId,sessionId,operation:'chat'},user)}
}
beforeAll(async()=>{
  db=new PGlite()
  await db.exec(`create schema auth; create table auth.users(id uuid primary key); create role anon; create role authenticated; create role service_role;
  insert into auth.users values('${owner}'),('${other}');`)
  await db.exec(readFileSync(new URL('../../supabase/migrations/20261027040922_builtin_ai_gateway.sql',import.meta.url),'utf8'))
  await db.exec(readFileSync(new URL('../../supabase/migrations/20261028041453_builtin_ai_safe_capacity_sync.sql',import.meta.url),'utf8'))
  await db.exec(readFileSync(new URL('../../supabase/migrations/20261030044144_ai_relax_admission_limits.sql',import.meta.url),'utf8'))
},30000)
afterAll(async()=>{await db?.close()})
beforeEach(async()=>{
  await db.exec('truncate ai_private.requests,ai_private.months,ai_private.keys,ai_private.groups,ai_private.sessions; update ai_private.state set pressure=false,recovery_at=null;')
  await call('sync',{candidates:[{...capacity,id:'GROQ_KEY_0'},{...capacity,id:'GROQ_KEY_1'}]})
})
describe('built-in AI PostgreSQL accounting',()=>{
  it('allows eight actions per minute normally and four under pressure',async()=>{
    for(let i=0;i<8;i++) { const r=await reserve(); expect(r.result.ok).toBe(true); await call('finish',{requestId:r.requestId,charge:false,success:false}) }
    expect((await reserve()).result.error).toBe('throttled')
    await db.exec("truncate ai_private.requests; update ai_private.groups set day_requests=(config->>'rpd')::int * 9 / 10")
    for(let i=0;i<4;i++) { const r=await reserve(); expect(r.result.ok).toBe(true); await call('finish',{requestId:r.requestId,charge:false,success:false}) }
    expect((await reserve()).result.error).toBe('throttled')
    expect(await call('usage')).toMatchObject({remaining:65,throttled:true})
  })
  it('reserves, charges once and expires private recovery results',async()=>{
    const {requestId}=await reserve()
    expect(await call('usage')).toMatchObject({remaining:64,reserved:1,used:0})
    await call('charge',{requestId,charge:true});await call('charge',{requestId,charge:true})
    await call('finish',{requestId,charge:true,success:true,text:'answer'})
    expect(await call('usage')).toMatchObject({remaining:64,reserved:0,used:1})
    expect(await call('status',{requestId})).toMatchObject({status:'complete',text:'answer'})
    await db.exec("update ai_private.requests set expires_at=now()-interval '1 second'")
    expect(await call('status',{requestId})).toMatchObject({text:null,charged:true})
  })
  it('blocks simultaneous actions and duplicate submissions without adding charges',async()=>{
    const id=crypto.randomUUID()
    const submissions=await Promise.all(Array.from({length:10},()=>reserve(id)))
    expect(submissions.filter(x=>x.result.ok)).toHaveLength(1)
    expect(submissions.filter(x=>x.result.error==='duplicate')).toHaveLength(9)
    expect((await reserve()).result.error).toBe('concurrent')
    expect(await call('usage')).toMatchObject({reserved:1,used:0})
  })
  it('refunds failed requests and recovers expired leases',async()=>{
    const first=await reserve(); await call('finish',{requestId:first.requestId,charge:false,success:false})
    expect(await call('usage')).toMatchObject({remaining:65})
    const second=await reserve();await db.exec("update ai_private.requests set lease_until=now()-interval '1 second'")
    expect(await call('usage')).toMatchObject({remaining:65,reserved:0})
    expect(await call('status',{requestId:second.requestId})).toMatchObject({status:'failed'})
  })
  it('cannot exceed 65 while multiple devices race for the final action',async()=>{
    await call('usage');await db.exec('update ai_private.months set used=64')
    const requests=await Promise.all(Array.from({length:8},()=>reserve()))
    expect(requests.filter(x=>x.result.ok)).toHaveLength(1)
    const winner=requests.find(x=>x.result.ok)!
    await call('finish',{requestId:winner.requestId,charge:true,success:true,text:'last'})
    expect((await reserve()).result.error).toBe('monthly_limit')
    expect(await call('usage')).toMatchObject({used:65,remaining:0})
  })
  it('keeps users isolated and does not reuse last month’s usage',async()=>{
    const {requestId}=await reserve();await call('finish',{requestId,charge:true,success:true,text:'private'})
    expect(await call('status',{requestId},other)).toMatchObject({error:'not_found'})
    expect(await call('usage',{},other)).toMatchObject({used:0,remaining:65})
    await db.exec("update ai_private.months set month=(month-interval '1 month')::date")
    expect(await call('usage')).toMatchObject({used:0,remaining:65})
  })
  it('chooses GROQ_KEY_0 on a tie and cools down its whole shared group on 429',async()=>{
    const {requestId}=await reserve()
    const args={requestId,sessionId,tokens:100,candidateIds:['GROQ_KEY_0','GROQ_KEY_1']}
    expect(await call('claim',args)).toMatchObject({keyId:'GROQ_KEY_0'})
    await call('report',{requestId,status:429,retryAfter:120})
    expect(await call('claim',args)).toMatchObject({error:'unavailable'})
    const groups=await db.query('select count(*)::int as count from ai_private.groups')
    expect(groups.rows[0]).toMatchObject({count:1})
  })
  it('disables an invalid key without treating its siblings as extra quota',async()=>{
    const {requestId}=await reserve(),args={requestId,tokens:100,candidateIds:['GROQ_KEY_0','GROQ_KEY_1']}
    await call('claim',args);await call('report',{requestId,status:401})
    expect(await call('claim',args)).toMatchObject({keyId:'GROQ_KEY_1',attempt:2})
    await call('report',{requestId,status:0,tokens:10})
    await call('claim',args);await call('report',{requestId,status:0,tokens:10})
    expect(await call('claim',args)).toMatchObject({error:'attempts_exhausted'})
  })
  it('selects greater headroom and respects shared concurrency reservations',async()=>{
    await call('sync',{candidates:[{...capacity,id:'GROQ_KEY_0',concurrency:1},{...capacity,id:'OPENROUTER_KEY_0',group:'openrouter:shared',provider:'openrouter',concurrency:1}]})
    await db.exec("update ai_private.groups set day_requests=9000 where id='groq:shared'")
    const first=await reserve()
    expect(await call('claim',{requestId:first.requestId,tokens:100,candidateIds:['GROQ_KEY_0','OPENROUTER_KEY_0']})).toMatchObject({keyId:'OPENROUTER_KEY_0'})
    const second=await reserve(undefined,other)
    expect(await call('claim',{requestId:second.requestId,tokens:100,candidateIds:['GROQ_KEY_0','OPENROUTER_KEY_0']},other)).toMatchObject({keyId:'GROQ_KEY_0'})
  })
  it('denies anon and authenticated roles access to the accounting facade and tables',async()=>{
    for(const role of ['anon','authenticated']) {
      await db.exec(`set role ${role}`)
      await expect(call('usage')).rejects.toThrow(/permission denied/)
      await expect(db.query('select * from ai_private.requests')).rejects.toThrow(/permission denied/)
      await db.exec('reset role')
    }
  })
  it('fails closed with no configured capacity',async()=>{
    await call('sync',{candidates:[]})
    expect((await reserve()).result.error).toBe('unavailable')
    expect(await call('usage')).toMatchObject({available:false,remaining:65})
  })
  it('tightens verified capacity using provider headers without increasing it',async()=>{
    const {requestId}=await reserve()
    await call('claim',{requestId,tokens:100,candidateIds:['GROQ_KEY_0']})
    await call('report',{requestId,status:0,tokens:10,remainingDayRequests:0,remainingMinuteTokens:1})
    expect(await call('usage')).toMatchObject({available:false,throttled:true})
    expect(await call('claim',{requestId,tokens:100,candidateIds:['GROQ_KEY_1']})).toMatchObject({error:'unavailable'})
  })
  it('keeps the monthly allowance intact during pressure and uses recovery hysteresis',async()=>{
    await db.exec("update ai_private.groups set day_requests=8500")
    expect(await call('usage')).toMatchObject({remaining:65,throttled:true})
    await db.exec('update ai_private.groups set day_requests=0')
    expect(await call('usage')).toMatchObject({throttled:true})
    await db.exec("update ai_private.state set recovery_at=now()-interval '6 minutes'")
    expect(await call('usage')).toMatchObject({throttled:false,remaining:65})
  })
  it('maintains session affinity only while that provider can accept the bounded request',async()=>{
    await call('sync',{candidates:[{...capacity,id:'GROQ_KEY_0'},{...capacity,id:'OLLAMA_CLOUD_KEY_0',group:'ollama:shared'}]})
    const first=await reserve(),args={tokens:100,sessionId,candidateIds:['GROQ_KEY_0','OLLAMA_CLOUD_KEY_0']}
    expect(await call('claim',{...args,requestId:first.requestId})).toMatchObject({keyId:'GROQ_KEY_0'})
    await call('report',{requestId:first.requestId,status:0,tokens:10});await call('finish',{requestId:first.requestId,charge:true,success:true})
    const second=await reserve()
    expect(await call('claim',{...args,requestId:second.requestId})).toMatchObject({keyId:'GROQ_KEY_0'})
    await call('report',{requestId:second.requestId,status:429,retryAfter:120})
    expect(await call('claim',{...args,requestId:second.requestId})).toMatchObject({keyId:'OLLAMA_CLOUD_KEY_0'})
  })

})
