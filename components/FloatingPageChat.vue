<template>
    <div v-if="floatingChatReady && floatingChatEnabled" data-page-chat-root>
        <section
            v-if="panelOpen"
            ref="panelEl"
            class="tracer-chat-panel fixed bottom-24 right-6 z-[70] flex h-[min(34rem,calc(100vh-8rem))] w-[min(26rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-[var(--tracer-radius-surface)] border border-slate-200 bg-white shadow-xl shadow-slate-900/15 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40"
            role="dialog"
            aria-label="Chat with Tracer"
        >
            <header
                class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800"
            >
                <div class="flex min-w-0 items-center gap-2.5">
                    <StudyModeArtwork name="chat" :size="24" />
                    <h2
                        class="truncate text-base font-semibold text-slate-900 dark:text-slate-50"
                    >
                        Chat with Tracer
                    </h2>
                </div>
                <div class="flex shrink-0 items-center gap-1">
                    <UButton color="primary" variant="soft"
                        type="button"
                        class="inline-flex h-8 items-center justify-center rounded-[var(--tracer-radius-control)] px-3 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                        :disabled="messages.length === 0 && !error && !busy"
                        @click="clearChat"
                    >
                        Clear
                    </UButton>
                    <UButton color="primary" variant="soft"
                        type="button"
                        class="inline-flex h-8 w-8 items-center justify-center rounded-[var(--tracer-radius-control)] text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                        aria-label="Close chat"
                        @click="closePanel"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            class="h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                            />
                        </svg>
                    </UButton>
                </div>
            </header>

            <div
                ref="messagesEl"
                class="m-3 min-h-0 flex-1 space-y-3 overflow-y-auto rounded-[var(--tracer-radius-surface)] bg-slate-50 p-4 text-sm text-slate-900 dark:bg-slate-900/60 dark:text-slate-50"
                aria-live="polite"
            >
                <div
                    v-if="messages.length === 0"
                    class="text-sm text-slate-600 dark:text-slate-300"
                >
                    Ask a question about anything visible on this page.
                </div>

                <div
                    v-for="message in messages"
                    :key="message.id"
                    class="flex"
                    :class="
                        message.role === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                    "
                >
                    <div
                        class="max-w-[85%] rounded-[var(--tracer-radius-surface)] px-4 py-3 text-sm leading-relaxed"
                        :class="
                            message.role === 'assistant' && !message.content
                                ? ''
                                : message.role === 'user'
                                ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                                : 'border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50'
                        "
                    >
                        <LoadingSpinner
                            v-if="message.role === 'assistant' && !message.content"
                            label="Thinking…"
                            :show-label="false"
                        />
                        <LazyMarkdownRenderer
                            v-else-if="message.role === 'assistant'"
                            :markdown="message.content"
                            variant="compact"
                        />
                        <p v-else class="whitespace-pre-wrap break-words">
                            {{ message.content }}
                        </p>
                    </div>
                </div>
            </div>

            <div
                v-if="error"
                class="border-t border-red-100 bg-red-50 px-4 py-2.5 text-xs text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200"
            >
                {{ error }}
                <NuxtLink
                    v-if="missingModel"
                    to="/settings"
                    class="ml-1 font-medium underline"
                    @click="closePanel"
                    >Open Settings</NuxtLink
                >
            </div>

            <form
                class="border-t border-slate-200 p-4 dark:border-slate-800"
                @submit.prevent="sendMessage"
            >
                <div class="relative">
                    <UTextarea
                        ref="inputEl"
                        v-model="input"
                        :rows="2"
                        class="w-full"
                        placeholder="Ask about this page…"
                        aria-label="Chat message"
                        :disabled="busy"
                        @keydown="onInputKeydown"
                    />
                    <UButton color="primary" variant="solid"
                        type="submit"
                        aria-label="Send message"
                        class="tracer-icon-button absolute bottom-2 right-2"
                        :disabled="busy || !input.trim()"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
                    </UButton>
                </div>
            </form>
        </section>

        <button
            ref="triggerEl"
            type="button"
            class="tracer-chat-control fixed bottom-6 right-6 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
            :aria-expanded="panelOpen"
            aria-label="Chat with Tracer"
            @click="togglePanel"
        >
            <StudyModeArtwork name="chat" :size="18" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { isWebPreviewRuntime } from "~/src/composables/platform/web";
