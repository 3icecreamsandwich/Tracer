import { describe, expect, it } from 'vitest'
import { getPageTitleFallback } from '../../src/composables/page-metadata'

describe('page metadata', () => {
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
