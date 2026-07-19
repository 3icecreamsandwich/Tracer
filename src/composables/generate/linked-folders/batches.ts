import {
  MAX_GENERATE_IMAGES,
  MAX_GENERATE_PDF_PAGES,
  type ExtractedGenerateSource
} from '../source-extraction'

export const MAX_LINKED_FOLDER_BATCH_CHARACTERS = 60_000

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
    totals.pdfPages + cost.pdfPages <= MAX_GENERATE_PDF_PAGES &&
    totals.images + cost.images <= MAX_GENERATE_IMAGES &&
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
