import { describe, expect, it, vi } from 'vitest'
import { createFoldersRepo } from '../../src/composables/db/repos/folders.repo'

describe('folder deletion', () => {
  it('still deletes a folder when an older local database has no ordering table', async () => {
    const execute = vi
      .fn()
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('no such table: home_library_order'))
    const repo = createFoldersRepo({ execute, select: vi.fn() })

    await expect(repo.delete('00000000-0000-4000-8000-000000000001')).resolves.toBeUndefined()

    expect(execute.mock.calls.map(([sql]) => sql)).toEqual([
      expect.stringContaining('UPDATE flashcard_sets SET folder_id = NULL'),
      expect.stringContaining('DELETE FROM folders'),
      expect.stringContaining('DELETE FROM home_library_order')
    ])
  })
})
