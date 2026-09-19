import {
  createLinkedFoldersRepo,
  createSettingsRepo,
  createSetsRepo,
  createStudyGuidesRepo,
  useTracerDb,
  type LinkedFolder,
  type Uuid
} from '../../db'
import {
  scanBrowserLinkedFolder,
  type BrowserDirectoryHandle as DirectoryHandle,
  type BrowserLinkedFolderSource,
  type BrowserFolderScan as BrowserScan
} from './browser-scan'

export { scanBrowserLinkedFolder } from './browser-scan'

const HANDLE_DB = 'tracer-linked-folder-handles'
const HANDLE_STORE = 'handles'
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

async function resolveDefaultModel() {
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).get()
  if (!settings.defaultModelId) throw new Error('Choose a Default AI Model to sync linked folders.')
  const { resolveAiModel } = await import('../../ai/registry')
  const model = await resolveAiModel([settings.defaultModelId, ...settings.fallbackModelIds])
  if (!model) throw new Error('The Default AI Model could not be loaded.')
  return {
    db,
    model,
    resolveRepairModel: () => resolveAiModel(settings.defaultModelId!)
  }
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
    model: context.model, resolveRepairModel: context.resolveRepairModel,
    sources: extracted.extracted, instructions: options.instructions,
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
