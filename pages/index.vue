<template>
  <main class="tracer-page mx-auto max-w-6xl px-6 py-8">
    <header class="mb-6 flex items-center justify-between gap-3"><h1 class="text-2xl font-bold">Home</h1><UButton to="/create/basic" color="primary">Create</UButton></header>
    <div class="mb-8 grid grid-cols-2 gap-4">
      <UCard><div class="flex items-center justify-between gap-3"><div><p class="text-sm text-muted">Study streak</p><p class="mt-1 text-3xl font-bold">{{ currentStreak }} <span class="text-sm font-medium">days</span></p></div><div class="hidden sm:flex gap-1" aria-label="This week"><span v-for="day in week" :key="day.key" :title="`${day.key}: ${Math.floor(day.seconds / 60)} min`" class="h-8 w-2 rounded-full" :class="day.seconds > 0 ? 'bg-[#F67B80]' : 'bg-accented'" /></div></div></UCard>
      <UCard><p class="text-sm text-muted">Study time today</p><p class="mt-1 text-3xl font-bold">{{ Math.floor(today / 60) }} <span class="text-sm font-medium">min</span></p><UProgress class="mt-3 study-time-progress" :model-value="today" :max="dailyGoalSeconds" color="primary" aria-label="Daily study goal" /></UCard>
    </div>
    <div class="mb-4 flex items-center justify-between"><h2 class="text-lg font-semibold">Recently used</h2><UButton to="/library" variant="link" color="primary">View library</UButton></div>
    <LoadingSpinner v-if="loading" centered />
    <UAlert v-else-if="error" color="error" :title="error"><template #actions><UButton @click="load">Retry</UButton></template></UAlert>
    <UCard v-else-if="!recent.length"><UButton to="/create/basic" variant="ghost">Create your first set</UButton></UCard>
    <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <LibraryCard v-for="item in recent" :key="item.kind + item.id" :title="item.title" :to="itemPath(item)" :description="item.subtitle" :kind="item.kind" :set-id="item.setId ?? item.id" :author="ownerName" />
    </div>
    <section v-if="isTeacher" class="mt-8"><div class="mb-4 flex items-center justify-between gap-3"><h2 class="text-lg font-semibold">Recent student activity</h2><UButton to="/teacher" variant="link" color="primary">Dashboard</UButton></div><UCard :ui="{ body: 'p-4 sm:p-4' }"><p v-if="activityError" role="alert" class="text-error">{{ activityError }}</p><p v-else-if="!activity.length" class="text-sm text-muted">No recent activity</p><ul v-else class="divide-y divide-default"><li v-for="row in activity" :key="row.attemptId!" class="flex items-center gap-3 py-2 first:pt-0 last:pb-0"><UAvatar :alt="row.displayName" size="sm" /><div class="min-w-0 flex-1"><p class="truncate font-semibold">{{ row.displayName }}</p><p class="truncate text-sm text-muted">{{ row.assignmentTitle }}</p></div><time class="shrink-0 text-xs text-muted">{{ row.submittedAt ? new Date(row.submittedAt).toLocaleDateString() : '' }}</time></li></ul></UCard></section>
  </main>
</template>
<script setup lang="ts">
import { createSetsRepo, createStudyGuidesRepo, createProfileRepo, createSettingsRepo, useTracerDb } from '~/src/composables/db'
import { toHomeDashboardSetItem, type HomeDashboardItem } from '~/src/composables/home-dashboard-cache'
import { lockGetStatus } from '~/src/composables/lock'
import { useLockSession } from '~/src/composables/lock-session'
import { useStudyStreak } from '~/src/composables/study-streak'
import { useRecentLibrary } from '~/src/composables/recent-library'
import { getAccountRole, listClassrooms, listClassroomProgress, listClassroomAssignmentSetVersionIds, type ClassroomProgressRow } from '~/src/composables/classrooms'
const { today, currentStreak, week, dailyGoalSeconds } = useStudyStreak()
const { visits } = useRecentLibrary()
const router = useRouter()
const { unlockedThisSession, markUnlocked, markLocked } = useLockSession()
const items = ref<HomeDashboardItem[]>([])
const loading = ref(true)
const error = ref('')
const isTeacher = ref(false)
const ownerName = useState('library-owner-name', () => '')
const activity = ref<ClassroomProgressRow[]>([])
const activityError = ref('')
const itemPath = (item: HomeDashboardItem) => item.kind === 'set' ? `/set/${item.id}` : `/study-guide/${item.setId ?? item.id}`
const recent = computed(() => [...items.value].sort((a, b) => {
  const aVisit = visits.value[itemPath(a)]
  const bVisit = visits.value[itemPath(b)]
  if (aVisit !== undefined && bVisit === undefined) return -1
  if (bVisit !== undefined && aVisit === undefined) return 1
  return aVisit !== undefined && bVisit !== undefined
    ? bVisit - aVisit
    : Date.parse(b.updatedAt ?? b.createdAt) - Date.parse(a.updatedAt ?? a.createdAt)
}).slice(0, 6))
async function load() {
  loading.value = true; error.value = ''
  try {
    const [db, status] = await Promise.all([useTracerDb(), lockGetStatus()])
    const [profile, settings] = await Promise.all([createProfileRepo(db).get(), createSettingsRepo(db).get()])
    if (!profile || !status.has_verifier) { markLocked(); await router.replace('/first-run'); return }
    if (settings.startupLockEnabled && status.requires_unlock && !unlockedThisSession.value) { markLocked(); await router.replace('/unlock'); return }
    if (status.can_auto_unlock) markUnlocked()
    ownerName.value = profile.name
    const assignedSetVersionIds = await listClassroomAssignmentSetVersionIds().catch(() => [])
    if (assignedSetVersionIds.length) await createSetsRepo(db).hideManyFromLibrary(assignedSetVersionIds)
    const [sets, guides] = await Promise.all([createSetsRepo(db).list(), createStudyGuidesRepo(db).listSummaries()])
    items.value = sets.map(toHomeDashboardSetItem)
    for (const guide of guides) { const set = sets.find(s => s.id === guide.setId); if (set) items.value.push({kind:'study-guide',kindLabel:'Study guide',id:guide.id,setId:guide.setId,folderId:set.folderId,title:set.title,subtitle:set.description,createdAt:guide.createdAt,updatedAt:null}) }
  } catch (e) { error.value = e instanceof Error ? e.message : 'Could not load library' }
  finally { loading.value = false }
  try {
    const role = await getAccountRole(); isTeacher.value = role === 'teacher' || role === 'super'
    if (isTeacher.value) { const classes = await listClassrooms(); const rows = await Promise.all(classes.filter(c => c.canTeach).map(c => listClassroomProgress(c.id))); activity.value = rows.flat().filter(r => r.attemptId && r.submittedAt).sort((a,b) => (b.submittedAt ?? '').localeCompare(a.submittedAt ?? '')).slice(0,5) }
  } catch { if (isTeacher.value) activityError.value = 'Could not load student activity' }
}
onMounted(load)
</script>

<style scoped>
.study-time-progress :deep([data-slot="indicator"]) { background-color: #F67B80; }
</style>
