<template>
    <main class="flex min-h-screen flex-col bg-white dark:bg-slate-950">
        <!-- Header with Back button and progress -->
        <div
            class="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950"
        >
            <div class="flex items-center justify-between gap-4">
                <BackButton />
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
                        class="inline-flex items-center gap-2 rounded-md bg-amber-50/60 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm outline-none hover:bg-amber-50 active:bg-amber-100 focus:outline-none focus-visible:outline-none dark:bg-amber-950/20 dark:text-white dark:hover:bg-amber-950/30"
                        :disabled="practiceAnswerBusy"
                        :aria-expanded="practiceSettingsOpen"
                        @click="openPracticeSettings"
                    >
                        <span aria-hidden="true">⚙</span> Settings
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div
            class="flex flex-1 flex-col items-center justify-start px-6 py-8"
        >
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
                class="mb-6 w-full max-w-4xl rounded-2xl border border-amber-200 bg-amber-50/40 p-5 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/10"
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

            <div
                v-if="learnBusy"
                class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
                Preparing questions…
            </div>

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
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                            :disabled="!set || learnQuestions.length === 0"
                            @click="restartLearnRun"
                        >
                            {{ t("common.restart") }}
                        </button>
                        <NuxtLink
                            v-if="set"
                            :to="`/set/${set.id}`"
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
                    class="rounded-lg border border-amber-200 bg-amber-50/20 p-8 dark:border-amber-900/60 dark:bg-amber-950/10"
                    :class="{
                        'animate-slide-left': learnIsNavigating,
                    }"
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
                                :class="
                                    practiceTrueFalseChoiceClass(true)
                                "
                                :disabled="
                                    learnBusy || practiceAnswerBusy
                                "
                                @click="answerLearnTrueFalse(true)"
                            >
                                {{ t("common.true") }}
                            </button>
                            <button
                                type="button"
                                class="inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2.5 text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                :class="
                                    practiceTrueFalseChoiceClass(false)
                                "
                                :disabled="
                                    learnBusy || practiceAnswerBusy
                                "
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
                                :class="
                                    practiceMultipleChoiceClass(idx)
                                "
                                :disabled="
                                    learnBusy || practiceAnswerBusy
                                "
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
                            class="grid gap-3"
                            @submit.prevent="answerLearnWritten"
                        >
                            <label
                                for="fullscreen-written-answer"
                                class="text-sm font-medium text-slate-700 dark:text-slate-200"
                                >Your answer</label
                            >
                            <textarea
                                id="fullscreen-written-answer"
                                v-model="practiceWrittenAnswer"
                                rows="5"
                                autofocus
                                class="w-full resize-y rounded-lg border border-amber-200 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-amber-900/60 dark:bg-slate-950 dark:text-white"
                                placeholder="Type the definition..."
                            />
                            <button
                                type="submit"
                                class="justify-self-end rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300 disabled:opacity-50"
                                :disabled="
                                    !practiceWrittenAnswer.trim() ||
                                    practiceAnswerBusy
                                "
                            >
                                Submit answer
                            </button>
                        </form>
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
    generateLearnQuestions,
    type LearnQuestion,
    type LearnQuestionKind,
} from "~/src/composables/learn/generator";
import { resolveAiModel } from "~/src/composables/ai/registry";
import { generateText } from "ai";
import { useAppLanguage } from "~/src/composables/language";
import { createWebPreviewDemoSet } from "~/src/composables/demo-content";

const route = useRoute();
const router = useRouter();
const { language, t } = useAppLanguage();
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession();

const isWebPreview = computed(() => !hasTauriRuntime());

const busy = ref(true);
const loadError = ref<string | null>(null);
const set = ref<FlashcardSet | null>(null);
const defaultModelId = ref<string | null>(null);
const learnHybridEnabled = ref(false);

const learnBusy = ref(false);
const learnError = ref<string | null>(null);

const learnRunCounter = ref(0);
const learnCursorIndex = ref(0);
const learnQuestions = ref<LearnQuestion[]>([]);
const learnAnswersByQuestionId = ref<Record<string, boolean>>({});
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
    written: false,
});
const practiceQuestionCount = ref(10);
const practiceShuffle = ref(true);
const practiceTimed = ref(false);
const practiceTimeLimitMinutes = ref(10);
const practiceSecondsRemaining = ref(10 * 60);
const practiceTimedOut = ref(false);
const practiceWrittenAnswer = ref("");
const practiceTimerHandle = shallowRef<number | null>(null);
type PracticeChoiceValue = boolean | number;
type PracticeAnswerFeedback = {
    questionId: string;
    selected: PracticeChoiceValue;
    correct: PracticeChoiceValue;
};
const practiceAnswerFeedback = ref<PracticeAnswerFeedback | null>(null);
const practiceAnswerBusy = ref(false);
const learnIsNavigating = ref(false);
const practiceAnswerTransitionId = ref(0);

