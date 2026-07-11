import type { Term, TermImage, Uuid } from '../types'

export type TermInput = {
  id?: string | null
  front: string
  back: string
  frontImage?: TermImage | null
  backImage?: TermImage | null
}

export type NormalizedTerm = Term

export class TermsValidationError extends Error {
  name = 'TermsValidationError'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getStringProp(obj: Record<string, unknown>, key: string): string | undefined {
  const v = obj[key]
  return typeof v === 'string' ? v : undefined
}

function normalizeText(s: string) {
  return s.replaceAll('\r', '').trim()
}

function normalizeImage(
  value: unknown,
  index: number,
  field: 'frontImage' | 'backImage'
): TermImage | undefined {
  if (value === undefined || value === null) return undefined
  if (!isRecord(value)) {
    throw new TermsValidationError(`term[${index}].${field} must be an object`)
  }

  const filename = normalizeText(getStringProp(value, 'filename') ?? '')
  const mimeType = normalizeText(getStringProp(value, 'mimeType') ?? '').toLowerCase()
  const dataUrl = normalizeText(getStringProp(value, 'dataUrl') ?? '')

  if (!filename) throw new TermsValidationError(`term[${index}].${field}.filename must be non-empty`)
  if (!mimeType) throw new TermsValidationError(`term[${index}].${field}.mimeType must be non-empty`)
  if (!dataUrl.startsWith(`data:${mimeType};`)) {
    throw new TermsValidationError(`term[${index}].${field}.dataUrl must match mimeType`)
  }

  return { filename, mimeType, dataUrl }
}

export function normalizeTerms(
  input: TermInput[],
  opts?: { randomUuid?: () => string }
): NormalizedTerm[] {
  const randomUuid = opts?.randomUuid ?? (() => crypto.randomUUID())

  if (!Array.isArray(input)) throw new TermsValidationError('terms must be an array')

  const out: NormalizedTerm[] = []
  for (let i = 0; i < input.length; i++) {
    const t = input[i]
    if (!isRecord(t)) {
      throw new TermsValidationError(`term[${i}] must be an object`)
    }

    const rawId = getStringProp(t, 'id')
    const id = rawId && rawId.trim() ? rawId.trim() : randomUuid()
    const front = normalizeText(getStringProp(t, 'front') ?? '')
    const back = normalizeText(getStringProp(t, 'back') ?? '')
    const frontImage = normalizeImage(t.frontImage, i, 'frontImage')
    const backImage = normalizeImage(t.backImage, i, 'backImage')

    if (!front && !frontImage) {
      throw new TermsValidationError(`term[${i}].front must have text or an image`)
    }
    if (!back && !backImage) {
      throw new TermsValidationError(`term[${i}].back must have text or an image`)
    }

    const normalized: NormalizedTerm = { id: id as Uuid, front, back }
    if (frontImage) normalized.frontImage = frontImage
    if (backImage) normalized.backImage = backImage
    out.push(normalized)
  }
  return out
}
