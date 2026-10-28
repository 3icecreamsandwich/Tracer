import type { AppLanguage } from '../../db/types'
import type { ChatMessage } from '../chat'
import type { FactCheckDraft } from '../fact-check'
import type { WrittenAnswerGradeInput } from '../written-answer-grader'
import type { ExtractedGenerateSource } from '../../generate/source-extraction/types'

export const BUILTIN_MODEL_ID = 'builtin:auto'
export type AiMode = 'builtin' | 'byok'
export type BuiltinInput =
  | { operation: 'chat'; input: { messages: ChatMessage[]; context: string; title?: string; route?: string } }
  | { operation: 'fact-check'; input: { draft: FactCheckDraft; language: AppLanguage } }
  | { operation: 'grade'; input: WrittenAnswerGradeInput }
  | { operation: 'generate'; input: { sources: ExtractedGenerateSource[]; instructions?: string; incremental?: boolean } }
  | { operation: 'synthesize'; input: { inputTsv: string; theme?: string } }
  | { operation: 'practice'; input: { title: string; description: string | null; terms: { front: string; back: string }[]; count: number } }
export type BuiltinRequest = BuiltinInput & { requestId: string; sessionId: string }
export type BuiltinUsage = {
  limit: number; used: number; reserved: number; remaining: number; resetsAt: string
  available: boolean; throttled: boolean; retryAfter: number
}
export type BuiltinEvent = { type: 'delta'; text: string } | { type: 'result'; text: string } |
  { type: 'done'; usage: BuiltinUsage } | { type: 'error'; code: string; message: string; retryAfter?: number }
export class BuiltinAiError extends Error {
  constructor(public code: string, message: string, public statusCode = 503, public retryAfter = 0) {
    super(message); this.name = 'BuiltinAiError'
  }
}
export function isBuiltinModel(model: any): boolean { return model?.provider === 'tracer.builtin' }
export function inferredAiMode(settings: { aiMode?: AiMode | null; defaultModelId?: string | null }): AiMode {
  return settings.aiMode ?? (settings.defaultModelId && settings.defaultModelId !== BUILTIN_MODEL_ID ? 'byok' : 'builtin')
}
