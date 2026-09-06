import { getSupabaseClient, getPublicSupabaseClient } from './auth/client'
import { hasTauriRuntime } from './tauri'
import type { FlashcardSet, Term } from './db/types'
export const PUBLIC_SET_TAGS = [
  'world-language',
  'english',
  'history',
  'math',
  'science',
  'coding',
] as const
export type PublicSetTag = (typeof PUBLIC_SET_TAGS)[number]
export type PublishedSetSummary = {
  id: string
  title: string
  description: string | null
  publisher_name: string
  tags: PublicSetTag[]
  allow_copying: boolean
  card_count: number
  created_at: string
}
export type PublishedSet = PublishedSetSummary & {
  terms: Term[]
  updated_at: string
  icon_key: string | null
  icon_tone: string | null
}
export const CATALOG_BATCH_SIZE = 36
type Cached<T> = { expires: number; request: Promise<T> }
const catalogCache = new Map<string, Cached<{ items: PublishedSetSummary[]; hasMore: boolean }>>()
const detailCache = new Map<string, Cached<PublishedSet>>()
const settingsCache = new Map<string, Cached<PublicationSettings | null>>()
const profileCache = new Map<string, Cached<string>>()
export type PublicationSettings = { id: string; tags: PublicSetTag[]; allow_copying: boolean }
function cached<T>(
  cache: Map<string, Cached<T>>,
  key: string,
  load: () => Promise<T>,
  ttl = 30_000,
  limit = 24,
): Promise<T> {
  const existing = cache.get(key)
  if (existing && existing.expires > Date.now()) return existing.request
  const entry = { expires: Date.now() + ttl, request: Promise.resolve().then(load) }
  cache.delete(key)
  cache.set(key, entry)
  while (cache.size > limit) cache.delete(cache.keys().next().value!)
  void entry.request.catch(() => {
    if (cache.get(key) === entry) cache.delete(key)
  })
  return entry.request
}
export function clearPublishedSetCache() {
  catalogCache.clear()
  detailCache.clear()
  settingsCache.clear()
  profileCache.clear()
}
async function publishingSession() {
  const db = getSupabaseClient()
  let {
    data: { session },
    error,
  } = await db.auth.getSession()
  if (error) throw error
  if ((!session || (session.expires_at ?? 0) * 1000 < Date.now() + 30_000) && hasTauriRuntime()) {
    const { restoreAuthSession } = await import('./auth/session')
    await restoreAuthSession({ waitForProviderKeySync: false })
    const restored = await db.auth.getSession()
    if (restored.error) throw restored.error
    session = restored.data.session
  }
  // This identity selects the row; Postgres RLS authorizes every write.
  return { db, user: session?.user ?? null }
}
function publisherName(db: ReturnType<typeof getSupabaseClient>, userId: string) {
  return cached(
    profileCache,
    userId,
    async () => {
      const { data, error } = await db
        .from('profiles')
        .select('display_name')
        .eq('id', userId)
        .maybeSingle()
      if (error) throw error
      return data?.display_name || 'Tracer user'
    },
    300_000,
  )
}
export async function listPublishedSets(
  search: string,
  tags: PublicSetTag[],
  cursor?: PublishedSetSummary,
) {
  const key = JSON.stringify([search.trim(), [...tags].sort(), cursor?.created_at, cursor?.id])
  return cached(catalogCache, key, async () => {
    const { data, error } = await getPublicSupabaseClient().rpc('search_published_sets', {
      search_text: search.trim(),
      selected_tags: tags,
      before_created_at: cursor?.created_at ?? null,
      before_id: cursor?.id ?? null,
      page_size: CATALOG_BATCH_SIZE + 1,
    })
    if (error) throw error
    const rows = (data ?? []) as PublishedSetSummary[]
    return { items: rows.slice(0, CATALOG_BATCH_SIZE), hasMore: rows.length > CATALOG_BATCH_SIZE }
  })
}
export function getPublishedSet(id: string): Promise<PublishedSet> {
  return cached(
    detailCache,
    id,
    async () => {
      const { data, error } = await getPublicSupabaseClient()
        .from('published_sets')
        .select(
          'id,title,description,publisher_name,tags,allow_copying,card_count,created_at,updated_at,terms,icon_key,icon_tone',
        )
        .eq('id', id)
        .single()
      if (error) throw error
      return data as PublishedSet
    },
    30_000,
    8,
  )
}
export function prefetchPublishedSet(id: string) {
  void getPublishedSet(id).catch(() => {})
}
export function prefetchPublicCatalog() {
  void listPublishedSets('', []).catch(() => {})
}

export function publishedSetToStudySet(row: PublishedSet): FlashcardSet {
  return {
    id: row.id,
    folderId: null,
    title: row.title,
    description: row.description,
    terms: row.terms,
    iconKey: row.icon_key,
    iconTone: row.icon_tone,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
export async function publishSet(set: FlashcardSet, tags: PublicSetTag[], allowCopying: boolean) {
  const { db, user } = await publishingSession()
  if (!user) throw new Error('Sign in to your Tracer account in Settings to publish a set.')
  if (!set.terms.length || !set.title.trim())
    throw new Error('Add a title and at least one card before publishing.')
  const name = await publisherName(db, user.id)
  const { data, error } = await db
    .from('published_sets')
    .upsert(
      {
        publisher_id: user.id,
        source_set_id: set.id,
        publisher_name: name,
        title: set.title.trim(),
        description: set.description,
        terms: set.terms,
        icon_key: set.iconKey ?? null,
        icon_tone: set.iconTone ?? null,
        tags,
        allow_copying: allowCopying,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'publisher_id,source_set_id' },
    )
    .select('id')
    .single()
  if (error) throw error
  catalogCache.clear()
  detailCache.clear()
  settingsCache.clear()
  return data.id as string
}

export async function getPublicationSettings(sourceSetId: string) {
  const { db, user } = await publishingSession()
  if (!user) return null
  // Warm the profile lookup while the publisher chooses subjects.
  void publisherName(db, user.id).catch(() => {})
  return cached(settingsCache, `${user.id}:${sourceSetId}`, async () => {
    const { data, error } = await db
      .from('published_sets')
      .select('id,tags,allow_copying')
      .eq('publisher_id', user.id)
      .eq('source_set_id', sourceSetId)
      .maybeSingle()
    if (error) throw error
    return data as PublicationSettings | null
  })
}

/** Updates content only: the existing publication's permissions and tags stay intact. */
export async function updatePublishedSet(set: FlashcardSet) {
  const { db, user } = await publishingSession()
  if (!user)
    throw new Error('Sign in to your Tracer account in Settings to update the published version.')
  const { data, error } = await db
    .from('published_sets')
    .update({
      title: set.title.trim(),
      description: set.description,
      terms: set.terms,
      icon_key: set.iconKey ?? null,
      icon_tone: set.iconTone ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('publisher_id', user.id)
    .eq('source_set_id', set.id)
    .select('id')
    .single()
  if (error) throw error
  catalogCache.clear()
  detailCache.clear()
  settingsCache.clear()
  return data.id as string
}
