# Stripe billing setup

Tracer uses Stripe Checkout for new subscriptions and Stripe's billing portal for subscription changes and cancellation. Keep every secret in Cloudflare; never put one in `VITE_` variables or source code.

## Before enabling checkout

1. In Stripe, create recurring **Plus** and **Pro** prices. Decide the actual amount and billing interval there.
2. Create a restricted API key that can create Checkout Sessions, create Billing Portal sessions, and read subscriptions/customers. Do not use a publishable key for this.
3. In Cloudflare Worker secrets, set:
   - `STRIPE_RESTRICTED_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PLUS_PRICE_ID`
   - `STRIPE_PRO_PRICE_ID`
   - `SUPABASE_SERVICE_ROLE_KEY` (already required by Tracer's server-side services)
4. In Stripe, add the webhook endpoint `https://app.tracerquiz.com/api/stripe/webhook` and subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Apply the matching Supabase migration, then deploy the Worker.

The app deliberately leaves checkout unavailable until the secrets and Stripe price IDs are configured. This prevents a half-finished billing setup from charging anyone.
