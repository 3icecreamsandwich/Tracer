import { basename } from '@tauri-apps/api/path'
import { watch, type WatchEvent } from '@tauri-apps/plugin-fs'
import {
  createLinkedFoldersRepo,
  createSettingsRepo,
  createSetsRepo,
  createStudyGuidesRepo,
  useTracerDb,
  type LinkedFolder,
  type Uuid
} from '../../db'

export const LINKED_FOLDER_STATUS_EVENT = 'tracer:linked-folder-status'

type LinkFolderInput = {
  path: string
  title?: string
  instructions?: string
}

type LinkFolderResult = {
  setId: Uuid
  rawOutput: string
  warning: string | null
}

const unwatchBySet = new Map<Uuid, () => void>()
const debounceBySet = new Map<Uuid, ReturnType<typeof setTimeout>>()
const syncBySet = new Map<Uuid, Promise<LinkedFolder | null>>()
const pendingChanges = new Map<Uuid, Set<string> | null>()
let managerStarted = false

async function loadLinkedFolderProcessing() {
  const [extraction, generation, scanner, limits] = await Promise.all([
    import('../source-extraction'),
    import('./generate'),
    import('./scan'),
    import('../file-limits')
  ])
  return {
    assertGenerateFileLimits: limits.assertGenerateFileLimits,
    extractGenerateSources: extraction.extractGenerateSources,
    appendStudyGuide: generation.appendStudyGuide,
    generateLinkedFolderContent: generation.generateLinkedFolderContent,
    mergeGeneratedTerms: generation.mergeGeneratedTerms,
    scanLinkedFolder: scanner.scanLinkedFolder
  }
}

function errorMessage(error: unknown, fallback = 'Linked folder sync failed.') {
  if (error instanceof Error && error.message.trim()) return error.message.trim()
  if (typeof error === 'string' && error.trim()) return error.trim()
  return fallback
}

function dispatchStatus(linkedFolder: LinkedFolder | null, setId: Uuid) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(LINKED_FOLDER_STATUS_EVENT, {
      detail: { setId, linkedFolder }
    })
  )
}

