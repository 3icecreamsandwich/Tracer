import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearCachedHomeDashboard,
  getCachedHomeDashboard,
  setCachedHomeDashboard,
  toHomeDashboardSetItem,
} from '../../src/composables/home-dashboard-cache'

describe('home dashboard cache', () => {
  beforeEach(clearCachedHomeDashboard)

  it('returns isolated snapshots for immediate repeat rendering', () => {
    setCachedHomeDashboard({
      items: [{
        kind: 'set',
        kindLabel: 'Set',
        id: 'set-1',
        folderId: null,
        title: 'Biology',
        subtitle: null,
        cardCount: 12,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z',
      }],
      folders: [],
      homeOrder: [],
    })

    const first = getCachedHomeDashboard()
    expect(first?.items[0]).toMatchObject({ title: 'Biology', cardCount: 12 })
    first!.items[0]!.title = 'Changed locally'
    expect(getCachedHomeDashboard()?.items[0]?.title).toBe('Biology')
  })

  it('maps list rows without needing full term data', () => {
    expect(toHomeDashboardSetItem({
      id: 'set-1',
      folderId: null,
      title: 'Biology',
      description: 'Cells',
      cardCount: 24,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-02T00:00:00Z',
    })).toMatchObject({
      id: 'set-1',
      title: 'Biology',
      cardCount: 24,
    })
  })
})
