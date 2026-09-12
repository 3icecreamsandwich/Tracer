import { defineConfig } from '@playwright/test'

const basePath = process.env.TRACER_TEST_BASE_PATH || '/'
const cloudflare = process.env.TRACER_TEST_CLOUDFLARE === '1'
const production = process.env.TRACER_TEST_PRODUCTION === '1'
const remoteURL = process.env.TRACER_TEST_BASE_URL
export default defineConfig({
  testDir: './tests/e2e/web-app',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: remoteURL || `http://127.0.0.1:3101${basePath}`,
    browserName: 'chromium',
    launchOptions: process.env.TRACER_TEST_BROWSER ? { executablePath: process.env.TRACER_TEST_BROWSER } : undefined,
    screenshot: 'only-on-failure',
  },
  webServer: remoteURL ? undefined : {
    command: cloudflare ? 'bun run preview:cloudflare' : production ? 'node .output/server/index.mjs' : 'bun --bun node_modules/nuxt/bin/nuxt.mjs dev --host 127.0.0.1 --port 3101',
    url: `http://127.0.0.1:3101${basePath}`,
    env: { PORT: '3101', HOST: '127.0.0.1', TRACER_BUILD_DIR: '.nuxt-web-test', NUXT_APP_BASE_URL: basePath, VITE_TRACER_WEB_PREVIEW: '0', VITE_TRACER_FORCE_WEB: '1' },
    reuseExistingServer: false,
    timeout: 120_000,
  },
  workers: 1,
  retries: 0,
})
