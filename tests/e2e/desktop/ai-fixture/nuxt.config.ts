import { fileURLToPath } from 'node:url'

// Opt-in development layer only. Never include in a production build.
export default defineNuxtConfig({
  vite: { cacheDir: fileURLToPath(new URL('../../../../.nuxt-native-ai-test/vite', import.meta.url)) },
  hooks: {
    'vite:extendConfig'(config) {
      config.plugins ||= []
      config.plugins.push({
        name: 'tracer-native-ai-fixture', enforce: 'pre',
        transform(_source, id) {
          const path = id.split('?')[0] || ''
          if (path.endsWith('/src/composables/ai/credentials/secrets.ts')) {
            return `export async function aiSecretsGet(kind) { return ['ollama_cloud_api_key', 'gemini_api_key'].includes(kind) ? 'fixture-only' : null }; export async function aiSecretsSet() {}; export async function aiSecretsDelete() {}`
          }
          if (path.endsWith('/src/composables/ai/credentials/provider-keys.ts')) {
            return `export async function aiProviderApiKeyPresence() { return {openai:false,anthropic:false,gemini:true,ollama_cloud:true,openai_compat:false} }; export async function aiProviderSettingsSave() { return {savedApiKeyIds:[],savedOpenAiCompatConfig:false} }`
          }
          if (path.endsWith('/src/composables/ai/http.ts')) {
            const fixture = fileURLToPath(new URL('./transport.ts', import.meta.url))
            return `export { fixtureFetch as aiHttpFetch } from ${JSON.stringify(fixture)}`
          }
        },
      })
    },
  },
})
