<template>
  <main>
    <div class="mx-auto max-w-[1280px] px-8 pb-24 pt-10">
      <div class="grid items-stretch gap-7 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <section
          class="min-h-[calc(100vh-13rem)] rounded-xl border border-slate-200 bg-white p-[26px] text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          aria-labelledby="home-sets"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h1 id="home-sets" class="text-[22px] font-semibold">{{ t('home.sets') }}</h1>
              <p class="mt-1 text-[15px] text-slate-950 dark:text-slate-100">
                {{ t('home.subtitle') }}
              </p>
            </div>
            <button
              type="button"
              class="inline-flex items-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
              :disabled="busy || !hasTauriRuntime()"
              @click="addFolder"
            >
              {{ t('home.addFolder') }}
            </button>
          </div>

          <div class="mt-7 inline-flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800" role="tablist" aria-label="Library type">
            <button type="button" role="tab" :aria-selected="activeLibraryKind === 'set'" class="min-w-40 px-6 py-2.5 text-sm font-medium text-slate-950 transition dark:text-white" :class="activeLibraryKind === 'set' ? 'bg-white shadow-sm dark:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900'" @click="activeLibraryKind = 'set'">
              Flashcards
            </button>
            <button type="button" role="tab" :aria-selected="activeLibraryKind === 'study-guide'" class="min-w-40 border-l border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-950 transition dark:border-slate-800 dark:text-white" :class="activeLibraryKind === 'study-guide' ? 'bg-white shadow-sm dark:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-900'" @click="activeLibraryKind = 'study-guide'">
              Study guides
            </button>
          </div>

          <div class="mt-7">
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
                class="mt-3 flex flex-col gap-3 rounded-md transition"
                :class="
                  dragState.active && dragState.overRoot
                    ? 'bg-slate-100/80 ring-2 ring-inset ring-slate-300 dark:bg-slate-900/70 dark:ring-slate-700'
                    : ''
                "
              >
                <ul v-if="visibleFolders.length > 0" class="contents">
                  <li
                    v-for="folder in visibleFolders"
                    :key="folder.id"
                    :data-folder-reorder-id="folder.id"
                    data-root-entry-kind="folder"
                    :data-root-entry-id="folder.id"
                    :style="{ order: rootEntryPosition('folder', folder.id) }"
                    class="relative rounded-md transition"
                    :class="folderDragId === folder.id ? 'opacity-50' : ''"
                  >
                    <div
                      v-if="rootDropIndicator('folder', folder.id) === 'before'"
                      class="pointer-events-none absolute -top-2 left-0 right-0 z-10 h-1.5 rounded-full bg-[#C75F5F] shadow-sm"
                      aria-hidden="true"
                    />
                    <div
                      role="button"
                      tabindex="0"
                      data-root-entry-hit="true"
                      :data-folder-drop-id="folder.id"
                      class="flex min-h-12 items-center gap-3 rounded-md border border-slate-200 px-3 py-2 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                      :class="folderRowClass(folder.id)"
                      @click.stop="selectFolder(folder.id, $event)"
                      @dblclick="handleFolderDoubleClick(folder.id)"
                      @keydown.enter.prevent="beginFolderRename(folder)"
                      @keydown.space.prevent="toggleFolder(folder.id)"
                    >
                      <button
                        type="button"
                        :draggable="false"
                        class="touch-none select-none cursor-grab rounded p-1 text-slate-950 hover:bg-slate-100 active:cursor-grabbing dark:text-white dark:hover:bg-slate-800"
                        aria-label="Drag folder"
                        @click.stop
                        @dblclick.stop
                        @pointerdown.stop.prevent="onFolderPointerDown(folder.id, $event)"
                      >
                        <svg aria-hidden="true" viewBox="0 0 16 20" class="h-5 w-4" fill="currentColor"><circle cx="5" cy="4" r="1.3"/><circle cx="11" cy="4" r="1.3"/><circle cx="5" cy="10" r="1.3"/><circle cx="11" cy="10" r="1.3"/><circle cx="5" cy="16" r="1.3"/><circle cx="11" cy="16" r="1.3"/></svg>
                      </button>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        class="h-6 w-7 shrink-0 text-slate-500 dark:text-slate-400"
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

                      <span class="shrink-0 text-sm font-medium text-slate-500 dark:text-slate-400 select-none">
                        {{ folderSetCount(folder.id) }}
                      </span>
                      <button
                        type="button"
                        class="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        aria-label="Edit folder name"
                        @click.stop="beginFolderRename(folder)"
                        @dblclick.stop
                      >
                        <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m13.5 4.5 2 2M5 15l1-4 7.8-7.8a1.4 1.4 0 0 1 2 2L8 13l-3 2Z" /></svg>
                      </button>
                      <button
                        type="button"
                        class="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-950 transition hover:bg-red-50 hover:text-red-700 dark:text-white dark:hover:bg-red-950/40 dark:hover:text-red-300"
                        aria-label="Delete folder"
                        @click.stop="deleteFolder(folder)"
                        @dblclick.stop
                      >
                        <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 6.5h9M8 4h4M7 6.5l.6 9h4.8l.6-9" /></svg>
                      </button>
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

                    <div
                      v-if="dragState.active"
                      :data-folder-drop-id="folder.id"
                      class="ms-6 mt-2 rounded-md border border-dashed px-3 py-2 text-center text-xs font-semibold transition"
                      :class="dragState.dropFolderId === folder.id
                        ? 'border-[#C75F5F] bg-red-50 text-[#A93F3F] dark:bg-red-950/30 dark:text-red-200'
                        : 'border-slate-300 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'"
                    >
                      Move to {{ folder.name }}
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
                        :dense="denseLibrary"
                        :selected="selectedSetIds.has(homeItemSetId(item))"
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
                    <div
                      v-if="rootDropIndicator('folder', folder.id) === 'after'"
                      class="pointer-events-none absolute -bottom-2 left-0 right-0 z-10 h-1.5 rounded-full bg-[#C75F5F] shadow-sm"
                      aria-hidden="true"
                    />
                  </li>
                </ul>

                <ul
                  v-if="rootItems.length > 0"
                  class="contents"
                >
                  <HomeLibraryItem
                    v-for="item in rootItems"
                    :key="itemKey(item)"
                    :item="item"
                    :to="itemTo(item)"
                    :formatted-date="formatDate(item.updatedAt ?? item.createdAt)"
                    :dense="denseLibrary"
                    :selected="selectedSetIds.has(homeItemSetId(item))"
                    root-entry
                    :order="rootEntryPosition('set', item.setId ?? item.id)"
                    :drop-indicator="rootDropIndicator('set', item.setId ?? item.id)"
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
                  v-if="dragState.active || folderDragId"
                  data-root-drop-zone
                  class="rounded-md border border-dashed px-3 py-2 text-center text-xs font-semibold transition"
                  :style="{ order: 1000000 }"
                  :class="(dragState.active && dragState.overRoot) || (folderDragId && rootDropTarget?.anchor === null)
                    ? 'border-[#C75F5F] bg-red-50 text-[#A93F3F] dark:bg-red-950/30 dark:text-red-200'
                    : 'border-slate-300 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'"
                  :aria-label="t('home.rootDropArea')"
                >
                  {{ folderDragId ? 'Move here' : 'Move outside folders' }}
                </div>
                <div v-else class="min-h-8" :style="{ order: 1000000 }" />
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
          class="min-h-[calc(100vh-30rem)] rounded-xl border border-slate-200 bg-white p-[26px] text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          aria-labelledby="home-create"
        >
          <h2 id="home-create" class="text-[22px] font-semibold">{{ t('home.create') }}</h2>
          <p class="mt-1 text-[15px] text-slate-950 dark:text-slate-100">{{ t('home.chooseMode') }}</p>

          <div class="mt-8 grid w-full gap-3">
            <NuxtLink
              to="/create/basic"
              class="group flex min-h-[70px] items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 text-left text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              <img :src="basicIcon" alt="" class="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div class="min-w-0 flex-1"><p class="text-[15px] font-medium">{{ t('home.basic') }}</p><p class="mt-1 text-[13px]">{{ t('home.basicHint') }}</p></div>
              <CreateChevron />
            </NuxtLink>

            <NuxtLink
              to="/create/synthesize"
              class="group flex min-h-[70px] items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 text-left text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              <img :src="synthesizeIcon" alt="" class="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div class="min-w-0 flex-1"><p class="text-[15px] font-medium">{{ t('home.synthesize') }}</p><p class="mt-1 text-[13px]">{{ t('home.synthesizeHint') }}</p></div>
              <CreateChevron />
            </NuxtLink>

            <NuxtLink
              to="/create/generate"
              class="group flex min-h-[70px] items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 text-left text-slate-950 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              <img :src="generateIcon" alt="" class="h-14 w-14 shrink-0 rounded-xl object-cover" />
              <div class="min-w-0 flex-1"><p class="text-[15px] font-medium">{{ t('home.generate') }}</p><p class="mt-1 text-[13px]">{{ t('home.generateHint') }}</p></div>
              <CreateChevron />
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import basicIcon from '../assets/icons/create-basic.png'
import synthesizeIcon from '../assets/icons/create-synthesize.png'
import generateIcon from '../assets/icons/create-generate.png'
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
  homeItemSetId,
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
  iconKey?: string | null
  iconTone?: string | null
  cardCount?: number
  createdAt: string
  updatedAt: string | null
}

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
const activeLibraryKind = ref<'set' | 'study-guide'>('set')
const folders = ref<SetFolder[]>([])
const homeOrder = ref<HomeOrderEntry[]>([])
const expandedFolderIds = ref(new Set<Uuid>())
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
let dragHoverFolderId: Uuid | null = null
let dragHoverTimer: number | null = null
let folderCollapsedByClickId: Uuid | null = null
let folderCollapsedByClickTimer: number | null = null

