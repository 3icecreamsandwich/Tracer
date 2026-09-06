<template>
  <main class="mx-auto max-w-[1440px] px-6 py-10 sm:px-8">
    <h1 class="text-center text-4xl font-bold tracking-tight">{{ t('public.catalog') }}</h1>
    <div class="mx-auto mt-6 max-w-4xl">
      <div class="flex gap-3">
        <label class="sr-only" for="catalog-search">{{ t('public.search') }}</label>
        <input
          id="catalog-search"
          v-model="search"
          type="search"
          :placeholder="t('public.search')"
          class="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-950"
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
          <button
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
          </button>
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
    <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <li v-for="item in items" :key="item.id">
        <NuxtLink
          :to="`/public-sets/${item.id}`"
          @pointerenter="prefetchPublishedSet(item.id)"
          @focus="prefetchPublishedSet(item.id)"
          class="flex h-56 flex-col rounded-2xl border border-slate-300 bg-white p-5 transition hover:border-orange-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:bg-slate-950"
        >
          <h2 class="line-clamp-2 text-xl font-semibold">{{ item.title }}</h2>
          <p class="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
            {{ item.description }}
          </p>
          <p class="mt-3 text-xs text-slate-500">
            {{ t('public.cards', { count: item.card_count }) }}
          </p>
          <div class="mt-auto flex items-center gap-2 pt-4">
            <span
              aria-hidden="true"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white"
              >{{ item.publisher_name.slice(0, 1).toUpperCase() }}</span
            ><span class="truncate text-sm font-semibold">{{ item.publisher_name }}</span>
          </div>
        </NuxtLink>
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
