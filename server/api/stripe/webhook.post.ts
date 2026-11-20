import Stripe from 'stripe'
import { createError, getHeader, readRawBody } from 'h3'
import { billingAdmin, billingConfig, planForStripePrice, stripeFor } from '../../utils/stripe'

async function userIdForSubscription(event: Parameters<typeof billingAdmin>[0], subscription: Stripe.Subscription): Promise<string | null> {
  const fromMetadata = subscription.metadata.user_id
  if (fromMetadata) return fromMetadata
  const { data } = await billingAdmin(event)
    .from('subscriptions')
    .select('user_id')
    .eq('provider_subscription_id', subscription.id)
    .maybeSingle()
  return data?.user_id ?? null
}

function tracerSubscriptionStatus(status: Stripe.Subscription.Status): 'inactive' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'paused' {
  if (status === 'trialing' || status === 'active' || status === 'past_due' || status === 'canceled' || status === 'paused') return status
  // Stripe also reports incomplete, incomplete_expired, and unpaid. Tracer's
  // existing schema intentionally represents those as not yet entitled / lapsed.
  return status === 'unpaid' ? 'past_due' : 'inactive'
}

async function syncSubscription(event: Parameters<typeof billingAdmin>[0], subscription: Stripe.Subscription, fallbackUserId?: string | null) {
  const userId = fallbackUserId || await userIdForSubscription(event, subscription)
  const priceId = subscription.items.data[0]?.price?.id
  const plan = planForStripePrice(event, priceId)
  if (!userId || !plan) return
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end ?? null
  const { error } = await billingAdmin(event).from('subscriptions').upsert({
    user_id: userId,
    provider_customer_id: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    provider_subscription_id: subscription.id,
    plan,
    status: tracerSubscriptionStatus(subscription.status),
    current_period_end: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })
  if (error) throw error
}

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, 'stripe-signature')
  const raw = await readRawBody(event, false)
  const config = billingConfig(event)
  if (!signature || !raw || !config.webhookSecret) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid Stripe webhook.' })
  }

  let stripeEvent: Stripe.Event
  try {
    stripeEvent = await stripeFor(event).webhooks.constructEventAsync(raw, signature, config.webhookSecret)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid Stripe webhook signature.' })
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session
        const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
        if (subscriptionId) {
          const subscription = await stripeFor(event).subscriptions.retrieve(subscriptionId)
          await syncSubscription(event, subscription, session.client_reference_id ?? session.metadata?.user_id)
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await syncSubscription(event, stripeEvent.data.object as Stripe.Subscription)
        break
      case 'invoice.payment_failed':
      case 'invoice.paid': {
        const invoice = stripeEvent.data.object as Stripe.Invoice
        const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
        if (subscriptionId) {
          const subscription = await stripeFor(event).subscriptions.retrieve(subscriptionId)
          await syncSubscription(event, subscription)
        }
        break
      }
    }
  } catch (cause) {
    console.error(JSON.stringify({ event: 'stripe_webhook_sync_failed', type: stripeEvent.type, message: cause instanceof Error ? cause.message.slice(0, 160) : 'unknown' }))
    throw createError({ statusCode: 500, statusMessage: 'Could not process Stripe webhook.' })
  }
  return { received: true }
})
