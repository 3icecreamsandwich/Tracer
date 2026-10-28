import {fileURLToPath} from 'node:url'
export default defineNuxtConfig({
 buildDir:fileURLToPath(new URL('../../../.nuxt-ai-staging',import.meta.url)),
 nitro:{output:{dir:fileURLToPath(new URL('../../../.output-ai-staging',import.meta.url))}},
})
