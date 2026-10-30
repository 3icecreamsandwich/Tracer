import { expect, test } from '@playwright/test'

test('description grows and shrinks with its content', async ({ page }) => {
  await page.goto('/set/demo/edit')
  const description = page.locator('#set-description')
  await expect(description).toBeVisible()
  await description.fill('A short description')
  const short = await description.evaluate(el => el.getBoundingClientRect().height)
  await description.fill('First line\nSecond line\nThird line\nFourth line\nFifth line\nSixth line')
  await expect.poll(() => description.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThan(short)
  expect(await description.evaluate(el => el.scrollHeight <= el.clientHeight + 1)).toBe(true)
  await description.fill('Short again')
  await expect.poll(() => description.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(short + 5)
})
