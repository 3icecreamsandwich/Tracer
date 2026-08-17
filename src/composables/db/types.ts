export type Uuid = string

export type IsoDateTimeString = string

export type TermImage = {
  filename: string
  mimeType: string
  dataUrl: string
}

export type Term = {
  id: Uuid
  front: string
  back: string
  frontImage?: TermImage | null
  backImage?: TermImage | null
}

export type FlashcardSet = {
  id: Uuid
  folderId: Uuid | null
  title: string
  description: string | null
  iconKey?: string | null
  iconTone?: string | null
  terms: Term[]
  createdAt: IsoDateTimeString
  updatedAt: IsoDateTimeString
}

export type FlashcardSetListItem = {
  id: Uuid
  folderId: Uuid | null
  title: string
  description: string | null
  iconKey?: string | null
  iconTone?: string | null
  cardCount: number
  createdAt: IsoDateTimeString
  updatedAt: IsoDateTimeString
}

export type Profile = {
  id: Uuid
  name: string
  email: string
  supabaseUserId?: string | null
  createdAt: IsoDateTimeString
}

export type SetFolder = {
  id: Uuid
  name: string
  sortOrder: number
  createdAt: IsoDateTimeString
  updatedAt: IsoDateTimeString
}

export type AppSettings = {
  startupLockEnabled: boolean
  defaultModelId: string | null
  darkMode: boolean
  learnHybridEnabled: boolean
  flashcardsDefinitionFirst: boolean
  floatingChatEnabled: boolean
  language: AppLanguage
  textScale: number
}

export type AppLanguage = 'en' | 'es' | 'fr' | 'zh-CN' | 'hi' | 'ar' | 'de' | 'ru' | 'ja' | 'ko'

export type StudyGuide = {
  id: Uuid
  setId: Uuid
  markdown: string
  createdAt: IsoDateTimeString
}

export type LinkedFolderStatus = 'synced' | 'pending' | 'syncing' | 'error'

export type LinkedFolderFileStatus = 'processed' | 'ignored' | 'failed'

export type LinkedFolder = {
  setId: Uuid
  path: string
  status: LinkedFolderStatus
  lastError: string | null
  lastScanAt: IsoDateTimeString | null
  createdAt: IsoDateTimeString
  updatedAt: IsoDateTimeString
}

export type LinkedFolderFile = {
  setId: Uuid
  relativePath: string
  sizeBytes: number
  contentHash: string | null
  status: LinkedFolderFileStatus
  error: string | null
  discoveredAt: IsoDateTimeString
  processedAt: IsoDateTimeString | null
}

export type SavedChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type SavedChatPayload = {
  version: 1
  messages: SavedChatMessage[]
}

export type SavedChatListItem = {
  id: Uuid
  setId: Uuid
  title: string
  createdAt: IsoDateTimeString
  updatedAt: IsoDateTimeString
  lastOpenedAt: IsoDateTimeString
}

export type SavedChat = SavedChatListItem & {
  payload: SavedChatPayload
}

export type DbClient = {
  execute: (sql: string, bindValues?: unknown[]) => Promise<unknown>
  select: <T>(sql: string, bindValues?: unknown[]) => Promise<T[]>
  close: () => Promise<boolean>
}
