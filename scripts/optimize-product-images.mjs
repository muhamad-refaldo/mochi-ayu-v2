import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/mochi");
const files = (await fs.readdir(root)).filter((name) => /^produk-.+\.jpg$/i.test(name));
let totalBefore = 0;
let totalAfter = 0;

for (const name of files) {
  const input = path.join(root, name);
  const stem = name.replace(/\.jpg$/i, "");
  const metadata = await sharp(input).metadata();
  totalBefore += (await fs.stat(input)).size;

  for (const width of [480, 960]) {
    const output = path.join(root, `${stem}-${width}.webp`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output);
    totalAfter += (await fs.stat(output)).size;
  }
  console.log(`${name}: ${metadata.width}x${metadata.height} -> WebP 480px + 960px`);
}

console.log(`Products: ${files.length}; originals ${(totalBefore / 1024).toFixed(1)} KB; generated variants ${(totalAfter / 1024).toFixed(1)} KB total (two sizes per product).`);
