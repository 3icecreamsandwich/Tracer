<template>
  <main class="tracer-page library-page mx-auto max-w-6xl px-6 py-8">
    <header class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div class="flex min-w-0 items-center gap-3">
        <NuxtLink v-if="isFolderPage" :to="activeLibraryKind === 'study-guide' ? '/library?kind=study-guide' : '/library'" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Back to library"><span aria-hidden="true">←</span></NuxtLink>
        <h1 class="truncate text-2xl font-bold">{{ isFolderPage ? (activeFolder?.name ?? 'Folder') : isClassesPage ? 'Classes' : 'Sets & Guides' }}</h1>
      </div>
      <div class="flex gap-2">
        <template v-if="isClassesPage">
          <UButton v-if="accountRole === 'teacher' || accountRole === 'super'" to="/teacher" color="primary">Dashboard</UButton>
          <UButton color="primary" variant="soft" @click="joinOpen = true">{{ t('classroom.addClass') }}</UButton>
        </template>
        <template v-else-if="!isFolderPage"><UButton color="primary" variant="soft" :disabled="busy || isWebPreviewRuntime()" @click="addFolder"><AppIcon name="add-folder" />{{ t('home.addFolder') }}</UButton><UButton to="/create/basic" color="primary">Create</UButton></template>
      </div>
    </header>
    <nav v-if="!isClassesPage" aria-label="Library type" class="mb-5 flex gap-1">
      <UButton v-for="tab in libraryTabs" :key="tab.value" color="primary" :variant="activeLibraryKind === tab.value ? 'solid' : 'ghost'" :aria-pressed="activeLibraryKind === tab.value" @click="activeLibraryKind = tab.value">{{ t(tab.label) }}</UButton>
    </nav>
    <p v-if="loadError" role="alert" class="mb-4 text-error">{{ loadError }} <UButton color="primary" variant="soft" @click="loadHomeList">Retry</UButton></p>
    <LoadingSpinner v-if="busy || (isClassesPage && classroomBusy)" centered />
    <template v-else-if="isClassesPage">
      <p v-if="classroomError" role="alert" class="text-error">{{ classroomError }}</p>
      <div v-else-if="!classrooms.length" class="library-empty">{{ t('home.noClasses') }}</div>
      <div v-else class="library-grid">
        <LibraryCard v-for="classroom in classrooms" :key="classroom.id" kind="class" :title="classroom.name" :description="classroomSummary(classroom)" :author="classroom.canTeach ? ownerName : 'Teacher'" :to="classroom.canTeach ? `/teacher?class=${classroom.id}` : `/student/classes/${classroom.id}`" />
      </div>
    </template>
    <template v-else>
      <div v-if="isFolderPage && !activeFolder" class="library-empty">Folder not found.</div>
      <div v-else-if="!isFolderPage && !items.length && !folders.length" class="library-empty">{{ t('home.noItems') }}</div>
      <div v-else data-root-drop-zone class="library-grid" :class="{ 'library-drop-active': !isFolderPage && dragState.active && dragState.overRoot }">
        <ul v-if="visibleFolders.length" class="contents">
          <li v-for="folder in visibleFolders" :key="folder.id" :data-folder-reorder-id="folder.id" data-root-entry-kind="folder" :data-root-entry-id="folder.id" :style="{ order: rootEntryPosition('folder', folder.id) }" class="relative" :class="{ 'opacity-50': folderDragId === folder.id }">
            <div v-if="rootDropIndicator('folder', folder.id) === 'before'" class="drop-indicator" />
            <div data-root-entry-hit="true" :data-folder-drop-id="folder.id" class="folder-card" :class="{ 'folder-card--target': dragState.dropFolderId === folder.id, 'folder-card--selected': selectedFolderId === folder.id }" @click="onFolderRowClick(folder.id, $event)">
              <UInput v-if="editingFolderId === folder.id" :ref="el => setFolderInputRef(folder.id, el)" v-model="folderNameDraft" :aria-label="t('home.folderName')" class="w-full" @click.stop @keydown.enter.stop.prevent="commitFolderRename(folder)" @keydown.esc.stop.prevent="cancelFolderRename(folder)" @blur="commitFolderRename(folder)" />
              <button v-else type="button" data-folder-toggle class="tracer-folder-toggle folder-card__open" :aria-label="`Open folder ${folder.name}`" @mousedown.prevent>
                <h3>{{ folder.name }}</h3>
                <span class="folder-card__preview"><span v-for="item in items.filter(item => item.folderId === folder.id).slice(0, 3)" :key="item.id" class="block truncate">{{ item.title }}</span></span>
                <AppIcon name="chevron" class="folder-card__chevron"  />
              </button>
              <div class="folder-card__tools" @click.stop>
                <UButton color="primary" variant="soft" square aria-label="Drag folder" class="cursor-grab" @pointerdown.stop.prevent="onFolderPointerDown(folder.id, $event)"><AppIcon name="grip" /></UButton>
                <UButton color="primary" variant="soft" square aria-label="Edit folder name" @click.stop="beginFolderRename(folder)"><AppIcon name="edit" /></UButton>
                <UButton color="primary" variant="soft" square aria-label="Delete folder" @click.stop="deleteFolder(folder)"><AppIcon name="trash" /></UButton>
              </div>
            </div>
            <div v-if="rootDropIndicator('folder', folder.id) === 'after'" class="drop-indicator" />
          </li>
        </ul>
        <ul v-if="rootItems.length" class="contents">
          <HomeLibraryItem v-for="item in rootItems" :key="itemKey(item)" :item="item" :to="itemTo(item)" :formatted-date="formatDate(item.updatedAt ?? item.createdAt)" :selected="selectedSetIds.has(homeItemSetId(item))" :root-entry="!isFolderPage" :order="rootEntryPosition('set', item.setId ?? item.id)" :drop-indicator="rootDropIndicator('set', item.setId ?? item.id)" @item-click="onItemClick(item, $event)" @item-pointerdown="onItemPointerDown(item, $event)" />
        </ul>
        <div v-if="!isFolderPage && (dragState.active || folderDragId)" data-root-drop-zone class="library-empty library-root-drop" :style="{ order: 1000000 }">{{ folderDragId ? 'Move here' : 'Move outside folders' }}</div>
        <p v-else-if="!rootItems.length && !visibleFolders.length" class="library-empty">{{ isFolderPage && !normalizedQuery ? t('home.emptyFolder') : t('nav.noResults') }}</p>
      </div>
    </template>
    <Teleport to="body">
      <template v-if="dragState.active">
        <div v-if="isFolderPage" class="folder-move-zone folder-move-zone--left" :class="{ 'folder-move-zone--active': dragState.overRoot && dragState.x < viewportWidth / 2 }" aria-hidden="true" />
        <div v-if="isFolderPage" class="folder-move-zone folder-move-zone--right" :class="{ 'folder-move-zone--active': dragState.overRoot && dragState.x >= viewportWidth / 2 }" aria-hidden="true" />
        <div class="drag-count" :style="dragCountStyle" role="status" :aria-label="`Moving ${dragState.setIds.length} ${dragState.setIds.length === 1 ? 'item' : 'items'}`"><AppIcon name="cards" :size="15" />{{ dragState.setIds.length }}</div>
      </template>
    </Teleport>
    <ClassJoinDialog :open="joinOpen" :busy="joinBusy" :error="joinError" @close="closeJoin" @submit="onJoinClass" />
  </main>
