import { onScopeDispose, ref, shallowRef, type Ref } from 'vue'
import type { AppLanguage } from '../db/types'
import { hasTauriRuntime } from '../tauri'
import { resolveAiModel } from './registry'
import { aiErrorForMissingDefaultModel, normalizeAiError, type AiErrorUx } from './ux-errors'
import { takeNextChatRevealUnit } from './chat-reveal-unit'
import {
  buildFactCheckSystemPrompt,
  buildFactCheckUserPrompt,
  factCheckNoSuggestionsText,
  streamFactCheckText,
  streamWebPreviewMockFactCheckAnswer,
  type FactCheckDraft
} from './fact-check'

const revealIntervalMs = 18

export function useFactCheck(args: {
  language: Readonly<Ref<AppLanguage>>
  defaultModelId: Ref<string | null>
  fallbackModelIds: Ref<string[]>
}) {
  const busy = ref(false)
  const response = ref('')
  const aiError = ref<AiErrorUx | null>(null)
  const aiErrorOpen = ref(false)
  const abortController = shallowRef<AbortController | null>(null)
  const cachedModel = shallowRef<{ id: string; model: any } | null>(null)
  const lastDraft = shallowRef<FactCheckDraft | null>(null)

  let pending = ''
  let streamComplete = false
  let revealTimer: number | null = null

  function stopRevealTimer() {
    if (revealTimer !== null) window.clearInterval(revealTimer)
    revealTimer = null
  }

  function revealNextUnit() {
    const next = takeNextChatRevealUnit(pending, streamComplete)
    if (!next) return false
    response.value += next.unit
    pending = next.pending
    return true
  }

  function startRevealTimer() {
    if (revealTimer !== null) return
    revealTimer = window.setInterval(() => {
      revealNextUnit()
      if (!pending && streamComplete) stopRevealTimer()
    }, revealIntervalMs)
  }

  function enqueueReveal(chunk: string) {
    if (!chunk) return
    pending += chunk
    if (!response.value) revealNextUnit()
    startRevealTimer()
  }

  function finishReveal() {
    streamComplete = true
    if (!pending) {
      stopRevealTimer()
      return
    }
    startRevealTimer()
  }

  function resetReveal() {
    stopRevealTimer()
    pending = ''
    streamComplete = false
  }

  async function getModel(modelId: string) {
    const route = [modelId, ...args.fallbackModelIds.value]
    const cacheId = route.join('\n')
    if (cachedModel.value?.id === cacheId) return cachedModel.value.model
    const model = await resolveAiModel(route)
    cachedModel.value = { id: cacheId, model }
    return model
  }

  function closeAiError() {
    aiErrorOpen.value = false
  }

  async function run(draft: FactCheckDraft) {
    if (busy.value) return

    abortController.value?.abort()
    resetReveal()
    response.value = ''
    aiError.value = null
    aiErrorOpen.value = false
    lastDraft.value = structuredClone(draft)

    const controller = new AbortController()
    abortController.value = controller
    busy.value = true

    try {
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.onLine === 'boolean' &&
        navigator.onLine === false
      ) {
        throw new Error('Failed to fetch')
      }

      if (!hasTauriRuntime()) {
        for await (const chunk of streamWebPreviewMockFactCheckAnswer({
          language: args.language.value,
          abortSignal: controller.signal
        })) {
          enqueueReveal(chunk)
        }
        finishReveal()
        return
      }

      const modelId = args.defaultModelId.value
      if (!modelId) {
        aiError.value = aiErrorForMissingDefaultModel()
        aiErrorOpen.value = true
        return
      }

      const result = streamFactCheckText({
        model: await getModel(modelId),
        system: buildFactCheckSystemPrompt(args.language.value),
        prompt: buildFactCheckUserPrompt(draft, args.language.value),
        abortSignal: controller.signal
      })

      for await (const chunk of result.textStream) enqueueReveal(chunk)

      if (!response.value && !pending) {
        enqueueReveal(factCheckNoSuggestionsText(args.language.value))
      }
      finishReveal()
    } catch (error) {
      if (controller.signal.aborted) return
      resetReveal()
      response.value = ''
      aiError.value = normalizeAiError(error)
      aiErrorOpen.value = true
    } finally {
      if (abortController.value === controller) abortController.value = null
      if (!controller.signal.aborted) busy.value = false
    }
  }

  async function retry() {
    closeAiError()
    if (lastDraft.value) await run(lastDraft.value)
  }

  onScopeDispose(() => {
    abortController.value?.abort()
    resetReveal()
  })

  return {
    busy,
    response,
    aiError,
    aiErrorOpen,
    run,
    retry,
    closeAiError
  }
}
