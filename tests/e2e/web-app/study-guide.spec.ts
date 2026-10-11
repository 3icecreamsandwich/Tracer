import { test, expect } from '@playwright/test'

test('catalog guide opens without signing in and renders content after a code example', async ({ context, page }) => {
  const id = '00000000-0000-4000-8000-000000000099'
  await context.route('**/rest/v1/published_sets?**', route => route.fulfill({ json: {
    id, title: 'Java guide fixture', description: null, publisher_name: 'Teacher',
    publisher_username: null, publisher_is_dev: false, tags: [], allow_copying: true,
    card_count: 1, terms: [{ id: 'card', front: 'Class', back: 'Blueprint' }],
    created_at: '2026-01-01', updated_at: '2026-01-01', icon_key: null, icon_tone: null,
    study_guide_markdown: '# Complete guide\n\n```java\nSystem.out.println("Hello");\n```\n\n## Final summary\nThis content must remain visible.',
  } }))
  await page.goto(`public-sets/${id}`)
  await page.getByRole('link', { name: 'Study guide', exact: true }).first().click()
  await expect(page).toHaveURL(new RegExp(`/study-guide/${id}\\?published=1`))
  await expect(page.getByRole('heading', { name: 'Final summary' })).toBeVisible()
  await expect(page.locator('pre code')).toContainText('System.out.println')
  await expect(page.getByTestId('linked-set-link')).toHaveAttribute('href', `/public-sets/${id}`)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Final summary' })).toBeVisible()
})
