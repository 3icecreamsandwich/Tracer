import type { DbClient, FlashcardSet, SetFolder, StudyGuide } from '../db/types'
import { authenticatedLibrary, libraryOwner, refreshLibrary } from './client'
import { readCache, writeCache } from './cache'
import { createLocalSettingsRepo } from '../db/repos/settings.repo'
import { personalPreferences } from './preferences'

const pending = new Map<string, Promise<void>>()
/** Import once per device/account. Cloud rows and tombstones always win conflicts. */
export async function importLegacyLibrary(db: DbClient): Promise<void> {
  const owner = await libraryOwner(db)
  if (await readCache(owner, 'legacy-import-v1')) return
  if (pending.has(owner)) return pending.get(owner)!
  const request = (async () => {
    // Receipts are durable migration metadata, not disposable cached content.
    await db.execute(`CREATE TABLE IF NOT EXISTS cloud_import_receipts (owner_id TEXT PRIMARY KEY NOT NULL, completed_at TEXT NOT NULL)`)
    const receipts = await db.select<{ owner_id: string }>('SELECT owner_id FROM cloud_import_receipts WHERE owner_id = ?', [owner])
    if (receipts.length) {
      await writeCache(owner, 'legacy-import-v1', true)
      return
    }
    const client = await authenticatedLibrary(owner)
    const [sets, guides, folders, order] = await Promise.all([
      db.select<any>('SELECT * FROM flashcard_sets'),
      db.select<any>('SELECT * FROM study_guides ORDER BY created_at ASC'),
      db.select<any>('SELECT * FROM folders'),
      db.select<any>('SELECT * FROM home_library_order ORDER BY sort_order ASC'),
    ])
    const settings = await createLocalSettingsRepo(db).get()
    const items: Array<{ kind: string; id: string; payload: unknown }> = []
    for (const row of sets) {
      const payload: FlashcardSet & { hiddenFromLibrary: boolean } = {
        id: row.id, folderId: row.folder_id, title: row.title, description: row.description,
        iconKey: row.icon_key, iconTone: row.icon_tone, terms: JSON.parse(row.terms_json),
        createdAt: row.created_at, updatedAt: row.updated_at, hiddenFromLibrary: Boolean(row.hidden_from_library),
      }
      items.push({ kind: 'set', id: row.id, payload })
    }
    const latestGuides = new Map<string, StudyGuide>()
    for (const row of guides) latestGuides.set(row.set_id, { id: row.id, setId: row.set_id, markdown: row.markdown, createdAt: row.created_at })
    for (const [id, payload] of latestGuides) items.push({ kind: 'guide', id, payload })
    for (const row of folders) {
      const payload: SetFolder = { id: row.id, name: row.name, sortOrder: row.sort_order, createdAt: row.created_at, updatedAt: row.updated_at }
      items.push({ kind: 'folder', id: row.id, payload })
    }
    if (order.length) items.push({ kind: 'order', id: 'home', payload: order.map(row => ({ kind: row.item_kind, id: row.item_id, sortOrder: row.sort_order })) })
    items.push({ kind: 'preferences', id: 'app', payload: personalPreferences(settings) })
    for (let offset = 0; offset < items.length; offset += 100) {
      const { error } = await client.rpc('import_cloud_library_items', { items: items.slice(offset, offset + 100) })
      if (error) throw new Error(`Could not preserve your device library: ${error.message}`)
    }
    // Only acknowledge the migration after every batch has been committed.
    await db.execute('INSERT OR IGNORE INTO cloud_import_receipts (owner_id,completed_at) VALUES (?,?)', [owner, new Date().toISOString()])
    await writeCache(owner, 'legacy-import-v1', true)
  })().finally(() => pending.delete(owner))
  pending.set(owner, request)
  return request
}
export async function initializeCloudLibrary(db: DbClient) {
  await importLegacyLibrary(db)
  await refreshLibrary(db)
}
