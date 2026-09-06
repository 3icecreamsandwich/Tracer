<template>
  <NuxtLink
    :to="to"
    class="group flex min-h-[76px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-950 shadow-sm transition hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:border-orange-700"
  >
    <span
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
      :class="
        icon === 'publish'
          ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400'
          : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300'
      "
      ><AppIcon :name="icon"
    /></span>
    <span class="min-w-0 flex-1"
      ><span class="block text-[15px] font-semibold">{{ title }}</span
      ><span class="mt-1 block text-[13px] text-slate-500 dark:text-slate-400">{{
        description
      }}</span></span
    >
    <CreateChevron class="transition-transform group-hover:translate-x-0.5" />
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{ to: string; title: string; description: string; icon: 'publish' | 'dashboard' }>()
</script>
