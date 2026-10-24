import type { DbClient, FlashcardSet, FlashcardSetListItem, SetFolder, StudyGuide, Term } from '../db/types'
import { getRow, listRows, saveRow } from './client'
import type { HomeLibraryOrderEntry } from '../db/repos/folders.repo'

// Existing local progress/chats reference this disposable FK anchor. Never read it
// as the source of set contents; legacy originals remain intact for recovery.
async function studyAnchor(db: DbClient, set: FlashcardSet) {
  try { await db.execute(`INSERT OR IGNORE INTO flashcard_sets
    (id,title,description,terms_json,created_at,updated_at) VALUES (?,?,?,?,?,?)`,
    [set.id,set.title,set.description,JSON.stringify(set.terms),set.createdAt,set.updatedAt])
  } catch { console.warn('[Tracer] Could not cache the local study reference') }
}
export function cloudSetsRepo(db: DbClient) {
  return {
    async list(): Promise<FlashcardSetListItem[]> {
      const rows = await listRows(db, 'set')
      return rows.filter(row => !row.payload.hiddenFromLibrary).map(row => row.payload)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    },
    async get(id: string): Promise<FlashcardSet | null> {
      const row = await getRow<FlashcardSet>(db, 'set', id)
      if (row) await studyAnchor(db, row.payload)
      return row ? { ...row.payload, cloudRevision: row.revision } : null
    },
    async create(input: { id: string; title: string; description?: string | null; iconKey?: string | null; iconTone?: string | null; terms: Term[] }): Promise<FlashcardSet> {
      const now = new Date().toISOString()
      const payload = { ...input, description: input.description ?? null, folderId: null, createdAt: now, updatedAt: now }
      const row = await saveRow(db, 'set', input.id, payload, 0)
      await studyAnchor(db, row.payload)
      return { ...row.payload, cloudRevision: row.revision }
    },
    async update(input: { id: string; title?: string; description?: string | null; iconKey?: string | null; iconTone?: string | null; terms?: Term[]; cloudRevision?: number }): Promise<FlashcardSet> {
      const current = await getRow<FlashcardSet>(db, 'set', input.id)
      if (!current) throw new Error('Set not found')
      const next = { ...current.payload, updatedAt: new Date().toISOString() }
      for (const key of ['title', 'description', 'iconKey', 'iconTone', 'terms'] as const) {
        if (input[key] !== undefined) Object.assign(next, { [key]: input[key] })
      }
      const row = await saveRow(db, 'set', input.id, next, input.cloudRevision ?? current.revision)
      return { ...row.payload, cloudRevision: row.revision }
    },
    async delete(id: string) {
      const current = await getRow(db, 'set', id)
      if (current) await saveRow(db, 'set', id, current.payload, current.revision, true)
    },
    async hideFromLibrary(id: string) { await this.hideManyFromLibrary([id]) },
    async hideManyFromLibrary(ids: string[]) {
      for (const id of new Set(ids)) {
        const current = await getRow(db, 'set', id)
        if (current && !current.payload.hiddenFromLibrary) await saveRow(db, 'set', id, { ...current.payload, hiddenFromLibrary: true }, current.revision)
      }
    },
  }
}
export function cloudGuidesRepo(db: DbClient) {
  return {
    async create(input: { id: string; setId: string; markdown: string }): Promise<StudyGuide> {
      const payload = { ...input, createdAt: new Date().toISOString() }
      return (await saveRow(db, 'guide', input.setId, payload, 0)).payload
    },
    async getBySetId(setId: string): Promise<StudyGuide | null> {
      return (await getRow<StudyGuide>(db, 'guide', setId))?.payload ?? null
    },
    async listSummaries() { return (await listRows(db, 'guide')).map(row => row.payload as Omit<StudyGuide, 'markdown'>) },
    async update(input: { id: string; markdown: string }): Promise<StudyGuide> {
      const summary = (await listRows(db, 'guide')).find(row => row.payload.id === input.id)
      if (!summary) throw new Error('Study guide not found')
      const current = await getRow<StudyGuide>(db, 'guide', summary.id)
      if (!current) throw new Error('Study guide not found')
      return (await saveRow(db, 'guide', current.id, { ...current.payload, markdown: input.markdown }, current.revision)).payload
    },
  }
}
export function cloudFoldersRepo(db: DbClient) {
  return {
    async list(): Promise<SetFolder[]> { return (await listRows(db, 'folder')).map(row => row.payload).sort((a, b) => a.sortOrder - b.sortOrder) },
    async get(id: string): Promise<SetFolder | null> { return (await getRow<SetFolder>(db, 'folder', id))?.payload ?? null },
    async create(input: { id: string; name: string }): Promise<SetFolder> {
      if (!input.name.trim()) throw new Error('Folder name is required')
      const folders = await this.list()
      const now = new Date().toISOString()
      const payload = { ...input, name: input.name.trim(), sortOrder: Math.min(0, ...folders.map(item => item.sortOrder)) - 1, createdAt: now, updatedAt: now }
      return (await saveRow(db, 'folder', input.id, payload, 0)).payload
    },
    async rename(id: string, name: string): Promise<SetFolder> {
      if (!name.trim()) throw new Error('Folder name is required')
      const current = await getRow<SetFolder>(db, 'folder', id)
      if (!current) throw new Error('Folder not found')
      return (await saveRow(db, 'folder', id, { ...current.payload, name: name.trim(), updatedAt: new Date().toISOString() }, current.revision)).payload
    },
    async moveSets(ids: string[], folderId: string | null) {
      if (folderId && !await this.get(folderId)) throw new Error('Folder not found')
      for (const id of new Set(ids)) {
        const current = await getRow<FlashcardSet>(db, 'set', id)
        if (current) await saveRow(db, 'set', id, { ...current.payload, folderId }, current.revision)
      }
    },
    async reorder(ids: string[]) {
      for (const [sortOrder, id] of ids.entries()) {
        const current = await getRow<SetFolder>(db, 'folder', id)
        if (current) await saveRow(db, 'folder', id, { ...current.payload, sortOrder }, current.revision)
      }
    },
    async listHomeOrder(): Promise<HomeLibraryOrderEntry[]> { return (await listRows(db, 'order')).find(row => row.id === 'home')?.payload ?? [] },
    async reorderHome(entries: Array<{ kind: 'folder' | 'set'; id: string }>) {
      const current = await getRow(db, 'order', 'home')
      await saveRow(db, 'order', 'home', entries.map((entry, sortOrder) => ({ ...entry, sortOrder })), current?.revision ?? 0)
    },
    async delete(id: string) {
      const current = await getRow(db, 'folder', id)
      if (!current) return
      const sets = await cloudSetsRepo(db).list()
      await this.moveSets(sets.filter(set => set.folderId === id).map(set => set.id), null)
      const order = await this.listHomeOrder()
      await this.reorderHome(order.filter(entry => !(entry.kind === 'folder' && entry.id === id)))
      await saveRow(db, 'folder', id, current.payload, current.revision, true)
    },
  }
}
