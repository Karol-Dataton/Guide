create table if not exists public.wp64_badge_states (
    page_id text primary key,
    active_badges text[] not null default '{}',
    updated_at timestamptz not null default now()
);

alter table public.wp64_badge_states enable row level security;

drop policy if exists "wiki_badges_select" on public.wp64_badge_states;
create policy "wiki_badges_select"
    on public.wp64_badge_states
    for select
    to anon
    using (true);

drop policy if exists "wiki_badges_insert" on public.wp64_badge_states;
create policy "wiki_badges_insert"
    on public.wp64_badge_states
    for insert
    to anon
    with check (true);

drop policy if exists "wiki_badges_update" on public.wp64_badge_states;
create policy "wiki_badges_update"
    on public.wp64_badge_states
    for update
    to anon
    using (true)
    with check (true);
