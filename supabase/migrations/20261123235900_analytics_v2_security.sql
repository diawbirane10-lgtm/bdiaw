-- Apply only after provisioning and testing an owner account.
begin;
create table if not exists public.analytics_events (
  id uuid primary key,
  created_at timestamptz not null default now(),
  session_id uuid not null,
  event_type text not null check (event_type in ('page_view','engaged','project_open','outbound','document_open')),
  page text not null check (length(page) <= 200),
  target text check (length(target) <= 180),
  source text not null default 'Unknown',
  medium text,
  campaign text,
  campaign_content text,
  referrer_host text,
  country text,
  region text,
  city text,
  network_org text,
  network_asn text,
  geo_source text,
  traffic_signal text not null check (traffic_signal in ('automation_signal','hosting_signal','unknown')),
  device text,
  browser text
);
create index if not exists analytics_events_date_idx on public.analytics_events(created_at desc,id);
create index if not exists analytics_events_session_idx on public.analytics_events(session_id,created_at);
alter table public.analytics_events enable row level security;
revoke all on public.analytics_events from anon, authenticated;
grant select on public.analytics_events to authenticated;
grant select, insert on public.analytics_events to service_role;
create policy "Owner reads analytics v2" on public.analytics_events for select to authenticated
 using ((select auth.jwt()->'app_metadata'->>'portfolio_admin') = 'true');

-- Remove the public API access to the historic visits; retain all data.
drop policy if exists "Anyone can read visits" on public.page_visits;
drop policy if exists "Authenticated can read visits" on public.page_visits;
drop policy if exists "Anyone can insert visits" on public.page_visits;
revoke all on public.page_visits from anon, authenticated;
grant select on public.page_visits to authenticated;
grant select, insert on public.page_visits to service_role;
create policy "Owner reads historic visits" on public.page_visits for select to authenticated
 using ((select auth.jwt()->'app_metadata'->>'portfolio_admin') = 'true');
drop policy if exists "Anyone can delete testimonials" on public.testimonials;
revoke delete on public.testimonials from anon;
grant delete on public.testimonials to authenticated;
create policy "Owner deletes testimonials" on public.testimonials for delete to authenticated
 using ((select auth.jwt()->'app_metadata'->>'portfolio_admin') = 'true');
commit;
