-- Tahap 9: refresh Indonesian copy for existing catalog rows. Apply to Supabase after review.
-- Source of truth: src/lib/products.ts.

update public.products set tagline = 'Stroberi dan cokelat', description = 'Stroberi dan cokelat dalam satu mochi. Buat yang suka perpaduan rasa buah dan cokelat.', note = null where slug = 'strawberry-coklat';
update public.products set tagline = 'Stroberi dengan krim', description = 'Stroberi bertemu krim dalam mochi ini. Pilihan buat kamu yang lagi pengin rasa buah dan krim.', note = null where slug = 'strawberry-cream';
update public.products set tagline = 'Biskuit dan krim', description = 'Krim dan biskuit dalam satu pilihan rasa. Kalau suka cookies & cream, coba versi mochinya.', note = null where slug = 'cookies-and-cream';
update public.products set tagline = 'Rasa matcha', description = 'Buat yang suka matcha dan ingin rasa teh hijau di pilihan mochinya.', note = null where slug = 'matcha';
update public.products set tagline = 'Rasa tiramisu', description = 'Rasa tiramisu dalam bentuk mochi. Pilih ini kalau kamu lagi pengin rasa kopi dan cokelat.', note = null where slug = 'tiramisu';
update public.products set tagline = 'Anggur hijau dan cokelat', description = 'Anggur hijau dan cokelat jadi satu pilihan rasa. Cocok buat yang suka kombinasi buah dan cokelat.', note = null where slug = 'anggur-ijo-coklat';
update public.products set tagline = 'Anggur hijau dengan krim', description = 'Anggur hijau dan krim dalam satu mochi. Pilih ini kalau kamu lagi ingin rasa buah dengan sentuhan krim.', note = null where slug = 'anggur-ijo-cream';
update public.products set tagline = 'Oreo dan cokelat', description = 'Oreo dan cokelat dalam satu mochi. Dua rasa yang akrab buat pencinta cokelat.', note = null where slug = 'oreo-coklat';
update public.products set tagline = 'Keju dan cokelat', description = 'Keju dan cokelat dalam satu mochi. Buat kamu yang suka rasa manis sekaligus gurih.', note = null where slug = 'keju-coklat';
update public.products set tagline = 'Cokelat Milo', description = 'Milo dan cokelat dalam satu pilihan mochi. Rasa yang sudah akrab, sekarang bisa kamu pilih di menu.', note = null where slug = 'coklat-milo';
update public.products set tagline = 'Matcha dengan krim', description = 'Matcha bertemu krim dalam satu mochi. Kalau suka matcha tapi ingin pilihan yang lebih creamy, coba yang ini.', note = null where slug = 'matcha-cream';
update public.products set tagline = 'Mangga dengan krim', description = 'Mangga dan krim dalam satu mochi. Buat kamu yang lagi mencari pilihan rasa buah.', note = null where slug = 'mangga-cream';
update public.products set tagline = 'Cokelat crunchy', description = 'Cokelat dengan sentuhan crunchy. Pilihan buat yang suka cokelat dan ingin ada sedikit kriuk.', note = null where slug = 'coklat-crunchy';

do $$ begin
  if (select count(*) from public.products where slug in ('strawberry-coklat', 'strawberry-cream', 'cookies-and-cream', 'matcha', 'tiramisu', 'anggur-ijo-coklat', 'anggur-ijo-cream', 'oreo-coklat', 'keju-coklat', 'coklat-milo', 'matcha-cream', 'mangga-cream', 'coklat-crunchy')) <> 13 then
    raise exception 'Expected 13 catalog products before updating copy';
  end if;
end $$;
