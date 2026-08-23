<template>
  <main class="min-h-[calc(100vh-4rem)] bg-white pb-32 text-slate-950 dark:bg-slate-950 dark:text-white">
    <div class="mx-auto max-w-[1280px] px-8 py-10">
      <div v-if="loading" class="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-900">
        {{ t('common.loading') }}
      </div>
      <div v-else-if="loadError" class="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p class="text-sm text-red-700 dark:text-red-300" role="alert">{{ loadError }}</p>
        <AppButton class="mt-4" variant="white" @click="loadPage">{{ t('classroom.retry') }}</AppButton>
      </div>

      <template v-else-if="classroom">
        <header class="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ classroom.name }}</p>
            <h1 class="mt-1 text-4xl font-semibold">{{ t('classroom.assignSet') }}</h1>
            <p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{{ t('classroom.assignSetDescription') }}</p>
          </div>
          <AppButton variant="white" to="/teacher">{{ t('classroom.backToDashboard') }}</AppButton>
        </header>

        <p v-if="successMessage" class="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200" role="status">
          {{ successMessage }}
        </p>

        <div class="mt-8 grid items-start gap-7 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <section class="min-h-[calc(100vh-17rem)] rounded-xl border border-slate-200 bg-white p-[26px] shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="assign-library-title">
            <h2 id="assign-library-title" class="text-[22px] font-semibold">{{ t('classroom.chooseAssignment') }}</h2>
            <p class="mt-1 text-[15px] text-slate-600 dark:text-slate-300">{{ t('classroom.chooseAssignmentDescription') }}</p>

            <div class="mt-7 grid w-full max-w-[360px] grid-cols-2 rounded-[14px] border border-slate-300 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-950" role="tablist" :aria-label="t('home.libraryType')">
              <button
                v-for="tab in libraryTabs"
                :key="tab.value"
                type="button"
                role="tab"
                :aria-selected="activeKind === tab.value"
                class="h-10 rounded-xl px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                :class="activeKind === tab.value ? 'bg-neutral-800 text-white shadow-sm dark:bg-slate-700' : 'text-slate-950 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-900'"
                @click="activeKind = tab.value"
              >
                {{ t(tab.label) }}
              </button>
            </div>

            <p v-if="visibleItems.length === 0" class="mt-7 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              {{ t('classroom.noAssignableItems') }}
            </p>
            <ul v-else class="mt-7 space-y-3">
              <li v-for="item in visibleItems" :key="itemKey(item)">
                <button
                  type="button"
                  :disabled="isAlreadyAssigned(item)"
                  class="group flex min-h-[82px] w-full items-center gap-5 rounded-lg border p-4 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  :class="isAlreadyAssigned(item)
                    ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-60 dark:border-slate-800 dark:bg-slate-900'
                    : selectedKey === itemKey(item)
                    ? 'border-slate-950 bg-slate-100 ring-1 ring-slate-950 dark:border-white dark:bg-slate-900 dark:ring-white'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900'"
                  :aria-pressed="selectedKey === itemKey(item)"
                  @click="selectItem(item)"
                >
                  <img :src="setIconSrc(item.iconKey)" :style="setIconToneStyle(item.iconTone)" alt="" class="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <span class="min-w-0 flex-1">
                    <span class="block truncate font-medium">{{ item.title }}</span>
                    <span class="mt-1 block truncate text-sm text-slate-600 dark:text-slate-300">
                      {{ item.kind === 'set' ? t('classroom.cardCount', { count: item.cardCount }) : t('home.studyGuide') }}
                      <span aria-hidden="true"> · </span>{{ formatDate(item.createdAt) }}
                    </span>
                  </span>
                  <span v-if="isAlreadyAssigned(item)" class="shrink-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {{ t('classroom.alreadyAssigned') }}
                  </span>
                  <span class="flex h-6 w-6 items-center justify-center rounded-full border" :class="selectedKey === itemKey(item) ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950' : 'border-slate-300 dark:border-slate-700'" aria-hidden="true">
                    <svg v-if="selectedKey === itemKey(item)" viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 10 3 3 7-7" /></svg>
                  </span>
                </button>
              </li>
            </ul>
          </section>

          <section class="rounded-xl border border-slate-200 bg-white p-[26px] shadow-sm dark:border-slate-800 dark:bg-slate-950" aria-labelledby="assign-create-title">
            <h2 id="assign-create-title" class="text-[22px] font-semibold">{{ t('home.create') }}</h2>
            <p class="mt-1 text-[15px]">{{ t('home.chooseMode') }}</p>
            <div class="mt-8 grid gap-3">
              <NuxtLink v-for="mode in createModes" :key="mode.to" :to="mode.to" class="group flex min-h-[70px] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900">
                <img :src="mode.icon" alt="" class="h-12 w-12 shrink-0 rounded-xl object-cover" />
                <span class="min-w-0 flex-1"><span class="block text-sm font-medium">{{ t(mode.label) }}</span><span class="mt-1 block text-xs">{{ t(mode.hint) }}</span></span>
                <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </section>
        </div>
      </template>
    </div>

    <div v-if="selectedItem" class="fixed bottom-6 end-24 z-40 max-w-[min(28rem,calc(100vw-8rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <p v-if="assignError" class="mb-3 px-2 text-sm text-red-700 dark:text-red-300" role="alert">{{ assignError }}</p>
      <AppButton size="lg" :busy="assignBusy" @click="assignSelected">
        {{ t('classroom.assign') }}
      </AppButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import basicIcon from '~/assets/icons/create-basic.png'
