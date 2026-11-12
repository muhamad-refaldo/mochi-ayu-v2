import test from "node:test";
import assert from "node:assert/strict";
import { productImageSrc } from "./product-image";
import type { Product } from "./products";

function product(image: string): Product {
  return { slug: "tes", name: "Tes", family: "Cokelat", tagline: "Tes", description: "", note: "", price: 5000, image, accent: "#000000" };
}

test("bundled product images select generated responsive WebP", () => {
  assert.equal(productImageSrc(product("/mochi/produk-stroberi.jpg"), 480), "/mochi/produk-stroberi-480.webp");
  assert.equal(productImageSrc(product("/mochi/produk-stroberi.jpg"), 960), "/mochi/produk-stroberi-960.webp");
});

test("remote product images remain unchanged", () => {
  const url = "https://example.supabase.co/storage/v1/object/public/products/stroberi.jpg";
  assert.equal(productImageSrc(product(url), 480), url);
});

test("non-product static images remain unchanged", () => {
  assert.equal(productImageSrc(product("/mochi/hero-mochi.jpg"), 480), "/mochi/hero-mochi.jpg");
});
