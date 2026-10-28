import {fileURLToPath} from 'node:url'
export default defineNuxtConfig({
 buildDir:fileURLToPath(new URL('../../../../.nuxt-ai-staging-cloudflare',import.meta.url)),
 nitro:{preset:'cloudflare-module',output:{dir:fileURLToPath(new URL('../../../../.output-ai-staging-cloudflare',import.meta.url))},cloudflare:{deployConfig:false}},
})
