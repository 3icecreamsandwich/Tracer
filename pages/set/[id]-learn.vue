<template>
  <AiErrorModal
    :open="aiErrorOpen"
    :error="aiError"
    :from="route.fullPath"
    :show-retry="true"
    @close="aiErrorOpen = false"
    @retry="retryPracticeWrittenAnswer"
  />
  <main
    class="tracer-fullscreen-study practice-fullscreen bg-white dark:bg-slate-950"
  >
    <!-- Header with Back button and progress -->
    <div
      data-tauri-drag-region
      class="bg-white px-3 py-4 dark:bg-slate-950 sm:px-6"
    >
      <div
        class="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4"
      >
        <BackButton
          class="justify-self-start"
          native-window-controls-safe
          compact-on-mobile
        />
        <FullscreenStudyModePicker mode="learn" @select="openStudyMode" />
        <div class="flex items-center justify-self-end gap-2">
          <span
            v-if="practiceTimed && !learnIsFinished"
            class="rounded-[var(--tracer-radius-control)] bg-amber-50 px-2.5 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
            >{{ practiceTimerText }}</span
          >
          <p class="text-sm font-medium text-slate-600 dark:text-slate-300">
            {{ learnRatioText }}
          </p>
          <UButton
            color="primary"
            variant="soft"
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-[var(--tracer-radius-control)] border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="practiceAnswerBusy"
            :aria-expanded="practiceSettingsOpen"
            aria-label="Practice settings"
            title="Practice settings"
            @click="openPracticeSettings"
            @keydown.esc="practiceSettingsOpen = false"
          >
            <AppIcon name="settings" :size="20" :stroke-width="1.8" />
          </UButton>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div
      class="tracer-fullscreen-content relative flex flex-1 -translate-y-[4vh] flex-col items-center justify-center px-6 py-8"
    >
      <button
        v-if="practiceSettingsOpen"
        type="button"
        class="fixed inset-0 z-40 bg-transparent"
        aria-label="Dismiss practice settings"
        @click="practiceSettingsOpen = false"
      />
      <div
        v-if="practiceSettingsOpen"
        class="absolute right-6 top-4 z-50 w-72 max-w-[calc(100vw-2rem)] max-h-[min(78dvh,34rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-950"
        role="dialog"
        aria-label="Practice and test settings"
        @keydown.esc="practiceSettingsOpen = false"
      >
        <PracticeSettingsMenu
          v-model:session-mode="practiceSessionMode"
          v-model:question-count="practiceQuestionCount"
          v-model:shuffle="practiceShuffle"
          v-model:timed="practiceTimed"
          v-model:minutes="practiceTimeLimitMinutes"
          :choices="practiceQuestionTypeChoices"
          :question-types="practiceQuestionTypes"
          :question-limit="practiceQuestionLimit"
          :busy="learnBusy || enabledPracticeQuestionTypes().length === 0"
          @toggle-type="togglePracticeQuestionType"
          @clamp-count="clampPracticeQuestionCount"
          @close="practiceSettingsOpen = false"
          @apply="applyPracticeSettings"
        />
      </div>

      <p v-if="learnError" class="text-sm text-red-700 dark:text-red-300">
        {{ learnError }}
      </p>

      <LoadingSpinner v-if="learnBusy" screen label="Preparing questions…" />

      <!-- Results -->
      <div v-else-if="learnIsFinished" class="w-full max-w-6xl select-none">
        <div
          class="flex flex-col items-center justify-center text-center"
        >
          <StudyResultOverview mode="learn" :set-id="set?.id" :published="isPublishedSet" :correct="learnCorrectCount" :attempted="learnAttemptedCount" :total="learnQuestions.length" :missed="(set?.terms ?? []).filter(term => learnQuestions.some(question => question.termId === term.id && learnAnswersByQuestionId[question.id] === false))"  :back-to="backToSetPath" @restart="applyPracticeSettings" :resume="learnQuestions.some(question => learnAnswersByQuestionId[question.id] === false)" @resume="reviewMissedPractice" />
