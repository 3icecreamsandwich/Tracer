<template>
  <div v-if="floatingChatReady && floatingChatEnabled" data-page-chat-root>
    <section
      v-if="panelOpen"
      ref="panelEl"
      class="fixed bottom-24 right-6 z-[70] flex h-[min(34rem,calc(100vh-8rem))] w-[min(26rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-900/15 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40"
      role="dialog"
      aria-label="Chat with Tracer"
    >
      <header class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <div class="flex min-w-0 items-center gap-2.5">
          <img :src="chatIconUrl" alt="" class="h-7 w-7 object-contain" aria-hidden="true" />
          <h2 class="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">Chat with Tracer</h2>
        </div>
        <button
          type="button"
          class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
          aria-label="Close chat"
          @click="closePanel"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
          </svg>
        </button>
      </header>

      <div ref="messagesEl" class="m-3 min-h-0 flex-1 space-y-3 overflow-y-auto rounded-md border border-amber-200 bg-amber-50/20 p-3 text-sm text-slate-900 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/10 dark:text-slate-50" aria-live="polite">
        <div v-if="messages.length === 0" class="text-sm text-slate-600 dark:text-slate-300">
          Ask a question about anything visible on this page.
        </div>

        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[85%] rounded-lg border px-3 py-2 text-sm shadow-sm"
            :class="message.role === 'user'
              ? 'border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50'
              : 'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50'"
          >
            <MarkdownRenderer v-if="message.role === 'assistant'" :markdown="message.content || 'Thinking…'" variant="compact" />
            <p v-else class="whitespace-pre-wrap break-words">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <div v-if="error" class="border-t border-red-100 bg-red-50 px-4 py-2.5 text-xs text-red-700 dark:border-red-950 dark:bg-red-950/40 dark:text-red-200">
        {{ error }}
        <NuxtLink v-if="missingModel" to="/settings" class="ml-1 font-medium underline" @click="closePanel">Open Settings</NuxtLink>
      </div>

      <form class="border-t border-slate-200 p-3 dark:border-slate-800" @submit.prevent="sendMessage">
        <div class="flex items-end gap-2">
          <textarea
            ref="inputEl"
            v-model="input"
            rows="2"
            class="max-h-28 min-h-11 flex-1 resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            placeholder="Ask about this page…"
            aria-label="Chat message"
            :disabled="busy"
            @keydown="onInputKeydown"
          />
          <button
            type="submit"
            class="inline-flex h-11 shrink-0 items-center justify-center rounded-md border border-amber-500 bg-amber-400 px-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy || !input.trim()"
          >
            Send
          </button>
        </div>
        <p class="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">Enter to send · Shift+Enter for a new line</p>
      </form>
    </section>

    <button
      ref="triggerEl"
      type="button"
      class="fixed bottom-6 right-6 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-amber-300 bg-amber-50 shadow-lg shadow-slate-900/15 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:border-amber-800 dark:bg-amber-950 dark:hover:bg-amber-900 dark:focus-visible:ring-offset-slate-950"
      :aria-expanded="panelOpen"
      aria-label="Chat with Tracer"
      @click="togglePanel"
    >
      <img :src="chatIconUrl" alt="" class="h-7 w-7 object-contain" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import chatIconUrl from '~/assets/icons/study-modes/chat.png'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'
import { resolveAiModel } from '~/src/composables/ai/registry'
import {
  buildPageAwareChatSystemPrompt,
  streamGroundedChatText,
  takeRecentChatMessages,
  type ChatMessage
} from '~/src/composables/ai/chat'
import { createSettingsRepo, useTracerDb } from '~/src/composables/db'
import { useFloatingChatPreference } from '~/src/composables/floating-chat'
import { hasTauriRuntime } from '~/src/composables/tauri'

type FloatingMessage = ChatMessage & { id: string }

const route = useRoute()
const { floatingChatEnabled, floatingChatReady } = useFloatingChatPreference()
const panelOpen = ref(false)
const input = ref('')
const busy = ref(false)
const error = ref<string | null>(null)
const missingModel = ref(false)
const messages = ref<FloatingMessage[]>([])
const panelEl = ref<HTMLElement | null>(null)
const triggerEl = ref<HTMLElement | null>(null)
const messagesEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)
const activeRequest = shallowRef<AbortController | null>(null)
let messageSequence = 0
let cachedModel: { id: string; model: any } | null = null

