import { describe, expect, it } from 'vitest'

import { findDuplicateCardIssues } from '../../src/composables/cards/duplicates'

describe('findDuplicateCardIssues', () => {
  it('reports duplicate terms and definitions with card references', () => {
    const issues = findDuplicateCardIssues([
      { front: 'Photosynthesis', back: 'Plants make sugar' },
      { front: '  photosynthesis  ', back: 'Plants make sugar' },
      { front: 'Mitosis', back: 'Cell division' }
    ])

    expect(issues).toEqual([
      {
        id: 'term:photosynthesis:0',
        side: 'term',
        value: 'Photosynthesis',
        cardIndex: 0,
        duplicateCardIndexes: [1]
      },
      {
        id: 'definition:plants make sugar:0',
        side: 'definition',
        value: 'Plants make sugar',
        cardIndex: 0,
        duplicateCardIndexes: [1]
      },
      {
        id: 'term:photosynthesis:1',
        side: 'term',
        value: 'Photosynthesis',
        cardIndex: 1,
        duplicateCardIndexes: [0]
      },
      {
        id: 'definition:plants make sugar:1',
        side: 'definition',
        value: 'Plants make sugar',
        cardIndex: 1,
        duplicateCardIndexes: [0]
      }
    ])
  })

  it('ignores blank and unique values', () => {
    expect(
      findDuplicateCardIssues([
        { front: 'Alpha', back: 'One' },
        { front: 'Beta', back: 'Two' },
        { front: ' ', back: '' }
      ])
    ).toEqual([])
  })
})
