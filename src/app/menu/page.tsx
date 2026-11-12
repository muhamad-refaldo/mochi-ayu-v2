"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { FAMILIES, PRODUCTS, type FlavorFamily, formatRupiah, type Product } from "@/lib/products";
import { fetchActiveProducts } from "@/lib/supabase/products";
import { productImageSrc } from "@/lib/product-image";

const filters: ("Semua" | FlavorFamily)[] = ["Semua", ...FAMILIES];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [family, setFamily] = useState<(typeof filters)[number]>("Semua");
  const [query, setQuery] = useState("");
  useEffect(() => {
    let active = true;
    fetchActiveProducts().then((rows) => {
      if (active && rows.length) setProducts(rows);
    }).catch((error) => console.error("Supabase catalog unavailable; using bundled catalog", error));
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => products.filter((product) => {
    const matchesFamily = family === "Semua" || product.family === family;
    const matchesQuery = `${product.name} ${product.tagline}`.toLocaleLowerCase("id-ID").includes(query.toLocaleLowerCase("id-ID").trim());
    return matchesFamily && matchesQuery;
  }), [products, family, query]);

  return <main className="menu-page">
    <Header />
    <a className="skip-link" href="#menu-main">Lewati ke konten utama</a>
    <div className="menu-bg" aria-hidden="true">
      <Image src="/mochi/scene-menu.jpg" alt="" fill priority sizes="100vw" />
    </div>
    <section className="menu-intro" id="menu-main">
      <p className="eyebrow">MENU MOCHI AYU</p>
      <h1>13 rasa, <em>pilih yang kamu suka</em></h1>
      <p>Semua rasa Rp 5.000/pcs. Tinggal pilih, masukkan keranjang, checkout lewat WhatsApp.</p>
      <div className="menu-meta"><span>13 pilihan rasa</span></div>
    </section>
    <section className="menu-catalog" aria-label="Katalog mochi">
      <div className="menu-toolbar">
        <div className="menu-filters" role="group" aria-label="Filter kategori">
          <SlidersHorizontal size={16} aria-hidden="true" />
          {filters.map((option) => <button key={option} type="button" className={`menu-filter${family === option ? " is-active" : ""}`} aria-pressed={family === option} onClick={() => setFamily(option)}>{option}</button>)}
        </div>
        <label className="menu-search"><Search size={17} aria-hidden="true"/><span className="sr-only">Cari rasa</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari rasa..." /></label>
      </div>
      <p className="menu-result-count" aria-live="polite">Menampilkan {filtered.length} dari {products.length} rasa</p>
      {filtered.length ? <div className="menu-grid">{filtered.map((product, index) => <article className="menu-card" key={product.slug}>
        <Link href={`/menu/${product.slug}`} className="menu-card-detail-link" aria-label={`Lihat detail ${product.name}`}>
          <div className="menu-card-image"><Image src={productImageSrc(product, 480)} alt={product.name} fill sizes="(max-width: 600px) 46vw, (max-width: 900px) 30vw, 22vw" loading="lazy" /><span className="menu-index">{String(index + 1).padStart(2, "0")}</span></div>
          <div className="menu-card-copy"><span className="menu-family">{product.family}</span><h2>{product.name}</h2><p>{product.tagline}</p></div>
        </Link>
        <div className="menu-card-bottom"><strong>{formatRupiah(product.price)}<small> / pcs</small></strong><AddToCartButton product={product} compact /></div>
      </article>)}</div> : <div className="menu-empty"><h2>Rasa belum ditemukan</h2><p>Coba kata kunci atau kategori lain.</p><button type="button" className="menu-reset" onClick={() => { setQuery(""); setFamily("Semua"); }}>Reset pencarian</button></div>}
    </section>
    <Footer />
  </main>;
}
