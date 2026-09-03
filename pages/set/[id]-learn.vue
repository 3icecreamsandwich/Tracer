<template>
    <AiErrorModal
        :open="aiErrorOpen"
        :error="aiError"
        :from="route.fullPath"
        :show-retry="true"
        @close="aiErrorOpen = false"
        @retry="retryPracticeWrittenAnswer"
    />
    <main class="flex min-h-screen flex-col bg-white dark:bg-slate-950">
        <!-- Header with Back button and progress -->
        <div
            class="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950"
        >
            <div class="flex items-center justify-between gap-4">
                <BackButton native-window-controls-safe />
                <div class="flex items-center gap-2">
                    <span
                        v-if="practiceTimed && !learnIsFinished"
                        class="rounded-md bg-amber-50 px-2.5 py-2 text-sm font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300"
                        >{{ practiceTimerText }}</span
                    >
                    <p
                        class="text-sm font-medium text-slate-600 dark:text-slate-300"
                    >
                        {{ learnRatioText }}
                    </p>
                    <button
                        type="button"
                        class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="practiceAnswerBusy"
                        :aria-expanded="practiceSettingsOpen"
                        aria-label="Practice settings"
                        title="Practice settings"
                        @click="openPracticeSettings"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            class="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.6 3.2h4.8l.6 2.1c.4.2.8.4 1.2.7l2.1-.6 2.4 4.2-1.5 1.5v1.8l1.5 1.5-2.4 4.2-2.1-.6c-.4.3-.8.5-1.2.7l-.6 2.1H9.6L9 18.5c-.4-.2-.8-.4-1.2-.7l-2.1.6-2.4-4.2 1.5-1.5v-1.8L3.3 9.4l2.4-4.2 2.1.6c.4-.3.8-.5 1.2-.7l.6-1.9Z"
                            />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex flex-1 flex-col items-center justify-start px-6 py-8">
            <!-- Title -->
            <div class="mb-6 text-center">
                <h1
                    class="text-xl font-semibold text-slate-900 dark:text-slate-50"
                >
                    {{ t("set.learn") }}
                </h1>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {{ t("set.learnInstructions") }}
                </p>
            </div>

            <div
                v-if="practiceSettingsOpen"
                class="mb-6 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h2
                            class="text-lg font-semibold text-slate-950 dark:text-white"
                        >
                            Practice settings
                        </h2>
                        <p
                            class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                        >
                            Choose how this session should work.
                        </p>
                    </div>
                    <div
                        class="inline-flex rounded-lg border border-amber-200 bg-white p-1 dark:border-amber-900/60 dark:bg-slate-950"
                    >
                        <button
                            v-for="choice in practiceSessionChoices"
                            :key="choice"
                            type="button"
                            class="rounded-md px-4 py-2 text-sm font-semibold capitalize transition"
                            :class="
                                practiceSessionMode === choice
                                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                                    : 'text-slate-600 hover:bg-amber-50 dark:text-slate-300'
                            "
                            @click="practiceSessionMode = choice"
                        >
                            {{ choice }}
                        </button>
                    </div>
                </div>

                <div class="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                        <p
                            class="text-sm font-semibold text-slate-900 dark:text-white"
                        >
                            Question types
                        </p>
                        <div
                            class="mt-2 grid gap-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3"
                        >
                            <button
                                v-for="item in practiceQuestionTypeChoices"
                                :key="item.kind"
                                type="button"
                                class="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition"
                                :class="
                                    practiceQuestionTypes[item.kind]
                                        ? 'border-amber-300 bg-amber-50 text-slate-950 dark:border-amber-800/70 dark:bg-amber-950/20 dark:text-white'
                                        : 'border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50/50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-amber-900/60'
                                "
                                :aria-pressed="practiceQuestionTypes[item.kind]"
                                @click="togglePracticeQuestionType(item.kind)"
                            >
                                {{ item.label }}
                                <span
                                    class="relative h-5 w-9 shrink-0 rounded-full transition"
                                    :class="
                                        practiceQuestionTypes[item.kind]
                                            ? 'bg-amber-500'
                                            : 'bg-slate-300 dark:bg-slate-700'
                                    "
                                    ><span
                                        class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                                        :class="
                                            practiceQuestionTypes[item.kind]
                                                ? 'left-[18px]'
                                                : 'left-0.5'
                                        "
                                /></span>
                            </button>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <label class="flex items-center justify-between gap-4">
                            <span
                                class="text-sm font-semibold text-slate-900 dark:text-white"
                                >Questions</span
                            >
                            <input
                                v-model.number="practiceQuestionCount"
                                type="number"
                                min="1"
                                :max="practiceQuestionLimit"
                                step="1"
                                class="w-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-right text-sm font-semibold text-slate-950 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-amber-900"
                                @change="clampPracticeQuestionCount"
                            />
                        </label>
                        <button
                            type="button"
                            class="flex w-full items-center justify-between text-left"
                            :aria-pressed="practiceShuffle"
                            @click="practiceShuffle = !practiceShuffle"
                        >
                            <span
                                ><span
                                    class="block text-sm font-semibold text-slate-900 dark:text-white"
                                    >Shuffle questions</span
                                ><span
                                    class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400"
                                    >Mix question types and terms</span
                                ></span
                            >
                            <span
                                class="relative h-6 w-11 rounded-full transition"
                                :class="
                                    practiceShuffle
                                        ? 'bg-amber-500'
                                        : 'bg-slate-300 dark:bg-slate-700'
                                "
                                ><span
                                    class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all"
                                    :class="
                                        practiceShuffle ? 'left-6' : 'left-1'
                                    "
                            /></span>
                        </button>
                        <button
                            type="button"
                            class="flex w-full items-center justify-between text-left"
                            :aria-pressed="practiceTimed"
                            @click="practiceTimed = !practiceTimed"
                        >
                            <span
                                ><span
                                    class="block text-sm font-semibold text-slate-900 dark:text-white"
                                    >Time limit</span
                                ><span
                                    class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400"
                                    >Finish before the countdown ends</span
                                ></span
                            >
                            <span
                                class="relative h-6 w-11 rounded-full transition"
                                :class="
                                    practiceTimed
                                        ? 'bg-amber-500'
                                        : 'bg-slate-300 dark:bg-slate-700'
                                "
                                ><span
                                    class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all"
                                    :class="
                                        practiceTimed ? 'left-6' : 'left-1'
                                    "
                            /></span>
                        </button>
                        <label v-if="practiceTimed" class="block"
                            ><span
                                class="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200"
                                >Minutes
                                <span>{{
                                    practiceTimeLimitMinutes
                                }}</span></span
                            ><input
                                v-model.number="practiceTimeLimitMinutes"
                                type="range"
                                min="1"
                                max="60"
                                class="mt-2 w-full accent-amber-500"
                        /></label>
                    </div>
                </div>

                <div class="mt-5 flex justify-end">
                    <button
                        type="button"
                        class="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300 disabled:opacity-60"
                        :disabled="
                            learnBusy ||
                            enabledPracticeQuestionTypes().length === 0
                        "
                        @click="applyPracticeSettings"
                    >
                        Restart
                        {{
                            practiceSessionMode === "test" ? "test" : "practice"
                        }}
                    </button>
                </div>
            </div>

            <p v-if="learnError" class="text-sm text-red-700 dark:text-red-300">
                {{ learnError }}
            </p>

            <LoadingSpinner v-if="learnBusy" screen label="Preparing questions…" />

            <!-- Results -->
            <div
                v-else-if="learnIsFinished"
                class="w-full max-w-2xl select-none"
            >
                <div
                    class="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900"
                >
                    <h2
                        class="text-2xl font-semibold text-slate-900 dark:text-slate-50"
                    >
                        {{ t("common.results") }}
                    </h2>
                    <p
                        v-if="practiceTimedOut"
                        class="mt-3 text-sm font-semibold text-amber-700 dark:text-amber-300"
                    >
                        Time is up. Unanswered questions were counted as missed.
                    </p>
                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-200">
                        {{ t("set.accuracy") }}
                        <span class="font-medium">{{ learnAccuracyText }}</span>
                    </p>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Correct: {{ learnCorrectCount }} · Attempted:
                        {{ learnAttemptedCount }}
                    </p>

                    <div class="mt-6 flex flex-wrap justify-center gap-2">
                        <NuxtLink
                            v-if="set"
                            :to="backToSetPath"
                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        >
                            {{ t("set.backToSet") }}
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Question -->
            <div
                v-else-if="!learnCurrentQuestion"
                class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
                {{ t("set.noQuestions") }}
            </div>

            <div v-else class="w-full max-w-2xl">
                <div
                    class="rounded-lg border p-8"
                    :class="[
                        practiceQuestionSurfaceClass(),
                        {
                            'animate-slide-left': learnIsNavigating,
                        },
                    ]"
                >
                    <p
                        class="text-sm font-medium text-slate-500 dark:text-slate-400"
                    >
                        {{ t("set.question") }}
                    </p>
                    <div
                        class="mt-4 text-3xl font-medium text-slate-900 dark:text-slate-50"
                    >
                        <MarkdownRenderer
                            :markdown="learnCurrentQuestion.prompt"
                            variant="flashcard"
                        />
                    </div>

                    <div
                        class="mt-8 grid gap-3"
                        :class="
                            learnCurrentQuestion.kind === 'true_false'
                                ? 'grid-cols-2'
                                : ''
                        "
                    >
                        <template
                            v-if="learnCurrentQuestion.kind === 'true_false'"
                        >
                            <button
                                type="button"
                                class="inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2.5 text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                :class="practiceTrueFalseChoiceClass(true)"
                                :disabled="learnBusy || practiceAnswerBusy"
                                @click="answerLearnTrueFalse(true)"
                            >
                                {{ t("common.true") }}
                            </button>
                            <button
                                type="button"
                                class="inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2.5 text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                :class="practiceTrueFalseChoiceClass(false)"
                                :disabled="learnBusy || practiceAnswerBusy"
                                @click="answerLearnTrueFalse(false)"
                            >
                                {{ t("common.false") }}
                            </button>
                        </template>

                        <template
                            v-else-if="
                                learnCurrentQuestion.kind === 'multiple_choice'
                            "
                        >
                            <button
                                v-for="(
                                    opt, idx
                                ) in learnCurrentQuestion.options"
                                :key="`${learnCurrentQuestion.id}:${idx}`"
                                type="button"
                                class="inline-flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                                :class="practiceMultipleChoiceClass(idx)"
                                :disabled="learnBusy || practiceAnswerBusy"
                                @click="answerLearnMultipleChoice(idx)"
                            >
                                <MarkdownRenderer
                                    :markdown="opt"
                                    variant="compact"
                                />
                            </button>
                        </template>
                        <form
                            v-else
                            class="grid gap-2"
                            @submit.prevent="answerLearnWritten"
                        >
                            <label
                                for="fullscreen-written-answer"
                                class="sr-only"
                            >
                                Your answer
                            </label>
                            <div class="flex items-end gap-2">
                                <textarea
                                    id="fullscreen-written-answer"
                                    v-model="practiceWrittenAnswer"
                                    rows="1"
                                    autofocus
                                    class="h-12 w-full resize-none rounded-lg border border-amber-200 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200 disabled:opacity-60 dark:border-amber-900/60 dark:bg-slate-950 dark:text-white"
                                    placeholder="Type your answer…"
                                    :disabled="
                                        practiceAnswerBusy ||
                                        Boolean(practiceWrittenFeedback)
                                    "
                                />
                                <button
                                    type="submit"
                                    class="inline-flex h-12 shrink-0 items-center rounded-lg border border-amber-500 bg-amber-400 px-5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                                    :disabled="
                                        !practiceWrittenAnswer.trim() ||
                                        practiceAnswerBusy ||
                                        Boolean(practiceWrittenFeedback)
                                    "
                                >
                                    <LoadingSpinner v-if="practiceAnswerBusy" size="sm" label="Checking…" />
                                    <template v-else>Save</template>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div
                    v-if="practiceWrittenFeedback"
                    class="mt-3 rounded-lg border p-4 shadow-sm"
                    :class="
                        practiceWrittenFeedback.isCorrect
                            ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100'
                            : 'border-red-300 bg-red-50/80 text-red-950 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100'
                    "
                >
                    <p class="text-sm font-semibold">
                        {{
                            practiceWrittenFeedback.isCorrect
                                ? "Correct"
                                : "Not quite"
                        }}
                    </p>
                    <p class="mt-1 text-sm">
                        {{ practiceWrittenFeedback.explanation }}
                    </p>
                    <div class="mt-3 flex justify-end">
                        <button
                            type="button"
                            class="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                            :disabled="practiceAnswerBusy"
                            @click="continueAfterWrittenFeedback"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
