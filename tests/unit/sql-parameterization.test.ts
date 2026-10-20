import { describe, expect, it, vi } from 'vitest'
import { createSetsRepo } from '../../src/composables/db/repos/sets.repo'

describe('SQL parameterization', () => {
  it('binds SQL-looking set content as data instead of inserting it into a query', async () => {
    const suspiciousTitle = "Study'); DROP TABLE flashcard_sets; --"
    const execute = vi.fn().mockResolvedValue(undefined)
    const select = vi.fn().mockResolvedValue([
      {
        id: '00000000-0000-4000-8000-000000000201',
        folder_id: null,
        title: suspiciousTitle,
        description: null,
        icon_key: null,
        icon_tone: null,
        terms_json: '[]',
        created_at: '2026-01-01 00:00:00',
        updated_at: '2026-01-01 00:00:00'
      }
    ])
    const repo = createSetsRepo({ execute, select })

    await repo.create({
      id: '00000000-0000-4000-8000-000000000201',
      title: suspiciousTitle,
      terms: []
    })

    const [query, bindings] = execute.mock.calls[0]!
    expect(query).toContain('VALUES (?, ?, ?, ?, ?, ?,')
    expect(query).not.toContain(suspiciousTitle)
    expect(bindings).toContain(suspiciousTitle)
  })
})
