<template>
  <main class="min-h-[calc(100vh-4rem)] bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <div class="mx-auto max-w-[1180px] px-8 py-10">

      <div v-if="loading" class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-900">
        {{ t('common.loading') }}
      </div>
      <div v-else-if="loadError" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p class="text-sm text-red-700 dark:text-red-300" role="alert">{{ loadError }}</p>
        <AppButton class="mt-4" variant="white" @click="loadDetail">{{ t('classroom.retry') }}</AppButton>
      </div>

      <template v-else-if="classroom">
        <header class="mt-6 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 class="mt-1 text-4xl font-semibold">{{ classroom.name }}</h1>
          </div>
          <AppButton @click="codeOpen = true">{{ t('classroom.addStudents') }}</AppButton>
        </header>

        <div class="mt-8 grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)_180px]">
          <select
            :value="classroom.id"
            class="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950"
            :aria-label="t('classroom.class')"
            @change="changeClass"
          >
            <option v-for="item in classes" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
          <label class="relative block">
            <span class="sr-only">{{ t('classroom.searchStudents') }}</span>
            <input
              v-model="search"
              type="search"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950"
              :placeholder="t('classroom.searchStudents')"
            />
          </label>
          <select
            v-model="sort"
            class="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950"
            :aria-label="t('classroom.sortStudents')"
          >
            <option value="name">{{ t('classroom.sortByName') }}</option>
            <option value="joined">{{ t('classroom.sortByJoined') }}</option>
          </select>
        </div>

        <section class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="roster-title">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <h2 id="roster-title" class="text-xl font-semibold">{{ t('classroom.studentRoster') }}</h2>
            <span class="text-sm text-slate-500 dark:text-slate-400">{{ t('classroom.studentCount', { count: filteredMembers.length }) }}</span>
          </div>

          <div v-if="filteredMembers.length === 0" class="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
            {{ members.length ? t('classroom.noMatchingStudents') : t('classroom.noStudents') }}
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full min-w-[720px] border-collapse text-left">
              <thead class="bg-orange-50 text-sm text-[#B94E38] dark:bg-orange-950/25 dark:text-orange-300">
                <tr>
                  <th class="px-6 py-3 font-semibold">{{ t('classroom.student') }}</th>
                  <th class="px-6 py-3 font-semibold">{{ t('classroom.joined') }}</th>
                  <th class="px-6 py-3 font-semibold">{{ t('classroom.meanAccuracy') }}</th>
                  <th class="px-6 py-3 font-semibold">{{ t('classroom.completedAssignments') }}</th>
                  <th class="px-6 py-3 font-semibold">{{ t('classroom.mostRecent') }}</th>
                  <th class="px-6 py-3 font-semibold">{{ t('classroom.bestScore') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="member in filteredMembers" :key="member.userId" class="border-t border-slate-100 even:bg-slate-50 dark:border-slate-900 dark:even:bg-slate-900/60">
                  <td class="px-6 py-4 font-semibold">{{ member.displayName }}</td>
                  <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{{ formatJoined(member.joinedAt) }}</td>
                  <td class="px-6 py-4 font-medium">{{ formatPercent(progressFor(member.userId).averageAccuracy) }}</td>
                  <td class="px-6 py-4">{{ progressFor(member.userId).completedAssignments }}/{{ progressFor(member.userId).totalAssignments }}</td>
                  <td class="px-6 py-4">
                    <template v-if="progressFor(member.userId).mostRecent">
                      <p class="font-medium">{{ formatPercent(progressFor(member.userId).mostRecent?.accuracyPercent ?? null) }}</p>
                      <p class="text-xs text-slate-500 dark:text-slate-400">{{ modeLabel(progressFor(member.userId).mostRecent?.mode ?? null) }} · {{ formatAttemptDate(progressFor(member.userId).mostRecent?.submittedAt ?? null) }}</p>
                    </template>
                    <span v-else class="text-slate-400">—</span>
                  </td>
                  <td class="px-6 py-4 font-medium">{{ formatPercent(progressFor(member.userId).bestAccuracy) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </template>
    </div>

    <ClassCodeDialog
      :open="codeOpen"
      :class-name="classroom?.name ?? ''"
      :code="classroom?.joinCode ?? ''"
      @close="codeOpen = false"
    />
  </main>
</template>

<script setup lang="ts">
import {
  ClassroomError,
  classroomErrorKey,
  getAccountRole,
  listClassroomMembers,
  listClassroomProgress,
  listClassrooms,
  summarizeStudentProgress,
  type Classroom,
  type ClassroomMember,
  type ClassroomProgressRow,
  type StudentProgressSummary,
} from '~/src/composables/classrooms'
import { useAppLanguage } from '~/src/composables/language'

const route = useRoute()
const router = useRouter()
const { language, t } = useAppLanguage()
const loading = ref(true)
const loadError = ref<string | null>(null)
const classroom = ref<Classroom | null>(null)
const classes = ref<Classroom[]>([])
const members = ref<ClassroomMember[]>([])
const progressRows = ref<ClassroomProgressRow[]>([])
const search = ref('')
const sort = ref<'name' | 'joined'>('name')
const codeOpen = ref(false)
let detailRequestId = 0
let detailRequest: { classId: string; promise: Promise<void> } | null = null

const classId = computed(() => String(route.params.id ?? ''))
const filteredMembers = computed(() => {
  const query = search.value.trim().toLocaleLowerCase(language.value)
  const next = members.value.filter((member) => !query || member.displayName.toLocaleLowerCase(language.value).includes(query))
  return next.sort((left, right) => {
    if (sort.value === 'joined') return (right.joinedAt ?? '').localeCompare(left.joinedAt ?? '')
    return left.displayName.localeCompare(right.displayName, language.value)
  })
})

onMounted(loadDetail)
watch(classId, loadDetail)

async function loadDetail() {
  const requestedClassId = classId.value
  if (detailRequest?.classId === requestedClassId) return detailRequest.promise
  const requestId = ++detailRequestId
  const promise = runDetailLoad(requestedClassId, requestId).finally(() => {
    if (detailRequest?.promise === promise) detailRequest = null
  })
  detailRequest = { classId: requestedClassId, promise }
  return promise
}

async function runDetailLoad(requestedClassId: string, requestId: number) {
  loading.value = true
  loadError.value = null
  try {
    const [role, nextClasses, nextMembers, nextProgress] = await Promise.all([
      getAccountRole(),
      listClassrooms(),
      listClassroomMembers(requestedClassId),
      listClassroomProgress(requestedClassId),
    ])
    if (requestId !== detailRequestId) return
    if (role !== 'teacher') {
      await router.replace('/')
      return
    }
    const nextClassroom = nextClasses.find((item) => item.id === requestedClassId)
    if (!nextClassroom) throw new ClassroomError('not_found', 'Class was not found')
    classroom.value = nextClassroom
    classes.value = nextClasses
    members.value = nextMembers
    progressRows.value = nextProgress
  } catch (error) {
    if (requestId !== detailRequestId) return
    loadError.value = t(classroomErrorKey(error))
  } finally {
    if (requestId === detailRequestId) loading.value = false
  }
}

function changeClass(event: Event) {
  const target = event.target
  if (!(target instanceof HTMLSelectElement) || !target.value) return
  void router.push(`/teacher/classes/${target.value}`)
}

function formatJoined(value: string | null) {
  if (!value) return t('common.none')
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return t('common.none')
  return new Intl.DateTimeFormat(language.value, { dateStyle: 'medium' }).format(date)
}

const emptyProgress: StudentProgressSummary = {
  averageAccuracy: null,
  bestAccuracy: null,
  spread: null,
  completedAssignments: 0,
  totalAssignments: 0,
  mostRecent: null,
}

const progressByStudent = computed(() => {
  const grouped = new Map<string, ClassroomProgressRow[]>()
  for (const row of progressRows.value) {
    grouped.set(row.studentId, [...(grouped.get(row.studentId) ?? []), row])
  }
  return new Map([...grouped].map(([studentId, rows]) => [studentId, summarizeStudentProgress(rows)]))
})

function progressFor(studentId: string): StudentProgressSummary {
  return progressByStudent.value.get(studentId) ?? emptyProgress
}

function formatPercent(value: number | null) {
  return value === null ? '—' : `${Math.round(value)}%`
}

function modeLabel(mode: ClassroomProgressRow['mode']) {
  if (mode === 'flashcards') return t('set.flashcards')
  if (mode === 'practice') return t('set.learn')
  if (mode === 'match') return t('set.match')
  if (mode === 'test') return t('classroom.testMode')
  return t('common.none')
}

function formatAttemptDate(value: string | null) {
  if (!value) return t('common.none')
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? t('common.none')
    : new Intl.DateTimeFormat(language.value, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}
</script>
