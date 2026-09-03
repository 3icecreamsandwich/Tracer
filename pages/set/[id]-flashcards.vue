<template>
    <main class="flex flex-col h-8/9 bg-white dark:bg-slate-950">
        <!-- Header with Back button and progress -->
        <div
            class="border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 select-none"
        >
            <div class="flex items-center justify-between gap-4">
                <BackButton native-window-controls-safe />
                <div class="flex items-center gap-4">
                    <p
                        class="text-sm font-medium text-slate-600 dark:text-slate-300 select-none"
                    >
                        {{ ratioText }}
                    </p>
                    <div ref="flashcardSettingsMenuRoot" class="relative">
                        <button
                            ref="flashcardSettingsButtonEl"
                            type="button"
                            class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                            :aria-label="t('set.flashcardSettings')"
                            :title="t('set.flashcardSettings')"
                            :aria-expanded="flashcardSettingsOpen"
                            aria-haspopup="menu"
                            @click="
                                flashcardSettingsOpen = !flashcardSettingsOpen
                            "
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

                        <div
                            v-if="flashcardSettingsOpen"
                            class="absolute end-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
                            role="menu"
                            :aria-label="t('set.flashcardSettings')"
                        >
                            <button
                                type="button"
                                role="menuitemcheckbox"
                                :aria-checked="shuffleEnabled"
                                class="flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900"
                                :disabled="totalCount === 0"
                                @click="shuffleFromFlashcardSettings"
                            >
                                <span>{{ t("set.shuffle") }}</span>
                                <span class="w-4 text-center" aria-hidden="true">{{ shuffleEnabled ? "✓" : "" }}</span>
                            </button>
                            <button
                                type="button"
                                role="menuitemcheckbox"
                                class="flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 dark:text-slate-50 dark:hover:bg-slate-900"
                                :aria-checked="smartReviewEnabled"
                                @click="toggleSmartReview"
                            >
                                <span>Smart Review</span><span aria-hidden="true">{{ smartReviewEnabled ? "✓" : "" }}</span>
                            </button>
                            <button
                                type="button"
                                role="menuitemcheckbox"
                                :aria-checked="starredOnly"
                                class="flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900"
                                :disabled="
                                    starredStudyCount === 0 && !starredOnly
                                "
                                @click="toggleStarredOnlyFromFlashcardSettings"
                            >
                                <span>{{ t("set.starredOnly") }}</span>
                                <span
                                    class="w-4 text-center"
                                    aria-hidden="true"
                                    >{{ starredOnly ? "✓" : "" }}</span
                                >
                            </button>
                            <button
                                type="button"
                                role="menuitem"
                                class="flex w-full items-center px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900"
                                :disabled="allStudyTermIds.length === 0"
                                @click="restartFromFlashcardSettings"
                            >
                                {{ t("common.restart") }}
                            </button>
                            <div
                                class="my-1 border-t border-slate-200 dark:border-slate-800"
                            />
                            <button
                                type="button"
                                role="menuitem"
                                class="flex w-full items-center px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900"
                                :disabled="flashcardFrontPreferenceBusy"
                                @click="togglePreferredFlashcardFront"
                            >
                                {{ preferredFlashcardFrontOptionLabel }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col items-center justify-center px-6 py-8">
            <!-- Title -->
            <div class="mb-6 text-center select-none">
                <h1
                    class="text-xl font-semibold text-slate-900 dark:text-slate-50"
                >
                    {{ t("set.flashcards") }}
                </h1>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {{ t("set.flashcardInstructions") }}
                </p>
                <div v-if="smartReviewEnabled" class="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                    <button v-for="filter in reviewFilters" :key="filter.value" type="button"
                        class="rounded-full border px-3 py-1 transition-colors"
                        :class="reviewFilter === filter.value ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200' : 'border-slate-200 text-slate-600 hover:border-amber-300 dark:border-slate-700 dark:text-slate-300'"
                        @click="setReviewFilter(filter.value)">
                        {{ filter.label }} ({{ filter.count }})
                    </button>
                    <p
                        v-if="dueCount === 0 && nextReviewText"
                        class="w-full pt-1 text-slate-500 dark:text-slate-400"
                    >
                        Nothing due · Next {{ nextReviewText }}
                    </p>
                </div>
            </div>

            <!-- Results -->
            <div v-if="isFinished" class="w-full max-w-2xl select-none">
                <div
                    class="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900 select-none"
                >
                    <h2
                        class="text-2xl font-semibold text-slate-900 dark:text-slate-50"
                    >
                        {{ t("common.results") }}
                    </h2>
                    <p class="mt-4 text-lg text-slate-700 dark:text-slate-200">
                        {{ t("set.accuracy") }}
                        <span class="font-medium">{{ accuracyText }}</span>
                    </p>
                    <p
                        class="mt-2 text-sm text-slate-600 dark:text-slate-300 select-none"
                    >
                        {{ t("set.correct") }} {{ correctCount }} ·
                        {{ t("set.attempted") }} {{ attemptedCount }}
                    </p>

                    <div
                        class="mt-6 flex flex-wrap justify-center gap-2 select-none"
                    >
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                            :disabled="allStudyTermIds.length === 0"
                            @click="restartConfiguredRun"
                        >
                            {{ t("common.restart") }}
                        </button>
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

            <!-- Card -->
            <div v-else class="w-full flex flex-col items-center">
                <button
                    ref="viewerButtonEl"
                    type="button"
                    class="relative flex flex-col items-center justify-center w-[75vw] h-[60vh] rounded-lg px-8 py-12 text-center shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                    :class="[
                        flashcardSurfaceClass,
                        {
                            'animate-flip': isFlipping,
                            'animate-slide-left': isNavigating === 'next',
                            'animate-slide-right': isNavigating === 'prev',
                        },
                    ]"
                    :disabled="totalCount === 0 || flashcardAnswerBusy"
                    @click="toggleFlip"
                >
                    <span
                        v-if="isCurrentRetry"
                        class="absolute top-4 right-4 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-100"
                    >
                        {{ t("set.tryAgain") }}
                    </span>
                    <p
                        class="text-sm font-medium text-slate-500 dark:text-slate-400"
                    >
                        {{
                            showingDefinition
                                ? t("create.definition")
                                : t("create.term")
                        }}
                    </p>
                    <div
                        class="flashcard-content-row mt-4 flex w-full flex-row items-center justify-center overflow-y-auto text-center text-4xl font-medium text-slate-900 dark:text-slate-50"
                        :class="{
                            'flashcard-content-row--paired':
                                viewerImage && viewerHasText,
                        }"
                    >
                        <img
                            v-if="viewerImage"
                            class="flashcard-side-image shrink-0 border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-950/70"
                            :src="viewerImage.dataUrl"
                            :alt="viewerImage.filename"
                        />
                        <div
                            v-if="viewerHasText"
                            class="flashcard-side-text"
                            :class="{
                                'flashcard-side-text--paired': viewerImage,
                            }"
                        >
                            <MarkdownRenderer
                                :markdown="viewerText"
                                variant="flashcard"
                            />
                        </div>
                    </div>
                </button>

                <div
                    v-if="isStarredOnlyEmpty"
                    class="mt-4 w-full max-w-2xl rounded-md border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                    {{ t("set.noStarred") }}
                </div>

                <!-- Controls -->
                <div
                    class="mt-6 flex flex-wrap items-center justify-between w-[75vw]"
                >
                    <div class="flex flex-wrap gap-3">
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-amber-600 shadow-sm hover:border-amber-200 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-amber-400 dark:hover:bg-amber-950/30"
                            :disabled="
                                totalCount === 0 ||
                                cursorIndex === 0 ||
                                flashcardAnswerBusy
                            "
                            @click="goPrev"
                        >
                            ← {{ t("set.previous") }}
                        </button>

                        <button
                            type="button"
                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                            :disabled="
                                totalCount === 0 ||
                                cursorIndex >= order.length - 1 ||
                                flashcardAnswerBusy
                            "
                            @click="goNext"
                        >
                            {{ t("set.next") }} →
                        </button>
                    </div>

                    <div class="flex flex-wrap gap-3">
                        <button
                            type="button"
                            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-amber-500 bg-white p-0 text-sm font-medium text-amber-500 shadow-sm hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-amber-400 dark:bg-slate-950 dark:text-amber-400 dark:hover:bg-amber-950/30"
                            :disabled="!currentTerm || starBusy"
                            :aria-pressed="isCurrentStarred"
                            :aria-label="
                                isCurrentStarred ? 'Unstar card' : 'Star card'
                            "
                            @click="toggleStar"
                        >
                            {{ isCurrentStarred ? "★" : "☆" }}
                        </button>

                        <button
                            type="button"
                            class="inline-flex h-10 items-center justify-center rounded-md border border-[#C14D4D] bg-white px-3 text-sm font-medium text-[#C14D4D] shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-950 dark:hover:bg-slate-900"
                            :disabled="!currentTerm || flashcardAnswerBusy"
                            @click="markIncorrect"
                        >
                            {{ t("set.missed") }}
                        </button>

                        <button
                            type="button"
                            class="inline-flex h-10 items-center justify-center rounded-md border border-[#2D8210] bg-white px-3 text-sm font-medium text-[#2D8210] shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-950 dark:hover:bg-slate-900"
                            :disabled="!currentTerm || flashcardAnswerBusy"
                            @click="markCorrect"
                        >
                            {{ t("set.gotIt") }}
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
import { useAppLanguage } from "~/src/composables/language";
import { createWebPreviewDemoSet } from "~/src/composables/demo-content";
import type { FlashcardSet, Uuid } from "~/src/composables/db/types";
import {
    createFlashcardProgressRepo,
    createProfileRepo,
    createSettingsRepo,
    createSetsRepo,
    createStarsRepo,
    useTracerDb,
} from "~/src/composables/db";
import { lockGetStatus } from "~/src/composables/lock";
import { useLockSession } from "~/src/composables/lock-session";
import { hasTauriRuntime } from "~/src/composables/tauri";
import {
    beginAssignedAttempt,
    completeAssignedAttempt,
    parseAssignedAssignmentId,
} from "~/src/composables/assignment-progress";
import {
    readWebFlashcardFrontPreference,
    readWebFlashcardProgress,
    saveWebFlashcardFrontPreference,
    saveWebFlashcardProgress,
    type SavedFlashcardProgress,
} from "~/src/composables/cards/web-flashcard-state";
import { createFlashcardMotion } from "~/src/composables/cards/flashcard-motion";
import { createFlashcardRun } from "~/src/composables/cards/flashcard-run";
import { getCardReviews, isFlashcardShuffleEnabled, isSmartReviewEnabled, recordCardReview, reviewBucket, saveFlashcardShuffleEnabled, saveSmartReviewEnabled, type CardReview, type ReviewBucket } from "~/src/composables/cards/spaced-repetition";

