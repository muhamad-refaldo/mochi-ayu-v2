# Aktivasi dashboard admin

1. Jalankan `supabase/migrations/0002_admin_rls.sql` di SQL Editor project Supabase yang sama dengan `.env.local`. Jangan tempel UUID placeholder sebagai query aktif.
2. Buat atau temukan akun admin melalui **Authentication → Users**. Salin **User UID** (bukan email).
3. Di SQL Editor, jalankan `insert into public.admin_users(user_id) values ('UUID_AKUN_ADMIN') on conflict do nothing;` dengan UUID akun tersebut. Hanya pemilik project dengan akses SQL Editor boleh melakukan ini. Jangan buat kebijakan insert publik untuk `admin_users`.
4. Masuk melalui `/admin/login`. Dashboard hanya terbuka untuk akun terdaftar; produk aktif tetap bisa dibaca publik, sedangkan produk nonaktif dan pesanan hanya bisa dibaca admin. Simpan/edit/hapus produk memerlukan kebijakan RLS admin.
5. Pesanan WhatsApp **tidak** otomatis tercatat ke tabel `orders`. Tampilan pesanan bersifat baca-saja dan menampilkan maksimum 100 pesanan terakhir yang memang tersimpan di database. Jangan anggap chat WhatsApp sebagai pesanan terkonfirmasi.

Tidak memerlukan service-role key di aplikasi. Jangan taruh secret/service-role key pada variabel `NEXT_PUBLIC_*`. Migrasi tidak diterapkan otomatis oleh build; verifikasi akses dengan akun admin dan akun non-admin setelah menjalankannya.
