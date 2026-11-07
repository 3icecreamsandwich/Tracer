import { describe, expect, it } from 'vitest'
import { createPracticePresentation } from '../../src/composables/learn/presentation'

describe('practice presentation', () => {
  it('exposes the same correct and selected answer states', () => {
    const presentation = createPracticePresentation({
      getQuestion: () => ({ id: 'question', kind: 'multiple_choice' }),
      getChoiceFeedback: () => ({ questionId: 'question', selected: 1, correct: 2 }),
      getWrittenFeedback: () => null
    })

    expect(presentation.practiceMultipleChoiceClass(2)).toContain('border-emerald-600')
    expect(presentation.practiceMultipleChoiceClass(1)).toContain('border-red-700')
    expect(presentation.practiceMultipleChoiceClass(0)).toContain('border-slate-300')
  })

  it('gives true and false choices semantic tinting before an answer is submitted', () => {
    const presentation = createPracticePresentation({
      getQuestion: () => ({ id: 'question', kind: 'true_false' }),
      getChoiceFeedback: () => null,
      getWrittenFeedback: () => null
    })

    expect(presentation.practiceTrueFalseChoiceClass(true)).toContain('border-emerald-300')
    expect(presentation.practiceTrueFalseChoiceClass(true)).toContain('bg-emerald-50/70')
    expect(presentation.practiceTrueFalseChoiceClass(false)).toContain('border-red-300')
    expect(presentation.practiceTrueFalseChoiceClass(false)).toContain('bg-red-50/70')
  })

  it('exposes written-answer correctness on the question surface', () => {
    const presentation = createPracticePresentation({
      getQuestion: () => ({ id: 'written', kind: 'written' }),
      getChoiceFeedback: () => null,
      getWrittenFeedback: () => ({ questionId: 'written', isCorrect: true })
    })

    expect(presentation.practiceQuestionSurfaceClass()).toContain('border-emerald-600')
  })
})
