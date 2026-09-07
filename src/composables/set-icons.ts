import Atom from '@lucide/vue/dist/esm/icons/atom.mjs'
import CodeXml from '@lucide/vue/dist/esm/icons/code-xml.mjs'
import Dna from '@lucide/vue/dist/esm/icons/dna.mjs'
import FlaskConical from '@lucide/vue/dist/esm/icons/flask-conical.mjs'
import Languages from '@lucide/vue/dist/esm/icons/languages.mjs'
import Palette from '@lucide/vue/dist/esm/icons/palette.mjs'
import PlayingCardsFan from '@lucide/vue/dist/esm/icons/playing-cards-fan.mjs'
import Radical from '@lucide/vue/dist/esm/icons/radical.mjs'
import RotateCcwClock from '@lucide/vue/dist/esm/icons/rotate-ccw-clock.mjs'
import type { Component } from 'vue'

export const setIconOptions = [
  { key: 'default' },
  { key: 'arts' },
  { key: 'biology' },
  { key: 'coding' },
  { key: 'history' },
  { key: 'language' },
  { key: 'math' },
  { key: 'physics' },
  { key: 'science' }
] as const

export type SetIconKey = (typeof setIconOptions)[number]['key']

export const setIconToneOptions = [
  { key: 'original', label: 'Original', swatch: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { key: 'red', label: 'Red', swatch: '#c85a63' },
  { key: 'gold', label: 'Gold', swatch: '#d59a32' },
  { key: 'green', label: 'Green', swatch: '#57966b' },
  { key: 'blue', label: 'Blue', swatch: '#5685b8' },
  { key: 'purple', label: 'Purple', swatch: '#8a6bb1' }
] as const

export type SetIconTone = (typeof setIconToneOptions)[number]['key']

const iconsByKey: Record<SetIconKey, Component> = {
  default: PlayingCardsFan,
  arts: Palette,
  biology: Dna,
  coding: CodeXml,
  history: RotateCcwClock,
  language: Languages,
  math: Radical,
  physics: Atom,
  science: FlaskConical,
}

export function setIconComponent(key: string | null | undefined) {
  return iconsByKey[normalizeSetIconKey(key)]
}

export function normalizeSetIconKey(key: string | null | undefined): SetIconKey {
  return setIconOptions.some((option) => option.key === key) ? key as SetIconKey : 'default'
}

export function normalizeSetIconTone(tone: string | null | undefined): SetIconTone {
  return setIconToneOptions.some((option) => option.key === tone) ? tone as SetIconTone : 'original'
}

export function setIconToneStyle(tone: string | null | undefined) {
  const normalized = normalizeSetIconTone(tone)
  const toneColors: Record<SetIconTone, { color: string; backgroundColor: string }> = {
    original: { color: '#ea580c', backgroundColor: '#ffedd5' },
    red: { color: '#e11d48', backgroundColor: '#ffe4e6' },
    gold: { color: '#ca8a04', backgroundColor: '#fef3c7' },
    green: { color: '#16a34a', backgroundColor: '#dcfce7' },
    blue: { color: '#2563eb', backgroundColor: '#dbeafe' },
    purple: { color: '#7c3aed', backgroundColor: '#ede9fe' },
  }
  return toneColors[normalized]
}
