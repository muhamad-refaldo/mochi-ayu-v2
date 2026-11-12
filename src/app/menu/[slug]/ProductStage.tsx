"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";
import { productImageSrc } from "@/lib/product-image";

/**
 * Tasteful image stage with a subtle 3D pointer tilt.
 * Honors prefers-reduced-motion and skips touch/coarse pointers.
 */
export default function ProductStage({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      className="product-stage"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="product-stage-inner">
        <Image
          src={productImageSrc(product, 960)}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 45vw"
          style={{ objectFit: "cover" }}
        />
        <span className="product-stage-blob" aria-hidden="true" style={{ background: product.accent }} />
      </div>
    </div>
  );
}
