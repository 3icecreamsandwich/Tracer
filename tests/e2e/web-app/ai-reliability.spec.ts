import { expect, test, type BrowserContext, type Page } from '@playwright/test'
import { installCloudLibraryFixture } from '../fixtures/cloud-library'

const owner = '00000000-0000-4000-8000-000000000001'
const setId = '00000000-0000-4000-8000-000000000088'
const basePath = process.env.TRACER_TEST_BASE_PATH || '/'

async function fixture(context: BrowserContext, page: Page) {
  const user = { id: owner, email: 'ai-test@example.com', aud: 'authenticated', role: 'authenticated', app_metadata: { provider: 'google' }, user_metadata: { full_name: 'AI Test' }, created_at: '2026-01-01' }
  await context.addInitScript(({ user, basePath }) => {
    const expires = Math.floor(Date.now() / 1000) + 3600
    localStorage.setItem(`tracer:${basePath}:auth`, JSON.stringify({ access_token: 'fixture-token', refresh_token: 'fixture-refresh', token_type: 'bearer', expires_at: expires, expires_in: 3600, user }))
  }, { user, basePath })
  await context.route('**/auth/v1/**', route => route.fulfill({ json: user }))
  await context.route('**/rest/v1/**', route => route.fulfill({ json: route.request().url().includes('user_roles') ? [{ role: 'student' }] : [] }))
  await context.route('**/api/web/credentials', route => route.fulfill({ json: { openai: false, anthropic: false, gemini: true, ollama_cloud: true, openai_compat: false } }))
  const rows = new Map<string, any>()
  rows.set(`${owner}:preferences:app`, { owner_id: owner, kind: 'preferences', id: 'app', revision: 1, deleted: false,
    payload: { defaultModelId: 'ollama_cloud:gpt-oss:20b', fallbackModelIds: ['gemini:gemini-3.7-flash'] } })
  rows.set(`${owner}:set:${setId}`, { owner_id: owner, kind: 'set', id: setId, revision: 1, deleted: false,
    payload: { id: setId, title: 'AI reliability fixture', description: '', terms: [{ id: 't1', front: 'Water', back: 'H2O' }], folderId: null, createdAt: '2026-01-01', updatedAt: '2026-01-01' } })
  await installCloudLibraryFixture(context, owner, rows)
  await page.goto('first-run')
  await expect(page.getByRole('heading', { name: 'Sets', exact: true })).toBeVisible()
  await page.goto('settings')
  await page.getByRole('button', { name: 'Configure AI', exact: true }).click()
  const primary = page.getByRole('listitem').filter({ hasText: 'Ollama Cloud' }).getByRole('button', { name: 'Move model up' })
  await expect(primary).toBeVisible()
  if (await primary.isEnabled()) await primary.click()
  await expect(primary).toBeDisabled()
  await expect.poll(() => rows.get(`${owner}:preferences:app`)?.payload?.defaultModelId).toBe('ollama_cloud:gpt-oss:20b')
}

