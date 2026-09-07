// Bound native I/O and preserve input order even when jobs finish out of order.
export async function mapConcurrent<T, R>(values: readonly T[], limit: number, run: (value: T, index: number) => Promise<R>): Promise<R[]> {
  const output = new Array<R>(values.length)
  let next = 0
  let failed = false
  const workers = await Promise.allSettled(Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (!failed && next < values.length) {
      const index = next++
      try { output[index] = await run(values[index]!, index) }
      catch (error) { failed = true; throw error }
    }
  }))
  const failure = workers.find((result) => result.status === 'rejected')
  if (failure?.status === 'rejected') throw failure.reason
  return output
}
