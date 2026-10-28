import{spawnSync}from'node:child_process'
import{readFileSync,writeFileSync,mkdirSync,appendFileSync}from'node:fs'
import{resolve}from'node:path'
const url='https://incejztkdiregaaxltiv.supabase.co'
if(process.env.VITE_SUPABASE_URL!==url||process.env.NUXT_SUPABASE_URL!==url)throw new Error('Staging project configuration required')
const built=spawnSync('bun',['--bun','node_modules/nuxt/bin/nuxt.mjs','build','--extends','./tests/e2e/staging/cloudflare'],{stdio:'inherit',env:{...process.env,TRACER_CLOUDFLARE:'0'}})
if(built.status!==0)process.exit(built.status??1)
mkdirSync('.wrangler',{recursive:true})
const entry=readFileSync('cloudflare/entry.ts','utf8').replace('../.output-cloudflare/server/index.mjs','../.output-ai-staging-cloudflare/server/index.mjs').replace("'./bounded-body'","'../cloudflare/bounded-body'").replace("'./security-headers'","'../cloudflare/security-headers'")
writeFileSync('.wrangler/ai-staging-entry.ts',entry)
const config=JSON.parse(readFileSync('wrangler.ai-staging.jsonc','utf8'))
if(config.name!=='tracer-ai-test'||config.vars.NUXT_SUPABASE_URL!==url)throw new Error('Refusing a non-staging Worker')
config.main=resolve(config.main);config.assets.directory=resolve(config.assets.directory)
config.vars.NUXT_SUPABASE_PUBLISHABLE_KEY=process.env.NUXT_SUPABASE_PUBLISHABLE_KEY
writeFileSync('.wrangler/ai-staging.json',JSON.stringify(config,null,2))
appendFileSync('.output-ai-staging-cloudflare/public/_headers','\n/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n')
console.log('Staging Worker built with inference disabled. No secrets were written to its config.')
