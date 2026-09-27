import { describe, expect, it } from 'vitest'
import { getPageTitleFallback } from '../../src/composables/page-metadata'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

describe('page metadata', () => {
  it('ships a PNG favicon in the initial Nuxt document head', () => {
    const config = readFileSync(fileURLToPath(new URL('../../nuxt.config.ts', import.meta.url)), 'utf8')
    const favicon = readFileSync(fileURLToPath(new URL('../../public/tracer-favicon.png', import.meta.url)))
    expect(config).toContain("rel: 'icon'")
    expect(config).toContain("type: 'image/png'")
    expect(config).toContain("href: '/tracer-favicon.png'")
    expect(favicon.subarray(1, 4).toString()).toBe('PNG')
  })

  it.each([
    ['/', 'Library'],
    ['/create/generate', 'Generate'],
    ['/create/basic', 'Create Set'],
    ['/settings', 'Settings'],
    ['/public-sets', 'Explore Sets'],
    ['/teacher/classes/class-1/manage', 'Manage Class'],
    ['/student/classes/class-1', 'Class'],
    ['/set/set-1-flashcards', 'Set'],
    ['/study-guide/set-1', 'Study Guide'],
  ])('provides a useful fallback title for %s', (path, expected) => {
    expect(getPageTitleFallback(path)).toBe(expected)
  })
})
