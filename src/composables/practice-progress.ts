import {
  createPracticeProgressRepo,
  useTracerDb
} from './db'
import type { PracticeProgress } from './db/repos/practice-progress.repo'
import type { Uuid } from './db/types'

const WEB_PRACTICE_PROGRESS_PREFIX = 'tracer:practice-progress:'

function webPracticeProgressKey(setId: Uuid) {
  return `${WEB_PRACTICE_PROGRESS_PREFIX}${setId}`
}

export async function loadPracticeProgress(
  setId: Uuid,
  isWebPreview: boolean
): Promise<PracticeProgress | null> {
  if (isWebPreview) {
    try {
      const raw = window.localStorage.getItem(webPracticeProgressKey(setId))
      if (!raw) return null
      const parsed = JSON.parse(raw) as PracticeProgress
      if (
        typeof parsed?.setUpdatedAt !== 'string' ||
        !Array.isArray(parsed.questions) ||
        !parsed.answersByQuestionId ||
        typeof parsed.answersByQuestionId !== 'object'
      ) return null
      return parsed
    } catch {
      return null
    }
  }

  try {
    const db = await useTracerDb()
    return await createPracticeProgressRepo(db).get(setId)
  } catch {
    return null
  }
}

export async function savePracticeProgress(
  setId: Uuid,
  progress: PracticeProgress,
  isWebPreview: boolean
): Promise<void> {
  if (isWebPreview) {
    try {
      window.localStorage.setItem(webPracticeProgressKey(setId), JSON.stringify(progress))
    } catch {}
    return
  }

  const db = await useTracerDb()
  await createPracticeProgressRepo(db).save(setId, progress)
}

export type { PracticeProgress }
