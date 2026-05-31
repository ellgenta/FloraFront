import { http } from "./http";
import type { Cart, CartItemCreateRequest } from "../types/cart";

export const cartApi = {
  getCart: () => http<Cart>("/api/cart"),

  addItem: (item: CartItemCreateRequest) =>
    http<Cart>("/api/cart/items", {
      method: "POST",
      body: JSON.stringify(item),
    }),

  updateItem: (itemId: number, item: CartItemCreateRequest) =>
    http<Cart>(`/api/cart/items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify(item),
    }),

  deleteItem: (itemId: number) =>
    http<void>(`/api/cart/items/${itemId}`, {
      method: "DELETE",
    }),

  clearCart: () =>
    http<void>("/api/cart", {
      method: "DELETE",
    }),
};