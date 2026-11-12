-- Mochi Ayu V2 — schema + seed katalog (13 varian, Rp5.000)
-- Jalankan di Supabase SQL Editor (paste seluruh file, klik Run). Idempoten.

create table if not exists public.products (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  tagline text not null,
  family text not null check (family in ('Cream','Cokelat','Buah','Matcha')),
  image text not null,
  accent text not null,
  price integer not null default 5000 check (price > 0),
  description text,
  note text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_active_order_idx on public.products (is_active, display_order);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  customer_name text not null,
  customer_phone text not null,
  items jsonb not null,
  total integer not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending','confirmed','preparing','ready','delivered','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_idx on public.orders (created_at desc);

alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products
  for select using (is_active = true);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();

insert into public.products (slug, name, tagline, family, image, accent, price, description, note, display_order) values
  ('strawberry-coklat', 'Strawberry Coklat', 'Stroberi asam manis, cokelat pekat', 'Cokelat', '/mochi/produk-stroberi.jpg', '#E9A8B8', 5000, 'Stroberi asam segar dibungkus cokelat pekat, kombinasi klasik yang nyaris tidak pernah gagal. Kulit mochi lembutnya dulu, lalu gigitan kedua asam stroberi menyegarkan ketemu cokelat yang dalam dan bulat. Manisnya jadi ada lawan, jadi nggak nyendol di tenggorokan.', 'lembut, asam manis kejar-kejaran', 1),
  ('strawberry-cream', 'Strawberry Cream', 'Stroberi utuh dalam krim lembut', 'Buah', '/mochi/produk-strawberry-cream.jpg', '#F2A9BC', 5000, 'Stroberi utuh di dalam, dikelilingi krim dingin yang lembut. Saat digigit, krimnya meleleh pelan sementara stroberi masih terasa renyah dan asam segarnya keluar pelan-pelan. Manisnya tidak buru-buru, ikut ritme krimnya, sampai akhir tinggal rasa stroberi di lidah.', 'dingin, krim meleleh pelan', 2),
  ('cookies-and-cream', 'Cookies & Cream', 'Krim vanila dengan remah biskuit', 'Cream', '/mochi/produk-cookies-cream.jpg', '#C9B7AE', 5000, 'Krim vanila halus dengan remah biskuit tersebar di dalam. Gigitannya unik, krim meleleh dulu, lalu remah biskuit memberi ngresik kecil di akhir tiap suapan. Vanila dan biskuit, dua rasa masa kecil yang jadi satu gigitan.', 'halus, ada ngresik kecil', 3),
  ('matcha', 'Matcha', 'Teh hijau earthy, tidak terlalu manis', 'Matcha', '/mochi/produk-matcha.jpg', '#A9B99C', 5000, 'Gigitan pertama ada pahit sopan khas teh hijau, lalu manis pelan muncul dari belakang. Isian matchanya pekat, warna hijau tua, aromanya seperti daun teh segar yang baru diseduh. Buat yang mulai bosan mochi manis-manis terus.', 'pekat, pahitnya sopan', 4),
  ('tiramisu', 'Tiramisu', 'Kopi, mascarpone, dan kakao', 'Cream', '/mochi/produk-tiramisu.jpg', '#B99B87', 5000, 'Isian kopi dan mascarpone dengan taburan kakao tipis di atasnya. Rasanya bertingkat, kopi pahit dulu, lalu mascarpone yang lembut dan creamy menyusul. Satu mochi ini rasanya seperti potongan tiramisu mini, cuma kulitnya kenyal dan lembut.', 'lembut berlapis, pahitnya hangat', 5),
  ('anggur-ijo-coklat', 'Anggur Ijo Coklat', 'Anggur segar berbalut cokelat', 'Cokelat', '/mochi/produk-anggur-ijo-coklat.jpg', '#B4C97F', 5000, 'Anggur hijau utuh dibalut cokelat, lalu dibungkus lagi dengan kulit mochi lembut. Anggurnya juicy, pecah saat digigit, asam segarnya jadi penyeimbang cokelat yang pekat. Ada tiga lapis tekstur: kenyal, cokelat, lalu anggur yang manis dan basah.', 'kenyal, juicy, asam segar', 6),
  ('anggur-ijo-cream', 'Anggur Ijo Cream', 'Anggur utuh dengan krim dingin', 'Buah', '/mochi/produk-anggur-ijo-cream.jpg', '#BFD48C', 5000, 'Anggur utuh duduk di tengah krim dingin yang lembut. Saat digigit, krimnya meleleh dulu, baru kemudian anggur meletus dan manis segarnya keluar sekaligus. Paduan dingin dan juicy begini cocok banget kalau mochinya disimpan di kulkas dulu sebelum dimakan.', 'dingin, anggurnya meletus juicy', 7),
  ('oreo-coklat', 'Oreo Coklat', 'Cokelat dengan remah oreo renyah', 'Cokelat', '/mochi/produk-oreo-coklat.jpg', '#A08A7E', 5000, 'Cokelat pekat menyelimuti remah oreo di dalam isian. Remahnya tidak dihaluskan semua, masih ada potongan kasar, jadi tiap gigitan ada bagian yang kriuk. Cokelatnya dalam, oreo-nya asin gurih dikit, hasilnya nggak nyendol di lidah.', 'kriuk di tengah lumer', 8),
  ('keju-coklat', 'Keju Coklat', 'Keju gurih berlapis cokelat', 'Cokelat', '/mochi/produk-keju-coklat.jpg', '#EFC97B', 5000, 'Isian keju gurih berlapis cokelat pekat. Di lidah, asinnya keju datang lebih dulu, manis cokelat menyusul pelan, dua arah rasa sekaligus. Bagi yang suka mochi manis tapi pengin ada gurih, ini yang saya rekomendasikan duluan.', 'gurih dulu, manis menyusul', 9),
  ('coklat-milo', 'Coklat Milo', 'Malt cokelat, manis yang hangat', 'Cokelat', '/mochi/produk-coklat-milo.jpg', '#B58A6B', 5000, 'Rasa mochi ini seperti susu cokelat malt yang diaduk rapi, hangat dan familiar. Manisnya bulat, ada gurih malt kecil yang tinggal di belakang, bukan manis tajam yang menusuk. Isian cokelatnya lumer pelan, jadi satu mochi bisa bertahan beberapa saat di mulut.', 'lumer pelan, ada gurih malt', 10),
  ('matcha-cream', 'Matcha Cream', 'Krim matcha pekat dan lembut', 'Matcha', '/mochi/produk-matcha-cream.jpg', '#9CB182', 5000, 'Isian krimnya pekat matcha, warnanya hijau dalam. Begitu digigit, krim meleleh pelan dan pahit khas daun tehnya tetap terasa sampai akhir. Manis dan pahit jalan beriringan sampai suapan terakhir, tidak ada yang menang telak di lidah.', 'pekat, manis pahit imbang', 11),
  ('mangga-cream', 'Mangga Cream', 'Mangga matang dengan krim manis', 'Buah', '/mochi/produk-mangga-cream.jpg', '#F2C46B', 5000, 'Daging mangga matang yang lembut ditemani krim manis dingin yang nempel pelan. Aroma mangganya keluar begitu mochi dibelah, manis wangi khas buah matang. Rasanya cerah, asam manisnya imbang, rasa mangganya tetap yang paling depan di tiap gigitan.', 'wangi, juicy, manis cerah', 12),
  ('coklat-crunchy', 'Coklat Crunchy', 'Cokelat lumer dengan kriuk di dalam', 'Cokelat', '/mochi/produk-coklat-crunchy.jpg', '#A97A55', 5000, 'Isian cokelatnya lumer, tapi di dalamnya ada potongan kriuk yang membalas tiap gigitan. Cokelatnya melumer pelan sementara bagian kriuknya tetap tahan sampai suapan terakhir. Buat yang suka cokelat tapi nggak pengin semuanya lembut, ini lawannya.', 'lumer dan kriuk barengan', 13)

on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  family = excluded.family,
  image = excluded.image,
  accent = excluded.accent,
  price = excluded.price,
  description = excluded.description,
  note = excluded.note,
  display_order = excluded.display_order,
  is_active = true,
  updated_at = now();
