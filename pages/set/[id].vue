<template>
    <NuxtPage v-if="isNestedSetRoute" />
    <main v-else>
        <AiErrorModal
            :open="aiErrorOpen"
            :error="aiError"
            :from="route.fullPath"
            :show-retry="true"
            @close="closeAiError"
            @retry="retryAiRequest"
        />
        <div class="mx-auto max-w-4xl p-6 sm:p-8">
            <div
                class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                        <h1 class="truncate text-2xl font-semibold">
                            {{ set?.title ?? t('home.setKind') }}
                        </h1>
                        <p
                            v-if="set?.description"
                            class="mt-2 text-sm text-slate-600 dark:text-slate-300"
                        >
                            {{ translateAppGeneratedText(set.description) }}
                        </p>
                    </div>

                    <div class="flex shrink-0 flex-wrap items-center gap-2">
                        <NuxtLink
                            v-if="set"
                            :to="`/set/${set.id}/edit`"
                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
                        >
                            {{ t('common.edit') }}
                        </NuxtLink>
                        <button
                            type="button"
                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900"
                            :disabled="busy || !set"
                            @click="openExport"
                        >
                            {{ t('common.export') }}
                        </button>
                    </div>
                </div>

                <div
                    v-if="linkedFolder"
                    class="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900"
                >
                    <div class="flex flex-wrap items-center justify-between gap-3">
                        <div class="min-w-0">
                            <div class="flex flex-wrap items-center gap-2">
                                <span aria-hidden="true">📁</span>
                                <p class="truncate font-medium text-slate-900 dark:text-slate-50">
                                    {{ linkedFolderName }}
                                </p>
                                <span
                                    class="rounded-full px-2 py-0.5 text-xs font-medium"
                                    :class="linkedFolderStatusClass"
                                >
                                    {{ linkedFolderStatusLabel }}
                                </span>
                            </div>
                            <p class="mt-1 truncate text-xs text-slate-500 dark:text-slate-400" :title="linkedFolder.path">
                                {{ linkedFolder.path }}
                            </p>
                            <p
                                v-if="linkedFolder.lastError"
                                class="mt-1 text-xs text-red-700 dark:text-red-300"
                            >
                                {{ linkedFolder.lastError }}
                            </p>
                        </div>
                        <div class="flex shrink-0 flex-wrap gap-2">
                            <button
                                type="button"
                                class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800"
                                :disabled="linkedFolderBusy || linkedFolder.status === 'syncing'"
                                @click="syncLinkedFolderNow"
                            >
                                {{ t('linkedFolder.syncNow') }}
                            </button>
                            <button
                                type="button"
                                class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800"
                                :disabled="linkedFolderBusy || linkedFolder.status === 'syncing'"
                                @click="unlinkCurrentFolder"
                            >
                                {{ t('linkedFolder.unlink') }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <p
                        v-if="loadError"
                        class="text-sm text-red-700 dark:text-red-300"
                    >
                        {{ loadError }}
                    </p>

                    <div
                        v-else-if="busy"
                        class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    >
                        {{ t('common.loading') }}
                    </div>

                    <div
                        v-else-if="!set"
                        class="text-sm text-slate-700 dark:text-slate-200"
                    >
                        Set not found.
                    </div>

                    <div v-else class="space-y-6">
                        <section v-if="false" :aria-label="t('set.studyModes')">
                            <div class="grid gap-3 sm:grid-cols-2">
                                <div
                                    class="group rounded-md border flex flex-row justify-between items-center border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                >
                                    <NuxtLink
                                        replace
                                        :to="`/set/${set.id}?mode=flashcards`"
                                        class="w-5/6"
                                    >
                                        <p
                                            class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                        >
                                            {{ t('set.flashcards') }}
                                        </p>
                                        <p
                                            class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                        >
                                            {{ t('set.flashcardsHint') }}
                                        </p>
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        :to="`/set/${set.id}-flashcards`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        title="Open fullscreen"
                                    >
                                        ⛶
                                    </NuxtLink>
                                </div>

                                <NuxtLink
                                    v-if="studyGuideSetId"
                                    :to="`/study-guide/${studyGuideSetId}`"
                                    class="group rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                >
                                    <p
                                        class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                    >
                                        {{ t('set.studyGuide') }}
                                    </p>
                                    <p
                                        class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                    >
                                        Markdown
                                    </p>
                                </NuxtLink>

                                <div
                                    class="group rounded-md border flex flex-row justify-between items-center border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                >
                                    <NuxtLink
                                        replace
                                        :to="`/set/${set.id}?mode=learn`"
                                        class="w-5/6"
                                    >
                                        <p
                                            class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                        >
                                            {{ t('set.learn') }}
                                        </p>
                                        <p
                                            class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                        >
                                            {{ t('set.learnHint') }}
                                        </p>
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        :to="`/set/${set.id}-learn`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        title="Open fullscreen"
                                    >
                                        ⛶
                                    </NuxtLink>
                                </div>

                                <div
                                    class="group rounded-md border flex flex-row justify-between items-center border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                >
                                    <NuxtLink
                                        replace
                                        :to="`/set/${set.id}?mode=match`"
                                        class="w-5/6"
                                    >
                                        <p
                                            class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                        >
                                            {{ t('set.match') }}
                                        </p>
                                        <p
                                            class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                        >
                                            {{ t('set.matchHint') }}
                                        </p>
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        :to="`/set/${set.id}-match`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        title="Open fullscreen"
                                    >
                                        ⛶
                                    </NuxtLink>
                                </div>
                                <NuxtLink
                                    replace
                                    :to="`/set/${set.id}?mode=chat`"
                                    class="group rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                >
                                    <p
                                        class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                    >
                                        {{ t('set.chat') }}
                                    </p>
                                    <p
                                        class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                    >
                                        {{ t('set.chatHint') }}
                                    </p>
                                </NuxtLink>
                            </div>
                        </section>

                        <section
                            v-if="mode === 'flashcards'"
                            aria-label="Flashcards"
                            class="study-panel flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div
                                class="flex flex-wrap items-center justify-between gap-3"
                            >
                                <div>
                                    <p
                                        class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                    >
                                        {{ t('set.flashcards') }}
                                    </p>
                                    <p
                                        class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ t('set.flashcardInstructions') }}
                                    </p>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <p
                                        v-if="practiceTimed && !learnIsFinished"
                                        class="rounded-md bg-orange-50 px-2.5 py-2 text-sm font-semibold text-orange-700 dark:bg-orange-950/40 dark:text-orange-300"
                                        aria-live="polite"
                                    >
                                        {{ practiceTimerText }}
                                    </p>
                                    <p
                                        class="text-xs font-medium text-slate-500 dark:text-slate-400"
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
                                            @click="flashcardSettingsOpen = !flashcardSettingsOpen"
                                        >
                                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-4 w-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.6 3.2h4.8l.6 2.1c.4.2.8.4 1.2.7l2.1-.6 2.4 4.2-1.5 1.5v1.8l1.5 1.5-2.4 4.2-2.1-.6c-.4.3-.8.5-1.2.7l-.6 2.1H9.6L9 18.5c-.4-.2-.8-.4-1.2-.7l-2.1.6-2.4-4.2 1.5-1.5v-1.8L3.3 9.4l2.4-4.2 2.1.6c.4-.3.8-.5 1.2-.7l.6-1.9Z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </button>

                                        <div
                                            v-if="flashcardSettingsOpen"
                                            class="absolute end-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
                                            role="menu"
                                            :aria-label="t('set.flashcardSettings')"
                                        >
                                            <button type="button" role="menuitem" class="flex w-full items-center px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900" :disabled="totalCount === 0" @click="shuffleFromFlashcardSettings">
                                                {{ t('set.shuffle') }}
                                            </button>
                                            <button type="button" role="menuitemcheckbox" :aria-checked="starredOnly" class="flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900" :disabled="starredStudyCount === 0 && !starredOnly" @click="toggleStarredOnlyFromFlashcardSettings">
                                                <span>{{ t('set.starredOnly') }}</span>
                                                <span class="w-4 text-center" aria-hidden="true">{{ starredOnly ? "✓" : "" }}</span>
                                            </button>
                                            <button type="button" role="menuitem" class="flex w-full items-center px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900" :disabled="allStudyTermIds.length === 0" @click="restartFromFlashcardSettings">
                                                {{ t('common.restart') }}
                                            </button>
                                            <div class="my-1 border-t border-slate-200 dark:border-slate-800" />
                                            <button type="button" role="menuitem" class="flex w-full items-center px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 disabled:opacity-50 dark:text-slate-50 dark:hover:bg-slate-900" :disabled="flashcardFrontPreferenceBusy" @click="togglePreferredFlashcardFront">
                                                {{ preferredFlashcardFrontOptionLabel }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="isFinished" class="mt-4 select-none">
                                <h2
                                    class="text-lg font-semibold text-slate-900 dark:text-slate-50"
                                >
                                    {{ t('common.results') }}
                                </h2>
                                <p
                                    class="mt-2 text-sm text-slate-700 dark:text-slate-200"
                                >
                                    {{ t('set.accuracy') }}
                                    <span class="font-medium">{{
                                        accuracyText
                                    }}</span>
                                </p>
                                <p
                                    class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                >
                                    {{ t('set.correct') }} {{ correctCount }} · {{ t('set.attempted') }}
                                    {{ attemptedCount }}
                                </p>

                                <div class="mt-4 flex flex-wrap gap-2">
                                    <!-- <NuxtLink
                    :to="`/set/${set.id}/results?mode=flashcards&correct=${correctCount}&attempted=${attemptedCount}`"
                    class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                  >
                    Open results page
                  </NuxtLink>  -->
                                    <NuxtLink
                                        replace
                                        :to="`/set/${set.id}?mode=chat`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.chat') }}
                                    </NuxtLink>
                                    <NuxtLink
                                        replace
                                        :to="`/set/${set.id}?mode=learn`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.learn') }}
                                    </NuxtLink>
                                    <NuxtLink
                                        replace
                                        :to="`/set/${set.id}?mode=match`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.match') }}
                                    </NuxtLink>
                                </div>
                            </div>

                            <div
                                v-else-if="isStarredOnlyEmpty"
                                class="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                            >
                                {{ t('set.noStarred') }}
                            </div>

                            <div v-else>
                                <button
                                    ref="viewerButtonEl"
                                    type="button"
                                    class="relative mt-3 flex min-h-[clamp(16rem,34vh,24rem)] w-full items-center justify-center rounded-lg p-6 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2"
                                    :class="[
                                        flashcardSurfaceClass,
                                        {
                                            'animate-flip': isFlipping,
                                            'animate-slide-left':
                                                isNavigating === 'next',
                                            'animate-slide-right':
                                                isNavigating === 'prev',
                                        },
                                    ]"
                                    :disabled="
                                        totalCount === 0 ||
                                        flashcardAnswerBusy
                                    "
                                    @click="toggleFlip"
                                >
                                    <span
                                        v-if="isCurrentRetry"
                                        class="absolute top-3 right-3 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-100"
                                    >
                                        {{ t('set.tryAgain') }}
                                    </span>
                                    <p
                                        class="absolute top-6 left-6 text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ showingDefinition ? t('create.definition') : t('create.term') }}
                                    </p>
                                    <div
                                        class="flashcard-content-row flex w-full flex-row items-center justify-center text-center text-2xl text-slate-900 dark:text-slate-50"
                                        :class="{ 'flashcard-content-row--paired': viewerImage && viewerHasText }"
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
                                            :class="{ 'flashcard-side-text--paired': viewerImage }"
                                        >
                                            <MarkdownRenderer :markdown="viewerText" variant="flashcard" />
                                        </div>
                                    </div>
                                </button>

                                <div
                                    class="mt-4 flex flex-wrap items-center justify-between gap-3"
                                >
                                    <div
                                        class="flex flex-wrap items-center gap-2"
                                    >
                                        <button
                                            type="button"
                                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                            :disabled="
                                                totalCount === 0 ||
                                                cursorIndex === 0 ||
                                                flashcardAnswerBusy
                                            "
                                            @click="goPrev"
                                        >
                                        ← {{ t('set.previous') }}
                                        </button>

                                        <button
                                            type="button"
                                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                            :disabled="
                                                totalCount === 0 ||
                                                cursorIndex >=
                                                    order.length - 1 ||
                                                flashcardAnswerBusy
                                            "
                                            @click="goNext"
                                        >
                                        {{ t('set.next') }} →
                                        </button>
                                    </div>

                                    <div
                                        class="flex flex-wrap items-center gap-2"
                                    >
                                        <button
                                            type="button"
                                            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-amber-500 bg-white p-0 text-sm font-medium text-amber-500 shadow-sm hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-amber-400 dark:bg-slate-950 dark:text-amber-400 dark:hover:bg-amber-950/30"
                                            :disabled="!currentTerm || starBusy"
                                            :aria-pressed="isCurrentStarred"
                                            :aria-label="isCurrentStarred ? 'Unstar card' : 'Star card'"
                                            @click="toggleStar"
                                        >
                                            <StarGlyph :active="isCurrentStarred" />
                                        </button>
                                        <button
                                            type="button"
                                            class="inline-flex h-10 items-center justify-center rounded-md border border-[#C14D4D] bg-white px-3 text-sm font-medium text-[#C14D4D] shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-950 dark:hover:bg-slate-900"
                                            :disabled="
                                                !currentTerm ||
                                                flashcardAnswerBusy
                                            "
                                            @click="markIncorrect"
                                        >
                                        {{ t('set.missed') }}
                                        </button>
                                        <button
                                            type="button"
                                            class="inline-flex h-10 items-center justify-center rounded-md border border-[#2D8210] bg-white px-3 text-sm font-medium text-[#2D8210] shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-950 dark:hover:bg-slate-900"
                                            :disabled="
                                                !currentTerm ||
                                                flashcardAnswerBusy
                                            "
                                            @click="markCorrect"
                                        >
                                        {{ t('set.gotIt') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            v-else-if="mode === 'learn'"
                            aria-label="Practice"
                            class="study-panel flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div
                                class="flex flex-wrap items-center justify-between gap-3"
                            >
                                <div>
                                    <p
                                        class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                    >
                                        {{ t('set.learn') }}
                                    </p>
                                    <p
                                        class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ t('set.learnInstructions') }}
                                    </p>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <p
                                        class="text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ learnRatioText }}
                                    </p>
                                    <button
                                        type="button"
                                        class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        :disabled="practiceAnswerBusy"
                                        :aria-expanded="practiceSettingsOpen"
                                        @click="openPracticeSettings"
                                    >
                                        <span aria-hidden="true">⚙</span>
                                        Settings
                                    </button>
                                    <button
                                        type="button"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        :disabled="
                                            learnBusy ||
                                            practiceAnswerBusy ||
                                            !set ||
                                            learnQuestions.length === 0
                                        "
                                        @click="restartLearnRun"
                                    >
                                        {{ t('common.restart') }}
                                    </button>
                                </div>
                            </div>

                            <p
                                v-if="learnError"
                                class="mt-3 text-sm text-red-700 dark:text-red-300"
                            >
                                {{ learnError }}
                            </p>

                            <div
                                v-if="practiceSettingsOpen"
                                class="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60"
                            >
                                <div class="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h2 class="text-base font-semibold text-slate-950 dark:text-white">Practice settings</h2>
                                        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Build a session that fits how you want to study.</p>
                                    </div>
                                    <div class="inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-950">
                                        <button
                                            v-for="choice in practiceSessionChoices"
                                            :key="choice"
                                            type="button"
                                            class="rounded-md px-4 py-2 text-sm font-semibold capitalize transition"
                                            :class="practiceSessionMode === choice ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'"
                                            @click="practiceSessionMode = choice"
                                        >
                                            {{ choice }}
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-5 grid gap-5 md:grid-cols-2">
                                    <div>
                                        <p class="text-sm font-semibold text-slate-900 dark:text-white">Question types</p>
                                        <div class="mt-2 grid gap-2">
                                            <button
                                                v-for="item in practiceQuestionTypeChoices"
                                                :key="item.kind"
                                                type="button"
                                                class="flex min-h-12 items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition"
                                                :class="practiceQuestionTypes[item.kind] ? 'border-orange-300 bg-orange-50 text-slate-950 dark:border-orange-700 dark:bg-orange-950/30 dark:text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'"
                                                :aria-pressed="practiceQuestionTypes[item.kind]"
                                                @click="togglePracticeQuestionType(item.kind)"
                                            >
                                                {{ item.label }}
                                                <span
                                                    class="relative h-5 w-9 shrink-0 rounded-full transition"
                                                    :class="practiceQuestionTypes[item.kind] ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'"
                                                >
                                                    <span
                                                        class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                                                        :class="practiceQuestionTypes[item.kind] ? 'left-[18px]' : 'left-0.5'"
                                                    />
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="space-y-4">
                                        <label class="flex items-center justify-between gap-4">
                                            <span class="text-sm font-semibold text-slate-900 dark:text-white">Questions</span>
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
                                            <span>
                                                <span class="block text-sm font-semibold text-slate-900 dark:text-white">Shuffle questions</span>
                                                <span class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">Mix question types and terms</span>
                                            </span>
                                            <span class="relative h-6 w-11 rounded-full transition" :class="practiceShuffle ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'">
                                                <span class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all" :class="practiceShuffle ? 'left-6' : 'left-1'" />
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            class="flex w-full items-center justify-between text-left"
                                            :aria-pressed="practiceTimed"
                                            @click="practiceTimed = !practiceTimed"
                                        >
                                            <span>
                                                <span class="block text-sm font-semibold text-slate-900 dark:text-white">Time limit</span>
                                                <span class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">Finish before the countdown ends</span>
                                            </span>
                                            <span class="relative h-6 w-11 rounded-full transition" :class="practiceTimed ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'">
                                                <span class="absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all" :class="practiceTimed ? 'left-6' : 'left-1'" />
                                            </span>
                                        </button>

                                        <label v-if="practiceTimed" class="block">
                                            <span class="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                                                Minutes
                                                <span>{{ practiceTimeLimitMinutes }}</span>
                                            </span>
                                            <input v-model.number="practiceTimeLimitMinutes" type="range" min="1" max="60" step="1" class="mt-2 w-full accent-orange-500" />
                                        </label>
                                    </div>
                                </div>

                                <div class="mt-5 flex justify-end">
                                    <button
                                        type="button"
                                        class="rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                        :disabled="learnBusy || enabledPracticeQuestionTypes().length === 0"
                                        @click="applyPracticeSettings"
                                    >
                                        Restart {{ practiceSessionMode === 'test' ? 'test' : 'practice' }}
                                    </button>
                                </div>
                            </div>

                            <div
                                v-if="learnBusy"
                                class="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                            >
                                {{ t('common.loading') }}
                            </div>

                            <div v-else-if="learnIsFinished" class="mt-4 select-none">
                                <h2
                                    class="text-lg font-semibold text-slate-900 dark:text-slate-50"
                                >
                                    {{ t('common.results') }}
                                </h2>
                                <p v-if="practiceTimedOut" class="mt-2 text-sm font-semibold text-orange-700 dark:text-orange-300">Time is up. Unanswered questions were counted as missed.</p>
                                <p
                                    class="mt-2 text-sm text-slate-700 dark:text-slate-200"
                                >
                                    {{ t('set.accuracy') }}
                                    <span class="font-medium">{{
                                        learnAccuracyText
                                    }}</span>
                                </p>
                                <p
                                    class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                >
                                    {{ t('set.correct') }} {{ learnCorrectCount }} ·
                                    {{ t('set.attempted') }} {{ learnAttemptedCount }}
                                </p>

                                <div class="mt-4 flex flex-wrap gap-2">
                                    <NuxtLink
                                        v-if="set"
                                        replace
                                        :to="`/set/${set.id}?mode=flashcards`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.flashcards') }}
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        replace
                                        :to="`/set/${set.id}?mode=chat`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.chat') }}
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        replace
                                        :to="`/set/${set.id}?mode=match`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.match') }}
                                    </NuxtLink>
                                </div>
                            </div>

                            <div v-else class="mt-4 flex flex-1 flex-col">
                                <div
                                    v-if="!learnCurrentQuestion"
                                    class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                >
                                    No questions available.
                                </div>

                                <div
                                    v-else
                                    class="flex flex-1 flex-col rounded-md border p-5 shadow-sm"
                                    :class="[
                                        practiceQuestionSurfaceClass(),
                                        {
                                            'animate-slide-left':
                                                learnIsNavigating,
                                        },
                                    ]"
                                >
                                    <p
                                        class="text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ t('set.question') }}
                                    </p>
                                    <div class="mt-3 text-2xl font-medium text-slate-900 dark:text-slate-50">
                                        <MarkdownRenderer :markdown="learnCurrentQuestion.prompt" variant="flashcard" />
                                    </div>

                                    <div
                                        class="grid gap-3"
                                        :class="
                                            learnCurrentQuestion.kind ===
                                            'true_false'
                                                ? 'mt-auto grid-cols-2 pt-4'
                                                : 'mt-4 flex-1'
                                        "
                                    >
                                        <template
                                            v-if="
                                                learnCurrentQuestion.kind ===
                                                'true_false'
                                            "
                                        >
                                            <button
                                                type="button"
                                                class="inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2.5 text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                                :class="
                                                    practiceTrueFalseChoiceClass(
                                                        true,
                                                    )
                                                "
                                                :disabled="
                                                    learnBusy ||
                                                    practiceAnswerBusy
                                                "
                                                @click="
                                                    answerLearnTrueFalse(true)
                                                "
                                            >
                                                True
                                            </button>
                                            <button
                                                type="button"
                                                class="inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-2.5 text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                                :class="
                                                    practiceTrueFalseChoiceClass(
                                                        false,
                                                    )
                                                "
                                                :disabled="
                                                    learnBusy ||
                                                    practiceAnswerBusy
                                                "
                                                @click="
                                                    answerLearnTrueFalse(false)
                                                "
                                            >
                                                False
                                            </button>
                                        </template>

                                        <template v-else-if="learnCurrentQuestion.kind === 'multiple_choice'">
                                            <button
                                                v-for="(
                                                    opt, idx
                                                ) in learnCurrentQuestion.options"
                                                :key="`${learnCurrentQuestion.id}:${idx}`"
                                                type="button"
                                                class="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                                                :class="
                                                    practiceMultipleChoiceClass(
                                                        idx,
                                                    )
                                                "
                                                :disabled="
                                                    learnBusy ||
                                                    practiceAnswerBusy
                                                "
                                                @click="
                                                    answerLearnMultipleChoice(
                                                        idx,
                                                    )
                                                "
                                            >
                                                <MarkdownRenderer :markdown="opt" variant="compact" />
                                            </button>
                                        </template>
                                        <form
                                            v-else
                                            class="grid gap-2"
                                            @submit.prevent="answerLearnWritten"
                                        >
                                            <label
                                                for="practice-written-answer"
                                                class="sr-only"
                                            >
                                                Your answer
                                            </label>
                                            <div class="flex items-end gap-2">
                                                <textarea
                                                    id="practice-written-answer"
                                                    v-model="practiceWrittenAnswer"
                                                    rows="1"
                                                    autofocus
                                                    class="h-12 w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-amber-900"
                                                    placeholder="Type your answer…"
                                                    :disabled="
                                                        practiceAnswerBusy ||
                                                        Boolean(
                                                            practiceWrittenFeedback,
                                                        )
                                                    "
                                                />
                                                <button
                                                    type="submit"
                                                    class="inline-flex h-12 shrink-0 items-center rounded-lg border border-amber-500 bg-amber-400 px-5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                                                    :disabled="
                                                        !practiceWrittenAnswer.trim() ||
                                                        practiceAnswerBusy ||
                                                        Boolean(
                                                            practiceWrittenFeedback,
                                                        )
                                                    "
                                                >
                                                    {{
                                                        practiceAnswerBusy
                                                            ? "Checking…"
                                                            : "Save"
                                                    }}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div
                                    v-if="practiceWrittenFeedback"
                                    class="mt-3 rounded-md border p-4 shadow-sm"
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
                                        {{
                                            practiceWrittenFeedback.explanation
                                        }}
                                    </p>
                                    <div class="mt-3 flex justify-end">
                                        <button
                                            type="button"
                                            class="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                                            :disabled="practiceAnswerBusy"
                                            @click="
                                                continueAfterWrittenFeedback
                                            "
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            v-else-if="mode === 'chat'"
                            aria-label="Chat"
                            class="study-panel flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div
                                class="flex flex-wrap items-center justify-between gap-3"
                            >
                                <div>
                                    <p
                                        class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                    >
                                        {{ t('set.chat') }}
                                    </p>
                                    <p
                                        class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ t('set.chatHint') }}
                                    </p>
                                </div>
                                <div class="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        :disabled="chatBusy || chatSaveBusy || !set || isWebPreview"
                                        @click="openChatHistory"
                                    >
                                        {{ t('chat.history') }}
                                    </button>
                                    <div class="inline-flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                            :disabled="
                                                chatBusy ||
                                                chatSaveBusy ||
                                                chatIsSaved ||
                                                !firstChatQuestion ||
                                                isWebPreview
                                            "
                                            @click="saveChat"
                                        >
                                            {{ chatSaveBusy ? t('chat.saving') : t('common.save') }}
                                        </button>
                                        <span
                                            v-if="chatSavedFeedback"
                                            class="text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                                            :aria-label="t('chat.saved')"
                                            aria-live="polite"
                                        >
                                            ✓
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        :disabled="
                                            chatBusy || chatSaveBusy || chatMessages.length === 0
                                        "
                                        @click="resetChat"
                                    >
                                        {{ t('common.clear') }}
                                    </button>
                                </div>
                            </div>

                            <div
                                ref="chatLogEl"
                                class="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto rounded-md border border-amber-200 bg-amber-50/20 p-3 text-sm text-slate-900 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/10 dark:text-slate-50"
                                role="log"
                                aria-live="polite"
                            >
                                <p
                                    v-if="chatError"
                                    class="text-sm text-red-700 dark:text-red-300"
                                >
                                    {{ chatError }}
                                </p>
                                <p
                                    v-if="chatMessages.length === 0"
                                    class="text-sm text-slate-600 dark:text-slate-300"
                                >
                                    {{ t('set.chatHint') }}
                                </p>

                                <div
                                    v-for="m in chatMessages"
                                    :key="m.id"
                                    class="flex"
                                    :class="
                                        m.role === 'user'
                                            ? 'justify-end'
                                            : 'justify-start'
                                    "
                                >
                                    <div
                                        class="max-w-[85%] rounded-lg border px-3 py-2 shadow-sm"
                                        :class="
                                            m.role === 'user'
                                                ? 'border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50'
                                                : 'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50'
                                        "
                                    >
                                        <span
                                            v-if="m.role === 'assistant' && chatBusy && !m.content"
                                            class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700 dark:border-slate-700 dark:border-t-slate-200"
                                            aria-label="Loading response"
                                        />
                                        <MarkdownRenderer
                                            v-else
                                            :markdown="m.content"
                                            variant="compact"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="mt-3 flex gap-2">
                                <label class="sr-only" for="chat-input">{{ t('set.chat') }}</label>
                                <textarea
                                    id="chat-input"
                                    ref="chatTextareaEl"
                                    v-model="chatInput"
                                    rows="2"
                                    autocomplete="off"
                                    :placeholder="t('set.chatHint')"
                                    class="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    :disabled="chatBusy || chatSaveBusy || !set"
                                    @keydown="onChatInputKeydown"
                                />
                                <button
                                    type="button"
                                    class="inline-flex shrink-0 items-center rounded-md border border-amber-500 bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
                                    :disabled="
                                        chatBusy || chatSaveBusy || !set || !chatInput.trim()
                                    "
                                    @click="sendChat"
                                >
                                    {{ chatBusy ? `${t('set.chat')}…` : t('set.chat') }}
                                </button>
                            </div>

                            <p
                                class="mt-2 text-xs text-slate-500 dark:text-slate-400"
                            >
                                Enter · Shift+Enter
                            </p>
                        </section>

                        <section
                            v-else-if="mode === 'match'"
                            aria-label="Match"
                            class="study-panel flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div
                                class="flex flex-wrap items-start justify-between gap-3"
                            >
                                <div>
                                    <p
                                        class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                    >
                                        {{ t('set.match') }}
                                    </p>
                                    <p
                                        class="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400"
                                    >
                                        {{ t('set.matchInstructions') }}
                                    </p>
                                </div>
                            </div>

                            <p
                                v-if="matchError"
                                class="mt-3 text-sm text-red-700 dark:text-red-300"
                            >
                                {{ matchError }}
                            </p>

                            <div v-if="matchIsFinished" class="mt-4 select-none">
                                <h2
                                    class="text-lg font-semibold text-slate-900 dark:text-slate-50"
                                >
                                    {{ t('common.results') }}
                                </h2>
                                <p
                                    class="mt-2 text-sm text-slate-700 dark:text-slate-200"
                                >
                                    {{ t('set.accuracy') }}
                                    <span class="font-medium">{{
                                        matchAccuracyText
                                    }}</span>
                                </p>
                                <p
                                    class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                >
                                    {{ t('set.matched') }} {{ matchMatchedPairsCount }}/{{
                                        matchPairsTarget
                                    }}
                                    · {{ t('set.attempts') }} {{ matchAttemptsCount }}
                                </p>
                                <p
                                    class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                                >
                                    {{ t('set.time') }} {{ matchTimeText }}
                                </p>

                                <div class="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        :disabled="
                                            !set || set.terms.length === 0
                                        "
                                        @click="restartMatchRun"
                                    >
                                        {{ t('set.playAgain') }}
                                    </button>
                                    <NuxtLink
                                        v-if="set"
                                        replace
                                        :to="`/set/${set.id}?mode=flashcards`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.flashcards') }}
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        replace
                                        :to="`/set/${set.id}?mode=learn`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        {{ t('set.learn') }}
                                    </NuxtLink>
                                    <NuxtLink
                                        v-if="set"
                                        replace
                                        :to="`/set/${set.id}?mode=chat`"
                                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                    >
                                        Chat
                                    </NuxtLink>
                                </div>
                            </div>

                            <div v-else class="mt-4 flex flex-1 flex-col">
                                <div
                                    v-if="!matchIsRunning"
                                    class="flex flex-1 flex-col items-center justify-center rounded-md border border-amber-200 bg-amber-50/20 p-4 text-center text-sm text-slate-700 dark:border-amber-900/60 dark:bg-amber-950/10 dark:text-slate-200"
                                >
                                    <p>{{ t('set.matchInstructions') }}</p>
                                    <button
                                        type="button"
                                        class="mt-4 inline-flex items-center rounded-md border border-orange-600 bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-orange-500 dark:bg-orange-500 dark:hover:bg-orange-400"
                                        :disabled="!set || set.terms.length === 0"
                                        @click="startMatch"
                                    >
                                        {{ t('set.start') }}
                                    </button>
                                </div>

                                <div v-else class="grid flex-1 auto-rows-fr grid-cols-4 gap-2">
                                    <button
                                        v-for="tile in matchTiles"
                                        :key="tile.id"
                                        type="button"
                                        data-match-tile="true"
                                        class="relative min-h-20 w-full rounded-md border p-2 text-left shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                        :class="matchTileClass(tile)"
                                        :disabled="
                                            matchTileDisabled(tile) || matchBusy
                                        "
                                        @click.stop="onMatchTileClick(tile)"
                                    >
                                        <span class="sr-only">{{ t('set.tile') }}</span>
                                        <span
                                            v-if="matchIsTileRevealed(tile)"
                                            class="block h-full overflow-hidden text-xs font-medium leading-snug"
                                        >
                                            <MarkdownRenderer :markdown="tile.text" variant="tile" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section
                            v-else
                            aria-label="Mode"
                            class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <p
                                class="text-sm font-medium text-slate-900 dark:text-slate-50"
                            >
                                {{ t('set.comingSoon') }}
                            </p>
                            <p
                                class="mt-2 text-sm text-slate-600 dark:text-slate-300"
                            >
                                {{ t('set.notImplemented') }}
                            </p>
                            <div class="mt-4 flex flex-wrap gap-2">
                                <NuxtLink
                                    replace
                                    :to="`/set/${set.id}?mode=flashcards`"
                                    class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                >
                                    {{ t('common.continue') }} · {{ t('set.flashcards') }}
                                </NuxtLink>
                            </div>
                        </section>

                        <section :aria-label="t('set.studyModes')">
                            <div
                                class="study-mode-bar flex flex-nowrap gap-3 overflow-x-auto pb-1"
                            >
                                <StudyModeTile
                                    :to="`/set/${set.id}?mode=flashcards`"
                                    :fullscreen-to="`/set/${set.id}-flashcards`"
                                    :icon="flashcardsModeIcon"
                                    :title="t('set.flashcards')"
                                    :hint="t('set.flashcardsHint')"
                                    :active="mode === 'flashcards'"
                                    replace
                                />
                                <StudyModeTile
                                    :to="`/set/${set.id}?mode=learn`"
                                    :fullscreen-to="`/set/${set.id}-learn`"
                                    :icon="practiceModeIcon"
                                    :title="t('set.learn')"
                                    :hint="t('set.learnHint')"
                                    :active="mode === 'learn'"
                                    replace
                                />
                                <StudyModeTile
                                    :to="`/set/${set.id}?mode=chat`"
                                    :icon="chatModeIcon"
                                    :title="t('set.chat')"
                                    :hint="t('set.chatHint')"
                                    :active="mode === 'chat'"
                                    show-caret
                                    replace
                                />
                                <StudyModeTile
                                    :to="`/set/${set.id}?mode=match`"
                                    :fullscreen-to="`/set/${set.id}-match`"
                                    :icon="matchModeIcon"
                                    :title="t('set.match')"
                                    :hint="t('set.matchHint')"
                                    :active="mode === 'match'"
                                    replace
                                />
                                <StudyModeTile
                                    v-if="studyGuideSetId"
                                    :to="`/study-guide/${studyGuideSetId}`"
                                    :icon="studyGuideModeIcon"
                                    :title="t('set.studyGuide')"
                                    :hint="t('set.studyGuideHint')"
                                    show-caret
                                />
                            </div>
                        </section>

                        <section
                            aria-label="Terms"
                            class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div
                                class="flex items-center justify-between gap-3"
                            >
                                <h2
                                    class="text-sm font-medium text-slate-900 dark:text-slate-50"
                                >
                                    {{ t('set.terms') }}
                                </h2>
                                <div class="flex shrink-0 items-center gap-2">
                                    <span
                                        class="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                    >
                                        {{ filteredTerms.length }}
                                    </span>
                                    <div ref="termsFilterMenuRoot" class="relative">
                                        <button
                                            ref="termsFilterButtonEl"
                                            type="button"
                                            class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                            :aria-label="t('set.filterTerms')"
                                            :title="t('set.filterTerms')"
                                            :aria-expanded="termsFilterMenuOpen"
                                            :disabled="set.terms.length === 0"
                                            aria-haspopup="menu"
                                            @click="termsFilterMenuOpen = !termsFilterMenuOpen"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                class="h-4 w-4"
                                            >
                                                <path d="M4 6h16" />
                                                <path d="M7 12h10" />
                                                <path d="M10 18h4" />
                                            </svg>
                                        </button>

                                        <div
                                            v-if="termsFilterMenuOpen"
                                            class="absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
                                            role="menu"
                                            :aria-label="t('set.filterTerms')"
                                        >
                                            <button
                                                v-for="option in termsFilterOptions"
                                                :key="option.value"
                                                type="button"
                                                role="menuitemradio"
                                                :aria-checked="termsFilter === option.value"
                                                class="flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm text-slate-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500"
                                                @click="selectTermsFilter(option.value)"
                                            >
                                                <span>{{ t(option.labelKey) }}</span>
                                                <span
                                                    class="w-4 text-center"
                                                    aria-hidden="true"
                                                >
                                                    {{ termsFilter === option.value ? "✓" : "" }}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                v-if="filteredTerms.length === 0"
                                class="mt-3 text-sm text-slate-700 dark:text-slate-200"
                            >
                                {{ t('set.noCards') }}
                            </div>

                            <ul v-else class="mt-3 space-y-3">
                                <li v-for="(term, idx) in filteredTerms" :key="term.id">
                                    <div
                                        class="relative rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                                    >
                                        <button
                                            type="button"
                                            class="absolute top-3 right-3 inline-flex items-center justify-center w-6 h-6 rounded-md text-sm transition-colors"
                                            :class="
                                                starredTermIds.has(term.id as Uuid)
                                                    ? 'border border-amber-300 bg-amber-50 text-amber-500 dark:border-amber-800 dark:bg-amber-950/30'
                                                    : 'border border-slate-200 text-amber-500 hover:border-amber-200 hover:bg-amber-50 dark:border-slate-700 dark:hover:bg-amber-950/30'
                                            "
                                            :aria-pressed="
                                                starredTermIds.has(term.id as Uuid)
                                            "
                                            :disabled="starBusy"
                                            @click="
                                                toggleTermStar(term.id as Uuid)
                                            "
                                        >
                                            <StarGlyph :active="starredTermIds.has(term.id as Uuid)" />
                                        </button>
                                        <p
                                            class="text-xs font-medium text-slate-500 dark:text-slate-400"
                                        >
                                            {{ idx + 1 }}
                                        </p>
                                        <div
                                            class="mt-2 text-sm text-slate-700 dark:text-slate-200"
                                        >
                                            <span
                                                class="font-medium text-slate-900 dark:text-slate-50"
                                                >{{ t('set.termLabel') }}
                                            </span>
                                            <div class="mt-1">
                                                <MarkdownRenderer :markdown="term.front" variant="compact" />
                                            </div>
                                        </div>
                                        <div
                                            class="mt-2 text-sm text-slate-700 dark:text-slate-200"
                                        >
                                            <span
                                                class="font-medium text-slate-900 dark:text-slate-50"
                                                >{{ t('set.definitionLabel') }}
                                            </span>
                                            <div class="mt-1">
                                                <MarkdownRenderer :markdown="term.back" variant="compact" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="chatHistoryOpen"
            class="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            :aria-label="t('chat.history')"
            @keydown.esc="closeChatHistory"
        >
            <button
                type="button"
                class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
                :aria-label="t('common.close')"
                @click="closeChatHistory"
            />

            <div
                class="relative w-full max-w-xl rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
            >
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
                            {{ t('chat.history') }}
                        </h2>
                        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                            {{ set?.title }}
                        </p>
                    </div>
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        @click="closeChatHistory"
                    >
                        {{ t('common.close') }}
                    </button>
                </div>

                <div class="mt-4 max-h-[26rem] overflow-y-auto">
                    <p
                        v-if="chatHistoryError"
                        class="text-sm text-red-700 dark:text-red-300"
                    >
                        {{ chatHistoryError }}
                    </p>
                    <p
                        v-else-if="chatHistoryBusy"
                        class="text-sm text-slate-600 dark:text-slate-300"
                    >
                        {{ t('common.loading') }}
                    </p>
                    <p
                        v-else-if="savedChats.length === 0"
                        class="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                        {{ t('chat.noHistory') }}
                    </p>
                    <ul v-else class="space-y-2">
                        <li
                            v-for="savedChat in savedChats"
                            :key="savedChat.id"
                            class="group relative"
                        >
                            <button
                                type="button"
                                class="w-full rounded-md border border-slate-200 bg-white px-3 py-3 pr-12 text-left shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                                :disabled="chatHistoryBusy || chatDeleteBusy"
                                @click="openSavedChat(savedChat.id)"
                            >
                                <span class="block truncate text-sm font-medium text-slate-900 dark:text-slate-50">
                                    {{ savedChat.title }}
                                </span>
                                <span class="mt-1 block truncate text-xs text-slate-500 dark:text-slate-400">
                                    {{ set?.title }} · {{ formatSavedChatDate(savedChat.lastOpenedAt) }}
                                </span>
                            </button>
                            <button
                                type="button"
                                class="absolute top-1/2 right-3 inline-flex -translate-y-1/2 items-center justify-center rounded-md p-2 text-slate-500 opacity-0 hover:bg-red-50 hover:text-red-700 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 group-hover:opacity-100 dark:text-slate-400 dark:hover:bg-red-950/50 dark:hover:text-red-300"
                                :aria-label="t('chat.deleteNamed', { title: savedChat.title })"
                                :disabled="chatDeleteBusy"
                                @click.stop="requestDeleteChat(savedChat)"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    class="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v5M14 11v5" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div
            v-if="chatDeleteTarget"
            class="fixed inset-0 z-[60] flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            :aria-label="t('chat.deleteTitle')"
            @keydown.esc="cancelDeleteChat"
        >
            <button
                type="button"
                class="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                :aria-label="t('common.cancel')"
                @click="cancelDeleteChat"
            />
            <div
                class="relative w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
            >
                <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {{ t('chat.deleteTitle') }}
                </h2>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {{ t('chat.deleteDescription', { title: chatDeleteTarget.title }) }}
                </p>
                <div class="mt-5 flex justify-end gap-2">
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="chatDeleteBusy"
                        @click="cancelDeleteChat"
                    >
                        {{ t('common.cancel') }}
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-red-600 dark:hover:bg-red-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="chatDeleteBusy"
                        @click="confirmDeleteChat"
                    >
                        {{ t('common.delete') }}
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="isExportOpen"
            class="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Export set"
            @keydown.esc="closeExport"
        >
            <button
                type="button"
                class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
                :aria-label="t('common.close')"
                @click="closeExport"
            />

            <div
                class="relative w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
            >
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h2
                            class="text-lg font-semibold text-slate-900 dark:text-slate-50"
                        >
                            {{ t('common.export') }}
                        </h2>
                        <p
                            class="mt-1 text-sm text-slate-600 dark:text-slate-300"
                        >
                            TSV · {{ t('common.export') }}
                        </p>
                    </div>

                    <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        @click="closeExport"
                    >
                        {{ t('common.close') }}
                    </button>
                </div>

                <div class="mt-4">
                    <label class="sr-only" for="export-tsv">TSV {{ t('common.export') }}</label>
                    <textarea
                        id="export-tsv"
                        ref="exportTextareaEl"
                        readonly
                        rows="10"
                        class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :value="exportTsv"
                        @focus="selectAllExport"
                    />
                </div>

                <p
                    v-if="exportMessage"
                    class="mt-3 text-sm text-slate-700 dark:text-slate-200"
                >
                    {{ exportMessage }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="!exportTsv"
                        @click="copyExport"
                    >
                        {{ t('common.copy') }}
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="!exportTsv"
                        @click="downloadExport"
                    >
                        {{ t('common.download') }}
                    </button>
                    <button
                        type="button"
                        class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="!exportTsv"
                        @click="selectAllExport"
                    >
                        {{ t('common.selectAll') }}
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import flashcardsModeIcon from "~/assets/icons/study-modes/flashcards.png";
import studyGuideModeIcon from "~/assets/icons/study-modes/study-guide.png";
import practiceModeIcon from "~/assets/icons/study-modes/practice.png";
import matchModeIcon from "~/assets/icons/study-modes/match.png";
import chatModeIcon from "~/assets/icons/study-modes/chat.png";
import { lockGetStatus } from "~/src/composables/lock";
import MarkdownRenderer from "~/components/MarkdownRenderer.vue";
import { useLockSession } from "~/src/composables/lock-session";
import {
    createChatsRepo,
    createFlashcardProgressRepo,
    createLinkedFoldersRepo,
    createProfileRepo,
    createSettingsRepo,
    createSetsRepo,
    createStarsRepo,
    createStudyGuidesRepo,
    useTracerDb,
} from "~/src/composables/db";
import type {
    FlashcardSet,
    LinkedFolder,
    SavedChatListItem,
    SavedChatPayload,
    Uuid,
} from "~/src/composables/db/types";
import { resolveAiModel } from "~/src/composables/ai/registry";
import { hasTauriRuntime } from "~/src/composables/tauri";
import {
    generateLearnQuestions,
    type LearnQuestion,
    type LearnQuestionKind,
} from "~/src/composables/learn/generator";
import {
    buildChatTitlePrompt,
    buildGroundedChatSystemPrompt,
    normalizeGeneratedChatTitle,
    streamGroundedChatText,
    streamWebPreviewMockChatAnswer,
    takeNextChatRevealUnit,
    takeRecentChatMessages,
    type ChatMessage,
} from "~/src/composables/ai/chat";
import { generateText } from "ai";
import {
    generateMatchTiles,
    type MatchTile,
} from "~/src/composables/match/generator";
import {
    normalizeAiError,
    aiErrorForMissingDefaultModel,
    isAiErrorCandidate,
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
    LINKED_FOLDER_STATUS_EVENT,
    syncLinkedFolder,
    unlinkFolder,
} from "~/src/composables/generate/linked-folders";

const route = useRoute();
const router = useRouter();
const { language, t, translateAppGeneratedText } = useAppLanguage();
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession();

const isNestedSetRoute = computed(() =>
    route.matched.some(
        (match) => match.name === "set-id-edit" || match.name === "set-id-results",
    ),
);
const isWebPreview = computed(() => !hasTauriRuntime());

type SetMode = "flashcards" | "learn" | "match" | "chat";

const mode = computed<SetMode>(() => {
    const m =
        typeof route.query.mode === "string" ? route.query.mode : "flashcards";
    if (m === "flashcards" || m === "learn" || m === "match" || m === "chat")
        return m;
    return "flashcards";
});

const busy = ref(true);
const loadError = ref<string | null>(null);
const set = ref<FlashcardSet | null>(null);
const studyGuideSetId = ref<Uuid | null>(null);
const linkedFolder = ref<LinkedFolder | null>(null);
const linkedFolderBusy = ref(false);
const linkedFolderName = computed(() => {
    const path = linkedFolder.value?.path ?? "";
    return path.split(/[\\/]/).filter(Boolean).at(-1) || t("create.linkFolder");
});
const linkedFolderStatusLabel = computed(() =>
    t(`linkedFolder.status.${linkedFolder.value?.status ?? "synced"}`),
);
const linkedFolderStatusClass = computed(() => {
    const status = linkedFolder.value?.status;
    if (status === "error") return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
    if (status === "pending" || status === "syncing")
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200";
    return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
});
const chatSystemPrompt = computed(() =>
    set.value ? buildGroundedChatSystemPrompt(set.value) : "",
);

const defaultModelId = ref<string | null>(null);
const learnHybridEnabled = ref(false);

const isFlipped = ref(false);
const isFlipping = ref(false);
const isNavigating = ref<"prev" | "next" | null>(null);

type FlashcardsAnswer = "correct" | "incorrect";
const flashcardAnswerFeedback = ref<FlashcardsAnswer | null>(null);
const flashcardAnswerBusy = ref(false);
const flashcardAnswerTransitionId = ref(0);

const runCounter = ref(0);
const cursorIndex = ref(0);
const order = ref<Uuid[]>([]);
const lastOrder = ref<Uuid[]>([]);
const answersByTermId = ref<Record<Uuid, FlashcardsAnswer>>({});
const answerAttemptsCount = ref(0);
const retryTermIds = ref<Set<Uuid>>(new Set());

const starredTermIds = ref<Set<Uuid>>(new Set());
const starBusy = ref(false);
const starredOnly = ref(false);
const flashcardSettingsOpen = ref(false);
const flashcardSettingsMenuRoot = ref<HTMLElement | null>(null);
const flashcardSettingsButtonEl = ref<HTMLButtonElement | null>(null);
const flashcardsDefinitionFirst = ref(false);
const flashcardFrontPreferenceBusy = ref(false);
const savedFlashcardTermId = ref<Uuid | null>(null);
const savedFlashcardCorrectTermIds = ref<Uuid[]>([]);
const savedFlashcardProgressSignature = ref<string | null>(null);

type SavedFlashcardProgress = {
    currentTermId: Uuid;
    correctTermIds: Uuid[];
};

const WEB_FLASHCARD_FRONT_KEY = "tracer:flashcards-definition-first";
const webFlashcardProgressKey = (setId: Uuid) =>
    `tracer:flashcard-progress:${setId}`;

const preferredFlashcardFrontOptionLabel = computed(() =>
    flashcardsDefinitionFirst.value
        ? t("set.termAtFront")
        : t("set.definitionAtFront"),
);

function readWebFlashcardFrontPreference() {
    try {
        return window.localStorage.getItem(WEB_FLASHCARD_FRONT_KEY) === "true";
    } catch {
        return false;
    }
}

function readWebFlashcardProgress(setId: Uuid): SavedFlashcardProgress | null {
    try {
        const raw = window.localStorage.getItem(webFlashcardProgressKey(setId));
        if (!raw) return null;
        try {
            const parsed = JSON.parse(raw) as Partial<SavedFlashcardProgress>;
            if (typeof parsed.currentTermId !== "string") return null;
            return {
                currentTermId: parsed.currentTermId,
                correctTermIds: Array.isArray(parsed.correctTermIds)
                    ? parsed.correctTermIds.filter(
                          (id): id is Uuid => typeof id === "string",
                      )
                    : [],
            };
        } catch {
            return { currentTermId: raw, correctTermIds: [] };
        }
    } catch {
        return null;
    }
}

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
        try {
            window.localStorage.setItem(
                webFlashcardProgressKey(setId),
                signature,
            );
        } catch {}
        return;
    }
    void useTracerDb()
        .then((db) =>
            createFlashcardProgressRepo(db).save(setId, progress),
        )
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
            window.localStorage.setItem(WEB_FLASHCARD_FRONT_KEY, String(next));
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

