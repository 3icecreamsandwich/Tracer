create or replace function public.assign_tracer_class_item(
  requested_class_id uuid,
  requested_local_set_id uuid,
  requested_client_request_id uuid,
  requested_kind text,
  requested_set_title text,
  requested_assignment_title text,
  requested_description text,
  requested_content jsonb,
  requested_assets jsonb
)
returns table (
  assignment_id uuid,
  set_id uuid,
  set_version_id uuid,
  assigned_at timestamptz
)
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  current_user_id uuid := (select auth.uid());
  cloud_set_id uuid;
  cloud_version_id uuid;
  cloud_assignment_id uuid;
  cloud_assigned_at timestamptz;
  computed_content_hash text;
  next_version integer;
begin
  if current_user_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  if requested_class_id is null or requested_local_set_id is null or requested_client_request_id is null then
    raise exception 'Class, local set, and request identifiers are required' using errcode = '22023';
  end if;
  if requested_kind not in ('set', 'study-guide') then
    raise exception 'Unsupported classroom item kind' using errcode = '22023';
  end if;
  if nullif(pg_catalog.btrim(requested_set_title), '') is null
    or nullif(pg_catalog.btrim(requested_assignment_title), '') is null then
    raise exception 'Set and assignment titles are required' using errcode = '22023';
  end if;
  if pg_catalog.length(pg_catalog.btrim(requested_set_title)) > 200
    or pg_catalog.length(pg_catalog.btrim(requested_assignment_title)) > 200 then
    raise exception 'Set or assignment title is too long' using errcode = '22023';
  end if;
  if pg_catalog.jsonb_typeof(requested_content) <> 'object'
    or pg_catalog.jsonb_typeof(coalesce(requested_assets, '[]'::jsonb)) <> 'array' then
    raise exception 'Assignment content is invalid' using errcode = '22023';
  end if;
  if not (select private.is_class_teacher(requested_class_id)) then
    raise exception 'Teacher access to this class is required' using errcode = '42501';
  end if;
  if exists (
    select 1
    from pg_catalog.jsonb_array_elements(coalesce(requested_assets, '[]'::jsonb)) as asset
    where nullif(asset ->> 'object_path', '') is null
      or (asset ->> 'object_path') not like current_user_id::text || '/%'
      or (asset ->> 'object_path') like '%..%'
  ) then
    raise exception 'Asset path is invalid' using errcode = '22023';
  end if;

  select a.id, a.set_version_id, a.created_at
  into cloud_assignment_id, cloud_version_id, cloud_assigned_at
  from public.assignments as a
  where a.created_by = current_user_id
    and a.client_request_id = requested_client_request_id;

  if cloud_assignment_id is not null then
    select sv.set_id into cloud_set_id
    from public.set_versions as sv
    where sv.id = cloud_version_id;
    if not exists (
      select 1 from public.assignments as a
      where a.id = cloud_assignment_id and a.class_id = requested_class_id
    ) then
      raise exception 'Request identifier is already in use' using errcode = '22023';
    end if;
    return query select cloud_assignment_id, cloud_set_id, cloud_version_id, cloud_assigned_at;
    return;
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(current_user_id::text || ':' || requested_local_set_id::text, 0)
  );

  select s.id into cloud_set_id
  from public.sets as s
  where s.owner_id = current_user_id and s.local_source_id = requested_local_set_id
  for update;

  if cloud_set_id is null then
    insert into public.sets (owner_id, local_source_id, title, description, visibility, source_type)
    values (
      current_user_id,
      requested_local_set_id,
      pg_catalog.btrim(requested_set_title),
      nullif(pg_catalog.btrim(requested_description), ''),
      'private',
      'manual'
    )
    returning id into cloud_set_id;
  else
    update public.sets
    set title = pg_catalog.btrim(requested_set_title),
        description = nullif(pg_catalog.btrim(requested_description), ''),
        updated_at = pg_catalog.now()
    where id = cloud_set_id;
  end if;

  computed_content_hash := pg_catalog.encode(
    extensions.digest(requested_content::text, 'sha256'),
    'hex'
  );

  select sv.id into cloud_version_id
  from public.set_versions as sv
  where sv.set_id = cloud_set_id and sv.content_hash = computed_content_hash;

  if cloud_version_id is null then
    select coalesce(pg_catalog.max(sv.version_number), 0) + 1
    into next_version
    from public.set_versions as sv
    where sv.set_id = cloud_set_id;

    cloud_version_id := extensions.gen_random_uuid();

    insert into public.set_versions (id, set_id, version_number, content, content_hash, created_by)
    values (
      cloud_version_id,
      cloud_set_id,
      next_version,
      requested_content,
      computed_content_hash,
      current_user_id
    );
  end if;

  update public.sets
  set current_version_id = cloud_version_id,
      updated_at = pg_catalog.now()
  where id = cloud_set_id;

  insert into public.set_assets (bucket_id, object_path, set_version_id, uploaded_by)
  select 'set-assets', asset ->> 'object_path', cloud_version_id, current_user_id
  from pg_catalog.jsonb_array_elements(coalesce(requested_assets, '[]'::jsonb)) as asset
  on conflict (bucket_id, object_path) do nothing;

  cloud_assignment_id := extensions.gen_random_uuid();
  cloud_assigned_at := pg_catalog.now();

  insert into public.assignments (
    id,
    class_id,
    set_version_id,
    created_by,
    client_request_id,
    title,
    mode,
    status,
    settings,
    published_at
  )
  values (
    cloud_assignment_id,
    requested_class_id,
    cloud_version_id,
    current_user_id,
    requested_client_request_id,
    pg_catalog.btrim(requested_assignment_title),
    'any',
    'published',
    pg_catalog.jsonb_build_object(
      'content_kind', requested_kind,
      'icon_key', requested_content ->> 'iconKey',
      'icon_tone', requested_content ->> 'iconTone',
      'card_count', pg_catalog.jsonb_array_length(coalesce(requested_content -> 'terms', '[]'::jsonb))
    ),
    cloud_assigned_at
  );

  insert into public.assignment_recipients (assignment_id, student_id)
  select cloud_assignment_id, cm.user_id
  from public.class_memberships as cm
  where cm.class_id = requested_class_id
    and cm.role = 'student'
    and cm.status = 'active';

  return query select cloud_assignment_id, cloud_set_id, cloud_version_id, cloud_assigned_at;
end;
$function$;
