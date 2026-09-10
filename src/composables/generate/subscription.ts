import { getSupabaseClient } from '../auth/client'
import { GENERATE_PLAN_LIMITS } from './source-extraction/limits'

export type GeneratePlan = keyof typeof GENERATE_PLAN_LIMITS
export type SubscriptionRow = { plan: string; status: string; current_period_end: string | null }

export function subscriptionGeneratePlan(row: SubscriptionRow | null, now = Date.now()): GeneratePlan {
  if (!row || !['active', 'trialing'].includes(row.status)) return 'free'
  if (row.current_period_end !== null) {
    const end = Date.parse(row.current_period_end)
    if (!Number.isFinite(end) || end <= now) return 'free'
  }
  if (row.plan === 'pro' || row.plan === 'max') return 'pro'
  return row.plan === 'plus' ? 'plus' : 'free'
}

// Never derive entitlements from editable user metadata or persist paid limits locally.
export async function loadGeneratePlan(): Promise<GeneratePlan> {
  try {
    const client = getSupabaseClient()
    const { data: session, error: sessionError } = await client.auth.getSession()
    if (sessionError || !session.session) return 'free'
    const userId = session.session.user.id
    const [subscription, role] = await Promise.all([
      client.from('subscriptions').select('plan,status,current_period_end').eq('user_id', userId).maybeSingle(),
      client.from('user_roles').select('role').eq('user_id', userId).maybeSingle(),
    ])
    const { data: current } = await client.auth.getSession()
    if (current.session?.user.id !== userId) return 'free'
    if (!role.error && role.data?.role === 'super') return 'pro'
    return subscription.error ? 'free' : subscriptionGeneratePlan(subscription.data)
  } catch {
    return 'free'
  }
}