</template>
<script setup lang="ts">
import { isWebPreviewRuntime } from "~/src/composables/platform/web";
import { prefetchPublicCatalog } from '~/src/composables/published-sets'
import { redactSensitiveText } from '~/src/composables/security/redact'
import { syncPrivateSets } from '~/src/composables/private-set-sync'
import { lockGetStatus } from '../src/composables/lock'
import {
  createFoldersRepo,
  createProfileRepo,
  createSettingsRepo,
  createSetsRepo,
  createStudyGuidesRepo,
  useTracerDb
} from '../src/composables/db'
import { useLockSession } from '../src/composables/lock-session'
import type {
  DbClient,
  SetFolder,
  Uuid
} from '../src/composables/db/types'
import { hasTauriRuntime } from '../src/composables/tauri'
import { useAppLanguage } from '../src/composables/language'
import { createDemoStudyGuideTitle } from '../src/composables/demo-content'
import type { AccountRole } from '../src/composables/auth/account'
import {
  ClassroomError,
  classroomErrorKey,
  getCachedAccountRole,
  getAccountRole,
  joinClassroom,
  listClassroomAssignmentSetVersionIds,
  listClassrooms,
  type Classroom,
} from '../src/composables/classrooms'
import {
  assignHomeItemsToFolder,
  homeItemSetId,
  selectedSetsAfterPlainClick,
  toggleSelectedSet,
  visibleSetRange
} from '../src/composables/home/set-organization'
import {
  getCachedHomeDashboard,
  setCachedHomeDashboard,
  markPrivateSetsSyncedThisSession,
  toHomeDashboardSetItem,
  type HomeDashboardItem,
  type HomeDashboardSnapshot,
} from '../src/composables/home-dashboard-cache'

const router = useRouter()
const route = useRoute()
const { language, t } = useAppLanguage()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()

type HomeListItem = HomeDashboardItem

type HomeOrderEntry = {
  kind: 'folder' | 'set'
  id: Uuid
  sortOrder: number
}

type RootEntryKey = Pick<HomeOrderEntry, 'kind' | 'id'>

type RootDropTarget = {
  anchor: RootEntryKey | null
  placement: 'before' | 'after'
}

const busy = ref(true)
const loadError = ref<string | null>(null)
const items = ref<HomeListItem[]>([])
type LibraryKind = 'set' | 'study-guide' | 'class'

const isClassesPage = computed(() => route.path === '/classes')
const isFolderPage = computed(() => route.path.startsWith('/folder/'))
const activeFolderId = computed(() => isFolderPage.value && typeof route.params.id === 'string' ? route.params.id as Uuid : null)
const activeFolder = computed(() => folders.value.find(folder => folder.id === activeFolderId.value) ?? null)
const viewportWidth = ref(0)
const viewportHeight = ref(0)
const dragCountStyle = computed(() => ({ left: `${Math.max(8, Math.min(dragState.x + 16, viewportWidth.value - 70))}px`, top: `${Math.max(8, Math.min(dragState.y + 16, viewportHeight.value - 48))}px` }))
const ownerName = useState('library-owner-name', () => '')
const activeLibraryKind = ref<LibraryKind>(isClassesPage.value ? 'class' : route.query.kind === 'study-guide' ? 'study-guide' : 'set')
watch(isClassesPage, value => { activeLibraryKind.value = value ? 'class' : route.query.kind === 'study-guide' ? 'study-guide' : 'set' }, { immediate: true })
const libraryTabs: Array<{ value: LibraryKind; label: string }> = [
  { value: 'set', label: 'home.flashcards' },
  { value: 'study-guide', label: 'home.studyGuides' },

]
const accountRole = ref<AccountRole | null>(null)
const classrooms = ref<Classroom[]>([])
const assignedHiddenSetIds = ref(new Set<string>())
const classroomBusy = ref(false)
const classroomError = ref<string | null>(null)
const joinOpen = ref(false)
const joinBusy = ref(false)
const joinError = ref<string | null>(null)
const folders = ref<SetFolder[]>([])
const homeOrder = ref<HomeOrderEntry[]>([])
const selectedSetIds = ref(new Set<Uuid>())
const selectedFolderId = ref<Uuid | null>(null)
const folderDragId = ref<Uuid | null>(null)
const selectionAnchorId = ref<Uuid | null>(null)
const editingFolderId = ref<Uuid | null>(null)
const folderNameDraft = ref('')
const folderRenameBusy = ref(false)
const folderInputRefs = new Map<Uuid, HTMLInputElement>()

