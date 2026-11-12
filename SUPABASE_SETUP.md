# Supabase Setup Guide — Mochi Ayu V2

## 1. Buat project Supabase (gratis)

1. Buka https://supabase.com → **Start your project** → Sign in dengan GitHub
2. Klik **New project**
   - Organization: pilih atau buat baru
   - Name: `mochi-ayu-v2`
   - Database Password: **simpan di password manager** (ini jadi `SUPABASE_DB_PASSWORD`)
   - Region: **Singapore (ap-southeast-1)** — paling dekat ke Indonesia
   - Pricing plan: **Free**
3. Klik **Create new project** → tunggu 1–2 menit

## 2. Ambil credentials

Masuk ke project → **Settings** (ikon gear kiri bawah) → **API**

Copy 2 nilai ini:
- **Project URL** → jadi `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** key → jadi `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Juga ambil:
- **Settings** → **Database** → **Connection string** → **URI** (yang diawali `postgresql://`)
  - Ganti `[YOUR-PASSWORD]` dengan password database tadi
  - Ini jadi `SUPABASE_DB_URL` (untuk migrasi/CLI)

## 3. Setup env di laptop

```bash
cd C:/Users/muham/OneDrive/Documents/projects/mochi-ayuV2
cp .env.example .env.local  # kalau belum ada, bikin manual
```

Isi `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_DB_URL=postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres
ADMIN_PASSWORD=ganti_dengan_password_kuat_123
```

> ⚠️ Jangan commit `.env.local`. Sudah di `.gitignore`.

## 4. Jalankan migrasi (aku yang bikin)

Nanti aku kirim file migrasi SQL. Kamu tinggal:
```bash
# Install Supabase CLI (satu kali)
npm i -g supabase

# Login (browser terbuka)
supabase login

# Link ke project kamu
supabase link --project-ref <project-ref-dari-url>

# Push migrasi
supabase db push
```

Atau kalau mau lewat dashboard: **SQL Editor** → **New query** → paste migrasi → **Run**.

## 5. Deploy ke Vercel (nanti)

Di Vercel project settings → **Environment Variables** → tambahkan 4 variable di atas (tanpa `SUPABASE_DB_URL` kalau gak butuh migrasi di CI).

---

## Yang aku butuh dari kamu

Cukup **langkah 1–3** di atas. Kasih aku:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Password database dan `ADMIN_PASSWORD` **jangan dikirim** — simpan sendiri.

Nanti aku:
1. Bikin migrasi SQL (products, orders, admin sessions)
2. Bikin Supabase client (`src/lib/supabase/*`)
3. Migrasiin data produk dari `products.ts` ke database
4. Bikin middleware auth + halaman admin
5. Update frontend ambil data dari Supabase

Lanjut? Kalau sudah bikin project Supabase, kirim 2 key di atas.