type TermsFilter = "all" | "starred" | "unstarred";
const termsFilter = ref<TermsFilter>("all");
const termsFilterMenuOpen = ref(false);
const termsFilterMenuRoot = ref<HTMLElement | null>(null);
const termsFilterButtonEl = ref<HTMLButtonElement | null>(null);
const termsFilterOptions: Array<{
    value: TermsFilter;
    labelKey: string;
}> = [
    { value: "all", labelKey: "set.filterAll" },
    { value: "starred", labelKey: "set.filterStarred" },
    { value: "unstarred", labelKey: "set.filterUnstarred" },
];

const filteredTerms = computed(() => {
    const terms = set.value?.terms ?? [];
    if (termsFilter.value === "all") return terms;
    const showStarred = termsFilter.value === "starred";
    return terms.filter(
        (term) =>
            starredTermIds.value.has(term.id as Uuid) === showStarred,
    );
});

function selectTermsFilter(filter: TermsFilter) {
    termsFilter.value = filter;
    termsFilterMenuOpen.value = false;
    nextTick(() => termsFilterButtonEl.value?.focus());
}

function onDocumentTermsFilterPointerDown(event: PointerEvent) {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (termsFilterMenuRoot.value?.contains(target)) return;
    termsFilterMenuOpen.value = false;
}