const dragState = reactive<{
  active: boolean
  x: number
  y: number
  setIds: Uuid[]
  dropFolderId: Uuid | null
  overRoot: boolean
}>({
  active: false,
  x: 0,
  y: 0,
  setIds: [],
  dropFolderId: null,
  overRoot: false
})

type PointerCandidate = {
  setId: Uuid
  pointerId: number
  startX: number
  startY: number
}

type FolderPointerCandidate = {
  folderId: Uuid
  pointerId: number
  startX: number
  startY: number
}

let pointerCandidate: PointerCandidate | null = null
let folderPointerCandidate: FolderPointerCandidate | null = null
const rootDropTarget = ref<RootDropTarget | null>(null)
let suppressNextSetClickId: Uuid | null = null

const query = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const rootItems = computed(() => {
  return activeFolderId.value ? itemsForFolder(activeFolderId.value) : items.value.filter((item) => item.kind === activeLibraryKind.value && item.folderId === null && itemMatchesQuery(item))
})

// Keep all library tabs sized like their flashcard counterparts.
const denseLibrary = computed(() =>
  items.value.filter((item) => item.kind === 'set' && itemMatchesQuery(item)).length >= 4
)

const visibleFolders = computed(() => {
  if (isFolderPage.value || activeLibraryKind.value === 'class') return []
  const q = normalizedQuery.value
  if (!q) return folders.value
  return folders.value.filter((folder) => {
    if (folder.id === editingFolderId.value) return true
    if (folder.name.toLowerCase().includes(q)) return true
    return items.value.some(
      (item) => item.folderId === folder.id && itemMatchesQuery(item)
    )
  })
})

function rootKeyEquals(left: RootEntryKey | null, right: RootEntryKey) {
  return left?.kind === right.kind && left.id === right.id
}

function rootEntryPosition(kind: 'folder' | 'set', id: Uuid) {
  const storedIndex = homeOrder.value.findIndex(
    (entry) => entry.kind === kind && entry.id === id
  )
  if (storedIndex >= 0) return storedIndex
  if (kind === 'folder') return -2000 + folders.value.findIndex((folder) => folder.id === id)
  const setIndex = items.value.findIndex((item) => item.kind === 'set' && item.id === id)
  return -1000 + Math.max(0, setIndex)
}

function rootDropIndicator(kind: 'folder' | 'set', id: Uuid) {
  if (!rootDropTarget.value?.anchor) return null
  return rootKeyEquals(rootDropTarget.value.anchor, { kind, id })
    ? rootDropTarget.value.placement
    : null
}

function orderedRootKeys() {
  const keys: RootEntryKey[] = [
    ...folders.value.map((folder) => ({ kind: 'folder' as const, id: folder.id })),
    ...items.value
      .filter((item) => item.kind === 'set' && item.folderId === null)
      .map((item) => ({ kind: 'set' as const, id: item.id }))
  ]
  return keys.sort(
    (left, right) =>
      rootEntryPosition(left.kind, left.id) - rootEntryPosition(right.kind, right.id)
  )
}

const visibleSetIds = computed(() => {
  if (isFolderPage.value) return rootItems.value.map(homeItemSetId)
  const rootEntries = [
    ...visibleFolders.value.map((folder) => ({
      kind: 'folder' as const,
      id: folder.id,
      item: null as HomeListItem | null
    })),
    ...rootItems.value.map((item) => ({
      kind: 'set' as const,
      id: homeItemSetId(item),
      item
    }))
  ].sort(
    (left, right) =>
      rootEntryPosition(left.kind, left.id) - rootEntryPosition(right.kind, right.id)
  )

  return rootEntries.filter(entry => entry.kind === 'set' && entry.item).map(entry => homeItemSetId(entry.item!))
})

function itemMatchesQuery(item: HomeListItem) {
  const q = normalizedQuery.value
  if (!q) return true
  const matchesOwnText =
    item.title.toLowerCase().includes(q) ||
    (item.subtitle ?? '').toLowerCase().includes(q)
  if (matchesOwnText || item.kind === 'set' || !item.setId) return matchesOwnText
  const linkedSet = items.value.find(
    (candidate) => candidate.kind === 'set' && candidate.id === item.setId
  )
  return Boolean(
    linkedSet?.title.toLowerCase().includes(q) ||
    (linkedSet?.subtitle ?? '').toLowerCase().includes(q)
  )
}

function itemsForFolder(folderId: Uuid) {
  const folder = folders.value.find((candidate) => candidate.id === folderId)
  const folderMatches =
    !!normalizedQuery.value &&
    folder?.name.toLowerCase().includes(normalizedQuery.value)
  return items.value.filter(
    (item) =>
      item.kind === activeLibraryKind.value &&
      item.folderId === folderId &&
      (folderMatches || itemMatchesQuery(item))
  )
}

function itemKey(item: HomeListItem) {
  return `${item.kind}:${item.id}`
}

function itemTo(item: HomeListItem) {
  if (item.kind === 'set') return `/set/${item.id}`
  return `/study-guide/${item.setId ?? item.id}`
}