const { language, t } = useAppLanguage();

const route = useRoute();
const router = useRouter();
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

function beginClassroomFlashcards() {
    if (!set.value) return;
    beginAssignedAttempt({
        assignmentId: assignedAssignmentId.value,
        setId: set.value.id,
        mode: "flashcards",
    });
}

let assignedSessionFinished = false;
const assignedSessionCorrect = ref(0);
const assignedSessionAttempted = ref(0);

function finishClassroomFlashcards() {
    if (assignedSessionFinished || !set.value) return;
    assignedSessionFinished = true;
    void completeAssignedAttempt({
        assignmentId: assignedAssignmentId.value,
        setId: set.value.id,
        mode: "flashcards",
        scoreEarned: assignedSessionCorrect.value,
        scorePossible: assignedSessionAttempted.value,
    });
}

function onPageHide() {
    finishClassroomFlashcards();
}

const busy = ref(true);
const loadError = ref<string | null>(null);
const set = ref<FlashcardSet | null>(null);

const isFlipped = ref(false);
const isFlipping = ref(false);
const isNavigating = ref<"prev" | "next" | null>(null);
const flashcardAnswerFeedback = ref<"correct" | "incorrect" | null>(null);
const flashcardAnswerBusy = ref(false);
const flashcardAnswerTransitionId = ref(0);

