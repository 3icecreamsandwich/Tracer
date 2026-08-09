<template>
    <AiErrorModal
        :open="aiErrorOpen"
        :error="aiError"
        :from="route.fullPath"
        :show-retry="true"
        @close="aiErrorOpen = false"
        @retry="retrySubmitTest"
    />
    <main class="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50">
        <header
            class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95"
        >
            <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div class="justify-self-start">
                    <BackButton
                        native-window-controls-safe
                        label="Back · Quit test"
                        prevent-navigation
                        @activate="requestQuitTest('navigation')"
                    />
                </div>
                <div class="text-center">
                    <h1 class="text-xl font-semibold">Test</h1>
                    <p class="mt-1 hidden text-xs text-slate-500 sm:block dark:text-slate-400">
                        Answer every question, then submit once.
                    </p>
                </div>
                <div class="flex items-center justify-self-end gap-3">
                    <span
                        v-if="testTimed && !testSubmitted"
                        class="rounded-md bg-amber-50 px-2.5 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                    >
                        {{ timerText }}
                    </span>
                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {{ progressText }}
                    </span>
                </div>
            </div>
        </header>

        <div class="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
            <div
                v-if="busy"
                class="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
                Preparing your test…
            </div>

            <div
                v-else-if="loadError"
                class="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
            >
                {{ loadError }}
            </div>

            <template v-else>
                <section
                    v-if="testSubmitted"
                    class="mb-10 rounded-2xl border border-amber-200 bg-amber-50/30 p-6 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/10 sm:p-8"
                    aria-labelledby="test-results-title"
                >
                    <div class="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div>
                            <p class="text-sm font-semibold text-amber-700 dark:text-amber-300">
                                Test complete
                            </p>
                            <h2
                                id="test-results-title"
                                class="mt-2 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white"
                            >
                                {{ accuracyPercent }}%
                            </h2>
                            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                {{ correctCount }}/{{ testQuestions.length }} correct
                            </p>
                            <p
                                v-if="testTimedOut"
                                class="mt-2 text-sm font-medium text-amber-700 dark:text-amber-300"
                            >
                                Time expired. Unanswered questions were counted as incorrect.
                            </p>
                        </div>

                        <div class="flex flex-col gap-2 sm:min-w-52">
                            <button
                                type="button"
                                class="rounded-lg border border-orange-600 bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                                @click="restartTest"
                            >
                                Restart test
                            </button>
                            <button
                                type="button"
                                class="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
                                @click="scrollToAnswerResults"
                            >
                                See what you got wrong ↓
                            </button>
                        </div>
                    </div>
                </section>

                <p
                    v-if="formError"
                    class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-200"
                    role="alert"
                >
                    {{ formError }}
                </p>

                <section
                    ref="answerResultsEl"
                    class="scroll-mt-28 space-y-6"
                    aria-label="Test questions"
                >
                    <article
                        v-for="(question, index) in testQuestions"
                        :key="question.id"
                        class="rounded-2xl border p-5 shadow-sm transition sm:p-7"
                        :class="questionCardClass(question)"
                    >
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    {{ questionKindLabel(question) }} · Question {{ index + 1 }}
                                </p>
                                <div class="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">
                                    <MarkdownRenderer
                                        :markdown="question.prompt"
                                        variant="flashcard"
                                    />
                                </div>
                            </div>
                            <span
                                v-if="testSubmitted"
                                class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg font-bold"
                                :class="
                                    questionIsCorrect(question)
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                        : 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
                                "
                                aria-hidden="true"
                            >
                                {{ questionIsCorrect(question) ? "✓" : "×" }}
                            </span>
                        </div>

                        <div
                            v-if="question.kind === 'true_false'"
                            class="mt-8 grid grid-cols-2 gap-3"
                        >
                            <button
                                v-for="choice in [true, false]"
                                :key="String(choice)"
                                type="button"
                                class="min-h-14 rounded-lg border px-4 py-3 text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:cursor-default dark:focus-visible:ring-offset-slate-950"
                                :class="choiceClass(question, choice)"
                                :disabled="testSubmitted"
                                :aria-pressed="responseFor(question.id) === choice"
                                @click="setResponse(question.id, choice)"
                            >
                                {{ choice ? t("common.true") : t("common.false") }}
                            </button>
                        </div>

                        <div
                            v-else-if="question.kind === 'multiple_choice'"
                            class="mt-8 grid gap-3"
                        >
                            <button
                                v-for="(option, optionIndex) in question.options"
                                :key="`${question.id}:${optionIndex}`"
                                type="button"
                                class="min-h-14 rounded-lg border px-4 py-3 text-left text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:cursor-default dark:focus-visible:ring-offset-slate-950"
                                :class="choiceClass(question, optionIndex)"
                                :disabled="testSubmitted"
                                :aria-pressed="responseFor(question.id) === optionIndex"
                                @click="setResponse(question.id, optionIndex)"
                            >
                                <MarkdownRenderer :markdown="option" variant="compact" />
                            </button>
                        </div>

                        <div v-else class="mt-8">
                            <label
                                :for="`test-written-${index}`"
                                class="sr-only"
                            >
                                Your answer
                            </label>
                            <div class="flex items-end gap-2">
                                <textarea
                                    :id="`test-written-${index}`"
                                    :value="writtenDraftFor(question.id)"
                                    rows="1"
                                    class="h-12 w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200 disabled:cursor-default disabled:opacity-70 dark:bg-slate-950 dark:text-white dark:focus:ring-amber-900"
                                    :class="writtenAnswerClass(question)"
                                    :disabled="testSubmitted || testGradingBusy"
                                    placeholder="Type your answer…"
                                    @input="onWrittenDraftInput(question.id, $event)"
                                />
                                <button
                                    type="button"
                                    class="inline-flex h-12 shrink-0 items-center rounded-lg border border-amber-500 bg-amber-400 px-5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                                    :disabled="
                                        testSubmitted ||
                                        testGradingBusy ||
                                        !writtenDraftFor(question.id).trim() ||
                                        writtenResponseIsSaved(question.id)
                                    "
                                    @click="saveWrittenResponse(question.id)"
                                >
                                    {{
                                        writtenResponseIsSaved(question.id)
                                            ? "Saved"
                                            : "Save"
                                    }}
                                </button>
                            </div>
                            <div
                                v-if="testSubmitted && writtenGradeFor(question.id)"
                                class="mt-3 rounded-lg border px-4 py-3 text-sm"
                                :class="
                                    writtenGradeFor(question.id)?.isCorrect
                                        ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100'
                                        : 'border-red-300 bg-red-50/80 text-red-950 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100'
                                "
                            >
                                <span class="font-semibold">
                                    {{
                                        writtenGradeFor(question.id)?.isCorrect
                                            ? "Correct:"
                                            : "Not quite:"
                                    }}
                                </span>
                                {{ writtenGradeFor(question.id)?.explanation }}
                            </div>
                        </div>
                    </article>
                </section>

                <div v-if="testQuestions.length === 0" class="text-center text-sm text-slate-600 dark:text-slate-300">
                    No questions could be generated for this test.
                </div>

                <div v-else-if="!testSubmitted" class="mt-10 flex flex-col items-center">
                    <button
                        type="button"
                        class="min-w-52 rounded-full border border-orange-500 bg-orange-400 px-8 py-3.5 text-base font-semibold text-slate-950 shadow-sm transition hover:bg-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-950"
                        :disabled="
                            answeredCount < testQuestions.length ||
                            testGradingBusy
                        "
                        @click="submitTest()"
                    >
                        {{ testGradingBusy ? "Grading…" : "Submit test" }}
                    </button>
                    <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        {{
                            testGradingBusy
                                ? "Checking written answers with your default AI model…"
                                : `${answeredCount}/${testQuestions.length} answered`
                        }}
                    </p>
                </div>
            </template>
        </div>

        <div
            v-if="quitTestOpen"
            class="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quit-test-title"
            aria-describedby="quit-test-description"
            @keydown.esc="quitTestOpen = false"
        >
            <button
                type="button"
                class="absolute inset-0 bg-slate-950/35 backdrop-blur-sm"
                aria-label="Cancel quitting the test"
                @click="quitTestOpen = false"
            />

            <div
                class="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
            >
                <h2
                    id="quit-test-title"
                    class="text-lg font-semibold text-slate-950 dark:text-slate-50"
                >
                    Quit this test?
                </h2>
                <p
                    id="quit-test-description"
                    class="mt-2 text-sm text-slate-600 dark:text-slate-300"
                >
                    Your answers and current test progress will be lost.
                </p>

                <div class="mt-5 flex flex-wrap justify-end gap-2">
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
                        @click="quitTestOpen = false"
                    >
                        {{ t("common.cancel") }}
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 dark:bg-red-600 dark:hover:bg-red-500 dark:focus-visible:ring-offset-slate-950"
                        @click="confirmQuitTest"
                    >
                        Quit test
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({ hideNavbar: true })

