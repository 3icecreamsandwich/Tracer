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
import { resolveAiModel } from '../../ai/registry'
import { extractGenerateSources } from '../source-extraction'
import { appendStudyGuide, generateLinkedFolderContent, mergeGeneratedTerms } from './generate'
import { scanLinkedFolder } from './scan'

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
let managerStarted = false

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
  const model = await resolveAiModel(settings.defaultModelId)
  if (!model) throw new Error('The Default AI Model could not be loaded.')
  return { db, model }
}

function fileRecords(
  sources: Array<{ relativePath: string; sizeBytes: number; contentHash?: string }>,
  status: 'processed' | 'failed',
  error?: string | null
) {
  return sources.map((source) => ({
    relativePath: source.relativePath,
    sizeBytes: source.sizeBytes,
    contentHash: source.contentHash ?? null,
    status,
    error: error ?? null
  }))
}

export async function createSetFromLinkedFolder(input: LinkFolderInput): Promise<LinkFolderResult> {
  const [{ db, model }, scan, folderName] = await Promise.all([
    resolveDefaultModel(),
    scanLinkedFolder(input.path),
    basename(input.path)
  ])

  const extraction = await extractGenerateSources(scan.sources)
  if (extraction.extracted.length === 0) {
    const details = extraction.failed[0]?.reason ?? scan.ignored[0]?.reason
    throw new Error(details ? `No readable files were found. ${details}` : 'No readable files were found in this folder.')
  }

  const generated = await generateLinkedFolderContent({
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
        sizeBytes: file.sizeBytes,
        contentHash: file.contentHash ?? null,
        status: 'ignored' as const,
        error: file.reason
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
    await refreshLinkedFolderSyncManager()

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

async function performLinkedFolderSync(setId: Uuid): Promise<LinkedFolder | null> {
  const db = await useTracerDb()
  const linkedFoldersRepo = createLinkedFoldersRepo(db)
  const linkedFolder = await linkedFoldersRepo.getBySetId(setId)
  if (!linkedFolder) return null

  await updateStatus(setId, 'syncing')
  const knownPaths = await linkedFoldersRepo.listKnownPaths(setId)
  const knownHashes = await linkedFoldersRepo.listKnownHashes(setId)
  const scan = await scanLinkedFolder(linkedFolder.path, knownPaths, knownHashes)

  await linkedFoldersRepo.recordFiles(
    setId,
    scan.ignored.map((file) => ({
      relativePath: file.relativePath,
      sizeBytes: file.sizeBytes,
      contentHash: file.contentHash ?? null,
      status: 'ignored',
      error: file.reason
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

  const extraction = await extractGenerateSources(scan.sources)
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
    const { model } = await resolveDefaultModel()
    const generated = await generateLinkedFolderContent({
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
        terms: mergeGeneratedTerms(set.terms, generated.terms)
      }),
      guide
        ? guidesRepo.update({
            id: guide.id,
            markdown: appendStudyGuide(guide.markdown, generated.studyGuideMarkdown)
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
  const operation = performLinkedFolderSync(setId)
    .catch(async (error) => {
      await updateStatus(setId, 'error', {
        error: errorMessage(error),
        scanned: true
      }).catch(() => null)
      throw error
    })
    .finally(() => syncBySet.delete(setId))
  syncBySet.set(setId, operation)
  return operation
}

function scheduleSync(setId: Uuid) {
  const current = debounceBySet.get(setId)
  if (current) clearTimeout(current)
  void updateStatus(setId, 'pending')
  debounceBySet.set(
    setId,
    setTimeout(() => {
      debounceBySet.delete(setId)
      void syncLinkedFolder(setId).catch(() => undefined)
    }, 1500)
  )
}

function shouldScanEvent(event: WatchEvent) {
  if (event.type === 'any' || event.type === 'other') return true
  if ('create' in event.type) return true
  return 'modify' in event.type && event.type.modify.kind === 'rename'
}

async function installWatch(linkedFolder: LinkedFolder) {
  if (unwatchBySet.has(linkedFolder.setId)) return
  const unwatch = await watch(
    linkedFolder.path,
    (event) => {
      if (shouldScanEvent(event)) scheduleSync(linkedFolder.setId)
    },
    { recursive: true, delayMs: 1000 }
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

export async function startLinkedFolderSyncManager() {
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
  await Promise.all(linkedFolders.map((linkedFolder) => syncLinkedFolder(linkedFolder.setId).catch(() => null)))
}

export function stopLinkedFolderSyncManager() {
  managerStarted = false
  for (const unwatch of unwatchBySet.values()) unwatch()
  unwatchBySet.clear()
  for (const timeout of debounceBySet.values()) clearTimeout(timeout)
  debounceBySet.clear()
}

export async function unlinkFolder(setId: Uuid) {
  const timeout = debounceBySet.get(setId)
  if (timeout) clearTimeout(timeout)
  debounceBySet.delete(setId)
  unwatchBySet.get(setId)?.()
  unwatchBySet.delete(setId)

  const db = await useTracerDb()
  await createLinkedFoldersRepo(db).delete(setId)
  dispatchStatus(null, setId)
}
