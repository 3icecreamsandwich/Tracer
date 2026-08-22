import { describe, expect, it, vi } from 'vitest'

import { createAsyncRequestCache } from '../../src/composables/request-cache'

describe('async request cache', () => {
  it('shares an in-flight request and reuses its short-lived result', async () => {
    let resolveRequest!: (value: string) => void
    const loader = vi.fn(() => new Promise<string>((resolve) => {
      resolveRequest = resolve
    }))
    const cache = createAsyncRequestCache({ ttlMs: 1_000 })

    const first = cache.get('classrooms:user-1', loader)
    const second = cache.get('classrooms:user-1', loader)
    expect(loader).toHaveBeenCalledTimes(1)

    resolveRequest('loaded')
    await expect(Promise.all([first, second])).resolves.toEqual(['loaded', 'loaded'])
    await expect(cache.get('classrooms:user-1', loader)).resolves.toBe('loaded')
    expect(loader).toHaveBeenCalledTimes(1)
  })

  it('expires and explicitly invalidates cached resources', async () => {
    let now = 100
    const loader = vi.fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second')
      .mockResolvedValueOnce('third')
    const cache = createAsyncRequestCache({ ttlMs: 50, now: () => now })

    await expect(cache.get('members:user-1:class-1', loader)).resolves.toBe('first')
    now = 151
    await expect(cache.get('members:user-1:class-1', loader)).resolves.toBe('second')
    cache.invalidate('members:user-1:')
    await expect(cache.get('members:user-1:class-1', loader)).resolves.toBe('third')
    expect(loader).toHaveBeenCalledTimes(3)
  })

  it('does not cache rejected requests', async () => {
    const loader = vi.fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce('recovered')
    const cache = createAsyncRequestCache({ ttlMs: 1_000 })

    await expect(cache.get('role:user-1', loader)).rejects.toThrow('offline')
    await expect(cache.get('role:user-1', loader)).resolves.toBe('recovered')
    expect(loader).toHaveBeenCalledTimes(2)
  })

  it('does not repopulate invalidated data when an older request finishes', async () => {
    let resolveOldRequest!: (value: string) => void
    const oldLoader = vi.fn(() => new Promise<string>((resolve) => {
      resolveOldRequest = resolve
    }))
    const freshLoader = vi.fn().mockResolvedValue('fresh')
    const cache = createAsyncRequestCache({ ttlMs: 1_000 })

    const oldRequest = cache.get('members:user-1:class-1', oldLoader)
    cache.invalidate('members:user-1:')
    await expect(cache.get('members:user-1:class-1', freshLoader)).resolves.toBe('fresh')
    resolveOldRequest('stale')
    await expect(oldRequest).resolves.toBe('stale')
    await expect(cache.get('members:user-1:class-1', freshLoader)).resolves.toBe('fresh')
    expect(freshLoader).toHaveBeenCalledTimes(1)
  })
})
