import { test, expect, type Page } from '@playwright/test'

const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE
const NOW = Date.UTC(2026, 8, 4, 12)
const key = 'tracer:smart-review-cards:web-preview:demo'

async function enable(page: Page) {
  await page.getByRole('button', { name: 'Flashcard settings', exact: true }).click()
  await page.getByRole('menuitemcheckbox', { name: 'Smart Review', exact: true }).click()
  await expect(page.getByRole('button', { name: 'All (2)', exact: true })).toBeVisible()
}

async function reviews(page: Page) {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key) || '{}'), key)
}

for (const [view, path] of [
  ['embedded', '/set/demo?mode=flashcards'],
  ['fullscreen', '/set/demo-flashcards'],
] as const) {
  test(`${view}: records answers, persists schedules across views, and graduates after three successes`, async ({ page }) => {
    await page.clock.setFixedTime(NOW)
    await page.goto(path)
    await enable(page)
    for (const [index, delay] of [15 * MINUTE, 45 * MINUTE, DAY].entries()) {
      await page.getByRole('button', { name: 'Got it', exact: true }).click()
      await expect.poll(async () => (await reviews(page))['t-1']?.repetitions).toBe(index + 1)
      await page.getByRole('button', { name: 'Got it', exact: true }).click()
      await expect(page.getByRole('heading', { name: 'Results', exact: true })).toBeVisible()
      const saved = await reviews(page)
      for (const id of ['t-1', 't-2']) {
        expect(saved[id].nextReviewAt - saved[id].lastReviewAt).toBeCloseTo(delay)
      }
      if (index < 2) await page.getByRole('button', { name: 'Restart', exact: true }).first().click()
    }
    await expect(page.getByRole('button', { name: 'Strong (2)', exact: true })).toBeVisible()
    const saved = await reviews(page)
    await page.goto(view === 'embedded' ? '/set/demo-flashcards' : '/set/demo?mode=flashcards')
    await expect(page.getByRole('button', { name: 'Strong (2)', exact: true })).toBeVisible()
    expect(await reviews(page)).toEqual(saved)
    await page.getByRole('button', { name: 'Missed it', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Learning (1)', exact: true })).toBeVisible()
    const missed = Object.values(await reviews(page)).find((review: any) => review.lapses === 1) as any
    expect(missed.repetitions).toBe(0)
    expect(missed.nextReviewAt - missed.lastReviewAt).toBeCloseTo(15 * MINUTE)
  })

  test(`${view}: prioritizes ready cards and keeps completion stable as a filtered card graduates`, async ({ page }) => {
    await page.clock.setFixedTime(NOW)
    await page.addInitScript(({ key, now }) => {
      localStorage.setItem('tracer:smart-review:web-preview:demo', 'true')
      localStorage.setItem(key, JSON.stringify({
        't-1': { schedulerVersion: 3, lastReviewAt: now, nextReviewAt: now + 86400000, repetitions: 3, stability: 1, difficulty: 5, lapses: 0 },
        't-2': { schedulerVersion: 3, lastReviewAt: now - 2700000, nextReviewAt: now, repetitions: 2, stability: 0.03, difficulty: 5, lapses: 0 },
      }))
    }, { key, now: NOW })
    await page.goto(path)
    await expect(page.getByRole('button', { name: 'Term Term 2', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Ready now (1)', exact: true }).click()
    await page.getByRole('button', { name: 'Got it', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Results', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Strong (2)', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Strong (2)', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Got it', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Review now (0)', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Results', exact: true })).toBeVisible()
  })

  test(`${view}: updates the ready count when time passes and offers those cards`, async ({ page }) => {
    await page.clock.install({ time: NOW })
    await page.goto(path)
    await enable(page)
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button', { name: 'Got it', exact: true }).click()
      await expect.poll(async () => Object.keys(await reviews(page)).length).toBe(i + 1)
    }
    await expect(page.getByRole('heading', { name: 'Results', exact: true })).toBeVisible()
    // The displayed countdown refreshes on the viewer's 30-second clock.
    await page.clock.fastForward(30_000)
    await expect(page.getByText(/Nothing ready · Next in 15 min/)).toBeVisible()
    await page.clock.fastForward(16 * MINUTE)
    await expect(page.getByRole('button', { name: 'Ready now (2)', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Ready now (2)', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Got it', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Results', exact: true })).toHaveCount(0)
  })

  test(`${view}: refreshes a previously empty ready filter after cards become due`, async ({ page }) => {
    await page.clock.install({ time: NOW })
    await page.goto(path)
    await enable(page)
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button', { name: 'Got it', exact: true }).click()
      await expect.poll(async () => Object.keys(await reviews(page)).length).toBe(i + 1)
    }
    await page.getByRole('button', { name: 'Review now (0)', exact: true }).click()
    await page.getByRole('button', { name: 'All (2)', exact: true }).click()
    await page.clock.fastForward(16 * MINUTE)
    await page.getByRole('button', { name: 'Ready now (2)', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Got it', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Got it', exact: true }).click()
    await expect.poll(async () => (await reviews(page))['t-1']?.repetitions).toBe(2)
    await page.getByRole('button', { name: 'All (2)', exact: true }).click()
    await page.getByRole('button', { name: 'Ready now (1)', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Term Term 2', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Got it', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Results', exact: true })).toBeVisible()
    const saved = await reviews(page)
    expect(saved['t-1'].repetitions).toBe(2)
    expect(saved['t-2'].repetitions).toBe(2)
  })

  test(`${view}: leaves scheduling history untouched while Smart Review is off`, async ({ page }) => {
    await page.goto(path)
    await page.getByRole('button', { name: 'Got it', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Term Term 2', exact: true })).toBeVisible()
    expect(await reviews(page)).toEqual({})
  })
}
