/** Shared accent colors for study mode artwork and selected controls. */
export function studyModeColor(mode: string): string {
  if (mode === 'practice' || mode === 'learn') return '#ed6266'
  if (mode === 'cards' || mode === 'flashcards' || mode === 'guide' || mode === 'study-guide') return '#e8b64d'
  return '#e78a24'
}

/** Soft accents keep selected outlines visible without overpowering the icon. */
export function studyModeOutlineColor(mode: string): string {
  if (mode === 'practice' || mode === 'learn') return 'rgba(237, 98, 102, 0.28)'
  if (mode === 'cards' || mode === 'flashcards' || mode === 'guide' || mode === 'study-guide') return 'rgba(255, 201, 77, 0.28)'
  return 'rgba(255, 152, 31, 0.28)'
}
