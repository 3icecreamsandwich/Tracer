<template>
  <main class="min-h-[calc(100vh-4rem)] bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
    <div class="mx-auto max-w-[980px] px-8 py-10">
      <LoadingSpinner v-if="loading" screen />

      <div v-else-if="loadError" class="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p class="text-sm text-red-700 dark:text-red-300" role="alert">{{ loadError }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <AppButton variant="white" @click="loadManagement">{{ t('classroom.retry') }}</AppButton>
          <AppButton variant="white" to="/teacher">{{ t('classroom.backToDashboard') }}</AppButton>
        </div>
      </div>

      <template v-else-if="classroom">
        <header class="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 class="text-4xl font-semibold">{{ t('classroom.manageClass') }}</h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ t('classroom.manageDescription') }}</p>
          </div>
          <AppButton variant="white" to="/teacher">{{ t('classroom.backToDashboard') }}</AppButton>
        </header>

        <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="class-information-title">
          <h2 id="class-information-title" class="text-xl font-semibold">{{ t('classroom.classInformation') }}</h2>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ t('classroom.classInformationDescription') }}</p>
          <form class="mt-6 grid gap-5 sm:grid-cols-2" @submit.prevent="saveClassInformation">
            <label>
              <span class="text-sm font-medium">{{ t('classroom.className') }}</span>
              <input v-model="classForm.name" required maxlength="120" :placeholder="t('classroom.classNamePlaceholder')" class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950" />
            </label>
            <label>
              <span class="text-sm font-medium">{{ t('classroom.subject') }}</span>
              <input v-model="classForm.subject" maxlength="120" :placeholder="t('classroom.subjectPlaceholder')" class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950" />
            </label>
            <label>
              <span class="text-sm font-medium">{{ t('classroom.section') }}</span>
              <input v-model="classForm.section" maxlength="80" :placeholder="t('classroom.sectionPlaceholder')" class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950" />
            </label>
            <label>
              <span class="text-sm font-medium">{{ t('classroom.schoolYear') }}</span>
              <input v-model="classForm.schoolYear" maxlength="40" :placeholder="t('classroom.schoolYearPlaceholder')" class="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950" />
            </label>
            <div class="flex flex-wrap items-center gap-3 sm:col-span-2">
              <AppButton type="submit" size="lg" :busy="saveBusy" :disabled="!classForm.name.trim()">
                {{ t('common.update') }}
              </AppButton>
              <p v-if="saveError" class="text-sm text-red-700 dark:text-red-300" role="alert">{{ saveError }}</p>
              <p v-else-if="saveSuccess" class="text-sm text-slate-600 dark:text-slate-300" role="status">{{ t('classroom.classChangesSaved') }}</p>
            </div>
          </form>
        </section>

        <section class="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="manage-assignments-title">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div>
              <h2 id="manage-assignments-title" class="text-xl font-semibold">{{ t('classroom.assignedMaterials') }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ t('classroom.assignedMaterialsDescription') }}</p>
            </div>
            <AppButton :to="`/teacher/classes/${classId}/assign`">{{ t('classroom.assignSet') }}</AppButton>
          </div>
          <p v-if="assignments.length === 0" class="px-6 py-8 text-sm text-slate-500 dark:text-slate-400">
            {{ t('classroom.noAssignedMaterials') }}
          </p>
          <ul v-else class="divide-y divide-slate-200 dark:divide-slate-800">
            <li v-for="assignment in assignments" :key="assignment.id" class="flex items-center justify-between gap-4 px-6 py-4">
              <div class="flex min-w-0 items-center gap-4">
                <img :src="setIconSrc(assignment.iconKey)" :style="setIconToneStyle(assignment.iconTone)" alt="" class="h-12 w-12 shrink-0 rounded-xl object-cover" />
                <div class="min-w-0">
                  <p class="truncate font-semibold">{{ assignment.title }}</p>
                  <p class="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                    {{ assignment.kind === 'study-guide' ? t('home.studyGuide') : t('classroom.cardCount', { count: assignment.cardCount }) }}
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-600 bg-white text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-red-300 dark:hover:bg-red-950/30"
                :aria-label="`${t('classroom.removeMaterial')}: ${assignment.title}`"
                @click="requestAssignmentRemoval(assignment)"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
                </svg>
              </button>
            </li>
          </ul>
        </section>

        <section class="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="manage-students-title">
          <div class="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div>
              <h2 id="manage-students-title" class="text-xl font-semibold">{{ t('classroom.manageStudents') }}</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ t('classroom.manageStudentsDescription') }}</p>
            </div>
          </div>
          <p v-if="members.length === 0" class="px-6 py-8 text-sm text-slate-500 dark:text-slate-400">
            {{ t('classroom.noStudents') }}
          </p>
          <ul v-else class="divide-y divide-slate-200 dark:divide-slate-800">
            <li v-for="member in members" :key="member.userId" class="flex items-center justify-between gap-4 px-6 py-4">
              <p class="min-w-0 truncate font-semibold">{{ member.displayName }}</p>
              <button
                type="button"
                class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-600 bg-white text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-500 dark:bg-slate-950 dark:text-red-300 dark:hover:bg-red-950/30"
                :aria-label="`${t('classroom.removeStudent')}: ${member.displayName}`"
                @click="requestStudentRemoval(member)"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
                </svg>
              </button>
            </li>
          </ul>
        </section>
      </template>
    </div>

    <AppDialog
      :open="studentToRemove !== null"
      :title="t('classroom.removeStudentTitle')"
      :description="t('classroom.removeStudentConfirmation', { name: studentToRemove?.displayName ?? '' })"
      :close-label="t('common.close')"
      :busy="actionBusy"
      @close="closeConfirmation"
    >
      <p v-if="actionError" class="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">{{ actionError }}</p>

      <div class="mt-6 flex flex-wrap justify-end gap-2">
        <AppButton variant="white" :disabled="actionBusy" @click="closeConfirmation">{{ t('common.cancel') }}</AppButton>
        <AppButton variant="danger" :busy="actionBusy" @click="confirmStudentRemoval">
          {{ t('classroom.removeStudent') }}
        </AppButton>
      </div>
    </AppDialog>

    <AppDialog
      :open="assignmentToRemove !== null"
      :title="t('classroom.removeMaterialTitle')"
      :description="t('classroom.removeMaterialConfirmation', { name: assignmentToRemove?.title ?? '' })"
      :close-label="t('common.close')"
      :busy="assignmentActionBusy"
      @close="closeAssignmentConfirmation"
    >
      <p v-if="assignmentActionError" class="mt-3 text-sm text-red-700 dark:text-red-300" role="alert">{{ assignmentActionError }}</p>

      <div class="mt-6 flex flex-wrap justify-end gap-2">
        <AppButton variant="white" :disabled="assignmentActionBusy" @click="closeAssignmentConfirmation">{{ t('common.cancel') }}</AppButton>
        <AppButton variant="danger" :busy="assignmentActionBusy" @click="confirmAssignmentRemoval">
          {{ t('classroom.removeMaterial') }}
        </AppButton>
      </div>
    </AppDialog>
  </main>
