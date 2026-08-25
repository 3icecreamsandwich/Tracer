<template>
  <main class="min-h-[calc(100vh-4rem)] bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <div class="mx-auto max-w-[1180px] px-8 py-10">
      <div v-if="loading" class="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-900">
        {{ t('common.loading') }}
      </div>

      <div v-else-if="loadError" class="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p class="text-sm text-red-700 dark:text-red-300" role="alert">{{ loadError }}</p>
        <AppButton
          v-if="loadErrorCode === 'signed_out'"
          class="mt-4"
          variant="white"
          to="/settings"
        >
          {{ t('settings.reconnect') }}
        </AppButton>
        <AppButton v-else class="mt-4" variant="white" @click="loadDashboard">{{ t('classroom.retry') }}</AppButton>
      </div>

      <section v-else-if="classes.length === 0" class="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <div class="w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white dark:bg-white dark:text-slate-950" aria-hidden="true">＋</div>
          <h1 class="mt-5 text-3xl font-semibold">{{ t('classroom.noClassesTitle') }}</h1>
          <p class="mx-auto mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
            {{ t('classroom.noClassesDescription') }}
          </p>
          <AppButton class="mt-6" size="lg" @click="createOpen = true">
            {{ t('classroom.createClass') }}
          </AppButton>
        </div>
      </section>

      <template v-else>
        <header class="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 class="mt-1 text-4xl font-semibold">{{ t('classroom.dashboardTitle') }}</h1>
          </div>
          <div class="flex flex-wrap gap-2">
            <AppButton variant="white" @click="createOpen = true">{{ t('classroom.createClass') }}</AppButton>
            <AppButton v-if="selectedClass" :to="`/teacher/classes/${selectedClass.id}/manage`">{{ t('classroom.manageClass') }}</AppButton>
          </div>
        </header>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <label class="text-sm font-medium" for="dashboard-class">{{ t('classroom.class') }}</label>
          <select
            id="dashboard-class"
            v-model="selectedClassId"
            class="min-w-64 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950"
          >
            <option v-for="classroom in classes" :key="classroom.id" :value="classroom.id">{{ classroom.name }}</option>
          </select>
        </div>

        <section class="mt-7 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="class-overview-title">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="class-overview-title" class="text-2xl font-semibold">{{ selectedClass?.name }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ classSubtitle(selectedClass) }}</p>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {{ memberCount }} {{ t('classroom.students').toLocaleLowerCase() }} · {{ assignmentCount }} {{ t('classroom.assignments').toLocaleLowerCase() }}
              </p>
            </div>
          </div>

          <div class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article class="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('classroom.meanAccuracy') }}</p>
              <p class="mt-2 text-3xl font-semibold">{{ formatPercent(progressSummary.meanAccuracy) }}</p>
            </article>
            <article class="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('classroom.medianAccuracy') }}</p>
              <p class="mt-2 text-3xl font-semibold">{{ formatPercent(progressSummary.medianAccuracy) }}</p>
            </article>
            <article class="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('classroom.scoreSpread') }}</p>
              <p class="mt-2 text-3xl font-semibold">{{ formatPoints(progressSummary.spread) }}</p>
            </article>
            <article class="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('classroom.participation') }}</p>
              <p class="mt-2 text-3xl font-semibold">{{ progressSummary.completedCount }}/{{ progressSummary.expectedCount }}</p>
            </article>
          </div>
        </section>

        <div class="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="activity-title">
            <h2 id="activity-title" class="text-xl font-semibold">{{ t('classroom.recentActivity') }}</h2>
            <div v-if="recentProgress.length === 0" class="mt-5 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {{ t('classroom.noActivity') }}
            </div>
            <ul v-else class="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
              <li v-for="row in recentProgress" :key="row.attemptId" class="flex items-center justify-between gap-4 py-3">
                <div class="min-w-0">
                  <p class="truncate font-medium">{{ row.displayName }}</p>
                  <p class="truncate text-sm text-slate-500 dark:text-slate-400">{{ row.assignmentTitle }} · {{ modeLabel(row.mode) }}</p>
                </div>
                <div class="shrink-0 text-right">
                  <p class="font-semibold">{{ formatPercent(row.accuracyPercent) }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ formatActivityDate(row.submittedAt) }}</p>
                </div>
              </li>
            </ul>
          </section>

          <aside class="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" :aria-label="t('classroom.classActions')">
            <h2 class="text-lg font-semibold">{{ t('classroom.classActions') }}</h2>
            <div class="mt-4 grid gap-3">
              <AppButton v-if="selectedClass" block variant="white" :to="`/teacher/classes/${selectedClass.id}/assign`">{{ t('classroom.assignSet') }} <span aria-hidden="true">→</span></AppButton>
              <AppButton block variant="white" @click="openCode">{{ t('classroom.addStudents') }} <span aria-hidden="true">→</span></AppButton>
              <AppButton v-if="selectedClass" block :to="`/teacher/classes/${selectedClass.id}`">{{ t('classroom.detailedView') }} <span aria-hidden="true">→</span></AppButton>
            </div>
          </aside>
        </div>
      </template>
    </div>

    <ClassCreateDialog
      :open="createOpen"
      :busy="createBusy"
      :error="createError"
      @close="closeCreate"
      @submit="onCreateClass"
    />
    <ClassCodeDialog
      :open="codeOpen"
      :class-name="codeClass?.name ?? ''"
      :code="codeClass?.joinCode ?? ''"
      @close="codeOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import {
  ClassroomError,
  classroomErrorKey,
  createClassroom,
  getAccountRole,
  getClassroomOverview,
  listClassroomProgress,
  listClassrooms,
  summarizeClassProgress,
  type Classroom,
  type ClassroomErrorCode,
  type ClassroomProgressRow,
  type CreateClassroomInput,
} from '~/src/composables/classrooms'
import { useAppLanguage } from '~/src/composables/language'

