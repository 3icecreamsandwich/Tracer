import { join } from '@tauri-apps/api/path'
import { readDir, readFile, stat } from '@tauri-apps/plugin-fs'
import { mapConcurrent } from '../concurrency'
import type { LinkedFolderFile } from '../../db/types'
import type { GenerateSourceFile, GenerateSourceKind } from '../source-extraction'

export const LINKED_FOLDER_TEXT_MAX_BYTES = 2 * 1024 * 1024
export const LINKED_FOLDER_IMAGE_MAX_BYTES = 20 * 1024 * 1024
export const LINKED_FOLDER_PDF_MAX_BYTES = 50 * 1024 * 1024

export type LinkedFolderSource = GenerateSourceFile & {
  modifiedAtMs: number | null
  absolutePath: string
  relativePath: string
  sizeBytes: number
  contentHash: string
}

export type IgnoredLinkedFolderFile = {
  modifiedAtMs?: number | null
  status?: LinkedFolderFile['status']
  relativePath: string
  sizeBytes: number
  contentHash?: string
  reason: string
  isError: boolean
}

export type ScanLinkedFolderResult = {
  sources: LinkedFolderSource[]
  ignored: IgnoredLinkedFolderFile[]
}

function extensionOf(name: string) {
  const dot = name.lastIndexOf('.')
  return dot >= 0 ? name.slice(dot).toLowerCase() : ''
}

function classifyFile(name: string): {
  kind: GenerateSourceKind
  mimeType: string
  maxBytes: number
} {
  const extension = extensionOf(name)
  if (extension === '.pdf') {
    return { kind: 'pdf', mimeType: 'application/pdf', maxBytes: LINKED_FOLDER_PDF_MAX_BYTES }
  }
  if (extension === '.png') {
    return { kind: 'image', mimeType: 'image/png', maxBytes: LINKED_FOLDER_IMAGE_MAX_BYTES }
  }
  if (extension === '.jpg' || extension === '.jpeg') {
    return { kind: 'image', mimeType: 'image/jpeg', maxBytes: LINKED_FOLDER_IMAGE_MAX_BYTES }
  }
  return { kind: 'text', mimeType: 'text/plain;charset=utf-8', maxBytes: LINKED_FOLDER_TEXT_MAX_BYTES }
}

function maxSizeReason(kind: GenerateSourceKind) {
  if (kind === 'pdf') return 'PDF exceeds the 50 MB linked-folder limit.'
  if (kind === 'image') return 'Image exceeds the 20 MB linked-folder limit.'
  return 'Text file exceeds the 2 MB linked-folder limit.'
}

function isStrictUtf8(bytes: Uint8Array) {
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(bytes)
    return true
  } catch {
    return false
  }
}

async function sha256(bytes: Uint8Array) {
  const copied = new Uint8Array(bytes)
  const digest = await crypto.subtle.digest('SHA-256', copied.buffer)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export type LinkedFolderScanOptions = {
  knownFiles?: ReadonlyMap<string, LinkedFolderFile>
  // Native paths are used only to filter a safe directory walk (never followed directly).
  changedPaths?: ReadonlySet<string>
}

export async function scanLinkedFolder(
  rootPath: string,
  knownPaths: ReadonlySet<string> = new Set(),
  knownHashes: ReadonlySet<string> = new Set(),
  options: LinkedFolderScanOptions = {}
): Promise<ScanLinkedFolderResult> {
  const sources: LinkedFolderSource[] = []
  const ignored: IgnoredLinkedFolderFile[] = []
  const seenHashes = new Set(knownHashes)
  const candidates: Array<{ absolutePath: string; relativePath: string; name: string }> = []
  const normalizePath = (path: string) => path.replaceAll('\\', '/').replace(/\/$/, '')
  const changed = options.changedPaths ? [...options.changedPaths].map(normalizePath) : null
  const relevant = (path: string) => !changed || changed.some((item) => {
    const normalized = normalizePath(path)
    return normalized === item || normalized.startsWith(item + '/') || item.startsWith(normalized + '/')
  })

  async function visitDirectory(absoluteDirectory: string, relativeParts: string[]) {
    const entries = (await readDir(absoluteDirectory)).filter((entry) => !entry.name.startsWith('.') && !entry.isSymlink)
    const paths = await mapConcurrent(entries, 4, async (entry) => ({ entry, path: await join(absoluteDirectory, entry.name) }))
    for (const { entry, path: absolutePath } of paths) {
      if (!relevant(absolutePath)) continue
      const relativePath = [...relativeParts, entry.name].join('/')
      if (entry.isDirectory) {
        await visitDirectory(absolutePath, [...relativeParts, entry.name])
      } else if (entry.isFile && (options.knownFiles || !knownPaths.has(relativePath))) {
        candidates.push({ absolutePath, relativePath, name: entry.name })
      }
    }
  }
  await visitDirectory(rootPath, [])

  // Process small windows so a large folder does not retain every raw read buffer.
  for (let offset = 0; offset < candidates.length; offset += 4) {
    const results = await mapConcurrent(candidates.slice(offset, offset + 4), 4, async (candidate) => {
      const { absolutePath, relativePath, name } = candidate
      const info = await stat(absolutePath)
      if (!info.isFile || info.isSymlink) return null
      const modifiedAtMs = info.mtime?.getTime() ?? null
      const previous = options.knownFiles?.get(relativePath)
      // A direct watcher event forces a content check even on coarse-timestamp filesystems.
      if (!changed && previous && previous.status !== 'failed' && modifiedAtMs !== null &&
          previous.modifiedAtMs === modifiedAtMs && previous.sizeBytes === info.size) return null
      const classification = classifyFile(name)
      const metadata = { relativePath, sizeBytes: info.size, modifiedAtMs }
      if (info.size > classification.maxBytes) {
        return { ignored: { ...metadata, reason: maxSizeReason(classification.kind), isError: true } }
      }
      const bytes = await readFile(absolutePath)
      const contentHash = await sha256(bytes)
      // Preserve successful status when a touch/rename/restart finds the same content.
      if (previous?.contentHash === contentHash && previous.status !== 'failed') {
        return { ignored: { ...metadata, contentHash, status: previous.status, reason: previous.error ?? '', isError: !!previous.error } }
      }
      if (classification.kind === 'text' && !isStrictUtf8(bytes)) {
        return { ignored: { ...metadata, contentHash, reason: 'File is not valid UTF-8 text.', isError: true } }
      }
      return { source: {
        ...metadata, id: relativePath, absolutePath, contentHash, kind: classification.kind,
        file: new File([bytes], relativePath, { type: classification.mimeType })
      } satisfies LinkedFolderSource }
    })
    // Deduplicate in traversal order, independent of read/hash completion order.
    for (const result of results) {
      if (!result) continue
      if (result.ignored) { ignored.push(result.ignored); continue }
      const source = result.source!
      if (seenHashes.has(source.contentHash)) {
        ignored.push({ relativePath: source.relativePath, sizeBytes: source.sizeBytes,
          modifiedAtMs: source.modifiedAtMs, contentHash: source.contentHash,
          reason: 'This file content was already imported under another path.', isError: false })
      } else {
        seenHashes.add(source.contentHash)
        sources.push(source)
      }
    }
  }
  return { sources, ignored }
}