const runCounter = ref(0);
const cursorIndex = ref(0);
const order = ref<Uuid[]>([]);
const lastOrder = ref<Uuid[]>([]);
const answersByTermId = ref<Record<Uuid, "correct" | "incorrect">>({});
const answerAttemptsCount = ref(0);
const correctAnswerAttemptsCount = ref(0);
const retryTermIds = ref<Set<Uuid>>(new Set());

const starredTermIds = ref<Set<Uuid>>(new Set());
const starBusy = ref(false);
const starredOnly = ref(false);
const flashcardSettingsOpen = ref(false);
const flashcardSettingsMenuRoot = ref<HTMLElement | null>(null);
const flashcardSettingsButtonEl = ref<HTMLButtonElement | null>(null);
const flashcardsDefinitionFirst = ref(false);
const flashcardFrontPreferenceBusy = ref(false);
const smartReviewEnabled = ref(false);
const shuffleEnabled = ref(false);
const reviewOwnerId = ref<Uuid | null>(null);
const reviewFilter = ref<'all' | ReviewBucket>('all');
const cardReviews = ref<Record<Uuid, CardReview>>({});
const reviewClock = ref(Date.now());
let reviewClockTimer: ReturnType<typeof setInterval> | null = null;
type ReviewRunSnapshot = {
    order: Uuid[];
    cursorIndex: number;
    answers: Record<Uuid, 'correct' | 'incorrect'>;
    attempts: number;
    correctAttempts: number;
    retries: Uuid[];
};
const reviewRunSnapshots = ref<Partial<Record<'all' | ReviewBucket, ReviewRunSnapshot>>>({});
const savedFlashcardTermId = ref<Uuid | null>(null);
const savedFlashcardCorrectTermIds = ref<Uuid[]>([]);
const savedFlashcardProgressSignature = ref<string | null>(null);