const baseSeed = computed(() => {
    const raw = route.query.seed;
    if (typeof raw !== "string") return null;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
});

function getRandomSeed() {
    try {
        const buf = new Uint32Array(1);
        (globalThis.crypto as Crypto | undefined)?.getRandomValues?.(buf);
        const v = Number(buf[0] ?? 0);
        if (Number.isFinite(v) && v !== 0) return v;
    } catch {}
    return Date.now() ^ Math.floor(Math.random() * 0xffffffff);
}

function learnSeed() {
    const s = baseSeed.value;
    if (s !== null) return s + learnRunCounter.value;
    return getRandomSeed() ^ (learnRunCounter.value * 2654435761);
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

function practiceChoiceFeedbackClass(choice: PracticeChoiceValue) {
    const feedback = practiceAnswerFeedback.value;
    const question = learnCurrentQuestion.value;
    if (!feedback || !question || feedback.questionId !== question.id) {
        return null;
    }
    if (choice === feedback.correct) {
        return "border-2 border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-200 focus-visible:ring-emerald-300 dark:border-emerald-500 dark:bg-emerald-950/35 dark:text-emerald-50 dark:ring-emerald-900/70";
    }
    if (choice === feedback.selected) {
        return "border-2 border-red-700 bg-red-50/80 text-red-950 ring-2 ring-red-200 focus-visible:ring-red-300 dark:border-red-500 dark:bg-red-950/40 dark:text-red-50 dark:ring-red-900/70";
    }
    return null;
}

function practiceTrueFalseChoiceClass(choice: boolean) {
    const feedbackClass = practiceChoiceFeedbackClass(choice);
    if (feedbackClass) return feedbackClass;
    if (choice) {
        return "border-amber-500 bg-amber-400 text-slate-950 hover:bg-amber-300 focus-visible:ring-amber-300 dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300";
    }
    return "border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900";
}

function practiceMultipleChoiceClass(choice: number) {
    const feedbackClass = practiceChoiceFeedbackClass(choice);
    if (feedbackClass) return feedbackClass;
    return "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500";
}

function waitForFeedback(ms: number) {
    return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function cancelPracticeAnswerFeedback() {
    practiceAnswerTransitionId.value += 1;
    practiceAnswerFeedback.value = null;
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

function normalizeWrittenAnswer(value: string) {
    return value
        .toLocaleLowerCase()
        .replace(/[`*_~#[\]()]/g, "")
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
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
    const transitionId = ++practiceAnswerTransitionId.value;
    const isCorrect =
        normalizeWrittenAnswer(practiceWrittenAnswer.value) ===
        normalizeWrittenAnswer(q.answer);
    practiceAnswerBusy.value = true;
    learnIsNavigating.value = true;
    await waitForFeedback(250);
    if (transitionId !== practiceAnswerTransitionId.value) return;
    learnMarkAnswered(q.id, isCorrect);
    practiceWrittenAnswer.value = "";
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
        const model = await resolveAiModel(defaultModelId.value);
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

function restartLearnRun() {
    learnRunCounter.value += 1;
    void startLearnRun({ startTimer: true });
}

function applyPracticeSettings() {
    practiceSettingsOpen.value = false;
    learnRunCounter.value += 1;
    void startLearnRun({ startTimer: true });
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

watch(practiceTimed, (enabled) => {
    if (!enabled) clearPracticeTimer();
});

onMounted(async () => {
    try {
        if (isWebPreview.value) {
            set.value = createWebPreviewDemoSet(t);
            busy.value = false;
            await startLearnRun({ resetCounter: true });
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
            await startLearnRun({ resetCounter: true });
        }
    } catch {
        const tauriInvoke = typeof (globalThis as any)?.__TAURI_INTERNALS__
            ?.invoke;
        if (tauriInvoke !== "function") {
            set.value = createWebPreviewDemoSet(t);
            busy.value = false;
            await startLearnRun({ resetCounter: true });
            return;
        }

        busy.value = false;
        if (!loadError.value) loadError.value = "Failed to open set.";
    }
});

onBeforeUnmount(() => {
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