const query = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const rootItems = computed(() => {
  return items.value.filter((item) => item.kind === activeLibraryKind.value && item.folderId === null && itemMatchesQuery(item))
})

const visibleLibraryCount = computed(() =>
  items.value.filter((item) => item.kind === activeLibraryKind.value && itemMatchesQuery(item)).length
)
const denseLibrary = computed(() => visibleLibraryCount.value >= 4)

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

  const ids: Uuid[] = []
  for (const entry of rootEntries) {
    if (entry.kind === 'set' && entry.item) {
      ids.push(homeItemSetId(entry.item))
      continue
    }
    if (!folderIsOpen(entry.id)) continue
    for (const item of itemsForFolder(entry.id)) {
      ids.push(homeItemSetId(item))
    }
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
      item.kind === activeLibraryKind.value &&
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

async function loadHomeList() {
  busy.value = true
  loadError.value = null
  try {
    const db = await useTracerDb()
    const setsRepo = createSetsRepo(db)
    const guidesRepo = createStudyGuidesRepo(db)
    const foldersRepo = createFoldersRepo(db)

    const [sets, nextFolders, nextHomeOrder] = await Promise.all([
      setsRepo.list(),
      foldersRepo.list(),
      foldersRepo.listHomeOrder()
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
    homeOrder.value = nextHomeOrder
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
    iconKey: s.iconKey,
    iconTone: s.iconTone,
    cardCount: s.cardCount,
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
    await persistHomeOrder(orderedRootKeys())
    selectedFolderId.value = folder.id
    const nextExpanded = new Set(expandedFolderIds.value)
    nextExpanded.add(folder.id)
    replaceExpandedFolders(nextExpanded)
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
  if (!hasTauriRuntime()) return
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
  if (!window.confirm(`Delete “${folder.name}”? Sets inside it will stay in your library.`)) return
  loadError.value = null
  try {
    const db = await useTracerDb()
    await createFoldersRepo(db).delete(folder.id)
    folders.value = folders.value.filter((candidate) => candidate.id !== folder.id)
    items.value = items.value.map((item) => item.folderId === folder.id ? { ...item, folderId: null } : item)
    await createFoldersRepo(db).reorderHome(orderedRootKeys())
    homeOrder.value = orderedRootKeys().map((entry, sortOrder) => ({ ...entry, sortOrder }))
    if (selectedFolderId.value === folder.id) selectedFolderId.value = null
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
  const rootHit = rootHitAt(clientX, clientY)
  const rootInsertion = rootHit && (
    rootHit.key.kind === 'set' ||
    rootHit.edgeRatio <= 0.28 ||
    rootHit.edgeRatio >= 0.72
  )
  if (rootInsertion) {
    clearDragHoverTimer()
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
      scheduleFolderExpansion(folderId)
      return
    }
  }

  clearDragHoverTimer()
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
  dragState.setIds = [...selectedSetIds.value]
  selectedFolderId.value = null
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
  clearDragHoverTimer()
  dragState.active = false
  dragState.setIds = []
  dragState.dropFolderId = null
  dragState.overRoot = false
  rootDropTarget.value = null
  pointerCandidate = null
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
