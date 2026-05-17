import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/product";
import type { Cart, CartItem } from "../types/cart";
import { cartApi } from "../api/cartApi";

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const loadCart = () => {
      const token = localStorage.getItem("token");
      if (token) {
        cartApi.getCart()
          .then(setCart)
          .catch(() => setCart(null));
      } else {
        setCart(null);
      }
    };

    loadCart();
    window.addEventListener("tokenChanged", loadCart);
    return () => window.removeEventListener("tokenChanged", loadCart);
  }, []);

  const addToCart = async (product: Product) => {
    if (!localStorage.getItem("token")) return;
    try {
      const updated = await cartApi.addItem({
        productId: Number(product.id),
        quantity: 1,
        unitPrice: product.price,
      });
      setCart(updated);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!localStorage.getItem("token")) return;
    try {
      await cartApi.deleteItem(itemId);
      const updated = await cartApi.getCart();
      setCart(updated);
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!localStorage.getItem("token")) return;
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    try {
      const item = cart?.items.find((i) => i.id === itemId);
      if (!item) return;
      const updated = await cartApi.updateItem(itemId, {
        productId: item.productId,
        quantity,
        unitPrice: item.unitPrice,
      });
      setCart(updated);
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  const clearCart = async () => {
    if (!localStorage.getItem("token")) return;
    try {
      await cartApi.clearCart();
      setCart(null);
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  const getTotalItems = () =>
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{
      cartItems: cart?.items ?? [],
      totalPrice: cart?.totalPrice ?? 0,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};