function initWebDemoItems() {
  const now = new Date().toISOString()
  items.value = [
    {
      kind: 'set',
      kindLabel: 'Set',
      id: 'demo' as Uuid,
      folderId: null,
      title: t('demo.setTitle'),
      subtitle: t('demo.setDescription'),
      iconKey: null,
      createdAt: now,
      updatedAt: now,
      cardCount: 2
    },
    {
      kind: 'study-guide',
      kindLabel: 'Study guide',
      id: 'demo-guide' as Uuid,
      setId: 'demo' as Uuid,
      folderId: null,
      title: 'Study guide · Demo set',
      subtitle: null,
      createdAt: now,
      updatedAt: null
    }
  ]
  const guide = items.value.find((item) => item.kind === 'study-guide')
  if (guide) guide.title = createDemoStudyGuideTitle(t)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const elapsedSeconds = Math.round((d.getTime() - Date.now()) / 1000)
  const ranges: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31_536_000], ['month', 2_592_000], ['week', 604_800],
    ['day', 86_400], ['hour', 3_600], ['minute', 60]
  ]
  const formatter = new Intl.RelativeTimeFormat(language.value, { numeric: 'auto' })
  const range = ranges.find(([, seconds]) => Math.abs(elapsedSeconds) >= seconds)
  const relative = range
    ? formatter.format(Math.round(elapsedSeconds / range[1]), range[0])
    : formatter.format(0, 'second')
  return `Updated ${relative}`
}

function sortIsoDesc(a: string, b: string) {
  if (a === b) return 0
  return a > b ? -1 : 1
}

async function fetchHomeDashboard(db: DbClient): Promise<HomeDashboardSnapshot> {
    const setsRepo = createSetsRepo(db)
    const guidesRepo = createStudyGuidesRepo(db)
    const foldersRepo = createFoldersRepo(db)

    const [sets, guides, nextFolders, nextHomeOrder] = await Promise.all([
      setsRepo.list(),
      guidesRepo.listSummaries(),
      foldersRepo.list(),
      foldersRepo.listHomeOrder()
    ])
    const next: HomeListItem[] = []

    const setTitleById = new Map<Uuid, string>()
    for (const s of sets) {
      setTitleById.set(s.id, s.title)
    }

    const guideBySetId = new Map(guides.map((guide) => [guide.setId, guide]))
    for (const s of sets) {
      next.push(toHomeDashboardSetItem(s))
      const guide = guideBySetId.get(s.id)
      if (guide) {
        next.push({
          kind: 'study-guide',
          kindLabel: 'Study guide',
          id: guide.id,
          setId: guide.setId,
          folderId: s.folderId,
          title: `Study guide · ${setTitleById.get(guide.setId) ?? 'Untitled set'}`,
          subtitle: null,
          createdAt: guide.createdAt,
          updatedAt: null
        })
      }
    }

    next.sort((a, b) => sortIsoDesc(a.updatedAt ?? a.createdAt, b.updatedAt ?? b.createdAt))
    return { items: next, folders: nextFolders, homeOrder: nextHomeOrder }
}

function applyHomeDashboard(snapshot: HomeDashboardSnapshot) {
  const hiddenIds = assignedHiddenSetIds.value
  items.value = snapshot.items.filter((item) =>
    item.kind === 'set'
      ? !hiddenIds.has(item.id)
      : !item.setId || !hiddenIds.has(item.setId)
  )
  folders.value = snapshot.folders
  homeOrder.value = snapshot.homeOrder
}

function cacheCurrentHomeDashboard() {
  setCachedHomeDashboard({
    items: items.value,
    folders: folders.value,
    homeOrder: homeOrder.value,
  })
}

function reportLibraryLoadError(error: unknown) {
  const message = error instanceof Error ? error.message
    : typeof error === 'object' && error !== null && 'message' in error ? String(error.message)
    : String(error)
  console.error('[Tracer Dashboard] Library load failed:', redactSensitiveText(message))
}

async function loadHomeList() {
  busy.value = true
  loadError.value = null
  const cached = getCachedHomeDashboard()
  if (cached) {
    applyHomeDashboard(cached)
    busy.value = false
    return
  }
  try {
    const snapshot = await useTracerDb().then(fetchHomeDashboard)
    applyHomeDashboard(snapshot)
    cacheCurrentHomeDashboard()
  } catch (error) {
    reportLibraryLoadError(error)
    if (!cached) loadError.value = 'Failed to load sets and study guides.'
  } finally {
    busy.value = false
  }
}

async function reloadCloudDashboard() {
  if (!unlockedThisSession.value) return
  try {
    const snapshot = await useTracerDb().then(fetchHomeDashboard)
    applyHomeDashboard(snapshot)
    cacheCurrentHomeDashboard()
  } catch (error) {
    reportLibraryLoadError(error)
    // Keep the last readable snapshot if the refresh fails.
  }
}

function newUuid() {
  const randomUuid = globalThis.crypto?.randomUUID
  if (typeof randomUuid === 'function') return randomUuid.call(globalThis.crypto) as Uuid
  return `${Date.now()}-${Math.random().toString(16).slice(2)}` as Uuid
}

function classroomSummary(classroom: Classroom) {
  return [classroom.subject, classroom.section, classroom.schoolYear].filter(Boolean).join(' · ') || t('classroom.noClassDetails')
}

async function loadClassroomData() {
  classroomBusy.value = true
  classroomError.value = null
  try {
    const [nextRole, nextClassrooms, assignedSetVersionIds] = await Promise.all([
      getAccountRole(),
      listClassrooms(),
      listClassroomAssignmentSetVersionIds(),
    ])
    accountRole.value = nextRole
    classrooms.value = nextClassrooms
    assignedHiddenSetIds.value = new Set(assignedSetVersionIds)
    if (assignedSetVersionIds.length > 0) {
      const hiddenIds = assignedHiddenSetIds.value
      const db = await useTracerDb()
      await createSetsRepo(db).hideManyFromLibrary(assignedSetVersionIds as Uuid[])
      items.value = items.value.filter((item) =>
        item.kind === 'set'
          ? !hiddenIds.has(item.id)
          : !item.setId || !hiddenIds.has(item.setId)
      )
      cacheCurrentHomeDashboard()
    }
  } catch (error) {
    if (error instanceof ClassroomError && ['signed_out', 'forbidden', 'not_configured'].includes(error.code)) {
      accountRole.value = null
    }
    classrooms.value = []
    classroomError.value = t(classroomErrorKey(error))
  } finally {
    classroomBusy.value = false
  }
}