const baseSeed = computed(() => {
    const raw = route.query.seed;
    if (typeof raw !== "string") return null;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
});

const viewerButtonEl = ref<HTMLButtonElement | null>(null);

type UiChatMessage = ChatMessage & { id: string; fullContent?: string };

const chatMessages = ref<UiChatMessage[]>([]);
const chatInput = ref("");
const chatBusy = ref(false);
const chatError = ref<string | null>(null);
const chatAbort = shallowRef<AbortController | null>(null);
const chatLogEl = ref<HTMLDivElement | null>(null);
const chatTextareaEl = ref<HTMLTextAreaElement | null>(null);
const activeSavedChatId = ref<Uuid | null>(null);
const chatSaveBusy = ref(false);
const chatSaveAbort = shallowRef<AbortController | null>(null);
const chatSavedFeedback = ref(false);
let chatSavedFeedbackTimer: number | null = null;
const chatHistoryOpen = ref(false);
const chatHistoryBusy = ref(false);
const chatHistoryError = ref<string | null>(null);
const savedChats = ref<SavedChatListItem[]>([]);
const chatDeleteTarget = ref<SavedChatListItem | null>(null);
const chatDeleteBusy = ref(false);

const firstChatQuestion = computed(
    () =>
        chatMessages.value.find(
            (message) => message.role === "user" && message.content.trim(),
        )?.content.trim() ?? "",
);
const chatIsSaved = computed(() => activeSavedChatId.value !== null);

