-- Keep the privileged attempt writer out of the exposed public schema. The
-- public RPC is an invoker wrapper; the private implementation still performs
-- all auth.uid(), assignment-recipient, timestamp, score, and limit checks.

begin;

alter function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) set schema private;

revoke all on function private.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) from public, anon;
grant execute on function private.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) to authenticated;

create function public.submit_tracer_assignment_attempt(
  requested_assignment_id uuid,
  requested_client_attempt_id uuid,
  requested_mode text,
  requested_started_at timestamptz,
  requested_submitted_at timestamptz,
  requested_score_earned numeric,
  requested_score_possible numeric,
  requested_duration_seconds integer,
  requested_duration_ms integer,
  requested_completed boolean
)
returns table (attempt_id uuid, attempt_number integer, submitted_at timestamptz)
language sql
security invoker
set search_path = ''
as $function$
  select *
  from private.submit_tracer_assignment_attempt(
    requested_assignment_id,
    requested_client_attempt_id,
    requested_mode,
    requested_started_at,
    requested_submitted_at,
    requested_score_earned,
    requested_score_possible,
    requested_duration_seconds,
    requested_duration_ms,
    requested_completed
  );
$function$;

revoke all on function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) from public, anon;
grant execute on function public.submit_tracer_assignment_attempt(
  uuid, uuid, text, timestamptz, timestamptz, numeric, numeric, integer, integer, boolean
) to authenticated;

commit;
