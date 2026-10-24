import { afterEach, beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => { vi.resetModules(); vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })
function storage() {
  const gets: any[] = []
  const opens: any[] = []
  const db = { close: vi.fn(), transaction: () => {
    const tx: any = { objectStore: () => ({ get: () => { const r = {}; gets.push(r); return r }, put: () => queueMicrotask(() => tx.oncomplete()) }) }
    return tx
  } }
  vi.stubGlobal('indexedDB', { open: vi.fn(() => { const r: any = { result: db }; opens.push(r); return r }) })
  return { gets, opens, db }
}
it('coalesces simultaneous disk reads and keeps a newer save', async () => {
  const { gets, opens } = storage()
  const { readCache, writeCache } = await import('../../src/composables/cloud-library/cache')
  const first = readCache('owner', 'set'); const second = readCache('owner', 'set')
  opens[0].onsuccess(); await Promise.resolve()
  expect(gets).toHaveLength(1)
  await writeCache('owner', 'set', { revision: 2 })
  gets[0].result = { revision: 1 }; gets[0].onsuccess()
  expect(await first).toEqual({ revision: 2 }); expect(await second).toEqual({ revision: 2 })
})
it('does not repopulate memory with a disk read completed after sign-out', async () => {
  const { gets, opens } = storage()
  const { readCache, clearCloudMemoryCache } = await import('../../src/composables/cloud-library/cache')
  const pending = readCache('owner', 'set')
  opens[0].onsuccess(); await Promise.resolve()
  clearCloudMemoryCache()
  gets[0].result = { private: true }; gets[0].onsuccess()
  expect(await pending).toBeUndefined()
})
it('bounds a blocked connection and retries storage on the next access', async () => {
  const { opens, db } = storage()
  const { readCache } = await import('../../src/composables/cloud-library/cache')
  const pending = readCache('owner', 'set')
  await vi.advanceTimersByTimeAsync(1500)
  expect(await pending).toBeUndefined()
  opens[0].onsuccess(); expect(db.close).toHaveBeenCalledOnce()
  const retry = readCache('owner', 'set')
  expect(opens).toHaveLength(2)
  opens[1].onerror()
  expect(await retry).toBeUndefined()
})

it('returns an acknowledged cache write without waiting for a stalled disk', async () => {
  storage()
  const { readCache, writeCache } = await import('../../src/composables/cloud-library/cache')
  await writeCache('owner', 'set', { revision: 3 })
  expect(await readCache('owner', 'set')).toEqual({ revision: 3 })
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  await vi.advanceTimersByTimeAsync(1500)
  warn.mockRestore()
})

it('does not discard a cached collection when an unrelated item is saved', async () => {
  const { gets, opens } = storage()
  const { readCache, writeCache } = await import('../../src/composables/cloud-library/cache')
  const pending = readCache('owner', 'list:folder')
  opens[0].onsuccess(); await Promise.resolve()
  await writeCache('owner', 'set:one', { revision: 2 })
  gets[0].result = [{ id: 'folder' }]; gets[0].onsuccess()
  expect(await pending).toEqual([{ id: 'folder' }])
})