const aiError = ref<AiErrorUx | null>(null);
const aiErrorOpen = ref(false);
const aiRetryAction = ref<"chat" | "save" | "written">("chat");
const lastChatText = ref<string | null>(null);
const cachedChatModel = shallowRef<{ id: string; model: any } | null>(null);
const cachedChatModelPromise = shallowRef<
    { id: string; promise: Promise<any> } | null
>(null);
const chatRevealIntervalMs = 34;
type ChatRevealJob = { complete: boolean; pending: string; timer: number | null };
const chatRevealJobs = new Map<string, ChatRevealJob>();

function updateChatMessage(
    messageId: string,
    update: (message: UiChatMessage) => UiChatMessage,
) {
    const index = chatMessages.value.findIndex((message) => message.id === messageId);
    if (index < 0) return false;
    const current = chatMessages.value[index];
    if (!current) return false;
    const next = update(current);
    chatMessages.value = [
        ...chatMessages.value.slice(0, index),
        next,
        ...chatMessages.value.slice(index + 1),
    ];
    return true;
}

function takeRevealUnit(job: ChatRevealJob) {
    const next = takeNextChatRevealUnit(job.pending, job.complete);
    if (!next) return null;
    job.pending = next.pending;
    return next.unit;
}

function stopChatRevealTimer(messageId: string, job: ChatRevealJob) {
    if (job.timer !== null) {
        window.clearInterval(job.timer);
        job.timer = null;
    }
    chatRevealJobs.delete(messageId);
}

