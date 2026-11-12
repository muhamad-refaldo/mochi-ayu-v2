"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getProduct } from "@/lib/products";
import { productImageSrc } from "@/lib/product-image";

type Product = NonNullable<ReturnType<typeof getProduct>>;

export default function ProductCard({ p }: { p: Product }) {
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onPointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -5,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 5,
    });
  }

  return (
    <Link
      href={`/menu/${p.slug}`}
      className="home-product-card home-product-tilt"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: reduced
          ? undefined
          : `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div className="home-product-image">
        <Image
          src={productImageSrc(p, 480)}
          alt={p.name}
          fill
          sizes="(max-width: 700px) 80vw, 25vw"
          loading="lazy"
        />
      </div>
      <div className="home-product-info">
        <div>
          <h3>{p.name}</h3>
          <p>{p.tagline}</p>
        </div>
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}