<p v-if="practiceTimedOut" class="mt-2 text-sm text-amber-700 dark:text-amber-300">Time is up. Unanswered questions were counted as missed.</p>

        </div>
      </div>

      <!-- Question -->
      <div
        v-else-if="!learnCurrentQuestion"
        class="rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {{ t("set.noQuestions") }}
      </div>

      <div v-else class="flex w-full max-w-5xl flex-col">
        <div
          class="tracer-practice-card relative flex min-h-[clamp(20rem,55dvh,34rem)] flex-col p-6 sm:p-8"
          :class="[
            practiceQuestionSurfaceClass(),
            {
              'animate-slide-left': learnIsNavigating,
            },
          ]"
        >
          <button v-if="practiceAnswerFeedback && practiceAnswerFeedback.selected !== practiceAnswerFeedback.correct && !learnIsNavigating" type="button" class="absolute bottom-3 right-3 z-10 inline-flex h-10 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500" aria-label="Next question" title="Next question" @click="continueAfterWrongChoice"><ArrowRight :size="20" /></button>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
            {{ t("set.question") }}
          </p>
          <div
            class="mt-4 text-3xl font-medium text-slate-900 dark:text-slate-50"
          >
            <MarkdownRenderer
              :markdown="practiceQuestionPrompt(learnCurrentQuestion)"
              variant="flashcard"
            />
          </div>

          <div
            class="mt-4 grid flex-1 gap-3"
            :class="
              learnCurrentQuestion.kind === 'true_false' || learnCurrentQuestion.kind === 'multiple_choice' ? 'grid-cols-2' : ''
            "
          >
            <template v-if="learnCurrentQuestion.kind === 'true_false'">
              <UButton
                color="primary"
                variant="soft"
                type="button"
                class="tracer-practice-choice tracer-practice-choice--true-false"
                :class="practiceTrueFalseChoiceClass(true)"
                :disabled="learnBusy || practiceAnswerBusy"
                @click="answerLearnTrueFalse(true)"
              >
                {{ t("common.true") }} <component :is="practiceAnswerFeedback.correct === true ? Check : X" v-if="practiceAnswerFeedback?.questionId === learnCurrentQuestion.id && practiceAnswerFeedback.selected === true" :class="practiceAnswerFeedback.correct === true ? 'text-emerald-600' : 'text-orange-600'" :size="28" :stroke-width="2.8" class="absolute left-3 top-3" aria-hidden="true" />
              </UButton>
              <UButton
                color="primary"
                variant="soft"
                type="button"
                class="tracer-practice-choice tracer-practice-choice--true-false"
                :class="practiceTrueFalseChoiceClass(false)"
                :disabled="learnBusy || practiceAnswerBusy"
                @click="answerLearnTrueFalse(false)"
              >
                {{ t("common.false") }} <component :is="practiceAnswerFeedback.correct === false ? Check : X" v-if="practiceAnswerFeedback?.questionId === learnCurrentQuestion.id && practiceAnswerFeedback.selected === false" :class="practiceAnswerFeedback.correct === false ? 'text-emerald-600' : 'text-orange-600'" :size="28" :stroke-width="2.8" class="absolute left-3 top-3" aria-hidden="true" />
              </UButton>
            </template>

            <template
              v-else-if="learnCurrentQuestion.kind === 'multiple_choice'"
            >
              <UButton
                color="neutral"
                variant="soft"
                v-for="(opt, idx) in learnCurrentQuestion.options"
                :key="`${learnCurrentQuestion.id}:${idx}`"
                type="button"
                class="tracer-practice-choice tracer-practice-choice--multiple-choice min-h-0 w-full"
                :class="practiceMultipleChoiceClass(idx)"
                :disabled="learnBusy || practiceAnswerBusy"
                @click="answerLearnMultipleChoice(idx)"
              >
                <MarkdownRenderer :markdown="opt" variant="compact" /><component :is="practiceAnswerFeedback.correct === idx ? Check : X" v-if="practiceAnswerFeedback?.questionId === learnCurrentQuestion.id && practiceAnswerFeedback.selected === idx" :class="practiceAnswerFeedback.correct === idx ? 'text-emerald-600' : 'text-orange-600'" :size="28" :stroke-width="2.8" class="absolute left-3 top-3" aria-hidden="true" />
              </UButton>
            </template>
            <form
              v-else
              class="grid gap-2"
              @submit.prevent="
                answerLearnWritten(defaultModelId === 'builtin:auto')
              "
            >
              <label for="fullscreen-written-answer" class="sr-only">
                Your answer
              </label>
              <div class="flex flex-wrap items-end gap-4">
                <UTextarea
                  id="fullscreen-written-answer"
                  v-model="practiceWrittenAnswer"
                  :rows="1"
                  autofocus
                  class="min-w-0 flex-1 resize-none"
                  placeholder="Type your answer…"
                  :disabled="
                    practiceAnswerBusy || Boolean(practiceWrittenFeedback)
                  "
                />
                <UButton
                  color="primary"
                  variant="soft"
                  type="submit"
                  class="inline-flex h-12 shrink-0 items-center rounded-[var(--tracer-radius-control)] border border-slate-950 bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                  :disabled="
                    !practiceWrittenAnswer.trim() ||
                    practiceAnswerBusy ||
                    Boolean(practiceWrittenFeedback)
                  "
                >
                  <LoadingSpinner
                    v-if="practiceAnswerBusy"
                    size="sm"
                    label="Checking…"
                  />
                  <template v-else>Check</template>
                </UButton>
              </div>
            </form>
          </div>
        </div>

        <div
          v-if="practiceWrittenFeedback"
          class="mt-3 rounded-[var(--tracer-radius-surface)] border p-4 shadow-sm"
          :class="
            practiceWrittenFeedback.isCorrect
              ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100'
              : 'border-red-300 bg-red-50/80 text-red-950 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100'
          "
        >
          <p class="text-sm font-semibold">
            {{ practiceWrittenFeedback.isCorrect ? "Correct" : "Not quite" }}
          </p>
          <p class="mt-1 text-sm">
            {{ practiceWrittenFeedback.explanation }}
          </p>
          <div class="mt-3 flex justify-end">
            <UButton
              color="primary"
              variant="soft"
              type="button"
              class="rounded-[var(--tracer-radius-control)] bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              :disabled="practiceAnswerBusy"
              @click="continueAfterWrittenFeedback"