function revealNextChatUnit(messageId: string, job: ChatRevealJob) {
    const unit = takeRevealUnit(job);
    if (!unit) return false;
    const didUpdate = updateChatMessage(messageId, (message) => ({
        ...message,
        content: `${message.content}${unit}`,
    }));
    if (!didUpdate) return false;
    void nextTick().then(scrollChatToBottom);
    return true;
}

function startChatRevealTimer(messageId: string, job: ChatRevealJob) {
    if (job.timer !== null) return;

    job.timer = window.setInterval(() => {
        const current = chatRevealJobs.get(messageId);
        if (!current) return;
        revealNextChatUnit(messageId, current);
        if (!current.pending) {
            stopChatRevealTimer(messageId, current);
        }
    }, chatRevealIntervalMs);
}

function enqueueChatReveal(messageId: string, chunk: string) {
    if (!chunk) return;
    updateChatMessage(messageId, (message) => ({
        ...message,
        fullContent: `${message.fullContent ?? message.content}${chunk}`,
    }));
    let job = chatRevealJobs.get(messageId);
    if (!job) {
        job = { complete: false, pending: "", timer: null };
        chatRevealJobs.set(messageId, job);
    }
    job.pending += chunk;
    const message = chatMessages.value.find((m) => m.id === messageId);
    if (!message?.content) {
        revealNextChatUnit(messageId, job);
    }
    startChatRevealTimer(messageId, job);
}

function finishChatRevealStream(messageId: string) {
    const job = chatRevealJobs.get(messageId);
    if (!job) return;
    job.complete = true;
    if (!job.pending) {
        stopChatRevealTimer(messageId, job);
        return;
    }
    startChatRevealTimer(messageId, job);
}

function flushChatRevealJobs() {
    for (const [messageId, job] of chatRevealJobs.entries()) {
        if (job.pending) {
            const pending = job.pending;
            updateChatMessage(messageId, (message) => ({
                ...message,
                content: `${message.content}${pending}`,
            }));
            job.pending = "";
        }
        stopChatRevealTimer(messageId, job);
    }
    void nextTick().then(scrollChatToBottom);
}

function cancelChatRevealJobs() {
    for (const job of chatRevealJobs.values()) {
        if (job.timer !== null) window.clearInterval(job.timer);
    }
    chatRevealJobs.clear();
}

async function getCachedChatModel(modelId: string) {
    const cached = cachedChatModel.value;
    if (cached?.id === modelId) return cached.model;
    const existing = cachedChatModelPromise.value;
    const promise =
        existing?.id === modelId
            ? existing.promise
            : resolveAiModel(modelId).finally(() => {
                  if (cachedChatModelPromise.value?.id === modelId) {
                      cachedChatModelPromise.value = null;
                  }
              });
    if (existing?.id !== modelId) {
        cachedChatModelPromise.value = { id: modelId, promise };
    }
    const model = await promise;
    cachedChatModel.value = { id: modelId, model };
    return model;
}

function warmChatModel() {
    if (isWebPreview.value) return;
    const id = defaultModelId.value;
    if (!id) return;
    void getCachedChatModel(id).catch(() => {});
}

function showAiError(err: unknown, retryAction: "chat" | "save" = "chat") {
    aiRetryAction.value = retryAction;
    aiError.value = normalizeAiError(err);
    aiErrorOpen.value = true;
}

function closeAiError() {
    aiErrorOpen.value = false;
}

async function retryChat() {
    closeAiError();
    const text = lastChatText.value;
    if (!text) return;
    chatInput.value = text;
    await sendChat();
}

async function retryAiRequest() {
    if (aiRetryAction.value === "written") {
        closeAiError();
        await retryPracticeWrittenAnswer();
        return;
    }
    if (aiRetryAction.value === "save") {
        closeAiError();
        await saveChat();
        return;
    }
    await retryChat();
}

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
type PracticeChoiceValue = boolean | number;
type PracticeAnswerFeedback = {
    questionId: string;
    selected: PracticeChoiceValue;
    correct: PracticeChoiceValue;
};
const practiceAnswerFeedback = ref<PracticeAnswerFeedback | null>(null);
type PracticeWrittenFeedback = WrittenAnswerGrade & {
    questionId: string;
};
const practiceWrittenFeedback = ref<PracticeWrittenFeedback | null>(null);
const lastPracticeWrittenInput = ref<
    (WrittenAnswerGradeInput & { questionId: string }) | null
>(null);
const practiceWrittenAbort = shallowRef<AbortController | null>(null);
const practiceAnswerBusy = ref(false);
const learnIsNavigating = ref(false);
const practiceAnswerTransitionId = ref(0);

const matchPairsRequested = 8;
const matchDurationSeconds = 600; // 10 minutes max for stopwatch

const matchBusy = ref(false);
const matchError = ref<string | null>(null);
const matchRunCounter = ref(0);
const matchTiles = ref<MatchTile[]>([]);
const matchStartedAtMs = ref<number | null>(null);
const matchEndedAtMs = ref<number | null>(null);
const matchElapsedTimeMs = ref(0);
const matchTimerHandle = shallowRef<number | null>(null);
const matchSelectedTileIds = ref<string[]>([]);
const matchMatchedPairIds = ref<Set<Uuid>>(new Set());
const matchAttemptsCount = ref(0);
const matchCorrectAttemptsCount = ref(0);
const matchMemoryMode = ref(false);

const matchPairsTarget = computed(() => {
    const s = set.value;
    const available = s?.terms?.length ?? 0;
    return Math.min(matchPairsRequested, available);
});

const isExportOpen = ref(false);
const exportMessage = ref<string | null>(null);
const exportTextareaEl = ref<HTMLTextAreaElement | null>(null);

async function loadSet(setId: Uuid) {
    busy.value = true;
    loadError.value = null;
    try {
        const db = await useTracerDb();
        const [loadedSet, loadedLinkedFolder] = await Promise.all([
            createSetsRepo(db).get(setId),
            createLinkedFoldersRepo(db).getBySetId(setId),
        ]);
        set.value = loadedSet;
        linkedFolder.value = loadedLinkedFolder;

        if (set.value) {
            const guide = await createStudyGuidesRepo(db).getBySetId(setId);
            studyGuideSetId.value = guide ? setId : null;
        } else {
            studyGuideSetId.value = null;
        }
    } catch {
        loadError.value = "Failed to load set.";
    } finally {
        busy.value = false;
    }
}

async function syncLinkedFolderNow() {
    const setId = set.value?.id;
    if (!setId || linkedFolderBusy.value) return;
    linkedFolderBusy.value = true;
    try {
        await syncLinkedFolder(setId);
        await loadSet(setId);
    } catch {
    } finally {
        linkedFolderBusy.value = false;
    }
}

async function unlinkCurrentFolder() {
    const setId = set.value?.id;
    if (!setId || linkedFolderBusy.value) return;
    linkedFolderBusy.value = true;
    try {
        await unlinkFolder(setId);
        linkedFolder.value = null;
    } finally {
        linkedFolderBusy.value = false;
    }
}

async function onLinkedFolderStatus(event: Event) {
    const detail = (event as CustomEvent<{ setId: Uuid; linkedFolder: LinkedFolder | null }>).detail;
    if (!set.value || detail?.setId !== set.value.id) return;
    const previousStatus = linkedFolder.value?.status;
    linkedFolder.value = detail.linkedFolder;
    if (
        detail.linkedFolder &&
        (detail.linkedFolder.status === "synced" || detail.linkedFolder.status === "error") &&
        (previousStatus === "pending" || previousStatus === "syncing")
    ) {
        const db = await useTracerDb();
        const refreshed = await createSetsRepo(db).get(detail.setId);
        if (refreshed) set.value = refreshed;
        const guide = await createStudyGuidesRepo(db).getBySetId(detail.setId);
        studyGuideSetId.value = guide ? detail.setId : null;
    }
}

async function initWebDemoSet() {
    const demoId =
        typeof route.params.id === "string" && route.params.id.trim()
            ? route.params.id
            : "demo";
    set.value = createWebPreviewDemoSet(t, { id: demoId as Uuid });
    // Web preview fallback: allow E2E validation of study guide navigation.
    studyGuideSetId.value = set.value.id;
    busy.value = false;
    isFlipped.value = false;
    flashcardsDefinitionFirst.value = readWebFlashcardFrontPreference();
    await loadStars(set.value.id);
    const savedProgress = await loadSavedFlashcardProgress(set.value.id);
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
    await startLearnRun({ resetCounter: true });
    resetMatchStateForRun();
    matchPrepareTiles(set.value);
    await nextTick();
    if (mode.value === "chat") {
        chatTextareaEl.value?.focus();
    } else {
        viewerButtonEl.value?.focus();
    }
    window.addEventListener("keydown", onKeydown);
    document.addEventListener("pointerdown", onDocumentMatchPointerDown);
    document.addEventListener("pointerdown", onDocumentTermsFilterPointerDown);
    document.addEventListener(
        "pointerdown",
        onDocumentFlashcardSettingsPointerDown,
    );
}