const router = useRouter()
const { t } = useAppLanguage()
const loading = ref(true)
const loadError = ref<string | null>(null)
const loadErrorCode = ref<ClassroomErrorCode | null>(null)
const classes = ref<Classroom[]>([])
const selectedClassId = ref('')
const memberCount = ref(0)
const assignmentCount = ref(0)
const progressRows = ref<ClassroomProgressRow[]>([])
const createOpen = ref(false)
const createBusy = ref(false)
const createError = ref<string | null>(null)
const codeOpen = ref(false)
const codeClass = ref<Classroom | null>(null)
let overviewRequestId = 0
let dashboardRequest: Promise<void> | null = null

const selectedClass = computed(() => classes.value.find((item) => item.id === selectedClassId.value) ?? null)
const progressSummary = computed(() => summarizeClassProgress(progressRows.value))
const recentProgress = computed(() => progressRows.value
  .filter((row) => row.attemptId && row.submittedAt)
  .sort((left, right) => (right.submittedAt ?? '').localeCompare(left.submittedAt ?? ''))
  .slice(0, 5))

watch(selectedClassId, async (classId) => {
  const requestId = ++overviewRequestId
  memberCount.value = 0
  assignmentCount.value = 0
  progressRows.value = []
  if (!classId) return
  try {
    const [overview, progress] = await Promise.all([
      getClassroomOverview(classId),
      listClassroomProgress(classId),
    ])
    if (requestId !== overviewRequestId) return
    memberCount.value = overview.memberCount
    assignmentCount.value = overview.assignmentCount
    progressRows.value = progress
  } catch {
    if (requestId !== overviewRequestId) return
    memberCount.value = 0
    assignmentCount.value = 0
    progressRows.value = []
  }
})

onMounted(loadDashboard)

async function loadDashboard() {
  if (dashboardRequest) return dashboardRequest
  const request = runDashboardLoad().finally(() => {
    if (dashboardRequest === request) dashboardRequest = null
  })
  dashboardRequest = request
  return request
}

async function runDashboardLoad() {
  loading.value = true
  loadError.value = null
  loadErrorCode.value = null
  try {
    const [role, nextClasses] = await Promise.all([
      getAccountRole(),
      listClassrooms(),
    ])
    if (role !== 'teacher') {
      await router.replace('/')
      return
    }
    classes.value = nextClasses
    if (!classes.value.some((item) => item.id === selectedClassId.value)) {
      selectedClassId.value = classes.value[0]?.id ?? ''
    }
  } catch (error) {
    loadErrorCode.value = error instanceof ClassroomError ? error.code : 'unknown'
    loadError.value = t(classroomErrorKey(error))
  } finally {
    loading.value = false
  }
}

function classSubtitle(classroom: Classroom | null) {
  if (!classroom) return ''
  return [classroom.subject, classroom.section, classroom.schoolYear].filter(Boolean).join(' · ') || t('classroom.noClassDetails')
}

function closeCreate() {
  if (createBusy.value) return
  createOpen.value = false
  createError.value = null
}

async function onCreateClass(input: Omit<CreateClassroomInput, 'timezone'>) {
  createBusy.value = true
  createError.value = null
  try {
    const classroom = await createClassroom({
      ...input,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    })
    classes.value = [classroom, ...classes.value]
    selectedClassId.value = classroom.id
    createOpen.value = false
    codeClass.value = classroom
    codeOpen.value = true
  } catch (error) {
    createError.value = t(classroomErrorKey(error))
  } finally {
    createBusy.value = false
  }
}

function openCode() {
  if (!selectedClass.value?.joinCode) return
  codeClass.value = selectedClass.value
  codeOpen.value = true
}

function formatPercent(value: number | null) {
  return value === null ? '—' : `${Math.round(value)}%`
}

function formatPoints(value: number | null) {
  return value === null ? '—' : t('classroom.points', { count: Math.round(value) })
}

function modeLabel(mode: ClassroomProgressRow['mode']) {
  if (mode === 'flashcards') return t('set.flashcards')
  if (mode === 'practice') return t('set.learn')
  if (mode === 'match') return t('set.match')
  if (mode === 'test') return t('classroom.testMode')
  return t('common.none')
}

function formatActivityDate(value: string | null) {
  if (!value) return t('common.none')
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? t('common.none')
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}
</script>