>
              Continue
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Check from "@lucide/vue/dist/esm/icons/check.mjs"
import X from "@lucide/vue/dist/esm/icons/x.mjs"
import ArrowRight from "@lucide/vue/dist/esm/icons/arrow-right.mjs"
import { recordStudySession } from "~/src/composables/study-insights"
import {
  generatePracticeQuestionsText,
  mixPracticeQuestions,
} from "~/src/composables/ai/practice"
import { isWebPreviewRuntime } from "~/src/composables/platform/web"
definePageMeta({ hideNavbar: true })

import MarkdownRenderer from "~/components/MarkdownRenderer.vue"
import type { FlashcardSet, Uuid } from "~/src/composables/db/types"
import {
  createProfileRepo,
  createSettingsRepo,
  createSetsRepo,
  useTracerDb,
} from "~/src/composables/db"
import { lockGetStatus } from "~/src/composables/lock"
import { useLockSession } from "~/src/composables/lock-session"
import { hasTauriRuntime } from "~/src/composables/tauri"
import {
  loadPracticeProgress,
  savePracticeProgress,
  type PracticeProgress,
} from "~/src/composables/practice-progress"
import {
  generateLearnQuestionsWithFallback,
  type LearnQuestion,
  type LearnQuestionKind,
} from "~/src/composables/learn/generator"
import {
  createPracticePresentation,
  practiceQuestionPrompt,
  type PracticeChoiceFeedback,
  type PracticeChoiceValue,
} from "~/src/composables/learn/presentation"
import {
  aiErrorForMissingDefaultModel,
  normalizeAiError,
  type AiErrorUx,
} from "~/src/composables/ai/ux-errors"
import {
  gradeWebPreviewWrittenAnswer,
  gradeWrittenAnswer,
  type WrittenAnswerGrade,
  type WrittenAnswerGradeInput,
} from "~/src/composables/ai/written-answer-grader"
import { useAppLanguage } from "~/src/composables/language"
import { createWebPreviewDemoSet } from "~/src/composables/demo-content"
import {
  getPublishedSet,
  publishedSetToStudySet,
} from "~/src/composables/published-sets"
import {
  beginAssignedAttempt,
  completeAssignedAttempt,
  parseAssignedAssignmentId,
} from "~/src/composables/assignment-progress"
import { createRandomSeed } from "~/src/composables/random"

const route = useRoute()
const router = useRouter()
const { language, t } = useAppLanguage()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()

const isPublishedSet = computed(() => route.query.published === "1")
const isDemoSet = computed(
  () => isWebPreviewRuntime() || route.params.id === "demo",
)
const isWebPreview = computed(() => isPublishedSet.value || isDemoSet.value)
const assignedAssignmentId = computed(() =>
  parseAssignedAssignmentId(route.query.assignment),
)
const backToSetPath = computed(() => {
  if (isPublishedSet.value && set.value) return `/public-sets/${set.value.id}`
  const classroomId =
    typeof route.query.class === "string" ? route.query.class : null
  return assignedAssignmentId.value && classroomId && set.value
    ? `/student/classes/${classroomId}`
    : set.value
      ? `/set/${set.value.id}`
      : "/"
})

function openStudyMode(path: string) {
  void router.push(path)
}

function beginClassroomPractice() {
  if (!set.value) return
  beginAssignedAttempt({
    assignmentId: assignedAssignmentId.value,
    setId: set.value.id,
    mode: "practice",
  })
}

let assignedSessionFinished = false
const assignedSessionCorrect = ref(0)
const assignedSessionAttempted = ref(0)

function finishClassroomPractice() {
  if (assignedSessionFinished || !set.value) return
  assignedSessionFinished = true
  void recordStudySession({
    setId: set.value.id,
    mode: "practice",
    startedAt: insightStartedAt,
    correct: assignedSessionCorrect.value,
    attempted: assignedSessionAttempted.value,
  }).catch(() => {})
  void completeAssignedAttempt({
    assignmentId: assignedAssignmentId.value,
    setId: set.value.id,
    mode: "practice",
    scoreEarned: assignedSessionCorrect.value,
    scorePossible: assignedSessionAttempted.value,
  })
}

const insightStartedAt = new Date().toISOString()

function onPageHide() {
  finishClassroomPractice()
}

const busy = ref(true)
const loadError = ref<string | null>(null)
const set = ref<FlashcardSet | null>(null)
const defaultModelId = ref<string | null>(null)
const fallbackModelIds = ref<string[]>([])
const learnHybridEnabled = ref(false)

const learnBusy = ref(false)
const learnError = ref<string | null>(null)

