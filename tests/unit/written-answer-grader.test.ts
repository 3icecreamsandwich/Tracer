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

it('repairs harmless grade presentation without guessing a verdict',async()=>{
 const {normalizeWrittenAnswerGradeFormat:normalize}=await import('../../src/composables/ai/written-answer-grader')
 for(const raw of ['Yes:Correct.\nIt matches the reference.','**Yes:** Correct. It matches the reference.','```text\nYes:Correct. It matches the reference.\n```','<Yes>:<Correct. It matches the reference.>','<Yes>:Correct. It matches the reference.']) {
  expect(parseWrittenAnswerGrade(normalize(raw))).toEqual({isCorrect:true,explanation:'Correct. It matches the reference.'})
 }
})
it('rejects conflicting judgments, free prose, empty explanations and undecided labels after repair',async()=>{
 const {normalizeWrittenAnswerGradeFormat:normalize}=await import('../../src/composables/ai/written-answer-grader')
 for(const raw of ['Yes:Correct.\nNo:Incorrect.','Yes:Correct. No:Incorrect.','Yes:Correct.\n**No**:Incorrect.','The answer is correct.','Yes:','<Yes/No>:<Explanation>']) {
  expect(()=>parseWrittenAnswerGrade(normalize(raw))).toThrow('invalid written-answer grade')
 }
})
