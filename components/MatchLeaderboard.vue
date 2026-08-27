<template>
    <section
        v-if="assignmentId"
        class="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-left dark:border-slate-700 dark:bg-slate-950"
        aria-labelledby="assigned-match-leaderboard-title"
    >
        <div class="flex items-center justify-between gap-3">
            <div>
                <h3
                    id="assigned-match-leaderboard-title"
                    class="text-sm font-semibold text-slate-950 dark:text-white"
                >
                    {{ t("matchLeaderboard.title") }}
                </h3>
                <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {{ t("matchLeaderboard.description") }}
                </p>
            </div>
            <span class="text-lg" aria-hidden="true">🏆</span>
        </div>

        <p
            v-if="loading"
            class="mt-4 text-sm text-slate-500 dark:text-slate-400"
            role="status"
        >
            {{ t("matchLeaderboard.loading") }}
        </p>
        <div
            v-else-if="error"
            class="mt-4 flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-900"
        >
            <p class="text-xs text-slate-600 dark:text-slate-300">
                {{ t("matchLeaderboard.unavailable") }}
            </p>
            <button
                type="button"
                class="text-xs font-semibold text-orange-700 hover:text-orange-600 dark:text-orange-300"
                @click="$emit('retry')"
            >
                {{ t("common.retry") }}
            </button>
        </div>
        <p
            v-else-if="entries.length === 0"
            class="mt-4 text-sm text-slate-500 dark:text-slate-400"
        >
            {{ t("matchLeaderboard.empty") }}
        </p>

        <ol v-else class="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            <li
                v-for="entry in entries.slice(0, 6)"
                :key="entry.studentId"
                class="flex items-center gap-3 py-2.5"
            >
                <span class="w-5 text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {{ entry.rank }}
                </span>
                <img
                    v-if="avatarSource(entry.avatarPath)"
                    :src="avatarSource(entry.avatarPath)!"
                    alt=""
                    class="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <span
                    v-else
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-800 dark:bg-orange-950/60 dark:text-orange-200"
                    aria-hidden="true"
                >
                    {{ initials(entry.displayName) }}
                </span>
                <span class="min-w-0 flex-1 truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {{ entry.displayName }}
                </span>
                <span class="shrink-0 font-mono text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                    {{ formatMatchTime(entry.durationMs) }}
                </span>
            </li>
        </ol>
    </section>
</template>

<script setup lang="ts">
import type { AssignedMatchLeaderboardEntry } from "~/src/composables/classrooms"
import { useAppLanguage } from "~/src/composables/language"
import { formatMatchTime } from "~/src/composables/match/timer"

defineProps<{
    assignmentId: string | null
    entries: AssignedMatchLeaderboardEntry[]
    loading: boolean
    error: boolean
}>()

defineEmits<{ retry: [] }>()

const { t } = useAppLanguage()

function initials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return "?"
    return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("")
}

function avatarSource(path: string | null) {
    if (!path) return null
    return /^(https:\/\/|data:image\/)/i.test(path) ? path : null
}
</script>