const learnRunCounter = ref(0)
const learnCursorIndex = ref(0)
const learnQuestions = ref<LearnQuestion[]>([])
const learnAnswersByQuestionId = ref<Record<string, boolean>>({})
const practiceProgressReady = ref(false)
const savedPracticeProgressSignature = ref<string | null>(null)
const practiceSettingsOpen = ref(false)
const practiceSessionChoices = ["practice", "test"] as const
const practiceQuestionTypeChoices: {
  kind: LearnQuestionKind
  label: string
}[] = [
  { kind: "multiple_choice", label: "Multiple choice" },
  { kind: "true_false", label: "True / false" },
  { kind: "written", label: "Written" },
]
const practiceSessionMode = ref<"practice" | "test">("practice")
const practiceQuestionTypes = reactive<Record<LearnQuestionKind, boolean>>({
  multiple_choice: true,
  true_false: true,
  written: true,
})
const practiceQuestionCount = ref(10)
const practiceShuffle = ref(true)
const practiceTimed = ref(false)
const practiceTimeLimitMinutes = ref(10)
const practiceSecondsRemaining = ref(10 * 60)
const practiceTimedOut = ref(false)
const practiceWrittenAnswer = ref("")
const practiceTimerHandle = shallowRef<number | null>(null)
const practiceAnswerFeedback = ref<PracticeChoiceFeedback | null>(null)
type PracticeWrittenFeedback = WrittenAnswerGrade & {
  questionId: string
}
const practiceWrittenFeedback = ref<PracticeWrittenFeedback | null>(null)
const lastPracticeWrittenInput = ref<
  (WrittenAnswerGradeInput & { questionId: string }) | null
>(null)
const practiceWrittenAbort = shallowRef<AbortController | null>(null)
const cachedWrittenModel = shallowRef<{ id: string; model: any } | null>(null)
const aiError = ref<AiErrorUx | null>(null)
const aiErrorOpen = ref(false)
const practiceAnswerBusy = ref(false)
const learnIsNavigating = ref(false)
const practiceAnswerTransitionId = ref(0)

const baseSeed = computed(() => {
  const raw = route.query.seed
  if (typeof raw !== "string") return null
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? n : null
})

function learnSeed() {
  const s = baseSeed.value
  if (s !== null) return s + learnRunCounter.value
  return createRandomSeed() ^ (learnRunCounter.value * 2654435761)
}

const learnAttemptedCount = computed(
  () => Object.keys(learnAnswersByQuestionId.value).length,
)
const learnCorrectCount = computed(
  () => Object.values(learnAnswersByQuestionId.value).filter((v) => v).length,
)
const learnIsFinished = computed(() => {
  const total = learnQuestions.value.length
  return total > 0 && learnAttemptedCount.value >= total
})

const learnRatioText = computed(() => {
  const total = learnQuestions.value.length
  if (total === 0) return "0/0"
  return `${Math.min(learnAttemptedCount.value + (learnIsFinished.value ? 0 : 1), total)}/${total}`
})

const learnAccuracyText = computed(() => {
  const attempted = learnAttemptedCount.value
  if (attempted <= 0) return "0%"
  const pct = Math.round((learnCorrectCount.value / attempted) * 100)
  return `${pct}% (${learnCorrectCount.value}/${attempted})`
})

const learnCurrentQuestion = computed(() => {
  if (learnIsFinished.value) return null
  return learnQuestions.value[learnCursorIndex.value] ?? null
})

const practiceQuestionLimit = computed(() => {
  const terms = set.value?.terms.length ?? 1
  return Math.max(1, terms)
})

const practiceTimerText = computed(() => {
  const seconds = Math.max(0, practiceSecondsRemaining.value)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
})

function enabledPracticeQuestionTypes(): LearnQuestionKind[] {
  return (Object.keys(practiceQuestionTypes) as LearnQuestionKind[]).filter(
    (kind) => practiceQuestionTypes[kind],
  )
}

function clampPracticeQuestionCount() {
  const next = Math.round(Number(practiceQuestionCount.value) || 1)
  practiceQuestionCount.value = Math.min(
    practiceQuestionLimit.value,
    Math.max(1, next),
  )
}

function togglePracticeQuestionType(kind: LearnQuestionKind) {
  if (
    practiceQuestionTypes[kind] &&
    enabledPracticeQuestionTypes().length === 1
  ) {
    learnError.value = "Choose at least one question type."
    return
  }
  practiceQuestionTypes[kind] = !practiceQuestionTypes[kind]
  practiceQuestionCount.value = Math.min(
    practiceQuestionCount.value,
    practiceQuestionLimit.value,
  )
  learnError.value = null
}

function clearPracticeTimer() {
  if (practiceTimerHandle.value !== null) {
    window.clearInterval(practiceTimerHandle.value)
    practiceTimerHandle.value = null
  }
}

function openPracticeSettings() {
  practiceSettingsOpen.value = !practiceSettingsOpen.value
  if (practiceSettingsOpen.value) {
    clampPracticeQuestionCount()
  }
}

