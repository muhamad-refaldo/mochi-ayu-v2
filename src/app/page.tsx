import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { FEATURED_SLUGS, getProduct } from "@/lib/products";
import { BRANCHES, SUNDAY_SPOTS, WHATSAPP_LINK, WHATSAPP_DISPLAY } from "@/lib/branches";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroStatic from "@/components/HeroStatic";
import HeroParallaxClient from "@/components/HeroParallaxClient";
import ProductCard from "@/components/home/ProductCard";

const values = [
  { title: "Bahan pilihan", text: "Kami memilih bahan untuk setiap rasa Mochi Ayu." },
  { title: "Dibuat dengan teliti", text: "Setiap mochi disiapkan satu per satu." },
  { title: "Banyak pilihan rasa", text: "Pilih rasa yang paling cocok buatmu." },
];

const processSteps = [
  { title: "Siapkan bahan", image: "/mochi/proses-1-bahan.jpg" },
  { title: "Buat adonan", image: "/mochi/proses-2-adonan.jpg" },
  { title: "Isi dan bentuk", image: "/mochi/proses-3-isi-bentuk.jpg" },
  { title: "Siap dinikmati", image: "/mochi/proses-4-siap-dinikmati.jpg" },
 ];

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) => getProduct(slug)).filter((p) => p !== undefined);
  const steps = processSteps;
  return <main>
    <Header />
    <a className="skip-link" href="#main">Lewati ke konten utama</a>
    <HeroStatic />
    <HeroParallaxClient />

    <section className="home-featured section-wrap">
      <div className="section-heading"><div><p className="eyebrow">PILIHAN FAVORIT</p><h2>Empat rasa yang <em>sering dipesan</em></h2></div><Link className="section-cta" href="/menu">Lihat semua rasa <ArrowRight size={16}/></Link></div>
      <div className="home-product-grid">{featured.map((p) => <ProductCard p={p} key={p.slug} />)}</div>
    </section>

    <section className="home-story"><div className="story-photo" data-parallax><Image src="/mochi/proses-3-isi-bentuk.jpg" alt="Mochi dibentuk dengan tangan" fill sizes="(max-width: 760px) 90vw, 45vw"/></div><div className="story-copy-block"><p className="eyebrow">CERITA KAMI</p><h2>Berawal dari lapak <em>martabak</em></h2><p>Dulu kami jualan martabak dekat Stadion Pakansari. Sekarang fokus bikin mochi, masih dikerjakan bareng keluarga.</p><Link className="button-text" href="/cerita">Baca ceritanya <ArrowRight size={16}/></Link></div><span className="story-flower" aria-hidden="true">✿</span></section>

    <section className="home-values section-wrap"><div className="section-heading centered"><div><p className="eyebrow">CARA KAMI BIKIN</p><h2>Dibuat dengan <em>teliti</em></h2></div></div><div className="value-list">{values.map((item, i)=><article key={item.title}><span className="value-emoji">{["🍓","♡","✿"][i]}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>

    <section className="home-process section-wrap"><div className="section-heading centered"><div><p className="eyebrow">DARI DAPUR MOCHI AYU</p><h2>Empat langkah, <em>dari dapur</em></h2></div></div><div className="process-grid">{steps.map((step, i)=><article className="process-card" key={step.title}><div className="process-card-image"><Image src={step.image} alt={step.title} fill sizes="(max-width: 700px) 80vw, 25vw"/></div><span className="step-number">0{i+1}</span><h3>{step.title}</h3>{i<steps.length-1&&<span className="process-connector" aria-hidden="true">›</span>}</article>)}</div></section>



    <section className="home-branches section-wrap" aria-labelledby="branches-title">
      <div className="section-heading"><div><p className="eyebrow">MOCHI AYU DI BOGOR</p><h2 id="branches-title">Cabang dan <em>titik jualan</em></h2></div></div>
      <div className="branches-content">
        <div className="branches-art"><Image src="/mochi/scene-cabang.jpg" alt="Ilustrasi peta dekoratif Mochi Ayu" fill sizes="(max-width: 760px) 90vw, 40vw" /></div>
        <div className="branches-list-wrap">
          <h3>Cabang rutin <span>Setiap hari · 16.00–23.00</span></h3>
          <div className="branches-preview">{BRANCHES.map((branch)=><div className="branch-preview" key={branch.slug}><MapPin size={19}/><span>{branch.name}</span><small>Setiap hari · {branch.hours}</small></div>)}</div>
          <h3 className="sunday-title">Titik jualan hari Minggu <span>Minggu · 06.00–10.30</span></h3>
          <div className="branches-preview sunday-preview">{SUNDAY_SPOTS.map((spot)=><div className="branch-preview" key={spot.slug}><MapPin size={19}/><span>{spot.name}</span><small>Hari Minggu · {spot.hours}</small></div>)}</div>
          <a className="button-primary branch-question" href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Halo Mochi Ayu, saya mau tanya lokasi cabang")}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/> Tanya lokasi lewat WhatsApp</a><small className="whatsapp-number">{WHATSAPP_DISPLAY}</small>
        </div>
      </div>
    </section>

    <section className="home-cta"><div className="cta-copy"><p className="eyebrow">MAU PESAN?</p><h2>Chat aja <em>lewat WhatsApp</em></h2><a href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Halo Mochi Ayu, saya mau tanya dan pesan mochi")}`} target="_blank" rel="noopener noreferrer" className="button-primary">Tanya & pesan <ArrowRight size={17}/></a></div><div className="cta-art"><Image src="/mochi/cta-mochi-hati.jpg" alt="Mochi memeluk hati merah muda" fill sizes="(max-width: 760px) 90vw, 40vw"/></div><span className="cta-deco" aria-hidden="true">♡</span></section>
    <Footer />
  </main>;
}
