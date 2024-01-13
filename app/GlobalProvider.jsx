"use client";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";


export function GlobalProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>{children}</ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
