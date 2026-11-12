# Design Direction — Mochi Ayu V2

## Visual Concept: “Mochi Atelier — Soft Motion, Real Flavor”

**Karakter:** Japanese dessert editorial, ceria dan bertekstur, premium tapi tidak dingin. Identitas tidak memakai pink penuh atau template e-commerce standar. Produk aktual menjadi hero visual.

### Art Direction
- Latar dasar: rice-paper cream `#FFF8F3`.
- Tinta: deep plum `#38232C`.
- Sakura: `#E7799E` untuk CTA dan aksen.
- Berry: `#B94D70` untuk kontras/active state.
- Matcha: `#8C9D75`; yuzu: `#E6B95D` sebagai aksen produk saja.
- Hindari gradien neon/glassmorphism; bidang warna lembut, border tipis, shadow hangat.
- Typography: editorial serif untuk display, sans-serif bersih untuk UI. Prototype memakai Georgia/system fonts agar font load tidak menghalangi.

### Homepage Wireframe
1. Announcement strip — promo aktual saja (sementara hidden).
2. Header — wordmark, navigasi Menu/Cerita, cart CTA.
3. Hero 2 kolom: eyebrow editorial, headline Bahasa Indonesia, CTA; sisi kanan mochi hero + orbit dekoratif.
4. Featured selection — tiga kartu produk, foto/placeholder eksplisit.
5. Brand note — cerita singkat; isi draft, tidak mengarang klaim.
6. CTA order.
7. Footer — kontak placeholder tidak tampil sampai dikonfirmasi.

### Motion Direction
- Hero: layer parallax sedikit, hanya pointer fine; scroll-linked translation terbatas.
- Product card: CSS perspective + rotateX/Y max 6deg, spring return, image depth and soft highlight.
- Pointer effect memakai requestAnimationFrame/CSS vars, bukan render React tiap pointer event.
- Touch: tap/pressed state, no cursor tilt.
- Scroll reveal: opacity/translate small, no forced scroll/pinning.
- `prefers-reduced-motion`: static composition; no parallax, tilt, loops.
- Performance: transform/opacity only; reserve media aspect ratios, lazy load below fold.

### Interaction Prototype Acceptance
- Desktop pointer tilt bekerja dan kembali netral setelah pointer leave.
- Mobile/touch tetap menampilkan produk dan CTA tanpa interaksi hover.
- Keyboard fokus terlihat dan semua CTA berfungsi.
- Reduced-motion mematikan animasi.
- Tidak ada informasi produk/foto/klaim yang dipresentasikan sebagai fakta. Semua nama/rasa/harga demo dilabeli prototipe.

### Open Decisions
- Tagline resmi, logo, foto produk, palet final, harga dan katalog, WA, alamat, domain.
- Review visual oleh pemilik sebelum mulai halaman dan CMS lainnya.
