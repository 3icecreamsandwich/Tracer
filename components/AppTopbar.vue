<template>
  <header
    class="app-topbar sticky top-0 z-40 bg-white/95 backdrop-blur dark:bg-slate-950/90"
    :class="windowControlsClass"
    @pointerdown="onTopbarPointerDown"
  >
    <div
      class="mx-auto flex h-[60px] w-full sm:w-[87.5%] max-w-[1400px] items-center gap-2 sm:gap-5 px-3 sm:px-7"
    >
      <div
        class="native-window-controls-spacer native-window-controls-spacer-left"
        aria-hidden="true"
      />

      <NuxtLink
        to="/"
        :aria-label="t('nav.home')"
        class="inline-flex shrink-0 items-center mx-2 gap-3 rounded-[var(--tracer-radius-control)] text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-white"
      >
        <Home aria-hidden="true" class="h-7 w-7 sm:hidden" />
        <Home
          aria-hidden="true"
          class="hidden sm:inline h-6 w-6 text-slate-950 dark:text-white"
          stroke-width="2.5"
        />
      </NuxtLink>

      <div
        ref="searchRootEl"
        class="relative mx-auto min-w-0 max-w-[1040px] flex-1"
      >
        <label class="sr-only" for="nav-search">{{ t("nav.search") }}</label>
        <form class="relative" @submit.prevent="onSubmit">
          <UInput
            id="nav-search"
            ref="searchInputEl"
            v-model="draft"
            type="search"
            autocomplete="off"
            :placeholder="t('nav.searchPlaceholder')"
            class="w-full"
            @focus="openSearch"
            @click="openSearch"
            @keydown.esc.prevent="onSearchEscape"
          />
        </form>

        <button v-if="searchOpen" type="button" class="mobile-search-close" aria-label="Close search" @click="closeSearch">←</button>
        <div
          v-if="searchOpen"
          class="search-results absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
          role="region"
          :aria-label="t('nav.searchResults')"
        >
          <div
            v-if="searchBusy"
            class="px-3 py-3 text-sm text-slate-600 dark:text-slate-300"
          >
            <LoadingSpinner size="sm" />
          </div>
          <div
            v-else-if="searchError"
            class="px-3 py-3 text-sm text-red-700 dark:text-red-300"
          >
            {{ searchError }}
          </div>
          <ul
            v-else-if="searchResults.length > 0"
            class="max-h-80 overflow-auto py-1"
          >
            <li v-for="item in searchResults" :key="searchItemKey(item)">
              <NuxtLink
                :to="topbarSearchItemTo(item)"
                class="flex items-center justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500"
                @click="selectSearchResult"
              >
                <span class="min-w-0">
                  <span
                    class="block truncate font-medium text-slate-900 dark:text-slate-50"
                  >
                    {{ searchResultTitle(item) }}
                  </span>
                </span>
                <span
                  class="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400"
                >
                  {{ searchResultKindLabel(item) }}
                </span>
              </NuxtLink>
            </li>
          </ul>
          <div
            v-else
            class="px-3 py-3 text-sm text-slate-600 dark:text-slate-300"
          >
            {{ t("nav.noResults") }}
          </div>
        </div>
      </div>

      <NuxtLink
        to="/settings"
        :aria-label="t('nav.settings')"
        class="inline-flex h-10 shrink-0 items-center gap-2.5 rounded-[var(--tracer-radius-control)] border border-slate-200 bg-white px-3 text-[15px] font-medium text-slate-950 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
      >
        <span
          class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-[13px] font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
        >
          <LoadingSpinner v-if="!avatarText" size="sm" :show-label="false" />
          <template v-else>{{ avatarText }}</template>
        </span>
        <span class="hidden sm:block">{{ t("nav.settings") }}</span>
      </NuxtLink>

      <NuxtLink
        v-if="updateStatus === 'downloading' || updateStatus === 'ready'"
        to="/settings#app-updates"
        class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--tracer-radius-control)] text-orange-600 hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:bg-orange-950/40"
        :title="updateIndicatorLabel"
        :aria-label="updateIndicatorLabel"
      >
        <Download
          v-if="updateStatus === 'downloading'"
          :size="20"
          class="motion-safe:animate-pulse"
          aria-hidden="true"
        />
        <RotateCw v-else :size="20" aria-hidden="true" />
      </NuxtLink>

      <div
        class="native-window-controls-spacer native-window-controls-spacer-right"
        aria-hidden="true"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { isWebPreviewRuntime } from "~/src/composables/platform/web"
