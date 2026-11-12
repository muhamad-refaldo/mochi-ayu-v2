import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroStatic() {
  return (
    <section id="main" className="home-hero">
      <div className="hero-grain" aria-hidden="true" />
      <div className="home-hero-copy" style={{ opacity: 1 }}>
        <p className="eyebrow hero-eyebrow">Mochi Ayu · sejak 2022</p>
                                <h1>
                                  Mochi lembut, cerita <em>dari Pakansari</em>
                                </h1>
                                <p className="hero-lede">
                                  Dulu jualan martabak dekat Stadion Pakansari. Sekarang fokus bikin mochi dengan 13 pilihan rasa.
                                </p>
        <div className="hero-actions">
          <Link className="button-primary" href="/menu">
            Jelajahi Menu <ArrowRight size={17} />
          </Link>
          <Link className="button-text" href="/cerita">
            Cerita Kami <ArrowRight size={15} />
          </Link>
        </div>
        <div className="home-hero-caption">
          <span>手作りのやさしさ</span>
          <span>Manis kecil, bahagia besar</span>
        </div>
      </div>
      <div className="home-hero-art">
        <picture className="home-hero-picture">
          <source
            media="(max-width: 760px)"
            srcSet="/mochi/scene-hero-mobile-800.webp"
            type="image/webp"
          />
          <img
            src="/mochi/scene-hero-desktop.jpg"
            alt="Maskot Mochi Ayu di taman Jepang dengan bunga sakura"
            width="1672"
            height="941"
            fetchPriority="high"
            className="home-hero-image"
          />
        </picture>
        <span className="hero-sticker sticker-top">Dibuat dengan ♡</span>
        <span className="hero-sticker sticker-bottom">Mochi dari Bogor</span>
      </div>
      <span className="hero-flower flower-left" aria-hidden="true">
        ✿
      </span>
      <span className="hero-flower flower-right" aria-hidden="true">
        ❀
      </span>
      <span className="hero-petal petal-one" aria-hidden="true">
        ✿
      </span>
      <span className="hero-petal petal-two" aria-hidden="true">
        ✿
      </span>
      <span className="hero-petal petal-three" aria-hidden="true">
        ✿
      </span>
      <span className="hero-petal petal-four" aria-hidden="true">
        ✿
      </span>
      <span className="hero-orb orb-one" aria-hidden="true" />
      <span className="hero-orb orb-two" aria-hidden="true" />
    </section>
  );
}