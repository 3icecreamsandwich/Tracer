import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createFlashcardRun, type FlashcardAnswer } from '../../src/composables/cards/flashcard-run'

function createRun(onAnswer = (_answer: FlashcardAnswer) => {}) {
  const state = {
    runCounter: ref(0),
    cursorIndex: ref(0),
    order: ref(['a', 'b']),
    lastOrder: ref<string[]>([]),
    answersByTermId: ref<Record<string, FlashcardAnswer>>({}),
    answerAttemptsCount: ref(0),
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
  it('restores saved correct cards and the saved cursor', () => {
    const { state, run } = createRun()
    run.startRun({ resumeTermId: 'b', resumeCorrectTermIds: ['a'] })
    expect(state.cursorIndex.value).toBe(1)
    expect(state.answersByTermId.value).toEqual({ a: 'correct' })
    expect(state.answerAttemptsCount.value).toBe(1)
  })

  it('uses the existing feedback timing before committing an answer', async () => {
    vi.useFakeTimers()
    const answered: FlashcardAnswer[] = []
    const { state, run } = createRun((answer) => answered.push(answer))
    run.markIncorrect()
    expect(state.answerFeedback.value).toBe('incorrect')

    vi.advanceTimersByTime(450)
    await Promise.resolve()
    vi.advanceTimersByTime(250)
    await Promise.resolve()
    expect(answered).toEqual(['incorrect'])
    expect(state.retryTermIds.value.has('a')).toBe(true)
    expect(state.order.value).toEqual(['a', 'b', 'a'])
    vi.useRealTimers()
  })
})
