import { browserStorageKey } from './platform/web'

const DAILY_GOAL_SECONDS = 15 * 60
const ACTIVE_WINDOW_MS = 45_000
const TICK_MS = 15_000
type StreakState = { days: Record<string, number> }

const state = ref<StreakState>({ days: {} })
const loaded = ref(false)
const remoteDays = ref<Record<string, number>>({})
let owner = 'guest'
let syncPromise: Promise<void> | undefined
let lastSyncAt = 0
let stopListeners: (() => void) | undefined
let lastInteractionAt = 0
let lastTickAt = 0
const activeTicks: { at: number; seconds: number }[] = []
const trackers = new Set<() => boolean>()
let timer: ReturnType<typeof setInterval> | null = null

function dayKey(date = new Date()) { return date.toLocaleDateString('en-CA') }
function storageKey() { return browserStorageKey(owner === 'guest' ? 'study-streak' : `study-streak:${owner}`) }
function combinedDays() {
  const combined = { ...remoteDays.value }
  for (const [key, seconds] of Object.entries(state.value.days)) combined[key] = (combined[key] ?? 0) + seconds
  return combined
}
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
        .map(([key, seconds]) => [key, Math.max(0, seconds)])) }
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
  activeTicks.push({ at: Date.now(), seconds })
  while (activeTicks.length && activeTicks[0]!.at < Date.now() - 4 * 3600_000) activeTicks.shift()
  state.value.days[key] = Math.max(0, state.value.days[key] ?? 0) + seconds
  save()
  if (Date.now() - lastSyncAt > 60_000) void syncStudyTime()
}

export async function syncStudyTime() {
  if (syncPromise || typeof window === 'undefined') return syncPromise
  syncPromise = (async () => {
    const { getSupabaseClient, isSupabaseConfigured } = await import('./auth/client')
    if (!isSupabaseConfigured()) return
    const db = getSupabaseClient()
    const { data, error } = await db.auth.getSession()
    if (error) throw error
    const user = data.session?.user
    const nextOwner = user?.id ?? 'guest'
    if (owner !== nextOwner) {
      save(); owner = nextOwner; state.value = { days: {} }; remoteDays.value = {}; loaded.value = false; load()
    }
    if (!user) return
    const key = browserStorageKey('study-device-id')
    let device = window.localStorage.getItem(key)
    if (!device) { device = crypto.randomUUID(); window.localStorage.setItem(key, device) }
    const cutoff = new Date(); cutoff.setUTCDate(cutoff.getUTCDate() - 13)
    const cutoffKey = cutoff.toISOString().slice(0, 10)
    const rows = Object.entries(state.value.days).filter(([day]) => day >= cutoffKey).map(([day, seconds]) => ({ user_id: user.id, device_id: device, study_day: day, seconds: Math.min(86400, Math.round(seconds)) }))
    if (rows.length) { const result = await db.from('study_daily_time').upsert(rows, { onConflict: 'user_id,device_id,study_day' }); if (result.error) throw result.error }
    const result = await db.from('study_daily_time').select('device_id,study_day,seconds').eq('user_id', user.id).gte('study_day', cutoffKey)
    if (result.error) throw result.error
    const remote: Record<string, number> = {}
    for (const row of result.data ?? []) if (row.device_id !== device) remote[row.study_day] = (remote[row.study_day] ?? 0) + row.seconds
    remoteDays.value = remote; lastSyncAt = Date.now()
  })().catch(() => {}).finally(() => { syncPromise = undefined })
  return syncPromise
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
    load(); void syncStudyTime(); lastInteractionAt = Date.now(); lastTickAt = Date.now()
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
      void syncStudyTime()
    }
  }
}

export function activeStudySecondsSince(startedAt: string) {
  if (timer && typeof document !== 'undefined') tick(() => [...trackers].some(active => active()))
  const start = new Date(startedAt).getTime()
  return activeTicks.reduce((total, tick) => total + (tick.at > start ? tick.seconds : 0), 0)
}

export function useStudyStreak() {
  load(); void syncStudyTime()
  const days = computed(combinedDays)
  const today = computed(() => days.value[dayKey()] ?? 0)
  const completedToday = computed(() => today.value >= DAILY_GOAL_SECONDS)
  const currentStreak = computed(() => {
    let count = 0; const cursor = new Date()
    if (!completedToday.value) cursor.setDate(cursor.getDate() - 1)
    while ((days.value[dayKey(cursor)] ?? 0) >= DAILY_GOAL_SECONDS) { count += 1; cursor.setDate(cursor.getDate() - 1) }
    return count
  })
  const week = computed(() => Array.from({ length: 7 }, (_, index) => {
    const date = new Date(); date.setDate(date.getDate() - (6 - index))
    const seconds = days.value[dayKey(date)] ?? 0
    return { key: dayKey(date), date, seconds, complete: seconds >= DAILY_GOAL_SECONDS, today: index === 6 }
  }))
  return { dailyGoalSeconds: DAILY_GOAL_SECONDS, today, completedToday, currentStreak, week, days }
}