function closeJoin() {
  if (joinBusy.value) return
  joinOpen.value = false
  joinError.value = null
}

async function onJoinClass(code: string) {
  joinBusy.value = true
  joinError.value = null
  try {
    const classroom = await joinClassroom(code)
    if (!classrooms.value.some((item) => item.id === classroom.id)) {
      classrooms.value = [classroom, ...classrooms.value]
    }
    joinOpen.value = false
  } catch (error) {
    joinError.value = t(classroomErrorKey(error))
  } finally {
    joinBusy.value = false
  }
}

function folderSetCount(folderId: Uuid) {
  return items.value.filter(
    (item) => item.kind === 'set' && item.folderId === folderId
  ).length
}

function folderRowClass(folderId: Uuid) {
  if (folderDragId.value && rootKeyEquals(rootDropTarget.value?.anchor ?? null, { kind: 'folder', id: folderId })) {
    return 'bg-red-50 ring-2 ring-inset ring-red-300 dark:bg-red-950/20 dark:ring-red-800'
  }
  if (dragState.active && dragState.dropFolderId === folderId) {
    return 'bg-slate-100 ring-2 ring-inset ring-slate-400 dark:bg-slate-900 dark:ring-slate-600'
  }
  if (selectedFolderId.value === folderId) {
    return 'bg-slate-100 dark:bg-slate-900'
  }
  return 'bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900'
}

function onFolderRowClick(folderId: Uuid, event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Element) || target.closest('input, a')) return
  const button = target.closest('button')
  if (button && !button.hasAttribute('data-folder-toggle')) return
  clearSetSelection()
  void router.push({ path: `/folder/${folderId}`, query: activeLibraryKind.value === 'study-guide' ? { kind: 'study-guide' } : {} })
}

function setFolderInputRef(folderId: Uuid, element: unknown) {
  const input = element instanceof HTMLInputElement ? element : (element as { inputRef?: HTMLInputElement } | null)?.inputRef
  if (input instanceof HTMLInputElement) {
    folderInputRefs.set(folderId, input)
  }
}

async function beginFolderRename(folder: SetFolder) {
  if (folderRenameBusy.value) return
  selectedFolderId.value = folder.id
  selectedSetIds.value = new Set()
  editingFolderId.value = folder.id
  folderNameDraft.value = folder.name
  await nextTick()
  const input = folderInputRefs.get(folder.id)
  input?.focus()
  input?.select()
}

async function commitFolderRename(folder: SetFolder) {
  if (editingFolderId.value !== folder.id || folderRenameBusy.value) return
  const nextName = folderNameDraft.value.trim() || folder.name
  editingFolderId.value = null
  folderNameDraft.value = ''
  if (nextName === folder.name) return

  folderRenameBusy.value = true
  loadError.value = null
  try {
    const db = await useTracerDb()
    const updated = await createFoldersRepo(db).rename(folder.id, nextName)
    folders.value = folders.value.map((candidate) =>
      candidate.id === updated.id ? updated : candidate
    )
  } catch {
    loadError.value = t('home.folderRenameFailed')
  } finally {
    folderRenameBusy.value = false
  }
}

function cancelFolderRename(folder: SetFolder) {
  if (editingFolderId.value !== folder.id) return
  folderNameDraft.value = folder.name
  editingFolderId.value = null
}

async function addFolder() {
  if (busy.value || isWebPreviewRuntime()) return
  loadError.value = null
  try {
    const db = await useTracerDb()
    const folder = await createFoldersRepo(db).create({
      id: newUuid(),
      name: t('home.untitledFolder')
    })
    folders.value = [folder, ...folders.value]
    await persistHomeOrder(orderedRootKeys())
    selectedFolderId.value = folder.id
    await beginFolderRename(folder)
  } catch {
    loadError.value = t('home.folderCreateFailed')
  }
}

function onFolderPointerDown(folderId: Uuid, event: PointerEvent) {
  if (event.button !== 0 || !event.isPrimary || editingFolderId.value === folderId) return
  const handle = event.currentTarget
  if (handle instanceof HTMLElement) handle.setPointerCapture(event.pointerId)
  folderPointerCandidate = {
    folderId,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY
  }
  rootDropTarget.value = {
    anchor: { kind: 'folder', id: folderId },
    placement: 'before'
  }
}

function rootHitAt(clientX: number, clientY: number) {
  const hit = document
    .elementsFromPoint(clientX, clientY)
    .map((element) => element.closest<HTMLElement>('[data-root-entry-hit]'))
    .find(Boolean)
  const entry = hit?.closest<HTMLElement>('[data-root-entry-kind][data-root-entry-id]')
  const kind = entry?.dataset.rootEntryKind
  const id = entry?.dataset.rootEntryId as Uuid | undefined
  if (!hit || !id || (kind !== 'folder' && kind !== 'set')) return null
  const rect = hit.getBoundingClientRect()
  return {
    key: { kind, id } as RootEntryKey,
    placement: clientY < rect.top + rect.height / 2 ? 'before' as const : 'after' as const,
    edgeRatio: rect.height > 0 ? (clientY - rect.top) / rect.height : 0.5
  }
}

function updateFolderReorderTarget(clientX: number, clientY: number) {
  const hit = rootHitAt(clientX, clientY)
  if (hit) {
    rootDropTarget.value = { anchor: hit.key, placement: hit.placement }
    return
  }
  const overRoot = document
    .elementsFromPoint(clientX, clientY)
    .some((element) => element.closest('[data-root-drop-zone]') !== null)
  rootDropTarget.value = overRoot ? { anchor: null, placement: 'after' } : null
}

