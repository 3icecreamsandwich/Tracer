<template>
  <aside v-if="vertical" class="sticky top-6 flex flex-col items-center rounded-2xl border border-orange-200/80 bg-gradient-to-b from-orange-50 via-white to-amber-50 px-2 py-4 shadow-sm dark:border-orange-400/20 dark:from-orange-950/35 dark:via-slate-900 dark:to-amber-950/15" aria-label="Study streak">
    <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-xl shadow-sm shadow-orange-500/30" aria-hidden="true">🔥</span>
    <p class="mt-3 text-center text-2xl font-black leading-none text-slate-950 dark:text-white">{{ displayCurrentStreak }}</p>
    <p class="mt-1 text-center text-[9px] font-bold uppercase tracking-[0.16em] text-orange-700 dark:text-orange-300">day streak</p>
    <div class="my-4 h-px w-12 bg-orange-200 dark:bg-orange-400/20" />
    <div class="flex flex-col gap-1.5">
      <button v-for="day in displayedWeek" :key="day.key" type="button" class="group flex w-[76px] items-center justify-between rounded-lg px-1.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" :class="selected === day.key ? 'bg-orange-100 dark:bg-orange-500/15' : 'hover:bg-orange-50 dark:hover:bg-slate-800'" :aria-pressed="selected === day.key" @click="selected = day.key">
        <span class="text-[9px] font-bold uppercase text-slate-500 dark:text-slate-400">{{ weekday(day.date) }}</span>
        <span class="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold" :class="day.complete ? 'bg-orange-500 text-white' : day.today ? 'border-2 border-orange-500 bg-white text-orange-700 dark:bg-slate-900 dark:text-orange-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'">{{ day.complete ? '✓' : day.date.getDate() }}</span>
      </button>
    </div>
    <div class="mt-4 w-full border-t border-orange-100 pt-3 text-center dark:border-orange-400/15">
      <p class="text-xs font-bold text-orange-700 dark:text-orange-300">{{ todayMinutes }}/15</p>
      <div class="mx-auto mt-1.5 h-1 w-12 overflow-hidden rounded-full bg-orange-100 dark:bg-slate-950"><div class="h-full rounded-full bg-orange-500" :style="{ width: `${progressPercent}%` }" /></div>
    </div>
  </aside>
  <section v-else class="overflow-hidden rounded-2xl border border-orange-200/90 bg-white shadow-sm dark:border-orange-400/20 dark:bg-slate-900" aria-label="Study streak">
    <div class="border-b border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-white px-5 py-4 dark:border-orange-400/15 dark:from-orange-950/45 dark:via-amber-950/25 dark:to-slate-900">
      <div class="flex items-center justify-between gap-4">
        <div class="flex min-w-0 items-center gap-3">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl shadow-sm shadow-orange-500/30" aria-hidden="true">🔥</span>
          <div>
            <p class="text-sm font-bold text-slate-950 dark:text-white">Study streak</p>
            <p class="mt-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">{{ streakLabel }}</p>
          </div>
        </div>
        <span class="shrink-0 rounded-full border border-orange-200 bg-white/85 px-2.5 py-1 text-xs font-bold text-orange-700 dark:border-orange-400/20 dark:bg-slate-950/50 dark:text-orange-300">{{ todayMinutes }}/15 min</span>
      </div>
      <div class="mt-4">
        <div class="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          <span>{{ displayCompletedToday ? 'Today is complete' : 'Today’s progress' }}</span><span>{{ progressPercent }}%</span>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-orange-100/90 dark:bg-slate-950"><div class="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-[width] duration-500" :style="{ width: `${progressPercent}%` }" /></div>
      </div>
    </div>
    <div class="px-4 py-4">
      <div class="grid grid-cols-7 gap-1.5">
        <button v-for="day in displayedWeek" :key="day.key" type="button" class="group flex min-w-0 flex-col items-center rounded-xl px-1 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" :class="selected === day.key ? 'bg-orange-50 dark:bg-orange-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800'" :aria-pressed="selected === day.key" @click="selected = day.key">
          <span class="text-[10px] font-bold uppercase tracking-wide" :class="day.today ? 'text-orange-600 dark:text-orange-300' : 'text-slate-500 dark:text-slate-400'">{{ weekday(day.date) }}</span>
          <span class="mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition" :class="day.complete ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/35' : day.today ? 'border-2 border-orange-500 bg-white text-orange-700 dark:bg-slate-900 dark:text-orange-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'">{{ day.complete ? '✓' : day.date.getDate() }}</span>
          <span class="mt-1 h-1 w-4 rounded-full" :class="day.complete ? 'bg-orange-400' : day.seconds > 0 ? 'bg-amber-300 dark:bg-amber-500' : 'bg-transparent'" />
        </button>
      </div>
      <div class="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-700 dark:bg-slate-800/80 dark:text-slate-200"><span class="text-base" aria-hidden="true">{{ selectedDay.complete ? '✨' : selectedDay.today ? '⏱️' : '📚' }}</span><p>{{ selectedMessage }}</p></div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useStudyStreak } from '~/src/composables/study-streak'
const props = defineProps<{ vertical?: boolean; previewComplete?: boolean }>()
const { dailyGoalSeconds, today, completedToday, currentStreak, week } = useStudyStreak()
const selected = ref(new Date().toLocaleDateString('en-CA'))
const displayedWeek = computed(() => props.previewComplete
  ? week.value.map((day) => ({ ...day, seconds: dailyGoalSeconds, complete: true }))
  : week.value)
const displayCompletedToday = computed(() => props.previewComplete || completedToday.value)
const displayCurrentStreak = computed(() => props.previewComplete ? 7 : currentStreak.value)
const todayMinutes = computed(() => props.previewComplete ? 15 : Math.floor(today.value / 60))
const progressPercent = computed(() => props.previewComplete ? 100 : Math.min(100, Math.round((today.value / dailyGoalSeconds) * 100)))
const streakLabel = computed(() => displayCurrentStreak.value > 0 ? `${displayCurrentStreak.value}-day streak · keep it going` : 'Study 15 minutes to start your streak')
const selectedDay = computed(() => displayedWeek.value.find((item) => item.key === selected.value) ?? displayedWeek.value.at(-1)!)
const selectedMessage = computed(() => {
  const day = selectedDay.value; const minutes = Math.floor(day.seconds / 60); const remaining = Math.max(0, Math.ceil((dailyGoalSeconds - day.seconds) / 60))
  if (day.complete) return day.today ? 'Goal done for today — your streak is safe.' : `Goal completed · ${minutes} minutes studied.`
  return day.today ? `${remaining} more minutes to keep your streak.` : minutes ? `${minutes} minutes studied.` : 'No study time recorded.'
})
function weekday(date: Date) { return date.toLocaleDateString(undefined, { weekday: 'narrow' }) }
</script>
