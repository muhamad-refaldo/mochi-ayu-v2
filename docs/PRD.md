# PRD — Mochi Ayu V2

**Versi dokumen:** 2.0-draft
**Tanggal:** 2026-11-09
**Status:** Menunggu review pemilik
**Project root:** `C:\Users\muham\OneDrive\Documents\projects\mochi-ayuV2`
**Project lama:** `C:\Users\muham\OneDrive\Documents\mochi_ayu` (arsip, referensi fitur saja)

---

## 1. Ringkasan Produk

| Atribut | Nilai |
|---|---|
| Nama | Mochi Ayu (V2) |
| Tipe | Website e-commerce dessert + CMS |
| Visi | Toko online premium untuk brand mochi: katalog menarik, pemesanan mudah via WhatsApp, konten bisa dikelola sendiri oleh pemilik |
| Pengguna | Pelanggan (publik), Pemilik/Admin, Content Editor |
| Bahasa | Indonesia |
| Mata uang | IDR |
| Platform | Web responsif (mobile-first) |

## 2. Tujuan Bisnis

1. Identitas online profesional dan premium.
2. Produk tampil menarik: foto besar, harga, status, varian.
3. Pemesanan sederhana: keranjang → form → WhatsApp.
4. Pemilik dapat mengubah teks, gambar, produk, promo tanpa developer.
5. Fondasi untuk ekspansi (payment gateway, stok multi-cabang) di V3.

## 3. Pengguna

### Pelanggan
- Menemukan brand (homepage, SEO, medsos).
- Menjelajah katalog: filter kategori, pencarian, urutan.
- Melihat detail produk: galeri, deskripsi, varian, harga, stok.
- Menambahkan ke keranjang, mengubah jumlah.
- Checkout: nama, nomor WhatsApp, pengambilan/pengiriman, catatan.
- Menghubungi bisnis: WA, Instagram, alamat, jam.

### Admin / Pemilik
- Login aman (invite-only, tanpa pendaftaran publik).
- Mengelola produk, kategori, varian, stok, harga, foto.
- Mengelola konten: beranda, cerita, kontak, navigasi, footer, SEO.
- Mengelola promo, testimoni, galeri.
- Melihat pesanan dan mengubah statusnya.

### Content Editor (opsional V2.2)
- Mengedit konten, galeri, testimoni, promo.
- Tidak dapat melihat data pelanggan/pesanan, tidak mengelola pengguna.

## 4. Ruang Lingkup

### Masuk (In scope)
- Halaman publik: Beranda, Menu, Detail Produk, Cerita, Promo, Kontak, Keranjang.
- Keranjang persisten (localStorage) + hitung subtotal.
- Checkout WhatsApp: validasi server, order tersimpan di database, redirect `wa.me`.
- CMS admin: login, dashboard ringkas, produk, kategori, promo, testimoni, galeri, editor konten, pengaturan global, log aktivitas.
- Animasi ringan: parallax hero, kartu tilt 3D CSS, scroll reveal, micro-interaction.
- SEO: metadata per halaman, sitemap, robots, structured data dasar.
- Aksesibilitas: keyboard, kontras AA, `prefers-reduced-motion`.

### Di luar lingkup (V3+)
- Payment gateway, loyalty, membership, delivery tracking, POS, portal pelanggan, gift card, multi-cabang stok real-time.

## 5. Fitur per Halaman

| Halaman | Rute | Fitur |
|---|---|---|
| Beranda | `/` | Announcement bar, hero interaktif (parallax + floating elements), best seller, why choose, koleksi rasa, cerita singkat, promo aktif, testimoni, CTA, footer |
| Menu | `/menu` | Grid produk, filter kategori, pencarian, urut harga/nama, badge, indikator stok, paginasi/load-more |
| Detail | `/menu/[slug]` | Galeri, nama, harga, deskripsi, varian, jumlah, status stok, related produk |
| Cerita | `/cerita` | Brand story, filosofi, bahan, nilai — konten dari DB |
| Promo | `/promo` | Promo aktif, banner, bundling, detail |
| Kontak | `/kontak` | WA, Instagram, alamat, jam, FAQ |
| Keranjang | `/keranjang` | Daftar item, ubah jumlah, hapus, subtotal, tombol checkout |
| Admin | `/admin/*` | Login, overview, produk, kategori, promo, testimoni, galeri, konten, pengaturan, log |

## 6. Alur Pemesanan

1. Pelanggan menambah produk (varian) ke keranjang.
2. Buka keranjang → checkout.
3. Isi: nama, nomor WA, tipe (pickup/delivery), alamat, catatan.
4. Server memvalidasi harga/stok dari database (tidak percaya harga dari browser).
5. Order + item tersimpan (status `pending`, bayaran `unpaid`).
6. Server generate pesan WhatsApp terformat + redirect.
7. Admin melihat order di dashboard dan memproses status.
8. Membuka WhatsApp ≠ order dibayar/dikonfirmasi.

## 7. Persyaratan Non-Fungsional

- Performa: Lighthouse mobile Perf ≥90, LCP <2.5s.
- Aksesibilitas: WCAG 2.1 AA.
- Keamanan: RLS semua tabel, validasi server (Zod), session Supabase Auth, secret hanya di server.
- Responsif: 375–1440px, touch target ≥44px.
- SEO: title/desc/OG per halaman, sitemap, robots.
- Maintainability: TypeScript strict, ESLint, struktur folder konsisten.

## 8. Stack

- Next.js App Router + TypeScript + Tailwind CSS + Framer Motion (+ GSAP ScrollTrigger bila perlu).
- Supabase (PostgreSQL, Auth, Storage, RLS).
- Vercel hosting.
- V1 TIDAK disalin implementasinya — hanya referensi fitur/aset yang disetujui.

## 9. Data yang Perlu Dikonfirmasi Pemilik

1. Daftar produk final (nama, rasa, harga, kategori, varian).
2. Foto produk asli (≥1 per varian).
3. Logo final + favicon.
4. Nomor WhatsApp resmi.
5. Alamat/jam operasional (dan apakah ada cabang di V2).
6. Testimoni asli + izin tampil.
7. Tagline resmi.
8. Akun Supabase + Vercel + domain.

## 10. Kriteria Selesai (Definition of Done per versi)

- **V2.0:** PRD disetujui, prototipe homepage interaktif (hero parallax + kartu 3D) direview dan disetujui.
- **V2.1:** Semua halaman publik render, responsif, data sementara jelas ditandai.
- **V2.2:** CMS tersambung Supabase; perubahan konten tampil di halaman publik.
- **V2.3:** Order end-to-end tersimpan; WA message benar; stok terkurangi.
- **V2.4:** QA, keamanan, performa lulus; produksi live; dokumentasi lengkap.

---

*Dokumen ini draft. Data bisnis belum terkonfirmasi — semua nilai placeholder harus diganti sebelum rilis.*