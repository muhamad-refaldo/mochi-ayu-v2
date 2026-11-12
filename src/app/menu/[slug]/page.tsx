import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductStage from "./ProductStage";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatRupiah } from "@/lib/products";
import { fetchActiveProductsServer, fetchProductBySlugServer } from "@/lib/supabase/server";
import { WHATSAPP_LINK, WHATSAPP_DISPLAY } from "@/lib/branches";
import { breadcrumbStructuredData, productStructuredData, serializeJsonLd } from "@/lib/structured-data";

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await fetchActiveProductsServer();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlugServer(slug);
  if (!product) notFound();
  return {
    title: `${product.name} — Mochi Ayu`,
    description: product.tagline,
    robots: { index: true, follow: true },
    alternates: { canonical: `/menu/${slug}` },
    openGraph: {
      title: `${product.name} — Mochi Ayu`,
      description: product.tagline,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Mochi Ayu`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<DetailFallback />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

function DetailFallback() {
  return (
    <main className="product-detail-page" aria-busy="true">
      <Header />
      <section className="product-hero">
        <div className="product-stage product-stage-skeleton" />
        <div className="product-hero-copy">
          <p className="eyebrow product-family">Mochi Ayu</p>
          <h1>Memuat rasa…</h1>
        </div>
      </section>
      <Footer />
    </main>
  );
}

async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlugServer(slug);
  if (!product) notFound();

  const waText = encodeURIComponent(
    `Halo Mochi Ayu, saya mau pesan ${product.name} (${formatRupiah(product.price)}/pcs). Boleh info stok dan cara pesan?`
  );
  const waLink = `${WHATSAPP_LINK}?text=${waText}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <main className="product-detail-page">
      <JsonLd data={productStructuredData(product, siteUrl)} />
      <JsonLd data={breadcrumbStructuredData(product, siteUrl)} />
      <Header />
      <a className="skip-link" href="#product-main">
        Lewati ke konten utama
      </a>

      <section id="product-main" className="product-hero">
        <ProductStage product={product} />

        <div className="product-hero-copy">
          <p className="eyebrow product-family">{product.family}</p>
          <h1>{product.name}</h1>
          <p className="product-tagline">{product.tagline}</p>

          <div
            className="product-accent-line"
            aria-hidden="true"
            style={{ background: product.accent }}
          />

          {product.description ? (
            <p className="product-description">{product.description}</p>
          ) : null}

          {product.note ? <p className="product-note">{product.note}</p> : null}

          <p className="product-price">
            {formatRupiah(product.price)}
            <span> / pcs</span>
          </p>

          <div className="product-cta-stack">
            <AddToCartButton product={product} />
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary product-wa-btn"
            >
              Pesan via WhatsApp
            </a>
            <small className="product-wa-number">
              <span aria-hidden="true">📱</span> {WHATSAPP_DISPLAY}
            </small>
          </div>

          <p className="product-detail-note">
            Mau jumlah banyak atau ambil di cabang? Bilang aja lewat WhatsApp.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}