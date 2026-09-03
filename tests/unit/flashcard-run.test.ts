import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createFlashcardRun, flashcardPassProgress, type FlashcardAnswer } from '../../src/composables/cards/flashcard-run'

function createRun(onAnswer = (_answer: FlashcardAnswer) => {}) {
  const state = {
    runCounter: ref(0),
    cursorIndex: ref(0),
    order: ref(['a', 'b']),
    lastOrder: ref<string[]>([]),
    answersByTermId: ref<Record<string, FlashcardAnswer>>({}),
    answerAttemptsCount: ref(0),
    correctAttemptsCount: ref(0),
    retryTermIds: ref(new Set<string>()),
    starredOnly: ref(false),
    isFlipped: ref(false),
    isNavigating: ref<'prev' | 'next' | null>(null),
    answerFeedback: ref<FlashcardAnswer | null>(null),
    answerBusy: ref(false),
    answerTransitionId: ref(0)
  }
  const run = createFlashcardRun({
    state,
    hasSet: () => true,
    getStudyTermIds: () => ['a', 'b'],
    getCurrentTermId: () => state.order.value[state.cursorIndex.value] ?? null,
    getBaseSeed: () => 42,
    getStarredStudyCount: () => 0,
    onAnswer,
    focusViewer: () => {}
  })
  return { state, run }
}

describe('flashcard run', () => {
  it('keeps pass progress tied to the frozen session order', () => {
    const order = ['a', 'b', 'c']
    expect(flashcardPassProgress(order, { a: 'correct' })).toEqual({ completed: 1, total: 3 })
    expect(flashcardPassProgress(order, { a: 'correct', b: 'correct' })).toEqual({ completed: 2, total: 3 })
  })

  it('restores saved correct cards and the saved cursor', () => {
    const { state, run } = createRun()
    run.startRun({ resumeTermId: 'b', resumeCorrectTermIds: ['a'] })
    expect(state.cursorIndex.value).toBe(1)
    expect(state.answersByTermId.value).toEqual({ a: 'correct' })
    expect(state.answerAttemptsCount.value).toBe(1)
  })

  it('starts a completed saved run again from the first card', () => {
    const { state, run } = createRun()

    run.startRun({ resumeTermId: 'b', resumeCorrectTermIds: ['a', 'b'] })

    expect(state.cursorIndex.value).toBe(0)
    expect(state.order.value).toEqual(['a', 'b'])
    expect(state.answersByTermId.value).toEqual({})
    expect(state.answerAttemptsCount.value).toBe(0)
    expect(state.correctAttemptsCount.value).toBe(0)
  })

  it('finishes a pass before resuming only missed cards', async () => {
    vi.useFakeTimers()
    const answered: FlashcardAnswer[] = []
    const { state, run } = createRun((answer) => answered.push(answer))
    run.markIncorrect()
    expect(state.answerFeedback.value).toBe('incorrect')

    await vi.advanceTimersByTimeAsync(700)
    expect(answered).toEqual(['incorrect'])
    expect(state.retryTermIds.value.has('a')).toBe(true)
    expect(state.order.value).toEqual(['a', 'b'])
    state.cursorIndex.value = 1
    run.markCorrect()
    await vi.advanceTimersByTimeAsync(700)
    run.resumeIncorrect()
    expect(state.order.value).toEqual(['a'])
    expect(state.answerAttemptsCount.value).toBe(2)
    vi.useRealTimers()
  })
})