const preferredFlashcardFrontOptionLabel = computed(() =>
    flashcardsDefinitionFirst.value
        ? t("set.termAtFront")
        : t("set.definitionAtFront"),
);

async function loadSavedFlashcardProgress(setId: Uuid) {
    if (isWebPreview.value) return readWebFlashcardProgress(setId);
    try {
        const db = await useTracerDb();
        return await createFlashcardProgressRepo(db).get(setId);
    } catch {
        return null;
    }
}

function persistFlashcardProgress(termId: Uuid) {
    const setId = set.value?.id as Uuid | undefined;
    if (!setId) return;
    const correctTermIds = allStudyTermIds.value.filter(
        (id) => answersByTermId.value[id] === "correct",
    );
    const progress = { currentTermId: termId, correctTermIds };
    const signature = JSON.stringify(progress);
    if (savedFlashcardProgressSignature.value === signature) return;
    savedFlashcardTermId.value = termId;
    savedFlashcardCorrectTermIds.value = correctTermIds;
    savedFlashcardProgressSignature.value = signature;
    if (isWebPreview.value) {
        saveWebFlashcardProgress(setId, progress);
        return;
    }
    void useTracerDb()
        .then((db) => createFlashcardProgressRepo(db).save(setId, progress))
        .catch(() => {});
}

async function togglePreferredFlashcardFront() {
    if (flashcardFrontPreferenceBusy.value) return;
    const previous = flashcardsDefinitionFirst.value;
    const next = !previous;
    flashcardSettingsOpen.value = false;
    flashcardsDefinitionFirst.value = next;
    isFlipped.value = false;
    flashcardFrontPreferenceBusy.value = true;
    try {
        if (isWebPreview.value) {
            saveWebFlashcardFrontPreference(next);
        } else {
            const db = await useTracerDb();
            await createSettingsRepo(db).set({
                flashcardsDefinitionFirst: next,
            });
        }
    } catch {
        flashcardsDefinitionFirst.value = previous;
    } finally {
        flashcardFrontPreferenceBusy.value = false;
        nextTick(() => flashcardSettingsButtonEl.value?.focus());
    }
}

function onDocumentFlashcardSettingsPointerDown(event: PointerEvent) {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (flashcardSettingsMenuRoot.value?.contains(target)) return;
    flashcardSettingsOpen.value = false;
}

const baseSeed = computed(() => {
    const raw = route.query.seed;
    if (typeof raw !== "string") return null;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
});

const viewerButtonEl = ref<HTMLButtonElement | null>(null);

const allStudyTermIds = computed(() => {
    const s = set.value;
    if (!s) return [];
    return s.terms.map((t) => t.id as Uuid);
});

const studyTermIds = computed(() => {
    const s = set.value;
    if (!s) return [];
    let ids = allStudyTermIds.value;
    if (smartReviewEnabled.value && reviewFilter.value !== 'all') {
        ids = ids.filter(id => reviewBucket(cardReviews.value[id]) === reviewFilter.value);
    } else if (smartReviewEnabled.value) {
        const rank: Record<ReviewBucket, number> = { due: 0, learning: 1, strong: 2 };
        ids = [...ids].sort((a, b) => rank[reviewBucket(cardReviews.value[a])] - rank[reviewBucket(cardReviews.value[b])]);
    }
    if (!starredOnly.value) return ids;
    return ids.filter((id) => starredTermIds.value.has(id));
});

