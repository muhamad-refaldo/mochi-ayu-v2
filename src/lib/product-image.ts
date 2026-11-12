import type { Product } from "./products";

/** Use optimized bundled derivatives; keep remote Supabase images unchanged. */
export function productImageSrc(product: Product, width: 480 | 960): string {
  return /^\/mochi\/produk-[a-z0-9-]+\.jpg$/.test(product.image)
    ? product.image.replace(/\.jpg$/, `-${width}.webp`)
    : product.image;
}
