<template>
  <main>
    <div class="mx-auto max-w-5xl px-6 py-8">
      <div class="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          aria-labelledby="home-sets"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h1 id="home-sets" class="text-lg font-semibold">{{ t('home.sets') }}</h1>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {{ t('home.subtitle') }}
              </p>
            </div>
            <button
              type="button"
              class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
              :disabled="busy || !hasTauriRuntime()"
              @click="addFolder"
            >
              {{ t('home.addFolder') }}
            </button>
          </div>

          <div class="mt-5">
            <p v-if="loadError" class="text-sm text-red-700 dark:text-red-300">
              {{ loadError }}
            </p>

            <div v-else>
              <div
                v-if="!hasTauriRuntime()"
                class="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
                role="status"
                aria-live="polite"
              >
                {{ t('demo.webPreviewNotice') }}
              </div>

              <div
                v-if="busy"
                class="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {{ t('common.loading') }}
              </div>

              <div
                v-else-if="items.length === 0 && folders.length === 0"
                class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {{ t('home.noItems') }}
              </div>

              <div
                v-else
                data-root-drop-zone
                class="mt-3 rounded-md transition"
                :class="
                  dragState.active && dragState.overRoot
                    ? 'bg-slate-100/80 ring-2 ring-inset ring-slate-300 dark:bg-slate-900/70 dark:ring-slate-700'
                    : ''
                "
              >
                <ul v-if="visibleFolders.length > 0" class="space-y-3">
                  <li
                    v-for="folder in visibleFolders"
                    :key="folder.id"
                    :data-folder-drop-id="folder.id"
                    class="rounded-md"
                  >
                    <div
                      role="button"
                      tabindex="0"
                      class="flex min-h-12 items-center gap-3 rounded-md border border-slate-200 px-3 py-2 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                      :class="folderRowClass(folder.id)"
                      @click="selectFolder(folder.id, $event)"
                      @dblclick="handleFolderDoubleClick(folder.id)"
                      @keydown.enter.prevent="beginFolderRename(folder)"
                      @keydown.space.prevent="toggleFolder(folder.id)"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        class="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                      >
                        <path d="M3.5 6.5h6l2 2h9v9.5a2 2 0 0 1-2 2h-15v-13.5Z" />
                        <path d="M3.5 8.5v-2a2 2 0 0 1 2-2h3l2 2" />
                      </svg>

                      <input
                        v-if="editingFolderId === folder.id"
                        :ref="(el) => setFolderInputRef(folder.id, el)"
                        v-model="folderNameDraft"
                        class="min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 py-1 text-sm font-medium text-slate-900 outline-none ring-2 ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:ring-slate-600"
                        :aria-label="t('home.folderName')"
                        @click.stop
                        @dblclick.stop
                        @keydown.enter.stop.prevent="commitFolderRename(folder)"
                        @keydown.esc.stop.prevent="cancelFolderRename(folder)"
                        @blur="commitFolderRename(folder)"
                      />
                      <span
                        v-else
                        class="min-w-0 flex-1 truncate text-sm font-medium text-slate-900 dark:text-slate-50 select-none"
                      >
                        {{ folder.name }}
                      </span>

                      <span class="shrink-0 text-xs text-slate-500 dark:text-slate-400 select-none">
                        {{ folderSetCount(folder.id) }}
                      </span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        class="h-6 w-6 shrink-0 cursor-pointer rounded p-1 text-slate-500 transition hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
                        :class="{ 'rotate-90': folderIsOpen(folder.id) }"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        @click.stop="toggleFolder(folder.id)"
                        @dblclick.stop
                      >
                        <path d="m7 4 6 6-6 6" />
                      </svg>
                    </div>

                    <ul
                      v-if="folderIsOpen(folder.id)"
                      class="ms-6 mt-2 space-y-3 border-s border-slate-200 ps-3 dark:border-slate-800"
                      :data-folder-drop-id="folder.id"
                    >
                      <HomeLibraryItem
                        v-for="item in itemsForFolder(folder.id)"
                        :key="itemKey(item)"
                        :item="item"
                        :to="itemTo(item)"
                        :formatted-date="formatDate(item.updatedAt ?? item.createdAt)"
                        :selected="item.kind === 'set' && selectedSetIds.has(item.id)"
                        @item-click="onItemClick(item, $event)"
                        @item-pointerdown="onItemPointerDown(item, $event)"
                      />
                      <li
                        v-if="itemsForFolder(folder.id).length === 0"
                        class="rounded-md border border-dashed border-slate-200 px-3 py-3 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400"
                      >
                        {{ t('home.emptyFolder') }}
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul
                  v-if="rootItems.length > 0"
                  class="space-y-3"
                  :class="{ 'mt-3': visibleFolders.length > 0 }"
                >
                  <HomeLibraryItem
                    v-for="item in rootItems"
                    :key="itemKey(item)"
                    :item="item"
                    :to="itemTo(item)"
                    :formatted-date="formatDate(item.updatedAt ?? item.createdAt)"
                    :selected="item.kind === 'set' && selectedSetIds.has(item.id)"
                    @item-click="onItemClick(item, $event)"
                    @item-pointerdown="onItemPointerDown(item, $event)"
                  />
                </ul>

                <p
                  v-if="rootItems.length === 0 && visibleFolders.length === 0"
                  class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  {{ t('nav.noResults') }}
                </p>
                <div
                  v-else
                  class="mt-3 min-h-8 rounded-md border border-dashed border-transparent"
                  :aria-label="t('home.rootDropArea')"
                />
              </div>
            </div>
          </div>
        </section>

        <Teleport to="body">
          <div
            v-if="dragState.active"
            class="pointer-events-none fixed z-[100] inline-flex -translate-x-1/2 -translate-y-[calc(100%+12px)] items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
            :style="{ left: `${dragState.x}px`, top: `${dragState.y}px` }"
            role="status"
            aria-live="polite"
          >
            <span>{{ t('home.setsSelected', { count: dragState.setIds.length }) }}</span>
          </div>
        </Teleport>

        <section
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto"
          aria-labelledby="home-create"
        >
          <h2 id="home-create" class="text-lg font-semibold">{{ t('home.create') }}</h2>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ t('home.chooseMode') }}</p>

          <div class="mt-4 grid gap-3">
            <NuxtLink
              to="/create/basic"
              class="group rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            >
              <p class="text-sm font-medium text-slate-900 dark:text-slate-50">{{ t('home.basic') }}</p>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {{ t('home.basicHint') }}
              </p>
            </NuxtLink>

            <NuxtLink
              to="/create/synthesize"
              class="group rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            >
              <p class="text-sm font-medium text-slate-900 dark:text-slate-50">{{ t('home.synthesize') }}</p>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {{ t('home.synthesizeHint') }}
              </p>
            </NuxtLink>

            <NuxtLink
              to="/create/generate"
              class="group rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            >
              <p class="text-sm font-medium text-slate-900 dark:text-slate-50">{{ t('home.generate') }}</p>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {{ t('home.generateHint') }}
              </p>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
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
  FlashcardSetListItem,
  SetFolder,
  Uuid
} from '../src/composables/db/types'
import { hasTauriRuntime } from '../src/composables/tauri'
import { useAppLanguage } from '../src/composables/language'
import { createDemoStudyGuideTitle } from '../src/composables/demo-content'
import {
  assignHomeItemsToFolder,
  hasSelectionModifier,
  selectedSetsAfterPlainClick,
  toggleSelectedSet,
  visibleSetRange
} from '../src/composables/home/set-organization'

