import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { scanBrowserLinkedFolder } from '../../src/composables/generate/linked-folders/browser'

const generatePage = readFileSync(new URL('../../pages/create/generate.vue', import.meta.url), 'utf8')

function fileHandle(name: string, contents: string, lastModified = 100) {
  return {
    kind: 'file' as const,
    name,
    async getFile() {
      return new File([contents], name, { type: 'text/plain', lastModified })
    }
  }
}

function directoryHandle(name: string, entries: Array<ReturnType<typeof fileHandle> | ReturnType<typeof directoryHandle>>) {
  return {
    kind: 'directory' as const,
    name,
    async *values() { yield *entries }
  }
}

describe('browser linked folders', () => {
  it('renders Link folder on the web and routes it through the browser picker', () => {
    expect(generatePage).not.toMatch(/v-if="hasTauriInternals"/)
    expect(generatePage).toContain('createSetFromBrowserLinkedFolder')
  })

  it('walks nested browser directory handles and preserves relative paths', async () => {
    const handle = directoryHandle('Notes', [
      fileHandle('overview.txt', 'Overview'),
      directoryHandle('chapter-1', [fileHandle('lesson.txt', 'Lesson')]),
      fileHandle('.hidden.txt', 'Hidden')
    ])

    const scan = await scanBrowserLinkedFolder(handle)

    expect(scan.sources.map((source) => source.relativePath)).toEqual([
      'overview.txt',
      'chapter-1/lesson.txt'
    ])
    expect(scan.sources.every((source) => source.contentHash.length === 64)).toBe(true)
  })

  it('skips unchanged files when syncing a persisted directory handle', async () => {
    const handle = directoryHandle('Notes', [fileHandle('overview.txt', 'Overview')])
    const initial = await scanBrowserLinkedFolder(handle)
    const source = initial.sources[0]!
    const known = new Map([[source.relativePath, {
      setId: 'set', relativePath: source.relativePath, sizeBytes: source.sizeBytes,
      modifiedAtMs: source.modifiedAtMs, contentHash: source.contentHash,
      status: 'processed' as const, error: null, discoveredAt: '', processedAt: ''
    }]])

    expect((await scanBrowserLinkedFolder(handle, known)).sources).toEqual([])
  })
})