import MarkdownRenderer from "~/components/MarkdownRenderer.vue"
import type { FlashcardSet, Uuid } from "~/src/composables/db/types"
import {
    createProfileRepo,
    createSettingsRepo,
    createSetsRepo,
    useTracerDb,
} from "~/src/composables/db"
import { createWebPreviewDemoSet } from "~/src/composables/demo-content"
import { resolveAiModel } from "~/src/composables/ai/registry"
import {
    aiErrorForMissingDefaultModel,
    normalizeAiError,
    type AiErrorUx,
} from "~/src/composables/ai/ux-errors"
import {
    gradeWebPreviewWrittenAnswer,
    gradeWrittenAnswer,
    type WrittenAnswerGrade,
} from "~/src/composables/ai/written-answer-grader"
import { useAppLanguage } from "~/src/composables/language"
import {
    generateLearnQuestions,
    type LearnQuestion,
    type LearnQuestionKind,
} from "~/src/composables/learn/generator"
import { lockGetStatus } from "~/src/composables/lock"
import { useLockSession } from "~/src/composables/lock-session"
import { navigateBack } from "~/src/composables/navigation/app-navigation"
import { hasTauriRuntime } from "~/src/composables/tauri"
import { invoke } from "@tauri-apps/api/core"
import { listen, type UnlistenFn } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"

