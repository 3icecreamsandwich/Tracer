import { getIdentifier } from '@tauri-apps/api/app'
import { hasTauriRuntime } from '~/src/composables/tauri'
import { lockFirstRunSetPassword,lockGetStatus } from '~/src/composables/lock'
import { useTracerDb,createProfileRepo,createSettingsRepo } from '~/src/composables/db'
import { createLocalSetsRepo } from '~/src/composables/db/repos/sets.repo'
import { useLockSession } from '~/src/composables/lock-session'
export default defineNuxtPlugin(async nuxt=>{
 if(!hasTauriRuntime() || !['com.tracer.builtin-ai-test','com.tracer.ai-staging-test'].includes(await getIdentifier()))throw new Error('An isolated native builtin test identifier is required.')
 if(!(await lockGetStatus()).has_verifier)await lockFirstRunSetPassword('disposable-builtin-fixture-password')
 const db=await useTracerDb()
 await createProfileRepo(db).set({name:'Built-in AI Test',email:'fixture@example.invalid'})
 await createSettingsRepo(db).set({aiMode:'builtin',defaultModelId:null,fallbackModelIds:[],startupLockEnabled:false,automaticUpdatesEnabled:false})
 const sets=createLocalSetsRepo(db),id='00000000-0000-4000-8000-000000000088'
 if(!await sets.get(id))await sets.create({id,title:'Built-in water fixture',description:'Water is H2O.',terms:[{id:'t1',front:'Water',back:'H2O'}]})
 useLockSession().markUnlocked()
 nuxt.hook('app:mounted',()=>{
  const bar=document.createElement('nav');bar.setAttribute('aria-label','Native AI test pages')
  bar.style.cssText='position:fixed;top:48px;left:280px;z-index:9999;background:white;color:black;border:2px solid;padding:8px;display:flex;gap:12px'
  for(const [name,path]of [['Settings','/settings'],['Chat',`/set/${id}?mode=chat`],['Edit',`/set/${id}/edit`],['Generate','/create/generate'],['Practice',`/set/${id}-learn?seed=1`]]){
   const link=document.createElement('a');link.textContent=`Test ${name}`;link.href=path!;bar.append(link)
  }
  document.body.append(bar)
 })
})
