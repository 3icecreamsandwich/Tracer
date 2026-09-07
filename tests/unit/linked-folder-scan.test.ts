import { beforeEach, describe, expect, it, vi } from 'vitest'

const fsMocks = vi.hoisted(() => ({
  readDir: vi.fn(),
  readFile: vi.fn(),
  stat: vi.fn()
}))

vi.mock('@tauri-apps/plugin-fs', () => fsMocks)
vi.mock('@tauri-apps/api/path', () => ({
  join: vi.fn(async (...parts: string[]) => parts.join('/'))
}))

class TestFile extends Blob {
  name: string
  lastModified: number

  constructor(parts: BlobPart[], name: string, options?: FilePropertyBag) {
    super(parts, options)
    this.name = name
    this.lastModified = options?.lastModified ?? Date.now()
  }
}

async function hash(bytes: Uint8Array) {
  const copied = new Uint8Array(bytes)
  const digest = await crypto.subtle.digest('SHA-256', copied.buffer)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

describe('linked-folder scanning', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('File', TestFile)
  })

  it('recurses visible directories, skips hidden entries and symlinks, and deduplicates content', async () => {
    const textBytes = new TextEncoder().encode('New readable UTF-8 source.')
    const photoBytes = new Uint8Array([1, 2, 3, 4])
    const binaryBytes = new Uint8Array([0xff, 0xfe, 0xfd])

    fsMocks.readDir.mockImplementation(async (directory: string) => {
      if (directory === '/root') {
        return [
          { name: 'nested', isDirectory: true, isFile: false, isSymlink: false },
          { name: '.hidden', isDirectory: true, isFile: false, isSymlink: false },
          { name: 'alias', isDirectory: true, isFile: false, isSymlink: true },
          { name: 'old.txt', isDirectory: false, isFile: true, isSymlink: false },
          { name: 'new.txt', isDirectory: false, isFile: true, isSymlink: false },
          { name: 'binary.dat', isDirectory: false, isFile: true, isSymlink: false }
        ]
      }
      if (directory === '/root/nested') {
        return [
          { name: 'photo.jpg', isDirectory: false, isFile: true, isSymlink: false },
          { name: '.secret.txt', isDirectory: false, isFile: true, isSymlink: false }
        ]
      }
      throw new Error(`Unexpected directory: ${directory}`)
    })
    fsMocks.stat.mockImplementation(async (filePath: string) => ({
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      size: filePath.endsWith('new.txt')
        ? textBytes.length
        : filePath.endsWith('photo.jpg')
          ? photoBytes.length
          : binaryBytes.length
    }))
    fsMocks.readFile.mockImplementation(async (filePath: string) => {
      if (filePath.endsWith('new.txt')) return textBytes
      if (filePath.endsWith('photo.jpg')) return photoBytes
      if (filePath.endsWith('binary.dat')) return binaryBytes
      throw new Error(`Unexpected file: ${filePath}`)
    })

    const { scanLinkedFolder } = await import(
      '../../src/composables/generate/linked-folders/scan'
    )
    const result = await scanLinkedFolder(
      '/root',
      new Set(['old.txt']),
      new Set([await hash(photoBytes)])
    )

    expect(result.sources.map((source) => source.relativePath)).toEqual(['new.txt'])
    expect(result.sources[0]).toEqual(
      expect.objectContaining({ kind: 'text', sizeBytes: textBytes.length })
    )
    expect(result.ignored).toEqual([
      expect.objectContaining({
        relativePath: 'nested/photo.jpg',
        reason: expect.stringContaining('already imported')
      }),
      expect.objectContaining({
        relativePath: 'binary.dat',
        reason: expect.stringContaining('not valid UTF-8')
      })
    ])
    expect(fsMocks.readDir).toHaveBeenCalledTimes(2)
    expect(fsMocks.readFile).not.toHaveBeenCalledWith('/root/old.txt')
    expect(fsMocks.readFile).not.toHaveBeenCalledWith('/root/nested/.secret.txt')
  })
  it('reads at most four files concurrently and deduplicates in directory order', async () => {
    fsMocks.readDir.mockResolvedValue(Array.from({ length: 8 }, (_, i) => ({ name: `${i}.txt`, isFile: true })))
    fsMocks.stat.mockResolvedValue({ isFile: true, size: 5, mtime: new Date(100) })
    let active = 0
    let peak = 0
    fsMocks.readFile.mockImplementation(async (path: string) => {
      active++
      peak = Math.max(peak, active)
      await new Promise((resolve) => setTimeout(resolve, path.endsWith('0.txt') ? 15 : 2))
      active--
      return new TextEncoder().encode('same text')
    })
    const { scanLinkedFolder } = await import('../../src/composables/generate/linked-folders/scan')
    const result = await scanLinkedFolder('/root')
    expect(peak).toBe(4)
    expect(result.sources.map((source) => source.relativePath)).toEqual(['0.txt'])
    expect(result.ignored).toHaveLength(7)
  })

  it('skips unchanged bytes, checks edited paths, and retries failed files', async () => {
    fsMocks.readDir.mockResolvedValue([{ name: 'notes.txt', isFile: true }])
    fsMocks.stat.mockResolvedValue({ isFile: true, size: 7, mtime: new Date(100) })
    fsMocks.readFile.mockResolvedValue(new TextEncoder().encode('updated'))
    const previous = { relativePath: 'notes.txt', modifiedAtMs: 100, sizeBytes: 7, status: 'processed', contentHash: 'old' } as any
    const { scanLinkedFolder } = await import('../../src/composables/generate/linked-folders/scan')
    const knownFiles = new Map([['notes.txt', previous]])
    expect((await scanLinkedFolder('/root', new Set(), new Set(['old']), { knownFiles })).sources).toEqual([])
    expect(fsMocks.readFile).not.toHaveBeenCalled()
    expect((await scanLinkedFolder('/root', new Set(), new Set(['old']), {
      knownFiles, changedPaths: new Set(['/root/notes.txt'])
    })).sources).toHaveLength(1)
    previous.status = 'failed'
    expect((await scanLinkedFolder('/root', new Set(), new Set(), { knownFiles })).sources).toHaveLength(1)
  })

  it('limits watcher scans to changed subtrees and preserves status on touches', async () => {
    const bytes = new TextEncoder().encode('same content')
    fsMocks.readDir.mockImplementation(async (path: string) => path === '/root' ? [
      { name: 'unrelated', isDirectory: true }, { name: 'notes.txt', isFile: true }
    ] : [])
    fsMocks.stat.mockResolvedValue({ isFile: true, size: bytes.length, mtime: new Date(200) })
    fsMocks.readFile.mockResolvedValue(bytes)
    const contentHash = await hash(bytes)
    const previous = { relativePath: 'notes.txt', modifiedAtMs: 100, sizeBytes: bytes.length, status: 'processed', contentHash, error: null } as any
    const { scanLinkedFolder } = await import('../../src/composables/generate/linked-folders/scan')
    const result = await scanLinkedFolder('/root', new Set(), new Set([contentHash]), {
      knownFiles: new Map([['notes.txt', previous]]), changedPaths: new Set(['/root/notes.txt'])
    })
    expect(fsMocks.readDir).toHaveBeenCalledTimes(1)
    expect(result.sources).toEqual([])
    expect(result.ignored[0]).toMatchObject({ status: 'processed', modifiedAtMs: 200, isError: false })
  })

})