import {
  createSetsRepo,
  createStudyGuidesRepo,
  useTracerDb,
  type FlashcardSetListItem,
  type Uuid,
} from "~/src/composables/db"
import { loadAppProfileOnce } from "~/src/composables/app-profile-cache"
import { hasTauriRuntime } from "~/src/composables/tauri"
import { getCurrentWindow } from "@tauri-apps/api/window"
import {
  createWebPreviewSearchItems,
  filterTopbarSearchItems,
  topbarSearchItemTo,
  type TopbarSearchItem,
} from "~/src/composables/search/topbar-search"
import { useAppLanguage } from "~/src/composables/language"
import Home from "@lucide/vue/dist/esm/icons/house.mjs"
import Download from "@lucide/vue/dist/esm/icons/download.mjs"
import RotateCw from "@lucide/vue/dist/esm/icons/rotate-cw.mjs"
import { useAppUpdates } from "../src/composables/app-updates"

const { status: updateStatus, downloadPercent: updateDownloadPercent } =
  useAppUpdates()

const updateIndicatorLabel = computed(() => {
  if (updateStatus.value === "ready") {
    return "Update downloaded: open Settings"
  }

  return updateDownloadPercent.value === null
    ? "Downloading updated"
    : `Downloading update: ${updateDownloadPercent.value}%`
})

const { language, t } = useAppLanguage()

const router = useRouter()
const route = useRoute()
let searchReturnPath = "/library"
const draft = ref("")
const searchRootEl = ref<HTMLElement | null>(null)
const searchInputEl = ref<{ inputRef: HTMLInputElement } | null>(null)
const searchOpen = ref(false)
const searchBusy = ref(false)
const searchError = ref<string | null>(null)
const searchItems = ref<TopbarSearchItem[]>([])
const avatarText = ref("")
const windowControlsClass = ref("")
let searchLoaded = false

const searchResults = computed(() =>
  filterTopbarSearchItems(searchItems.value, draft.value),
)

watch(draft, () => {
  openSearch()
})

watch(language, () => {
  invalidateSearchItems()
})

function searchItemKey(item: TopbarSearchItem) {
  return `${item.kind}:${item.id}`
}

function searchResultKindLabel(item: TopbarSearchItem) {
  return item.kind === "set" ? t("home.setKind") : t("home.studyGuide")
}

function searchResultTitle(item: TopbarSearchItem) {
  if (item.kind === "set") return item.title
  if (item.title.startsWith(`${t("home.studyGuide")} `)) return item.title
  const separator = " · "
  const setTitle = item.title.includes(separator)
    ? item.title.slice(item.title.indexOf(separator) + separator.length)
    : item.title
  return `${t("home.studyGuide")}${separator}${setTitle}`
}

function detectWindowControlsClass() {
  if (!hasTauriRuntime() || typeof navigator === "undefined") return ""

  const platform = navigator.platform.toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()

  if (platform.includes("mac") || userAgent.includes("mac os")) {
    return "app-topbar--macos"
  }

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "app-topbar--windows"
  }

  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "app-topbar--linux"
  }

  return ""
}

function toSetSearchItem(s: FlashcardSetListItem): TopbarSearchItem {
  return {
    kind: "set",
    kindLabel: "Set",
    id: s.id,
    title: s.title,
    description: s.description,
    subtitle: s.description,
  }
}

async function loadSearchItems() {
  if (searchLoaded || searchBusy.value) return
  searchBusy.value = true
  searchError.value = null
  try {
    if (isWebPreviewRuntime()) {
      searchItems.value = createWebPreviewSearchItems(t)
      searchLoaded = true
      return
    }

    const db = await useTracerDb()
    const setsRepo = createSetsRepo(db)
    const guidesRepo = createStudyGuidesRepo(db)
    const [sets, guides] = await Promise.all([
      setsRepo.list(),
      guidesRepo.listSummaries(),
    ])
    const next: TopbarSearchItem[] = []

    const setTitleById = new Map<Uuid, string>()
    for (const set of sets) setTitleById.set(set.id, set.title)

    const guideBySetId = new Map(guides.map((guide) => [guide.setId, guide]))
    for (const set of sets) {
      next.push(toSetSearchItem(set))
      const guide = guideBySetId.get(set.id)
      if (guide) {
        next.push({
          kind: "study-guide",
          kindLabel: "Study guide",
          id: guide.id,
          setId: guide.setId,
          title: `Study guide · ${setTitleById.get(guide.setId) ?? "Untitled set"}`,
          description: null,
          subtitle: null,
        })
      }
    }

    searchItems.value = next
    searchLoaded = true
  } catch {
    searchError.value = "Failed to load search results."
  } finally {
    searchBusy.value = false
  }
}

