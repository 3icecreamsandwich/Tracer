import type { Term, Uuid } from '../db/types'
import { createSeededRandom, shuffleWith } from '../random'

export type MatchTile = {
  id: string
  kind: 'term' | 'definition'
  pairId: Uuid
  text: string
}

export type MatchGeneratorOptions = {
  seed: number
  pairCount?: number
}

function clampPairCount(v: number | undefined) {
  if (v === undefined) return 8
  const n = Math.floor(v)
  if (!Number.isFinite(n)) return 8
  return Math.min(Math.max(n, 1), 50)
}

function normalizeCell(s: string) {
  return String(s ?? '').trim()
}

export function generateMatchTiles(terms: Term[], options: MatchGeneratorOptions): MatchTile[] {
  const seed = Number.isFinite(options.seed) ? Math.floor(options.seed) : 1
  const pairCount = clampPairCount(options.pairCount)
  const rand = createSeededRandom(seed)

  const normalized = terms
    .map((t) => ({ ...t, front: normalizeCell(t.front), back: normalizeCell(t.back) }))
    .filter((t) => t.id && t.front && t.back)

  if (normalized.length === 0) return []

  const chosen = shuffleWith(normalized, rand).slice(0, Math.min(pairCount, normalized.length))

  const tiles: MatchTile[] = []
  for (const t of chosen) {
    const pairId = t.id as Uuid
    tiles.push({ id: `term:${pairId}`, kind: 'term', pairId, text: t.front })
    tiles.push({ id: `def:${pairId}`, kind: 'definition', pairId, text: t.back })
  }

  return shuffleWith(tiles, rand)
}
