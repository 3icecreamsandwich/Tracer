<template>
  <div
    class="study-mode-tile group flex min-h-[60px] items-stretch overflow-hidden rounded-xl border text-left shadow-sm transition hover:bg-slate-50 hover:shadow-md dark:hover:bg-slate-900"
    :class="active
      ? 'border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900'
      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'"
  >
    <NuxtLink
      :to="to"
      :replace="replace"
      class="flex min-w-0 flex-1 items-center gap-1 px-1.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
    >
      <span class="flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden="true">
        <img :src="icon" alt="" class="max-h-5 max-w-6 object-contain" />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block truncate text-xs font-semibold text-slate-950 dark:text-white">{{ title }}</span>
        <span class="mt-0.5 block truncate text-[10px] text-slate-600 dark:text-slate-300">{{ hint }}</span>
      </span>
      <svg
        v-if="showCaret"
        aria-hidden="true"
        viewBox="0 0 20 20"
        class="h-3.5 w-3.5 shrink-0 text-slate-500 transition group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path d="m7 4 6 6-6 6" />
      </svg>
    </NuxtLink>

    <NuxtLink
      v-if="fullscreenTo"
      :to="fullscreenTo"
      class="inline-flex w-6 shrink-0 items-center justify-center border-l border-slate-200 text-xs text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      :aria-label="`Open ${title} fullscreen`"
      :title="`Open ${title} fullscreen`"
    >
      ⛶
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
  hint: string
  active?: boolean
  replace?: boolean
  fullscreenTo?: string
  showCaret?: boolean
}>()
</script>

<style scoped>
.study-mode-tile {
  flex: 0 0 calc(20% - 0.6rem);
  min-width: 9.25rem;
}
</style>