const reviewFilters = computed(() => {
    void reviewClock.value;
    return [
    { value: 'all' as const, label: 'All', count: allStudyTermIds.value.length },
    { value: 'due' as const, label: 'Due', count: allStudyTermIds.value.filter(id => reviewBucket(cardReviews.value[id]) === 'due').length },
    { value: 'learning' as const, label: 'Learning', count: allStudyTermIds.value.filter(id => reviewBucket(cardReviews.value[id]) === 'learning').length },
    { value: 'strong' as const, label: 'Strong', count: allStudyTermIds.value.filter(id => reviewBucket(cardReviews.value[id]) === 'strong').length },
    ];
});

const starredStudyCount = computed(
    () =>
        allStudyTermIds.value.filter((id) => starredTermIds.value.has(id))
            .length,
);

const isStarredOnlyEmpty = computed(
    () => starredOnly.value && starredStudyCount.value === 0,
);

// Keep an active run stable while cards move between Smart Review categories.
const totalCount = computed(() => new Set(order.value).size);

const dueCount = computed(() =>
    (reviewClock.value, allStudyTermIds.value.filter((id) => reviewBucket(cardReviews.value[id]) === 'due').length),
);
const nextReviewText = computed(() => {
    const now = reviewClock.value;
    const next = Object.values(cardReviews.value)
        .map((review) => review.nextReviewAt)
        .filter((time) => time > now)
        .sort((a, b) => a - b)[0];
    if (!next) return null;
    const date = new Date(next);
    const remaining = next - now;
    if (remaining < 60 * 60 * 1000) {
        return `in ${Math.max(1, Math.ceil(remaining / 60_000))} min`;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    const dayOffset = Math.round((day.getTime() - today.getTime()) / 86_400_000);
    if (dayOffset === 0) return `in ${Math.ceil(remaining / 3_600_000)} hr`;
    if (dayOffset === 1) return 'tomorrow';
    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
    }).format(date);
});

const termById = computed(() => {
    const m = new Map<Uuid, FlashcardSet["terms"][number] & { id: Uuid }>();
    const s = set.value;
    if (!s) return m;
    for (const t of s.terms) m.set(t.id as Uuid, t as any);
    return m;
});

const attemptedCount = computed(() => answerAttemptsCount.value);
const correctCount = computed(
    () =>
        Object.values(answersByTermId.value).filter((v) => v === "correct")
            .length,
);
const isFinished = computed(() => {
    const total = totalCount.value;
    return total > 0 && correctCount.value >= total;
});

const ratioText = computed(() => {
    const total = totalCount.value;
    if (total === 0) return "0/0";
    return `${Math.min(correctCount.value, total)}/${total}`;
});

const currentTerm = computed(() => {
    if (isFinished.value) return null;
    const id = order.value[cursorIndex.value];
    if (!id) return null;
    return termById.value.get(id) ?? null;
});

const showingDefinition = computed(
    () => flashcardsDefinitionFirst.value !== isFlipped.value,
);

const viewerText = computed(() => {
    const t = currentTerm.value;
    if (!t) return "No cards.";
    return showingDefinition.value ? t.back : t.front;
});

const viewerHasText = computed(() => viewerText.value.trim().length > 0);

const viewerImage = computed(() => {
    const t = currentTerm.value;
    if (!t) return null;
    return showingDefinition.value
        ? (t.backImage ?? null)
        : (t.frontImage ?? null);
});

const flashcardSurfaceClass = computed(() => {
    if (flashcardAnswerFeedback.value === "correct") {
        return "border-2 border-emerald-600 bg-emerald-50/60 hover:bg-emerald-50/60 focus-visible:ring-emerald-300 dark:border-emerald-500 dark:bg-emerald-950/25 dark:hover:bg-emerald-950/25 dark:focus-visible:ring-emerald-800";
    }
    if (flashcardAnswerFeedback.value === "incorrect") {
        return "border-2 border-red-700 bg-red-50/70 hover:bg-red-50/70 focus-visible:ring-red-300 dark:border-red-500 dark:bg-red-950/30 dark:hover:bg-red-950/30 dark:focus-visible:ring-red-800";
    }
    return "border border-amber-200 bg-amber-50/20 hover:bg-amber-50/40 focus-visible:ring-amber-300 dark:border-amber-900/60 dark:bg-amber-950/10 dark:hover:bg-amber-950/20 dark:focus-visible:ring-amber-800";
});