import synthesizeIcon from '~/assets/icons/create-synthesize.png'
import generateIcon from '~/assets/icons/create-generate.png'
import {
  assignLocalItemToClass,
  classroomErrorKey,
  getAccountRole,
  getClassroom,
  listClassroomAssignments,
  type Classroom,
} from '~/src/composables/classrooms'
import { createSetsRepo, createStudyGuidesRepo, useTracerDb } from '~/src/composables/db'
import type { FlashcardSetListItem, Uuid } from '~/src/composables/db/types'
import { useAppLanguage } from '~/src/composables/language'
import { setIconSrc, setIconToneStyle } from '~/src/composables/set-icons'
import { hasTauriRuntime } from '~/src/composables/tauri'

type AssignmentPickerItem = {
  kind: 'set' | 'study-guide'
  id: Uuid
  setId: Uuid
  title: string
  iconKey: string | null
  iconTone: string | null
  cardCount: number
  createdAt: string
}

const route = useRoute()
const router = useRouter()
const { language, t } = useAppLanguage()
const loading = ref(true)
const loadError = ref<string | null>(null)
const classroom = ref<Classroom | null>(null)
const items = ref<AssignmentPickerItem[]>([])
const assignedSourceKeys = ref<Set<string>>(new Set())
const activeKind = ref<'set' | 'study-guide'>('set')
const selectedItem = ref<AssignmentPickerItem | null>(null)
const clientRequestId = ref<string | null>(null)
const assignBusy = ref(false)
const assignError = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const classId = computed(() => String(route.params.id ?? ''))
const selectedKey = computed(() => selectedItem.value ? itemKey(selectedItem.value) : '')
const visibleItems = computed(() => items.value.filter((item) => item.kind === activeKind.value))
const libraryTabs = [
  { value: 'set' as const, label: 'home.flashcards' },
  { value: 'study-guide' as const, label: 'home.studyGuides' },
]
const createModes = [
  { to: '/create/basic', label: 'home.basic', hint: 'home.basicHint', icon: basicIcon },
  { to: '/create/synthesize', label: 'home.synthesize', hint: 'home.synthesizeHint', icon: synthesizeIcon },
  { to: '/create/generate', label: 'home.generate', hint: 'home.generateHint', icon: generateIcon },
]

onMounted(loadPage)
watch(classId, loadPage)

function itemKey(item: AssignmentPickerItem) {
  return `${item.kind}:${item.id}`
}

function assignmentSourceKey(item: Pick<AssignmentPickerItem, 'kind' | 'setId'>) {
  return `${item.kind}:${item.setId}`
}

