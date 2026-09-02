import type { FlashcardSetListItem, SetFolder, Uuid } from './db'
import type { HomeLibraryOrderEntry } from './db/repos/folders.repo'

export type HomeDashboardItem = {
  kind: 'set' | 'study-guide'
  kindLabel: 'Set' | 'Study guide'
  id: Uuid
  setId?: Uuid
  folderId: Uuid | null
  title: string
  subtitle: string | null
  iconKey?: string | null
  iconTone?: string | null
  cardCount?: number
  createdAt: string
  updatedAt: string | null
}

export type HomeDashboardSnapshot = {
  items: HomeDashboardItem[]
  folders: SetFolder[]
  homeOrder: HomeLibraryOrderEntry[]
}

let cachedSnapshot: HomeDashboardSnapshot | null = null

function cloneSnapshot(snapshot: HomeDashboardSnapshot): HomeDashboardSnapshot {
  return {
    items: snapshot.items.map((item) => ({ ...item })),
    folders: snapshot.folders.map((folder) => ({ ...folder })),
    homeOrder: snapshot.homeOrder.map((entry) => ({ ...entry }))
  }
}

export function getCachedHomeDashboard(): HomeDashboardSnapshot | null {
  return cachedSnapshot ? cloneSnapshot(cachedSnapshot) : null
}

export function setCachedHomeDashboard(snapshot: HomeDashboardSnapshot) {
  cachedSnapshot = cloneSnapshot(snapshot)
}

export function clearCachedHomeDashboard() {
  cachedSnapshot = null
}

export function toHomeDashboardSetItem(set: FlashcardSetListItem): HomeDashboardItem {
  return {
    kind: 'set',
    kindLabel: 'Set',
    id: set.id,
    folderId: set.folderId,
    title: set.title,
    subtitle: set.description,
    iconKey: set.iconKey,
    iconTone: set.iconTone,
    cardCount: set.cardCount,
    createdAt: set.createdAt,
    updatedAt: set.updatedAt
  }
}
