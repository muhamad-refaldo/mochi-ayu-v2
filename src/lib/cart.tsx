"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { Product } from "@/lib/products";
import { cartReducer, hydrateCart, CART_STORAGE_KEY, cartTotals, type CartItem } from "@/lib/cart-core";

export type { CartItem } from "@/lib/cart-core";



const CartContext = createContext<{
  items: CartItem[];
  isLoaded: boolean;
  addItem: (product: Product) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isLoaded: false });

  useEffect(() => {
    try {
      dispatch({ type: "SET_LOADED", payload: hydrateCart(localStorage.getItem(CART_STORAGE_KEY)) });
    } catch {
      dispatch({ type: "SET_LOADED", payload: [] });
    }
  }, []);

  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.isLoaded]);

  const addItem = (product: Product) => dispatch({ type: "ADD", payload: product });
  const updateQuantity = (slug: string, quantity: number) =>
    dispatch({ type: "UPDATE", payload: { slug, quantity } });
  const removeItem = (slug: string) => dispatch({ type: "REMOVE", payload: slug });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const { totalItems, subtotal } = cartTotals(state.items);

  return (
    <CartContext.Provider
      value={{ items: state.items, isLoaded: state.isLoaded, addItem, updateQuantity, removeItem, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}