import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { createError, getRequestURL, type H3Event } from 'h3'
import { webBindings, webRuntimeConfig } from './web-config'

export type BillingPlan = 'plus' | 'pro'

type BillingConfig = {
  restrictedKey: string
  webhookSecret: string
  plusPriceId: string
  proPriceId: string
}

function secret(event: H3Event, name: string): string {
  const bindings = webBindings(event) as unknown as Record<string, unknown> | undefined
  const value = bindings?.[name] ?? process.env[name]
  return typeof value === 'string' ? value.trim() : ''
}

export function billingConfig(event: H3Event): BillingConfig {
  return {
    restrictedKey: secret(event, 'STRIPE_RESTRICTED_KEY'),
    webhookSecret: secret(event, 'STRIPE_WEBHOOK_SECRET'),
    plusPriceId: secret(event, 'STRIPE_PLUS_PRICE_ID'),
    proPriceId: secret(event, 'STRIPE_PRO_PRICE_ID'),
  }
}

export function configuredPriceId(event: H3Event, plan: BillingPlan): string {
  const config = billingConfig(event)
  const priceId = plan === 'plus' ? config.plusPriceId : config.proPriceId
  if (!config.restrictedKey || !priceId) {
    throw createError({ statusCode: 503, statusMessage: 'Billing is not ready yet. Please check back soon.' })
  }
  return priceId
}

export function stripeFor(event: H3Event): Stripe {
  const key = billingConfig(event).restrictedKey
  if (!key) throw createError({ statusCode: 503, statusMessage: 'Billing is not ready yet. Please check back soon.' })
  return new Stripe(key, { httpClient: Stripe.createFetchHttpClient() })
}

export function tracerOrigin(event: H3Event): string {
  const origin = getRequestURL(event).origin
  if (!origin.startsWith('http://') && !origin.startsWith('https://')) {
    throw createError({ statusCode: 500, statusMessage: 'Could not determine the Tracer address.' })
  }
  return origin
}

export function planForStripePrice(event: H3Event, priceId: string | null | undefined): BillingPlan | null {
  if (!priceId) return null
  const config = billingConfig(event)
  if (priceId === config.plusPriceId) return 'plus'
  if (priceId === config.proPriceId) return 'pro'
  return null
}

export function billingAdmin(event: H3Event) {
  const config = webRuntimeConfig(event)
  const serviceRole = secret(event, 'SUPABASE_SERVICE_ROLE_KEY')
  if (!config.supabaseUrl || !serviceRole) {
    throw createError({ statusCode: 503, statusMessage: 'Billing is not ready yet. Please check back soon.' })
  }
  return createClient(config.supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}
