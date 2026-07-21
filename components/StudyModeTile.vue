<template>
  <NuxtLink
    :to="to"
    :replace="replace"
    class="group flex min-h-[76px] items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 dark:bg-slate-950"
    :class="active
      ? 'border-[#C75F5F] bg-[#FFF8F8] focus-visible:ring-[#E8BDBD] active:border-[#C75F5F] active:bg-[#FFF2F3] dark:border-[#C75F5F] dark:bg-[#2A171A]'
      : 'border-transparent bg-white hover:border-[#C75F5F] hover:bg-[#FFF9F9] focus-visible:border-[#C75F5F] focus-visible:ring-[#E8BDBD] active:border-[#C75F5F] active:bg-[#FFF2F3] dark:border-transparent dark:bg-slate-950 dark:hover:border-[#C75F5F] dark:hover:bg-[#2A171A]'"
  >
    <span class="flex h-11 w-12 shrink-0 items-center justify-center" aria-hidden="true">
      <img :src="icon" alt="" class="max-h-9 max-w-11 object-contain" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-sm font-semibold text-slate-950 dark:text-white">{{ title }}</span>
      <span class="mt-1 block text-xs text-slate-700 dark:text-slate-200">{{ hint }}</span>
    </span>
    <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5 shrink-0 text-[#C75F5F] transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="m7 4 6 6-6 6" />
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
  hint: string
  active?: boolean
  replace?: boolean
  accent?: 'practice'
}>()
</script>
