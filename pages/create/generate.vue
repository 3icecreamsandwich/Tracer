<template>
  <main>
    <AiErrorModal :open="aiErrorOpen" :error="aiError" from="/create/generate" @close="closeAiError" />
    <div
      v-if="parseFailureOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Some files could not be parsed"
      @keydown.esc="abortParseFailures"
    >
      <button
        type="button"
        class="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
        aria-label="Close parse failure modal"
        @click="abortParseFailures"
      />

      <div
        class="relative w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30"
      >
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Some files could not be parsed
          </h2>
          <p v-if="parseFailureCanContinue" class="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Tracer can continue with the files that were parsed successfully, or abort without generating.
          </p>
          <p v-else class="mt-1 text-sm text-slate-600 dark:text-slate-300">
            None of the selected files produced readable text. Generation was not started.
          </p>
        </div>

        <ul class="mt-4 max-h-64 space-y-2 overflow-auto rounded-md border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
          <li v-for="failure in parseFailures" :key="failure.id" class="grid gap-1">
            <span class="font-medium text-slate-900 dark:text-slate-50">{{ failure.filename }}</span>
            <span class="text-slate-600 dark:text-slate-300">{{ failure.reason }}</span>
          </li>
        </ul>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-if="parseFailureCanContinue"
            type="button"
            class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            :disabled="busy || parseBusy"
            @click="continueAfterParseFailures"
          >
            Continue with parsed files
          </button>

          <button
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
            @click="abortParseFailures"
          >
            {{ parseFailureCanContinue ? 'Abort' : 'Close' }}
          </button>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-3xl p-8">
      <div class="sticky top-16 z-20 flex items-start justify-between gap-4 rounded-md bg-white/95 py-2 backdrop-blur dark:bg-slate-950/95">
        <div>
          <h1 class="text-2xl font-semibold">Create · Generate</h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Upload PDFs or images to generate a flashcard set plus a linked study guide.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
          :disabled="generateDisabled"
          @click="onGenerate"
        >
          {{ generateButtonLabel }}
        </button>
      </div>

      <div
        v-if="isWebPreview"
        class="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
        role="status"
        aria-live="polite"
      >
        Generate requires the desktop app (Tauri) for vault + database access.
      </div>

      <div class="mt-6 space-y-6">
        <section
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          aria-label="Generate inputs"
        >
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium" for="gen-title">Title (optional)</label>
              <input
                id="gen-title"
                v-model="title"
                type="text"
                autocomplete="off"
                placeholder="Generated set…"
                class="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                :disabled="operationBusy || isWebPreview"
              />
            </div>

            <div>
              <label class="block text-sm font-medium" for="gen-instructions">Instructions (optional)</label>
              <textarea
                id="gen-instructions"
                v-model="instructions"
                rows="3"
                placeholder="e.g. Focus on key definitions and common exam questions"
                class="mt-1 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                :disabled="operationBusy || isWebPreview"
              />
            </div>

            <div>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-slate-900 dark:text-slate-50">Sources</p>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Limits: max {{ MAX_GENERATE_PDF_PAGES }} PDF pages total, max {{ MAX_GENERATE_IMAGES }} images.
                  </p>
                </div>

                <div class="shrink-0 flex flex-wrap gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                    :disabled="operationBusy || isWebPreview || ingestBusy"
                    @click="openPicker"
                  >
                    {{ ingestBusy ? 'Checking…' : 'Choose files' }}
                  </button>
                  <button
                    v-if="pickedAny"
                    type="button"
                    class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                    :disabled="operationBusy || isWebPreview || ingestBusy"
                    @click="clearPicked"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <input
                ref="fileInputEl"
                class="sr-only"
                type="file"
                multiple
                accept="application/pdf,image/*"
                @change="onPicked"
              />

              <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <div
                  class="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <p class="text-xs font-medium text-slate-500 dark:text-slate-400">PDF pages</p>
                  <p class="mt-1 font-medium">{{ totalPdfPages }}/{{ MAX_GENERATE_PDF_PAGES }}</p>
                </div>
                <div
                  class="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Images</p>
                  <p class="mt-1 font-medium">{{ pickedImages.length }}/{{ MAX_GENERATE_IMAGES }}</p>
                </div>
                <div
                  class="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Files</p>
                  <p class="mt-1 font-medium">{{ pickedCount }}</p>
                </div>
              </div>

              <p v-if="pickedAny" class="mt-4 text-sm text-slate-700 dark:text-slate-200">
                {{ pickedSummary }}
              </p>

              <p v-if="formError" class="mt-4 text-sm text-red-700 dark:text-red-300">
                {{ formError }}
              </p>
            </div>
          </div>
        </section>

        <section
          v-if="rawOutput"
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
          aria-label="AI output"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-sm font-medium text-slate-900 dark:text-slate-50">AI output</h2>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
                If parsing fails, copy the raw output and try again.
              </p>
            </div>

            <div class="shrink-0 flex flex-wrap gap-2">
              <button
                type="button"
                class="inline-flex items-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                :disabled="!rawOutput"
                @click="copyRaw"
              >
                Copy
              </button>
              <button
                type="button"
                class="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
                :disabled="!rawOutput"
                @click="selectAllRaw"
              >
                Select all
              </button>
            </div>
          </div>

          <p v-if="rawMessage" class="mt-3 text-sm text-slate-700 dark:text-slate-200">
            {{ rawMessage }}
          </p>

          <div class="mt-4">
            <label class="sr-only" for="gen-raw-output">Raw output</label>
            <textarea
              id="gen-raw-output"
              ref="rawTextareaEl"
              readonly
              rows="10"
              class="w-full resize-y rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-slate-950"
              :value="rawOutput"
              @focus="selectAllRaw"
            />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { lockGetStatus } from '~/src/composables/lock'
