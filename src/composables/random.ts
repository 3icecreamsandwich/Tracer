export function createRandomSeed() {
  try {
    const buffer = new Uint32Array(1)
    globalThis.crypto?.getRandomValues?.(buffer)
    const value = Number(buffer[0] ?? 0)
    if (Number.isFinite(value) && value !== 0) return value
  } catch {}
  return Date.now() ^ Math.floor(Math.random() * 0xffffffff)
}

export function createSeededRandom(seed: number) {
  let value = (seed | 0) || 1
  return () => {
    value ^= value << 13
    value ^= value >>> 17
    value ^= value << 5
    return (value >>> 0) / 4294967296
  }
}

export function shuffleWith<T>(items: readonly T[], random: () => number) {
  const shuffled = items.slice()
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]!
    shuffled[swapIndex] = current!
  }
  return shuffled
}
