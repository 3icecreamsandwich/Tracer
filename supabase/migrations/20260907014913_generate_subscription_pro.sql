begin;

-- Retain the legacy billing value until existing max subscriptions migrate.
alter table public.subscriptions drop constraint subscriptions_plan_check;
alter table public.subscriptions add constraint subscriptions_plan_check
  check (plan in ('free', 'plus', 'max', 'pro'));

commit;
