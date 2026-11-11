-- Supabase → SQL Editor → вставить → Run.  Замените dsaharov688@gmail.com (в 3 местах) на email админа.

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  type       text not null check (type in ('subscribe','contact')),
  name       text check (char_length(name)  <= 100),
  email      text not null check (char_length(email) <= 200 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone      text check (char_length(phone) <= 50),
  message    text check (char_length(message) <= 5000),
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Посетители сайта могут ТОЛЬКО отправлять заявки (читать их нельзя)
create policy "visitors can send" on public.messages
  for insert to anon, authenticated with check (read = false);

-- Читать, отмечать прочитанным и удалять может только админ (по email)
create policy "admin can read" on public.messages
  for select to authenticated using (lower(auth.jwt() ->> 'email') = lower('dsaharov688@gmail.com'));
create policy "admin can update" on public.messages
  for update to authenticated using (lower(auth.jwt() ->> 'email') = lower('dsaharov688@gmail.com'))
  with check (lower(auth.jwt() ->> 'email') = lower('dsaharov688@gmail.com'));
create policy "admin can delete" on public.messages
  for delete to authenticated using (lower(auth.jwt() ->> 'email') = lower('dsaharov688@gmail.com'));
