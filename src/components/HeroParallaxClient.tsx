"use client";

import { useEffect } from "react";

export default function HeroParallaxClient() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (min-width: 761px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.querySelector<HTMLElement>("section.home-hero");
    const image = section?.querySelector(".home-hero-image");
    const flowers = section?.querySelectorAll(".hero-flower");
    if (!section || !image || !flowers) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    void import("gsap").then(({ default: gsap }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
      const imageX = gsap.quickTo(image, "x", { duration: 0.7, ease: "power2.out" });
      const imageY = gsap.quickTo(image, "y", { duration: 0.7, ease: "power2.out" });
      const flowerX = gsap.quickTo(flowers, "x", { duration: 0.9, ease: "power2.out" });
      const flowerY = gsap.quickTo(flowers, "y", { duration: 0.9, ease: "power2.out" });

      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = section.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        imageX(x * 10);
        imageY(y * 8);
        flowerX(x * 15);
        flowerY(y * 12);
      };
      const reset = () => {
        imageX(0);
        imageY(0);
        flowerX(0);
        flowerY(0);
      };
      section.addEventListener("pointermove", move);
      section.addEventListener("pointerleave", reset);
      return () => {
        section.removeEventListener("pointermove", move);
        section.removeEventListener("pointerleave", reset);
      };
      }, section);
      cleanup = () => ctx.revert();
    });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return null;
}