import type { ChatMessage } from "~/src/composables/ai/chat";
import { createChatRevealQueue } from "~/src/composables/ai/chat-reveal";
import { createSettingsRepo, useTracerDb } from "~/src/composables/db";
import { useFloatingChatPreference } from "~/src/composables/floating-chat";
import { hasTauriRuntime } from "~/src/composables/tauri";
import { normalizeAiError } from "~/src/composables/ai/ux-errors";

const builtinChatSessionId = crypto.randomUUID();

type FloatingMessage = ChatMessage & { id: string; fullContent?: string };

const route = useRoute();
const { floatingChatEnabled, floatingChatReady } = useFloatingChatPreference();
const panelOpen = ref(false);
const input = ref("");
const busy = ref(false);
const error = ref<string | null>(null);
const missingModel = ref(false);
const messages = ref<FloatingMessage[]>([]);
const panelEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);
const messagesEl = ref<HTMLElement | null>(null);
const inputEl = ref<{ textareaRef: HTMLTextAreaElement } | null>(null);
const activeRequest = shallowRef<AbortController | null>(null);
let messageSequence = 0;
let cachedModel: { id: string; model: any } | null = null;
let cachedModelPromise: { id: string; promise: Promise<any> } | null = null;
let defaultModelRequest: Promise<any> | null = null;

function nextMessageId() {
    messageSequence += 1;
    return `floating-chat-${messageSequence}`;
}

function closePanel() {
    panelOpen.value = false;
}

function clearChat() {
    const controller = activeRequest.value;
    activeRequest.value = null;
    controller?.abort();
    cancelAllReveals();
    messages.value = [];
    error.value = null;
    missingModel.value = false;
    busy.value = false;
    void nextTick(() => inputEl.value?.textareaRef?.focus());
}

function togglePanel() {
    panelOpen.value = !panelOpen.value;
    if (panelOpen.value) {
        void getDefaultModel().catch(() => {});
        void nextTick(() => inputEl.value?.textareaRef?.focus());
    }
}

function onDocumentPointerDown(event: PointerEvent) {
    if (!panelOpen.value) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (panelEl.value?.contains(target) || triggerEl.value?.contains(target))
        return;
    closePanel();
}

function onDocumentKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && panelOpen.value) closePanel();
}

function onInputKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    void sendMessage();
}

function pageContextSnapshot() {
    const main = document.querySelector("main");
    if (!main) return "";

    const sections = [main.innerText];
    const controls = Array.from(
        main.querySelectorAll<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >("input, textarea, select"),
    )
        .filter(
            (control) =>
                !(
                    control instanceof HTMLInputElement &&
                    control.type === "password"
                ),
        )
        .map((control) => {
            const label =
                control.getAttribute("aria-label") ||
                control.getAttribute("name") ||
                control.getAttribute("placeholder") ||
                control.tagName.toLowerCase();
            if (
                control instanceof HTMLInputElement &&
                (control.type === "checkbox" || control.type === "radio")
            ) {
                return `${label}: ${control.checked ? "selected" : "not selected"}`;
            }
            return control.value.trim()
                ? `${label}: ${control.value.trim()}`
                : "";
        })
        .filter(Boolean);

    if (controls.length)
        sections.push(`Current form values:\n${controls.join("\n")}`);
    return sections.filter(Boolean).join("\n\n");
}

function pageTitle() {
    return (
        document.querySelector("main h1")?.textContent?.trim() || document.title
    );
}

function scrollToLatestMessage() {
    if (!messagesEl.value) return;
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
}

function updateMessage(
    messageId: string,
    update: (message: FloatingMessage) => FloatingMessage,
) {
    const index = messages.value.findIndex(
        (message) => message.id === messageId,
    );
    if (index < 0) return false;
    const current = messages.value[index];
    if (!current) return false;
    messages.value = [
        ...messages.value.slice(0, index),
        update(current),
        ...messages.value.slice(index + 1),
    ];
    return true;
}

const {
    enqueue: enqueueReveal,
    finish: finishReveal,
    cancel: cancelReveal,
    cancelAll: cancelAllReveals,
} = createChatRevealQueue<FloatingMessage>({
    getMessage: (messageId) =>
        messages.value.find((message) => message.id === messageId),
    updateMessage,
    onReveal: () => void nextTick().then(scrollToLatestMessage),
});

