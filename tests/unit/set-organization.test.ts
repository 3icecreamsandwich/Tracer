import { describe, expect, it } from 'vitest'
import {
  assignHomeItemsToFolder,
  hasSelectionModifier,
  homeItemSetId,
  selectedSetsAfterPlainClick,
  toggleSelectedSet,
  visibleSetRange
} from '../../src/composables/home/set-organization'

describe('set organization', () => {
  it('uses one linked set identity for flashcards and study guides', () => {
    expect(homeItemSetId({ kind: 'set', id: 'set-1' })).toBe('set-1')
    expect(homeItemSetId({ kind: 'study-guide', id: 'guide-1', setId: 'set-1' })).toBe('set-1')
  })

  it('recognizes every supported selection modifier', () => {
    expect(hasSelectionModifier({ ctrlKey: true, metaKey: false, shiftKey: false })).toBe(true)
    expect(hasSelectionModifier({ ctrlKey: false, metaKey: true, shiftKey: false })).toBe(true)
    expect(hasSelectionModifier({ ctrlKey: false, metaKey: false, shiftKey: true })).toBe(true)
    expect(hasSelectionModifier({ ctrlKey: false, metaKey: false, shiftKey: false })).toBe(false)
  })

  it('blocks plain navigation during selection and only deselects selected sets', () => {
    expect(selectedSetsAfterPlainClick([], 'set-1')).toBeNull()
    expect(selectedSetsAfterPlainClick(['set-1'], 'set-2')).toEqual(['set-1'])
    expect(selectedSetsAfterPlainClick(['set-1', 'set-2'], 'set-1')).toEqual([
      'set-2'
    ])
  })

  it('toggles a set for both command and shift selection paths', () => {
    expect(toggleSelectedSet(['set-1'], 'set-2')).toEqual(['set-1', 'set-2'])
    expect(toggleSelectedSet(['set-1', 'set-2'], 'set-1')).toEqual(['set-2'])
  })

  it('selects the inclusive visible range in either direction', () => {
    const visible = ['set-1', 'set-2', 'set-3', 'set-4']
    expect(visibleSetRange(visible, 'set-2', 'set-4')).toEqual([
      'set-2',
      'set-3',
      'set-4'
    ])
    expect(visibleSetRange(visible, 'set-4', 'set-2')).toEqual([
      'set-2',
      'set-3',
      'set-4'
    ])
    expect(visibleSetRange(visible, null, 'set-3')).toEqual(['set-3'])
    expect(
      visibleSetRange(['color-theory', 'icons', 'math-concepts', 'random-facts'], 'color-theory', 'icons')
    ).toEqual(['color-theory', 'icons'])
  })

  it('moves linked study guides with their sets', () => {
    const items = [
      { kind: 'set' as const, id: 'set-1', folderId: null },
      {
        kind: 'study-guide' as const,
        id: 'guide-1',
        setId: 'set-1',
        folderId: null
      },
      { kind: 'set' as const, id: 'set-2', folderId: null }
    ]

    expect(assignHomeItemsToFolder(items, ['set-1'], 'folder-1')).toEqual([
      { kind: 'set', id: 'set-1', folderId: 'folder-1' },
      {
        kind: 'study-guide',
        id: 'guide-1',
        setId: 'set-1',
        folderId: 'folder-1'
      },
      { kind: 'set', id: 'set-2', folderId: null }
    ])
  })
})