function isAlreadyAssigned(item: AssignmentPickerItem) {
  return assignedSourceKeys.value.has(assignmentSourceKey(item))
}

function formatDate(iso: string) {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? iso : new Intl.DateTimeFormat(language.value, { dateStyle: 'medium' }).format(date)
}

function selectItem(item: AssignmentPickerItem) {
  if (isAlreadyAssigned(item)) return
  selectedItem.value = selectedKey.value === itemKey(item) ? null : item
  clientRequestId.value = selectedItem.value ? crypto.randomUUID() : null
  assignError.value = null
  successMessage.value = null
}

async function loadPage() {
  loading.value = true
  loadError.value = null
  try {
    if (!hasTauriRuntime()) throw new Error(t('classroom.assignmentDesktopRequired'))
    const role = await getAccountRole()
    if (role !== 'teacher') {
      await router.replace('/')
      return
    }
    const [nextClassroom, assignments, db] = await Promise.all([
      getClassroom(classId.value),
      listClassroomAssignments(classId.value),
      useTracerDb(),
    ])
    const setsRepo = createSetsRepo(db)
    const guidesRepo = createStudyGuidesRepo(db)
    const sets = await setsRepo.list()
    const nextItems: AssignmentPickerItem[] = []
    const guides = await Promise.all(sets.map((set) => guidesRepo.getBySetId(set.id)))
    for (const [index, set] of sets.entries()) {
      nextItems.push(toSetItem(set))
      const guide = guides[index]
      if (guide) {
        nextItems.push({
          kind: 'study-guide',
          id: guide.id,
          setId: set.id,
          title: `${t('home.studyGuide')} · ${set.title}`,
          iconKey: set.iconKey ?? null,
          iconTone: set.iconTone ?? null,
          cardCount: set.cardCount,
          createdAt: guide.createdAt,
        })
      }
    }
    classroom.value = nextClassroom
    items.value = nextItems
    assignedSourceKeys.value = new Set(assignments
      .filter((assignment) => assignment.localSetId)
      .map((assignment) => `${assignment.kind}:${assignment.localSetId}`))
    if (selectedItem.value && isAlreadyAssigned(selectedItem.value)) {
      selectedItem.value = null
      clientRequestId.value = null
    }
  } catch (error) {
    loadError.value = error instanceof Error && !(error as { code?: unknown }).code
      ? error.message
      : t(classroomErrorKey(error))
  } finally {
    loading.value = false
  }
}

function toSetItem(set: FlashcardSetListItem): AssignmentPickerItem {
  return {
    kind: 'set',
    id: set.id,
    setId: set.id,
    title: set.title,
    iconKey: set.iconKey ?? null,
    iconTone: set.iconTone ?? null,
    cardCount: set.cardCount,
    createdAt: set.updatedAt || set.createdAt,
  }
}

async function assignSelected() {
  const item = selectedItem.value
  const requestId = clientRequestId.value
  if (!item || !requestId || !classroom.value) return
  assignBusy.value = true
  assignError.value = null
  successMessage.value = null
  try {
    const db = await useTracerDb()
    const set = await createSetsRepo(db).get(item.setId)
    if (!set) throw new Error(t('classroom.localSetMissing'))
    const guide = item.kind === 'study-guide'
      ? await createStudyGuidesRepo(db).getBySetId(item.setId)
      : null
    await assignLocalItemToClass({
      classId: classroom.value.id,
      kind: item.kind,
      set,
      studyGuide: guide,
      assignmentTitle: item.title,
      clientRequestId: requestId,
    })
    assignedSourceKeys.value = new Set([...assignedSourceKeys.value, assignmentSourceKey(item)])
    successMessage.value = t('classroom.assignedSuccess', { name: item.title, className: classroom.value.name })
    selectedItem.value = null
    clientRequestId.value = null
  } catch (error) {
    assignError.value = error instanceof Error && !(error as { code?: unknown }).code
      ? error.message
      : t(classroomErrorKey(error))
  } finally {
    assignBusy.value = false
  }
}
</script>
