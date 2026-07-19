import { join } from '@tauri-apps/api/path'
import { readDir, readFile, stat } from '@tauri-apps/plugin-fs'
import type { GenerateSourceFile, GenerateSourceKind } from '../source-extraction'

export const LINKED_FOLDER_TEXT_MAX_BYTES = 2 * 1024 * 1024
export const LINKED_FOLDER_IMAGE_MAX_BYTES = 20 * 1024 * 1024
export const LINKED_FOLDER_PDF_MAX_BYTES = 50 * 1024 * 1024

export type LinkedFolderSource = GenerateSourceFile & {
  absolutePath: string
  relativePath: string
  sizeBytes: number
  contentHash: string
}

export type IgnoredLinkedFolderFile = {
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

export async function scanLinkedFolder(
  rootPath: string,
  knownPaths: ReadonlySet<string> = new Set(),
  knownHashes: ReadonlySet<string> = new Set()
): Promise<ScanLinkedFolderResult> {
  const sources: LinkedFolderSource[] = []
  const ignored: IgnoredLinkedFolderFile[] = []
  const seenHashes = new Set(knownHashes)

  async function visitDirectory(absoluteDirectory: string, relativeParts: string[]) {
    const entries = await readDir(absoluteDirectory)
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.isSymlink) continue

      const relativePath = [...relativeParts, entry.name].join('/')
      const absolutePath = await join(absoluteDirectory, entry.name)

      if (entry.isDirectory) {
        await visitDirectory(absolutePath, [...relativeParts, entry.name])
        continue
      }
      if (!entry.isFile || knownPaths.has(relativePath)) continue

      const info = await stat(absolutePath)
      if (!info.isFile || info.isSymlink) continue

      const classification = classifyFile(entry.name)
      if (info.size > classification.maxBytes) {
        ignored.push({
          relativePath,
          sizeBytes: info.size,
          reason: maxSizeReason(classification.kind),
          isError: true
        })
        continue
      }

      const bytes = await readFile(absolutePath)
      const contentHash = await sha256(bytes)
      if (seenHashes.has(contentHash)) {
        ignored.push({
          relativePath,
          sizeBytes: info.size,
          contentHash,
          reason: 'This file content was already imported under another path.',
          isError: false
        })
        continue
      }
      seenHashes.add(contentHash)
      if (classification.kind === 'text' && !isStrictUtf8(bytes)) {
        ignored.push({
          relativePath,
          sizeBytes: info.size,
          contentHash,
          reason: 'File is not valid UTF-8 text.',
          isError: true
        })
        continue
      }

      sources.push({
        id: relativePath,
        absolutePath,
        relativePath,
        sizeBytes: info.size,
        contentHash,
        kind: classification.kind,
        file: new File([bytes], relativePath, { type: classification.mimeType })
      })
    }
  }

  await visitDirectory(rootPath, [])
  return { sources, ignored }
}
