<template>
  <main class="min-h-[calc(100vh-4rem)] bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <div class="tracer-page mx-auto max-w-[1180px] px-4 py-8 sm:px-8 sm:py-10">
      <header class="flex flex-wrap items-end justify-between gap-4">
        <div><h1 class="text-4xl font-semibold">Insights</h1></div>
        <AppButton variant="white" to="/library">Back to library</AppButton>
      </header>
      <p v-if="error" class="mt-6 rounded-[var(--tracer-radius-control)] border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300" role="alert">{{ error }} <UButton color="primary" variant="soft" class="underline" @click="load">Retry</UButton></p>
      <LoadingSpinner v-if="loading" screen />
      <template v-else>
        <section class="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-end sm:gap-4" aria-label="Insight filters">
          <label class="grid min-w-0 gap-1 text-sm font-medium">Topic (folder)
            <TracerSelect v-model="folderId" class="w-full sm:min-w-48 rounded-[var(--tracer-radius-control)] border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"><option value="">All topics</option><option v-for="folder in folders" :key="folder.id" :value="folder.id">{{ folder.name }}</option></TracerSelect>
          </label>
          <label class="grid min-w-0 gap-1 text-sm font-medium">Set
            <TracerSelect v-model="setId" class="w-full sm:min-w-48 rounded-[var(--tracer-radius-control)] border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"><option value="">All sets</option><option v-for="set in filteredSets" :key="set.id" :value="set.id">{{ set.title }}</option></TracerSelect>
          </label>

        </section>
        <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="metric in metrics" :key="metric.label" class="rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900"><p class="text-sm text-slate-500 dark:text-slate-400">{{ metric.label }}</p><p class="mt-2 text-3xl font-semibold">{{ metric.value }}</p></article>
        </div>
        <div class="mt-7 grid gap-6 lg:grid-cols-2">
          <section class="rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="time-title">
            <h2 id="time-title" class="text-xl font-semibold">Study time · last 7 days</h2>

            <div class="mt-6 flex h-44 items-end gap-2" role="img" :aria-label="timeDescription"><div v-for="day in days" :key="day.key" class="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><span class="text-xs">{{ day.minutes }}</span><div class="w-full max-w-12 rounded-t bg-[#C75F5F]" :style="{ height: `${Math.max(day.minutes ? 5 : 1, day.minutes / maxMinutes * 120)}px` }"/><span class="text-xs text-slate-500">{{ day.label }}</span></div></div>
          </section>
          <section class="rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="accuracy-title">
            <h2 id="accuracy-title" class="text-xl font-semibold">Accuracy · last 7 days</h2>

            <div class="mt-6 flex h-44 items-end gap-2" role="img" :aria-label="accuracyDescription"><div v-for="day in days" :key="day.key" class="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"><span class="text-xs">{{ day.attempted ? `${day.accuracy}%` : '—' }}</span><div class="w-full max-w-12 rounded-t bg-slate-700 dark:bg-slate-300" :style="{ height: `${day.attempted ? Math.max(5, day.accuracy / 100 * 120) : 1}px` }"/><span class="text-xs text-slate-500">{{ day.label }}</span></div></div>
          </section>
        </div>
        <section class="mt-7 rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="tips-title">
          <div class="flex flex-wrap items-center justify-between gap-3"><div><h2 id="tips-title" class="text-xl font-semibold">Study suggestions</h2></div><AppButton variant="white" :disabled="tipsBusy" @click="refreshTips(true)">{{ tipsBusy ? 'Generating…' : 'Refresh tips' }}</AppButton></div>
          <p v-if="tipsError" class="mt-3 text-sm text-amber-700 dark:text-amber-300">{{ tipsError }}</p>
          <p v-else-if="tipsStatus" class="mt-3 text-sm text-slate-500 dark:text-slate-400" role="status">{{ tipsStatus }}</p>
          <ul class="mt-5 grid gap-3 sm:grid-cols-2"><li v-for="tip in tips" :key="tip" class="rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed dark:border-slate-800 dark:bg-slate-900">{{ tip }}</li></ul>
          <p v-if="!selected.length" class="mt-4 text-sm text-slate-500">No recorded sessions for this selection yet. Study time and accuracy will appear after a session.</p>
        </section>
        <section v-if="recentSessions.length" class="mt-7 rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="recent-insights-title">
          <h2 id="recent-insights-title" class="text-xl font-semibold">Recent study</h2>
          <ul class="mt-3 divide-y divide-slate-200 dark:divide-slate-800">
            <li v-for="session in recentSessions" :key="session.id" class="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
              <div><NuxtLink v-if="sets.some(set => set.id === session.setId)" :to="`/set/${session.setId}`" class="font-medium hover:underline">{{ setTitle(session.setId) }}</NuxtLink><p v-else class="font-medium">{{ setTitle(session.setId) }}</p><p class="mt-1 capitalize text-slate-500 dark:text-slate-400">{{ session.mode === 'practice' ? 'Learn' : session.mode }} · {{ formatDate(session.endedAt) }}</p></div>
              <div class="text-right"><p class="font-semibold">{{ session.attempted ? `${Math.round(session.correct / session.attempted * 100)}% accuracy` : 'Unrated session' }}</p><p class="mt-1 text-slate-500 dark:text-slate-400">{{ formatDuration(session.durationSeconds) }}</p></div>
            </li>
          </ul>
        </section>
      </template>
    </div>
  </main>
</template>
<script setup lang="ts">
import { createFoldersRepo, createProfileRepo, createSetsRepo, createSettingsRepo, useTracerDb, type FlashcardSetListItem, type SetFolder } from '~/src/composables/db'
import { listStudySessions, type StudySession } from '~/src/composables/study-insights'
import { useStudyStreak } from '~/src/composables/study-streak'
const streak = useStudyStreak()
const loading = ref(true), error = ref(''), folderId = ref(''), setId = ref(''), tipsBusy = ref(false), tipsError = ref(''), tipsStatus = ref('')
const folders = ref<SetFolder[]>([]), sets = ref<FlashcardSetListItem[]>([]), sessions = ref<StudySession[]>([]), tips = ref<string[]>([])
const tipsOwner = ref('guest')
const filteredSets = computed(() => sets.value.filter(s => !folderId.value || s.folderId === folderId.value))
watch(folderId, () => { if (!filteredSets.value.some(s => s.id === setId.value)) setId.value = '' })
const selected = computed(() => sessions.value.filter(s => (!setId.value || s.setId === setId.value) && (!folderId.value || sets.value.some(set => set.id === s.setId && set.folderId === folderId.value))))
const recentSessions = computed(() => selected.value.slice(0, 5))
function setTitle(id: string) { return sets.value.find(set => set.id === id)?.title || 'Set no longer in library' }
function formatDate(value: string) { return new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) }
function formatDuration(seconds: number) { return seconds < 60 ? `${seconds} sec` : `${Math.round(seconds / 60)} min` }
const total = computed(() => {
  const result = selected.value.reduce((a, s) => ({ seconds: a.seconds + s.durationSeconds, correct: a.correct + s.correct, attempted: a.attempted + s.attempted }), { seconds: 0, correct: 0, attempted: 0 })
  if (!setId.value && !folderId.value) result.seconds = Object.values(streak.days.value).reduce((sum, seconds) => sum + seconds, 0)
  return result
})
const metrics = computed(() => [
  { label: 'Accuracy', value: total.value.attempted ? `${Math.round(total.value.correct / total.value.attempted * 100)}%` : '—' },
  { label: 'Study time', value: total.value.seconds >= 3600 ? `${(total.value.seconds / 3600).toFixed(1)} h` : formatDuration(total.value.seconds) },
  { label: 'Sessions', value: String(selected.value.length) },
  { label: 'Questions answered', value: String(total.value.attempted) },
])
const days = computed(() => Array.from({ length: 7 }, (_, index) => {
  const date = new Date(); date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - (6 - index))
  const next = new Date(date); next.setDate(next.getDate() + 1)
  const rows = selected.value.filter(s => { const time = new Date(s.endedAt).getTime(); return time >= date.getTime() && time < next.getTime() })
  const attempted = rows.reduce((n, s) => n + s.attempted, 0)
  return { key: date.toISOString(), label: date.toLocaleDateString(undefined, { weekday: 'short' }), minutes: Number(((!setId.value && !folderId.value ? (streak.days.value[date.toLocaleDateString('en-CA')] ?? 0) : rows.reduce((n, s) => n + s.durationSeconds, 0)) / 60).toFixed(1)), attempted, accuracy: attempted ? Math.round(rows.reduce((n, s) => n + s.correct, 0) / attempted * 100) : 0 }
}))
const maxMinutes = computed(() => Math.max(1, ...days.value.map(d => d.minutes)))
const timeDescription = computed(() => days.value.map(d => `${d.label}: ${d.minutes} minutes`).join(', '))
const accuracyDescription = computed(() => days.value.map(d => `${d.label}: ${d.attempted ? `${d.accuracy}%` : 'no answers'}`).join(', '))
const tipsKey = computed(() => `tracer:insights:tips:v2:${tipsOwner.value}:${folderId.value}:${setId.value}:${selected.value.length}:${selected.value[0]?.endedAt ?? ''}`)
watch(tipsKey, () => { if (!loading.value) void refreshTips(false) })
onMounted(load)
async function load() {
  loading.value = true; error.value = ''
  try {
    const db = await useTracerDb()
    const [nextSets, nextFolders, nextSessions, profile] = await Promise.all([createSetsRepo(db).list(), createFoldersRepo(db).list(), listStudySessions(), createProfileRepo(db).get()])
    tipsOwner.value = profile?.supabaseUserId || profile?.id || 'guest'
    sets.value = nextSets; folders.value = nextFolders; sessions.value = nextSessions
  } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Could not load insights.' }
  finally { loading.value = false }
  if (!error.value) await refreshTips(false)
}
function suggestedTips() {
  const subset = filteredSets.value.filter(s => !setId.value || s.id === setId.value)
  const weakest = subset.map(set => {
    const rows = selected.value.filter(s => s.setId === set.id)
    const attempted = rows.reduce((n, row) => n + row.attempted, 0)
    return { set, attempted, accuracy: attempted ? rows.reduce((n, row) => n + row.correct, 0) / attempted : 1 }
  }).filter(row => row.attempted > 0).sort((a, b) => a.accuracy - b.accuracy)[0]
  return [weakest ? `Review ${weakest.set.title} next. It has your lowest recorded accuracy (${Math.round(weakest.accuracy * 100)}%).` : 'Start with a short flashcard session, then take a test to establish a baseline.',
    total.value.attempted && total.value.correct / total.value.attempted < .7 ? 'Try a second pass through missed cards before moving to a new set.' : 'Space your next review across a few days to help recall last longer.',
    'Aim for a focused 10–15 minute session and check your accuracy afterward.']
}
async function refreshTips(force: boolean) {
  if (tipsBusy.value) return
  tipsError.value = ''; tipsStatus.value = ''
  const key = tipsKey.value
  if (!force) {
    try { const cached = JSON.parse(localStorage.getItem(key) || 'null'); if (cached && Date.now() - cached.at < 7 * 86400000 && Array.isArray(cached.tips)) { tips.value = cached.tips; tipsStatus.value = 'Showing saved AI suggestions.'; return } } catch {}
  }
  tips.value = suggestedTips()
  if (!selected.value.length && !force) { tipsStatus.value = 'Study a set to unlock personalized AI suggestions, or refresh now for a starting plan.'; return }
  tipsBusy.value = true
  try {
    const db = await useTracerDb(), settings = await createSettingsRepo(db).get()
    const scope = setId.value ? sets.value.find(s => s.id === setId.value)?.title : folderId.value ? folders.value.find(f => f.id === folderId.value)?.name : 'all sets'
    const prompt = `Give exactly three concise, actionable study suggestions, one per line, with no numbering. Scope: ${scope}. Sessions: ${selected.value.length}; accuracy: ${metrics.value[0]?.value}; study minutes: ${Math.round(total.value.seconds / 60)}. Set performance: ${filteredSets.value.slice(0, 12).map(set => { const rows = selected.value.filter(s => s.setId === set.id); const attempted = rows.reduce((n, s) => n + s.attempted, 0); return `${set.title}: ${attempted} attempts, ${attempted ? Math.round(rows.reduce((n, s) => n + s.correct, 0) / attempted * 100) : 0}% accuracy` }).join('; ')}. Do not claim knowledge of individual question content.`
    let response = ''
    if (!settings.defaultModelId || settings.defaultModelId === 'builtin:auto') {
      response = await (await import('~/src/composables/ai/builtin/client')).builtinGenerate({ operation: 'chat', input: { messages: [{ role: 'user', content: prompt }], context: 'Personal study insights based only on the supplied aggregate study statistics.', title: 'Insights', route: '/insights' } })
    } else {
      const { resolveAiModel } = await import('~/src/composables/ai/registry')
      const { generateText } = await import('ai')
      const model = await resolveAiModel([settings.defaultModelId, ...settings.fallbackModelIds])
      response = (await generateText({ model, prompt })).text || ''
    }
    const parsed = response.split('\n').map(line => line.replace(/^\s*[-*\d.)]+\s*/, '').trim()).filter(Boolean).slice(0, 3)
    if (!parsed.length) throw new Error('The model returned no suggestions.')
    if (key !== tipsKey.value) return
    tips.value = parsed
    try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), tips: parsed })) } catch {}
    tipsStatus.value = 'AI suggestions refreshed just now.'
  } catch (cause) { if (key === tipsKey.value) tipsError.value = cause instanceof Error ? `Could not refresh AI suggestions: ${cause.message}` : 'Could not refresh AI suggestions. Showing study suggestions based on your progress.' }
  finally { tipsBusy.value = false; if (key !== tipsKey.value) void refreshTips(false) }
}
</script>
