import assert from "node:assert/strict";
import test from "node:test";
import { productStructuredData, businessStructuredData, breadcrumbStructuredData, serializeJsonLd } from "../src/lib/structured-data";
import { PRODUCTS } from "../src/lib/products";
import { BRANCHES } from "../src/lib/branches";

test("business schema lists areas only, without invented street addresses", () => {
  const schema = businessStructuredData("http://localhost:3000");
  assert.equal(schema["@type"], "Bakery");
  assert.equal(schema.areaServed.length, BRANCHES.length);
  assert.ok(!("address" in schema));
  assert.ok(!("availability" in schema));
  assert.equal(schema.telephone, "+6288296759533");
});

test("product schema uses catalog data and absolute URLs without inventing stock", () => {
  const p = PRODUCTS[0];
  const schema = productStructuredData(p, "http://localhost:3000");
  assert.equal(schema["@type"], "Product");
  assert.equal(schema.name, p.name);
  assert.deepEqual(schema.image, [`http://localhost:3000${p.image}`]); assert.equal(schema.description, p.tagline); assert.equal(schema.sku, p.slug);
  assert.equal(schema.offers.price, p.price);
  assert.equal(schema.offers.url, `http://localhost:3000/menu/${p.slug}`);
  assert.equal(schema.offers.priceCurrency, "IDR");
  assert.ok(!("availability" in schema.offers));
});

test("breadcrumb has homepage, menu and product URLs", () => {
  const p = PRODUCTS[0];
  const schema = breadcrumbStructuredData(p, "http://localhost:3000");
  assert.deepEqual(schema.itemListElement.map((x) => x.item), ["http://localhost:3000/", "http://localhost:3000/menu", `http://localhost:3000/menu/${p.slug}`]);
});

test("JSON-LD serialization cannot break out of a script tag", () => {
  const text = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.ok(!text.includes("</script>"));
  assert.equal(JSON.parse(text).name, "</script><script>alert(1)</script>");
});
