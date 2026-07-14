<template>
  <main>
    <AiErrorModal
      :open="factCheckAiErrorOpen"
      :error="factCheckAiError"
      :from="route.fullPath"
      :show-retry="true"
      @close="closeFactCheckAiError"
      @retry="retryFactCheck"
    />
    <div class="mx-auto max-w-3xl p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold">{{ t('common.edit') }} {{ t('home.setKind') }}</h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Update the title, description, and cards in this set.
          </p>
        </div>

        <div class="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy || factCheckBusy || !setId"
            @click="onFactCheck"
          >
            {{ factCheckBusy ? `${t('factCheck.title')}…` : t('factCheck.title') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-red-900/40 dark:bg-slate-950 dark:text-red-200 dark:hover:bg-red-950/40 dark:focus-visible:ring-red-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy || factCheckBusy || !setId"
            @click="openDelete"
          >
            {{ t('common.delete') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy || factCheckBusy || !setId"
            @click="onUpdate"
          >
            {{ busy ? t('common.loading') : t('common.update') }}
          </button>
        </div>
      </div>

      <p v-if="loadError" class="mt-6 text-sm text-red-700 dark:text-red-300">
        {{ loadError }}
      </p>

      <div v-else class="mt-6 space-y-4">
        <p
          v-if="isWebPreview"
          class="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100"
        >
          Edit preview is not saved in web preview. Use the desktop app to update local sets.
        </p>

        <div>
          <label class="block text-sm font-medium" for="set-title">{{ t('create.title') }}</label>
          <input
            id="set-title"
            ref="titleEl"
            v-model="title"
            type="text"
            autocomplete="off"
            class="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          />
        </div>

        <div>
          <label class="block text-sm font-medium" for="set-description">{{ t('create.description') }}</label>
          <textarea
            id="set-description"
            v-model="description"
            rows="2"
            class="mt-1 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          />
        </div>

        <FactCheckPanel
          :busy="factCheckBusy"
          :response="factCheckResponse"
        />

        <div class="pt-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ t('create.cards') }}</h2>
            <span class="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              {{ cards.length }}
            </span>
          </div>

          <p v-if="formError" class="mt-3 text-sm text-red-700 dark:text-red-300">
            {{ formError }}
          </p>

          <div class="mt-4 space-y-4">
            <div
              v-for="(card, idx) in cards"
              :key="card.key"
              class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
            >
              <div class="flex items-start justify-between gap-3">
                <p class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ t('create.card', { number: idx + 1 }) }}</p>
                <button
                  v-if="cards.length > 1"
                  type="button"
                  class="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                  :disabled="busy"
                  @click="removeCard(idx)"
                >
                  {{ t('common.remove') }}
                </button>
              </div>

              <div class="mt-3 space-y-3">
                <div>
                  <label class="block text-sm font-medium" :for="`term-${card.key}`">{{ t('create.term') }}</label>
                  <div class="mt-1 flex min-h-9 items-center gap-2">
                    <button
                      v-if="!card.frontImage"
                      type="button"
                      class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                      :disabled="busy"
                      :aria-label="`Add image to term for card ${idx + 1}`"
                      @click="openImagePicker(card.key, 'frontImage')"
                    >
                      {{ t('create.addImage') }}
                    </button>
                    <template v-else>
                      <p
                        class="truncate text-xs font-medium text-slate-600 dark:text-slate-300"
                        :title="card.frontImage.filename"
                      >
                        {{ card.frontImage.filename }}
                      </p>
                      <button
                        type="button"
                        class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="busy"
                        :aria-label="`Remove image from term for card ${idx + 1}`"
                        @click="removeImage(card.key, 'frontImage')"
                      >
                        x
                      </button>
                    </template>
                    <input
                      :id="imageInputId(card.key, 'frontImage')"
                      class="sr-only"
                      type="file"
                      :accept="imageAccept"
                      @change="onImagePicked($event, card.key, 'frontImage')"
                    />
                  </div>
                  <input
                    :id="`term-${card.key}`"
                    v-model="card.front"
                    type="text"
                    autocomplete="off"
                    class="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                    @keydown="onCardKeydown($event, idx)"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium" :for="`definition-${card.key}`">{{ t('create.definition') }}</label>
                  <div class="mt-1 flex min-h-9 items-center gap-2">
                    <button
                      v-if="!card.backImage"
                      type="button"
                      class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                      :disabled="busy"
                      :aria-label="`Add image to definition for card ${idx + 1}`"
                      @click="openImagePicker(card.key, 'backImage')"
                    >
                      {{ t('create.addImage') }}
                    </button>
                    <template v-else>
                      <p
                        class="truncate text-xs font-medium text-slate-600 dark:text-slate-300"
                        :title="card.backImage.filename"
                      >
                        {{ card.backImage.filename }}
                      </p>
                      <button
                        type="button"
                        class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                        :disabled="busy"
                        :aria-label="`Remove image from definition for card ${idx + 1}`"
                        @click="removeImage(card.key, 'backImage')"
                      >
                        x
                      </button>
                    </template>
                    <input
                      :id="imageInputId(card.key, 'backImage')"
                      class="sr-only"
                      type="file"
                      :accept="imageAccept"
                      @change="onImagePicked($event, card.key, 'backImage')"
                    />
                  </div>
                  <textarea
                    :id="`definition-${card.key}`"
                    v-model="card.back"
                    rows="2"
                    class="mt-2 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                    @keydown="onCardKeydown($event, idx)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
              :disabled="busy"
              @click="appendCardAndFocus(cards.length)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="deleteOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      :aria-label="t('common.delete')"
      @keydown.esc="closeDelete"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
        :aria-label="t('common.close')"
        @click="closeDelete"
      />

      <div class="relative w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
        <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ t('edit.deleteSet') }}</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          This removes the set, starred terms, and linked study guide from the local database.
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-red-600 dark:hover:bg-red-500 dark:focus-visible:ring-red-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy"
            @click="onDelete"
          >
            {{ t('common.delete') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy"
            @click="closeDelete"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
    </div>

    <DuplicateCardsDialog
      :open="duplicateReviewOpen"
      :issues="duplicateIssues"
      @cancel="closeDuplicateReview"
      @confirm="confirmDuplicateReview"
    />
  </main>
</template>

<script setup lang="ts">
import { lockGetStatus } from '~/src/composables/lock'
import { useLockSession } from '~/src/composables/lock-session'
import { createProfileRepo, createSettingsRepo, createSetsRepo, useTracerDb } from '~/src/composables/db'
import { normalizeTerms, type TermInput, TermsValidationError } from '~/src/composables/db/validators'
import type { FlashcardSet, TermImage, Uuid } from '~/src/composables/db/types'
import { hasTauriRuntime } from '~/src/composables/tauri'
import { useAppLanguage } from '~/src/composables/language'
import { createWebPreviewDemoSet } from '~/src/composables/demo-content'
import {
  findDuplicateCardIssues,
  type DuplicateCardIssue
} from '~/src/composables/cards/duplicates'
import { useFactCheck } from '~/src/composables/ai/use-fact-check'

type DraftCardRow = {
  key: string
  id?: Uuid
  front: string
  back: string
  frontImage?: TermImage | null
  backImage?: TermImage | null
}

type CardImageSide = 'frontImage' | 'backImage'

const route = useRoute()
const router = useRouter()
const { language, t } = useAppLanguage()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()
const isWebPreview = computed(() => !hasTauriRuntime())

const setId = computed<Uuid | null>(() => {
  const raw = route.params.id
  return typeof raw === 'string' && raw.trim() ? (raw as Uuid) : null
})

const title = ref('')
const description = ref('')
const cards = ref<DraftCardRow[]>([{ key: crypto.randomUUID(), front: '', back: '' }])
const imageAccept = 'image/png,image/jpeg,image/svg+xml,.png,.jpg,.jpeg,.svg'
const busy = ref(false)
const defaultModelId = ref<string | null>(null)
const loadError = ref<string | null>(null)
const formError = ref<string | null>(null)
const deleteOpen = ref(false)
const titleEl = ref<HTMLInputElement | null>(null)
const duplicateReviewOpen = ref(false)
const duplicateIssues = ref<DuplicateCardIssue[]>([])
let duplicateReviewContinuation: (() => void) | null = null

const {
  busy: factCheckBusy,
  response: factCheckResponse,
  aiError: factCheckAiError,
  aiErrorOpen: factCheckAiErrorOpen,
  run: runFactCheck,
  retry: retryFactCheck,
  closeAiError: closeFactCheckAiError
} = useFactCheck({ language, defaultModelId })

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function toErrorMessage(err: unknown, fallback: string) {
  if (typeof err === 'string') return err
  if (err instanceof Error && typeof err.message === 'string') return err.message
  if (isRecord(err) && typeof err.message === 'string') return err.message
  return fallback
}

async function onFactCheck() {
  await runFactCheck({
    title: title.value,
    description: description.value,
    cards: cards.value.map((card) => ({ front: card.front, back: card.back }))
  })
}

function setDraftFromSet(s: FlashcardSet) {
  title.value = s.title
  description.value = s.description ?? ''
  cards.value = s.terms.length
    ? s.terms.map((term) => ({
        key: crypto.randomUUID(),
        id: term.id as Uuid,
        front: term.front,
        back: term.back,
        frontImage: term.frontImage ?? null,
        backImage: term.backImage ?? null
      }))
    : [{ key: crypto.randomUUID(), front: '', back: '' }]
}

function appendBlankCard() {
  cards.value = [...cards.value, { key: crypto.randomUUID(), front: '', back: '' }]
}

async function appendCardAndFocus(nextIndex: number) {
  appendBlankCard()
  await nextTick()
  const next = cards.value[nextIndex]
  const el = next ? document.getElementById(`term-${next.key}`) : null
  if (el instanceof HTMLInputElement) el.focus()
}

function removeCard(index: number) {
  const next = cards.value.slice()
  next.splice(index, 1)
  cards.value = next.length ? next : [{ key: crypto.randomUUID(), front: '', back: '' }]
}

function ensureOneDraftCard() {
  if (cards.value.length > 0) return
  cards.value = [{ key: crypto.randomUUID(), front: '', back: '' }]
}

function currentDuplicateIssues() {
  return findDuplicateCardIssues(cards.value)
}

function requestDuplicateReview(continuation?: () => void) {
  const issues = currentDuplicateIssues()
  if (issues.length === 0) return false
  duplicateIssues.value = issues
  duplicateReviewContinuation = continuation ?? null
  duplicateReviewOpen.value = true
  return true
}

function closeDuplicateReview() {
  duplicateReviewOpen.value = false
  duplicateReviewContinuation = null
}

function confirmDuplicateReview(decisions: Record<string, 'keep' | 'remove'>) {
  const removeIndexes = new Set(
    duplicateIssues.value
      .filter((issue) => decisions[issue.id] === 'remove')
      .map((issue) => issue.cardIndex)
  )

  if (removeIndexes.size > 0) {
    cards.value = cards.value.filter((_, index) => !removeIndexes.has(index))
    ensureOneDraftCard()
  }

  const next = duplicateReviewContinuation
  duplicateReviewOpen.value = false
  duplicateReviewContinuation = null
  duplicateIssues.value = []
  next?.()
}

function imageInputId(cardKey: string, side: CardImageSide) {
  return `${side}-${cardKey}`
}

function openImagePicker(cardKey: string, side: CardImageSide) {
  formError.value = null
  const el = document.getElementById(imageInputId(cardKey, side))
  if (el instanceof HTMLInputElement) el.click()
}

function detectImageMimeType(file: File): string | null {
  const declared = file.type.toLowerCase()
  if (declared === 'image/jpg') return 'image/jpeg'
  if (declared === 'image/png' || declared === 'image/jpeg' || declared === 'image/svg+xml') {
    return declared
  }

  const name = file.name.toLowerCase()
  if (name.endsWith('.png')) return 'image/png'
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg'
  if (name.endsWith('.svg')) return 'image/svg+xml'
  return null
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  const chunkSize = 0x8000
  let binary = ''
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

async function fileToImageDataUrl(file: File, mimeType: string) {
  const buffer = await file.arrayBuffer()
  return `data:${mimeType};base64,${arrayBufferToBase64(buffer)}`
}

async function onImagePicked(e: Event, cardKey: string, side: CardImageSide) {
  formError.value = null
  const input = e.target
  if (!(input instanceof HTMLInputElement)) return
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  const mimeType = detectImageMimeType(file)
  if (!mimeType) {
    formError.value = 'Choose a PNG, JPEG, or SVG image.'
    return
  }

  try {
    const dataUrl = await fileToImageDataUrl(file, mimeType)
    const next = cards.value.slice()
    const index = next.findIndex((card) => card.key === cardKey)
    const card = next[index]
    if (!card) return
    next[index] = {
      ...card,
      [side]: {
        filename: file.name,
        mimeType,
        dataUrl
      }
    }
    cards.value = next
  } catch (err) {
    formError.value = toErrorMessage(err, 'Failed to add image.')
  }
}

function removeImage(cardKey: string, side: CardImageSide) {
  formError.value = null
  const next = cards.value.slice()
  const index = next.findIndex((card) => card.key === cardKey)
  const card = next[index]
  if (!card) return
  next[index] = { ...card, [side]: null }
  cards.value = next
}

function isCtrlOrMetaEnter(e: KeyboardEvent) {
  return e.key === 'Enter' && (e.metaKey || e.ctrlKey)
}

async function onCardKeydown(e: KeyboardEvent, index: number) {
  if (!isCtrlOrMetaEnter(e)) return
  e.preventDefault()
  await appendCardAndFocus(index + 1)
}

function validateInputs(): { title: string; description: string | null; termInputs: TermInput[] } {
  const t = title.value.trim()
  if (!t) throw new Error('Title is required.')

  const d = description.value.trim()
  const termInputs = cards.value
    .filter((c) => c.front.trim() || c.back.trim() || c.frontImage || c.backImage)
    .map((c) => ({
      id: c.id ?? null,
      front: c.front,
      back: c.back,
      frontImage: c.frontImage ?? null,
      backImage: c.backImage ?? null
    }))

  if (termInputs.length === 0) throw new Error('Add at least one card.')
  normalizeTerms(termInputs)

  return { title: t, description: d ? d : null, termInputs }
}

function notifySearchItemsChanged() {
  window.dispatchEvent(new CustomEvent('tracer:search-items-changed'))
}

function openDelete() {
  deleteOpen.value = true
}

function closeDelete() {
  if (busy.value) return
  deleteOpen.value = false
}

async function loadSet() {
  const id = setId.value
  if (!id) {
    loadError.value = 'Missing set id.'
    return
  }

  busy.value = true
  loadError.value = null
  try {
    const db = await useTracerDb()
    const set = await createSetsRepo(db).get(id)
    if (!set) {
      loadError.value = 'Set not found.'
      return
    }
    setDraftFromSet(set)
    await nextTick()
    titleEl.value?.focus()
  } catch (err) {
    loadError.value = toErrorMessage(err, 'Failed to load set.')
  } finally {
    busy.value = false
  }
}

async function initWebDemoSet() {
  const id = setId.value ?? ('demo' as Uuid)
  setDraftFromSet(createWebPreviewDemoSet(t, {
    id,
    descriptionKey: 'demo.editDescription'
  }))
  loadError.value = null
  busy.value = false
  await nextTick()
  titleEl.value?.focus()
}

watch(language, async () => {
  if (!isWebPreview.value) return;
  await initWebDemoSet()
})

async function onUpdate(skipDuplicateReview = false) {
  formError.value = null
  const id = setId.value
  if (!id || busy.value) return

  try {
    const validated = validateInputs()
    if (!skipDuplicateReview && requestDuplicateReview(() => void onUpdate(true))) return
    busy.value = true
    const terms = normalizeTerms(validated.termInputs)
    if (isWebPreview.value) {
      notifySearchItemsChanged()
      await router.replace(`/set/${id}`)
      return
    }

    const db = await useTracerDb()
    await createSetsRepo(db).update({
      id,
      title: validated.title,
      description: validated.description,
      terms
    })
    notifySearchItemsChanged()
    await router.replace(`/set/${id}`)
  } catch (err) {
    formError.value =
      err instanceof TermsValidationError
        ? err.message
        : toErrorMessage(err, 'Failed to update set.')
  } finally {
    busy.value = false
  }
}

async function onDelete() {
  const id = setId.value
  if (!id || busy.value) return

  formError.value = null
  busy.value = true
  try {
    if (isWebPreview.value) {
      notifySearchItemsChanged()
      await router.replace('/')
      return
    }

    const db = await useTracerDb()
    await createSetsRepo(db).delete(id)
    notifySearchItemsChanged()
    await router.replace('/')
  } catch (err) {
    formError.value = toErrorMessage(err, 'Failed to delete set.')
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  try {
    if (isWebPreview.value) {
      await initWebDemoSet()
      return
    }

    const status = await lockGetStatus()
    const db = await useTracerDb()

    const profile = await createProfileRepo(db).get()
    if (!profile || !status.has_verifier) {
      markLocked()
      await router.replace('/first-run')
      return
    }

    const settings = await createSettingsRepo(db).get()
    defaultModelId.value = settings.defaultModelId
    if (settings.startupLockEnabled && status.requires_unlock) {
      if (!unlockedThisSession.value) {
        markLocked()
        await router.replace('/unlock')
        return
      }
    } else if (status.can_auto_unlock) {
      markUnlocked()
    }

    await loadSet()
  } catch (err) {
    busy.value = false
    loadError.value = toErrorMessage(err, 'Failed to open edit page.')
  }
})
</script>