const router = useRouter()
const route = useRoute()
const { language, t } = useAppLanguage()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()

type HomeListItem = {
  kind: 'set' | 'study-guide'
  kindLabel: 'Set' | 'Study guide'
  id: Uuid
  setId?: Uuid
  folderId: Uuid | null
  title: string
  subtitle: string | null
  createdAt: string
  updatedAt: string | null
}

const busy = ref(true)
const loadError = ref<string | null>(null)
const items = ref<HomeListItem[]>([])
const folders = ref<SetFolder[]>([])
const expandedFolderIds = ref(new Set<Uuid>())
const selectedSetIds = ref(new Set<Uuid>())
const selectedFolderId = ref<Uuid | null>(null)
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

let pointerCandidate: PointerCandidate | null = null
let suppressNextSetClickId: Uuid | null = null
let dragHoverFolderId: Uuid | null = null
let dragHoverTimer: number | null = null
let folderCollapsedByClickId: Uuid | null = null
let folderCollapsedByClickTimer: number | null = null

const query = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const rootItems = computed(() => {
  return items.value.filter((item) => item.folderId === null && itemMatchesQuery(item))
})

const visibleFolders = computed(() => {
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

const visibleSetIds = computed(() => {
  const ids: Uuid[] = []
  for (const folder of visibleFolders.value) {
    if (!folderIsOpen(folder.id)) continue
    for (const item of itemsForFolder(folder.id)) {
      if (item.kind === 'set') ids.push(item.id)
    }
  }
  for (const item of rootItems.value) {
    if (item.kind === 'set') ids.push(item.id)
  }
  return ids
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
      item.folderId === folderId &&
      (folderMatches || itemMatchesQuery(item))
  )
}

function folderIsOpen(folderId: Uuid) {
  if (expandedFolderIds.value.has(folderId)) return true
  if (!normalizedQuery.value) return false
  return itemsForFolder(folderId).length > 0
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
      createdAt: now,
      updatedAt: now
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
  return d.toLocaleString(language.value)
}

function sortIsoDesc(a: string, b: string) {
  if (a === b) return 0
  return a > b ? -1 : 1
}

async function loadHomeList() {
  busy.value = true
  loadError.value = null
  try {
    const db = await useTracerDb()
    const setsRepo = createSetsRepo(db)
    const guidesRepo = createStudyGuidesRepo(db)
    const foldersRepo = createFoldersRepo(db)

    const [sets, nextFolders] = await Promise.all([
      setsRepo.list(),
      foldersRepo.list()
    ])
    const next: HomeListItem[] = []

    const setTitleById = new Map<Uuid, string>()
    for (const s of sets) {
      setTitleById.set(s.id, s.title)
    }

    for (const s of sets) {
      next.push(toSetListItem(s))
      const guide = await guidesRepo.getBySetId(s.id)
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
    items.value = next
    folders.value = nextFolders
  } catch {
    loadError.value = 'Failed to load sets and study guides.'
  } finally {
    busy.value = false
  }
}

function toSetListItem(s: FlashcardSetListItem): HomeListItem {
  return {
    kind: 'set',
    kindLabel: 'Set',
    id: s.id,
    folderId: s.folderId,
    title: s.title,
    subtitle: s.description,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }
}

function newUuid() {
  const randomUuid = globalThis.crypto?.randomUUID
  if (typeof randomUuid === 'function') return randomUuid.call(globalThis.crypto) as Uuid
  return `${Date.now()}-${Math.random().toString(16).slice(2)}` as Uuid
}

function replaceExpandedFolders(next: Set<Uuid>) {
  expandedFolderIds.value = next
}

function folderSetCount(folderId: Uuid) {
  return items.value.filter(
    (item) => item.kind === 'set' && item.folderId === folderId
  ).length
}

function folderRowClass(folderId: Uuid) {
  if (dragState.active && dragState.dropFolderId === folderId) {
    return 'bg-slate-100 ring-2 ring-inset ring-slate-400 dark:bg-slate-900 dark:ring-slate-600'
  }
  if (selectedFolderId.value === folderId) {
    return 'bg-slate-100 dark:bg-slate-900'
  }
  return 'bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900'
}

function selectFolder(folderId: Uuid, event?: MouseEvent) {
  selectedFolderId.value = folderId
  selectedSetIds.value = new Set()
  selectionAnchorId.value = null
  const currentTarget = event?.currentTarget
  if (currentTarget instanceof HTMLElement) currentTarget.focus()

  if (event?.detail === 1 && folderIsOpen(folderId)) {
    const next = new Set(expandedFolderIds.value)
    next.delete(folderId)
    replaceExpandedFolders(next)
    folderCollapsedByClickId = folderId
    if (folderCollapsedByClickTimer !== null) {
      window.clearTimeout(folderCollapsedByClickTimer)
    }
    folderCollapsedByClickTimer = window.setTimeout(() => {
      if (folderCollapsedByClickId === folderId) folderCollapsedByClickId = null
      folderCollapsedByClickTimer = null
    }, 500)
  }
}

function handleFolderDoubleClick(folderId: Uuid) {
  if (folderCollapsedByClickId === folderId) {
    folderCollapsedByClickId = null
    if (folderCollapsedByClickTimer !== null) {
      window.clearTimeout(folderCollapsedByClickTimer)
      folderCollapsedByClickTimer = null
    }
    return
  }
  toggleFolder(folderId)
}

function toggleFolder(folderId: Uuid) {
  const next = new Set(expandedFolderIds.value)
  if (next.has(folderId)) next.delete(folderId)
  else next.add(folderId)
  replaceExpandedFolders(next)
}

function setFolderInputRef(folderId: Uuid, element: unknown) {
  if (element instanceof HTMLInputElement) {
    folderInputRefs.set(folderId, element)
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
  if (busy.value || !hasTauriRuntime()) return
  loadError.value = null
  try {
    const db = await useTracerDb()
    const folder = await createFoldersRepo(db).create({
      id: newUuid(),
      name: t('home.untitledFolder')
    })
    folders.value = [folder, ...folders.value]
    selectedFolderId.value = folder.id
    const nextExpanded = new Set(expandedFolderIds.value)
    nextExpanded.add(folder.id)
    replaceExpandedFolders(nextExpanded)
    await beginFolderRename(folder)
  } catch {
    loadError.value = t('home.folderCreateFailed')
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
  if (item.kind === 'study-guide') {
    if (hasSelectionModifier(event)) {
      return
    }
    clearSetSelection()
    void router.push(itemTo(item))
    return
  }

  if (suppressNextSetClickId === item.id) {
    suppressNextSetClickId = null
    return
  }

  if (event.shiftKey) {
    if (selectedSetIds.value.has(item.id)) toggleSetSelection(item.id)
    else selectSetRange(item.id)
    return
  }

  if (event.ctrlKey || event.metaKey) {
    toggleSetSelection(item.id)
    return
  }

  const nextSelection = selectedSetsAfterPlainClick(
    [...selectedSetIds.value],
    item.id
  )
  if (nextSelection !== null) {
    replaceSelectedSets(new Set(nextSelection))
    if (nextSelection.length === 0) {
      selectionAnchorId.value = null
    } else if (selectionAnchorId.value === item.id) {
      selectionAnchorId.value = nextSelection[nextSelection.length - 1] ?? null
    }
    return
  }

  void router.push(itemTo(item))
}

function onDocumentClick() {
  if (selectedSetIds.value.size === 0) return
  clearSetSelection()
}

function onWindowKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedSetIds.value.size > 0) {
    clearSetSelection()
  }
}

function onItemPointerDown(item: HomeListItem, event: PointerEvent) {
  if (item.kind !== 'set' || event.button !== 0 || !event.isPrimary) return
  pointerCandidate = {
    setId: item.id,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY
  }
  dragState.x = event.clientX
  dragState.y = event.clientY
}

function clearDragHoverTimer() {
  if (dragHoverTimer !== null) {
    window.clearTimeout(dragHoverTimer)
    dragHoverTimer = null
  }
  dragHoverFolderId = null
}

function scheduleFolderExpansion(folderId: Uuid) {
  if (dragHoverFolderId === folderId || expandedFolderIds.value.has(folderId)) return
  clearDragHoverTimer()
  dragHoverFolderId = folderId
  dragHoverTimer = window.setTimeout(() => {
    const next = new Set(expandedFolderIds.value)
    next.add(folderId)
    replaceExpandedFolders(next)
    dragHoverTimer = null
  }, 450)
}

function updateDropTarget(clientX: number, clientY: number) {
  const elements = document.elementsFromPoint(clientX, clientY)
  for (const element of elements) {
    const folderTarget = element.closest<HTMLElement>('[data-folder-drop-id]')
    const folderId = folderTarget?.dataset.folderDropId as Uuid | undefined
    if (folderId && folders.value.some((folder) => folder.id === folderId)) {
      dragState.dropFolderId = folderId
      dragState.overRoot = false
      scheduleFolderExpansion(folderId)
      return
    }
  }

  clearDragHoverTimer()
  dragState.dropFolderId = null
  dragState.overRoot = elements.some(
    (element) => element.closest('[data-root-drop-zone]') !== null
  )
}

function startPointerDrag(candidate: PointerCandidate) {
  if (!selectedSetIds.value.has(candidate.setId)) {
    replaceSelectedSets(new Set([candidate.setId]))
    selectionAnchorId.value = candidate.setId
  }
  dragState.active = true
  dragState.setIds = [...selectedSetIds.value]
  selectedFolderId.value = null
}

function onWindowPointerMove(event: PointerEvent) {
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
  clearDragHoverTimer()
  dragState.active = false
  dragState.setIds = []
  dragState.dropFolderId = null
  dragState.overRoot = false
  pointerCandidate = null
}

async function moveSelectedSets(setIds: Uuid[], folderId: Uuid | null) {
  if (setIds.length === 0) return
  loadError.value = null
  try {
    const db = await useTracerDb()
    await createFoldersRepo(db).moveSets(setIds, folderId)
    items.value = assignHomeItemsToFolder(items.value, setIds, folderId)
    replaceSelectedSets(new Set())
    selectionAnchorId.value = null
    if (folderId) {
      const next = new Set(expandedFolderIds.value)
      next.add(folderId)
      replaceExpandedFolders(next)
    }
  } catch {
    loadError.value = t('home.folderMoveFailed')
  }
}

function onWindowPointerUp(event: PointerEvent) {
  const candidate = pointerCandidate
  if (!candidate || event.pointerId !== candidate.pointerId) return
  const wasDragging = dragState.active
  const draggedSetIds = [...dragState.setIds]
  const dropFolderId = dragState.dropFolderId
  const overRoot = dragState.overRoot
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
    void moveSelectedSets(draggedSetIds, null)
  }
}

function onWindowPointerCancel(event: PointerEvent) {
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
  if (!hasTauriRuntime()) initWebDemoItems()
})

onMounted(async () => {
  document.addEventListener('click', onDocumentClick)
  window.addEventListener('pointermove', onWindowPointerMove, { passive: false })
  window.addEventListener('pointerup', onWindowPointerUp)
  window.addEventListener('pointercancel', onWindowPointerCancel)
  window.addEventListener('keydown', onWindowKeyDown)

  if (!hasTauriRuntime()) {
    busy.value = false
    loadError.value = null
    initWebDemoItems()
    return
  }

  try {
    const status = await lockGetStatus()
    const db = await useTracerDb()

    const profile = await createProfileRepo(db).get()
    if (!profile || !status.has_verifier) {
      markLocked()
      await router.replace('/first-run')
      return
    }

    const settings = await createSettingsRepo(db).get()
    if (settings.startupLockEnabled && status.requires_unlock) {
      if (unlockedThisSession.value) {
        await loadHomeList()
        return
      }
      markLocked()
      await router.replace('/unlock')
      return
    }

    if (status.can_auto_unlock) {
      markUnlocked()
      await loadHomeList()
      return
    }

    await loadHomeList()
  } catch {
    loadError.value = 'Failed to load sets and study guides.'
    busy.value = false
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerCancel)
  window.removeEventListener('keydown', onWindowKeyDown)
  if (folderCollapsedByClickTimer !== null) {
    window.clearTimeout(folderCollapsedByClickTimer)
  }
  resetDragState()
})
</script>
