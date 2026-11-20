import { createError } from 'h3'
import { authenticatedWebContext } from '../../../utils/web-auth'
import { readWebJson } from '../../../utils/web-body'
import { configuredPriceId, stripeFor, tracerOrigin, type BillingPlan } from '../../../utils/stripe'

export default defineEventHandler(async (event) => {
  const { client, userId } = await authenticatedWebContext(event)
  const body = await readWebJson(event, 1024)
  const plan = body?.plan
  if (plan !== 'plus' && plan !== 'pro') {
    throw createError({ statusCode: 400, statusMessage: 'Choose a valid plan.' })
  }

  const priceId = configuredPriceId(event, plan as BillingPlan)
  const stripe = stripeFor(event)
  const origin = tracerOrigin(event)
  const [{ data: existing }, { data: user }] = await Promise.all([
    client.from('subscriptions').select('provider_customer_id').eq('user_id', userId).maybeSingle(),
    client.auth.getUser(),
  ])

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    lineItems: [{ price: priceId, quantity: 1 }],
    successUrl: `${origin}/settings?billing=success`,
    cancelUrl: `${origin}/pricing?billing=cancelled`,
    clientReferenceId: userId,
    ...(existing?.provider_customer_id
      ? { customer: existing.provider_customer_id }
      : user?.user?.email ? { customerEmail: user.user.email } : {}),
    subscriptionData: { metadata: { user_id: userId, plan } },
    metadata: { user_id: userId, plan },
  })
  if (!session.url) throw createError({ statusCode: 502, statusMessage: 'Could not open secure checkout. Please try again.' })
  return { url: session.url }
})
