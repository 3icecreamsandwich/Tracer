<template>
  <section class="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5 shadow-sm dark:border-orange-500/30 dark:from-orange-950/30 dark:to-amber-950/20" aria-label="Study streak">
    <div class="flex items-start justify-between gap-3">
      <div><p class="text-sm font-semibold text-orange-950 dark:text-orange-100">Study streak</p><p class="mt-1 text-sm text-orange-800 dark:text-orange-200">{{ currentStreak }} day{{ currentStreak === 1 ? '' : 's' }} · 15 min a day</p></div>
      <span class="rounded-full bg-white px-2.5 py-1 text-lg shadow-sm dark:bg-slate-900" aria-hidden="true">🔥</span>
    </div>
    <div class="mt-5 grid grid-cols-7 gap-1.5">
      <button v-for="day in week" :key="day.key" type="button" class="group flex min-w-0 flex-col items-center gap-1 rounded-lg p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" :class="selected === day.key ? 'bg-white/90 shadow-sm dark:bg-slate-900' : 'hover:bg-white/60 dark:hover:bg-slate-900/50'" @click="selected = day.key">
        <span class="text-[10px] font-semibold uppercase text-orange-800 dark:text-orange-200">{{ day.date.toLocaleDateString(undefined, { weekday: 'narrow' }) }}</span>
        <span class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" :class="day.complete ? 'bg-orange-500 text-white' : day.today ? 'border-2 border-orange-500 text-orange-900 dark:text-orange-100' : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'">{{ day.complete ? '✓' : day.date.getDate() }}</span>
      </button>
    </div>
    <p class="mt-4 text-xs text-orange-900 dark:text-orange-100">{{ selectedMessage }}</p>
  </section>
</template>
<script setup lang="ts">
const { dailyGoalSeconds, today, currentStreak, week } = useStudyStreak()
const selected = ref(new Date().toLocaleDateString('en-CA'))
const selectedMessage = computed(() => {
  const day = week.value.find((item) => item.key === selected.value) ?? week.value.at(-1)!
  const minutes = Math.floor(day.seconds / 60); const remaining = Math.max(0, Math.ceil((dailyGoalSeconds - day.seconds) / 60))
  if (day.complete) return `${day.today ? 'Today is complete — nice work!' : 'Goal completed.'} ${minutes} minutes studied.`
  return day.today ? `${minutes} minutes today — ${remaining} more to keep your streak.` : `${minutes} minutes studied.`
})
</script>
