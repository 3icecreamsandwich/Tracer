import { createSetsRepo, useTracerDb, type FlashcardSet, type Uuid } from './db'
import { getSupabaseClient } from './auth/client'

type RemoteSet = {
  set_id: string
  title: string
  description: string | null
  icon_key: string | null
  icon_tone: string | null
  terms: FlashcardSet['terms']
  created_at: string
  updated_at: string
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
  const { data, error } = await getSupabaseClient()
    .from('private_sets')
    .select('set_id,title,description,icon_key,icon_tone,terms,created_at,updated_at')
    .eq('owner_id', userId)
  if (error) throw error

  const remoteSets = (data ?? []) as RemoteSet[]
  const remoteById = new Map(remoteSets.map((set) => [set.set_id, set]))
  const localItems = await repo.list()

  for (const item of localItems) {
    const local = await repo.get(item.id)
    if (!local) continue
    const remote = remoteById.get(local.id)
    if (remote && timestamp(remote.updated_at) > timestamp(local.updatedAt)) {
      await repo.update({
        id: local.id,
        title: remote.title,
        description: remote.description,
        iconKey: remote.icon_key,
        iconTone: remote.icon_tone,
        terms: remote.terms,
      })
      remoteById.delete(local.id)
      continue
    }

    const { error: upsertError } = await getSupabaseClient()
      .from('private_sets')
      .upsert(toRemoteRow(userId, local), { onConflict: 'owner_id,set_id' })
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
  }

  return true
}
