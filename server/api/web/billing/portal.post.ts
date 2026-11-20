import { createError } from 'h3'
import { authenticatedWebContext } from '../../../utils/web-auth'
import { stripeFor, tracerOrigin } from '../../../utils/stripe'

export default defineEventHandler(async (event) => {
  const { client, userId } = await authenticatedWebContext(event)
  const { data, error } = await client
    .from('subscriptions')
    .select('provider_customer_id')
    .eq('user_id', userId)
    .maybeSingle()
  if (error || !data?.provider_customer_id) {
    throw createError({ statusCode: 404, statusMessage: 'No billing account was found for this Tracer account.' })
  }
  const session = await stripeFor(event).billingPortal.sessions.create({
    customer: data.provider_customer_id,
    returnUrl: `${tracerOrigin(event)}/settings`,
  })
  return { url: session.url }
})
