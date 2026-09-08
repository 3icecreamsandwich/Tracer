export default defineNuxtConfig({
  ssr: false,
  buildDir: process.env.TRACER_BUILD_DIR || '.nuxt',
  app: {
    // app.tracerquiz.com uses '/'; set NUXT_APP_BASE_URL for a subdirectory.
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: { meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }] }
  },
  runtimeConfig: {
    supabaseUrl: process.env.VITE_SUPABASE_URL || '',
    supabasePublishableKey: process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
    // Optional, administrator-controlled HTTPS origin for OpenAI-compatible APIs.
    webAiCompatibleOrigin: process.env.NUXT_WEB_AI_COMPATIBLE_ORIGIN || '',
  },
  nitro: { compressPublicAssets: true },
  compatibilityDate: '2026-07-10',
  ignore: ['src-tauri/**'],

  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css', 'katex/dist/katex.min.css'],

  experimental: {
    defaults: {
      // Warm the destination on intent, rather than loading every visible link.
      nuxtLink: { prefetchOn: { visibility: false, interaction: true } }
    }
  },

  devServer: {
    host: '127.0.0.1',
    port: 3000
  },

  vite: {
    clearScreen: false,
    define: { 'import.meta.env.VITE_TRACER_BASE_PATH': JSON.stringify(process.env.NUXT_APP_BASE_URL || '/') },
    resolve: {
      // Slot helpers and the renderer must share Vue's component-instance state.
      dedupe: ['vue', '@vue/runtime-core', '@vue/runtime-dom', '@vue/reactivity', '@vue/shared']
    },
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
      watch: {
        ignored: ['**/src-tauri/**']
      }
    },
    optimizeDeps: {
      include: [
        '@ai-sdk/anthropic',
        '@ai-sdk/google',
        '@ai-sdk/openai',
        '@ai-sdk/openai-compatible',
        '@supabase/supabase-js',
        '@tauri-apps/api/event',
        '@tauri-apps/plugin-http',
        'ai',
        'ollama-ai-provider-v2',
        'pdfjs-dist',
        'tesseract.js', // CJS
      ]
    }
  },

  watch: {
    ignore: ['**/src-tauri/**']
  },

  devtools: {
    enabled: false
  }
})
