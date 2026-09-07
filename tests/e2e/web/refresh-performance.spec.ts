import { test, expect } from '@playwright/test'

test('home refresh restores native startup without loading AI or document processors', async ({ page }) => {
  await page.addInitScript(() => {
    ;(window as any).__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener() {} }
    ;(window as any).__startupQueries = []
    ;(window as any).__TAURI_INTERNALS__ = {
      metadata: { currentWindow: { label: 'main' }, currentWebview: { label: 'main' } },
      transformCallback: () => 1,
      unregisterCallback() {},
      invoke: async (command: string, args: any = {}) => {
        if (command === 'lock_get_status') return {
          has_verifier: true, requires_unlock: false, can_auto_unlock: true, vault_mode: 'device_key',
        }
        if (command === 'plugin:sql|select') {
          ;(window as any).__startupQueries.push(args.query)
          if (args.query.includes('FROM profile')) return [{ id: 'profile', name: 'Alex' }]
          if (args.query.includes('FROM app_settings')) return [{
            startup_lock_enabled: 0, language: 'en', floating_chat_enabled: 0, fallback_model_ids: '[]',
          }]
          return []
        }
        if (command === 'plugin:sql|execute') return [1, 0]
        if (command === 'plugin:event|listen') return 1
        return null
      },
    }
  })
  const requests: string[] = []
  page.on('request', (request) => requests.push(request.url()))
  for (const reload of [false, true]) {
    requests.length = 0
    if (reload) await page.reload()
    else await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Sets', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: /Public sets/ })).toBeVisible()
    // Wait for the delayed manager to actually start, not merely for the initial paint.
    await expect.poll(() => page.evaluate(() =>
      (window as any).__startupQueries.some((query: string) => query.includes('FROM linked_folders')),
    ), { timeout: 12_000 }).toBe(true)
    expect(requests.filter((url) => /(?:ai-sdk|pdfjs-dist|tesseract|linked-folders\/(?:generate|scan)\.)/.test(url))).toEqual([])
    expect(requests.filter((url) => /\/(?:lucide-vue|lucide-vue-next)\.js/.test(url))).toEqual([])
  }
})