async function updateStatus(
  setId: Uuid,
  status: LinkedFolder['status'],
  options: { error?: string | null; scanned?: boolean } = {}
) {
  const db = await useTracerDb()
  const linkedFolder = await createLinkedFoldersRepo(db).updateStatus(setId, status, options)
  dispatchStatus(linkedFolder, setId)
  return linkedFolder
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

function fileRecords(
  sources: Array<{ relativePath: string; sizeBytes: number; contentHash?: string; modifiedAtMs?: number | null }>,
  status: 'processed' | 'failed',
  error?: string | null
) {
  return sources.map((source) => ({
    relativePath: source.relativePath,
    modifiedAtMs: source.modifiedAtMs,
    sizeBytes: source.sizeBytes,
    contentHash: source.contentHash ?? null,
    status,
    error: error ?? null
  }))
}

export async function createSetFromLinkedFolder(input: LinkFolderInput): Promise<LinkFolderResult> {
  const modelRequest = resolveDefaultModel().catch((error: unknown) => ({ error }))
  const { scanLinkedFolder } = await import('./scan')
  const [processing, scan, folderName] = await Promise.all([
    loadLinkedFolderProcessing(),
    scanLinkedFolder(input.path),
    basename(input.path)
  ])

  await processing.assertGenerateFileLimits(scan.sources)
  const extraction = await processing.extractGenerateSources(scan.sources)
  const context = await modelRequest
  if ('error' in context) throw context.error
  const { db, model } = context
  if (extraction.extracted.length === 0) {
    const details = extraction.failed[0]?.reason ?? scan.ignored[0]?.reason
    throw new Error(details ? `No readable files were found. ${details}` : 'No readable files were found in this folder.')
  }

  const generated = await processing.generateLinkedFolderContent({
    model,
    sources: extraction.extracted,
    instructions: input.instructions
  })

  const setId = crypto.randomUUID() as Uuid
  const setsRepo = createSetsRepo(db)
  const guidesRepo = createStudyGuidesRepo(db)
  const linkedFoldersRepo = createLinkedFoldersRepo(db)
  const failedIds = new Set(extraction.failed.map((failure) => failure.id))

  try {
    await setsRepo.create({
      id: setId,
      title: input.title?.trim() || folderName || 'Linked folder',
      description: null,
      terms: generated.terms
    })
    await guidesRepo.create({
      id: crypto.randomUUID() as Uuid,
      setId,
      markdown: generated.studyGuideMarkdown
    })
    await linkedFoldersRepo.create({ setId, path: input.path })
    await linkedFoldersRepo.recordFiles(setId, [
      ...fileRecords(
        scan.sources.filter((source) => !failedIds.has(source.id)),
        'processed'
      ),
      ...fileRecords(
        scan.sources.filter((source) => failedIds.has(source.id)),
        'failed',
        'Could not extract readable content.'
      ),
      ...scan.ignored.map((file) => ({
        relativePath: file.relativePath,
        modifiedAtMs: file.modifiedAtMs,
        sizeBytes: file.sizeBytes,
        contentHash: file.contentHash ?? null,
        status: file.status ?? 'ignored' as const,
        error: file.isError ? file.reason : null
      }))
    ])

    const issueCount = extraction.failed.length + scan.ignored.filter((file) => file.isError).length
    const linkedFolder = await linkedFoldersRepo.updateStatus(
      setId,
      issueCount > 0 ? 'error' : 'synced',
      {
        error: issueCount > 0 ? `${issueCount} file${issueCount === 1 ? '' : 's'} could not be imported.` : null,
        scanned: true
      }
    )
    dispatchStatus(linkedFolder, setId)
    if (linkedFolder) await installWatch(linkedFolder)
    // Catch files changed while the initial import was generating, before the watch existed.
    pendingChanges.set(setId, null)
    scheduleSync(setId)

    return {
      setId,
      rawOutput: generated.rawOutput,
      warning: linkedFolder?.lastError ?? null
    }
  } catch (error) {
    await setsRepo.delete(setId).catch(() => undefined)
    throw error
  }
}

async function performLinkedFolderSync(setId: Uuid, changedPaths: Set<string> | null): Promise<LinkedFolder | null> {
  const db = await useTracerDb()
  const linkedFoldersRepo = createLinkedFoldersRepo(db)
  const linkedFolder = await linkedFoldersRepo.getBySetId(setId)
  if (!linkedFolder) return null

  await updateStatus(setId, 'syncing')
  const [knownFiles, { scanLinkedFolder }] = await Promise.all([
    linkedFoldersRepo.listFiles(setId), import('./scan')
  ])
  const knownHashes = new Set(knownFiles.filter((file) => file.status === 'processed' || (file.status === 'ignored' && !file.error))
    .flatMap((file) => file.contentHash ? [file.contentHash] : []))
  const scan = await scanLinkedFolder(linkedFolder.path, new Set(), knownHashes, {
    knownFiles: new Map(knownFiles.map((file) => [file.relativePath, file])),
    changedPaths: changedPaths ?? undefined
  })

  await linkedFoldersRepo.recordFiles(
    setId,
    scan.ignored.map((file) => ({
      relativePath: file.relativePath,
      modifiedAtMs: file.modifiedAtMs,
      sizeBytes: file.sizeBytes,
      contentHash: file.contentHash ?? null,
      status: file.status ?? 'ignored',
      error: file.isError ? file.reason : null
    }))
  )

  if (scan.sources.length === 0) {
    const ignoredCount = scan.ignored.filter((file) => file.isError).length
    return updateStatus(setId, ignoredCount > 0 ? 'error' : 'synced', {
      error: ignoredCount > 0
        ? `${ignoredCount} newly added file${ignoredCount === 1 ? '' : 's'} could not be imported.`
        : null,
      scanned: true
    })
  }

  const modelRequest = resolveDefaultModel().catch((error: unknown) => ({ error }))
  const processing = await loadLinkedFolderProcessing()
  await processing.assertGenerateFileLimits(scan.sources)
  const extraction = await processing.extractGenerateSources(scan.sources)
  const extractedIds = new Set(extraction.extracted.map((source) => source.id))
  const extractedSources = scan.sources.filter((source) => extractedIds.has(source.id))
  const failedSources = scan.sources.filter((source) => !extractedIds.has(source.id))

  if (extraction.extracted.length === 0) {
    await linkedFoldersRepo.recordFiles(
      setId,
      fileRecords(failedSources, 'failed', extraction.failed[0]?.reason ?? 'No readable content found.')
    )
    return updateStatus(setId, 'error', {
      error: 'New files were found, but none produced readable content.',
      scanned: true
    })
  }

  try {
    const context = await modelRequest
    if ('error' in context) throw context.error
    const { model } = context
    const generated = await processing.generateLinkedFolderContent({
      model,
      sources: extraction.extracted,
      incremental: true
    })

    const setsRepo = createSetsRepo(db)
    const guidesRepo = createStudyGuidesRepo(db)
    const [set, guide] = await Promise.all([
      setsRepo.get(setId),
      guidesRepo.getBySetId(setId)
    ])
    if (!set) throw new Error('The linked set no longer exists.')

    await Promise.all([
      setsRepo.update({
        id: setId,
        terms: processing.mergeGeneratedTerms(set.terms, generated.terms)
      }),
      guide
        ? guidesRepo.update({
            id: guide.id,
            markdown: processing.appendStudyGuide(guide.markdown, generated.studyGuideMarkdown)
          })
        : guidesRepo.create({
            id: crypto.randomUUID() as Uuid,
            setId,
            markdown: generated.studyGuideMarkdown
          })
    ])

    await linkedFoldersRepo.recordFiles(setId, [
      ...fileRecords(extractedSources, 'processed'),
      ...fileRecords(
        failedSources,
        'failed',
        extraction.failed[0]?.reason ?? 'Could not extract readable content.'
      )
    ])

    const issueCount = failedSources.length + scan.ignored.filter((file) => file.isError).length
    return updateStatus(setId, issueCount > 0 ? 'error' : 'synced', {
      error: issueCount > 0
        ? `${issueCount} newly added file${issueCount === 1 ? '' : 's'} could not be imported.`
        : null,
      scanned: true
    })
  } catch (error) {
    const message = errorMessage(error)
    await linkedFoldersRepo.recordFiles(setId, [
      ...fileRecords(extractedSources, 'failed', message),
      ...fileRecords(
        failedSources,
        'failed',
        extraction.failed[0]?.reason ?? 'Could not extract readable content.'
      )
    ])
    await updateStatus(setId, 'error', { error: message, scanned: true })
    throw error
  }
}

export function syncLinkedFolder(setId: Uuid): Promise<LinkedFolder | null> {
  const current = syncBySet.get(setId)
  if (current) return current
  if (!pendingChanges.has(setId)) pendingChanges.set(setId, null)
  const operation = (async () => {
    let result: LinkedFolder | null = null
    // Watch events received during extraction/generation are drained before completing.
    while (pendingChanges.has(setId)) {
      const paths = pendingChanges.get(setId) ?? null
      pendingChanges.delete(setId)
      result = await performLinkedFolderSync(setId, paths)
    }
    return result
  })()
    .catch(async (error) => {
      await updateStatus(setId, 'error', {
        error: errorMessage(error), scanned: true
      }).catch(() => null)
      throw error
    })
    .finally(() => {
      syncBySet.delete(setId)
      if (pendingChanges.has(setId) && !debounceBySet.has(setId)) scheduleSync(setId)
    })
  syncBySet.set(setId, operation)
  return operation
}

function scheduleSync(setId: Uuid, event?: WatchEvent) {
  if (event) {
    const broad = event.type === 'any' || event.type === 'other' || event.paths.length === 0
    if (broad) pendingChanges.set(setId, null)
    else if (pendingChanges.get(setId) !== null) {
      const paths = pendingChanges.get(setId) ?? new Set<string>()
      event.paths.forEach((path) => paths.add(path))
      pendingChanges.set(setId, paths)
    }
  }
  const current = debounceBySet.get(setId)
  if (current) clearTimeout(current)
  else if (!syncBySet.has(setId)) void updateStatus(setId, 'pending').catch(() => undefined)
  debounceBySet.set(setId, setTimeout(() => {
    debounceBySet.delete(setId)
    if (pendingChanges.has(setId)) void syncLinkedFolder(setId).catch(() => undefined)
  }, 350))
}

function shouldScanEvent(event: WatchEvent) {
  if (event.type === 'any' || event.type === 'other') return true
  if ('create' in event.type || 'remove' in event.type) return true
  if (!('modify' in event.type)) return false
  return event.type.modify.kind !== 'metadata' ||
    ['any', 'write-time'].includes(event.type.modify.mode)
}

async function installWatch(linkedFolder: LinkedFolder) {
  if (unwatchBySet.has(linkedFolder.setId)) return
  const unwatch = await watch(
    linkedFolder.path,
    (event) => {
      if (shouldScanEvent(event)) scheduleSync(linkedFolder.setId, event)
    },
    { recursive: true, delayMs: 150 }
  )
  unwatchBySet.set(linkedFolder.setId, unwatch)
}

export async function refreshLinkedFolderSyncManager() {
  if (!managerStarted) return
  const db = await useTracerDb()
  const linkedFolders = await createLinkedFoldersRepo(db).list()
  const activeIds = new Set(linkedFolders.map((linkedFolder) => linkedFolder.setId))

  for (const [setId, unwatch] of unwatchBySet) {
    if (activeIds.has(setId)) continue
    unwatch()
    unwatchBySet.delete(setId)
  }
  await Promise.all(
    linkedFolders.map((linkedFolder) =>
      installWatch(linkedFolder).catch((error) =>
        updateStatus(linkedFolder.setId, 'error', { error: errorMessage(error) })
      )
    )
  )
}

export async function startLinkedFolderSyncManager(options: { syncOnStart?: boolean } = {}) {
  if (managerStarted) return
  managerStarted = true
  const db = await useTracerDb()
  const linkedFolders = await createLinkedFoldersRepo(db).list()
  await Promise.all(
    linkedFolders.map((linkedFolder) =>
      installWatch(linkedFolder).catch((error) =>
        updateStatus(linkedFolder.setId, 'error', { error: errorMessage(error) })
      )
    )
  )
  if (options.syncOnStart !== false) {
    await Promise.all(linkedFolders.map((linkedFolder) => syncLinkedFolder(linkedFolder.setId).catch(() => null)))
  }
}

export function stopLinkedFolderSyncManager() {
  managerStarted = false
  for (const unwatch of unwatchBySet.values()) unwatch()
  unwatchBySet.clear()
  for (const timeout of debounceBySet.values()) clearTimeout(timeout)
  debounceBySet.clear()
  pendingChanges.clear()
}

export async function unlinkFolder(setId: Uuid) {
  pendingChanges.delete(setId)
  const timeout = debounceBySet.get(setId)
  if (timeout) clearTimeout(timeout)
  debounceBySet.delete(setId)
  unwatchBySet.get(setId)?.()
  unwatchBySet.delete(setId)

  const db = await useTracerDb()
  await createLinkedFoldersRepo(db).delete(setId)
  dispatchStatus(null, setId)
}