definePageMeta({ hideNavbar: true });

import MarkdownRenderer from "~/components/MarkdownRenderer.vue";
import type { FlashcardSet, Uuid } from "~/src/composables/db/types";
import {
    createProfileRepo,
    createSettingsRepo,
    createSetsRepo,
    useTracerDb,
} from "~/src/composables/db";
import { lockGetStatus } from "~/src/composables/lock";
import { useLockSession } from "~/src/composables/lock-session";
import { hasTauriRuntime } from "~/src/composables/tauri";
import {
    loadPracticeProgress,
    savePracticeProgress,
    type PracticeProgress,
} from "~/src/composables/practice-progress";
import {
    generateLearnQuestions,
    type LearnQuestion,
    type LearnQuestionKind,
} from "~/src/composables/learn/generator";
import {
    createPracticePresentation,
    type PracticeChoiceFeedback,
    type PracticeChoiceValue,
} from "~/src/composables/learn/presentation";
import { resolveAiModel } from "~/src/composables/ai/registry";
import { generateText } from "ai";
import {
    aiErrorForMissingDefaultModel,
    normalizeAiError,
    type AiErrorUx,
} from "~/src/composables/ai/ux-errors";
import {
    gradeWebPreviewWrittenAnswer,
    gradeWrittenAnswer,
    type WrittenAnswerGrade,
    type WrittenAnswerGradeInput,
} from "~/src/composables/ai/written-answer-grader";
import { useAppLanguage } from "~/src/composables/language";
import { createWebPreviewDemoSet } from "~/src/composables/demo-content";
import {
    beginAssignedAttempt,
    completeAssignedAttempt,
    parseAssignedAssignmentId,
} from "~/src/composables/assignment-progress";
import { createRandomSeed } from "~/src/composables/random";