function nextMessageId() {
  messageSequence += 1
  return `floating-chat-${messageSequence}`
}

function closePanel() {
  panelOpen.value = false
}

function togglePanel() {
  panelOpen.value = !panelOpen.value
  if (panelOpen.value) void nextTick(() => inputEl.value?.focus())
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!panelOpen.value) return
  const target = event.target
  if (!(target instanceof Node)) return
  if (panelEl.value?.contains(target) || triggerEl.value?.contains(target)) return
  closePanel()
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && panelOpen.value) closePanel()
}

function onInputKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' || event.shiftKey) return
  event.preventDefault()
  void sendMessage()
}

function pageContextSnapshot() {
  const main = document.querySelector('main')
  if (!main) return ''

  const sections = [main.innerText]
  const controls = Array.from(main.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select'))
    .filter((control) => !(control instanceof HTMLInputElement && control.type === 'password'))
    .map((control) => {
      const label = control.getAttribute('aria-label') || control.getAttribute('name') || control.getAttribute('placeholder') || control.tagName.toLowerCase()
      if (control instanceof HTMLInputElement && (control.type === 'checkbox' || control.type === 'radio')) {
        return `${label}: ${control.checked ? 'selected' : 'not selected'}`
      }
      return control.value.trim() ? `${label}: ${control.value.trim()}` : ''
    })
    .filter(Boolean)

  if (controls.length) sections.push(`Current form values:\n${controls.join('\n')}`)
  return sections.filter(Boolean).join('\n\n')
}

function pageTitle() {
  return document.querySelector('main h1')?.textContent?.trim() || document.title
}

function scrollToLatestMessage() {
  if (!messagesEl.value) return
  messagesEl.value.scrollTop = messagesEl.value.scrollHeight
}

async function getDefaultModel() {
  if (!hasTauriRuntime()) throw new Error('Choose a default AI model in Settings to use page chat.')
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).get()
  if (!settings.defaultModelId) {
    missingModel.value = true
    throw new Error('Choose a default AI model in Settings to use page chat.')
  }
  if (cachedModel?.id === settings.defaultModelId) return cachedModel.model
  const model = await resolveAiModel(settings.defaultModelId)
  cachedModel = { id: settings.defaultModelId, model }
  return model
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text || busy.value) return

  error.value = null
  missingModel.value = false
  input.value = ''
  const userMessage: FloatingMessage = { id: nextMessageId(), role: 'user', content: text }
  messages.value.push(userMessage)
  const assistantMessage: FloatingMessage = { id: nextMessageId(), role: 'assistant', content: '' }
  messages.value.push(assistantMessage)
  busy.value = true
  await nextTick()
  scrollToLatestMessage()

  activeRequest.value?.abort()
  const controller = new AbortController()
  activeRequest.value = controller

  try {
    const model = await getDefaultModel()
    const system = buildPageAwareChatSystemPrompt({
      route: route.fullPath,
      title: pageTitle(),
      context: pageContextSnapshot()
    })
    const prior = takeRecentChatMessages(messages.value.slice(0, -1))
    const result = streamGroundedChatText({
      model,
      system,
      messages: prior,
      abortSignal: controller.signal
    })

    for await (const chunk of result.textStream) {
      assistantMessage.content += chunk
      await nextTick()
      scrollToLatestMessage()
    }
  } catch (cause) {
    if (controller.signal.aborted) return
    messages.value = messages.value.filter((message) => message.id !== assistantMessage.id)
    error.value = cause instanceof Error ? cause.message : 'Failed to send message.'
  } finally {
    if (activeRequest.value === controller) activeRequest.value = null
    if (!controller.signal.aborted) busy.value = false
    await nextTick()
    scrollToLatestMessage()
  }
}

watch(floatingChatEnabled, (enabled) => {
  if (!enabled) closePanel()
})

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  activeRequest.value?.abort()
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>
