import { expect, test } from '@playwright/test'

test('practice test: launches fullscreen, grades on submit, and reviews answers', async ({
  page,
}) => {
  await page.goto('/set/demo?mode=learn&seed=1')

  await page.getByRole('button', { name: 'Settings' }).click()
  await page.getByRole('button', { name: 'Test', exact: true }).click()
  await page.getByRole('button', { name: 'Restart test' }).click()

  await expect(page).toHaveURL(/\/set\/demo-test\?/)
  await expect(page.getByRole('heading', { name: 'Test' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Test questions' })).toBeVisible()

  const submit = page.getByRole('button', { name: 'Submit test' })
  await expect(submit).toBeDisabled()

  await page.getByRole('button', { name: 'True', exact: true }).first().click()
  await page.getByRole('button', { name: 'False', exact: true }).nth(1).click()
  await expect(submit).toBeEnabled()

  await submit.click()

  await expect(page.getByText('Test complete')).toBeVisible()
  await expect(page.getByRole('button', { name: /See what you got wrong/ })).toBeVisible()
  await expect(page.locator('article.border-emerald-300')).toHaveCount(1)
  await expect(page.locator('article.border-red-300')).toHaveCount(1)

  await page.getByRole('button', { name: /See what you got wrong/ }).click()
  await expect(page.getByRole('region', { name: 'Test questions' })).toBeInViewport()
})