const route = useRoute();
const router = useRouter();
const { language, t } = useAppLanguage();
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession();

const isWebPreview = computed(() => !hasTauriRuntime());
const assignedAssignmentId = computed(() =>
    parseAssignedAssignmentId(route.query.assignment),
);
const backToSetPath = computed(() => {
    const classroomId =
        typeof route.query.class === "string" ? route.query.class : null;
    return assignedAssignmentId.value && classroomId && set.value
        ? `/student/classes/${classroomId}`
        : set.value
          ? `/set/${set.value.id}`
          : "/";
});

function beginClassroomPractice() {
    if (!set.value) return;
    beginAssignedAttempt({
        assignmentId: assignedAssignmentId.value,
        setId: set.value.id,
        mode: "practice",
    });
}

let assignedSessionFinished = false;
const assignedSessionCorrect = ref(0);
const assignedSessionAttempted = ref(0);

function finishClassroomPractice() {
    if (assignedSessionFinished || !set.value) return;
    assignedSessionFinished = true;
    void completeAssignedAttempt({
        assignmentId: assignedAssignmentId.value,
        setId: set.value.id,
        mode: "practice",
        scoreEarned: assignedSessionCorrect.value,
        scorePossible: assignedSessionAttempted.value,
    });
}

function onPageHide() {
    finishClassroomPractice();
}