const allStudyTermIds = computed(() => {
    const s = set.value;
    if (!s) return [];
    return s.terms.map((t) => t.id as Uuid);
});

const studyTermIds = computed(() => {
    const s = set.value;
    if (!s) return [];
    if (!starredOnly.value) return allStudyTermIds.value;
    return allStudyTermIds.value.filter((id) => starredTermIds.value.has(id));
});

const starredStudyCount = computed(
    () =>
        allStudyTermIds.value.filter((id) => starredTermIds.value.has(id))
            .length,
);

const isStarredOnlyEmpty = computed(
    () => starredOnly.value && starredStudyCount.value === 0,
);

const totalCount = computed(() => studyTermIds.value.length);

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
    return showingDefinition.value ? t.backImage ?? null : t.frontImage ?? null;
});

const flashcardSurfaceClass = computed(() => {
    if (flashcardAnswerFeedback.value === "correct") {
        return "border-2 border-emerald-600 bg-emerald-50/60 hover:bg-emerald-50/60 focus-visible:ring-emerald-300 dark:border-emerald-500 dark:bg-emerald-950/25 dark:hover:bg-emerald-950/25 dark:focus-visible:ring-emerald-800";
    }
    if (flashcardAnswerFeedback.value === "incorrect") {
        return "border-2 border-red-700 bg-red-50/70 hover:bg-red-50/70 focus-visible:ring-red-300 dark:border-red-500 dark:bg-red-950/30 dark:hover:bg-red-950/30 dark:focus-visible:ring-red-800";
    }
    return "border border-orange-200 bg-orange-50/20 hover:bg-orange-50/40 focus-visible:ring-orange-300 dark:border-amber-900/60 dark:bg-amber-950/10 dark:hover:bg-amber-950/20 dark:focus-visible:ring-amber-800";
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
    return retryTermIds.value.has(id) && answersByTermId.value[id] === "incorrect";
});

const accuracyText = computed(() => {
    const attempted = attemptedCount.value;
    if (attempted <= 0) return "0%";
    const pct = Math.round((correctCount.value / attempted) * 100);
    return `${pct}% (${correctCount.value}/${attempted})`;
});

const exportTsv = computed(() => {
    const s = set.value;
    if (!s) return "";
    return s.terms.map((t) => `${t.front}\t${t.back}`).join("\n");
});

function toggleFlip() {
    if (totalCount.value === 0 || flashcardAnswerBusy.value) return;
    isFlipping.value = true;
    setTimeout(() => {
        isFlipped.value = !isFlipped.value;
        isFlipping.value = false;
    }, 250);
}

function goPrev() {
    if (order.value.length === 0 || flashcardAnswerBusy.value) return;
    const next = Math.min(
        Math.max(cursorIndex.value - 1, 0),
        order.value.length - 1,
    );
    if (next !== cursorIndex.value) {
        isNavigating.value = "prev";
        setTimeout(() => {
            cursorIndex.value = next;
            isFlipped.value = false;
            isNavigating.value = null;
        }, 250);
    }
}

function goNext() {
    if (order.value.length === 0 || flashcardAnswerBusy.value) return;
    const next = Math.min(
        Math.max(cursorIndex.value + 1, 0),
        order.value.length - 1,
    );
    if (next !== cursorIndex.value) {
        isNavigating.value = "next";
        setTimeout(() => {
            cursorIndex.value = next;
            isFlipped.value = false;
            isNavigating.value = null;
        }, 250);
    }
}

function getRandomSeed() {
    try {
        const buf = new Uint32Array(1);
        (globalThis.crypto as Crypto | undefined)?.getRandomValues?.(buf);
        const v = Number(buf[0] ?? 0);
        if (Number.isFinite(v) && v !== 0) return v;
    } catch {}
    return Date.now() ^ Math.floor(Math.random() * 0xffffffff);
}

function makePrng(seed: number) {
    let x = seed | 0 || 1;
    return () => {
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        return (x >>> 0) / 4294967296;
    };
}

function matchSeed() {
    const s = baseSeed.value;
    if (s !== null) return s + matchRunCounter.value;
    return getRandomSeed() ^ (matchRunCounter.value * 2654435761);
}

function clearMatchTimer() {
    const handle = matchTimerHandle.value;
    if (handle !== null) {
        window.clearInterval(handle);
        matchTimerHandle.value = null;
    }
}

function matchComputeElapsedMs(nowMs: number) {
    const start = matchStartedAtMs.value;
    if (start === null) return 0;
    return Math.max(0, nowMs - start);
}

function matchStop(reason: "completed" | "timeout") {
    if (matchEndedAtMs.value !== null) return;
    const now = Date.now();
    matchEndedAtMs.value = now;
    matchElapsedTimeMs.value = matchComputeElapsedMs(now);
    clearMatchTimer();

    matchSelectedTileIds.value = [];
    matchBusy.value = false;
    if (reason === "timeout") {
        // Results should still show in a calm state.
    }
}

function startMatchTimer() {
    clearMatchTimer();
    matchTimerHandle.value = window.setInterval(() => {
        const now = Date.now();
        matchElapsedTimeMs.value = matchComputeElapsedMs(now);
        // Stop if elapsed time reaches 10 minutes
        if (matchElapsedTimeMs.value >= matchDurationSeconds * 1000) {
            matchElapsedTimeMs.value = matchDurationSeconds * 1000;
            matchStop("timeout");
        }
    }, 125);
}

function resetMatchStateForRun() {
    matchError.value = null;
    matchBusy.value = false;
    matchSelectedTileIds.value = [];
    matchMatchedPairIds.value = new Set();
    matchAttemptsCount.value = 0;
    matchCorrectAttemptsCount.value = 0;
    matchStartedAtMs.value = null;
    matchEndedAtMs.value = null;
    matchElapsedTimeMs.value = 0;
    clearMatchTimer();
}

function matchPrepareTiles(s: FlashcardSet) {
    const seed = matchSeed();
    matchTiles.value = generateMatchTiles(s.terms, {
        seed,
        pairCount: matchPairsTarget.value,
    });
}

function startMatch() {
    const s = set.value;
    if (!s) return;
    resetMatchStateForRun();
    matchPrepareTiles(s);
    if (matchTiles.value.length === 0) {
        matchError.value = "No cards available.";
        return;
    }
    matchStartedAtMs.value = Date.now();
    matchElapsedTimeMs.value = 0;
    startMatchTimer();
}

function restartMatchRun() {
    matchRunCounter.value += 1;
    resetMatchStateForRun();
    if (set.value) matchPrepareTiles(set.value);
}

function matchIsTileRevealed(tile: MatchTile) {
    // If memory mode is off, always reveal (show content)
    if (!matchMemoryMode.value) {
        return true;
    }
    // In memory mode, only reveal if matched or selected
    if (matchMatchedPairIds.value.has(tile.pairId)) return true;
    if (matchSelectedTileIds.value.includes(tile.id)) return true;
    return false;
}

function matchTileDisabled(tile: MatchTile) {
    if (!matchIsRunning.value) return true;
    if (matchEndedAtMs.value !== null) return true;
    if (matchMatchedPairIds.value.has(tile.pairId)) return true;
    if (
        matchSelectedTileIds.value.length >= 2 &&
        !matchSelectedTileIds.value.includes(tile.id)
    )
        return true;
    return false;
}

function matchTileClass(tile: MatchTile) {
    const matched = matchMatchedPairIds.value.has(tile.pairId);
    const selected = matchSelectedTileIds.value.includes(tile.id);
    const revealed = matchIsTileRevealed(tile);
    if (matched) {
        return "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100";
    }
    if (selected && matchBusy.value) {
        return "border-red-800 bg-red-100 text-red-950 ring-2 ring-red-500/70 dark:border-red-500 dark:bg-red-950/60 dark:text-red-50 dark:ring-red-700/80";
    }
    if (selected) {
        return "border-amber-500 bg-amber-50 text-slate-900 ring-1 ring-amber-200 dark:border-amber-600 dark:bg-amber-950/25 dark:text-slate-50 dark:ring-amber-900/60";
    }
    if (revealed) {
        return "border-amber-200 bg-amber-50/20 text-slate-900 dark:border-amber-900/60 dark:bg-amber-950/10 dark:text-slate-50";
    }
    return "border-amber-200 bg-amber-50/30 text-transparent hover:bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/10 dark:hover:bg-amber-950/20";
}

function matchFindTile(id: string) {
    return matchTiles.value.find((t) => t.id === id) ?? null;
}

async function onMatchTileClick(tile: MatchTile) {
    if (!matchIsRunning.value) return;
    if (matchEndedAtMs.value !== null) return;
    if (matchMatchedPairIds.value.has(tile.pairId)) return;
    if (matchSelectedTileIds.value.includes(tile.id)) {
        matchSelectedTileIds.value = matchSelectedTileIds.value.filter(
            (id) => id !== tile.id,
        );
        return;
    }
    if (matchSelectedTileIds.value.length >= 2) return;

    matchSelectedTileIds.value = [...matchSelectedTileIds.value, tile.id];
    if (matchSelectedTileIds.value.length < 2) return;

    const [aId, bId] = matchSelectedTileIds.value;
    const a = aId ? matchFindTile(aId) : null;
    const b = bId ? matchFindTile(bId) : null;
    if (!a || !b) {
        matchSelectedTileIds.value = [];
        return;
    }

    matchAttemptsCount.value += 1;
    const isMatch = a.pairId === b.pairId && a.kind !== b.kind;
    if (isMatch) {
        matchCorrectAttemptsCount.value += 1;
        matchMatchedPairIds.value = new Set([
            ...matchMatchedPairIds.value,
            a.pairId,
        ]);
        matchSelectedTileIds.value = [];
        if (
            matchMatchedPairIds.value.size >=
            Math.min(
                matchPairsTarget.value,
                Math.floor(matchTiles.value.length / 2),
            )
        ) {
            matchStop("completed");
        }
        return;
    }

    matchBusy.value = true;
    await new Promise((r) => window.setTimeout(r, 550));
    matchBusy.value = false;
    matchSelectedTileIds.value = [];
}

function onDocumentMatchPointerDown(event: PointerEvent) {
    if (matchSelectedTileIds.value.length === 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-match-tile="true"]')) return;
    if (target.closest('button,a,input,textarea,select,[role="button"]')) return;
    matchSelectedTileIds.value = [];
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
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
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
    if (practiceQuestionTypes[kind] && enabledPracticeQuestionTypes().length === 1) {
        learnError.value = "Choose at least one question type.";
        return;
    }
    practiceQuestionTypes[kind] = !practiceQuestionTypes[kind];
    learnError.value = null;
    practiceQuestionCount.value = Math.min(
        practiceQuestionCount.value,
        practiceQuestionLimit.value,
    );
}

function openPracticeSettings() {
    practiceSettingsOpen.value = !practiceSettingsOpen.value;
    if (practiceSettingsOpen.value) {
        clampPracticeQuestionCount();
        clearPracticeTimer();
    }
}

