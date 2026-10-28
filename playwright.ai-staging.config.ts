import {defineConfig} from '@playwright/test'
const origin=process.env.TRACER_AI_STAGING_GATEWAY_URL||'http://127.0.0.1:3111'
if(origin!=='http://127.0.0.1:3111'&&!/^https:\/\/tracer-ai-test\.[a-z0-9-]+\.workers\.dev$/.test(origin))throw new Error('Only isolated staging gateways are allowed')
export default defineConfig({testDir:'./tests/e2e/staging',timeout:120000,expect:{timeout:20000},workers:1,retries:0,use:{baseURL:origin+'/',browserName:'chromium',screenshot:'only-on-failure'}})
