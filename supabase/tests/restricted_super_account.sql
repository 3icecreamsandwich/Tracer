-- Read-only deployment assertions; safe to run against the live database.
begin read only;
do $test$
begin
  if has_table_privilege('authenticated','private.super_account','INSERT')
     or has_table_privilege('authenticated','public.user_roles','UPDATE')
     or has_function_privilege('authenticated','private.enforce_super_account()','EXECUTE') then
    raise exception 'Super privilege can be changed by a client';
  end if;
  if (select count(*) from pg_trigger where not tgisinternal
      and tgname in ('enforce_super_account','revoke_changed_super_account')) <> 2 then
    raise exception 'Super restriction triggers missing';
  end if;
  if exists (
    select 1 from public.user_roles r
    left join private.super_account s on s.user_id=r.user_id
    left join auth.users u on u.id=r.user_id
    where r.role='super' and (s.user_id is null
      or lower(u.email) is distinct from '3icecreamsandwich@gmail.com'
      or u.email_confirmed_at is null)
  ) then
    raise exception 'An unauthorized account has Super';
  end if;
  if (select count(*) from public.user_roles where role='super') > 1 then
    raise exception 'Multiple Super accounts';
  end if;
end;
$test$;
select 'Super restriction deployment checks passed' as result;
commit;
