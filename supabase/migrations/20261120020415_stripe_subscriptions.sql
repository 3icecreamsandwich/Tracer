-- Stripe's IDs are stored in the existing provider_* columns. These indexes
-- keep webhook lookups fast without exposing any billing data to clients.
create index if not exists subscriptions_provider_customer_id_idx
  on public.subscriptions (provider_customer_id)
  where provider_customer_id is not null;

create index if not exists subscriptions_provider_subscription_id_idx
  on public.subscriptions (provider_subscription_id)
  where provider_subscription_id is not null;