function reorderedRootKeys(dragged: RootEntryKey[], target: RootDropTarget | null) {
  const draggedIds = new Set(dragged.map((entry) => `${entry.kind}:${entry.id}`))
  if (target?.anchor && draggedIds.has(`${target.anchor.kind}:${target.anchor.id}`)) {
    return orderedRootKeys()
  }
  const next = orderedRootKeys().filter((entry) => !draggedIds.has(`${entry.kind}:${entry.id}`))
  if (!target?.anchor) return [...next, ...dragged]
  const anchorIndex = next.findIndex((entry) => rootKeyEquals(entry, target.anchor as RootEntryKey))
  const insertAt = anchorIndex < 0
    ? next.length
    : anchorIndex + (target.placement === 'after' ? 1 : 0)
  next.splice(insertAt, 0, ...dragged)
  return next
}

async function persistHomeOrder(keys: RootEntryKey[]) {
  homeOrder.value = keys.map((entry, sortOrder) => ({ ...entry, sortOrder }))
  if (isWebPreviewRuntime()) return
  const db = await useTracerDb()
  await createFoldersRepo(db).reorderHome(keys)
}

async function reorderRootEntry(dragged: RootEntryKey, target: RootDropTarget | null) {
  if (target?.anchor && rootKeyEquals(target.anchor, dragged)) return
  try {
    await persistHomeOrder(reorderedRootKeys([dragged], target))
  } catch {
    loadError.value = 'Failed to reorder the home library.'
    await loadHomeList()
  }
}

async function deleteFolder(folder: SetFolder) {
  loadError.value = null
  try {
    const db = await useTracerDb()
    const foldersRepo = createFoldersRepo(db)
    await foldersRepo.delete(folder.id)
    folders.value = folders.value.filter((candidate) => candidate.id !== folder.id)
    items.value = items.value.map((item) => item.folderId === folder.id ? { ...item, folderId: null } : item)
    if (selectedFolderId.value === folder.id) selectedFolderId.value = null
    const nextOrder = orderedRootKeys()
    homeOrder.value = nextOrder.map((entry, sortOrder) => ({ ...entry, sortOrder }))
    cacheCurrentHomeDashboard()
    // The folder deletion is already complete. A failed order rewrite should
    // not bring the deleted folder back or report the deletion itself as failed.
    await foldersRepo.reorderHome(nextOrder).catch(() => undefined)
  } catch {
    loadError.value = 'Failed to delete folder.'
  }
}

function replaceSelectedSets(next: Set<Uuid>) {
  selectedSetIds.value = next
  selectedFolderId.value = null
}

function clearSetSelection() {
  selectedSetIds.value = new Set()
  selectionAnchorId.value = null
}

function selectSetRange(setId: Uuid) {
  const anchorIsVisible = selectionAnchorId.value
    ? visibleSetIds.value.includes(selectionAnchorId.value)
    : false
  const range = visibleSetRange(
    visibleSetIds.value,
    selectionAnchorId.value,
    setId
  )
  replaceSelectedSets(new Set(range))
  if (!anchorIsVisible) selectionAnchorId.value = setId
}

function toggleSetSelection(setId: Uuid) {
  const nextSelection = toggleSelectedSet([...selectedSetIds.value], setId)
  replaceSelectedSets(new Set(nextSelection))
  if (nextSelection.length === 0) {
    selectionAnchorId.value = null
  } else if (nextSelection.includes(setId)) {
    selectionAnchorId.value = setId
  } else if (selectionAnchorId.value === setId) {
    selectionAnchorId.value = nextSelection[nextSelection.length - 1] ?? null
  }
}

function onItemClick(item: HomeListItem, event: MouseEvent) {
  const setId = homeItemSetId(item)
  selectedFolderId.value = null

  if (suppressNextSetClickId === setId) {
    suppressNextSetClickId = null
    return
  }

  if (event.shiftKey) {
    selectSetRange(setId)
    return
  }

  if (event.ctrlKey || event.metaKey) {
    toggleSetSelection(setId)
    return
  }

  const nextSelection = selectedSetsAfterPlainClick(
    [...selectedSetIds.value],
    setId
  )
  if (nextSelection !== null) {
    replaceSelectedSets(new Set(nextSelection))
    if (nextSelection.length === 0) {
      selectionAnchorId.value = null
    } else if (selectionAnchorId.value === setId) {
      selectionAnchorId.value = nextSelection[nextSelection.length - 1] ?? null
    }
    return
  }

  void router.push(itemTo(item))
}

function onDocumentClick() {
  if (selectedSetIds.value.size > 0) clearSetSelection()
  selectedFolderId.value = null
}

function onWindowKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    resetDragState()
    clearSetSelection()
    selectedFolderId.value = null
  }
}

function onItemPointerDown(item: HomeListItem, event: PointerEvent) {
  if (event.button !== 0 || !event.isPrimary) return
  pointerCandidate = {
    setId: homeItemSetId(item),
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY
  }
  dragState.x = event.clientX
  dragState.y = event.clientY
}

function updateDropTarget(clientX: number, clientY: number) {
  if (isFolderPage.value) {
    dragState.dropFolderId = null
    dragState.overRoot = clientX <= 52 || clientX >= window.innerWidth - 52
    rootDropTarget.value = null
    return
  }
  const elements = document.elementsFromPoint(clientX, clientY)
  const rootHit = rootHitAt(clientX, clientY)
  const rootInsertion = rootHit?.key.kind === 'set'
  if (rootInsertion) {
    dragState.dropFolderId = null
    dragState.overRoot = true
    rootDropTarget.value = { anchor: rootHit.key, placement: rootHit.placement }
    return
  }

  for (const element of elements) {
    const folderTarget = element.closest<HTMLElement>('[data-folder-drop-id]')
    const folderId = folderTarget?.dataset.folderDropId as Uuid | undefined
    if (folderId && folders.value.some((folder) => folder.id === folderId)) {
      dragState.dropFolderId = folderId
      dragState.overRoot = false
      rootDropTarget.value = null
      return
    }
  }

  dragState.dropFolderId = null
  dragState.overRoot = elements.some(
    (element) => element.closest('[data-root-drop-zone]') !== null
  )
  rootDropTarget.value = dragState.overRoot
    ? { anchor: null, placement: 'after' }
    : null
}

