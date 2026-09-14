import type { LinkedFolderFile } from '../../db'
import type { GenerateSourceFile, GenerateSourceKind } from '../source-extraction'

const TEXT_MAX_BYTES = 2 * 1024 * 1024
const IMAGE_MAX_BYTES = 20 * 1024 * 1024
const PDF_MAX_BYTES = 50 * 1024 * 1024

export type BrowserDirectoryHandle = {
  name: string
  kind: 'directory'
  values(): AsyncIterableIterator<BrowserDirectoryHandle | BrowserFileHandle>
  queryPermission?(options: { mode: 'read' }): Promise<PermissionState>
  requestPermission?(options: { mode: 'read' }): Promise<PermissionState>
}

type BrowserFileHandle = {
  name: string
  kind: 'file'
  getFile(): Promise<File>
}

export type BrowserLinkedFolderSource = GenerateSourceFile & {
  relativePath: string
  sizeBytes: number
  modifiedAtMs: number | null
  contentHash: string
}

export type IgnoredBrowserFile = {
  relativePath: string
  sizeBytes: number
  modifiedAtMs: number | null
  contentHash?: string
  reason: string
  isError: boolean
}

export type BrowserFolderScan = {
  sources: BrowserLinkedFolderSource[]
  ignored: IgnoredBrowserFile[]
}

function classify(name: string): { kind: GenerateSourceKind; mimeType: string; maxBytes: number } {
  const lower = name.toLowerCase()
  if (lower.endsWith('.pdf')) return { kind: 'pdf', mimeType: 'application/pdf', maxBytes: PDF_MAX_BYTES }
  if (lower.endsWith('.png')) return { kind: 'image', mimeType: 'image/png', maxBytes: IMAGE_MAX_BYTES }
  if (/\.jpe?g$/.test(lower)) return { kind: 'image', mimeType: 'image/jpeg', maxBytes: IMAGE_MAX_BYTES }
  if (lower.endsWith('.webp')) return { kind: 'image', mimeType: 'image/webp', maxBytes: IMAGE_MAX_BYTES }
  return { kind: 'text', mimeType: 'text/plain;charset=utf-8', maxBytes: TEXT_MAX_BYTES }
}

function sizeError(kind: GenerateSourceKind) {
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
  const digest = await globalThis.crypto.subtle.digest('SHA-256', Uint8Array.from(bytes).buffer)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function scanBrowserLinkedFolder(
  root: BrowserDirectoryHandle,
  knownFiles: ReadonlyMap<string, LinkedFolderFile> = new Map()
): Promise<BrowserFolderScan> {
  const sources: BrowserLinkedFolderSource[] = []
  const ignored: IgnoredBrowserFile[] = []
  const seenHashes = new Set(
    [...knownFiles.values()].flatMap((file) => file.contentHash && file.status !== 'failed' ? [file.contentHash] : [])
  )

  async function visit(directory: BrowserDirectoryHandle, parent: string[]) {
    for await (const entry of directory.values()) {
      if (entry.name.startsWith('.')) continue
      const relativePath = [...parent, entry.name].join('/')
      if (entry.kind === 'directory') {
        await visit(entry, [...parent, entry.name])
        continue
      }
      const file = await entry.getFile()
      const modifiedAtMs = file.lastModified || null
      const previous = knownFiles.get(relativePath)
      if (previous && previous.status !== 'failed' && previous.sizeBytes === file.size && previous.modifiedAtMs === modifiedAtMs) continue
      const classification = classify(file.name)
      if (file.size > classification.maxBytes) {
        ignored.push({ relativePath, sizeBytes: file.size, modifiedAtMs, reason: sizeError(classification.kind), isError: true })
        continue
      }
      const bytes = new Uint8Array(await file.arrayBuffer())
      const contentHash = await sha256(bytes)
      if (previous?.contentHash === contentHash && previous.status !== 'failed') continue
      if (classification.kind === 'text' && !isStrictUtf8(bytes)) {
        ignored.push({ relativePath, sizeBytes: file.size, modifiedAtMs, contentHash, reason: 'File is not valid UTF-8 text.', isError: true })
        continue
      }
      if (seenHashes.has(contentHash)) {
        ignored.push({ relativePath, sizeBytes: file.size, modifiedAtMs, contentHash, reason: 'This file content was already imported under another path.', isError: false })
        continue
      }
      seenHashes.add(contentHash)
      sources.push({
        id: relativePath,
        relativePath,
        sizeBytes: file.size,
        modifiedAtMs,
        contentHash,
        kind: classification.kind,
        file: new File([bytes], relativePath, { type: classification.mimeType, lastModified: file.lastModified })
      })
    }
  }

  await visit(root, [])
  return { sources, ignored }
}