const busy = ref(true);
const loadError = ref<string | null>(null);
const set = ref<FlashcardSet | null>(null);
const defaultModelId = ref<string | null>(null);
const fallbackModelIds = ref<string[]>([]);
const learnHybridEnabled = ref(false);

const learnBusy = ref(false);
const learnError = ref<string | null>(null);

const learnRunCounter = ref(0);
const learnCursorIndex = ref(0);
const learnQuestions = ref<LearnQuestion[]>([]);
const learnAnswersByQuestionId = ref<Record<string, boolean>>({});
const practiceProgressReady = ref(false);
const savedPracticeProgressSignature = ref<string | null>(null);
const practiceSettingsOpen = ref(false);
const practiceSessionChoices = ["practice", "test"] as const;
const practiceQuestionTypeChoices: {
    kind: LearnQuestionKind;
    label: string;
}[] = [
    { kind: "multiple_choice", label: "Multiple choice" },
    { kind: "true_false", label: "True / false" },
    { kind: "written", label: "Written" },
];
const practiceSessionMode = ref<"practice" | "test">("practice");
const practiceQuestionTypes = reactive<Record<LearnQuestionKind, boolean>>({
    multiple_choice: true,
    true_false: true,
    written: true,
});
const practiceQuestionCount = ref(10);
const practiceShuffle = ref(true);
const practiceTimed = ref(false);
const practiceTimeLimitMinutes = ref(10);
const practiceSecondsRemaining = ref(10 * 60);
const practiceTimedOut = ref(false);
const practiceWrittenAnswer = ref("");
const practiceTimerHandle = shallowRef<number | null>(null);
const practiceAnswerFeedback = ref<PracticeChoiceFeedback | null>(null);
type PracticeWrittenFeedback = WrittenAnswerGrade & {
    questionId: string;
};
const practiceWrittenFeedback = ref<PracticeWrittenFeedback | null>(null);
const lastPracticeWrittenInput = ref<
    (WrittenAnswerGradeInput & { questionId: string }) | null
>(null);
const practiceWrittenAbort = shallowRef<AbortController | null>(null);
const cachedWrittenModel = shallowRef<{ id: string; model: any } | null>(null);
const aiError = ref<AiErrorUx | null>(null);
const aiErrorOpen = ref(false);
const practiceAnswerBusy = ref(false);
const learnIsNavigating = ref(false);
const practiceAnswerTransitionId = ref(0);

const baseSeed = computed(() => {
    const raw = route.query.seed;
    if (typeof raw !== "string") return null;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
});

function learnSeed() {
    const s = baseSeed.value;
    if (s !== null) return s + learnRunCounter.value;
    return createRandomSeed() ^ (learnRunCounter.value * 2654435761);
}

const learnAttemptedCount = computed(
    () => Object.keys(learnAnswersByQuestionId.value).length,
);
const learnCorrectCount = computed(
    () => Object.values(learnAnswersByQuestionId.value).filter((v) => v).length,
);
const learnIsFinished = computed(() => {
    const total = learnQuestions.value.length;
    return total > 0 && learnAttemptedCount.value >= total;
});

const learnRatioText = computed(() => {
    const total = learnQuestions.value.length;
    if (total === 0) return "0/0";
    return `${Math.min(learnAttemptedCount.value, total)}/${total}`;
});

const learnAccuracyText = computed(() => {
    const attempted = learnAttemptedCount.value;
    if (attempted <= 0) return "0%";
    const pct = Math.round((learnCorrectCount.value / attempted) * 100);
    return `${pct}% (${learnCorrectCount.value}/${attempted})`;
});

const learnCurrentQuestion = computed(() => {
    if (learnIsFinished.value) return null;
    return learnQuestions.value[learnCursorIndex.value] ?? null;
});

const practiceQuestionLimit = computed(() => {
    const terms = set.value?.terms.length ?? 1;
    return Math.max(1, terms);
});

const practiceTimerText = computed(() => {
    const seconds = Math.max(0, practiceSecondsRemaining.value);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
});