function openSearch() {
  if (import.meta.client && window.matchMedia('(max-width: 767px)').matches && route.path !== '/search') { searchReturnPath = route.fullPath; void router.push('/search') }
  searchOpen.value = true
  loadSearchItems()
}

function closeSearch() {
  searchOpen.value = false
  if (route.path === '/search') void router.push(searchReturnPath)
}

function invalidateSearchItems() {
  searchLoaded = false
  searchItems.value = []
}

function selectSearchResult() {
  searchOpen.value = false
}

function onSubmit() {
  const firstResult = searchResults.value[0]
  if (!searchBusy.value && !searchError.value && firstResult) {
    searchOpen.value = false
    searchInputEl.value?.inputRef?.blur()
    void router.push(topbarSearchItemTo(firstResult))
    return
  }
  openSearch()
}

function onSearchEscape() {
  closeSearch()
  searchInputEl.value?.inputRef?.blur()
}

function focusSearch() {
  searchInputEl.value?.inputRef?.focus()
  searchInputEl.value?.inputRef?.select()
  openSearch()
}

function onDocumentPointerDown(event: PointerEvent) {
  const root = searchRootEl.value
  if (!root || route.path === '/search') return
  const target = event.target
  if (target instanceof Node && root.contains(target)) return
  closeSearch()
}

function onTopbarPointerDown(event: PointerEvent) {
  if (!hasTauriRuntime() || event.button !== 0) return

  const target = event.target
  if (!(target instanceof Element)) return
  if (
    target.closest(
      'a, button, input, textarea, select, form, label, [role], [contenteditable="true"]',
    )
  ) {
    return
  }

  event.preventDefault()
  void getCurrentWindow().startDragging()
}

async function loadAvatarText() {
  if (isWebPreviewRuntime()) {
    avatarText.value = "W"
    return
  }

  try {
    const profile = await loadAppProfileOnce()
    const first = profile?.name?.trim()?.[0]
    avatarText.value = first ? first.toUpperCase() : "U"
  } catch {
    avatarText.value = "U"
  }
}

watch(() => route.path, (path) => {
  if (path === '/search') { searchOpen.value = true; void loadSearchItems(); void nextTick(() => searchInputEl.value?.inputRef?.focus()) }
  else searchOpen.value = false
})
onMounted(() => {
  if (route.path === '/search') { searchOpen.value = true; void loadSearchItems(); void nextTick(() => searchInputEl.value?.inputRef?.focus()) }
  windowControlsClass.value = detectWindowControlsClass()
  document.addEventListener("pointerdown", onDocumentPointerDown)
  window.addEventListener("tracer:search-items-changed", invalidateSearchItems)
  window.addEventListener("tracer:focus-search", focusSearch)
  void loadAvatarText()
})

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocumentPointerDown)
  window.removeEventListener(
    "tracer:search-items-changed",
    invalidateSearchItems,
  )
  window.removeEventListener("tracer:focus-search", focusSearch)
})
</script>

<style scoped>
.native-window-controls-spacer {
  flex: 0 0 0;
  align-self: stretch;
}

.app-topbar--macos .native-window-controls-spacer-left {
  flex-basis: 20px;
}

.app-topbar--windows .native-window-controls-spacer-right {
  flex-basis: 30px;
}

.app-topbar--linux .native-window-controls-spacer-right {
  flex-basis: 20px;
}
</style>

<style scoped>
.mobile-search-close { display:none; }
@media (max-width: 767px) {
 .app-topbar:has(.search-results) { position:fixed; inset:0; height:100dvh; background:var(--ui-bg); }
 .app-topbar:has(.search-results) > div { align-items:flex-start; padding-top:16px; }
 .app-topbar:has(.search-results) > div > a, .app-topbar:has(.search-results) .native-window-controls-spacer { display:none; }
 .app-topbar:has(.search-results) .relative.mx-auto { padding-left:44px; }
 .mobile-search-close { display:block; position:absolute; left:0; top:2px; width:36px; height:36px; font-size:24px; }
 .search-results { position:fixed; top:64px; bottom:0; left:0; right:0; margin:0; border:0; border-radius:0; box-shadow:none; }
 .search-results ul { max-height:calc(100dvh - 64px); }
}
</style>