function startPointerDrag(candidate: PointerCandidate) {
  if (!selectedSetIds.value.has(candidate.setId)) {
    replaceSelectedSets(new Set([candidate.setId]))
    selectionAnchorId.value = candidate.setId
  }
  dragState.active = true
  document.documentElement.classList.add('library-dragging')
  dragState.setIds = [...selectedSetIds.value]
  selectedFolderId.value = null
  startDragAutoScroll()
}

let dragScrollFrame: number | null = null
let dragScrollTime: number | null = null

function stopDragAutoScroll() {
  if (dragScrollFrame !== null) window.cancelAnimationFrame(dragScrollFrame)
  dragScrollFrame = null
  dragScrollTime = null
}

function startDragAutoScroll() {
  if (dragScrollFrame !== null) return
  const tick = (now: number) => {
    dragScrollFrame = null
    if (!dragState.active) return
    const elapsed = Math.min(32, dragScrollTime === null ? 16 : now - dragScrollTime)
    dragScrollTime = now
    const edge = Math.min(80, window.innerHeight / 4)
    const { x, y } = dragState
    const speed = y < edge ? -Math.min(1, (edge - y) / edge)
      : y > window.innerHeight - edge ? Math.min(1, (y - window.innerHeight + edge) / edge) : 0
    if (speed) {
      const before = window.scrollY
      window.scrollBy(0, speed * 750 * elapsed / 1000)
      if (window.scrollY !== before) updateDropTarget(x, y)
    }
    dragScrollFrame = window.requestAnimationFrame(tick)
  }
  dragScrollFrame = window.requestAnimationFrame(tick)
}

function onWindowPointerMove(event: PointerEvent) {
  const folderCandidate = folderPointerCandidate
  if (folderCandidate && event.pointerId === folderCandidate.pointerId) {
    const distance = Math.hypot(
      event.clientX - folderCandidate.startX,
      event.clientY - folderCandidate.startY
    )
    if (!folderDragId.value && distance < 5) return
    folderDragId.value = folderCandidate.folderId
    event.preventDefault()
    updateFolderReorderTarget(event.clientX, event.clientY)
    return
  }

  const candidate = pointerCandidate
  if (!candidate || event.pointerId !== candidate.pointerId) return
  const distance = Math.hypot(
    event.clientX - candidate.startX,
    event.clientY - candidate.startY
  )
  if (!dragState.active && distance < 6) return
  if (!dragState.active) startPointerDrag(candidate)

  event.preventDefault()
  dragState.x = event.clientX
  dragState.y = event.clientY
  updateDropTarget(event.clientX, event.clientY)
}

function resetDragState() {
  document.documentElement.classList.remove('library-dragging')
  stopDragAutoScroll()
  dragState.active = false
  dragState.setIds = []
  dragState.dropFolderId = null
  dragState.overRoot = false
  rootDropTarget.value = null
  pointerCandidate = null
  folderPointerCandidate = null
  folderDragId.value = null
}

async function moveSelectedSets(
  setIds: Uuid[],
  folderId: Uuid | null,
  target: RootDropTarget | null = null
) {
  if (setIds.length === 0) return
  loadError.value = null
  try {
    const db = await useTracerDb()
    const foldersRepo = createFoldersRepo(db)
    await foldersRepo.moveSets(setIds, folderId)
    items.value = assignHomeItemsToFolder(items.value, setIds, folderId)
    const movedKeys = setIds.map((id) => ({ kind: 'set' as const, id }))
    const nextOrder = folderId
      ? orderedRootKeys().filter(
          (entry) => !setIds.some((id) => entry.kind === 'set' && entry.id === id)
        )
      : reorderedRootKeys(movedKeys, target)
    homeOrder.value = nextOrder.map((entry, sortOrder) => ({ ...entry, sortOrder }))
    await foldersRepo.reorderHome(nextOrder)
    replaceSelectedSets(new Set())
    selectionAnchorId.value = null
  } catch {
    loadError.value = t('home.folderMoveFailed')
  }
}

function onWindowPointerUp(event: PointerEvent) {
  const folderCandidate = folderPointerCandidate
  if (folderCandidate && event.pointerId === folderCandidate.pointerId) {
    const wasDragging = folderDragId.value === folderCandidate.folderId
    const target = rootDropTarget.value
    folderPointerCandidate = null
    folderDragId.value = null
    rootDropTarget.value = null
    if (wasDragging && target) void reorderRootEntry({ kind: 'folder', id: folderCandidate.folderId }, target)
    return
  }

  const candidate = pointerCandidate
  if (!candidate || event.pointerId !== candidate.pointerId) return
  const wasDragging = dragState.active
  if (wasDragging) updateDropTarget(event.clientX, event.clientY)
  const draggedSetIds = [...dragState.setIds]
  const dropFolderId = dragState.dropFolderId
  const overRoot = dragState.overRoot
  const rootTarget = rootDropTarget.value
  if (wasDragging) {
    event.preventDefault()
    suppressNextSetClickId = candidate.setId
    window.setTimeout(() => {
      if (suppressNextSetClickId === candidate.setId) {
        suppressNextSetClickId = null
      }
    }, 0)
  }
  resetDragState()

  if (!wasDragging) return
  if (dropFolderId) {
    void moveSelectedSets(draggedSetIds, dropFolderId)
  } else if (overRoot) {
    void moveSelectedSets(draggedSetIds, null, rootTarget)
  }
}

