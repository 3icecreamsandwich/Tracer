import { browserStorageKey } from './platform/web'

const DAILY_GOAL_SECONDS = 15 * 60
const ACTIVE_WINDOW_MS = 45_000
const TICK_MS = 15_000
type StreakState = { days: Record<string, number> }

const state = ref<StreakState>({ days: {} })
const loaded = ref(false)
let stopListeners: (() => void) | undefined
let lastInteractionAt = 0
let lastTickAt = 0
const trackers = new Set<() => boolean>()
let timer: ReturnType<typeof setInterval> | null = null

function dayKey(date = new Date()) { return date.toLocaleDateString('en-CA') }
function storageKey() { return browserStorageKey('study-streak') }
function save() {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(storageKey(), JSON.stringify(state.value)) } catch {
    // Study tracking must keep working when device storage is unavailable.
  }
}

function load() {
  if (loaded.value || typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(storageKey())
    const parsed = raw ? JSON.parse(raw) as Partial<StreakState> : null
    if (parsed?.days && typeof parsed.days === 'object' && !Array.isArray(parsed.days)) {
      state.value = { days: Object.fromEntries(Object.entries(parsed.days)
        .filter(([key, seconds]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && typeof seconds === 'number' && Number.isFinite(seconds))
        .map(([key, seconds]) => [key, Math.min(DAILY_GOAL_SECONDS, Math.max(0, seconds))])) }
    }
  } catch { state.value = { days: {} } }
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 90)
  const cutoffKey = dayKey(cutoff)
  for (const key of Object.keys(state.value.days)) if (key < cutoffKey) delete state.value.days[key]
  loaded.value = true; save()
}

function record(seconds: number) {
  load()
  const key = dayKey()
  state.value.days[key] = Math.min(DAILY_GOAL_SECONDS, Math.max(0, state.value.days[key] ?? 0) + seconds)
  save()
}

function tick(isStudying: () => boolean) {
  const now = Date.now()
  if (lastTickAt && isStudying() && document.visibilityState === 'visible' && now - lastInteractionAt < ACTIVE_WINDOW_MS) {
    record(Math.min(30, Math.max(0, Math.round((now - lastTickAt) / 1000))))
  }
  lastTickAt = now
}

export function startStudyStreakTracking(isStudying: () => boolean) {
  if (typeof window === 'undefined') return () => {}
  const tracker = () => isStudying()
  trackers.add(tracker)
  const markActive = () => { lastInteractionAt = Date.now() }
  if (!timer) {
    load(); lastInteractionAt = Date.now(); lastTickAt = Date.now()
    window.addEventListener('pointerdown', markActive, { passive: true })
    window.addEventListener('keydown', markActive, { passive: true })
    window.addEventListener('touchstart', markActive, { passive: true })
    timer = setInterval(() => tick(() => [...trackers].some(active => active())), TICK_MS)
    stopListeners = () => {
      window.removeEventListener('pointerdown', markActive)
      window.removeEventListener('keydown', markActive)
      window.removeEventListener('touchstart', markActive)
    }
  }
  return () => {
    trackers.delete(tracker)
    if (!trackers.size && timer) {
      clearInterval(timer); timer = null
      stopListeners?.(); stopListeners = undefined
    }
  }
}

export function useStudyStreak() {
  load()
  const today = computed(() => state.value.days[dayKey()] ?? 0)
  const completedToday = computed(() => today.value >= DAILY_GOAL_SECONDS)
  const currentStreak = computed(() => {
    let count = 0; const cursor = new Date()
    if (!completedToday.value) cursor.setDate(cursor.getDate() - 1)
    while ((state.value.days[dayKey(cursor)] ?? 0) >= DAILY_GOAL_SECONDS) { count += 1; cursor.setDate(cursor.getDate() - 1) }
    return count
  })
  const week = computed(() => Array.from({ length: 7 }, (_, index) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - index))
    const seconds = state.value.days[dayKey(date)] ?? 0
    return { key: dayKey(date), date, seconds, complete: seconds >= DAILY_GOAL_SECONDS, today: index === 6 }
  }))
  return { dailyGoalSeconds: DAILY_GOAL_SECONDS, today, completedToday, currentStreak, week }
}
