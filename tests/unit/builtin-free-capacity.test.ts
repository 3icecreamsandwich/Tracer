import {afterEach,expect,it,vi} from 'vitest'
import {revalidateFreeCapacity} from '../../server/utils/ai/free-capacity'
afterEach(()=>vi.unstubAllGlobals())
const candidate={provider:'openrouter',model:'nvidia/nemotron-3.5-lightning:free',freeVerified:true,verifiedUntil:'2020-01-01',context:1000,keyIds:['OPENROUTER_KEY_0']}
it('renews only zero-priced available capacity and caches verification',async()=>{
 const fetch=vi.fn().mockResolvedValueOnce(Response.json({data:[{id:candidate.model,context_length:65536,pricing:{prompt:'0',completion:'0'}}]})).mockResolvedValueOnce(Response.json({data:{free_model_daily_requests:{remaining:10}}}))
 vi.stubGlobal('fetch',fetch)
 const env={OPENROUTER_KEY_0:'fixture-free',BUILTIN_AI_CAPACITY:JSON.stringify([candidate])}
 const a=await revalidateFreeCapacity(env),b=await revalidateFreeCapacity(env)
 expect(Date.parse(JSON.parse(a.BUILTIN_AI_CAPACITY)[0].verifiedUntil)).toBeGreaterThan(Date.now())
 expect(b).toEqual(a);expect(fetch).toHaveBeenCalledTimes(2)
 for(const [,options] of fetch.mock.calls) expect(options).toMatchObject({redirect:'manual'})
})
it('fails closed when the model is no longer free',async()=>{
 vi.stubGlobal('fetch',vi.fn().mockResolvedValueOnce(Response.json({data:[{id:candidate.model,context_length:65536,pricing:{prompt:'0.1',completion:'0'}}]})).mockResolvedValueOnce(Response.json({data:{free_model_daily_requests:{remaining:10}}})))
 const env={OPENROUTER_KEY_0:'fixture-paid',BUILTIN_AI_CAPACITY:JSON.stringify([candidate])}
 expect(JSON.parse((await revalidateFreeCapacity(env)).BUILTIN_AI_CAPACITY)[0].verifiedUntil).toBe(candidate.verifiedUntil)
})

it('rejects redirects without following them or forwarding credentials',async()=>{
 const fetch=vi.fn().mockResolvedValueOnce(new Response(null,{status:302,headers:{location:'https://untrusted.invalid'}})).mockResolvedValueOnce(Response.json({data:{free_model_daily_requests:{remaining:10}}}))
 vi.stubGlobal('fetch',fetch)
 const env={OPENROUTER_KEY_0:'fixture-redirect',BUILTIN_AI_CAPACITY:JSON.stringify([candidate])}
 expect(JSON.parse((await revalidateFreeCapacity(env)).BUILTIN_AI_CAPACITY)[0].verifiedUntil).toBe(candidate.verifiedUntil)
 expect(fetch).toHaveBeenCalledTimes(2)
 for(const [,options] of fetch.mock.calls)expect(options).toMatchObject({redirect:'manual'})
})
