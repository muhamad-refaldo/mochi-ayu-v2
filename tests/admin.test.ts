import assert from "node:assert/strict";
import test from "node:test";
import { productPayload, validateProduct, type AdminProduct } from "../src/lib/admin";

const product: AdminProduct = { id: 1, slug: "uji-produk", name: " Uji ", tagline: " Enak ", family: "Cream", image: "/mochi/uji.jpg", accent: "#E9A8B8", price: 5000, description: " Deskripsi ", note: "", is_active: false, display_order: 3 };

test("admin product validation rejects invalid data", () => {
  assert.equal(validateProduct(product), null);
  assert.match(validateProduct({ ...product, slug: "Invalid/slug" })!, /Slug/);
  assert.match(validateProduct({ ...product, price: -1 })!, /Harga/);
  assert.match(validateProduct({ ...product, image: "https://evil.test/x" })!, /Gambar/);
  assert.match(validateProduct({ ...product, display_order: 1.5 })!, /Urutan/);
});

test("admin product payload omits id and trims optional fields", () => {
  assert.deepEqual(productPayload(product), { slug: "uji-produk", name: "Uji", tagline: "Enak", family: "Cream", image: "/mochi/uji.jpg", accent: "#E9A8B8", price: 5000, description: "Deskripsi", note: null, is_active: false, display_order: 3 });
});
