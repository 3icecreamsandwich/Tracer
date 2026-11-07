import { browserStorageKey } from './platform/web'
export function useRecentLibrary() {
  const visits = useState<Record<string,number>>('recent-library-visits', () => ({}))
  function load() {
    try { const data = JSON.parse(localStorage.getItem(browserStorageKey('recent-library')) || '{}'); visits.value = Object.fromEntries(Object.entries(data).filter(([key,value]) => /^\/(set|study-guide)\/[^/]+$/.test(key) && typeof value === 'number' && Number.isFinite(value))) as Record<string,number> } catch { visits.value = {} }
  }
  function record(path: string) {
    const match = path.match(/^\/(set|study-guide)\/([^/]+)$/)
    if (!match) return
    const canonical = `/${match[1]}/${match[2].replace(/-(flashcards|learn|match|test|chat)$/, '')}`
    load(); visits.value[canonical] = Date.now()
    try { localStorage.setItem(browserStorageKey('recent-library'), JSON.stringify(Object.fromEntries(Object.entries(visits.value).sort((a,b) => b[1]-a[1]).slice(0,200)))) } catch {}
  }
  if (import.meta.client) load()
  return { visits, record }
}