import {
  createProfileRepo,
  createSettingsRepo,
  createSetsRepo,
  createStudyGuidesRepo,
  useTracerDb,
  type Uuid
} from '~/src/composables/db'
import { useLockSession } from '~/src/composables/lock-session'
import { resolveAiModel } from '~/src/composables/ai/registry'
import { hasTauriRuntime } from '~/src/composables/tauri'
import { parseTermsDelimited, normalizeTerms } from '~/src/composables/db/validators'
import { generateText } from 'ai'
import { normalizeAiError, aiErrorForMissingDefaultModel, type AiErrorUx } from '~/src/composables/ai/ux-errors'
import { parseGenerateContractOutput } from '~/src/composables/ai/generate-contract'
import { normalizeGenerateRequestError } from '~/src/composables/ai/generate-request'
import {
  assertGenerateSourceLimits,
  buildGenerateTextPrompt,
  createGenerateParseDecision,
  extractGenerateSources,
  getPdfPageCount,
  MAX_GENERATE_IMAGES,
  MAX_GENERATE_PDF_PAGES,
  type ExtractedGenerateSource,
  type FailedGenerateSource,
  type GenerateSourceFile
} from '~/src/composables/generate/source-extraction'

const router = useRouter()
const { unlockedThisSession, markLocked, markUnlocked } = useLockSession()

const hasTauriInternals = hasTauriRuntime()

const isWebPreview = computed(() => !hasTauriInternals)

const title = ref('')
const instructions = ref('')

type PickedPdf = { id: string; kind: 'pdf'; file: File; pages: number }
type PickedImage = { id: string; kind: 'image'; file: File }

const pickedPdfs = ref<PickedPdf[]>([])
const pickedImages = ref<PickedImage[]>([])

const ingestBusy = ref(false)
const parseBusy = ref(false)
const busy = ref(false)
const formError = ref<string | null>(null)

const rawOutput = ref<string | null>(null)
const rawMessage = ref<string | null>(null)
const rawTextareaEl = ref<HTMLTextAreaElement | null>(null)
const fileInputEl = ref<HTMLInputElement | null>(null)

const aiError = ref<AiErrorUx | null>(null)
const aiErrorOpen = ref(false)

const parseFailureOpen = ref(false)
const parseFailures = ref<FailedGenerateSource[]>([])
const pendingExtractedSources = ref<ExtractedGenerateSource[]>([])
const parseFailureCanContinue = computed(() => parseFailures.value.length > 0 && pendingExtractedSources.value.length > 0)
type GenerateModelContext = { db: Awaited<ReturnType<typeof useTracerDb>>; model: any }
const pendingGenerateModelContext = shallowRef<Promise<GenerateModelContext | Error> | null>(null)

function showAiError(err: unknown) {
  aiError.value = normalizeAiError(err)
  aiErrorOpen.value = true
}

function closeAiError() {
  aiErrorOpen.value = false
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function toErrorMessage(err: unknown, fallback: string) {
  if (typeof err === 'string') return err
  if (err instanceof Error && typeof err.message === 'string') return err.message
  if (isRecord(err) && typeof err.message === 'string') return err.message
  return fallback
}

function selectAllRaw() {
  const el = rawTextareaEl.value
  if (!el) return
  el.focus()
  el.select()
}

async function copyRaw() {
  rawMessage.value = null
  const text = rawOutput.value
  if (!text) return

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      rawMessage.value = 'Copied to clipboard.'
      return
    }
  } catch {
  }

  selectAllRaw()
  rawMessage.value = 'Select the text and copy it manually.'
}

