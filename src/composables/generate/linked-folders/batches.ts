import {
  type ExtractedGenerateSource
} from '../source-extraction'

export const MAX_LINKED_FOLDER_BATCH_CHARACTERS = 60_000

// Split large individual PDFs too, so a single long document can use parallel requests.
// Prefer paragraph boundaries; never truncate source material.
export function batchGenerateSources(sources: ExtractedGenerateSource[], budget = 18_000) {
  if (!Number.isInteger(budget) || budget < 1) throw new Error('Invalid generation batch budget')
  const pieces = sources.flatMap((source) => {
    const parts: ExtractedGenerateSource[] = []
    let offset = 0
    while (offset < source.text.length) {
      let end = Math.min(offset + budget, source.text.length)
      if (end < source.text.length) {
        const paragraph = source.text.lastIndexOf('\n\n', end)
        const space = source.text.lastIndexOf(' ', end)
        const boundary = paragraph > offset + budget / 2 ? paragraph + 2 : space + 1
        if (boundary > offset + budget / 2 && boundary <= end) end = boundary
      }
      parts.push({ ...source, text: source.text.slice(offset, end) })
      offset = end
    }
    return parts
  })
  const batches: ExtractedGenerateSource[][] = []
  let size = 0
  for (const piece of pieces) {
    if (!batches.length || size + piece.text.length > budget) {
      batches.push([])
      size = 0
    }
    batches[batches.length - 1]!.push(piece)
    size += piece.text.length
  }
  return batches
}

type BatchTotals = {
  pdfPages: number
  images: number
  characters: number
}

function sourceCost(source: ExtractedGenerateSource): BatchTotals {
  return {
    pdfPages: source.kind === 'pdf' ? Math.max(1, source.pageCount ?? 1) : 0,
    images: source.kind === 'image' ? 1 : 0,
    characters: source.text.length
  }
}

function fits(totals: BatchTotals, cost: BatchTotals) {
  return (
    totals.pdfPages + cost.pdfPages <= 50 &&
    totals.images + cost.images <= 10 &&
    totals.characters + cost.characters <= MAX_LINKED_FOLDER_BATCH_CHARACTERS
  )
}

export function batchLinkedFolderSources(
  sources: ExtractedGenerateSource[]
): ExtractedGenerateSource[][] {
  const batches: ExtractedGenerateSource[][] = []
  let current: ExtractedGenerateSource[] = []
  let totals: BatchTotals = { pdfPages: 0, images: 0, characters: 0 }

  for (const source of sources) {
    const cost = sourceCost(source)
    if (current.length > 0 && !fits(totals, cost)) {
      batches.push(current)
      current = []
      totals = { pdfPages: 0, images: 0, characters: 0 }
    }
    current.push(source)
    totals = {
      pdfPages: totals.pdfPages + cost.pdfPages,
      images: totals.images + cost.images,
      characters: totals.characters + cost.characters
    }
  }

  if (current.length > 0) batches.push(current)
  return batches
}
