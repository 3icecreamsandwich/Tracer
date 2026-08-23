import type { Uuid } from '../db/types'

export function hasSelectionModifier(event: {
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
}) {
  return event.ctrlKey || event.metaKey || event.shiftKey
}

export function homeItemSetId(item: {
  kind: 'set' | 'study-guide'
  id: Uuid
  setId?: Uuid
}) {
  return item.kind === 'set' ? item.id : (item.setId ?? item.id)
}

export function selectedSetsAfterPlainClick(
  selectedSetIds: readonly Uuid[],
  clickedSetId: Uuid
) {
  if (selectedSetIds.length === 0) return null
  if (!selectedSetIds.includes(clickedSetId)) return [...selectedSetIds]
  return selectedSetIds.filter((setId) => setId !== clickedSetId)
}

export function toggleSelectedSet(
  selectedSetIds: readonly Uuid[],
  clickedSetId: Uuid
) {
  if (selectedSetIds.includes(clickedSetId)) {
    return selectedSetIds.filter((setId) => setId !== clickedSetId)
  }
  return [...selectedSetIds, clickedSetId]
}

export function visibleSetRange(
  visibleSetIds: readonly Uuid[],
  anchorId: Uuid | null,
  currentId: Uuid
) {
  const currentIndex = visibleSetIds.indexOf(currentId)
  const anchorIndex = anchorId ? visibleSetIds.indexOf(anchorId) : -1
  if (currentIndex < 0 || anchorIndex < 0) return [currentId]
  const start = Math.min(currentIndex, anchorIndex)
  const end = Math.max(currentIndex, anchorIndex)
  return visibleSetIds.slice(start, end + 1)
}

type FolderAssignableHomeItem = {
  kind: 'set' | 'study-guide'
  id: Uuid
  setId?: Uuid
  folderId: Uuid | null
}

export function assignHomeItemsToFolder<T extends FolderAssignableHomeItem>(
  items: readonly T[],
  setIds: readonly Uuid[],
  folderId: Uuid | null
) {
  const movedIds = new Set(setIds)
  return items.map((item) => {
    const belongsToMovedSet =
      (item.kind === 'set' && movedIds.has(item.id)) ||
      (item.kind === 'study-guide' && !!item.setId && movedIds.has(item.setId))
    return belongsToMovedSet ? { ...item, folderId } : item
  })
}