type TestResponse = boolean | number | string

const route = useRoute()
const router = useRouter()
const { language, t } = useAppLanguage()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()

const busy = ref(true)
const loadError = ref<string | null>(null)
const formError = ref<string | null>(null)
const set = ref<FlashcardSet | null>(null)
const defaultModelId = ref<string | null>(null)
const testQuestions = ref<LearnQuestion[]>([])
const responses = ref<Record<string, TestResponse>>({})
const writtenDrafts = ref<Record<string, string>>({})
const writtenGrades = ref<Record<string, WrittenAnswerGrade>>({})
const testSubmitted = ref(false)
const testGradingBusy = ref(false)
const testTimedOut = ref(false)
const runCounter = ref(0)
const answerResultsEl = ref<HTMLElement | null>(null)
const timerHandle = shallowRef<number | null>(null)
const secondsRemaining = ref(0)
const quitTestOpen = ref(false)
const pendingTestExit = ref<"navigation" | "app">("navigation")
let unlistenTestWindowClose: UnlistenFn | null = null
let unlistenTestAppQuit: UnlistenFn | null = null
const aiError = ref<AiErrorUx | null>(null)
const aiErrorOpen = ref(false)
const testGradingAbort = shallowRef<AbortController | null>(null)
const cachedWrittenModel = shallowRef<{ id: string; model: any } | null>(null)
const lastSubmitForced = ref(false)

const isWebPreview = computed(() => !hasTauriRuntime())

function queryString(name: string) {
    const value = route.query[name]
    return typeof value === "string" ? value : null
}

