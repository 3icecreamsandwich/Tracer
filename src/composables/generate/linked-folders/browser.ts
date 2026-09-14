import {
  createLinkedFoldersRepo,
  createSettingsRepo,
  createSetsRepo,
  createStudyGuidesRepo,
  useTracerDb,
  type LinkedFolder,
  type LinkedFolderFile,
  type Uuid
} from '../../db'
import type { GenerateSourceFile, GenerateSourceKind } from '../source-extraction'

const HANDLE_DB = 'tracer-linked-folder-handles'
const HANDLE_STORE = 'handles'
const TEXT_MAX_BYTES = 2 * 1024 * 1024
const IMAGE_MAX_BYTES = 20 * 1024 * 1024
const PDF_MAX_BYTES = 50 * 1024 * 1024

type DirectoryHandle = {
  name: string
  kind: 'directory'
  values(): AsyncIterableIterator<DirectoryHandle | FileHandle>
  queryPermission?(options: { mode: 'read' }): Promise<PermissionState>
  requestPermission?(options: { mode: 'read' }): Promise<PermissionState>
}

type FileHandle = {
  name: string
  kind: 'file'
  getFile(): Promise<File>
}

type BrowserLinkedFolderSource = GenerateSourceFile & {
  relativePath: string
  sizeBytes: number
  modifiedAtMs: number | null
  contentHash: string
}

type IgnoredFile = {
  relativePath: string
  sizeBytes: number
  modifiedAtMs: number | null
  contentHash?: string
  reason: string
  isError: boolean
}

type BrowserScan = { sources: BrowserLinkedFolderSource[]; ignored: IgnoredFile[] }

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = transaction.onabort = () => reject(transaction.error ?? new Error('Could not save the linked folder permission.'))
  })
}

async function openHandleDb() {
  const request = indexedDB.open(HANDLE_DB, 1)
  request.onupgradeneeded = () => request.result.createObjectStore(HANDLE_STORE)
  return requestToPromise(request)
}

async function saveHandle(setId: Uuid, handle: DirectoryHandle) {
  const db = await openHandleDb()
  const transaction = db.transaction(HANDLE_STORE, 'readwrite')
  transaction.objectStore(HANDLE_STORE).put(handle, setId)
  await transactionDone(transaction)
  db.close()
}

async function loadHandle(setId: Uuid): Promise<DirectoryHandle | null> {
  const db = await openHandleDb()
  const transaction = db.transaction(HANDLE_STORE, 'readonly')
  const handle = await requestToPromise(transaction.objectStore(HANDLE_STORE).get(setId))
  await transactionDone(transaction)
  db.close()
  return (handle as DirectoryHandle | undefined) ?? null
}

export async function deleteBrowserLinkedFolderHandle(setId: Uuid) {
  const db = await openHandleDb()
  const transaction = db.transaction(HANDLE_STORE, 'readwrite')
  transaction.objectStore(HANDLE_STORE).delete(setId)
  await transactionDone(transaction)
  db.close()
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
  try { new TextDecoder('utf-8', { fatal: true }).decode(bytes); return true } catch { return false }
}

