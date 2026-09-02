export function takeNextChatRevealUnit(pending: string, complete: boolean) {
  if (!pending) return null
  const match = /^\s*\S+\s+/.exec(pending)
  if (!match && !complete) return null

  const finalMatch = match ?? /^\s*\S+/.exec(pending) ?? /^\s+/.exec(pending)
  if (!finalMatch) return null

  const unit = finalMatch[0]
  return {
    unit,
    pending: pending.slice(unit.length)
  }
}
