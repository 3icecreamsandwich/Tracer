<template>
  <main>
    <div class="mx-auto max-w-3xl p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold">{{ t('create.basicTitle') }}</h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {{ t('create.basicDescription') }}
          </p>
        </div>

        <div class="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy"
            @click="openImport"
          >
            {{ t('common.import') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy"
            @click="onCreate"
          >
            {{ busy ? t('common.loading') : t('common.create') }}
          </button>
        </div>
      </div>

      <div class="mt-6 space-y-4">
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
      </div>

      <div class="mt-8 space-y-4">
        <h2 class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ t('create.cards') }}</h2>

        <p v-if="formError" class="text-sm text-red-700 dark:text-red-300">
          {{ formError }}
        </p>

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
                <p
                  v-else
                  class="truncate text-xs font-medium text-slate-600 dark:text-slate-300"
                  :title="card.frontImage.filename"
                >
                  {{ card.frontImage.filename }}
                </p>
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
                <p
                  v-else
                  class="truncate text-xs font-medium text-slate-600 dark:text-slate-300"
                  :title="card.backImage.filename"
                >
                  {{ card.backImage.filename }}
                </p>
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

        <div class="pt-2">
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

    <div
      v-if="isImportOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      :aria-label="`${t('common.import')} ${t('create.cards')}`"
      @keydown.esc="closeImport"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
        :aria-label="t('common.close')"
        @click="closeImport"
      />

      <div class="relative w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ t('common.import') }}</h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
              CSV · TSV · {{ t('create.cards') }}
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            @click="closeImport"
          >
            {{ t('common.close') }}
          </button>
        </div>

        <div class="mt-4">
          <label class="sr-only" for="import-cards">{{ t('create.cards') }} · {{ t('common.import') }}</label>
          <textarea
            id="import-cards"
            ref="importTextareaEl"
            v-model="importText"
            rows="10"
            class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          />
        </div>

        <p v-if="importError" class="mt-3 text-sm text-red-700 dark:text-red-300">
          {{ importError }}
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy || !importText.trim()"
            @click="importFromText"
          >
            {{ t('common.import') }} {{ t('create.cards') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy"
            @click="openImportFilePicker"
          >
            {{ t('common.add') }} {{ t('create.files') }}
          </button>
        </div>

        <input
          ref="importFileInputEl"
          class="sr-only"
          type="file"
          accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values,text/plain"
          @change="onImportFilePicked"
        />
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
import { useAppLanguage } from '~/src/composables/language'
import { normalizeTerms, parseTermsDelimited, type TermInput, TermsValidationError } from '~/src/composables/db/validators'
import type { TermImage } from '~/src/composables/db/types'
import {
  findDuplicateCardIssues,
  type DuplicateCardIssue
} from '~/src/composables/cards/duplicates'

const { t } = useAppLanguage()

type DraftCardRow = {
  key: string
  front: string
  back: string
  frontImage?: TermImage | null
  backImage?: TermImage | null
}

type CardImageSide = 'frontImage' | 'backImage'

const router = useRouter()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()

const title = ref('')
const description = ref('')
const cards = ref<DraftCardRow[]>([{ key: crypto.randomUUID(), front: '', back: '' }])
const imageAccept = 'image/png,image/jpeg,image/svg+xml,.png,.jpg,.jpeg,.svg'

const busy = ref(false)
const formError = ref<string | null>(null)
const isImportOpen = ref(false)
const importText = ref('')
const importError = ref<string | null>(null)
const duplicateReviewOpen = ref(false)
const duplicateIssues = ref<DuplicateCardIssue[]>([])
let duplicateReviewContinuation: (() => void) | null = null

const titleEl = ref<HTMLInputElement | null>(null)
const importTextareaEl = ref<HTMLTextAreaElement | null>(null)
const importFileInputEl = ref<HTMLInputElement | null>(null)

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function toErrorMessage(err: unknown, fallback: string) {
  if (typeof err === 'string') return err
  if (err instanceof Error && typeof err.message === 'string') return err.message
  if (isRecord(err) && typeof err.message === 'string') return err.message
  return fallback
}

function appendBlankCard() {
  cards.value = [...cards.value, { key: crypto.randomUUID(), front: '', back: '' }]
}

async function appendCardAndFocus(nextIndex: number) {
  appendBlankCard()
  await nextTick()
  const next = cards.value[nextIndex]
  const el = document.getElementById(`term-${next.key}`)
  if (el instanceof HTMLInputElement) el.focus()
}

function removeCard(index: number) {
  const next = cards.value.slice()
  next.splice(index, 1)
  cards.value = next.length ? next : [{ key: crypto.randomUUID(), front: '', back: '' }]
}

function appendImportedCards(termInputs: TermInput[]) {
  const existingCards = cards.value.filter(
    (card) => card.front.trim() || card.back.trim() || card.frontImage || card.backImage
  )
  cards.value = [
    ...existingCards,
    ...termInputs.map((term) => ({
      key: crypto.randomUUID(),
      front: term.front,
      back: term.back,
      frontImage: term.frontImage ?? null,
      backImage: term.backImage ?? null
    }))
  ]
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

function openImport() {
  importError.value = null
  isImportOpen.value = true
  nextTick(() => importTextareaEl.value?.focus())
}

function closeImport() {
  isImportOpen.value = false
  importError.value = null
}

function openImportFilePicker() {
  importError.value = null
  importFileInputEl.value?.click()
}

function importCardsFromRawText(raw: string) {
  const rows = parseTermsDelimited(raw, { delimiter: 'auto' })
  appendImportedCards(rows)
  importText.value = ''
  closeImport()
  requestDuplicateReview()
}

function importFromText() {
  importError.value = null
  try {
    importCardsFromRawText(importText.value)
  } catch (e) {
    importError.value = toErrorMessage(e, 'Failed to import cards.')
  }
}

async function onImportFilePicked(e: Event) {
  importError.value = null
  const input = e.target
  if (!(input instanceof HTMLInputElement)) return
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  try {
    const text = await file.text()
    importCardsFromRawText(text)
  } catch (err) {
    importError.value = toErrorMessage(err, 'Failed to import file.')
  }
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
  if (!t) {
    throw new Error('Title is required.')
  }

  const d = description.value.trim()
  const desc = d ? d : null

  const termInputs: TermInput[] = cards.value
    .filter((c) => c.front.trim() || c.back.trim() || c.frontImage || c.backImage)
    .map((c) => ({
      front: c.front,
      back: c.back,
      frontImage: c.frontImage ?? null,
      backImage: c.backImage ?? null
    }))

  if (termInputs.length === 0) {
    throw new Error('Add at least one card.')
  }

  // Normalize trims + validates non-empty + assigns ids.
  // We still keep the original drafts; normalized terms are for persistence.
  normalizeTerms(termInputs)

  return { title: t, description: desc, termInputs }
}

async function onCreate(skipDuplicateReview = false) {
  formError.value = null
  if (busy.value) return
  try {
    const { title: t, description: desc, termInputs } = validateInputs()
    if (!skipDuplicateReview && requestDuplicateReview(() => void onCreate(true))) return
    busy.value = true
    const terms = normalizeTerms(termInputs)
    const db = await useTracerDb()
    const repo = createSetsRepo(db)
    const id = crypto.randomUUID()
    await repo.create({ id, title: t, description: desc, terms })
    await router.replace(`/set/${id}`)
  } catch (e: unknown) {
    if (e instanceof TermsValidationError) {
      formError.value = e.message
    } else {
      formError.value = toErrorMessage(e, 'Failed to create set.')
    }
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  // Preserve the startup lock gate pattern used by other pages.
  try {
    const status = await lockGetStatus()
    const db = await useTracerDb()

    const profile = await createProfileRepo(db).get()
    if (!profile || !status.has_verifier) {
      markLocked()
      await router.replace('/first-run')
      return
    }

    const settings = await createSettingsRepo(db).get()
    if (settings.startupLockEnabled && status.requires_unlock) {
      if (!unlockedThisSession.value) {
        markLocked()
        await router.replace('/unlock')
        return
      }
      await nextTick()
      titleEl.value?.focus()
      return
    }

    if (status.can_auto_unlock) {
      markUnlocked()
    }

    await nextTick()
    titleEl.value?.focus()
  } catch {
    markLocked()
    await router.replace('/unlock')
  }
})
</script>
