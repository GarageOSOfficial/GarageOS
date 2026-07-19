create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  user_id uuid not null,
  activity_type text not null,
  title text not null,
  description text,
  activity_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  photos text[] not null default '{}',
  attachments text[] not null default '{}',
  metadata jsonb
);

do
$$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'activities_activity_type_check'
  ) then
    alter table public.activities
      add constraint activities_activity_type_check
      check (
        activity_type in (
          'Purchased Part',
          'Installed Part',
          'Maintenance',
          'Progress Update',
          'Journal Entry',
          'Record Upload'
        )
      );
  end if;
end
$$;

create index if not exists activities_vehicle_id_activity_date_idx
  on public.activities (vehicle_id, activity_date desc, created_at desc);

create index if not exists activities_user_id_idx
  on public.activities (user_id);
