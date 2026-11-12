export type FlavorFamily = "Cream" | "Cokelat" | "Buah" | "Matcha";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  family: FlavorFamily;
  image: string;
  accent: string;
  price: number;
  description?: string;
  note?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "strawberry-coklat",
    name: "Strawberry Coklat",
    tagline: "Stroberi dan cokelat",
    family: "Cokelat",
    image: "/mochi/produk-stroberi.jpg",
    accent: "#E9A8B8",
    price: 5000,
    description: "Stroberi dan cokelat dalam satu mochi. Buat yang suka perpaduan rasa buah dan cokelat.",
    
  },
  {
    slug: "strawberry-cream",
    name: "Strawberry Cream",
    tagline: "Stroberi dengan krim",
    family: "Buah",
    image: "/mochi/produk-strawberry-cream.jpg",
    accent: "#F2A9BC",
    price: 5000,
    description: "Stroberi bertemu krim dalam mochi ini. Pilihan buat kamu yang lagi pengin rasa buah dan krim.",
    
  },
  {
    slug: "cookies-and-cream",
    name: "Cookies & Cream",
    tagline: "Biskuit dan krim",
    family: "Cream",
    image: "/mochi/produk-cookies-cream.jpg",
    accent: "#C9B7AE",
    price: 5000,
    description: "Krim dan biskuit dalam satu pilihan rasa. Kalau suka cookies & cream, coba versi mochinya.",
    
  },
  {
    slug: "matcha",
    name: "Matcha",
    tagline: "Rasa matcha",
    family: "Matcha",
    image: "/mochi/produk-matcha.jpg",
    accent: "#A9B99C",
    price: 5000,
    description: "Buat yang suka matcha dan ingin rasa teh hijau di pilihan mochinya.",
    
  },
  {
    slug: "tiramisu",
    name: "Tiramisu",
    tagline: "Rasa tiramisu",
    family: "Cream",
    image: "/mochi/produk-tiramisu.jpg",
    accent: "#B99B87",
    price: 5000,
    description: "Rasa tiramisu dalam bentuk mochi. Pilih ini kalau kamu lagi pengin rasa kopi dan cokelat.",
    
  },
  {
    slug: "anggur-ijo-coklat",
    name: "Anggur Ijo Coklat",
    tagline: "Anggur hijau dan cokelat",
    family: "Cokelat",
    image: "/mochi/produk-anggur-ijo-coklat.jpg",
    accent: "#B4C97F",
    price: 5000,
    description: "Anggur hijau dan cokelat jadi satu pilihan rasa. Cocok buat yang suka kombinasi buah dan cokelat.",
    
  },
  {
    slug: "anggur-ijo-cream",
    name: "Anggur Ijo Cream",
    tagline: "Anggur hijau dengan krim",
    family: "Buah",
    image: "/mochi/produk-anggur-ijo-cream.jpg",
    accent: "#BFD48C",
    price: 5000,
    description: "Anggur hijau dan krim dalam satu mochi. Pilih ini kalau kamu lagi ingin rasa buah dengan sentuhan krim.",
    
  },
  {
    slug: "oreo-coklat",
    name: "Oreo Coklat",
    tagline: "Oreo dan cokelat",
    family: "Cokelat",
    image: "/mochi/produk-oreo-coklat.jpg",
    accent: "#A08A7E",
    price: 5000,
    description: "Oreo dan cokelat dalam satu mochi. Dua rasa yang akrab buat pencinta cokelat.",
    
  },
  {
    slug: "keju-coklat",
    name: "Keju Coklat",
    tagline: "Keju dan cokelat",
    family: "Cokelat",
    image: "/mochi/produk-keju-coklat.jpg",
    accent: "#EFC97B",
    price: 5000,
    description: "Keju dan cokelat dalam satu mochi. Buat kamu yang suka rasa manis sekaligus gurih.",
    
  },
  {
    slug: "coklat-milo",
    name: "Coklat Milo",
    tagline: "Cokelat Milo",
    family: "Cokelat",
    image: "/mochi/produk-coklat-milo.jpg",
    accent: "#B58A6B",
    price: 5000,
    description: "Milo dan cokelat dalam satu pilihan mochi. Rasa yang sudah akrab, sekarang bisa kamu pilih di menu.",
    
  },
  {
    slug: "matcha-cream",
    name: "Matcha Cream",
    tagline: "Matcha dengan krim",
    family: "Matcha",
    image: "/mochi/produk-matcha-cream.jpg",
    accent: "#9CB182",
    price: 5000,
    description: "Matcha bertemu krim dalam satu mochi. Kalau suka matcha tapi ingin pilihan yang lebih creamy, coba yang ini.",
    
  },
  {
    slug: "mangga-cream",
    name: "Mangga Cream",
    tagline: "Mangga dengan krim",
    family: "Buah",
    image: "/mochi/produk-mangga-cream.jpg",
    accent: "#F2C46B",
    price: 5000,
    description: "Mangga dan krim dalam satu mochi. Buat kamu yang lagi mencari pilihan rasa buah.",
    
  },
  {
    slug: "coklat-crunchy",
    name: "Coklat Crunchy",
    tagline: "Cokelat crunchy",
    family: "Cokelat",
    image: "/mochi/produk-coklat-crunchy.jpg",
    accent: "#A97A55",
    price: 5000,
    description: "Cokelat dengan sentuhan crunchy. Pilihan buat yang suka cokelat dan ingin ada sedikit kriuk.",
    
  },
];

export function formatRupiah(amount: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(amount)}`;
}

export const FEATURED_SLUGS = [
  "strawberry-cream",
  "matcha-cream",
  "anggur-ijo-coklat",
  "coklat-crunchy",
];

export const FAMILIES: FlavorFamily[] = ["Cream", "Cokelat", "Buah", "Matcha"];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}