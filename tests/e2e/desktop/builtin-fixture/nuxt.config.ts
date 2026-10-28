import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
let testToken='fixture-token'
if(process.env.TRACER_AI_STAGING_SESSION_FILE) {
  const session=JSON.parse(readFileSync(process.env.TRACER_AI_STAGING_SESSION_FILE,'utf8'))
  if(session.project!=='incejztkdiregaaxltiv' || !(process.env.VITE_TRACER_AI_GATEWAY_URL==='http://127.0.0.1:3111'||/^https:\/\/tracer-ai-test\.[a-z0-9-]+\.workers\.dev$/.test(process.env.VITE_TRACER_AI_GATEWAY_URL||'')))throw new Error('Only isolated AI staging sessions are allowed')
  const index=process.env.TRACER_AI_STAGING_TEST_ACCOUNT==='1'?1:0
  testToken=session.accounts[index].access_token
}
// Opt-in fixture only. The gateway request still uses the real native HTTP plugin.
export default defineNuxtConfig({
  vite:{cacheDir:fileURLToPath(new URL('../../../../.nuxt-native-builtin-test/vite',import.meta.url))},
  hooks:{'vite:extendConfig'(config){
    config.plugins ||= []
    config.plugins.push({name:'native-builtin-fixture',enforce:'pre',transform(source,id){
      const path=id.split('?')[0]||''
      if(path.endsWith('/src/composables/ai/builtin/client.ts'))return source.replace("import { getSupabaseClient } from '../../auth/client'",`const getSupabaseClient = () => ({ auth: { async getSession() { return { data: { session: { access_token: ${JSON.stringify(testToken)} } }, error: null } } } })`)
      if(path.endsWith('/src/composables/ai/credentials/provider-keys.ts'))return `export async function aiProviderApiKeyPresence(){return {openai:false,anthropic:false,gemini:false,ollama_cloud:false,openai_compat:false}};export async function aiProviderSettingsSave(){return {savedApiKeyIds:[],savedOpenAiCompatConfig:false}}`
      if(path.endsWith('/src/composables/ai/credentials/secrets.ts'))return `export async function aiSecretsGet(){return null};export async function aiSecretsSet(){};export async function aiSecretsDelete(){}`
    }})
  }},
})
