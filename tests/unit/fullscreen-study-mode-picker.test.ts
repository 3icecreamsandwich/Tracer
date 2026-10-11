import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

function source(path: string) {
  return readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8')
}

describe('fullscreen study mode picker', () => {
  it('is shared by every fullscreen study route with the correct active mode', () => {
    const routes = [
      ['flashcards', '../../pages/set/[id]-flashcards.vue'],
      ['learn', '../../pages/set/[id]-learn.vue'],
      ['match', '../../pages/set/[id]-match.vue'],
      ['test', '../../pages/set/[id]-test.vue'],
    ] as const

    for (const [mode, path] of routes) {
      expect(source(path)).toContain(`<FullscreenStudyModePicker mode="${mode}"`)
    }
  })

  it('renders four icon-only choices and preserves the current query', () => {
    const picker = source('../../components/FullscreenStudyModePicker.vue')

    expect(picker).toContain("'flashcards' | 'learn' | 'match' | 'test'")
    expect(picker).toContain("query: { ...route.query }")
    expect(picker).toContain('role="menuitemradio"')
    expect(picker).toContain(':aria-label="item.label"')
    expect(picker).not.toContain('{{ item.label }}')
  })

  it('routes Test mode switches through the existing quit confirmation', () => {
    const testPage = source('../../pages/set/[id]-test.vue')

    expect(testPage).toContain('@select="requestStudyMode"')
    expect(testPage).toContain('pendingTestExit.value = "mode"')
    expect(testPage).toContain('await router.push(pendingStudyModePath.value)')
  })
})
