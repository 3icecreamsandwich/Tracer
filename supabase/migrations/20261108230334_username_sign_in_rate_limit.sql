-- Shared rate limits for the unauthenticated username sign-in function.
create table private.username_sign_in_limits (
  bucket text primary key,
  window_start timestamptz not null default now(),
  attempts integer not null default 0
);
revoke all on private.username_sign_in_limits from public, anon, authenticated;
create index username_sign_in_limits_window_idx on private.username_sign_in_limits (window_start);
create function public.consume_username_sign_in_attempt(p_bucket text, p_limit integer)
returns boolean language plpgsql security definer set search_path = '' as $$
declare current_attempts integer;
begin
  if p_bucket !~ '^[0-9a-f]{64}$' or p_limit < 1 or p_limit > 30 then return false; end if;
  insert into private.username_sign_in_limits as limits (bucket, window_start, attempts)
  values (p_bucket, now(), 1)
  on conflict (bucket) do update set
    window_start = case when limits.window_start <= now() - interval '1 minute' then now() else limits.window_start end,
    attempts = case when limits.window_start <= now() - interval '1 minute' then 1 else limits.attempts + 1 end
  returning attempts into current_attempts;
  return current_attempts <= p_limit;
end;
$$;
revoke all on function public.consume_username_sign_in_attempt(text, integer) from public, anon, authenticated;
grant execute on function public.consume_username_sign_in_attempt(text, integer) to service_role;
select cron.schedule('tracer-username-signin-cleanup', '35 * * * *', $$delete from private.username_sign_in_limits where window_start < now() - interval '1 day'$$);
