"use client";

import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { ShoppingCart, Check } from "lucide-react";
import { useState, useCallback } from "react";

export default function AddToCartButton({
  product,
  compact,
  onAdd,
}: {
  product: Product;
  compact?: boolean;
  onAdd?: () => void;
}) {
  const { addItem } = useCart();
  const [confirming, setConfirming] = useState(false);
  const handleAdd = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      addItem(product);
      onAdd?.();
      setConfirming(true);
      setTimeout(() => setConfirming(false), 900);
    },
    [addItem, product, onAdd]
  );
  return (
    <button
      type="button"
      className={`cart-add-button${compact ? " cart-add-compact" : ""}${
        confirming ? " cart-add-confirmed" : ""
      }`}
      onClick={handleAdd}
      aria-label={`Tambah ${product.name} ke keranjang`}
    >
      {confirming ? <Check size={compact ? 14 : 16} /> : <ShoppingCart size={compact ? 14 : 16} />}
      {compact ? "Tambah" : "Masukkan Keranjang"}
    </button>
  );
}
