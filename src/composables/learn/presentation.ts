export type PracticeChoiceValue = boolean | number

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
const incorrectChoiceClass = '!opacity-100 !border-2 !border-red-700 !bg-red-50/80 !text-red-950 !ring-2 !ring-red-200 focus-visible:ring-red-300 dark:border-red-500 dark:bg-red-950/40 dark:text-red-50 dark:ring-red-900/70'
const trueChoiceClass = 'border-slate-300 bg-slate-50 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50'
const falseChoiceClass = trueChoiceClass
const multipleChoiceClass = '!border-slate-300 !bg-slate-100 !text-slate-700 hover:!bg-slate-200 focus-visible:ring-slate-400 dark:!border-slate-700 dark:!bg-slate-800 dark:!text-slate-100 dark:hover:!bg-slate-700 dark:focus-visible:ring-slate-500'

export function createPracticePresentation(options: PracticePresentationOptions) {
  function choiceFeedbackClass(choice: PracticeChoiceValue) {
    const feedback = options.getChoiceFeedback()
    const question = options.getQuestion()
    if (!feedback || !question || feedback.questionId !== question.id) return null
    if (choice === feedback.correct) return correctChoiceClass
    if (choice === feedback.selected) return incorrectChoiceClass
    return null
  }

  function trueFalseChoiceClass(choice: boolean) {
    return choiceFeedbackClass(choice) ?? (choice ? trueChoiceClass : falseChoiceClass)
  }

  function multipleChoiceOptionClass(choice: number) {
    return choiceFeedbackClass(choice) ?? multipleChoiceClass
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