function sourceId() {
  return crypto.randomUUID()
}

function isPdfFile(file: File) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}

function isImageFile(file: File) {
  const name = file.name.toLowerCase()
  return file.type.startsWith('image/') || /\.(png|jpe?g|webp)$/.test(name)
}

const totalPdfPages = computed(() => pickedPdfs.value.reduce((sum, p) => sum + p.pages, 0))
const pickedCount = computed(() => pickedPdfs.value.length + pickedImages.value.length)
const pickedAny = computed(() => pickedCount.value > 0)

const pickedSummary = computed(() => {
  const pdfs = pickedPdfs.value.length
  const imgs = pickedImages.value.length
  const parts: string[] = []
  if (pdfs) parts.push(`${pdfs} PDF${pdfs === 1 ? '' : 's'}`)
  if (imgs) parts.push(`${imgs} image${imgs === 1 ? '' : 's'}`)
  return parts.length ? `Selected: ${parts.join(' · ')}` : ''
})

const operationBusy = computed(() => busy.value || parseBusy.value)

const generateButtonLabel = computed(() => {
  if (parseBusy.value) return 'Parsing…'
  if (busy.value) return 'Generating…'
  return 'Generate'
})

const generateDisabled = computed(() => {
  if (operationBusy.value || ingestBusy.value || isWebPreview.value) return true
  if (!pickedAny.value) return true
  if (totalPdfPages.value > MAX_GENERATE_PDF_PAGES) return true
  if (pickedImages.value.length > MAX_GENERATE_IMAGES) return true
  return false
})

function openPicker() {
  formError.value = null
  fileInputEl.value?.click()
}

function clearParseFailureState() {
  parseFailureOpen.value = false
  parseFailures.value = []
  pendingExtractedSources.value = []
  pendingGenerateModelContext.value = null
}

function clearPicked() {
  pickedPdfs.value = []
  pickedImages.value = []
  formError.value = null
  clearParseFailureState()
  if (fileInputEl.value) fileInputEl.value.value = ''
}

async function onPicked(e: Event) {
  formError.value = null
  const input = e.target
  if (!(input instanceof HTMLInputElement)) return
  const list = input.files
  if (!list) return

  const files = Array.from(list)
  input.value = ''
  if (files.length === 0) return

  ingestBusy.value = true
  try {
    const pdfFiles = files.filter(isPdfFile)
    const imageFiles = files.filter((f) => !isPdfFile(f) && isImageFile(f))

    const pdfs = await Promise.all(
      pdfFiles.map(async (f): Promise<PickedPdf> => ({
        id: sourceId(),
        kind: 'pdf',
        file: f,
        pages: await getPdfPageCount(f)
      }))
    )

    const nextPdfs = [...pickedPdfs.value, ...pdfs]
    const nextImages: PickedImage[] = [
      ...pickedImages.value,
      ...imageFiles.map((f) => ({ id: sourceId(), kind: 'image' as const, file: f }))
    ]

    const total = nextPdfs.reduce((sum, p) => sum + p.pages, 0)
    assertGenerateSourceLimits({ pdfPages: total, imageCount: nextImages.length })

    pickedPdfs.value = nextPdfs
    pickedImages.value = nextImages
  } catch (err) {
    formError.value = toErrorMessage(err, 'Failed to process selected files.')
  } finally {
    ingestBusy.value = false
  }
}

function generateTitleFromFiles() {
  const t = title.value.trim()
  if (t) return t
  const first = pickedPdfs.value[0]?.file?.name ?? pickedImages.value[0]?.file?.name
  if (first) return `Generated · ${first}`
  return 'Generated'
}

function selectedGenerateSources(): GenerateSourceFile[] {
  return [
    ...pickedPdfs.value.map((source) => ({ id: source.id, kind: 'pdf' as const, file: source.file })),
    ...pickedImages.value.map((source) => ({ id: source.id, kind: 'image' as const, file: source.file }))
  ]
}

async function prepareGenerateModelContext(): Promise<GenerateModelContext> {
  const db = await useTracerDb()
  const settings = await createSettingsRepo(db).get()
  if (!settings.defaultModelId) {
    throw new Error('Choose a Default AI Model to use Generate.')
  }
  const model = await resolveAiModel(settings.defaultModelId)
  return { db, model }
}