async function hash(bytes: Uint8Array) {
  const digest = await crypto.subtle.digest('SHA-256', new Uint8Array(bytes).buffer)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function scanBrowserLinkedFolder(
  root: DirectoryHandle,
  knownFiles: ReadonlyMap<string, LinkedFolderFile> = new Map()
): Promise<BrowserScan> {
  const sources: BrowserLinkedFolderSource[] = []
  const ignored: IgnoredFile[] = []
  const seenHashes = new Set(
    [...knownFiles.values()].flatMap((file) => file.contentHash && file.status !== 'failed' ? [file.contentHash] : [])
  )

  async function visit(directory: DirectoryHandle, parent: string[]) {
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
      const contentHash = await hash(bytes)
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

async function resolveDefaultModel() {
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).get()
  if (!settings.defaultModelId) throw new Error('Choose a Default AI Model to sync linked folders.')
  const { resolveAiModel } = await import('../../ai/registry')
  const model = await resolveAiModel([settings.defaultModelId, ...settings.fallbackModelIds])
  if (!model) throw new Error('The Default AI Model could not be loaded.')
  return { db, model }
}

function records(sources: BrowserLinkedFolderSource[], status: 'processed' | 'failed', error?: string | null) {
  return sources.map((source) => ({
    relativePath: source.relativePath, sizeBytes: source.sizeBytes, modifiedAtMs: source.modifiedAtMs,
    contentHash: source.contentHash, status, error: error ?? null
  }))
}

async function importScan(
  scan: BrowserScan,
  options: { title?: string; instructions?: string; incremental?: boolean; setId?: Uuid; folderName: string }
) {
  const [{ assertGenerateFileLimits }, extraction, generation, context] = await Promise.all([
    import('../file-limits'), import('../source-extraction'), import('./generate'), resolveDefaultModel()
  ])
  await assertGenerateFileLimits(scan.sources)
  const extracted = await extraction.extractGenerateSources(scan.sources)
  if (!extracted.extracted.length) {
    const reason = extracted.failed[0]?.reason ?? scan.ignored[0]?.reason
    throw new Error(reason ? `No readable files were found. ${reason}` : 'No readable files were found in this folder.')
  }
  const generated = await generation.generateLinkedFolderContent({
    model: context.model, sources: extracted.extracted, instructions: options.instructions,
    incremental: options.incremental
  })
  const setId = options.setId ?? crypto.randomUUID() as Uuid
  const sets = createSetsRepo(context.db)
  const guides = createStudyGuidesRepo(context.db)
  if (options.incremental) {
    const [set, guide] = await Promise.all([sets.get(setId), guides.getBySetId(setId)])
    if (!set) throw new Error('The linked set no longer exists.')
    await sets.update({ id: setId, terms: generation.mergeGeneratedTerms(set.terms, generated.terms) })
    if (guide) await guides.update({ id: guide.id, markdown: generation.appendStudyGuide(guide.markdown, generated.studyGuideMarkdown) })
    else await guides.create({ id: crypto.randomUUID() as Uuid, setId, markdown: generated.studyGuideMarkdown })
  } else {
    await sets.create({ id: setId, title: options.title?.trim() || options.folderName || 'Linked folder', description: null, terms: generated.terms })
    await guides.create({ id: crypto.randomUUID() as Uuid, setId, markdown: generated.studyGuideMarkdown })
  }
  return { context, extracted, generated, setId }
}

export async function createSetFromBrowserLinkedFolder(input: { title?: string; instructions?: string }) {
  const picker = (globalThis as typeof globalThis & { showDirectoryPicker?: () => Promise<DirectoryHandle> }).showDirectoryPicker
  if (!picker) throw new Error('Your browser does not support linked folders. Use Chrome or Edge, or choose the files individually.')
  let handle: DirectoryHandle
  try { handle = await picker.call(globalThis) } catch (error) {
    if ((error as DOMException)?.name === 'AbortError') return null
    throw error
  }
  const scan = await scanBrowserLinkedFolder(handle)
  const result = await importScan(scan, { ...input, folderName: handle.name })
  const linkedFolders = createLinkedFoldersRepo(result.context.db)
  const failedIds = new Set(result.extracted.failed.map((failure) => failure.id))
  try {
    await linkedFolders.create({ setId: result.setId, path: handle.name })
    await linkedFolders.recordFiles(result.setId, [
      ...records(scan.sources.filter((source) => !failedIds.has(source.id)), 'processed'),
      ...records(scan.sources.filter((source) => failedIds.has(source.id)), 'failed', 'Could not extract readable content.'),
      ...scan.ignored.map((file) => ({ relativePath: file.relativePath, sizeBytes: file.sizeBytes, modifiedAtMs: file.modifiedAtMs,
        contentHash: file.contentHash ?? null, status: file.isError ? 'failed' as const : 'ignored' as const,
        error: file.isError ? file.reason : null }))
    ])
    await saveHandle(result.setId, handle)
    const issues = result.extracted.failed.length + scan.ignored.filter((file) => file.isError).length
    await linkedFolders.updateStatus(result.setId, issues ? 'error' : 'synced', {
      error: issues ? `${issues} file${issues === 1 ? '' : 's'} could not be imported.` : null, scanned: true
    })
    return { setId: result.setId, rawOutput: result.generated.rawOutput, warning: issues ? `${issues} file${issues === 1 ? '' : 's'} could not be imported.` : null }
  } catch (error) {
    await createSetsRepo(result.context.db).delete(result.setId).catch(() => undefined)
    throw error
  }
}

export async function syncBrowserLinkedFolder(setId: Uuid): Promise<LinkedFolder | null> {
  const handle = await loadHandle(setId)
  if (!handle) throw new Error('Folder access is no longer available. Unlink this folder and link it again.')
  let permission = await handle.queryPermission?.({ mode: 'read' }) ?? 'prompt'
  if (permission !== 'granted') permission = await handle.requestPermission?.({ mode: 'read' }) ?? 'denied'
  if (permission !== 'granted') throw new Error('Allow folder access to sync this linked folder.')
  const db = await useTracerDb()
  const linkedFolders = createLinkedFoldersRepo(db)
  await linkedFolders.updateStatus(setId, 'syncing')
  const known = await linkedFolders.listFiles(setId)
  const scan = await scanBrowserLinkedFolder(handle, new Map(known.map((file) => [file.relativePath, file])))
  if (!scan.sources.length) return linkedFolders.updateStatus(setId, 'synced', { scanned: true })
  try {
    const result = await importScan(scan, { folderName: handle.name, incremental: true, setId })
    const extractedIds = new Set(result.extracted.extracted.map((source) => source.id))
    await linkedFolders.recordFiles(setId, [
      ...records(scan.sources.filter((source) => extractedIds.has(source.id)), 'processed'),
      ...records(scan.sources.filter((source) => !extractedIds.has(source.id)), 'failed', 'Could not extract readable content.')
    ])
    return linkedFolders.updateStatus(setId, 'synced', { scanned: true })
  } catch (error) {
    await linkedFolders.updateStatus(setId, 'error', { error: error instanceof Error ? error.message : 'Linked folder sync failed.', scanned: true })
    throw error
  }
}
