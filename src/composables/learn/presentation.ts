export type PracticeChoiceValue = boolean | number

export function practiceQuestionPrompt(question: { kind: string; prompt: string }): string {
  if (question.kind !== 'multiple_choice') return question.prompt
  const legacy = question.prompt.match(/^What is the definition of ["“]([\s\S]+)["”]\?$/)
  return legacy?.[1] ?? question.prompt
}

export type PracticeChoiceFeedback = {
  questionId: string
  selected: PracticeChoiceValue
  correct: PracticeChoiceValue
}

export type PracticeWrittenFeedback = {
  questionId: string
  isCorrect: boolean
}

type PracticePresentationOptions = {
  getQuestion: () => { id: string; kind: string } | null | undefined
  getChoiceFeedback: () => PracticeChoiceFeedback | null
  getWrittenFeedback: () => PracticeWrittenFeedback | null
  neutralSurfaceClass?: string
}

const correctChoiceClass = '!opacity-100 !border-2 !border-emerald-600 !bg-emerald-50/70 !text-emerald-950 !ring-2 !ring-emerald-200 focus-visible:ring-emerald-300 dark:border-emerald-500 dark:bg-emerald-950/35 dark:text-emerald-50 dark:ring-emerald-900/70'
const revealedChoiceClass = '!opacity-100 !border-[3px] !border-dashed !border-emerald-500 !ring-0'
const incorrectChoiceClass = '!opacity-100 !border-2 !border-orange-600 !bg-orange-50/80 !text-orange-950 !ring-2 !ring-orange-200 focus-visible:ring-orange-300 dark:border-orange-500 dark:bg-orange-950/40 dark:text-orange-50 dark:ring-orange-900/70'
const trueChoiceClass = '!border-transparent !bg-emerald-100 !text-emerald-800 hover:!bg-emerald-200 dark:!bg-emerald-950/50 dark:!text-emerald-300'
const falseChoiceClass = '!border-transparent !bg-orange-100 !text-orange-800 hover:!bg-orange-200 dark:!bg-orange-950/50 dark:!text-orange-300'
const multipleChoiceClass = '!border-slate-300 !bg-slate-100 !text-slate-700 hover:!bg-slate-200 focus-visible:ring-slate-400 dark:!border-slate-700 dark:!bg-slate-800 dark:!text-slate-100 dark:hover:!bg-slate-700 dark:focus-visible:ring-slate-500'

export function createPracticePresentation(options: PracticePresentationOptions) {
  function choiceFeedbackClass(choice: PracticeChoiceValue) {
    const feedback = options.getChoiceFeedback()
    const question = options.getQuestion()
    if (!feedback || !question || feedback.questionId !== question.id) return null
    if (choice === feedback.correct) return feedback.selected === feedback.correct ? correctChoiceClass : revealedChoiceClass
    if (choice === feedback.selected) return incorrectChoiceClass
    return null
  }

  function trueFalseChoiceClass(choice: boolean) {
    return [choice ? trueChoiceClass : falseChoiceClass, choiceFeedbackClass(choice)]
  }

  function multipleChoiceOptionClass(choice: number) {
    return [multipleChoiceClass, choiceFeedbackClass(choice)]
  }

  function questionSurfaceClass() {
    const question = options.getQuestion()
    const feedback = options.getWrittenFeedback()
    if (question?.kind === 'written' && feedback?.questionId === question.id) {
      return feedback.isCorrect
        ? 'border-2 border-emerald-600 bg-emerald-50/40 dark:border-emerald-500 dark:bg-emerald-950/20'
        : 'border-2 border-red-700 bg-red-50/40 dark:border-red-500 dark:bg-red-950/20'
    }
    return options.neutralSurfaceClass ?? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'
  }

  return {
    practiceTrueFalseChoiceClass: trueFalseChoiceClass,
    practiceMultipleChoiceClass: multipleChoiceOptionClass,
    practiceQuestionSurfaceClass: questionSurfaceClass
  }
}
