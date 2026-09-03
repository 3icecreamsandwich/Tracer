import type { Ref } from 'vue'
import type { Uuid } from '../db/types'
import { createRandomSeed, createSeededRandom, shuffleWith } from '../random'

export type FlashcardAnswer = 'correct' | 'incorrect'

export function flashcardPassProgress(
  order: Uuid[],
  answersByTermId: Record<Uuid, FlashcardAnswer>
) {
  return {
    completed: order.filter((id) => answersByTermId[id] !== undefined).length,
    total: order.length
  }
}

type FlashcardRunState = {
  runCounter: Ref<number>
  cursorIndex: Ref<number>
  order: Ref<Uuid[]>
  lastOrder: Ref<Uuid[]>
  answersByTermId: Ref<Record<Uuid, FlashcardAnswer>>
  answerAttemptsCount: Ref<number>
  correctAttemptsCount: Ref<number>
  retryTermIds: Ref<Set<Uuid>>
  starredOnly: Ref<boolean>
  isFlipped: Ref<boolean>
  isNavigating: Ref<'prev' | 'next' | null>
  answerFeedback: Ref<FlashcardAnswer | null>
  answerBusy: Ref<boolean>
  answerTransitionId: Ref<number>
}

type FlashcardRunOptions = {
  state: FlashcardRunState
  hasSet: () => boolean
  getStudyTermIds: () => Uuid[]
  getCurrentTermId: () => Uuid | null
  getBaseSeed: () => number | null
  getStarredStudyCount: () => number
  onAnswer: (answer: FlashcardAnswer, termId: Uuid) => void
  onRestart?: () => void
  focusViewer: () => void
}

export type StartFlashcardRunOptions = {
  resetCounter?: boolean
  resumeTermId?: Uuid | null
  resumeCorrectTermIds?: Uuid[]
}

export function createFlashcardRun(options: FlashcardRunOptions) {
  const state = options.state

  function cancelAnswerFeedback() {
    state.answerTransitionId.value += 1
    state.answerFeedback.value = null
    state.answerBusy.value = false
    state.isNavigating.value = null
  }

  function resetAnswers(ids: Uuid[]) {
    state.order.value = ids
    state.cursorIndex.value = 0
    state.answersByTermId.value = {}
    state.answerAttemptsCount.value = 0
    state.correctAttemptsCount.value = 0
    state.retryTermIds.value = new Set()
    state.isFlipped.value = false
  }

  function shuffleRun() {
    cancelAnswerFeedback()
    if (!options.hasSet()) return
    const ids = options.getStudyTermIds()
    if (ids.length <= 1) {
      resetAnswers(ids)
      return
    }

    const baseSeed = options.getBaseSeed()
    const seed = baseSeed !== null
      ? baseSeed + state.runCounter.value + 1
      : createRandomSeed()
    let nextOrder = shuffleWith(ids, createSeededRandom(seed))
    if (baseSeed === null) {
      const previous = state.lastOrder.value
      const unchanged = previous.length === nextOrder.length &&
        previous.every((value, index) => value === nextOrder[index])
      if (unchanged) nextOrder = [...nextOrder.slice(1), nextOrder[0]!]
    }

    state.lastOrder.value = nextOrder
    resetAnswers(nextOrder)
    options.focusViewer()
  }

  function startRun(runOptions?: StartFlashcardRunOptions) {
    cancelAnswerFeedback()
    if (!options.hasSet()) return
    if (runOptions?.resetCounter) state.runCounter.value = 0

    const ids = options.getStudyTermIds()
    state.lastOrder.value = ids
    state.order.value = ids
    const savedCorrectTermIds = (runOptions?.resumeCorrectTermIds ?? [])
      .filter((id) => ids.includes(id))
    const savedRunWasComplete = ids.length > 0 && savedCorrectTermIds.length === ids.length
    const resumeIndex = !savedRunWasComplete && runOptions?.resumeTermId
      ? ids.indexOf(runOptions.resumeTermId)
      : -1
    state.cursorIndex.value = resumeIndex >= 0 ? resumeIndex : 0
    const correctTermIds = savedRunWasComplete ? [] : savedCorrectTermIds
    state.answersByTermId.value = Object.fromEntries(
      correctTermIds.map((id) => [id, 'correct' as const])
    )
    state.answerAttemptsCount.value = correctTermIds.length
    state.correctAttemptsCount.value = correctTermIds.length
    state.retryTermIds.value = new Set()
    state.isFlipped.value = false
  }

  function restartRun() {
    state.runCounter.value += 1
    if (state.starredOnly.value && options.getStarredStudyCount() === 0) {
      state.starredOnly.value = false
    }
    startRun()
    options.onRestart?.()
    options.focusViewer()
  }

  function toggleStarredOnly() {
    if (!state.starredOnly.value && options.getStarredStudyCount() === 0) return
    state.starredOnly.value = !state.starredOnly.value
    restartRun()
  }

  function findNextUnattempted(fromIndex: number) {
    const ids = state.order.value
    if (ids.length === 0) return null
    for (let step = 0; step < ids.length; step += 1) {
      const index = (fromIndex + step) % ids.length
      const id = ids[index]
      if (id && state.answersByTermId.value[id] === undefined) return index
    }
    return null
  }

  function commitAnswer(answer: FlashcardAnswer) {
    const id = options.getCurrentTermId()
    if (!id) return
    state.answerAttemptsCount.value += 1
    if (answer === 'correct') state.correctAttemptsCount.value += 1
    options.onAnswer(answer, id)
    state.answersByTermId.value = {
      ...state.answersByTermId.value,
      [id]: answer
    }
    const retries = new Set(state.retryTermIds.value)
    if (answer === 'incorrect') {
      retries.add(id)
    } else {
      retries.delete(id)
    }
    state.retryTermIds.value = retries
    state.isFlipped.value = false
    const next = findNextUnattempted(state.cursorIndex.value + 1)
    if (next !== null) state.cursorIndex.value = next
  }

  function resumeIncorrect() {
    cancelAnswerFeedback()
    const ids = state.order.value.filter((id) => state.retryTermIds.value.has(id))
    state.order.value = ids
    state.lastOrder.value = ids
    state.cursorIndex.value = 0
    state.answersByTermId.value = {}
    state.retryTermIds.value = new Set()
    state.isFlipped.value = false
    options.focusViewer()
  }

  async function markAnswer(answer: FlashcardAnswer) {
    if (!options.getCurrentTermId() || state.answerBusy.value) return
    const transitionId = ++state.answerTransitionId.value
    state.answerFeedback.value = answer
    state.answerBusy.value = true
    state.isFlipped.value = false

    await new Promise<void>((resolve) => setTimeout(resolve, 450))
    if (transitionId !== state.answerTransitionId.value) return

    state.isNavigating.value = 'next'
    await new Promise<void>((resolve) => setTimeout(resolve, 250))
    if (transitionId !== state.answerTransitionId.value) return

    commitAnswer(answer)
    state.isNavigating.value = null
    state.answerFeedback.value = null
    state.answerBusy.value = false
  }

  return {
    shuffleRun,
    startRun,
    restartRun,
    resumeIncorrect,
    toggleStarredOnly,
    cancelFlashcardAnswerFeedback: cancelAnswerFeedback,
    markCorrect: () => void markAnswer('correct'),
    markIncorrect: () => void markAnswer('incorrect')
  }
}
