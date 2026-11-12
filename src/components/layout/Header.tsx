"use client";

import Link from "next/link";
import { ShoppingBag, Search, House, Grid2X2, BookOpen, MapPin, MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function Header() {
  const pathname = usePathname();
  const { totalItems, subtotal, isLoaded } = useCart();
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/">
          <span>mochi ayu</span>
        </Link>

        <nav className="nav-capsules" aria-label="Navigasi utama">
          <Link href="/" className={isActive("/") ? "active" : undefined} aria-current={isActive("/") ? "page" : undefined}>Beranda</Link>
          <Link href="/menu" className={isActive("/menu") ? "active" : undefined} aria-current={isActive("/menu") ? "page" : undefined}>Menu</Link>
          <Link href="/cerita" className={isActive("/cerita") ? "active" : undefined} aria-current={isActive("/cerita") ? "page" : undefined}>Cerita</Link>
          <Link href="/promo" className={isActive("/promo") ? "active" : undefined} aria-current={isActive("/promo") ? "page" : undefined}>Promo</Link>
          <Link href="/cabang" className={isActive("/cabang") ? "active" : undefined} aria-current={isActive("/cabang") ? "page" : undefined}>Cabang</Link>
          <Link href="/kontak" className={isActive("/kontak") ? "active" : undefined} aria-current={isActive("/kontak") ? "page" : undefined}>Kontak</Link>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/menu" className="nav-icon" aria-label="Cari rasa di menu"><Search size={18} /></Link>
          <Link href="/keranjang" className="nav-cart" aria-label={`Keranjang${isLoaded && totalItems ? `, ${totalItems} item` : ""}`}>
            <ShoppingBag size={18} />
            <span className="nav-cart-label">Keranjang</span>
            {isLoaded && totalItems > 0 && <span className="cart-badge" aria-hidden="true">{totalItems > 99 ? "99+" : totalItems}</span>}
          </Link>
        </div>

        <div className="mobile-header-actions">
          <ThemeToggle />
          <Link href="/keranjang" className="mobile-cart" aria-label={`Keranjang${totalItems ? `, ${totalItems} item` : ""}`}>
            <ShoppingBag size={21} />
            {isLoaded && totalItems > 0 && <span className="cart-badge">{totalItems > 99 ? "99+" : totalItems}</span>}
            <span className="mobile-cart-summary">{!isLoaded ? "Keranjang" : totalItems ? `${totalItems} item · Rp${subtotal.toLocaleString("id-ID")}` : "Keranjang"}</span>
          </Link>
        </div>
      </header>

      <nav className="mobile-bottom-nav" aria-label="Navigasi mobile">
        <Link href="/" className={isActive("/") ? "active" : undefined} aria-current={isActive("/") ? "page" : undefined}><House size={19} /><span>Beranda</span></Link>
        <Link href="/menu" className={isActive("/menu") ? "active" : undefined} aria-current={isActive("/menu") ? "page" : undefined}><Grid2X2 size={19} /><span>Menu</span></Link>
        <Link href="/cerita" className={isActive("/cerita") ? "active" : undefined} aria-current={isActive("/cerita") ? "page" : undefined}><BookOpen size={19} /><span>Cerita</span></Link>
        <Link href="/cabang" className={isActive("/cabang") ? "active" : undefined} aria-current={isActive("/cabang") ? "page" : undefined}><MapPin size={19} /><span>Lokasi</span></Link>
        <Link href="/kontak" className={isActive("/kontak") ? "active" : undefined} aria-current={isActive("/kontak") ? "page" : undefined}><MessageCircle size={19} /><span>Kontak</span></Link>
      </nav>

    </>
  );
}