const isCurrentStarred = computed(() => {
    const t = currentTerm.value;
    if (!t) return false;
    return starredTermIds.value.has(t.id as Uuid);
});

const isCurrentRetry = computed(() => {
    const t = currentTerm.value;
    if (!t) return false;
    const id = t.id as Uuid;
    return (
        retryTermIds.value.has(id) && answersByTermId.value[id] === "incorrect"
    );
});

const accuracyText = computed(() => {
    const attempted = attemptedCount.value;
    if (attempted <= 0) return "0%";
    const pct = Math.round((correctAnswerAttemptsCount.value / attempted) * 100);
    return `${pct}% (${correctAnswerAttemptsCount.value}/${attempted})`;
});

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

const {
    shuffleRun,
    startRun,
    restartRun,
    toggleStarredOnly,
    cancelFlashcardAnswerFeedback,
    markCorrect,
    markIncorrect,
} = createFlashcardRun({
    state: {
        runCounter,
        cursorIndex,
        order,
        lastOrder,
        answersByTermId,
        answerAttemptsCount,
        correctAnswerAttemptsCount,
        retryTermIds,
        starredOnly,
        isFlipped,
        isNavigating,
        answerFeedback: flashcardAnswerFeedback,
        answerBusy: flashcardAnswerBusy,
        answerTransitionId: flashcardAnswerTransitionId,
    },
    hasSet: () => set.value !== null,
    getStudyTermIds: () => studyTermIds.value,
    getCurrentTermId: () => (currentTerm.value?.id as Uuid | undefined) ?? null,
    getBaseSeed: () => baseSeed.value,
    getStarredStudyCount: () => starredStudyCount.value,
    onAnswer: (answer) => {
        assignedSessionAttempted.value += 1;
        if (answer === "correct") assignedSessionCorrect.value += 1;
        const setId = set.value?.id as Uuid | undefined;
        const termId = currentTerm.value?.id as Uuid | undefined;
        if (setId && termId && smartReviewEnabled.value) {
            cardReviews.value = { ...cardReviews.value, [termId]: recordCardReview(setId, termId, answer === 'correct', reviewOwnerId.value) };
        }
    },
    onRestart: beginClassroomFlashcards,
    focusViewer: () => nextTick(() => viewerButtonEl.value?.focus()),
});

function shuffleFromFlashcardSettings() {
    flashcardSettingsOpen.value = false;
    const setId = set.value?.id as Uuid | undefined;
    if (!setId) return;
    shuffleEnabled.value = !shuffleEnabled.value;
    saveFlashcardShuffleEnabled(setId, shuffleEnabled.value, reviewOwnerId.value);
    if (shuffleEnabled.value) {
        shuffleRun();
        return;
    }
    const currentId = currentTerm.value?.id as Uuid | undefined;
    const normalOrder = [...studyTermIds.value];
    order.value = normalOrder;
    lastOrder.value = normalOrder;
    cursorIndex.value = currentId ? Math.max(0, normalOrder.indexOf(currentId)) : 0;
    isFlipped.value = false;
    nextTick(() => viewerButtonEl.value?.focus());
}

function toggleStarredOnlyFromFlashcardSettings() {
    flashcardSettingsOpen.value = false;
    toggleStarredOnly();
}

function restartFromFlashcardSettings() {
    flashcardSettingsOpen.value = false;
    restartConfiguredRun();
}

function startConfiguredRun() {
    if (shuffleEnabled.value) shuffleRun();
    else startRun();
}

function restartConfiguredRun() {
    delete reviewRunSnapshots.value[reviewFilter.value];
    restartRun();
    if (shuffleEnabled.value) shuffleRun();
}

function toggleSmartReview() {
    const setId = set.value?.id as Uuid | undefined;
    if (!setId) return;
    smartReviewEnabled.value = !smartReviewEnabled.value;
    saveSmartReviewEnabled(setId, smartReviewEnabled.value, reviewOwnerId.value);
    flashcardSettingsOpen.value = false;
    reviewRunSnapshots.value = {};
    reviewFilter.value = 'all';
    startConfiguredRun();
}

