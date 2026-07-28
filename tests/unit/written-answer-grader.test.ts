import { describe, expect, it } from 'vitest'
import {
  buildWrittenAnswerGradingPrompt,
  parseWrittenAnswerGrade,
} from '../../src/composables/ai/written-answer-grader'

describe('written answer grader', () => {
  it('requires the exact Yes/No response structure and includes grading context', () => {
    const prompt = buildWrittenAnswerGradingPrompt({
      question: 'What is mitosis?',
      referenceAnswer: 'Cell division producing two identical daughter cells.',
      studentAnswer: 'A cell divides into two matching cells.',
    })

    expect(prompt).toContain('<Yes/No>:<Explanation>')
    expect(prompt).toContain('<question>\nWhat is mitosis?\n</question>')
    expect(prompt).toContain(
      '<reference_answer>\nCell division producing two identical daughter cells.\n</reference_answer>',
    )
    expect(prompt).toContain(
      '<student_answer>\nA cell divides into two matching cells.\n</student_answer>',
    )
    expect(prompt).toContain('Do not add any extra words, lines, markdown')
  })

  it('parses affirmative and negative grades', () => {
    expect(
      parseWrittenAnswerGrade('Yes:The answer includes the defining idea.'),
    ).toEqual({
      isCorrect: true,
      explanation: 'The answer includes the defining idea.',
    })
    expect(
      parseWrittenAnswerGrade('No: It describes a different process.'),
    ).toEqual({
      isCorrect: false,
      explanation: 'It describes a different process.',
    })
  })

  it('rejects responses outside the required structure', () => {
    expect(() =>
      parseWrittenAnswerGrade('The answer is correct.'),
    ).toThrow('invalid written-answer grade')
    expect(() =>
      parseWrittenAnswerGrade('Yes:Correct.\nAdditional words'),
    ).toThrow('invalid written-answer grade')
  })
})
