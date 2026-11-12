"use client";

import { useEffect } from "react";

const PETALS = [
  { left: "8%", delay: "-2s", duration: "14s", size: "15px" },
  { left: "24%", delay: "-9s", duration: "18s", size: "11px" },
  { left: "47%", delay: "-5s", duration: "16s", size: "17px" },
  { left: "69%", delay: "-12s", duration: "20s", size: "12px" },
  { left: "88%", delay: "-7s", duration: "15s", size: "14px" },
];

export default function DecorativeMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastY = -1;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 2) return;
      lastY = y;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.035;
        el.style.setProperty("--parallax-y", `${Math.max(-24, Math.min(24, offset))}px`);
      });
    };
    const request = () => {
      if (!frame && !reduced.matches) frame = window.requestAnimationFrame(update);
    };
    if (!reduced.matches) {
      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", request, { passive: true });
      request();
    }
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="sakura-petals" aria-hidden="true">
      {PETALS.map((petal, i) => (
        <span
          className="sakura-petal"
          key={i}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size,
          }}
        />
      ))}
    </div>
  );
}
