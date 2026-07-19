import type { FlashcardSet, Uuid } from './db/types'

type Translate = (key: string, params?: Record<string, string | number>) => string

export function createDemoTerms(t: Translate, count = 2): FlashcardSet['terms'] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1
    return {
      id: `t-${number}` as Uuid,
      front: t('demo.term', { number }),
      back: t('demo.definition', { number }),
    }
  })
}

export function createWebPreviewDemoSet(
  t: Translate,
  options?: { id?: Uuid; termCount?: number; descriptionKey?: string },
): FlashcardSet {
  const now = new Date().toISOString()
  return {
    id: options?.id ?? ('demo' as Uuid),
    folderId: null,
    title: t('demo.setTitle'),
    description: t(options?.descriptionKey ?? 'demo.setDescription'),
    terms: createDemoTerms(t, options?.termCount ?? 2),
    createdAt: now,
    updatedAt: now,
  }
}

export function createDemoStudyGuideTitle(t: Translate) {
  return `${t('home.studyGuide')} · ${t('demo.setTitle')}`
}