function setReviewFilter(filter: 'all' | ReviewBucket) {
    if (filter === reviewFilter.value) return;
    reviewRunSnapshots.value[reviewFilter.value] = {
        order: [...order.value],
        cursorIndex: cursorIndex.value,
        answers: { ...answersByTermId.value },
        attempts: answerAttemptsCount.value,
        correctAttempts: correctAnswerAttemptsCount.value,
        retries: [...retryTermIds.value],
    };
    if (filter !== 'all' && !smartReviewEnabled.value) {
        const setId = set.value?.id as Uuid | undefined;
        if (setId) {
            smartReviewEnabled.value = true;
            saveSmartReviewEnabled(setId, true, reviewOwnerId.value);
        }
    }
    reviewFilter.value = filter;
    const saved = reviewRunSnapshots.value[filter];
    if (!saved) {
        startConfiguredRun();
        return;
    }
    order.value = [...saved.order];
    cursorIndex.value = saved.cursorIndex;
    answersByTermId.value = { ...saved.answers };
    answerAttemptsCount.value = saved.attempts;
    correctAnswerAttemptsCount.value = saved.correctAttempts;
    retryTermIds.value = new Set(saved.retries);
    isFlipped.value = false;
    nextTick(() => viewerButtonEl.value?.focus());
}

const {
    toggleFlip,
    goPrev,
    goNext,
    cancel: cancelFlashcardMotion,
} = createFlashcardMotion({
    getFlipCardCount: () => totalCount.value,
    getNavigationCardCount: () => order.value.length,
    getCursorIndex: () => cursorIndex.value,
    setCursorIndex: (index) => (cursorIndex.value = index),
    getFlipped: () => isFlipped.value,
    setFlipped: (flipped) => (isFlipped.value = flipped),
    getFlipping: () => isFlipping.value,
    setFlipping: (flipping) => (isFlipping.value = flipping),
    setNavigating: (direction) => (isNavigating.value = direction),
    isBusy: () => flashcardAnswerBusy.value,
});

async function loadStars(setId: Uuid) {
    smartReviewEnabled.value = isSmartReviewEnabled(setId, reviewOwnerId.value);
    shuffleEnabled.value = isFlashcardShuffleEnabled(setId, reviewOwnerId.value);
    cardReviews.value = getCardReviews(setId, reviewOwnerId.value);
    if (isWebPreview.value) {
        starredTermIds.value = new Set();
        return;
    }
    try {
        const db = await useTracerDb();
        const ids = await createStarsRepo(db).listTermIds(setId);
        starredTermIds.value = new Set(ids);
    } catch {
        starredTermIds.value = new Set();
    }
}

async function toggleStar() {
    const s = set.value;
    const t = currentTerm.value;
    if (!s || !t) return;
    if (starBusy.value) return;

    const next = !starredTermIds.value.has(t.id as Uuid);
    starBusy.value = true;
    try {
        if (!isWebPreview.value) {
            const db = await useTracerDb();
            await createStarsRepo(db).setStarred(
                s.id as Uuid,
                t.id as Uuid,
                next,
            );
        }
        const updated = new Set(starredTermIds.value);
        if (next) updated.add(t.id as Uuid);
        else updated.delete(t.id as Uuid);
        starredTermIds.value = updated;
        if (starredOnly.value && !next) {
            startRun();
        }
    } finally {
        starBusy.value = false;
    }
}

function shouldIgnoreKey(e: KeyboardEvent) {
    if (e.metaKey || e.ctrlKey || e.altKey) return true;
    const el = e.target;
    if (!(el instanceof HTMLElement)) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return true;
    if (el.isContentEditable) return true;
    return false;
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && flashcardSettingsOpen.value) {
        flashcardSettingsOpen.value = false;
        flashcardSettingsButtonEl.value?.focus();
        return;
    }
    if (shouldIgnoreKey(e)) return;
    if (flashcardSettingsOpen.value) return;
    if (isFinished.value) return;

    if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        toggleFlip();
        return;
    }
    if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
        return;
    }
    if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
        return;
    }
}

async function restoreSavedFlashcardRun(setId: Uuid) {
    const savedProgress = await loadSavedFlashcardProgress(setId);
    savedFlashcardTermId.value = savedProgress?.currentTermId ?? null;
    savedFlashcardCorrectTermIds.value = savedProgress?.correctTermIds ?? [];
    savedFlashcardProgressSignature.value = savedProgress
        ? JSON.stringify(savedProgress)
        : null;
    startRun({
        resetCounter: true,
        resumeTermId: savedProgress?.currentTermId,
        resumeCorrectTermIds: savedProgress?.correctTermIds,
    });
}

