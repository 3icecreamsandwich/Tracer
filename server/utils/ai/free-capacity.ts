// Renew only an already operator-enabled, pinned free candidate. Never discover
// paid replacements or infer that sibling keys have independent quota.
const model='nvidia/nemotron-3.5-lightning:free'
const checks=new Map<string,{until:number,promise:Promise<boolean>}>()
export async function revalidateFreeCapacity(env:Record<string,any>,now=Date.now()) {
 let entries:any[]
 try {entries=JSON.parse(env.BUILTIN_AI_CAPACITY||'[]')} catch {return env}
 if(!Array.isArray(entries)) return env
 const renewed=await Promise.all(entries.map(async entry=>{
  if(entry.provider!=='openrouter'||entry.freeVerified!==true||(entry.model&&entry.model!==model)||!Number.isFinite(Date.parse(entry.verifiedUntil))||Date.parse(entry.verifiedUntil)>now) return entry
  const ids=Array.isArray(entry.keyIds)?entry.keyIds:Object.keys(env).filter(k=>/^OPENROUTER_KEY_\d+$/.test(k))
  for(const id of ids) {
   if(!/^OPENROUTER_KEY_\d+$/.test(id)||typeof env[id]!=='string'||!env[id]) continue
   const key=env[id]
   let check=checks.get(key)
   if(!check||check.until<=now) {
    if(checks.size>=64) checks.clear()
    const promise=(async()=>{
     const [catalog,quota]=await Promise.all([
      fetch('https://openrouter.ai/api/v1/models',{redirect:'error',signal:AbortSignal.timeout(6000)}),
      fetch('https://openrouter.ai/api/v1/key',{headers:{Authorization:`Bearer ${key}`},redirect:'error',signal:AbortSignal.timeout(6000)})])
     if(!catalog.ok||!quota.ok)return false
     const models=await catalog.json() as any, limits=await quota.json() as any
     const found=models.data?.find((v:any)=>v.id===model)
     return !!found && found.context_length>=entry.context && found.pricing?.prompt!=null && found.pricing?.completion!=null && Number(found.pricing.prompt)===0 && Number(found.pricing.completion)===0 && Number(found.pricing.request||0)===0 && Number(limits.data?.free_model_daily_requests?.remaining)>0
    })().catch(()=>false)
    check={until:now+60_000,promise};checks.set(key,check)
   }
   if(await check.promise) return {...entry,model,verifiedUntil:new Date(check.until).toISOString()}
  }
  return entry
 }))
 return {...env,BUILTIN_AI_CAPACITY:JSON.stringify(renewed)}
}
