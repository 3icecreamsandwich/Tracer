import { webApiJson } from './platform/web-api'

export type BillingPlan = 'plus' | 'pro'

export async function startSubscriptionCheckout(plan: BillingPlan): Promise<void> {
  const { url } = await webApiJson<{ url: string }>('billing/checkout', { plan })
  window.location.assign(url)
}

export async function openBillingPortal(): Promise<void> {
  const { url } = await webApiJson<{ url: string }>('billing/portal', {})
  window.location.assign(url)
}
