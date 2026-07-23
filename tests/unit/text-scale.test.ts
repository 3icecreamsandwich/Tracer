import { afterEach, describe, expect, it, vi } from 'vitest'

import { applyTextScale, normalizeTextScale, textScaleLabels } from '../../src/composables/text-scale'

describe('text scale', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('provides five stops bounded by Small and Large', () => {
    expect(textScaleLabels).toEqual(['Small', '', '', '', 'Large'])
    expect(normalizeTextScale(-1)).toBe(0)
    expect(normalizeTextScale(2.4)).toBe(2)
    expect(normalizeTextScale(4)).toBe(4)
    expect(normalizeTextScale(10)).toBe(4)
  })

  it('applies the fifth stop to the document', () => {
    const removeProperty = vi.fn()
    const documentElement = { dataset: {} as Record<string, string>, style: { removeProperty } }
    vi.stubGlobal('document', { documentElement })

    applyTextScale(4)

    expect(documentElement.dataset.textScale).toBe('4')
    expect(removeProperty).toHaveBeenCalledWith('font-size')
  })
})
