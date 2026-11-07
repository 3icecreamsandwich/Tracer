<template>
  <main class="tracer-page mx-auto max-w-6xl px-6 py-8">
    <h1 class="text-center text-4xl font-bold tracking-tight">{{ t('public.catalog') }}</h1>
    <div class="mx-auto mt-6 max-w-4xl">
      <div class="flex gap-3">
        <label class="sr-only" for="catalog-search">{{ t('public.search') }}</label>
        <UInput
          id="catalog-search"
          v-model="search"
          type="search"
          :placeholder="t('public.search')"
          class="w-full min-w-0 flex-1"
        />
        <AppButton
          variant="white"
          :aria-label="t('public.filters')"
          :aria-expanded="filtersOpen"
          aria-controls="catalog-filters"
          @click="filtersOpen = !filtersOpen"
          ><AppIcon name="filter" /><span v-if="tags.length">{{ tags.length }}</span></AppButton
        >
      </div>
      <fieldset v-if="filtersOpen" id="catalog-filters" class="mt-4">
        <legend class="mb-2 text-sm text-slate-500">{{ t('public.filterHint') }}</legend>
        <div class="flex flex-wrap gap-2">
          <UButton color="primary" variant="soft"
            v-for="tag in PUBLIC_SET_TAGS"
            :key="tag"
            type="button"
            :aria-pressed="tags.includes(tag)"
            class="rounded-full border bg-white px-4 py-2 text-sm text-slate-950 focus-visible:ring-2 focus-visible:ring-orange-500"
            :class="
              tags.includes(tag) ? 'border-orange-500 ring-2 ring-orange-500' : 'border-slate-300'
            "
            @click="toggle(tag)"
          >
            {{ t(`public.tag.${tag}`) }}
          </UButton>
          <AppButton v-if="tags.length" variant="white" @click="tags = []">{{
            t('public.clear')
          }}</AppButton>
        </div>
      </fieldset>
    </div>
    <p
      v-if="!busy && !error && !items.length"
      role="status"
      class="py-20 text-center text-slate-500"
    >
      {{ t(search || tags.length ? 'public.noResults' : 'public.empty') }}
    </p>
    <div v-if="!search.trim() && !tags.length" class="mt-8 space-y-8">
      <section v-for="section in popularSections" :key="section.tag" :aria-label="t(`public.tag.${section.tag}`)">
        <h2 class="text-xl font-semibold">{{ t(`public.tag.${section.tag}`) }}</h2>
        <ul class="mt-3 flex gap-4 overflow-x-auto pb-3">
          <li v-for="item in section.items" :key="item.id" class="w-64 shrink-0" @pointerenter="prefetchPublishedSet(item.id)" @focusin="prefetchPublishedSet(item.id)">
            <LibraryCard kind="set" :title="item.title" :description="item.description" :author="item.publisher_name" :to="`/public-sets/${item.id}`" />
          </li>
        </ul>
      </section>
      <h2 v-if="popularSections.length" class="text-xl font-semibold">More sets</h2>
    </div>
    <ul class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <li v-for="item in remainingItems" :key="item.id" @pointerenter="prefetchPublishedSet(item.id)" @focusin="prefetchPublishedSet(item.id)">
        <LibraryCard kind="set" :title="item.title" :description="item.description" :author="item.publisher_name" :to="`/public-sets/${item.id}`" />
      </li>
    </ul>
    <div ref="sentinel" class="flex min-h-24 flex-col items-center justify-center gap-3 py-6">
      <LoadingSpinner v-if="busy" />
      <p v-if="error" role="alert" class="text-sm text-red-600 dark:text-red-300">
        {{ t('public.loadFailed') }}
      </p>
      <AppButton v-if="error || (hasMore && !busy)" variant="white" @click="loadMore">{{
        t(error ? 'common.retry' : 'public.loadMore')
      }}</AppButton>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useAppLanguage } from '~/src/composables/language'
import {
  PUBLIC_SET_TAGS,
  listPublishedSets,
  listPopularPublishedSets,
  type PopularPublishedSet,
  prefetchPublishedSet,
  type PublishedSetSummary,
  type PublicSetTag,
} from '~/src/composables/published-sets'
const { t } = useAppLanguage()
const search = ref(''),
  tags = ref<PublicSetTag[]>([]),
  filtersOpen = ref(false)
const items = ref<PublishedSetSummary[]>([]),
  busy = ref(false),
  error = ref(false),
  hasMore = ref(true)
const popular = ref<PopularPublishedSet[]>([])
const popularSections = computed(() => {
  const groups = new Map<PublicSetTag, PopularPublishedSet[]>()
  for (const item of popular.value) groups.set(item.topic, [...(groups.get(item.topic) ?? []), item])
  return [...groups].map(([tag, items]) => ({ tag, items }))
})
const remainingItems = computed(() => {
  if (search.value.trim() || tags.value.length) return items.value
  const featured = new Set(popular.value.map(item => item.id))
  return items.value.filter(item => !featured.has(item.id))
})
const sentinel = ref<HTMLElement | null>(null)
let generation = 0,
  timer: ReturnType<typeof setTimeout> | undefined,
  observer: IntersectionObserver | undefined
function toggle(tag: PublicSetTag) {
  tags.value = tags.value.includes(tag) ? tags.value.filter((t) => t !== tag) : [...tags.value, tag]
}
async function loadMore() {
  if (busy.value || !hasMore.value) return
  const request = generation
  busy.value = true
  error.value = false
  try {
    const page = await listPublishedSets(search.value, tags.value, items.value.at(-1))
    if (request !== generation) return
    items.value.push(...page.items)
    hasMore.value = page.hasMore
  } catch {
    if (request === generation) error.value = true
  } finally {
    if (request === generation) {
      busy.value = false
      await nextTick()
      if (
        !error.value &&
        hasMore.value &&
        sentinel.value &&
        sentinel.value.getBoundingClientRect().top < window.innerHeight + 500
      )
        void loadMore()
    }
  }
}
watch([search, tags], () => {
  generation++
  clearTimeout(timer)
  busy.value = true
  error.value = false
  items.value = []
  hasMore.value = true
  timer = setTimeout(() => {
    busy.value = false
    void loadMore()
  }, 300)
})
onMounted(() => {
  void listPopularPublishedSets().then(rows => { popular.value = rows }).catch(() => {})
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting) && !error.value) void loadMore()
    },
    { rootMargin: '500px' },
  )
  if (sentinel.value) observer.observe(sentinel.value)
  void loadMore()
})
onBeforeUnmount(() => {
  generation++
  clearTimeout(timer)
  observer?.disconnect()
})
</script>