async function saveGeneratedOutput(
  sourceTexts: ExtractedGenerateSource[],
  modelContextPromise: Promise<GenerateModelContext | Error> = prepareGenerateModelContext()
) {
  busy.value = true
  try {
    const modelContext = await modelContextPromise
    if (modelContext instanceof Error) {
      throw modelContext
    }

    const { db, model } = modelContext
    if (!model) {
      aiError.value = aiErrorForMissingDefaultModel()
      aiErrorOpen.value = true
      return
    }

    const prompt = buildGenerateTextPrompt({
      instructions: instructions.value,
      sources: sourceTexts
    })

    const res = await generateText({
      model,
      prompt
    })

    rawOutput.value = res.text ?? ''
    const text = (res.text ?? '').trim()

    const parsed = parseGenerateContractOutput(text)
    let termInputs = parseTermsDelimited(parsed.flashcardsTsv, { delimiter: 'auto' })
    termInputs = termInputs.map((t) => ({
      front: t.front.split('\t').join(' ').trim(),
      back: t.back.split('\t').join(' ').trim()
    }))
    const terms = normalizeTerms(termInputs)

    const setId = crypto.randomUUID() as Uuid
    const setsRepo = createSetsRepo(db)
    await setsRepo.create({
      id: setId,
      title: generateTitleFromFiles(),
      description: null,
      terms
    })

    const guidesRepo = createStudyGuidesRepo(db)
    await guidesRepo.create({
      id: crypto.randomUUID() as Uuid,
      setId,
      markdown: parsed.studyGuideMarkdown
    })

    await router.replace(`/set/${setId}`)
  } catch (e: unknown) {
    showAiError(normalizeGenerateRequestError(e))
  } finally {
    busy.value = false
    await nextTick()
    if (rawOutput.value) rawTextareaEl.value?.focus()
  }

  return
}

function validateGenerateInput() {
  if (isWebPreview.value) {
    formError.value = 'Generate is not available in web preview.'
    return false
  }

  if (!pickedAny.value) {
    formError.value = 'Choose at least one PDF or image.'
    return false
  }

  if (totalPdfPages.value > MAX_GENERATE_PDF_PAGES) {
    formError.value = `PDF page limit exceeded. Max is ${MAX_GENERATE_PDF_PAGES} pages total; selected PDFs contain ${totalPdfPages.value} pages.`
    return false
  }

  if (pickedImages.value.length > MAX_GENERATE_IMAGES) {
    formError.value = `Too many images selected. Max is ${MAX_GENERATE_IMAGES}; you selected ${pickedImages.value.length}.`
    return false
  }

  return true
}

async function onGenerate() {
  formError.value = null
  rawMessage.value = null
  rawOutput.value = null
  aiError.value = null
  aiErrorOpen.value = false
  clearParseFailureState()

  if (operationBusy.value) return
  if (!validateGenerateInput()) return

  pendingGenerateModelContext.value = prepareGenerateModelContext().catch((err) =>
    err instanceof Error ? err : new Error(toErrorMessage(err, 'Failed to prepare AI model.'))
  )
  parseBusy.value = true
  try {
    const result = await extractGenerateSources(selectedGenerateSources())
    parseBusy.value = false
    const decision = createGenerateParseDecision(result)

    if (decision.action === 'generate') {
      await saveGeneratedOutput(decision.extracted, pendingGenerateModelContext.value)
      pendingGenerateModelContext.value = null
      return
    }

    if (decision.action === 'block') {
      pendingGenerateModelContext.value = null
    }

    parseFailures.value = decision.failed
    pendingExtractedSources.value = decision.extracted
    parseFailureOpen.value = true
  } catch (err) {
    formError.value = toErrorMessage(err, 'Failed to parse selected files.')
  } finally {
    parseBusy.value = false
  }
}

async function continueAfterParseFailures() {
  if (!parseFailureCanContinue.value || operationBusy.value) return
  const sources = [...pendingExtractedSources.value]
  const modelContext = pendingGenerateModelContext.value ?? prepareGenerateModelContext()
  clearParseFailureState()
  await saveGeneratedOutput(sources, modelContext)
}

function abortParseFailures() {
  if (operationBusy.value) return
  clearParseFailureState()
}

onMounted(async () => {
  try {
    if (isWebPreview.value) {
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

    if (settings.startupLockEnabled && status.requires_unlock) {
      if (!unlockedThisSession.value) {
        markLocked()
        await router.replace('/unlock')
        return
      }
    } else if (status.can_auto_unlock) {
      markUnlocked()
    }

    if (!settings.defaultModelId) {
      await router.replace({ path: '/settings', query: { reason: 'missing-default-model', from: '/create/generate' } })
      return
    }

    return
  } catch {
    markLocked()
    await router.replace('/unlock')
  }
})
</script>
