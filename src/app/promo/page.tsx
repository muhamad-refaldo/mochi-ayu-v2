import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, ShoppingBag, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Promo — Mochi Ayu",
  description: "Belum ada promo aktif. Jelajahi pilihan rasa Mochi Ayu di halaman menu.",
};

export default function PromoPage() {
  return (
    <>
      <Header />
      <main className="promo-page" id="main">
        <a className="skip-link" href="#promo-content">Lewati ke konten utama</a>
        <section className="promo-shell" id="promo-content" aria-labelledby="promo-title">
          <div className="promo-copy">
            <span className="promo-kicker"><Sparkles size={16} aria-hidden="true" /> KABAR MANIS</span>
            <h1 id="promo-title">Promo baru?<br /><em>Belum ada, nih.</em></h1>
            <p>Untuk sekarang belum ada promo yang aktif. Sambil menunggu kabar berikutnya, kamu tetap bisa pilih mochi favoritmu di menu.</p>
            <div className="promo-actions">
              <Link className="button-primary promo-primary" href="/menu">Jelajahi menu <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="promo-secondary" href="/keranjang"><ShoppingBag size={18} aria-hidden="true" /> Lihat keranjang</Link>
            </div>
            <div className="promo-note"><Bell size={18} aria-hidden="true" /><span>Kalau nanti ada promo, informasinya akan tampil di halaman ini.</span></div>
          </div>
          <div className="promo-visual" aria-hidden="true">
            <div className="promo-visual-frame">
              <Image src="/mochi/scene-menu.jpg" alt="" fill sizes="(max-width: 760px) 90vw, 43vw" priority />
            </div>
            <span className="promo-visual-stamp">sedikit manis<br />untuk harimu ♡</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}