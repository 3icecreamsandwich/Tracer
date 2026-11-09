<template>
    <div
        class="study-mode-tile group flex min-h-[56px] items-stretch overflow-hidden rounded-xl border text-left transition hover:shadow-md"
        :class="
            active
                ? 'bg-slate-200/70 dark:bg-slate-800'
                : 'border-transparent bg-slate-100/70 hover:bg-slate-200/70 dark:border-transparent dark:bg-slate-900 dark:hover:bg-slate-800'
        "
        :style="active ? { borderColor: studyModeOutlineColor(artworkName), boxShadow: `inset 0 0 0 2px ${studyModeOutlineColor(artworkName)}` } : undefined"
    >
        <NuxtLink
            :to="to"
            :replace="replace"
            :aria-label="title"
            :aria-current="active ? 'page' : undefined"
            :title="title"
            :class="{ '!pr-0': showCaret }"
            class="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400"
        >
            <StudyModeArtwork :name="artworkName" :size="20" />
            <span
                class="block truncate text-sm ml-1 font-semibold text-slate-950 dark:text-white"
                >{{ title }}</span
            >
            <svg
                v-if="showCaret"
                aria-hidden="true"
                viewBox="0 0 20 20"
                class="ml-auto h-5 w-6 shrink-0 text-slate-500 transition group-hover:translate-x-0.5"
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
            class="inline-flex w-6 shrink-0 items-center justify-center  text-xs text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            :aria-label="`Open ${title} fullscreen`"
            :title="`Open ${title} fullscreen`"
        >
            <AppIcon name="fullscreen" :size="15" :stroke-width="1.7" />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { studyModeOutlineColor } from "~/src/composables/study-mode-colors"
const props = defineProps<{
    to: string;
    icon: string;
    title: string;
    active?: boolean;
    replace?: boolean;
    fullscreenTo?: string;
    showCaret?: boolean;
}>();
const artworkName = computed(() => props.icon.includes('practice') ? 'practice' : props.icon.includes('chat') ? 'chat' : props.icon.includes('match') ? 'match' : props.icon.includes('study-guide') ? 'guide' : 'cards')
</script>

<style scoped>
.study-mode-tile {
    flex: 1 0 auto;
    min-width: 10.5rem;
}
</style>
