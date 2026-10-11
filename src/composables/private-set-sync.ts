import { createSetsRepo, createStudyGuidesRepo, useTracerDb, type FlashcardSet, type Uuid } from './db'
import { getSupabaseClient } from './auth/client'
import { clearPublishedSetCache } from './published-sets'

type RemoteSet = {
  set_id: string
  title: string
  description: string | null
  icon_key: string | null
  icon_tone: string | null
  terms: FlashcardSet['terms']
  created_at: string
  updated_at: string
  study_guide_markdown: string | null
}

function timestamp(value: string) {
  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function toRemoteRow(userId: string, set: FlashcardSet) {
  return {
    owner_id: userId,
    set_id: set.id,
    title: set.title,
    description: set.description,
    icon_key: set.iconKey ?? null,
    icon_tone: set.iconTone ?? null,
    terms: set.terms,
    created_at: set.createdAt,
    updated_at: set.updatedAt,
  }
}

/**
 * Copies normal (non-public) sets between this device and the signed-in
 * account. The newest version wins if the same set changed on two devices.
 */
export async function syncPrivateSets(): Promise<boolean> {
  let userId: string
  try {
    const { data: { user }, error } = await getSupabaseClient().auth.getUser()
    if (error || !user) return false
    userId = user.id
  } catch {
    return false
  }

  const db = await useTracerDb()
  const repo = createSetsRepo(db)
  const guides = createStudyGuidesRepo(db)
  const { data, error } = await getSupabaseClient()
    .from('private_sets')
    .select('set_id,title,description,icon_key,icon_tone,terms,created_at,updated_at,study_guide_markdown')
    .eq('owner_id', userId)
  if (error) throw error

  const remoteSets = (data ?? []) as RemoteSet[]
  const remoteById = new Map(remoteSets.map((set) => [set.set_id, set]))
  const localItems = await repo.list()

  for (const item of localItems) {
    const local = await repo.get(item.id)
    if (!local) continue
    const remote = remoteById.get(local.id)
    const localGuide = await guides.getBySetId(local.id)
    const remoteNewer = Boolean(remote && timestamp(remote.updated_at) > timestamp(local.updatedAt))
    const markdown = (remoteNewer ? remote?.study_guide_markdown || localGuide?.markdown : localGuide?.markdown || remote?.study_guide_markdown) ?? null
    if (markdown && markdown !== localGuide?.markdown) {
      if (localGuide) await guides.update({ id: localGuide.id, markdown })
      else await guides.create({ id: crypto.randomUUID(), setId: local.id, markdown })
    }
    let current = local
    if (remoteNewer && remote) {
      current = await repo.update({
        id: local.id,
        title: remote.title,
        description: remote.description,
        iconKey: remote.icon_key,
        iconTone: remote.icon_tone,
        terms: remote.terms,
      })
    }

    const { error: upsertError } = await getSupabaseClient()
      .from('private_sets')
      .upsert({ ...toRemoteRow(userId, current), study_guide_markdown: markdown }, { onConflict: 'owner_id,set_id' })
    if (upsertError) throw upsertError
    remoteById.delete(local.id)
  }

  for (const remote of remoteById.values()) {
    await repo.create({
      id: remote.set_id as Uuid,
      title: remote.title,
      description: remote.description,
      iconKey: remote.icon_key,
      iconTone: remote.icon_tone,
      terms: remote.terms,
    })
    if (remote.study_guide_markdown?.trim()) {
      await guides.create({ id: crypto.randomUUID(), setId: remote.set_id, markdown: remote.study_guide_markdown })
    }
  }

  // Repair older publication snapshots from surviving local/cloud guides,
  // without replacing a guide already present in the public version.
  const { data: publications, error: publicationError } = await getSupabaseClient()
    .from('published_sets').select('id,source_set_id')
    .eq('publisher_id', userId).is('study_guide_markdown', null)
  if (publicationError) throw publicationError
  for (const publication of publications ?? []) {
    const guide = await guides.getBySetId(publication.source_set_id)
    if (!guide?.markdown.trim()) continue
    const { error: repairError } = await getSupabaseClient().from('published_sets')
      .update({ study_guide_markdown: guide.markdown })
      .eq('id', publication.id).eq('publisher_id', userId).is('study_guide_markdown', null)
    if (repairError) throw repairError
    clearPublishedSetCache()
  }

  return true
}