async function loadDefaultModel() {
    if (isWebPreviewRuntime())
        throw new Error(
            "Choose a default AI model in Settings to use page chat.",
        );
    const db = await useTracerDb();
    const settings = await createSettingsRepo(db).get();
    if (!settings.defaultModelId) {
        missingModel.value = true;
        throw new Error(
            "Choose a default AI model in Settings to use page chat.",
        );
    }
    const route = [settings.defaultModelId, ...settings.fallbackModelIds];
    const cacheId = route.join("\n");
    if (cachedModel?.id === cacheId) return cachedModel.model;
    const existing = cachedModelPromise;
    const promise =
        existing?.id === cacheId
            ? existing.promise
            : import("~/src/composables/ai/registry")
                  .then(({ resolveAiModel }) => resolveAiModel(route))
                  .finally(() => {
                      if (cachedModelPromise?.id === cacheId) {
                          cachedModelPromise = null;
                      }
                  });
    if (existing?.id !== cacheId) cachedModelPromise = { id: cacheId, promise };
    const model = await promise;
    cachedModel = { id: cacheId, model };
    return model;
}

function getDefaultModel() {
    if (defaultModelRequest) return defaultModelRequest;
    const request = loadDefaultModel().finally(() => {
        if (defaultModelRequest === request) defaultModelRequest = null;
    });
    defaultModelRequest = request;
    return request;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text || busy.value) return;

    error.value = null;
    missingModel.value = false;
    input.value = "";
    const userMessage: FloatingMessage = {
        id: nextMessageId(),
        role: "user",
        content: text,
    };
    messages.value.push(userMessage);
    const assistantMessage: FloatingMessage = {
        id: nextMessageId(),
        role: "assistant",
        content: "",
        fullContent: "",
    };
    messages.value.push(assistantMessage);
    busy.value = true;
    await nextTick();
    scrollToLatestMessage();

    activeRequest.value?.abort();
    const controller = new AbortController();
    activeRequest.value = controller;

    try {
        const [model, chat] = await Promise.all([
            getDefaultModel(),
            import("~/src/composables/ai/chat"),
        ]);
        const system = chat.buildPageAwareChatSystemPrompt({
            route: route.fullPath,
            title: pageTitle(),
            context: pageContextSnapshot(),
        });
        const prior = chat.takeRecentChatMessages(
            messages.value.slice(0, -1).map((message) => ({
                role: message.role,
                content: message.fullContent ?? message.content,
            })),
        );
        const result = await chat.streamGroundedChatText({
            model,
            system,
            messages: prior,
            builtinContext: { route: route.fullPath, title: pageTitle(), context: pageContextSnapshot() },
            sessionId: builtinChatSessionId,
            abortSignal: controller.signal,
        });

        for await (const chunk of result.textStream) {
            enqueueReveal(assistantMessage.id, chunk);
        }
        finishReveal(assistantMessage.id);
    } catch (cause) {
        if (controller.signal.aborted) {
            cancelReveal(assistantMessage.id);
            return;
        }
        const partial = messages.value.find(message => message.id === assistantMessage.id)?.fullContent?.trim();
        if (partial) finishReveal(assistantMessage.id);
        else {
            cancelReveal(assistantMessage.id);
            messages.value = messages.value.filter(message => message.id !== assistantMessage.id);
        }
        error.value = `${partial ? 'Response interrupted. ' : ''}${normalizeAiError(cause).message}`;
    } finally {
        if (activeRequest.value === controller) activeRequest.value = null;
        if (!controller.signal.aborted) busy.value = false;
        await nextTick();
        scrollToLatestMessage();
    }
}

watch(floatingChatEnabled, (enabled) => {
    if (!enabled) closePanel();
});

onMounted(() => {
    document.addEventListener("pointerdown", onDocumentPointerDown);
    document.addEventListener("keydown", onDocumentKeydown);
});

onBeforeUnmount(() => {
    activeRequest.value?.abort();
    cancelAllReveals();
    document.removeEventListener("pointerdown", onDocumentPointerDown);
    document.removeEventListener("keydown", onDocumentKeydown);
});
</script>