function expirePracticeSession() {
  cancelPracticeAnswerFeedback()
  clearPracticeTimer()
  practiceTimedOut.value = true
  const answers = { ...learnAnswersByQuestionId.value }
  for (const question of learnQuestions.value) {
    if (answers[question.id] === undefined) answers[question.id] = false
  }
  learnAnswersByQuestionId.value = answers
}

function startPracticeTimer() {
  clearPracticeTimer()
  practiceTimedOut.value = false
  practiceSecondsRemaining.value = practiceTimeLimitMinutes.value * 60
  if (!practiceTimed.value) return
  practiceTimerHandle.value = window.setInterval(() => {
    practiceSecondsRemaining.value -= 1
    if (practiceSecondsRemaining.value <= 0) expirePracticeSession()
  }, 1000)
}

function learnFindNextUnattempted(fromIndex: number) {
  const list = learnQuestions.value
  if (list.length === 0) return null
  const answered = learnAnswersByQuestionId.value
  for (let step = 0; step < list.length; step += 1) {
    const idx = (fromIndex + step) % list.length
    const q = list[idx]
    if (!q) continue
    if (answered[q.id] === undefined) return idx
  }
  return null
}

function learnMarkAnswered(questionId: string, isCorrect: boolean) {
  if (learnAnswersByQuestionId.value[questionId] === undefined) {
    assignedSessionAttempted.value += 1
    if (isCorrect) assignedSessionCorrect.value += 1
  }
  learnAnswersByQuestionId.value = {
    ...learnAnswersByQuestionId.value,
    [questionId]: isCorrect,
  }
  const next = learnFindNextUnattempted(learnCursorIndex.value + 1)
  if (next === null) {
    clearPracticeTimer()
    return
  }
  learnCursorIndex.value = next
}

const {
  practiceTrueFalseChoiceClass,
  practiceMultipleChoiceClass,
  practiceQuestionSurfaceClass,
} = createPracticePresentation({
  getQuestion: () => learnCurrentQuestion.value,
  getChoiceFeedback: () => practiceAnswerFeedback.value,
  getWrittenFeedback: () => practiceWrittenFeedback.value,
})

