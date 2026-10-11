<template>
  <NuxtLink
    :to="to"
    class="group flex min-h-[72px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-950 shadow-sm transition hover:border-orange-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:border-orange-700"
  >
    <span
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
      :class="
        icon === 'publish'
          ? 'bg-orange-200 text-orange-600 dark:bg-orange-800 dark:text-orange-200'
          : 'bg-indigo-200 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-200'
      "
      ><AppIcon :name="icon" :size="28"
    /></span>
    <span class="min-w-0 flex-1 text-[15px] font-medium leading-tight">{{ title }}</span>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{ to: string; title: string; icon: 'publish' | 'dashboard' }>()
</script>
