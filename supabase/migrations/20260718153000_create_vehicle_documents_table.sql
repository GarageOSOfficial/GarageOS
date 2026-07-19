create table if not exists public.vehicle_documents (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  user_id uuid not null,
  document_type text not null,
  title text not null,
  description text,
  document_date date,
  tags text[] not null default '{}',
  file_name text not null,
  file_ext text not null,
  mime_type text,
  file_size_bytes bigint not null default 0,
  storage_bucket text not null default 'vehicle-documents',
  storage_path text not null unique,
  file_url text not null,
  uploaded_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

do
$$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'vehicle_documents_document_type_check'
  ) then
    alter table public.vehicle_documents
      add constraint vehicle_documents_document_type_check
      check (
        document_type in (
          'Receipts',
          'Manuals',
          'Registration',
          'Insurance',
          'Wiring Diagrams',
          'Paint Codes',
          'Build Sheets',
          'Dyno Sheets',
          'Inspection Reports',
          'Other'
        )
      );
  end if;
end
$$;

create index if not exists vehicle_documents_vehicle_id_date_idx
  on public.vehicle_documents (vehicle_id, document_date desc, created_at desc);

create index if not exists vehicle_documents_user_id_idx
  on public.vehicle_documents (user_id);

create index if not exists vehicle_documents_type_idx
  on public.vehicle_documents (document_type);

create index if not exists vehicle_documents_title_idx
  on public.vehicle_documents (lower(title));

create index if not exists vehicle_documents_tags_idx
  on public.vehicle_documents using gin (tags);