function waitForFeedback(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

function cancelPracticeAnswerFeedback() {
  practiceAnswerTransitionId.value += 1
  practiceWrittenAbort.value?.abort()
  practiceWrittenAbort.value = null
  practiceAnswerFeedback.value = null
  practiceWrittenFeedback.value = null
  lastPracticeWrittenInput.value = null
  practiceAnswerBusy.value = false
  learnIsNavigating.value = false
}

async function submitPracticeChoice(
  questionId: string,
  selected: PracticeChoiceValue,
  correct: PracticeChoiceValue,
) {
  if (practiceAnswerBusy.value) return
  const transitionId = ++practiceAnswerTransitionId.value
  const isCorrect = selected === correct
  practiceAnswerFeedback.value = { questionId, selected, correct }
  practiceAnswerBusy.value = true

  if (!isCorrect) return
  await waitForFeedback(750)
  if (transitionId !== practiceAnswerTransitionId.value) return

  learnIsNavigating.value = true
  await waitForFeedback(250)
  if (transitionId !== practiceAnswerTransitionId.value) return

  learnMarkAnswered(questionId, isCorrect)
  practiceAnswerFeedback.value = null
  practiceAnswerBusy.value = false
  learnIsNavigating.value = false
}

async function continueAfterWrongChoice() {
  const feedback = practiceAnswerFeedback.value
  if (!feedback || feedback.selected === feedback.correct || learnIsNavigating.value) return
  const transitionId = practiceAnswerTransitionId.value
  learnIsNavigating.value = true
  await waitForFeedback(250)
  if (transitionId !== practiceAnswerTransitionId.value) return
  learnMarkAnswered(feedback.questionId, false)
  practiceAnswerFeedback.value = null
  practiceAnswerBusy.value = false
  learnIsNavigating.value = false
}

function answerLearnTrueFalse(value: boolean) {
  const q = learnCurrentQuestion.value
  if (!q || q.kind !== "true_false") return
  void submitPracticeChoice(q.id, value, q.answer)
}

function answerLearnMultipleChoice(selectedIndex: number) {
  const q = learnCurrentQuestion.value
  if (!q || q.kind !== "multiple_choice") return
  void submitPracticeChoice(q.id, selectedIndex, q.answerIndex)
}

async function getWrittenModel(modelId: string) {
  const route = [modelId, ...fallbackModelIds.value]
  const cacheId = route.join("\n")
  if (cachedWrittenModel.value?.id === cacheId) {
    return cachedWrittenModel.value.model
  }
  const { resolveAiModel } = await import("~/src/composables/ai/registry")
  const model = await resolveAiModel(route)
  cachedWrittenModel.value = { id: cacheId, model }
  return model
}

async function answerLearnWritten(useAi = false) {
  const q = learnCurrentQuestion.value
  if (
    !q ||
    q.kind !== "written" ||
    !practiceWrittenAnswer.value.trim() ||
    practiceAnswerBusy.value
  )
    return
  const input = {
    questionId: q.id,
    question: q.prompt,
    referenceAnswer: q.answer,
    studentAnswer: practiceWrittenAnswer.value.trim(),
  }
  if (defaultModelId.value === "builtin:auto" && !useAi) {
    practiceWrittenFeedback.value = {
      questionId: input.questionId,
      ...gradeWebPreviewWrittenAnswer(input),
    }
    return
  }
  lastPracticeWrittenInput.value = input
  await runPracticeWrittenGrade(input)
}

async function runPracticeWrittenGrade(
  input: WrittenAnswerGradeInput & { questionId: string },
) {
  if (practiceAnswerBusy.value) return
  const question = learnCurrentQuestion.value
  if (
    !question ||
    question.kind !== "written" ||
    question.id !== input.questionId
  )
    return

  const transitionId = ++practiceAnswerTransitionId.value
  const controller = new AbortController()
  practiceWrittenAbort.value?.abort()
  practiceWrittenAbort.value = controller
  practiceAnswerBusy.value = true
  practiceWrittenFeedback.value = null
  learnError.value = null
  aiError.value = null
  aiErrorOpen.value = false

  try {
    let grade: WrittenAnswerGrade
    if (isWebPreview.value) {
      await waitForFeedback(250)
      grade = gradeWebPreviewWrittenAnswer(input)
    } else {
      if (!defaultModelId.value) {
        aiError.value = aiErrorForMissingDefaultModel()
        aiErrorOpen.value = true
        return
      }
      grade = await gradeWrittenAnswer({
        model: await getWrittenModel(defaultModelId.value),
        input,
        abortSignal: controller.signal,
      })
    }

    if (
      controller.signal.aborted ||
      transitionId !== practiceAnswerTransitionId.value
    )
      return
    practiceWrittenFeedback.value = {
      questionId: input.questionId,
      ...grade,
    }
  } catch (error) {
    if (controller.signal.aborted) return
    aiError.value = normalizeAiError(error)
    aiErrorOpen.value = true
  } finally {
    if (practiceWrittenAbort.value === controller) {
      practiceWrittenAbort.value = null
    }
    if (
      !controller.signal.aborted &&
      transitionId === practiceAnswerTransitionId.value
    ) {
      practiceAnswerBusy.value = false
    }
  }
}

async function retryPracticeWrittenAnswer() {
  aiErrorOpen.value = false
  const input = lastPracticeWrittenInput.value
  if (!input) return
  await runPracticeWrittenGrade(input)
}

function handlePracticeEnter(event: KeyboardEvent) {
  if (event.key !== 'Enter' || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return
  if (practiceWrittenFeedback.value && !practiceAnswerBusy.value) {
    if (event.target instanceof HTMLElement && event.target.closest('button,a,input,select')) return
    event.preventDefault(); void continueAfterWrittenFeedback()
  }
  else if (event.target instanceof HTMLTextAreaElement && event.target.id === "fullscreen-written-answer" && !practiceAnswerBusy.value) { event.preventDefault(); void answerLearnWritten(defaultModelId.value === 'builtin:auto') }
}

async function continueAfterWrittenFeedback() {
  const feedback = practiceWrittenFeedback.value
  if (!feedback || practiceAnswerBusy.value) return
  const transitionId = ++practiceAnswerTransitionId.value
  practiceAnswerBusy.value = true
  learnIsNavigating.value = true
  await waitForFeedback(250)
  if (transitionId !== practiceAnswerTransitionId.value) return
  learnMarkAnswered(feedback.questionId, feedback.isCorrect)
  practiceWrittenAnswer.value = ""
  practiceWrittenFeedback.value = null
  lastPracticeWrittenInput.value = null
  practiceAnswerBusy.value = false
  learnIsNavigating.value = false
}

function parseLearnAugmentJson(raw: string): LearnQuestion[] {
  if (typeof raw !== "string") return []
  const text = raw.trim()
  if (!text) return []
  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    return []
  }
  const list = Array.isArray(data?.questions) ? data.questions : []
  const out: LearnQuestion[] = []
  for (let i = 0; i < list.length; i += 1) {
    const q = list[i]
    if (!q || typeof q !== "object") continue
    if (q.kind === "true_false") {
      const term = typeof q.term === "string" ? q.term.trim() : ""
      const def = typeof q.definition === "string" ? q.definition.trim() : ""
      const ans = typeof q.answer === "boolean" ? q.answer : null
      if (!term || !def || ans === null) continue
      out.push({
        id: `ai:tf:${i}:${term}`,
        kind: "true_false",
        prompt: `${term}: ${def}`,
        answer: ans,
        termId: "ai" as Uuid,
      })
      continue
    }
    if (q.kind === "multiple_choice") {
      const term = typeof q.term === "string" ? q.term.trim() : ""
      const choices = Array.isArray(q.choices)
        ? q.choices
            .filter((c: any) => typeof c === "string")
            .map((c: string) => c.trim())
        : []
      const answerIndex = Number.isFinite(q.answerIndex)
        ? Math.floor(q.answerIndex)
        : -1
      const unique = new Set(choices)
      if (!term || choices.length !== 4) continue
      if (unique.size !== 4) continue
      if (answerIndex < 0 || answerIndex >= 4) continue

      out.push({
        id: `ai:mc:${i}:${term}`,
        kind: "multiple_choice",
        prompt: term,
        options: choices,
        answerIndex,
        termId: "ai" as Uuid,
      })
    }
  }
  return out
}

async function buildLearnQuestionsForSet(s: FlashcardSet) {
  const seed = learnSeed()
  const selectedTypes = enabledPracticeQuestionTypes()
  const baseline = generateLearnQuestionsWithFallback(s.terms, {
    seed,
    maxQuestions: Math.min(
      practiceQuestionCount.value,
      practiceQuestionLimit.value,
    ),
    questionTypes: selectedTypes,
    shuffle: practiceShuffle.value,
  })
  if (!learnHybridEnabled.value) return baseline
  if (!defaultModelId.value) return baseline
  if (isWebPreview.value) return baseline

  learnBusy.value = true
  try {
    const [{ resolveAiModel }, { generateText }] = await Promise.all([
      import("~/src/composables/ai/registry"),
      import("ai"),
    ])
    const model = await resolveAiModel([
      defaultModelId.value,
      ...fallbackModelIds.value,
    ])
    const generated = await generatePracticeQuestionsText(model, {
      title: s.title,
      description: s.description,
      terms: s.terms.map((t) => ({ front: t.front, back: t.back })),
      count: 10,
    })
    const extra = parseLearnAugmentJson(generated).filter((question) =>
      selectedTypes.includes(question.kind),
    )
    return mixPracticeQuestions(baseline, extra).slice(
      0,
      Math.min(practiceQuestionCount.value, practiceQuestionLimit.value),
    )
  } catch {
    return baseline
  } finally {
    learnBusy.value = false
  }
}

async function startLearnRun(options?: {
  resetCounter?: boolean
  startTimer?: boolean
}) {
  cancelPracticeAnswerFeedback()
  const s = set.value
  if (!s) return
  if (options?.resetCounter) learnRunCounter.value = 0
  learnError.value = null
  learnBusy.value = true
  try {
    const list = await buildLearnQuestionsForSet(s)
    learnQuestions.value = list
    learnCursorIndex.value = 0
    learnAnswersByQuestionId.value = {}
    practiceWrittenAnswer.value = ""
    if (options?.startTimer && list.length > 0) startPracticeTimer()
  } catch {
    learnError.value = "Failed to generate questions."
    learnQuestions.value = []
    learnCursorIndex.value = 0
    learnAnswersByQuestionId.value = {}
  } finally {
    learnBusy.value = false
  }
}

function currentPracticeProgress(): PracticeProgress | null {
  const currentSet = set.value
  if (!currentSet || learnQuestions.value.length === 0) return null
  return {
    setUpdatedAt: currentSet.updatedAt,
    currentQuestionId: learnCurrentQuestion.value?.id ?? null,
    questions: learnQuestions.value,
    answersByQuestionId: learnAnswersByQuestionId.value,
  }
}

function persistPracticeRun() {
  if (!practiceProgressReady.value) return
  const currentSet = set.value
  const progress = currentPracticeProgress()
  if (!currentSet || !progress) return
  const signature = JSON.stringify(progress)
  if (signature === savedPracticeProgressSignature.value) return
  savedPracticeProgressSignature.value = signature
  void savePracticeProgress(currentSet.id, progress, isWebPreview.value).catch(
    () => {},
  )
}

function reviewMissedPractice() {
  const missed = learnQuestions.value.filter(question => learnAnswersByQuestionId.value[question.id] === false)
  if (!missed.length) return
  cancelPracticeAnswerFeedback()
  clearPracticeTimer()
  practiceTimedOut.value = false
  learnQuestions.value = missed
  learnAnswersByQuestionId.value = {}
  learnCursorIndex.value = 0
  practiceWrittenAnswer.value = ""
  persistPracticeRun()
}

async function initializePracticeRun() {
  const currentSet = set.value
  if (!currentSet) return
  practiceProgressReady.value = false
  const saved = await loadPracticeProgress(currentSet.id, isWebPreview.value)
  if (
    saved &&
    (isWebPreview.value || saved.setUpdatedAt === currentSet.updatedAt) &&
    saved.questions.length > 0 &&
    saved.questions.some(question => saved.answersByQuestionId[question.id] === undefined)
  ) {
    const questionIds = new Set(saved.questions.map((question) => question.id))
    learnQuestions.value = saved.questions
    learnAnswersByQuestionId.value = Object.fromEntries(
      Object.entries(saved.answersByQuestionId).filter(([questionId]) =>
        questionIds.has(questionId),
      ),
    )
    const savedIndex = saved.currentQuestionId
      ? saved.questions.findIndex(
          (question) => question.id === saved.currentQuestionId,
        )
      : -1
    const firstUnansweredIndex = saved.questions.findIndex(
      (question) => learnAnswersByQuestionId.value[question.id] === undefined,
    )
    learnCursorIndex.value =
      savedIndex >= 0
        ? savedIndex
        : firstUnansweredIndex >= 0
          ? firstUnansweredIndex
          : 0
    savedPracticeProgressSignature.value = JSON.stringify(
      currentPracticeProgress(),
    )
    practiceProgressReady.value = true
    return
  }

  await startLearnRun({ resetCounter: true })
  savedPracticeProgressSignature.value = null
  practiceProgressReady.value = true
  persistPracticeRun()
}

function applyPracticeSettings() {
  practiceSettingsOpen.value = false
  if (practiceSessionMode.value === "test") {
    const currentSet = set.value
    if (!currentSet) return
    clampPracticeQuestionCount()
    void router.push({
      name: "set-id-test",
      params: { id: currentSet.id },
      query: {
        published: isPublishedSet.value ? "1" : undefined,
        assignment: assignedAssignmentId.value ?? undefined,
        class:
          typeof route.query.class === "string" ? route.query.class : undefined,
        types: enabledPracticeQuestionTypes().join(","),
        count: String(practiceQuestionCount.value),
        shuffle: practiceShuffle.value ? "1" : "0",
        timed: practiceTimed.value ? "1" : "0",
        minutes: String(practiceTimeLimitMinutes.value),
        seed: String(learnSeed()),
      },
    })
    return
  }
  learnRunCounter.value += 1
  void startLearnRun({ startTimer: true })
  beginClassroomPractice()
}

async function loadSet(setId: Uuid) {
  busy.value = true
  loadError.value = null
  try {
    const db = await useTracerDb()
    set.value = await createSetsRepo(db).get(setId)
  } catch {
    loadError.value = "Failed to load set."
  } finally {
    busy.value = false
  }
}

watch(language, async () => {
  if (!isDemoSet.value) return
  set.value = createWebPreviewDemoSet(t)
  await startLearnRun({ resetCounter: true })
})

watch(learnCurrentQuestion, () => {
  practiceWrittenAnswer.value = ""
})

watch(
  () => {
    const progress = currentPracticeProgress()
    return progress ? JSON.stringify(progress) : null
  },
  () => persistPracticeRun(),
  { flush: "post" },
)

watch(practiceTimed, (enabled) => {
  if (!enabled) clearPracticeTimer()
})

onMounted(async () => {
  window.addEventListener("keydown", handlePracticeEnter)
  window.addEventListener("pagehide", onPageHide)
  try {
    const idParam = route.params.id
    if (typeof idParam !== "string" || !idParam.trim()) {
      busy.value = false
      loadError.value = "Missing set id."
      return
    }

    if (isPublishedSet.value) {
      set.value = publishedSetToStudySet(await getPublishedSet(idParam))
      busy.value = false
      await initializePracticeRun()
      return
    }

    if (isDemoSet.value) {
      set.value = createWebPreviewDemoSet(t)
      busy.value = false
      await initializePracticeRun()
      return
    }

    const status = await lockGetStatus()
    const db = await useTracerDb()

    const profile = await createProfileRepo(db).get()
    if (!profile || !status.has_verifier) {
      markLocked()
      await router.replace("/first-run")
      return
    }

    const settings = await createSettingsRepo(db).get()
    defaultModelId.value = settings.defaultModelId
    fallbackModelIds.value = settings.fallbackModelIds
    learnHybridEnabled.value = settings.learnHybridEnabled

    if (settings.startupLockEnabled && status.requires_unlock) {
      if (!unlockedThisSession.value) {
        markLocked()
        await router.replace("/unlock")
        return
      }
    } else if (status.can_auto_unlock) {
      markUnlocked()
    }

    await loadSet(idParam as Uuid)

    if (set.value) {
      await initializePracticeRun()
      beginClassroomPractice()
    }
  } catch {
    if (isPublishedSet.value) {
      busy.value = false
      loadError.value = "Failed to load published set."
      return
    }
    const tauriInvoke = typeof (globalThis as any)?.__TAURI_INTERNALS__?.invoke
    if (tauriInvoke !== "function") {
      set.value = createWebPreviewDemoSet(t)
      busy.value = false
      await initializePracticeRun()
      return
    }

    busy.value = false
    if (!loadError.value) loadError.value = "Failed to open set."
  }
})

onBeforeRouteLeave(() => {
  finishClassroomPractice()
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handlePracticeEnter)
  finishClassroomPractice()
  window.removeEventListener("pagehide", onPageHide)
  cancelPracticeAnswerFeedback()
  clearPracticeTimer()
})
</script>

<style scoped>
@keyframes slideLeft {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-10%);
    opacity: 0;
  }
}

.animate-slide-left {
  animation: slideLeft 0.25s ease-in-out;
}
</style>

<style scoped>
.practice-fullscreen {
  grid-template-rows: auto minmax(0, 1fr);
}
.practice-fullscreen > .tracer-fullscreen-content {
  align-self: stretch;
  margin-block-end: 0;
}
</style>