function enabledPracticeQuestionTypes(): LearnQuestionKind[] {
    return (Object.keys(practiceQuestionTypes) as LearnQuestionKind[]).filter(
        (kind) => practiceQuestionTypes[kind],
    );
}

function clampPracticeQuestionCount() {
    const next = Math.round(Number(practiceQuestionCount.value) || 1);
    practiceQuestionCount.value = Math.min(
        practiceQuestionLimit.value,
        Math.max(1, next),
    );
}

function togglePracticeQuestionType(kind: LearnQuestionKind) {
    if (
        practiceQuestionTypes[kind] &&
        enabledPracticeQuestionTypes().length === 1
    ) {
        learnError.value = "Choose at least one question type.";
        return;
    }
    practiceQuestionTypes[kind] = !practiceQuestionTypes[kind];
    practiceQuestionCount.value = Math.min(
        practiceQuestionCount.value,
        practiceQuestionLimit.value,
    );
    learnError.value = null;
}

function clearPracticeTimer() {
    if (practiceTimerHandle.value !== null) {
        window.clearInterval(practiceTimerHandle.value);
        practiceTimerHandle.value = null;
    }
}

function openPracticeSettings() {
    practiceSettingsOpen.value = !practiceSettingsOpen.value;
    if (practiceSettingsOpen.value) {
        clampPracticeQuestionCount();
        clearPracticeTimer();
    }
}

function expirePracticeSession() {
    cancelPracticeAnswerFeedback();
    clearPracticeTimer();
    practiceTimedOut.value = true;
    const answers = { ...learnAnswersByQuestionId.value };
    for (const question of learnQuestions.value) {
        if (answers[question.id] === undefined) answers[question.id] = false;
    }
    learnAnswersByQuestionId.value = answers;
}

function startPracticeTimer() {
    clearPracticeTimer();
    practiceTimedOut.value = false;
    practiceSecondsRemaining.value = practiceTimeLimitMinutes.value * 60;
    if (!practiceTimed.value) return;
    practiceTimerHandle.value = window.setInterval(() => {
        practiceSecondsRemaining.value -= 1;
        if (practiceSecondsRemaining.value <= 0) expirePracticeSession();
    }, 1000);
}

function learnFindNextUnattempted(fromIndex: number) {
    const list = learnQuestions.value;
    if (list.length === 0) return null;
    const answered = learnAnswersByQuestionId.value;
    for (let step = 0; step < list.length; step += 1) {
        const idx = (fromIndex + step) % list.length;
        const q = list[idx];
        if (!q) continue;
        if (answered[q.id] === undefined) return idx;
    }
    return null;
}

function learnMarkAnswered(questionId: string, isCorrect: boolean) {
    if (learnAnswersByQuestionId.value[questionId] === undefined) {
        assignedSessionAttempted.value += 1;
        if (isCorrect) assignedSessionCorrect.value += 1;
    }
    learnAnswersByQuestionId.value = {
        ...learnAnswersByQuestionId.value,
        [questionId]: isCorrect,
    };
    const next = learnFindNextUnattempted(learnCursorIndex.value + 1);
    if (next === null) {
        clearPracticeTimer();
        return;
    }
    learnCursorIndex.value = next;
}

const {
    practiceTrueFalseChoiceClass,
    practiceMultipleChoiceClass,
    practiceQuestionSurfaceClass,
} = createPracticePresentation({
    getQuestion: () => learnCurrentQuestion.value,
    getChoiceFeedback: () => practiceAnswerFeedback.value,
    getWrittenFeedback: () => practiceWrittenFeedback.value,
});

