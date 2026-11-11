import { describe, expect, it } from 'vitest'
import { createPracticePresentation, practiceQuestionPrompt } from '../../src/composables/learn/presentation'

describe('practice presentation', () => {
  it('displays only the term for saved multiple-choice prompts', () => {
    expect(practiceQuestionPrompt({ kind: 'multiple_choice', prompt: 'What is the definition of "Triadic Colors"?' })).toBe('Triadic Colors')
    expect(practiceQuestionPrompt({ kind: 'multiple_choice', prompt: 'Triadic Colors' })).toBe('Triadic Colors')
    expect(practiceQuestionPrompt({ kind: 'written', prompt: 'Write the definition of "Triadic Colors".' })).toBe('Write the definition of "Triadic Colors".')
  })
  it('exposes the same correct and selected answer states', () => {
    const presentation = createPracticePresentation({
      getQuestion: () => ({ id: 'question', kind: 'multiple_choice' }),
      getChoiceFeedback: () => ({ questionId: 'question', selected: 1, correct: 2 }),
      getWrittenFeedback: () => null
    })

    expect(presentation.practiceMultipleChoiceClass(2).join(' ')).toContain('border-dashed')
    expect(presentation.practiceMultipleChoiceClass(1).join(' ')).toContain('border-orange-600')
    expect(presentation.practiceMultipleChoiceClass(0).join(' ')).toContain('border-slate-300')
  })

  it('tints true and false choices before an answer is submitted', () => {
    const presentation = createPracticePresentation({
      getQuestion: () => ({ id: 'question', kind: 'true_false' }),
      getChoiceFeedback: () => null,
      getWrittenFeedback: () => null
    })

    expect(presentation.practiceTrueFalseChoiceClass(true).join(' ')).toContain('bg-emerald-100')
    expect(presentation.practiceTrueFalseChoiceClass(false).join(' ')).toContain('bg-orange-100')
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
