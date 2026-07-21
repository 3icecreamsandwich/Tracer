import defaultIcon from '~/assets/icons/set-default.png'
import artsIcon from '~/assets/icons/set-arts.png'
import biologyIcon from '~/assets/icons/set-biology.png'
import codingIcon from '~/assets/icons/set-coding.png'
import historyIcon from '~/assets/icons/set-history.png'
import languageIcon from '~/assets/icons/set-language.png'
import mathIcon from '~/assets/icons/set-math.png'
import physicsIcon from '~/assets/icons/set-physics.png'
import scienceIcon from '~/assets/icons/set-science.png'

export const setIconOptions = [
  { key: 'default', src: defaultIcon },
  { key: 'arts', src: artsIcon },
  { key: 'biology', src: biologyIcon },
  { key: 'coding', src: codingIcon },
  { key: 'history', src: historyIcon },
  { key: 'language', src: languageIcon },
  { key: 'math', src: mathIcon },
  { key: 'physics', src: physicsIcon },
  { key: 'science', src: scienceIcon }
] as const

export type SetIconKey = (typeof setIconOptions)[number]['key']

export const setIconToneOptions = [
  { key: 'original', label: 'Original', swatch: 'linear-gradient(135deg, #f59e0b, #ef4444)', filter: 'none' },
  { key: 'red', label: 'Red', swatch: '#c85a63', filter: 'sepia(1) saturate(4) hue-rotate(315deg)' },
  { key: 'gold', label: 'Gold', swatch: '#d59a32', filter: 'sepia(1) saturate(3) hue-rotate(350deg)' },
  { key: 'green', label: 'Green', swatch: '#57966b', filter: 'sepia(1) saturate(2.6) hue-rotate(70deg)' },
  { key: 'blue', label: 'Blue', swatch: '#5685b8', filter: 'sepia(1) saturate(3) hue-rotate(155deg)' },
  { key: 'purple', label: 'Purple', swatch: '#8a6bb1', filter: 'sepia(1) saturate(2.5) hue-rotate(215deg)' }
] as const

export type SetIconTone = (typeof setIconToneOptions)[number]['key']

const iconsByKey = new Map<string, string>(setIconOptions.map((option) => [option.key, option.src]))

export function setIconSrc(key: string | null | undefined) {
  return iconsByKey.get(key ?? 'default') ?? defaultIcon
}

export function normalizeSetIconKey(key: string | null | undefined): SetIconKey {
  return setIconOptions.some((option) => option.key === key) ? key as SetIconKey : 'default'
}

export function normalizeSetIconTone(tone: string | null | undefined): SetIconTone {
  return setIconToneOptions.some((option) => option.key === tone) ? tone as SetIconTone : 'original'
}

export function setIconToneStyle(tone: string | null | undefined) {
  const normalized = normalizeSetIconTone(tone)
  return { filter: setIconToneOptions.find((option) => option.key === normalized)?.filter ?? 'none' }
}