watch(language, async () => {
    if (!isWebPreview.value) return;
    set.value = createWebPreviewDemoSet(t);
    flashcardsDefinitionFirst.value = readWebFlashcardFrontPreference();
    await restoreSavedFlashcardRun(set.value.id);
});

watch(
    () =>
        [
            order.value[cursorIndex.value] ?? null,
            allStudyTermIds.value
                .filter((id) => answersByTermId.value[id] === "correct")
                .join("\u0000"),
        ] as const,
    ([termId]) => {
        if (!termId) return;
        persistFlashcardProgress(termId as Uuid);
    },
    { flush: "post" },
);

onMounted(async () => {
    reviewClockTimer = setInterval(() => (reviewClock.value = Date.now()), 30_000);
    window.addEventListener("pagehide", onPageHide);
    try {
        if (isWebPreview.value) {
            set.value = createWebPreviewDemoSet(t);
            busy.value = false;
            flashcardsDefinitionFirst.value = readWebFlashcardFrontPreference();
            reviewOwnerId.value = "web-preview";
            await loadStars(set.value.id);
            await restoreSavedFlashcardRun(set.value.id);
            await nextTick();
            viewerButtonEl.value?.focus();
            window.addEventListener("keydown", onKeydown);
            document.addEventListener(
                "pointerdown",
                onDocumentFlashcardSettingsPointerDown,
            );
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
        reviewOwnerId.value = profile.id;

        const settings = await createSettingsRepo(db).get();
        flashcardsDefinitionFirst.value = settings.flashcardsDefinitionFirst;
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
            await loadStars(set.value.id);
            await restoreSavedFlashcardRun(set.value.id);
            beginClassroomFlashcards();
        }
        await nextTick();
        viewerButtonEl.value?.focus();

        window.addEventListener("keydown", onKeydown);
        document.addEventListener(
            "pointerdown",
            onDocumentFlashcardSettingsPointerDown,
        );
    } catch {
        const tauriInvoke = typeof (globalThis as any)?.__TAURI_INTERNALS__
            ?.invoke;
        if (tauriInvoke !== "function") {
            set.value = createWebPreviewDemoSet(t);
            busy.value = false;
            flashcardsDefinitionFirst.value = readWebFlashcardFrontPreference();
            await loadStars(set.value.id);
            await restoreSavedFlashcardRun(set.value.id);
            await nextTick();
            viewerButtonEl.value?.focus();
            window.addEventListener("keydown", onKeydown);
            document.addEventListener(
                "pointerdown",
                onDocumentFlashcardSettingsPointerDown,
            );
            return;
        }

        busy.value = false;
        if (!loadError.value) loadError.value = "Failed to open set.";
    }
});

onBeforeRouteLeave(() => {
    finishClassroomFlashcards();
});

onBeforeUnmount(() => {
    if (reviewClockTimer) clearInterval(reviewClockTimer);
    finishClassroomFlashcards();
    window.removeEventListener("pagehide", onPageHide);
    cancelFlashcardMotion();
    cancelFlashcardAnswerFeedback();
    window.removeEventListener("keydown", onKeydown);
    document.removeEventListener(
        "pointerdown",
        onDocumentFlashcardSettingsPointerDown,
    );
});
</script>

<style scoped>
@keyframes flip {
    0% {
        transform: scaleY(1);
        opacity: 1;
    }
    50% {
        transform: scaleY(0);
        opacity: 0;
    }
    100% {
        transform: scaleY(1);
        opacity: 1;
    }
}

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

@keyframes slideRight {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(10%);
        opacity: 0;
    }
}

.animate-flip {
    animation: flip 0.32s ease-in-out;
}

.animate-slide-left {
    animation: slideLeft 0.25s ease-in-out;
}

.animate-slide-right {
    animation: slideRight 0.25s ease-in-out;
}

.flashcard-side-image {
    display: block;
    width: auto;
    height: auto;
    max-width: min(14rem, 27.5%);
    max-height: 11rem;
    object-fit: contain;
    border-radius: 22%;
    clip-path: inset(0 round 22%);
}

.flashcard-content-row {
    gap: 0;
}

.flashcard-content-row--paired {
    gap: clamp(2rem, 12.5%, 8rem);
}

.flashcard-side-text {
    min-width: 0;
    max-width: 100%;
}

.flashcard-side-text--paired {
    max-width: min(38rem, 60%);
}
</style>