</template>

<script setup lang="ts">
import {
  ClassroomError,
  classroomErrorKey,
  getAccountRole,
  listClassroomAssignments,
  listClassroomMembers,
  listClassrooms,
  removeClassroomAssignment,
  removeClassroomStudent,
  updateClassroom,
  type Classroom,
  type ClassroomMember,
  type ClassroomAssignment,
} from '~/src/composables/classrooms'
import { useAppLanguage } from '~/src/composables/language'
import { setIconSrc, setIconToneStyle } from '~/src/composables/set-icons'

const route = useRoute()
const router = useRouter()
const { t } = useAppLanguage()
const loading = ref(true)
const loadError = ref<string | null>(null)
const classroom = ref<Classroom | null>(null)
const members = ref<ClassroomMember[]>([])
const assignments = ref<ClassroomAssignment[]>([])
const assignmentToRemove = ref<ClassroomAssignment | null>(null)
const assignmentActionBusy = ref(false)
const assignmentActionError = ref<string | null>(null)
const studentToRemove = ref<ClassroomMember | null>(null)
const actionBusy = ref(false)
const actionError = ref<string | null>(null)
const saveBusy = ref(false)
const saveError = ref<string | null>(null)
const saveSuccess = ref(false)
const classForm = reactive({ name: '', subject: '', section: '', schoolYear: '' })
let managementRequestId = 0
let managementRequest: { classId: string; promise: Promise<void> } | null = null