const selectedQuestionTypes = computed<LearnQuestionKind[]>(() => {
    const supported = new Set<LearnQuestionKind>([
        "multiple_choice",
        "true_false",
        "written",
    ])
    const parsed = (queryString("types") ?? "")
        .split(",")
        .filter((value): value is LearnQuestionKind =>
            supported.has(value as LearnQuestionKind),
        )
    return parsed.length > 0
        ? parsed
        : ["multiple_choice", "true_false", "written"]
})

const requestedQuestionCount = computed(() => {
    const parsed = Number.parseInt(queryString("count") ?? "10", 10)
    return Number.isFinite(parsed) ? Math.max(1, parsed) : 10
})

const testShuffle = computed(() => queryString("shuffle") !== "0")
const testTimed = computed(() => queryString("timed") === "1")
const timeLimitMinutes = computed(() => {
    const parsed = Number.parseInt(queryString("minutes") ?? "10", 10)
    return Number.isFinite(parsed) ? Math.min(60, Math.max(1, parsed)) : 10
})
const baseSeed = computed(() => {
    const parsed = Number.parseInt(queryString("seed") ?? "", 10)
    return Number.isFinite(parsed) ? parsed : Date.now()
})

const answeredCount = computed(
    () =>
        testQuestions.value.filter((question) => hasResponse(question.id))
            .length,
)

const correctCount = computed(
    () =>
        testQuestions.value.filter((question) => questionIsCorrect(question))
            .length,
)

const accuracyPercent = computed(() => {
    if (testQuestions.value.length === 0) return 0
    return Math.round((correctCount.value / testQuestions.value.length) * 100)
})

const progressText = computed(() => {
    const total = testQuestions.value.length
    return testSubmitted.value
        ? `${correctCount.value}/${total}`
        : `${answeredCount.value}/${total}`
})

const timerText = computed(() => {
    const seconds = Math.max(0, secondsRemaining.value)
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
})

function hasResponse(questionId: string) {
    if (!Object.prototype.hasOwnProperty.call(responses.value, questionId)) {
        return false
    }
    const value = responses.value[questionId]
    return typeof value !== "string" || value.trim().length > 0
}

function responseFor(questionId: string) {
    return responses.value[questionId]
}

function setResponse(questionId: string, value: TestResponse) {
    if (testSubmitted.value) return
    responses.value = { ...responses.value, [questionId]: value }
    formError.value = null
}

function writtenDraftFor(questionId: string) {
    return writtenDrafts.value[questionId] ?? ""
}

function writtenResponseIsSaved(questionId: string) {
    return (
        hasResponse(questionId) &&
        responseFor(questionId) === writtenDraftFor(questionId).trim()
    )
}

function onWrittenDraftInput(questionId: string, event: Event) {
    const target = event.target
    if (!(target instanceof HTMLTextAreaElement)) return
    writtenDrafts.value = {
        ...writtenDrafts.value,
        [questionId]: target.value,
    }
    formError.value = null
}

function saveWrittenResponse(questionId: string) {
    const value = writtenDraftFor(questionId).trim()
    if (!value || testSubmitted.value || testGradingBusy.value) return
    setResponse(questionId, value)
}

function writtenGradeFor(questionId: string) {
    return writtenGrades.value[questionId] ?? null
}

function questionIsCorrect(question: LearnQuestion) {
    const response = responseFor(question.id)
    if (question.kind === "true_false") return response === question.answer
    if (question.kind === "multiple_choice") {
        return response === question.answerIndex
    }
    return writtenGradeFor(question.id)?.isCorrect ?? false
}

function correctChoice(question: LearnQuestion) {
    if (question.kind === "true_false") return question.answer
    if (question.kind === "multiple_choice") return question.answerIndex
    return null
}

function choiceClass(question: LearnQuestion, choice: boolean | number) {
    const selected = responseFor(question.id) === choice
    if (!testSubmitted.value) {
        return selected
            ? "border-amber-500 bg-amber-50 text-slate-950 ring-2 ring-amber-200 dark:border-amber-500 dark:bg-amber-950/30 dark:text-white dark:ring-amber-900/70"
            : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
    }
    if (choice === correctChoice(question)) {
        return "border-2 border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-200 dark:border-emerald-500 dark:bg-emerald-950/35 dark:text-emerald-50 dark:ring-emerald-900/70"
    }
    if (selected) {
        return "border-2 border-red-700 bg-red-50/80 text-red-950 ring-2 ring-red-200 dark:border-red-500 dark:bg-red-950/40 dark:text-red-50 dark:ring-red-900/70"
    }
    return "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
}

