import type { LearnQuestion } from '../../learn/generator'
import type { DbClient, Uuid } from '../types'

type DbPracticeProgressRow = {
  set_updated_at: string
  current_question_id: string | null
  questions_json: string
  answers_json: string
}

export type PracticeProgress = {
  setUpdatedAt: string
  currentQuestionId: string | null
  questions: LearnQuestion[]
  answersByQuestionId: Record<string, boolean>
}

function parseQuestions(value: string): LearnQuestion[] {
  try {
    const parsed = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((question): question is LearnQuestion =>
      Boolean(
        question &&
        typeof question === 'object' &&
        typeof question.id === 'string' &&
        typeof question.kind === 'string' &&
        typeof question.prompt === 'string' &&
        typeof question.termId === 'string'
      )
    )
  } catch {
    return []
  }
}

function parseAnswers(value: string): Record<string, boolean> {
  try {
    const parsed = JSON.parse(value)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, boolean] =>
        typeof entry[1] === 'boolean'
      )
    )
  } catch {
    return {}
  }
}

export function createPracticeProgressRepo(db: DbClient) {
  return {
    async get(setId: Uuid): Promise<PracticeProgress | null> {
      const rows = await db.select<DbPracticeProgressRow>(
        `SELECT set_updated_at, current_question_id, questions_json, answers_json
         FROM practice_progress
         WHERE set_id = ?
         LIMIT 1;`,
        [setId]
      )
      const row = rows[0]
      if (!row) return null
      return {
        setUpdatedAt: row.set_updated_at,
        currentQuestionId: row.current_question_id,
        questions: parseQuestions(row.questions_json),
        answersByQuestionId: parseAnswers(row.answers_json)
      }
    },

    async save(setId: Uuid, progress: PracticeProgress): Promise<void> {
      await db.execute(
        `INSERT INTO practice_progress (
           set_id,
           set_updated_at,
           current_question_id,
           questions_json,
           answers_json
         )
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(set_id) DO UPDATE SET
           set_updated_at = excluded.set_updated_at,
           current_question_id = excluded.current_question_id,
           questions_json = excluded.questions_json,
           answers_json = excluded.answers_json,
           updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now');`,
        [
          setId,
          progress.setUpdatedAt,
          progress.currentQuestionId,
          JSON.stringify(progress.questions),
          JSON.stringify(progress.answersByQuestionId)
        ]
      )
    }
  }
}
