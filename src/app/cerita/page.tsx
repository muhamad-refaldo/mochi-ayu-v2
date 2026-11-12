import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cerita Mochi Ayu",
  description: "Cerita keluarga Mochi Ayu: berawal dari jualan martabak manis dan telur dekat Stadion Pakansari pada 2022, lalu beralih fokus ke mochi dan berkembang hingga enam cabang.",
  openGraph: {
    title: "Cerita Mochi Ayu — Dari Martabak ke Mochi",
    description: "Cerita keluarga Mochi Ayu: berawal dari jualan martabak manis dan telur di dekat Stadion Pakansari pada 2022.",
    images: [{ url: "/mochi/og-cerita.jpg", width: 1200, height: 630, alt: "Cerita Mochi Ayu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cerita Mochi Ayu",
    description: "Dari martabak ke mochi, perjalanan keluarga Mochi Ayu sejak 2022.",
    images: ["/mochi/og-cerita.jpg"],
  },
};

const processPhotos = [
  { title: "Bahan pilihan", image: "/mochi/proses-1-bahan.jpg", caption: "Awal perjalanan satu mochi." },
  { title: "Adonan", image: "/mochi/proses-2-adonan.jpg", caption: "Adonan disiapkan untuk dibentuk." },
  { title: "Dibentuk", image: "/mochi/proses-3-isi-bentuk.jpg", caption: "Mochi dibentuk satu per satu." },
  { title: "Siap dinikmati", image: "/mochi/proses-4-siap-dinikmati.jpg", caption: "Bagian manis dari perjalanan kami." },
];

export default function CeritaPage() {
  return (
    <>
      <Header />
      <a className="skip-link" href="#main">Lewati ke konten utama</a>
      <main id="main" className="story-page">
        <section className="story-hero">
          <div className="story-hero-image" data-parallax>
            <Image src="/mochi/scene-cerita-desktop.jpg" alt="Cerita Mochi Ayu" fill priority sizes="(max-width: 760px) 100vw, 52vw" />
            <Image src="/mochi/scene-cerita-mobile.jpg" alt="Cerita Mochi Ayu" fill priority className="mobile-only" sizes="(max-width: 600px) 100vw" />
          </div>
          <div className="story-hero-copy">
            <p className="eyebrow">CERITA KAMI · SEJAK 2022</p>
            <h1>Dari martabak jadi <em>mochi</em></h1>
            <p>
              Dulu kami jualan martabak manis dan telur di dekat Stadion Pakansari.
              Ramainya sambutan membuat kami coba bikin mochi. Sekarang sudah enam cabang.
            </p>
            <div className="story-stats">
              <span><strong>2022</strong> mulai berjualan</span>
              <span><strong>6</strong> cabang</span>
            </div>
            <a className="button-primary" href="#perjalanan">Baca terus <ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="perjalanan" className="story-origin section-wrap">
          <div className="story-origin-image" data-parallax>
            <Image src="/mochi/proses-4-siap-dinikmati.jpg" alt="Mochi Ayu siap dinikmati" fill sizes="(max-width: 760px) 90vw, 42vw" />
          </div>
          <div className="story-origin-copy">
            <p className="eyebrow">MULAI DI PAKANSARI</p>
            <h2>Satu langkah, <em>babak baru</em></h2>
            <p className="story-origin-text">
              Sebelum Mochi Ayu, kami sekeluarga jualan martabak. Karena rumah dekat Stadion Pakansari,
              kami coba buka lapak di situ. Sambutan ramai jadi pendorong buat lanjut usaha mochi.
            </p>
          </div>
        </section>

        <section className="story-values section-wrap">
          <div className="section-heading centered">
            <div><p className="eyebrow">PERJALANAN KAMI</p><h2>Dari satu lapak, <em>tumbuh bareng</em></h2></div>
          </div>
          <div className="story-value-list">
            <article><span>2022</span><h3>Awal mulanya</h3><p>Buka lapak martabak di dekat Pakansari.</p></article>
            <article><span>♡</span><h3>Usaha keluarga</h3><p>Dikerjakan bersama dari awal sampai sekarang.</p></article>
            <article><span>6</span><h3>Enam cabang</h3><p>Sekarang sudah ada enam titik jualan.</p></article>
          </div>
        </section>

        <section className="story-journey">
          <div className="story-journey-inner">
            <div className="story-journey-heading">
              <p className="eyebrow">TIMELINE SINGKAT</p>
              <h2>Dari 2022 <em>sampai sekarang</em></h2>
              <p>Tiga babak utama perjalanan kami.</p>
            </div>
            <ol className="story-milestones">
              <li>
                <span className="story-year">2022</span>
                <div><h3>Buka di Pakansari</h3><p>Keluarga kami mulai jualan martabak di dekat Stadion Pakansari.</p></div>
              </li>
              <li>
                <span className="story-year">Babak baru</span>
                <div><h3>Coba bikin mochi</h3><p>Ramainya martabak dorong kami bikin mochi.</p></div>
              </li>
              <li>
                <span className="story-year">Sekarang</span>
                <div><h3>Fokus Mochi Ayu</h3><p>Sudah enam cabang dan masih berkembang.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="story-process section-wrap">
          <div className="section-heading centered">
            <div><p className="eyebrow">DI BALIK MOCHI AYU</p><h2>Dari dapur, untuk <em>dinikmati</em></h2></div>
          </div>
          <div className="story-process-grid">
            {processPhotos.map((item, index) => (
              <article className="story-process-card" key={item.title}>
                <div className="story-process-image">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 88vw, (max-width: 1000px) 44vw, 23vw" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{item.title}</h3><p>{item.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="story-closing">
          <p className="eyebrow">LANJUTKAN CERITANYA</p>
          <h2>Temukan rasa <em>favoritmu</em></h2>
          <p>Terima kasih sudah menjadi bagian dari perjalanan Mochi Ayu.</p>
          <Link className="button-primary" href="/menu">Lihat menu mochi <ArrowRight size={17} /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}