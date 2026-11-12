"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import { useCart } from "@/lib/cart";
import { buildWhatsAppMessage } from "@/lib/cart-core";
import { formatRupiah } from "@/lib/products";
import { productImageSrc } from "@/lib/product-image";
import { WHATSAPP_LINK } from "@/lib/branches";

export default function KeranjangPage() {
  const { items, isLoaded, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const checkoutUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(buildWhatsAppMessage(items, formatRupiah))}`;
  return <main id="main" className="cart-page"><Header /><a className="skip-link" href="#cart-title">Lewati ke konten utama</a><section className="cart-shell" aria-labelledby="cart-title">
    <Link href="/menu" className="cart-back"><ArrowLeft size={16}/> Lanjut belanja</Link>
    <div className="cart-heading"><div><p className="eyebrow">PESANANMU</p><h1 id="cart-title">Keranjang <em>belanja</em></h1></div>{isLoaded && items.length > 0 && <span className="cart-count">{totalItems} item</span>}</div>
    {!isLoaded ? <div className="cart-loading">Memuat keranjang…</div> : !items.length ? <div className="cart-empty"><div className="cart-empty-icon"><ShoppingBag size={34}/></div><h2>Keranjangmu masih kosong</h2><p>Temukan mochi favoritmu dan tambahkan ke keranjang.</p><Link href="/menu" className="cart-shop-btn">Mulai belanja</Link></div> : <div className="cart-layout">
      <div className="cart-main"><div className="cart-store"><span className="cart-store-dot"/> Mochi Ayu <span className="cart-store-sub">Pesanan langsung</span></div><div className="cart-items">{items.map(({product,quantity}) => <article className="cart-item" key={product.slug}>
        <Link href={`/menu/${product.slug}`} className="cart-product-image"><Image src={productImageSrc(product, 480)} alt={product.name} fill sizes="(max-width: 700px) 96px, 120px"/></Link><div className="cart-product-details"><span className="cart-product-family">{product.family}</span><Link href={`/menu/${product.slug}`} className="cart-product-name">{product.name}</Link><span className="cart-unit-price">{formatRupiah(product.price)} <small>/ buah</small></span><div className="cart-item-bottom"><div className="cart-quantity" aria-label={`Jumlah ${product.name}`}><button type="button" aria-label={`Kurangi ${product.name}`} onClick={() => updateQuantity(product.slug,quantity-1)}><Minus size={14}/></button><span>{quantity}</span><button type="button" aria-label={`Tambah ${product.name}`} onClick={() => updateQuantity(product.slug,quantity+1)}><Plus size={14}/></button></div><button type="button" className="cart-delete" onClick={() => removeItem(product.slug)}><Trash2 size={15}/><span>Hapus</span></button></div></div><strong className="cart-line-total">{formatRupiah(product.price*quantity)}</strong>
      </article>)}</div></div><aside className="cart-summary-card"><h2>Ringkasan pesanan</h2><div className="cart-summary-row"><span>Total item</span><span>{totalItems} buah</span></div><div className="cart-summary-row"><span>Subtotal</span><span>{formatRupiah(subtotal)}</span></div><div className="cart-summary-total"><span>Total</span><strong>{formatRupiah(subtotal)}</strong></div><a className="cart-checkout" href={checkoutUrl} target="_blank" rel="noopener noreferrer">Checkout via WhatsApp <span>↗</span></a><p className="cart-secure"><ShieldCheck size={15}/> Ketersediaan dikonfirmasi saat chat WhatsApp.</p></aside>
    </div>}
  </section></main>;
}