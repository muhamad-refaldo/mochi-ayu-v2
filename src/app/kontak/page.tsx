import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_LINK, WHATSAPP_DISPLAY } from "@/lib/branches";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Mochi Ayu melalui WhatsApp untuk pertanyaan, pemesanan, atau informasi cabang.",
  openGraph: {
    title: "Kontak Mochi Ayu",
    description: "Hubungi kami via WhatsApp untuk pertanyaan dan pemesanan mochi.",
    images: [{ url: "/mochi/og-default.jpg", width: 1200, height: 630, alt: "Mochi Ayu" }],
  },
  twitter: { card: "summary", title: "Kontak Mochi Ayu", description: "Hubungi kami via WhatsApp untuk pertanyaan dan pemesanan." },
};

export default function KontakPage() {
  return <><Header /><a className="skip-link" href="#main">Lewati ke konten utama</a><main id="main" className="contact-page">
    <section className="contact-hero"><div className="contact-copy"><p className="eyebrow">KONTAK</p><h1>Mau tanya soal <em>mochi?</em></h1><p>Chat kami di WhatsApp untuk tanya menu, cabang, atau cara pesan.</p><a className="button-primary" href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Halo Mochi Ayu, saya mau bertanya")}`} target="_blank" rel="noopener noreferrer">Chat WhatsApp <span aria-hidden="true">↗</span></a><small>{WHATSAPP_DISPLAY}</small></div><div className="contact-art" data-parallax><Image src="/mochi/scene-kontak.jpg" alt="Maskot Mochi Ayu mengintip dari amplop merah muda" fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div></section>
    <section className="contact-note section-wrap"><p className="eyebrow">LANGSUNG CHAT</p><h2>Masih bingung mau pilih <em>rasa apa?</em></h2><p>Tanyakan pilihan rasa atau lokasi cabang lewat WhatsApp.</p><a className="contact-secondary" href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Halo Mochi Ayu, boleh tanya soal menu dan cabang?")}`} target="_blank" rel="noopener noreferrer">Tanya soal menu <span aria-hidden="true">→</span></a></section>
  </main><Footer /></>;
}
