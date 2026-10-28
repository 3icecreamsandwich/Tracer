import {test,expect} from '@playwright/test'
import {readFileSync} from 'node:fs'
import {installCloudLibraryFixture} from '../fixtures/cloud-library'
test.skip(process.env.TRACER_LIVE_STAGING!=='1','Explicit live staging opt-in required')
test('web chat uses real staging Auth, free inference and shared accounting',async({context,page})=>{
 test.setTimeout(120000)
 const config=JSON.parse(readFileSync('/tmp/tracer-ai-staging/session.json','utf8'))
 expect(config.project).toBe('incejztkdiregaaxltiv')
 const session=config.accounts[1],owner=session.user.id,setId='00000000-0000-4000-8000-000000000088'
 await context.addInitScript(session=>localStorage.setItem('tracer:/:auth',JSON.stringify(session)),session)
 const cors={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'GET, POST, OPTIONS'}
 // Only unrelated library/classroom records are fixtures. Auth and every /api/ai
 // request go to real staging services, without provider or accounting mocks.
 await context.route('**/rest/v1/**',route=>route.fulfill({headers:cors,json:route.request().url().includes('user_roles')?[{role:'student'}]:[]}))
 await context.route('**/api/web/credentials',route=>route.fulfill({headers:cors,json:{openai:false,anthropic:false,gemini:false,ollama_cloud:false,openai_compat:false}}))
 const rows=new Map<string,any>()
 rows.set(`${owner}:preferences:app`,{owner_id:owner,kind:'preferences',id:'app',revision:1,deleted:false,payload:{aiMode:'builtin',defaultModelId:null,fallbackModelIds:[]}})
 rows.set(`${owner}:set:${setId}`,{owner_id:owner,kind:'set',id:setId,revision:1,deleted:false,payload:{id:setId,title:'Live staging water',description:'Water is H2O',terms:[{id:'t1',front:'Water',back:'H2O'}],folderId:null,createdAt:'2026-01-01',updatedAt:'2026-01-01'}})
 await installCloudLibraryFixture(context,owner,rows)
 const usage=async()=>{const r=await context.request.get('/api/ai/usage',{headers:{Authorization:`Bearer ${session.access_token}`}});expect(r.status()).toBe(200);return r.json()}
 const before=await usage()
 await page.goto('first-run');await expect(page.getByRole('heading',{name:'Sets',exact:true})).toBeVisible()
 await page.goto(`set/${setId}?mode=chat`)
 await page.locator('#chat-input').fill('What is the formula of water? Reply briefly.')
 await page.getByRole('region',{name:'Chat',exact:true}).getByRole('button',{name:'Chat',exact:true}).click()
 await expect(page.getByRole('log')).toContainText(/H.?[2₂].?O/i,{timeout:90000})
 await expect(page.getByRole('dialog')).toHaveCount(0)
 await expect.poll(usage).toMatchObject({used:before.used+1,reserved:0})
 await page.goto('settings')
 await expect(page.getByRole('region',{name:'AI',exact:true})).toContainText(`${before.remaining-1} of 65 actions left`)
})
