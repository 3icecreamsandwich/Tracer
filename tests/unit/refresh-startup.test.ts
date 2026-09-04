import { describe, expect, it } from 'vitest'

import {
  CONNECTION_STARTUP_FRESH_MS,
  CONNECTION_STARTUP_RETRY_MS,
  isDocumentReload,
  parseConnectionStartupState,
  shouldRunConnectionStartup,
} from '../../src/composables/refresh-startup'

describe('refresh startup throttling', () => {
  it('runs on the first document load', () => {
    expect(shouldRunConnectionStartup(parseConnectionStartupState(null), 10_000)).toBe(true)
  })

  it('does not restart cloud work during a rapid document refresh', () => {
    expect(shouldRunConnectionStartup({ attemptedAt: 10_000, completedAt: 0 }, 10_000 + CONNECTION_STARTUP_RETRY_MS - 1)).toBe(false)
  })

  it('recognizes a document reload so cloud startup can be skipped', () => {
    expect(isDocumentReload([{ type: 'reload' }])).toBe(true)
    expect(isDocumentReload([{ type: 'navigate' }])).toBe(false)
  })

  it('revalidates a completed startup only after it becomes stale', () => {
    const state = { attemptedAt: 10_000, completedAt: 20_000 }
    expect(shouldRunConnectionStartup(state, 20_000 + CONNECTION_STARTUP_FRESH_MS - 1)).toBe(false)
    expect(shouldRunConnectionStartup(state, 20_000 + CONNECTION_STARTUP_FRESH_MS)).toBe(true)
  })
})
