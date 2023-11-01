"use client";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

import { SessionProvider } from "next-auth/react";

export function GlobalProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <SessionProvider >{children}</SessionProvider>
      </CartProvider>
    </AuthProvider>
  );
}
