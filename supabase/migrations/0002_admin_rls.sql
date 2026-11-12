-- Run in Supabase SQL Editor; replace UUID placeholder in final INSERT below.
-- Admin membership is granted by database owner only, never from browser.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
-- SECURITY DEFINER reads only caller's own membership; fixed search_path avoids object shadowing.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "products admin read" on public.products;
create policy "products admin read" on public.products for select to authenticated
  using ((select public.is_admin()));
drop policy if exists "products admin insert" on public.products;
create policy "products admin insert" on public.products for insert to authenticated
  with check ((select public.is_admin()));
drop policy if exists "products admin update" on public.products;
create policy "products admin update" on public.products for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "products admin delete" on public.products;
create policy "products admin delete" on public.products for delete to authenticated
  using ((select public.is_admin()));
drop policy if exists "orders admin read" on public.orders;
create policy "orders admin read" on public.orders for select to authenticated
  using ((select public.is_admin()));
-- No browser-facing write policy for orders: WhatsApp checkout does not create orders.
-- After creating admin user via Supabase Auth UI, run separately:
-- insert into public.admin_users(user_id) values ('<AUTH_USER_UUID>');
