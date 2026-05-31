import { http } from "./http";
import type { Order, CreateOrderRequest } from "../types/order";

type BackendOrder = {
  id: number;
  userId: number;
  createdAt?: string;
  items?: { productId: number; quantity: number; price: number }[] | null;
  totalPrice?: number;
  deliveryAddress?: {
    state: string;
    city: string;
    street: string;
    house: string;
    apartment?: string;
  };
  status?: number;
};

const mapBackendOrderToOrder = (order: BackendOrder): Order => ({
  id: order.id,
  userId: order.userId,
  customerName: `User #${order.userId}`,
  date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—",
  items: order.items?.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  })) ?? [],
  totalPrice: order.totalPrice ?? 0,
  total: order.totalPrice ?? 0,
  deliveryAddress: order.deliveryAddress ?? { state: "", city: "", street: "", house: "" },
  status: order.status ?? 0,
});

export const orderApi = {
  getAll: async () => {
    const data = await http<BackendOrder[]>("/api/order/all");
    return data.map(mapBackendOrderToOrder);
  },

  getByUserId: async (userId: number) => {
    const data = await http<BackendOrder[]>(`/api/order/${userId}/all`);
    return data.map(mapBackendOrderToOrder);
  },

  getById: async (id: number) => {
    const data = await http<BackendOrder>(`/api/order/${id}`);
    return mapBackendOrderToOrder(data);
  },

  create: async (order: CreateOrderRequest) => {
    const data = await http<BackendOrder>("/api/order", {
      method: "POST",
      body: JSON.stringify(order),
    });
    return mapBackendOrderToOrder(data);
  },

  updateStatus: async (id: number, newStatus: number) => {
    const data = await http<BackendOrder>(`/api/order/${id}/status?newStatus=${newStatus}`, {
      method: "PUT",
    });
    return mapBackendOrderToOrder(data);
  },
};