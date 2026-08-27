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
}

const correctChoiceClass = 'border-2 border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-200 focus-visible:ring-emerald-300 dark:border-emerald-500 dark:bg-emerald-950/35 dark:text-emerald-50 dark:ring-emerald-900/70'
const incorrectChoiceClass = 'border-2 border-red-700 bg-red-50/80 text-red-950 ring-2 ring-red-200 focus-visible:ring-red-300 dark:border-red-500 dark:bg-red-950/40 dark:text-red-50 dark:ring-red-900/70'
const trueChoiceClass = 'border-amber-500 bg-amber-400 text-slate-950 hover:bg-amber-300 focus-visible:ring-amber-300 dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300'
const falseChoiceClass = 'border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900'
const multipleChoiceClass = 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-500'

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
    return 'border-amber-200 bg-amber-50/20 dark:border-amber-900/60 dark:bg-amber-950/10'
  }

  return {
    practiceTrueFalseChoiceClass: trueFalseChoiceClass,
    practiceMultipleChoiceClass: multipleChoiceOptionClass,
    practiceQuestionSurfaceClass: questionSurfaceClass
  }
}
