import { http } from "./http";
import type { CreateOrderRequest, Order } from "../types/order";

export const orderApi = {
  getByUserId: (userId: string | number) => {
    return http<Order[]>(`/api/order/${userId}/all`);
  },

  getById: (id: string | number) => {
    return http<Order>(`/api/order/${id}`);
  },

  create: (order: CreateOrderRequest) => {
    return http<Order>("/api/order", {
      method: "POST",
      body: JSON.stringify(order),
    });
  },

  updateStatus: (id: string | number, status: string) => {
    return http<Order>(`/api/order/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },
};