function clearPracticeTimer() {
    if (practiceTimerHandle.value !== null) {
        window.clearInterval(practiceTimerHandle.value);
        practiceTimerHandle.value = null;
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

function practiceQuestionSurfaceClass() {
    const question = learnCurrentQuestion.value;
    const feedback = practiceWrittenFeedback.value;
    if (
        question?.kind === "written" &&
        feedback?.questionId === question.id
    ) {
        return feedback.isCorrect
            ? "border-2 border-emerald-600 bg-emerald-50/40 dark:border-emerald-500 dark:bg-emerald-950/20"
            : "border-2 border-red-700 bg-red-50/40 dark:border-red-500 dark:bg-red-950/20";
    }
    return "border-amber-200 bg-amber-50/20 dark:border-amber-900/60 dark:bg-amber-950/10";
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

    try {
        let grade: WrittenAnswerGrade;
        if (isWebPreview.value) {
            await waitForFeedback(250);
            grade = gradeWebPreviewWrittenAnswer(input);
        } else {
            if (!defaultModelId.value) {
                aiRetryAction.value = "written";
                aiError.value = aiErrorForMissingDefaultModel();
                aiErrorOpen.value = true;
                return;
            }
            grade = await gradeWrittenAnswer({
                model: await getCachedChatModel(defaultModelId.value),
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
        aiRetryAction.value = "written";
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
                prompt: `True or False: "${term}" corresponds with "${def}".`,
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
    if (practiceSessionMode.value === "test") {
        const currentSet = set.value;
        if (!currentSet) return;
        clampPracticeQuestionCount();
        void router.push({
            path: `/set/${currentSet.id}-test`,
            query: {
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
}

function shuffle<T>(items: T[], rand: () => number) {
    const a = items.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rand() * (i + 1));
        const tmp = a[i];
        a[i] = a[j]!;
        a[j] = tmp!;
    }
    return a;
}

function shuffleRun() {
    cancelFlashcardAnswerFeedback();
    const s = set.value;
    if (!s) return;
    const ids = studyTermIds.value;
    if (ids.length <= 1) {
        order.value = ids;
        cursorIndex.value = 0;
        answersByTermId.value = {};
        answerAttemptsCount.value = 0;
        retryTermIds.value = new Set();
        isFlipped.value = false;
        return;
    }

    const seed =
        baseSeed.value !== null
            ? baseSeed.value + runCounter.value + 1
            : getRandomSeed();
    let nextOrder = shuffle(ids, makePrng(seed));
    if (baseSeed.value === null) {
        const prev = lastOrder.value;
        const same =
            prev.length === nextOrder.length &&
            prev.every((v, i) => v === nextOrder[i]);
        if (same) {
            nextOrder = [...nextOrder.slice(1), nextOrder[0]!];
        }
    }
    lastOrder.value = nextOrder;
    order.value = nextOrder;
    cursorIndex.value = 0;
    answersByTermId.value = {};
    answerAttemptsCount.value = 0;
    retryTermIds.value = new Set();
    isFlipped.value = false;
    nextTick(() => viewerButtonEl.value?.focus());
}

function startRun(options?: {
    resetCounter?: boolean;
    resumeTermId?: Uuid | null;
    resumeCorrectTermIds?: Uuid[];
}) {
    cancelFlashcardAnswerFeedback();
    const s = set.value;
    if (!s) return;
    if (options?.resetCounter) runCounter.value = 0;

    const ids = studyTermIds.value;
    // Default run order matches the saved set order; shuffle is an explicit action.
    lastOrder.value = ids;
    order.value = ids;
    const resumeIndex = options?.resumeTermId
        ? ids.indexOf(options.resumeTermId)
        : -1;
    cursorIndex.value = resumeIndex >= 0 ? resumeIndex : 0;
    const correctTermIds = (options?.resumeCorrectTermIds ?? []).filter((id) =>
        ids.includes(id),
    );
    answersByTermId.value = Object.fromEntries(
        correctTermIds.map((id) => [id, "correct" as const]),
    );
    answerAttemptsCount.value = correctTermIds.length;
    retryTermIds.value = new Set();
    isFlipped.value = false;
}

function restartRun() {
    runCounter.value += 1;
    if (isStarredOnlyEmpty.value) {
        starredOnly.value = false;
    }
    startRun();
    nextTick(() => viewerButtonEl.value?.focus());
}

function toggleStarredOnly() {
    if (!starredOnly.value && starredStudyCount.value === 0) return;
    starredOnly.value = !starredOnly.value;
    restartRun();
}

function shuffleFromFlashcardSettings() {
    flashcardSettingsOpen.value = false;
    shuffleRun();
}

function toggleStarredOnlyFromFlashcardSettings() {
    flashcardSettingsOpen.value = false;
    toggleStarredOnly();
}

function restartFromFlashcardSettings() {
    flashcardSettingsOpen.value = false;
    restartRun();
}

function findNextUnattempted(fromIndex: number) {
    const ids = order.value;
    if (ids.length === 0) return null;
    const answered = answersByTermId.value;
    for (let step = 0; step < ids.length; step += 1) {
        const idx = (fromIndex + step) % ids.length;
        const id = ids[idx];
        if (!id) continue;
        if (answered[id] !== "correct") return idx;
    }
    return null;
}

function commitAnswer(answer: FlashcardsAnswer) {
    const t = currentTerm.value;
    if (!t) return;
    const id = t.id as Uuid;
    answerAttemptsCount.value += 1;
    answersByTermId.value = {
        ...answersByTermId.value,
        [id]: answer,
    };
    const retries = new Set(retryTermIds.value);
    if (answer === "incorrect") {
        retries.add(id);
        order.value = [...order.value, id];
    } else {
        retries.delete(id);
    }
    retryTermIds.value = retries;
    isFlipped.value = false;
    const next = findNextUnattempted(cursorIndex.value + 1);
    if (next === null) {
        return;
    }
    cursorIndex.value = next;
}

function waitForFeedback(ms: number) {
    return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function cancelFlashcardAnswerFeedback() {
    flashcardAnswerTransitionId.value += 1;
    flashcardAnswerFeedback.value = null;
    flashcardAnswerBusy.value = false;
    isNavigating.value = null;
}

async function markAnswer(answer: FlashcardsAnswer) {
    if (!currentTerm.value || flashcardAnswerBusy.value) return;
    const transitionId = ++flashcardAnswerTransitionId.value;
    flashcardAnswerFeedback.value = answer;
    flashcardAnswerBusy.value = true;
    isFlipped.value = false;

    await waitForFeedback(450);
    if (transitionId !== flashcardAnswerTransitionId.value) return;

    isNavigating.value = "next";
    await waitForFeedback(250);
    if (transitionId !== flashcardAnswerTransitionId.value) return;

    commitAnswer(answer);
    isNavigating.value = null;
    flashcardAnswerFeedback.value = null;
    flashcardAnswerBusy.value = false;
}

function markCorrect() {
    void markAnswer("correct");
}

function markIncorrect() {
    void markAnswer("incorrect");
}

async function loadStars(setId: Uuid) {
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

async function toggleTermStar(termId: Uuid) {
    const s = set.value;
    if (!s) return;
    if (starBusy.value) return;

    const next = !starredTermIds.value.has(termId);
    starBusy.value = true;
    try {
        if (!isWebPreview.value) {
            const db = await useTracerDb();
            await createStarsRepo(db).setStarred(s.id as Uuid, termId, next);
        }
        const updated = new Set(starredTermIds.value);
        if (next) updated.add(termId);
        else updated.delete(termId);
        starredTermIds.value = updated;
        if (starredOnly.value) {
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
    if (e.key === "Escape" && termsFilterMenuOpen.value) {
        termsFilterMenuOpen.value = false;
        termsFilterButtonEl.value?.focus();
        return;
    }
    if (shouldIgnoreKey(e)) return;
    if (isExportOpen.value) return;
    if (termsFilterMenuOpen.value || flashcardSettingsOpen.value) return;
    if (mode.value !== "flashcards") return;

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

const matchIsRunning = computed(
    () => matchStartedAtMs.value !== null && matchEndedAtMs.value === null,
);
const matchIsFinished = computed(
    () => matchStartedAtMs.value !== null && matchEndedAtMs.value !== null,
);
const matchMatchedPairsCount = computed(() => matchMatchedPairIds.value.size);

function formatSecondsCeil(ms: number) {
    return Math.ceil(Math.max(0, ms) / 1000);
}

const matchTopline = computed(() => {
    if (!matchIsRunning.value && !matchIsFinished.value) return "Ready";
    const seconds = Math.floor(matchElapsedTimeMs.value / 1000);
    const pairs = `${matchMatchedPairsCount.value}/${matchPairsTarget.value}`;
    if (matchIsRunning.value) return `Time: ${seconds}s · Matched: ${pairs}`;
    return `Done · Matched: ${pairs}`;
});

const matchAccuracyText = computed(() => {
    const attempts = matchAttemptsCount.value;
    if (attempts <= 0) return "0% (0/0)";
    const pct = Math.round((matchCorrectAttemptsCount.value / attempts) * 100);
    return `${pct}% (${matchCorrectAttemptsCount.value}/${attempts})`;
});

const matchTimeText = computed(() => {
    const elapsedMs = matchElapsedTimeMs.value;
    const elapsedS = Math.round(elapsedMs / 1000);
    return `${elapsedS}s`;
});

function newMsgId() {
    const fn = (globalThis as any)?.crypto?.randomUUID;
    if (typeof fn === "function") return fn.call((globalThis as any).crypto);
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function scrollChatToBottom() {
    const el = chatLogEl.value;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
}

function currentSavedChatPayload(): SavedChatPayload {
    return {
        version: 1,
        messages: chatMessages.value
            .map((message) => ({
                role: message.role,
                content: message.fullContent ?? message.content,
            }))
            .filter((message) => message.content.trim().length > 0),
    };
}

function clearChatSavedFeedback() {
    chatSavedFeedback.value = false;
    if (chatSavedFeedbackTimer !== null) {
        window.clearTimeout(chatSavedFeedbackTimer);
        chatSavedFeedbackTimer = null;
    }
}

function showChatSavedFeedback() {
    clearChatSavedFeedback();
    chatSavedFeedback.value = true;
    chatSavedFeedbackTimer = window.setTimeout(() => {
        chatSavedFeedback.value = false;
        chatSavedFeedbackTimer = null;
    }, 1500);
}

async function saveChat() {
    const s = set.value;
    const firstQuestion = firstChatQuestion.value;
    if (!s || !firstQuestion || chatBusy.value || chatSaveBusy.value) return;
    if (activeSavedChatId.value || isWebPreview.value) return;

    if (!defaultModelId.value) {
        aiRetryAction.value = "save";
        aiError.value = aiErrorForMissingDefaultModel();
        aiErrorOpen.value = true;
        return;
    }

    flushChatRevealJobs();
    chatError.value = null;
    const controller = new AbortController();
    chatSaveAbort.value?.abort();
    chatSaveAbort.value = controller;
    chatSaveBusy.value = true;

    try {
        const model = await getCachedChatModel(defaultModelId.value);
        const result = await generateText({
            model,
            prompt: buildChatTitlePrompt(firstQuestion),
            abortSignal: controller.signal,
        });
        if (controller.signal.aborted) return;

        const title = normalizeGeneratedChatTitle(result.text);
        if (!title) throw new Error("The AI model returned an empty chat title.");

        const db = await useTracerDb();
        const saved = await createChatsRepo(db).create({
            id: newMsgId() as Uuid,
            setId: s.id,
            title,
            payload: currentSavedChatPayload(),
        });
        if (controller.signal.aborted) return;

        activeSavedChatId.value = saved.id;
        showChatSavedFeedback();
    } catch (err) {
        if (controller.signal.aborted) return;
        if (isAiErrorCandidate(err)) {
            showAiError(err, "save");
        } else {
            chatError.value = toErrorMessage(err, t("chat.saveFailed"));
        }
    } finally {
        if (chatSaveAbort.value === controller) {
            chatSaveAbort.value = null;
            chatSaveBusy.value = false;
        }
    }
}

async function persistActiveSavedChat() {
    const id = activeSavedChatId.value;
    if (!id || isWebPreview.value) return;
    try {
        const db = await useTracerDb();
        await createChatsRepo(db).updateMessages(
            id,
            currentSavedChatPayload(),
        );
    } catch (err) {
        chatError.value = toErrorMessage(err, t("chat.saveFailed"));
    }
}

function formatSavedChatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(language.value, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

async function loadSavedChats() {
    const s = set.value;
    if (!s || isWebPreview.value) return;
    chatHistoryBusy.value = true;
    chatHistoryError.value = null;
    try {
        const db = await useTracerDb();
        savedChats.value = await createChatsRepo(db).listBySet(s.id);
    } catch (err) {
        chatHistoryError.value = toErrorMessage(err, t("chat.historyFailed"));
    } finally {
        chatHistoryBusy.value = false;
    }
}

async function openChatHistory() {
    if (!set.value || chatBusy.value || chatSaveBusy.value || isWebPreview.value)
        return;
    chatHistoryOpen.value = true;
    await loadSavedChats();
}

function closeChatHistory() {
    if (chatDeleteBusy.value) return;
    chatHistoryOpen.value = false;
    chatDeleteTarget.value = null;
}

async function openSavedChat(id: Uuid) {
    if (chatHistoryBusy.value || chatDeleteBusy.value || isWebPreview.value) return;
    chatHistoryBusy.value = true;
    chatHistoryError.value = null;
    try {
        const db = await useTracerDb();
        const repo = createChatsRepo(db);
        const saved = await repo.get(id);
        if (!saved) {
            await loadSavedChats();
            return;
        }
        await repo.touchOpened(id);

        resetChat();
        chatMessages.value = saved.payload.messages.map((message) => ({
            id: newMsgId(),
            role: message.role,
            content: message.content,
            fullContent: message.content,
        }));
        activeSavedChatId.value = saved.id;
        lastChatText.value =
            [...saved.payload.messages]
                .reverse()
                .find((message) => message.role === "user")?.content ?? null;
        chatHistoryOpen.value = false;
        await nextTick();
        scrollChatToBottom();
        chatTextareaEl.value?.focus();
    } catch (err) {
        chatHistoryError.value = toErrorMessage(err, t("chat.openFailed"));
    } finally {
        chatHistoryBusy.value = false;
    }
}

function requestDeleteChat(savedChat: SavedChatListItem) {
    chatDeleteTarget.value = savedChat;
}

function cancelDeleteChat() {
    if (chatDeleteBusy.value) return;
    chatDeleteTarget.value = null;
}

async function confirmDeleteChat() {
    const target = chatDeleteTarget.value;
    if (!target || chatDeleteBusy.value || isWebPreview.value) return;
    chatDeleteBusy.value = true;
    chatHistoryError.value = null;
    try {
        const db = await useTracerDb();
        await createChatsRepo(db).delete(target.id);
        savedChats.value = savedChats.value.filter(
            (savedChat) => savedChat.id !== target.id,
        );
        if (activeSavedChatId.value === target.id) resetChat();
        chatDeleteTarget.value = null;
    } catch (err) {
        chatHistoryError.value = toErrorMessage(err, t("chat.deleteFailed"));
        chatDeleteTarget.value = null;
    } finally {
        chatDeleteBusy.value = false;
    }
}

function resetChat() {
    chatAbort.value?.abort();
    chatAbort.value = null;
    chatSaveAbort.value?.abort();
    chatSaveAbort.value = null;
    cancelChatRevealJobs();
    clearChatSavedFeedback();
    chatMessages.value = [];
    chatInput.value = "";
    chatBusy.value = false;
    chatSaveBusy.value = false;
    chatError.value = null;
    activeSavedChatId.value = null;
    lastChatText.value = null;
}

function onChatInputKeydown(e: KeyboardEvent) {
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;
    e.preventDefault();
    void sendChat();
}

function toErrorMessage(err: unknown, fallback: string) {
    if (typeof err === "string") return err;
    if (err instanceof Error && typeof err.message === "string")
        return err.message;
    const maybe = err as any;
    if (maybe && typeof maybe.message === "string") return maybe.message;
    return fallback;
}

async function sendChat() {
    const s = set.value;
    if (!s) return;
    if (chatBusy.value) return;

    const text = chatInput.value.trim();
    if (!text) return;
    flushChatRevealJobs();

    if (
        typeof navigator !== "undefined" &&
        typeof navigator.onLine === "boolean" &&
        navigator.onLine === false
    ) {
        lastChatText.value = text;
        showAiError(new Error("Failed to fetch"));
        return;
    }

    lastChatText.value = text;
    chatInput.value = "";
    chatError.value = null;
    aiRetryAction.value = "chat";
    aiError.value = null;
    aiErrorOpen.value = false;

    chatAbort.value?.abort();
    const controller = new AbortController();
    chatAbort.value = controller;
    const modelPromise =
        !isWebPreview.value && defaultModelId.value
            ? getCachedChatModel(defaultModelId.value)
            : null;

    const userMsg: UiChatMessage = {
        id: newMsgId(),
        role: "user",
        content: text,
        fullContent: text,
    };
    chatMessages.value = [...chatMessages.value, userMsg];

    const assistantMsg: UiChatMessage = {
        id: newMsgId(),
        role: "assistant",
        content: "",
        fullContent: "",
    };
    chatMessages.value = [...chatMessages.value, assistantMsg];
    await nextTick();
    scrollChatToBottom();

    chatBusy.value = true;
    try {
        const prior: ChatMessage[] = takeRecentChatMessages(
            chatMessages.value
                .slice(0, -1)
                .map((m) => ({
                    role: m.role,
                    content: m.fullContent ?? m.content,
                })),
        );
        const system = chatSystemPrompt.value || buildGroundedChatSystemPrompt(s);

        if (isWebPreview.value) {
            for await (const chunk of streamWebPreviewMockChatAnswer({
                set: s,
                userMessage: text,
                abortSignal: controller.signal,
            })) {
                enqueueChatReveal(assistantMsg.id, chunk);
            }
            finishChatRevealStream(assistantMsg.id);
            return;
        }

        if (!defaultModelId.value) {
            aiError.value = aiErrorForMissingDefaultModel();
            aiErrorOpen.value = true;
            return;
        }

        const model = await (modelPromise ?? getCachedChatModel(defaultModelId.value));
        const result = streamGroundedChatText({
            model,
            system,
            messages: prior,
            abortSignal: controller.signal,
        });

        for await (const chunk of result.textStream) {
            enqueueChatReveal(assistantMsg.id, chunk);
        }
        finishChatRevealStream(assistantMsg.id);
        await persistActiveSavedChat();
    } catch (err) {
        if (controller.signal.aborted) return;
        if (isAiErrorCandidate(err)) {
            showAiError(err);
            chatError.value = null;
        } else {
            chatError.value = toErrorMessage(err, "Failed to send message.");
        }
    } finally {
        if (controller.signal.aborted) cancelChatRevealJobs();
        if (chatAbort.value === controller) chatAbort.value = null;
        if (!controller.signal.aborted) {
            chatBusy.value = false;
            await nextTick();
            scrollChatToBottom();
        }
    }
}

function openExport() {
    exportMessage.value = null;
    isExportOpen.value = true;
    nextTick(() => {
        exportTextareaEl.value?.focus();
        selectAllExport();
    });
}

function closeExport() {
    isExportOpen.value = false;
    exportMessage.value = null;
    nextTick(() => {
        viewerButtonEl.value?.focus();
    });
}

function selectAllExport() {
    const el = exportTextareaEl.value;
    if (!el) return;
    el.focus();
    el.select();
}

async function copyExport() {
    exportMessage.value = null;
    const text = exportTsv.value;
    if (!text) return;

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            exportMessage.value = "Copied to clipboard.";
            return;
        }
    } catch {}

    selectAllExport();
    exportMessage.value = "Select the text and copy it manually.";
}

function downloadExport() {
    exportMessage.value = null;
    const text = exportTsv.value;
    if (!text) return;

    const s = set.value;
    const filename = s ? `${s.title}.txt` : "export.txt";

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    exportMessage.value = "Downloaded.";
}

async function openSetPage() {
    let lockGateEvaluated = false;
    let lockGateRequiresUnlock = false;
    let lockGateStartupLockEnabled = false;
    let lockGateUnlockedThisSession = false;
    try {
        if (isNestedSetRoute.value) {
            busy.value = false;
            return;
        }

        busy.value = true;
        loadError.value = null;

        if (isWebPreview.value) {
            await initWebDemoSet();
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
        flashcardsDefinitionFirst.value = settings.flashcardsDefinitionFirst;

        lockGateEvaluated = true;
        lockGateRequiresUnlock = status.requires_unlock;
        lockGateStartupLockEnabled = settings.startupLockEnabled;
        lockGateUnlockedThisSession = unlockedThisSession.value;
        if (settings.startupLockEnabled && status.requires_unlock) {
            if (!unlockedThisSession.value) {
                markLocked();
                await router.replace("/unlock");
                return;
            }
        } else if (status.can_auto_unlock) {
            markUnlocked();
        }

        if (mode.value === "chat" && !settings.defaultModelId) {
            await router.replace({
                path: "/settings",
                query: {
                    reason: "missing-default-model",
                    from: route.fullPath,
                },
            });
            return;
        }
        if (mode.value === "chat") warmChatModel();

        const idParam = route.params.id;
        if (typeof idParam !== "string" || !idParam.trim()) {
            busy.value = false;
            loadError.value = "Missing set id.";
            return;
        }

        await loadSet(idParam as Uuid);

        if (set.value) {
            await loadStars(set.value.id);
            const savedProgress = await loadSavedFlashcardProgress(set.value.id);
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
            await startLearnRun({ resetCounter: true });
            resetMatchStateForRun();
            matchPrepareTiles(set.value);
        }
        await nextTick();
        if (mode.value === "chat") {
            chatTextareaEl.value?.focus();
        } else {
            viewerButtonEl.value?.focus();
        }

        window.addEventListener("keydown", onKeydown);
        window.addEventListener(LINKED_FOLDER_STATUS_EVENT, onLinkedFolderStatus);
        document.addEventListener("pointerdown", onDocumentMatchPointerDown);
        document.addEventListener("pointerdown", onDocumentTermsFilterPointerDown);
        document.addEventListener(
            "pointerdown",
            onDocumentFlashcardSettingsPointerDown,
        );
    } catch {
        const tauriInvoke = typeof (globalThis as any)?.__TAURI_INTERNALS__
            ?.invoke;
        if (tauriInvoke !== "function") {
            await initWebDemoSet();
            return;
        }

        if (
            lockGateEvaluated &&
            lockGateStartupLockEnabled &&
            lockGateRequiresUnlock &&
            !lockGateUnlockedThisSession
        ) {
            markLocked();
            await router.replace("/unlock");
            return;
        }

        busy.value = false;
        if (!loadError.value) loadError.value = "Failed to open set.";
    }
}

onMounted(async () => {
    await openSetPage();
});

watch(
    mode,
    async (next, prev) => {
        if (isNestedSetRoute.value) return;

        flashcardSettingsOpen.value = false;

        if (prev === "chat" && next !== "chat") resetChat();
        if (next === "chat") warmChatModel();

        if (next === "flashcards" && prev !== "flashcards") {
            startRun({
                resetCounter: true,
                resumeTermId: savedFlashcardTermId.value,
                resumeCorrectTermIds: savedFlashcardCorrectTermIds.value,
            });
        }
        if (next === "learn" && prev !== "learn") {
            await startLearnRun({ resetCounter: true });
        }
        if (prev === "learn" && next !== "learn") {
            clearPracticeTimer();
        }
        if (next === "match" && prev !== "match") {
            resetMatchStateForRun();
            if (set.value) matchPrepareTiles(set.value);
        }
        // Reset match state and stopwatch when navigating away from match mode
        if (prev === "match" && next !== "match") {
            resetMatchStateForRun();
            matchMemoryMode.value = false;
        }
        await nextTick();
        if (next === "chat") {
            chatTextareaEl.value?.focus();
            scrollChatToBottom();
        } else {
            viewerButtonEl.value?.focus();
        }
    },
    { flush: "post" },
);

watch(
    () => [
        order.value[cursorIndex.value] ?? null,
        allStudyTermIds.value
            .filter((id) => answersByTermId.value[id] === "correct")
            .join("\u0000"),
    ] as const,
    ([termId]) => {
        if (!termId || mode.value !== "flashcards") return;
        persistFlashcardProgress(termId as Uuid);
    },
    { flush: "post" },
);

watch(language, async () => {
    if (!isWebPreview.value || isNestedSetRoute.value) return;
    await initWebDemoSet();
});

watch(learnCurrentQuestion, () => {
    practiceWrittenAnswer.value = "";
});

watch(practiceTimed, (enabled) => {
    if (!enabled) clearPracticeTimer();
});

watch(
    isNestedSetRoute,
    async (isNested, wasNested) => {
        if (isNested || !wasNested) return;
        await openSetPage();
    },
    { flush: "post" },
);

onBeforeUnmount(() => {
    cancelFlashcardAnswerFeedback();
    cancelPracticeAnswerFeedback();
    resetChat();
    clearPracticeTimer();
    clearMatchTimer();
    window.removeEventListener("keydown", onKeydown);
    window.removeEventListener(LINKED_FOLDER_STATUS_EVENT, onLinkedFolderStatus);
    document.removeEventListener("pointerdown", onDocumentMatchPointerDown);
    document.removeEventListener("pointerdown", onDocumentTermsFilterPointerDown);
    document.removeEventListener(
        "pointerdown",
        onDocumentFlashcardSettingsPointerDown,
    );
});
</script>

<style scoped>
.study-mode-bar {
    justify-content: center;
    justify-content: safe center;
}

.study-panel {
    min-height: clamp(324px, 52.2vh, 576px);
    max-height: min(70.2vh, 684px);
    overflow: auto;
}

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
    animation: flip 0.25s ease-in-out;
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
    max-width: min(12rem, 27.5%);
    max-height: 9rem;
    object-fit: contain;
    border-radius: 22%;
    clip-path: inset(0 round 22%);
}

.flashcard-content-row {
    gap: 0;
}

.flashcard-content-row--paired {
    gap: clamp(1.5rem, 12.5%, 6rem);
}

.flashcard-side-text {
    min-width: 0;
    max-width: 100%;
}

.flashcard-side-text--paired {
    max-width: min(34rem, 60%);
}
</style>
