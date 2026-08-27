<template>
  <main class="min-h-[calc(100vh-4rem)] bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <div class="mx-auto max-w-[980px] px-8 py-10">
      <div v-if="loading" class="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-900">
        {{ t('common.loading') }}
      </div>
      <div v-else-if="loadError" class="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p class="text-sm text-red-700 dark:text-red-300" role="alert">{{ loadError }}</p>
        <AppButton class="mt-4" variant="white" @click="loadClassPage">{{ t('classroom.retry') }}</AppButton>
      </div>

      <template v-else-if="classroom">
        <header class="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 class="text-4xl font-semibold">{{ classroom.name }}</h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ classroomSummary }}</p>
          </div>
          <AppButton variant="white" to="/">{{ t('classroom.backToHome') }}</AppButton>
        </header>

        <section class="mt-9" aria-labelledby="recent-sets-title">
          <h2 id="recent-sets-title" class="text-2xl font-semibold">{{ t('classroom.recentSets') }}</h2>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ t('classroom.recentSetsDescription') }}</p>

          <p v-if="assignments.length === 0" class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {{ t('classroom.noRecentSets') }}
          </p>
          <ul v-else class="mt-6 space-y-3">
            <li v-for="assignment in assignments" :key="assignment.id">
              <article class="flex min-h-[88px] flex-wrap items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <button
                  type="button"
                  class="flex min-w-0 flex-1 items-center gap-5 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
                  :disabled="openingAssignmentId === assignment.id"
                  @click="openAssignmentMaterial(assignment)"
                >
                  <img :src="setIconSrc(assignment.iconKey)" :style="setIconToneStyle(assignment.iconTone)" alt="" class="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <span class="min-w-0 flex-1">
                    <span class="block truncate font-semibold">{{ assignment.title }}</span>
                    <span class="mt-1 block truncate text-sm text-slate-600 dark:text-slate-300">
                      {{ assignment.kind === 'study-guide' ? t('home.studyGuide') : t('classroom.cardCount', { count: assignment.cardCount }) }}
                      <span aria-hidden="true"> · </span>{{ formatAssignedDate(assignment.createdAt) }}
                    </span>
                    <span v-if="assignment.description" class="mt-1 block truncate text-sm text-slate-500 dark:text-slate-400">{{ assignment.description }}</span>
                  </span>
                </button>
                <div v-if="assignment.kind === 'set'" class="flex flex-wrap gap-2">
                  <AppButton
                    v-for="mode in studyModes"
                    :key="mode.value"
                    size="sm"
                    variant="white"
                    :disabled="openingAssignmentId === assignment.id"
                    @click="openAssignment(assignment, mode.value)"
                  >
                    {{ t(mode.label) }}
                  </AppButton>
                </div>
              </article>
              <p v-if="assignmentErrorId === assignment.id" class="mt-2 text-sm text-red-700 dark:text-red-300" role="alert">
                {{ assignmentError }}
              </p>
            </li>
          </ul>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  classroomErrorKey,
  classroomAssignmentMaterialPath,
  getAccountRole,
  getClassroom,
  listClassroomAssignments,
  prepareClassroomAssignmentForStudy,
  type ClassroomAttemptMode,
  type Classroom,
  type ClassroomAssignment,
} from '~/src/composables/classrooms'
import { useAppLanguage } from '~/src/composables/language'
import { setIconSrc, setIconToneStyle } from '~/src/composables/set-icons'
import { flushPendingAssignedAttempts } from '~/src/composables/assignment-progress'

const route = useRoute()
const router = useRouter()
const { language, t } = useAppLanguage()
const loading = ref(true)
const loadError = ref<string | null>(null)
const classroom = ref<Classroom | null>(null)
const assignments = ref<ClassroomAssignment[]>([])
const openingAssignmentId = ref<string | null>(null)
const assignmentErrorId = ref<string | null>(null)
const assignmentError = ref<string | null>(null)
const studyModes: Array<{ value: ClassroomAttemptMode; label: string }> = [
  { value: 'flashcards', label: 'set.flashcards' },
  { value: 'practice', label: 'set.learn' },
  { value: 'match', label: 'set.match' },
  { value: 'test', label: 'classroom.testMode' },
]
const classId = computed(() => String(route.params.id ?? ''))
const classroomSummary = computed(() => {
  if (!classroom.value) return ''
  return [classroom.value.subject, classroom.value.section, classroom.value.schoolYear].filter(Boolean).join(' · ') || t('classroom.noClassDetails')
})

onMounted(loadClassPage)
watch(classId, loadClassPage)

async function loadClassPage() {
  loading.value = true
  loadError.value = null
  try {
    const role = await getAccountRole()
    if (role !== 'student') {
      await router.replace('/')
      return
    }
    void flushPendingAssignedAttempts()
    const [nextClassroom, nextAssignments] = await Promise.all([
      getClassroom(classId.value),
      listClassroomAssignments(classId.value),
    ])
    classroom.value = nextClassroom
    assignments.value = nextAssignments
  } catch (error) {
    loadError.value = t(classroomErrorKey(error))
  } finally {
    loading.value = false
  }
}

function formatAssignedDate(iso: string) {
  const date = new Date(iso)
  return Number.isNaN(date.getTime())
    ? iso
    : new Intl.DateTimeFormat(language.value, { dateStyle: 'medium' }).format(date)
}

async function openAssignment(assignment: ClassroomAssignment, mode: ClassroomAttemptMode) {
  if (openingAssignmentId.value) return
  openingAssignmentId.value = assignment.id
  assignmentErrorId.value = null
  assignmentError.value = null
  try {
    const localSetId = await prepareClassroomAssignmentForStudy(assignment)
    const suffix = mode === 'practice' ? 'learn' : mode
    await router.push({
      path: `/set/${localSetId}-${suffix}`,
      query: { assignment: assignment.id, class: classId.value },
    })
  } catch (error) {
    assignmentErrorId.value = assignment.id
    assignmentError.value = t(classroomErrorKey(error))
  } finally {
    openingAssignmentId.value = null
  }
}

async function openAssignmentMaterial(assignment: ClassroomAssignment) {
  if (openingAssignmentId.value) return
  openingAssignmentId.value = assignment.id
  assignmentErrorId.value = null
  assignmentError.value = null
  try {
    const localSetId = await prepareClassroomAssignmentForStudy(assignment)
    await router.push({
      path: classroomAssignmentMaterialPath(assignment.kind, localSetId),
      query: { assignment: assignment.id, class: classId.value },
    })
  } catch (error) {
    assignmentErrorId.value = assignment.id
    assignmentError.value = t(classroomErrorKey(error))
  } finally {
    openingAssignmentId.value = null
  }
}
</script>
