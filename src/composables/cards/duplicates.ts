export type DuplicateCardSide = 'term' | 'definition'

export type DuplicateCardDraft = {
  front: string
  back: string
}

export type DuplicateCardIssue = {
  id: string
  side: DuplicateCardSide
  value: string
  cardIndex: number
  duplicateCardIndexes: number[]
}

function normalizeDuplicateValue(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
}

function collectSideIssues(
  drafts: readonly DuplicateCardDraft[],
  side: DuplicateCardSide
): DuplicateCardIssue[] {
  const groups = new Map<string, { value: string; indexes: number[] }>()
  const field = side === 'term' ? 'front' : 'back'

  drafts.forEach((draft, index) => {
    const raw = draft[field].trim()
    if (!raw) return
    const key = normalizeDuplicateValue(raw)
    const group = groups.get(key)
    if (group) {
      group.indexes.push(index)
    } else {
      groups.set(key, { value: raw, indexes: [index] })
    }
  })

  return Array.from(groups.entries()).flatMap(([key, group]) => {
    if (group.indexes.length < 2) return []
    return group.indexes.map((cardIndex) => ({
      id: `${side}:${key}:${cardIndex}`,
      side,
      value: group.value,
      cardIndex,
      duplicateCardIndexes: group.indexes.filter((index) => index !== cardIndex),
    }))
  })
}

export function findDuplicateCardIssues(
  drafts: readonly DuplicateCardDraft[]
): DuplicateCardIssue[] {
  const sideOrder: Record<DuplicateCardSide, number> = { term: 0, definition: 1 }
  return [
    ...collectSideIssues(drafts, 'term'),
    ...collectSideIssues(drafts, 'definition'),
  ].sort((a, b) => a.cardIndex - b.cardIndex || sideOrder[a.side] - sideOrder[b.side])
}
