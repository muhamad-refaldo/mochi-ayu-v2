import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BRANCHES, SUNDAY_SPOTS } from "@/lib/branches";
import { businessStructuredData, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = { title: "Cabang Mochi Ayu", description: "Lokasi cabang rutin dan titik jualan hari Minggu Mochi Ayu." };

export default function CabangPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return <><Header /><a className="skip-link" href="#main">Lewati ke konten utama</a><main id="main" className="locations-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(businessStructuredData(siteUrl)) }} />
    <section className="locations-hero"><div><p className="eyebrow">TEMUKAN MOCHI AYU</p><h1>Mochi Ayu <em>di sekitar Bogor</em></h1><p>Ada enam cabang buka tiap hari, plus tiga titik jualan khusus Minggu pagi.</p></div><div className="locations-art" data-parallax><Image src="/mochi/scene-cabang.jpg" alt="Ilustrasi peta dekoratif Mochi Ayu" fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div></section>
    <section className="location-groups section-wrap"><div className="location-group"><div className="location-heading"><p className="eyebrow">BUKA SETIAP HARI</p><h2>Cabang rutin</h2><p>Setiap hari · 16.00–23.00</p></div><div className="location-list">{BRANCHES.map((b)=><article className="location-card" key={b.slug}><span className="location-pin" aria-hidden="true">✿</span><div><h3>{b.name}</h3><p>Setiap hari · {b.hours}</p></div></article>)}</div></div>
    <div className="location-group sunday-group"><div className="location-heading"><p className="eyebrow">HARI MINGGU SAJA</p><h2>Titik jualan Minggu</h2><p>Minggu · 06.00–10.30</p></div><div className="location-list">{SUNDAY_SPOTS.map((b)=><article className="location-card" key={b.slug}><span className="location-pin sunday-pin" aria-hidden="true">✿</span><div><h3>{b.name}</h3><p>Hari Minggu · {b.hours}</p></div></article>)}</div></div><p className="location-note">Gambar di atas cuma ilustrasi, bukan peta arah atau jarak sebenarnya.</p></section>
  </main><Footer /></>;
}