function questionCardClass(question: LearnQuestion) {
    if (!testSubmitted.value) {
        return "border-amber-200 bg-amber-50/20 dark:border-amber-900/60 dark:bg-amber-950/10"
    }
    return questionIsCorrect(question)
        ? "border-emerald-300 bg-emerald-50/20 dark:border-emerald-900/70 dark:bg-emerald-950/10"
        : "border-red-300 bg-red-50/20 dark:border-red-900/70 dark:bg-red-950/10"
}

function writtenAnswerClass(question: LearnQuestion) {
    if (!testSubmitted.value) {
        return "border-slate-300 dark:border-slate-700"
    }
    return questionIsCorrect(question)
        ? "border-2 border-emerald-600 bg-emerald-50/70 dark:border-emerald-500 dark:bg-emerald-950/30"
        : "border-2 border-red-700 bg-red-50/70 dark:border-red-500 dark:bg-red-950/30"
}

function questionKindLabel(question: LearnQuestion) {
    if (question.kind === "true_false") return "True / false"
    if (question.kind === "multiple_choice") return "Multiple choice"
    return "Written"
}

function clearTimer() {
    if (timerHandle.value !== null) {
        window.clearInterval(timerHandle.value)
        timerHandle.value = null
    }
}

function startTimer() {
    clearTimer()
    secondsRemaining.value = timeLimitMinutes.value * 60
    if (!testTimed.value || testQuestions.value.length === 0) return
    timerHandle.value = window.setInterval(() => {
        secondsRemaining.value -= 1
        if (secondsRemaining.value <= 0) {
            testTimedOut.value = true
            submitTest(true)
        }
    }, 1000)
}

function buildTest() {
    const currentSet = set.value
    if (!currentSet) return
    const questionLimit = Math.max(1, currentSet.terms.length)
    testQuestions.value = generateLearnQuestions(currentSet.terms, {
        seed: baseSeed.value + runCounter.value,
        maxQuestions: Math.min(requestedQuestionCount.value, questionLimit),
        questionTypes: selectedQuestionTypes.value,
        shuffle: testShuffle.value,
    })
    responses.value = {}
    writtenDrafts.value = {}
    writtenGrades.value = {}
    testSubmitted.value = false
    testGradingBusy.value = false
    testTimedOut.value = false
    formError.value = null
    startTimer()
}

async function getWrittenModel(modelId: string) {
    if (cachedWrittenModel.value?.id === modelId) {
        return cachedWrittenModel.value.model
    }
    const model = await resolveAiModel(modelId)
    cachedWrittenModel.value = { id: modelId, model }
    return model
}