const classId = computed(() => String(route.params.id ?? ''))

onMounted(loadManagement)
watch(classId, loadManagement)

async function loadManagement() {
  const requestedClassId = classId.value
  if (managementRequest?.classId === requestedClassId) return managementRequest.promise
  const requestId = ++managementRequestId
  const promise = runManagementLoad(requestedClassId, requestId).finally(() => {
    if (managementRequest?.promise === promise) managementRequest = null
  })
  managementRequest = { classId: requestedClassId, promise }
  return promise
}

async function runManagementLoad(requestedClassId: string, requestId: number) {
  loading.value = true
  loadError.value = null
  try {
    const [role, nextClasses, nextMembers, nextAssignments] = await Promise.all([
      getAccountRole(),
      listClassrooms(),
      listClassroomMembers(requestedClassId),
      listClassroomAssignments(requestedClassId),
    ])
    if (requestId !== managementRequestId) return
    if (role !== 'teacher') {
      await router.replace('/')
      return
    }
    const nextClassroom = nextClasses.find((item) => item.id === requestedClassId)
    if (!nextClassroom) throw new ClassroomError('not_found', 'Class was not found')
    classroom.value = nextClassroom
    classForm.name = nextClassroom.name
    classForm.subject = nextClassroom.subject ?? ''
    classForm.section = nextClassroom.section ?? ''
    classForm.schoolYear = nextClassroom.schoolYear ?? ''
    members.value = nextMembers
    assignments.value = nextAssignments
  } catch (error) {
    if (requestId !== managementRequestId) return
    loadError.value = t(classroomErrorKey(error))
  } finally {
    if (requestId === managementRequestId) loading.value = false
  }
}

async function saveClassInformation() {
  if (!classroom.value || !classForm.name.trim()) return
  saveBusy.value = true
  saveError.value = null
  saveSuccess.value = false
  try {
    classroom.value = await updateClassroom(classroom.value.id, {
      name: classForm.name,
      subject: classForm.subject,
      section: classForm.section,
      schoolYear: classForm.schoolYear,
      timezone: classroom.value.timezone,
    })
    classForm.name = classroom.value.name
    classForm.subject = classroom.value.subject ?? ''
    classForm.section = classroom.value.section ?? ''
    classForm.schoolYear = classroom.value.schoolYear ?? ''
    saveSuccess.value = true
  } catch (error) {
    saveError.value = t(classroomErrorKey(error))
  } finally {
    saveBusy.value = false
  }
}

function requestStudentRemoval(member: ClassroomMember) {
  studentToRemove.value = member
  actionError.value = null
}

function closeConfirmation() {
  if (actionBusy.value) return
  studentToRemove.value = null
  actionError.value = null
}

async function confirmStudentRemoval() {
  const student = studentToRemove.value
  if (!student) return
  actionBusy.value = true
  actionError.value = null
  try {
    await removeClassroomStudent(classId.value, student.userId)
    members.value = members.value.filter((member) => member.userId !== student.userId)
    studentToRemove.value = null
  } catch (error) {
    actionError.value = error instanceof ClassroomError && error.code === 'not_found'
      ? t('classroom.manageItemNotFound')
      : t(classroomErrorKey(error))
  } finally {
    actionBusy.value = false
  }
}

function requestAssignmentRemoval(assignment: ClassroomAssignment) {
  assignmentToRemove.value = assignment
  assignmentActionError.value = null
}

function closeAssignmentConfirmation() {
  if (assignmentActionBusy.value) return
  assignmentToRemove.value = null
  assignmentActionError.value = null
}

async function confirmAssignmentRemoval() {
  const assignment = assignmentToRemove.value
  if (!assignment) return
  assignmentActionBusy.value = true
  assignmentActionError.value = null
  try {
    await removeClassroomAssignment(assignment.id)
    assignments.value = assignments.value.filter((item) => item.id !== assignment.id)
    assignmentToRemove.value = null
  } catch (error) {
    assignmentActionError.value = error instanceof ClassroomError && error.code === 'not_found'
      ? t('classroom.manageItemNotFound')
      : t(classroomErrorKey(error))
  } finally {
    assignmentActionBusy.value = false
  }
}
</script>
