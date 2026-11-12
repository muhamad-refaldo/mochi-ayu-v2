import test from "node:test";
import assert from "node:assert/strict";
import { mapProductRow } from "../src/lib/supabase/products";

test("maps an active Supabase product row to the catalog product shape", () => {
  assert.deepEqual(mapProductRow({
    slug: "matcha",
    name: "Matcha",
    tagline: "Teh hijau",
    family: "Matcha",
    image: "/mochi/matcha.jpg",
    accent: "#A9B99C",
    price: 5000,
    description: "Matcha lembut",
    note: "pahit manis",
    is_active: true,
    display_order: 4,
  }), {
    slug: "matcha",
    name: "Matcha",
    tagline: "Teh hijau",
    family: "Matcha",
    image: "/mochi/matcha.jpg",
    accent: "#A9B99C",
    price: 5000,
    description: "Matcha lembut",
    note: "pahit manis",
  });
});

test("rejects rows with invalid families or price", () => {
  const row = { slug: "bad", name: "Bad", tagline: "Bad", family: "Cream", image: "/bad.jpg", accent: "#fff", price: 5000, description: null, note: null, is_active: true, display_order: 1 };
  assert.throws(() => mapProductRow({ ...row, family: "Other" }), /invalid product row/i);
  assert.throws(() => mapProductRow({ ...row, price: -1 }), /invalid product row/i);
});