function geminiAnswer(text: string) {
  return { candidates: [{ content: { role: 'model', parts: [{ text }] }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 2, totalTokenCount: 3 } }
}

test('configured models are tested individually and chat recovers from an exhausted primary', async ({ context, page }) => {
  await fixture(context, page)
  const calls: string[] = []
  await context.route('**/api/web/ai', async route => {
    const body = route.request().postDataJSON()
    calls.push(body.url)
    if (body.url.includes('ollama.com')) return route.fulfill({ status: 429, json: { error: { message: 'Provider quota exhausted' } } })
    const result = geminiAnswer('Recovered answer from fallback.')
    return route.fulfill({ contentType: 'text/event-stream', body: `data: ${JSON.stringify(result)}\n\n` })
  })
  await page.goto('settings')
  await page.getByRole('button', { name: 'Configure AI', exact: true }).click()
  const models = page.getByRole('region', { name: 'AI models', exact: true })
  await expect(models.getByText('Configured', { exact: true })).toHaveCount(2)
  await expect(models.getByText('Ready', { exact: true })).toHaveCount(0)
  await models.getByRole('button', { name: 'Test connection for Ollama Cloud' }).click()
  await expect(models.getByRole('status')).toContainText('rate limited')
  expect(calls.every(url => url.includes('ollama.com'))).toBe(true)
  await models.getByRole('button', { name: 'Test connection for Gemini' }).click()
  await expect(models.getByText(/Response verified at/)).toBeVisible()
  calls.length = 0
  await page.goto(`set/${setId}?mode=chat`)
  await page.locator('#chat-input').fill('What is water?')
  await page.getByRole('region', { name: 'Chat', exact: true }).getByRole('button', { name: 'Chat', exact: true }).click()
  await expect(page.getByRole('log')).toContainText('Recovered answer from fallback.')
  expect(calls[0]).toContain('ollama.com')
  expect(calls.some(url => url.includes('generativelanguage.googleapis.com'))).toBe(true)
  await expect(page.getByRole('dialog', { name: 'AI request failed' })).toHaveCount(0)
})

test('empty streams surface a retryable error in chat and cannot masquerade as a clean fact check', async ({ context, page }) => {
  await fixture(context, page)
  await context.route('**/api/web/ai', route => {
    const { url } = route.request().postDataJSON()
    return route.fulfill({ contentType: url.includes('ollama.com') ? 'application/x-ndjson' : 'text/event-stream',
      body: url.includes('ollama.com') ? JSON.stringify({ model: 'gpt-oss:20b', created_at: '2026-01-01T00:00:00Z', message: { role: 'assistant', content: '' }, done: true, done_reason: 'stop' }) + '\n'
        : `data: ${JSON.stringify(geminiAnswer(''))}\n\n` })
  })
  await page.goto(`set/${setId}?mode=chat`)
  await page.locator('#chat-input').fill('What is water?')
  await page.getByRole('region', { name: 'Chat', exact: true }).getByRole('button', { name: 'Chat', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'AI request failed' })).toContainText('returned no answer')
  await page.getByRole('dialog', { name: 'AI request failed' }).getByRole('button', { name: 'Close', exact: true }).last().click()
  await page.locator('#chat-input').fill('Retry this question')
  await expect(page.getByRole('region', { name: 'Chat', exact: true }).getByRole('button', { name: 'Chat', exact: true })).toBeEnabled()
  await page.goto(`set/${setId}/edit`)
  await page.getByRole('button', { name: /Fact.check/i }).click()
  await expect(page.getByRole('dialog', { name: 'AI request failed' })).toContainText('returned no answer')
  await expect(page.getByText('No suggestions.')).toHaveCount(0)
})


test('interrupted answers remain visible without mixing in a fallback in both chat surfaces', async ({ context, page }) => {
  await fixture(context, page)
  const calls: string[] = []
  await context.route('**/api/web/ai', route => {
    calls.push(route.request().postDataJSON().url)
    const chunk = { model: 'gpt-oss:20b', created_at: '2026-01-01T00:00:00Z', message: { role: 'assistant', content: 'Partial answer preserved.' }, done: false }
    return route.fulfill({ contentType: 'application/x-ndjson', body: JSON.stringify(chunk) + '\n' + JSON.stringify({ error: 'network connection lost' }) + '\n' })
  })
  await page.goto(`set/${setId}?mode=chat`)
  await page.locator('#chat-input').fill('Test an interrupted response')
  await page.getByRole('region', { name: 'Chat', exact: true }).getByRole('button', { name: 'Chat', exact: true }).click()
  await expect(page.getByRole('dialog', { name: 'AI request failed' })).toBeVisible()
  await page.getByRole('dialog', { name: 'AI request failed' }).getByRole('button', { name: 'Close', exact: true }).last().click()
  await expect(page.getByRole('log')).toContainText('Partial answer preserved.')
  await page.getByRole('button', { name: 'Chat with Tracer', exact: true }).click()
  await page.getByRole('textbox', { name: 'Chat message' }).fill('Test another interrupted response')
  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect(page.getByText(/Response interrupted\./)).toBeVisible()
  await expect(page.getByText('Partial answer preserved.', { exact: true })).toHaveCount(2)
  expect(calls).toHaveLength(2)
  expect(calls.every(url => url.includes('ollama.com'))).toBe(true)
})
