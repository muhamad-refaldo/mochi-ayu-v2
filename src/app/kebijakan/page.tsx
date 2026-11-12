import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WHATSAPP_DISPLAY } from "@/lib/branches";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi website Mochi Ayu. Website ini tidak menyimpan data pribadi pengunjung dan tidak memasang cookie pelacakan.",
  openGraph: {
    title: "Kebijakan Privasi — Mochi Ayu",
    description: "Kami menjaga privasi kamu. Website ini tidak menyimpan data pribadi dan tidak memasang cookie pelacakan.",
    images: [{ url: "/mochi/og-default.jpg", width: 1200, height: 630, alt: "Mochi Ayu" }],
  },
  twitter: {
    card: "summary",
    title: "Kebijakan Privasi — Mochi Ayu",
    description: "Kami menjaga privasi kamu.",
  },
};

export default function KebijakanPage() {
  return (
    <>
      <Header />
      <a className="skip-link" href="#main">Lewati ke konten utama</a>
      <main id="main" className="policy-page">
        <section className="policy-inner">
          <p className="eyebrow">KEBIJAKAN PRIVASI</p>
          <h1>Kami jaga <em>privasi</em> kamu</h1>

          <h2>Data yang kami kumpulkan</h2>
          <p>
            Website ini tidak menyimpan data pribadi pengunjung. Kami tidak memakai formulir pendaftaran,
            akun, atau pelacakan iklan.
          </p>

          <h2>Pesan WhatsApp</h2>
          <p>
            Jika kamu menghubungi kami lewat WhatsApp, nomor dan isi pesanmu diproses oleh WhatsApp sesuai
            kebijakan privasi mereka. Kami hanya memakai informasi itu untuk menjawab pertanyaan dan
            memproses pesananmu.
          </p>

          <h2>Cookie</h2>
          <p>Website ini tidak memasang cookie pelacakan.</p>

          <h2>Pertanyaan</h2>
          <p>
            Ada pertanyaan soal privasi? Hubungi kami di WhatsApp {WHATSAPP_DISPLAY}.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}