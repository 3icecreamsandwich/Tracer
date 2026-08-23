import type { Uuid } from '../db'
import { createDemoStudyGuideTitle } from '../demo-content'
import { filterSetSearch, type SetSearchable } from './set-search'

type Translate = (key: string, params?: Record<string, string | number>) => string

export type TopbarSearchItem = SetSearchable & {
  kind: 'set' | 'study-guide'
  kindLabel: 'Set' | 'Study guide'
  id: Uuid
  setId?: Uuid
  subtitle?: string | null
}

export function filterTopbarSearchItems(
  items: readonly TopbarSearchItem[],
  query: string
): TopbarSearchItem[] {
  return filterSetSearch(items, query)
}

export function topbarSearchItemTo(item: TopbarSearchItem) {
  if (item.kind === 'set') return `/set/${item.id}`
  return `/study-guide/${item.setId ?? item.id}`
}

export function createWebPreviewSearchItems(
  t: Translate,
  now = new Date().toISOString()
): TopbarSearchItem[] {
  return [
    {
      kind: 'set',
      kindLabel: 'Set',
      id: 'demo' as Uuid,
      title: t('demo.setTitle'),
      description: t('demo.setDescription'),
      subtitle: t('demo.setDescription')
    },
    {
      kind: 'study-guide',
      kindLabel: 'Study guide',
      id: 'demo-guide' as Uuid,
      setId: 'demo' as Uuid,
      title: createDemoStudyGuideTitle(t),
      description: `Created ${now}`,
      subtitle: null
    }
  ]
}
