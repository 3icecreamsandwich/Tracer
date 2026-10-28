import {fileURLToPath} from 'node:url'
export default defineNuxtConfig({extends:['../builtin-fixture'],vite:{cacheDir:fileURLToPath(new URL('../../../../.nuxt-native-ai-staging/vite',import.meta.url))}})