function waitForFeedback(ms: number) {
    return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function cancelPracticeAnswerFeedback() {
    practiceAnswerTransitionId.value += 1;
    practiceWrittenAbort.value?.abort();
    practiceWrittenAbort.value = null;
    practiceAnswerFeedback.value = null;
    practiceWrittenFeedback.value = null;
    lastPracticeWrittenInput.value = null;
    practiceAnswerBusy.value = false;
    learnIsNavigating.value = false;
}

async function submitPracticeChoice(
    questionId: string,
    selected: PracticeChoiceValue,
    correct: PracticeChoiceValue,
) {
    if (practiceAnswerBusy.value) return;
    const transitionId = ++practiceAnswerTransitionId.value;
    const isCorrect = selected === correct;
    practiceAnswerFeedback.value = { questionId, selected, correct };
    practiceAnswerBusy.value = true;

    await waitForFeedback((isCorrect ? 1000 : 1800) - 250);
    if (transitionId !== practiceAnswerTransitionId.value) return;

    learnIsNavigating.value = true;
    await waitForFeedback(250);
    if (transitionId !== practiceAnswerTransitionId.value) return;

    learnMarkAnswered(questionId, isCorrect);
    practiceAnswerFeedback.value = null;
    practiceAnswerBusy.value = false;
    learnIsNavigating.value = false;
}

function answerLearnTrueFalse(value: boolean) {
    const q = learnCurrentQuestion.value;
    if (!q || q.kind !== "true_false") return;
    void submitPracticeChoice(q.id, value, q.answer);
}

function answerLearnMultipleChoice(selectedIndex: number) {
    const q = learnCurrentQuestion.value;
    if (!q || q.kind !== "multiple_choice") return;
    void submitPracticeChoice(q.id, selectedIndex, q.answerIndex);
}

async function getWrittenModel(modelId: string) {
    const route = [modelId, ...fallbackModelIds.value];
    const cacheId = route.join("\n");
    if (cachedWrittenModel.value?.id === cacheId) {
        return cachedWrittenModel.value.model;
    }
    const model = await resolveAiModel(route);
    cachedWrittenModel.value = { id: cacheId, model };
    return model;
}

async function answerLearnWritten() {
    const q = learnCurrentQuestion.value;
    if (
        !q ||
        q.kind !== "written" ||
        !practiceWrittenAnswer.value.trim() ||
        practiceAnswerBusy.value
    )
        return;
    const input = {
        questionId: q.id,
        question: q.prompt,
        referenceAnswer: q.answer,
        studentAnswer: practiceWrittenAnswer.value.trim(),
    };
    lastPracticeWrittenInput.value = input;
    await runPracticeWrittenGrade(input);
}

async function runPracticeWrittenGrade(
    input: WrittenAnswerGradeInput & { questionId: string },
) {
    if (practiceAnswerBusy.value) return;
    const question = learnCurrentQuestion.value;
    if (
        !question ||
        question.kind !== "written" ||
        question.id !== input.questionId
    )
        return;

    const transitionId = ++practiceAnswerTransitionId.value;
    const controller = new AbortController();
    practiceWrittenAbort.value?.abort();
    practiceWrittenAbort.value = controller;
    practiceAnswerBusy.value = true;
    practiceWrittenFeedback.value = null;
    learnError.value = null;
    aiError.value = null;
    aiErrorOpen.value = false;

    try {
        let grade: WrittenAnswerGrade;
        if (isWebPreview.value) {
            await waitForFeedback(250);
            grade = gradeWebPreviewWrittenAnswer(input);
        } else {
            if (!defaultModelId.value) {
                aiError.value = aiErrorForMissingDefaultModel();
                aiErrorOpen.value = true;
                return;
            }
            grade = await gradeWrittenAnswer({
                model: await getWrittenModel(defaultModelId.value),
                input,
                abortSignal: controller.signal,
            });
        }

        if (
            controller.signal.aborted ||
            transitionId !== practiceAnswerTransitionId.value
        )
            return;
        practiceWrittenFeedback.value = {
            questionId: input.questionId,
            ...grade,
        };
    } catch (error) {
        if (controller.signal.aborted) return;
        aiError.value = normalizeAiError(error);
        aiErrorOpen.value = true;
    } finally {
        if (practiceWrittenAbort.value === controller) {
            practiceWrittenAbort.value = null;
        }
        if (
            !controller.signal.aborted &&
            transitionId === practiceAnswerTransitionId.value
        ) {
            practiceAnswerBusy.value = false;
        }
    }
}

async function retryPracticeWrittenAnswer() {
    aiErrorOpen.value = false;
    const input = lastPracticeWrittenInput.value;
    if (!input) return;
    await runPracticeWrittenGrade(input);
}

async function continueAfterWrittenFeedback() {
    const feedback = practiceWrittenFeedback.value;
    if (!feedback || practiceAnswerBusy.value) return;
    const transitionId = ++practiceAnswerTransitionId.value;
    practiceAnswerBusy.value = true;
    learnIsNavigating.value = true;
    await waitForFeedback(250);
    if (transitionId !== practiceAnswerTransitionId.value) return;
    learnMarkAnswered(feedback.questionId, feedback.isCorrect);
    practiceWrittenAnswer.value = "";
    practiceWrittenFeedback.value = null;
    lastPracticeWrittenInput.value = null;
    practiceAnswerBusy.value = false;
    learnIsNavigating.value = false;
}

function parseLearnAugmentJson(raw: string): LearnQuestion[] {
    if (typeof raw !== "string") return [];
    const text = raw.trim();
    if (!text) return [];
    let data: any;
    try {
        data = JSON.parse(text);
    } catch {
        return [];
    }
    const list = Array.isArray(data?.questions) ? data.questions : [];
    const out: LearnQuestion[] = [];
    for (let i = 0; i < list.length; i += 1) {
        const q = list[i];
        if (!q || typeof q !== "object") continue;
        if (q.kind === "true_false") {
            const term = typeof q.term === "string" ? q.term.trim() : "";
            const def =
                typeof q.definition === "string" ? q.definition.trim() : "";
            const ans = typeof q.answer === "boolean" ? q.answer : null;
            if (!term || !def || ans === null) continue;
            out.push({
                id: `ai:tf:${i}:${term}`,
                kind: "true_false",
                prompt: `True or False: "${term}" means "${def}".`,
                answer: ans,
                termId: "ai" as Uuid,
            });
            continue;
        }
        if (q.kind === "multiple_choice") {
            const term = typeof q.term === "string" ? q.term.trim() : "";
            const choices = Array.isArray(q.choices)
                ? q.choices
                      .filter((c: any) => typeof c === "string")
                      .map((c: string) => c.trim())
                : [];
            const answerIndex = Number.isFinite(q.answerIndex)
                ? Math.floor(q.answerIndex)
                : -1;
            const unique = new Set(choices);
            if (!term || choices.length !== 4) continue;
            if (unique.size !== 4) continue;
            if (answerIndex < 0 || answerIndex >= 4) continue;

            out.push({
                id: `ai:mc:${i}:${term}`,
                kind: "multiple_choice",
                prompt: `What is the definition of "${term}"?`,
                options: choices,
                answerIndex,
                termId: "ai" as Uuid,
            });
        }
    }
    return out;
}

function buildLearnAugmentPrompt(args: {
    title: string;
    description: string | null;
    terms: { front: string; back: string }[];
    count: number;
}) {
    const descLine = args.description?.trim()
        ? `Description: ${args.description.trim()}\n`
        : "";
    const tsvLines = args.terms
        .map(
            (t) =>
                `${String(t.front).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim()}\t${String(t.back).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim()}`,
        )
        .join("\n");

    return [
        "You are generating extra study questions for a flashcard deck.",
        "Return ONLY JSON (no markdown, no prose).",
        "",
        "Schema:",
        '{"questions":[{"kind":"true_false","term":"...","definition":"...","answer":true}|{"kind":"multiple_choice","term":"...","choices":["...","...","...","..."],"answerIndex":0}]}',
        "",
        `Count: ${args.count}`,
        "",
        `Set title: ${args.title}`,
        descLine.trimEnd(),
        "",
        "Deck (TSV: term<TAB>definition):",
        tsvLines,
    ]
        .filter((x) => x.length > 0)
        .join("\n");
}

async function buildLearnQuestionsForSet(s: FlashcardSet) {
    const seed = learnSeed();
    const selectedTypes = enabledPracticeQuestionTypes();
    const baseline = generateLearnQuestions(s.terms, {
        seed,
        maxQuestions: Math.min(
            practiceQuestionCount.value,
            practiceQuestionLimit.value,
        ),
        questionTypes: selectedTypes,
        shuffle: practiceShuffle.value,
    });
    if (!learnHybridEnabled.value) return baseline;
    if (!defaultModelId.value) return baseline;
    if (isWebPreview.value) return baseline;

    learnBusy.value = true;
    try {
        const model = await resolveAiModel([defaultModelId.value, ...fallbackModelIds.value]);
        const prompt = buildLearnAugmentPrompt({
            title: s.title,
            description: s.description,
            terms: s.terms.map((t) => ({ front: t.front, back: t.back })),
            count: 10,
        });
        const res = await generateText({ model, prompt });
        const extra = parseLearnAugmentJson(res.text ?? "").filter((question) =>
            selectedTypes.includes(question.kind),
        );
        return [...baseline, ...extra].slice(
            0,
            Math.min(practiceQuestionCount.value, practiceQuestionLimit.value),
        );
    } catch {
        return baseline;
    } finally {
        learnBusy.value = false;
    }
}

async function startLearnRun(options?: {
    resetCounter?: boolean;
    startTimer?: boolean;
}) {
    cancelPracticeAnswerFeedback();
    const s = set.value;
    if (!s) return;
    if (options?.resetCounter) learnRunCounter.value = 0;
    learnError.value = null;
    learnBusy.value = true;
    try {
        const list = await buildLearnQuestionsForSet(s);
        learnQuestions.value = list;
        learnCursorIndex.value = 0;
        learnAnswersByQuestionId.value = {};
        practiceWrittenAnswer.value = "";
        if (options?.startTimer && list.length > 0) startPracticeTimer();
    } catch {
        learnError.value = "Failed to generate questions.";
        learnQuestions.value = [];
        learnCursorIndex.value = 0;
        learnAnswersByQuestionId.value = {};
    } finally {
        learnBusy.value = false;
    }
}

function currentPracticeProgress(): PracticeProgress | null {
    const currentSet = set.value;
    if (!currentSet || learnQuestions.value.length === 0) return null;
    return {
        setUpdatedAt: currentSet.updatedAt,
        currentQuestionId: learnCurrentQuestion.value?.id ?? null,
        questions: learnQuestions.value,
        answersByQuestionId: learnAnswersByQuestionId.value,
    };
}

function persistPracticeRun() {
    if (!practiceProgressReady.value) return;
    const currentSet = set.value;
    const progress = currentPracticeProgress();
    if (!currentSet || !progress) return;
    const signature = JSON.stringify(progress);
    if (signature === savedPracticeProgressSignature.value) return;
    savedPracticeProgressSignature.value = signature;
    void savePracticeProgress(
        currentSet.id,
        progress,
        isWebPreview.value,
    ).catch(() => {});
}

async function initializePracticeRun() {
    const currentSet = set.value;
    if (!currentSet) return;
    practiceProgressReady.value = false;
    const saved = await loadPracticeProgress(currentSet.id, isWebPreview.value);
    if (
        saved &&
        (isWebPreview.value || saved.setUpdatedAt === currentSet.updatedAt) &&
        saved.questions.length > 0
    ) {
        const questionIds = new Set(
            saved.questions.map((question) => question.id),
        );
        learnQuestions.value = saved.questions;
        learnAnswersByQuestionId.value = Object.fromEntries(
            Object.entries(saved.answersByQuestionId).filter(([questionId]) =>
                questionIds.has(questionId),
            ),
        );
        const savedIndex = saved.currentQuestionId
            ? saved.questions.findIndex(
                  (question) => question.id === saved.currentQuestionId,
              )
            : -1;
        const firstUnansweredIndex = saved.questions.findIndex(
            (question) =>
                learnAnswersByQuestionId.value[question.id] === undefined,
        );
        learnCursorIndex.value =
            savedIndex >= 0
                ? savedIndex
                : firstUnansweredIndex >= 0
                  ? firstUnansweredIndex
                  : 0;
        savedPracticeProgressSignature.value = JSON.stringify(
            currentPracticeProgress(),
        );
        practiceProgressReady.value = true;
        return;
    }

    await startLearnRun({ resetCounter: true });
    savedPracticeProgressSignature.value = null;
    practiceProgressReady.value = true;
    persistPracticeRun();
}

function applyPracticeSettings() {
    practiceSettingsOpen.value = false;
    if (practiceSessionMode.value === "test") {
        const currentSet = set.value;
        if (!currentSet) return;
        clampPracticeQuestionCount();
        void router.push({
            path: `/set/${currentSet.id}-test`,
            query: {
                assignment: assignedAssignmentId.value ?? undefined,
                class:
                    typeof route.query.class === "string"
                        ? route.query.class
                        : undefined,
                types: enabledPracticeQuestionTypes().join(","),
                count: String(practiceQuestionCount.value),
                shuffle: practiceShuffle.value ? "1" : "0",
                timed: practiceTimed.value ? "1" : "0",
                minutes: String(practiceTimeLimitMinutes.value),
                seed: String(learnSeed()),
            },
        });
        return;
    }
    learnRunCounter.value += 1;
    void startLearnRun({ startTimer: true });
    beginClassroomPractice();
}

async function loadSet(setId: Uuid) {
    busy.value = true;
    loadError.value = null;
    try {
        const db = await useTracerDb();
        set.value = await createSetsRepo(db).get(setId);
    } catch {
        loadError.value = "Failed to load set.";
    } finally {
        busy.value = false;
    }
}

watch(language, async () => {
    if (!isWebPreview.value) return;
    set.value = createWebPreviewDemoSet(t);
    await startLearnRun({ resetCounter: true });
});

watch(learnCurrentQuestion, () => {
    practiceWrittenAnswer.value = "";
});

watch(
    () => {
        const progress = currentPracticeProgress();
        return progress ? JSON.stringify(progress) : null;
    },
    () => persistPracticeRun(),
    { flush: "post" },
);

watch(practiceTimed, (enabled) => {
    if (!enabled) clearPracticeTimer();
});

onMounted(async () => {
    window.addEventListener("pagehide", onPageHide);
    try {
        if (isWebPreview.value) {
            set.value = createWebPreviewDemoSet(t);
            busy.value = false;
            await initializePracticeRun();
            return;
        }

        const status = await lockGetStatus();
        const db = await useTracerDb();

        const profile = await createProfileRepo(db).get();
        if (!profile || !status.has_verifier) {
            markLocked();
            await router.replace("/first-run");
            return;
        }

        const settings = await createSettingsRepo(db).get();
        defaultModelId.value = settings.defaultModelId;
        fallbackModelIds.value = settings.fallbackModelIds;
        learnHybridEnabled.value = settings.learnHybridEnabled;

        if (settings.startupLockEnabled && status.requires_unlock) {
            if (!unlockedThisSession.value) {
                markLocked();
                await router.replace("/unlock");
                return;
            }
        } else if (status.can_auto_unlock) {
            markUnlocked();
        }

        const idParam = route.params.id;
        if (typeof idParam !== "string" || !idParam.trim()) {
            busy.value = false;
            loadError.value = "Missing set id.";
            return;
        }

        await loadSet(idParam as Uuid);

        if (set.value) {
            await initializePracticeRun();
            beginClassroomPractice();
        }
    } catch {
        const tauriInvoke = typeof (globalThis as any)?.__TAURI_INTERNALS__
            ?.invoke;
        if (tauriInvoke !== "function") {
            set.value = createWebPreviewDemoSet(t);
            busy.value = false;
            await initializePracticeRun();
            return;
        }

        busy.value = false;
        if (!loadError.value) loadError.value = "Failed to open set.";
    }
});

onBeforeRouteLeave(() => {
    finishClassroomPractice();
});

onBeforeUnmount(() => {
    finishClassroomPractice();
    window.removeEventListener("pagehide", onPageHide);
    cancelPracticeAnswerFeedback();
    clearPracticeTimer();
});
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
