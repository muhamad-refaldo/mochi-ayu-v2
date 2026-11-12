import type { Product } from "./products";
import { BRANCHES, WHATSAPP_NUMBER } from "./branches";

export type ProductJsonLd = {
  "@context": string; "@type": "Product"; name: string; description: string; image: string[]; sku: string;
  brand: { "@type": "Brand"; name: string };
  offers: { "@type": "Offer"; url: string; priceCurrency: "IDR"; price: number; seller: { "@type": "Organization"; name: string } };
};

export function businessStructuredData(base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: "Mochi Ayu",
    url: base.replace(/\/$/, ""),
    telephone: `+${WHATSAPP_NUMBER}`,
    priceRange: "Rp5.000/pcs",
    areaServed: BRANCHES.map((branch) => ({ "@type": "Place", name: branch.name })),
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "16:00",
      closes: "23:00",
    }],
  };
}

export function productStructuredData(product: Product, base: string): ProductJsonLd {
  const origin = base.replace(/\/$/, "");
  const productUrl = `${origin}/menu/${encodeURIComponent(product.slug)}`;
  return {
    "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.tagline,
    image: [`${origin}${product.image}`], sku: product.slug, brand: { "@type": "Brand", name: "Mochi Ayu" },
    offers: { "@type": "Offer", url: productUrl, priceCurrency: "IDR", price: product.price, seller: { "@type": "Organization", name: "Mochi Ayu" } },
  };
}



export function breadcrumbStructuredData(product: Product, base: string) {
  const origin = base.replace(/\/$/, "");
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: `${origin}/` },
    { "@type": "ListItem", position: 2, name: "Menu", item: `${origin}/menu` },
    { "@type": "ListItem", position: 3, name: product.name, item: `${origin}/menu/${encodeURIComponent(product.slug)}` },
  ] };
}

export function serializeJsonLd(value: unknown): string { return JSON.stringify(value).replace(/</g, "\\u003c"); }