function onWindowPointerCancel(event: PointerEvent) {
  if (folderPointerCandidate && event.pointerId === folderPointerCandidate.pointerId) {
    folderPointerCandidate = null
    folderDragId.value = null
    rootDropTarget.value = null
    return
  }
  if (!pointerCandidate || event.pointerId !== pointerCandidate.pointerId) return
  if (dragState.active) {
    const cancelledSetId = pointerCandidate.setId
    suppressNextSetClickId = cancelledSetId
    window.setTimeout(() => {
      if (suppressNextSetClickId === cancelledSetId) {
        suppressNextSetClickId = null
      }
    }, 0)
  }
  resetDragState()
}

watch(language, () => {
  if (isWebPreviewRuntime()) initWebDemoItems()
})

onMounted(async () => {
  viewportWidth.value = window.innerWidth; viewportHeight.value = window.innerHeight
  window.addEventListener('resize', updateViewport)
  window.addEventListener('blur', resetDragState)
  window.addEventListener('tracer:cloud-library-changed', reloadCloudDashboard)
  document.addEventListener('click', onDocumentClick)
  window.addEventListener('pointermove', onWindowPointerMove, { passive: false })
  window.addEventListener('pointerup', onWindowPointerUp)
  window.addEventListener('pointercancel', onWindowPointerCancel)
  window.addEventListener('keydown', onWindowKeyDown)

  if (isWebPreviewRuntime()) {
    busy.value = false
    loadError.value = null
    initWebDemoItems()
    return
  }

  try {
    const [status, db] = await Promise.all([
      lockGetStatus(),
      useTracerDb()
    ])
    const profilePromise = createProfileRepo(db).get()
    const settingsPromise = createSettingsRepo(db).get()
    const profile = await profilePromise
    ownerName.value = profile?.name ?? ''
    if (!profile || !status.has_verifier) {
      markLocked()
      await router.replace('/first-run')
      return
    }

    const settings = await settingsPromise
    if (settings.startupLockEnabled && status.requires_unlock && !unlockedThisSession.value) {
      markLocked()
      await router.replace('/unlock')
      return
    }
    const localDashboardLoad = loadHomeList()
    // Show persisted cloud summaries immediately; revalidate independently.
    void localDashboardLoad.then(() => syncPrivateSets()).then(() => {
      markPrivateSetsSyncedThisSession()
      return reloadCloudDashboard()
    }).catch(() => {})

    accountRole.value = getCachedAccountRole(profile.supabaseUserId)

    if (status.can_auto_unlock) markUnlocked()
    // Classrooms and the local library are independent after the lock gate.
    await Promise.all([localDashboardLoad, loadClassroomData()])
  } catch (error) {
    reportLibraryLoadError(error)
    loadError.value = 'Failed to load sets and study guides.'
    busy.value = false
  }
})

function updateViewport() { viewportWidth.value = window.innerWidth; viewportHeight.value = window.innerHeight }

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  window.removeEventListener('blur', resetDragState)
  if (!busy.value && !loadError.value) cacheCurrentHomeDashboard()
  window.removeEventListener('tracer:cloud-library-changed', reloadCloudDashboard)
  document.removeEventListener('click', onDocumentClick)
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerCancel)
  window.removeEventListener('keydown', onWindowKeyDown)
  resetDragState()
})
</script>

<style scoped>
.library-grid { display:grid; grid-template-columns:minmax(0,1fr); gap:16px; align-items:start; }
@media(min-width:640px) { .library-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media(min-width:1280px) { .library-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
.library-empty { border-radius:var(--tracer-radius-surface); background:var(--ui-bg-muted); padding:28px; text-align:center; color:var(--ui-text-muted); }
.folder-card { position:relative; height:196px; padding:22px; border-radius:var(--tracer-radius-surface); background:var(--ui-bg-muted); }
.folder-card:hover { background:var(--ui-bg-elevated); }
.folder-card--target { box-shadow:inset 0 0 0 2px #FA3F5F; }
.folder-card--selected { box-shadow:inset 0 0 0 2px var(--ui-primary); }
.folder-card__open { display:block; width:100%; min-height:112px; text-align:left; padding-right:26px; }
.folder-card__open h3 { font-size:1.125rem; font-weight:725; color:var(--ui-text-highlighted); }
.folder-card__preview { display:block; margin-top:10px; line-height:1.6; font-size:.9375rem; color:var(--ui-text-muted); }
.folder-card__chevron { position:absolute; top:50%; right:20px; transform:translateY(-50%); width:24px; height:24px; }
.folder-card__tools { position:absolute; bottom:8px; right:8px; display:flex; opacity:0; transition:opacity 120ms; }
.folder-card:hover .folder-card__tools,.folder-card:focus-within .folder-card__tools { opacity:1; }
.library-root-drop { grid-column:1 / -1; min-height:100px; }
.library-drop-active { outline:2px dashed #FA3F5F; outline-offset:8px; border-radius:var(--tracer-radius-surface); }
.drop-indicator { height:3px; background:var(--ui-primary); border-radius:2px; }
@media(pointer:coarse) { .folder-card__tools { opacity:1; } }
</style>
<style>
.folder-move-zone { position:fixed; top:12px; bottom:12px; width:44px; border:2px dotted #FA3F5F; border-radius:14px; background:rgba(250,63,95,.10); pointer-events:none; z-index:100; transition:background-color 120ms ease,border-width 120ms ease; }
.folder-move-zone--left { left:4px; }
.folder-move-zone--right { right:4px; }
.folder-move-zone--active { background:rgba(250,63,95,.24); border-width:3px; }
.library-dragging, .library-dragging * { cursor:grabbing !important; user-select:none !important; }
.drag-count { position:fixed; z-index:110; display:flex; align-items:center; gap:6px; min-height:32px; padding:0 12px; border-radius:9999px; background:#0f172a; color:white; box-shadow:0 5px 18px rgba(15,23,42,.24); font-size:.875rem; font-weight:600; pointer-events:none; }
@media (prefers-reduced-motion:reduce) { .folder-move-zone { transition:none; } }
</style>
