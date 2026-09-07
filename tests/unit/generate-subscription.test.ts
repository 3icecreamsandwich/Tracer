import { beforeEach, describe, expect, it, vi } from 'vitest'
const mocks = vi.hoisted(() => ({ session: vi.fn(), row: vi.fn(), eq: vi.fn() }))
vi.mock('../../src/composables/auth/client', () => ({
  getSupabaseClient: () => ({ auth: { getSession: mocks.session }, from: () => ({
    select: () => ({ eq: mocks.eq })
  }) })
}))
import { loadGeneratePlan, subscriptionGeneratePlan } from '../../src/composables/generate/subscription'
import { assertGenerateSourceLimits, GENERATE_PLAN_LIMITS } from '../../src/composables/generate/source-extraction/limits'

describe('generation subscription limits', () => {
  beforeEach(() => {
    mocks.session.mockReset().mockResolvedValue({ data: { session: { user: { id: 'owner' } } } })
    mocks.row.mockReset()
    mocks.eq.mockReset().mockReturnValue({ maybeSingle: mocks.row })
  })
  it.each(['free', 'plus', 'pro'] as const)('enforces exact %s boundaries', (plan) => {
    const limits = GENERATE_PLAN_LIMITS[plan]
    expect(() => assertGenerateSourceLimits({ pdfPages: limits.pdfPages, imageCount: limits.images }, limits)).not.toThrow()
    expect(() => assertGenerateSourceLimits({ pdfPages: limits.pdfPages + 1, imageCount: 0 }, limits)).toThrow(/PDF page/)
    expect(() => assertGenerateSourceLimits({ pdfPages: 0, imageCount: limits.images + 1 }, limits)).toThrow(/Too many images/)
  })
  it('handles legacy max, trials, expiration and unknown plans', () => {
    const row = { plan: 'max', status: 'active', current_period_end: null }
    expect(subscriptionGeneratePlan(row)).toBe('pro')
    expect(subscriptionGeneratePlan({ ...row, plan: 'plus', status: 'trialing' })).toBe('plus')
    for (const status of ['inactive', 'past_due', 'canceled', 'paused']) {
      expect(subscriptionGeneratePlan({ ...row, status })).toBe('free')
    }
    expect(subscriptionGeneratePlan({ ...row, plan: 'unknown' })).toBe('free')
    expect(subscriptionGeneratePlan({ ...row, current_period_end: 'invalid' })).toBe('free')
    expect(subscriptionGeneratePlan({ ...row, current_period_end: new Date(100).toISOString() }, 100)).toBe('free')
    expect(subscriptionGeneratePlan({ ...row, current_period_end: new Date(101).toISOString() }, 100)).toBe('pro')
  })
  it('reads the owner subscription from Supabase', async () => {
    mocks.row.mockResolvedValue({ data: { plan: 'plus', status: 'active', current_period_end: null } })
    expect(await loadGeneratePlan()).toBe('plus')
    expect(mocks.eq).toHaveBeenCalledWith('user_id', 'owner')
  })
  it('falls back to free for lookup errors and account changes', async () => {
    mocks.row.mockResolvedValue({ error: new Error('offline') })
    expect(await loadGeneratePlan()).toBe('free')
    mocks.row.mockResolvedValue({ data: { plan: 'pro', status: 'active', current_period_end: null } })
    mocks.session.mockResolvedValueOnce({ data: { session: { user: { id: 'owner' } } } }).mockResolvedValueOnce({ data: { session: null } })
    expect(await loadGeneratePlan()).toBe('free')
  })
})
