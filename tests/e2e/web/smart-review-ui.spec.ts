import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  for (const [view, path] of [['embedded', '/set/demo?mode=flashcards'], ['fullscreen', '/set/demo-flashcards']] as const) {
    test(`${view} ${width}px: concise ratings, click feedback, and mobile layout`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const star = page.getByRole('button', { name: 'Star card', exact: true })
      await expect(star).toBeVisible()
      const card = page.locator('button[aria-label="Star card"]:visible, button[aria-label="Unstar card"]:visible').locator('..').locator('button').first()
      const cardBox = await card.boundingBox()
      const starBox = await star.boundingBox()
      expect(starBox!.x + starBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width)
      expect(starBox!.y + starBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height)
      expect(starBox!.x).toBeGreaterThan(cardBox!.x + cardBox!.width / 2)
      expect(starBox!.y).toBeGreaterThan(cardBox!.y + cardBox!.height / 2)
      await star.click()
      await expect(page.getByRole('button', { name: 'Unstar card', exact: true })).toBeVisible()
      await expect(card).toContainText('Term 1')
      await card.click()
      await expect(card).toContainText('Definition 1')
      await expect(page.getByRole('button', { name: 'Unstar card', exact: true })).toBeVisible()
      await card.click()
      await expect(card).toContainText('Term 1')
      if (view === 'embedded' && width === 390) {
        await page.locator('summary[aria-label="Flashcard settings"]:visible').click()
      } else {
        await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
      }
      await page.getByRole('menuitemcheckbox', { name: 'Smart Review', exact: true }).click()
      const group = page.getByRole('group', { name: 'Rate your recall', exact: true })
      await expect(group).toBeVisible()
      await expect(group.getByRole('button')).toHaveCount(5)
      await expect(page.getByRole('button', { name: 'Unstar card', exact: true })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Got it', exact: true })).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Next', exact: true })).toHaveCount(0)
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      const grade = page.getByRole('button', { name: '4 · Easy', exact: true })
      await grade.scrollIntoViewIfNeeded()
      await page.screenshot({ path: `/tmp/tracer-review-${view}-${width}.png` })
      const box = await grade.boundingBox()
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
      await page.mouse.down()
      await expect.poll(() => grade.evaluate(el => getComputedStyle(el).scale)).toBe('0.98')
      await page.screenshot({ path: `/tmp/tracer-review-${view}-${width}-pressed.png` })
      await page.mouse.up()
      await expect(grade).toBeDisabled()
      await expect(page.getByRole('button', { name: 'Term Term 2', exact: true })).toBeVisible()
    })
  }
}

test('page transitions and reduced motion share accessible timing', async ({ page }) => {
  await page.goto('/settings')
  await page.getByRole('link', { name: 'Home', exact: true }).click()
  await expect(page.locator('.page-enter-active')).toBeVisible()
  await page.screenshot({ path: '/tmp/tracer-page-transition.png' })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('link', { name: 'Settings', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible()
  await expect(page.locator('.page-enter-active')).toHaveCount(0)
  const toggle = page.getByRole('region', { name: 'Theme', exact: true }).getByRole('button')
  expect(await toggle.evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s')
})

for (const width of [390, 1280]) {
  for (const [view, path] of [['embedded', '/set/demo?mode=flashcards'], ['fullscreen', '/set/demo-flashcards']] as const) {
    test(`${view} ${width}px: counter and previous/next completion`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const next = page.getByRole('button', { name: /^(Next|Next →)$/ })
      const prev = page.getByRole('button', { name: /^(Prev|← Prev)$/ })
      await expect(page.getByText('1/2', { exact: true }).filter({ visible: true }).first()).toBeVisible()
      const star = page.getByRole('button', { name: 'Star card', exact: true })
      await star.focus()
      await page.keyboard.press('Space')
      await expect(page.getByRole('button', { name: 'Unstar card', exact: true })).toBeVisible()
      await expect(page.getByText('Term 1', { exact: true }).filter({ visible: true }).first()).toBeVisible()
      await next.click()
      await expect(page.getByText('2/2', { exact: true }).filter({ visible: true }).first()).toBeVisible()
      await expect(page.getByText('Term 2', { exact: true }).filter({ visible: true }).first()).toBeVisible()
      await prev.click()
      await expect(page.getByText('1/2', { exact: true }).filter({ visible: true }).first()).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Results', exact: true })).toHaveCount(0)
      await next.click()
      await expect(page.getByText('2/2', { exact: true }).filter({ visible: true }).first()).toBeVisible()
      await next.click()
      await expect(page.getByRole('heading', { name: 'Results', exact: true })).toBeVisible()
    })
  }
}