async function submitTest(force = false) {
    if (testSubmitted.value || testGradingBusy.value) return
    if (!force && answeredCount.value < testQuestions.value.length) {
        formError.value = "Answer every question before submitting your test."
        return
    }
    lastSubmitForced.value = force
    clearTimer()
    formError.value = null
    aiError.value = null
    aiErrorOpen.value = false
    testGradingBusy.value = true

    const controller = new AbortController()
    testGradingAbort.value?.abort()
    testGradingAbort.value = controller

    try {
        const writtenQuestions = testQuestions.value.filter(
            (question) => question.kind === "written",
        )
        const answeredWrittenQuestions = writtenQuestions.filter(
            (question) => hasResponse(question.id),
        )

        let model: any = null
        if (answeredWrittenQuestions.length > 0 && !isWebPreview.value) {
            if (!defaultModelId.value) {
                aiError.value = aiErrorForMissingDefaultModel()
                aiErrorOpen.value = true
                return
            }
            model = await getWrittenModel(defaultModelId.value)
        }

        const gradeEntries = await Promise.all(
            writtenQuestions.map(async (question) => {
                const studentAnswer = String(responseFor(question.id) ?? "").trim()
                if (!studentAnswer) {
                    return [
                        question.id,
                        {
                            isCorrect: false,
                            explanation: "No answer was provided.",
                        },
                    ] as const
                }

                const input = {
                    question: question.prompt,
                    referenceAnswer: question.answer,
                    studentAnswer,
                }
                const grade = isWebPreview.value
                    ? gradeWebPreviewWrittenAnswer(input)
                    : await gradeWrittenAnswer({
                          model,
                          input,
                          abortSignal: controller.signal,
                      })
                return [question.id, grade] as const
            }),
        )

        if (controller.signal.aborted) return
        writtenGrades.value = Object.fromEntries(gradeEntries)
        testSubmitted.value = true
        void nextTick(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        })
    } catch (error) {
        if (controller.signal.aborted) return
        aiError.value = normalizeAiError(error)
        aiErrorOpen.value = true
    } finally {
        if (testGradingAbort.value === controller) {
            testGradingAbort.value = null
        }
        if (!controller.signal.aborted) testGradingBusy.value = false
    }
}

async function retrySubmitTest() {
    aiErrorOpen.value = false
    await submitTest(lastSubmitForced.value)
}

function restartTest() {
    testGradingAbort.value?.abort()
    testGradingAbort.value = null
    runCounter.value += 1
    buildTest()
    void nextTick(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })
}

function scrollToAnswerResults() {
    answerResultsEl.value?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    })
}

function requestQuitTest(source: "navigation" | "app") {
    pendingTestExit.value = source
    quitTestOpen.value = true
}

async function activateTestExitGuards() {
    if (isWebPreview.value) return
    unlistenTestAppQuit = await listen("tracer://test-quit-requested", () => {
        requestQuitTest("app")
    })
    unlistenTestWindowClose = await getCurrentWindow().onCloseRequested(
        (event) => {
            event.preventDefault()
            requestQuitTest("app")
        },
    )
    await invoke("test_mode_set_active", { active: true })
}

function deactivateTestExitGuards() {
    unlistenTestWindowClose?.()
    unlistenTestWindowClose = null
    unlistenTestAppQuit?.()
    unlistenTestAppQuit = null
    if (!isWebPreview.value) {
        void invoke("test_mode_set_active", { active: false }).catch(() => {})
    }
}

async function confirmQuitTest() {
    quitTestOpen.value = false
    clearTimer()
    if (pendingTestExit.value === "app" && !isWebPreview.value) {
        await invoke("test_mode_confirm_exit")
        return
    }
    navigateBack(router, route.path, window.history.state)
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

watch(language, () => {
    if (!isWebPreview.value) return
    set.value = createWebPreviewDemoSet(t)
    buildTest()
})

onBeforeRouteLeave(() => {
    deactivateTestExitGuards()
})

onMounted(async () => {
    try {
        await activateTestExitGuards()
        if (isWebPreview.value) {
            set.value = createWebPreviewDemoSet(t)
            busy.value = false
            buildTest()
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
        if (settings.startupLockEnabled && status.requires_unlock) {
            if (!unlockedThisSession.value) {
                markLocked()
                await router.replace("/unlock")
                return
            }
        } else if (status.can_auto_unlock) {
            markUnlocked()
        }

        const idParam = route.params.id
        if (typeof idParam !== "string" || !idParam.trim()) {
            busy.value = false
            loadError.value = "Missing set id."
            return
        }

        await loadSet(idParam as Uuid)
        if (set.value) buildTest()
    } catch {
        const tauriInvoke = typeof (globalThis as any)?.__TAURI_INTERNALS__?.invoke
        if (tauriInvoke !== "function") {
            set.value = createWebPreviewDemoSet(t)
            busy.value = false
            buildTest()
            return
        }
        busy.value = false
        if (!loadError.value) loadError.value = "Failed to open set."
    }
})

onBeforeUnmount(() => {
    testGradingAbort.value?.abort()
    clearTimer()
})
</script>
