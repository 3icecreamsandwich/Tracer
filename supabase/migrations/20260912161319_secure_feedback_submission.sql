begin;

create table if not exists private.feedback_submission_rate_limits (
  fingerprint text primary key check (char_length(fingerprint) = 64),
  window_started_at timestamptz not null default pg_catalog.now(),
  submission_count integer not null default 1 check (submission_count > 0),
  last_submitted_at timestamptz not null default pg_catalog.now()
);

revoke all on table private.feedback_submission_rate_limits from public, anon, authenticated;

create or replace function public.submit_website_feedback(
  requested_fingerprint text,
  requested_feedback_type text,
  requested_severity smallint,
  requested_message text,
  requested_language text,
  requested_source_path text,
  requested_submitted_by uuid default null
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $function$
declare
  normalized_message text := pg_catalog.btrim(requested_message);
  normalized_language text := pg_catalog.left(pg_catalog.btrim(requested_language), 16);
  normalized_source_path text := pg_catalog.left(pg_catalog.btrim(requested_source_path), 200);
  rate_count integer;
  created_id bigint;
begin
  if (select auth.role()) <> 'service_role' then
    raise exception 'Service role required' using errcode = '42501';
  end if;
  if requested_fingerprint !~ '^[0-9a-f]{64}$' then
    raise exception 'Invalid feedback fingerprint' using errcode = '22023';
  end if;
  if requested_feedback_type not in ('problem', 'feature') then
    raise exception 'Invalid feedback type' using errcode = '22023';
  end if;
  if pg_catalog.char_length(normalized_message) not between 3 and 4000 then
    raise exception 'Invalid feedback message' using errcode = '22023';
  end if;
  if pg_catalog.char_length(normalized_language) not between 2 and 16
    or pg_catalog.char_length(normalized_source_path) < 1 then
    raise exception 'Invalid feedback metadata' using errcode = '22023';
  end if;
  if (requested_feedback_type = 'problem' and requested_severity not between 1 and 5)
    or (requested_feedback_type = 'feature' and requested_severity is not null) then
    raise exception 'Invalid feedback severity' using errcode = '22023';
  end if;
  if requested_submitted_by is not null and not exists (
    select 1 from auth.users where id = requested_submitted_by
  ) then
    raise exception 'Invalid feedback user' using errcode = '22023';
  end if;

  insert into private.feedback_submission_rate_limits as rate_limit (
    fingerprint, window_started_at, submission_count, last_submitted_at
  ) values (
    requested_fingerprint, pg_catalog.now(), 1, pg_catalog.now()
  )
  on conflict (fingerprint) do update
  set window_started_at = case
        when rate_limit.window_started_at < pg_catalog.now() - interval '15 minutes'
          then pg_catalog.now()
        else rate_limit.window_started_at
      end,
      submission_count = case
        when rate_limit.window_started_at < pg_catalog.now() - interval '15 minutes'
          then 1
        else rate_limit.submission_count + 1
      end,
      last_submitted_at = pg_catalog.now()
  returning submission_count into rate_count;

  if rate_count > 5 then
    raise exception 'Feedback rate limit exceeded' using errcode = 'P0001';
  end if;

  insert into public.feedback_submissions (
    feedback_type, severity, message, language, source_path, submitted_by
  ) values (
    requested_feedback_type, requested_severity, normalized_message,
    normalized_language, normalized_source_path, requested_submitted_by
  )
  returning id into created_id;

  return created_id;
end;
$function$;

revoke all on function public.submit_website_feedback(
  text, text, smallint, text, text, text, uuid
) from public, anon, authenticated;
grant execute on function public.submit_website_feedback(
  text, text, smallint, text, text, text, uuid
) to service_role;

revoke insert on table public.feedback_submissions from anon, authenticated;
revoke usage, select on sequence public.feedback_submissions_id_seq from anon, authenticated;
drop policy if exists "Anyone can submit feedback" on public.feedback_submissions;

commit;
