"use client";

import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, toggle, ready } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={ready ? `Aktifkan mode ${dark ? "terang" : "gelap"}` : "Ganti tema"}
      aria-pressed={ready ? dark : undefined}
      title={ready ? `Mode ${dark ? "terang" : "gelap"}` : "Ganti tema"}
    >
      {dark ? <Sun size={19} aria-hidden="true" /> : <MoonStar size={19} aria-hidden="true" />}
    </button>
  );
}
