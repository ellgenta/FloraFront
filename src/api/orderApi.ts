import { http } from "./http";
import type {
  CreateOrderRequest,
  Order,
  OrderStatus,
  OrderStatusCode,
} from "../types/order";

type BackendOrderItem = {
  id?: number;
  orderId?: number;
  productId: number;
  quantity: number;
  price: number;
};

type BackendOrder = {
  createdAt?: string;
  updatedAt?: string;
  id: number;
  userId: number;
  user?: {
    id?: number;
    userName?: string;
    email?: string;
  } | null;
  items?: BackendOrderItem[] | null;
  totalPrice?: number;
  deliveryAddress?: {
    state: string;
    city: string;
    street: string;
    house: string;
    apartment?: string;
  };
  status?: OrderStatusCode;
};

type BackendCreateOrderDto = {
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  deliveryAddress?: {
    state: string;
    city: string;
    street: string;
    house: string;
    apartment?: string;
  };
};

const orderStatusMap: Record<number, OrderStatus> = {
  0: "New",
  1: "Processing",
  2: "Completed",
  3: "Cancelled",
  4: "Delivered",
};

const reverseOrderStatusMap: Record<string, number> = {
  New: 0,
  Processing: 1,
  Completed: 2,
  Cancelled: 3,
  Delivered: 4,
};

const mapOrderStatusToFrontend = (
  status: OrderStatusCode | undefined
): OrderStatus => {
  if (status === undefined || status === null) {
    return "New";
  }

  return orderStatusMap[status] ?? "New";
};

const mapOrderStatusToBackend = (status: OrderStatus | number): number => {
  if (typeof status === "number") {
    return status;
  }

  return reverseOrderStatusMap[status] ?? 0;
};

const mapBackendOrderToOrder = (order: BackendOrder): Order => {
  return {
    id: order.id,
    userId: order.userId,
    customerName: order.user?.userName || `User #${order.userId}`,
    date: order.createdAt
      ? new Date(order.createdAt).toLocaleDateString()
      : "",
    total: order.totalPrice ?? 0,
    status: mapOrderStatusToFrontend(order.status),
    items:
      order.items?.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })) ?? [],
    deliveryAddress: order.deliveryAddress,
  };
};

const mapCreateOrderToBackendDto = (
  order: CreateOrderRequest
): BackendCreateOrderDto => {
  return {
    userId: Number(order.userId),
    items: order.items.map((item) => ({
      productId: Number(item.productId),
      quantity: item.quantity,
      price: item.price,
    })),
    deliveryAddress: order.deliveryAddress,
  };
};

export const orderApi = {
  getByUserId: async (userId: string | number) => {
    const data = await http<BackendOrder[]>(`/api/order/${userId}/all`);

    return data.map(mapBackendOrderToOrder);
  },

  getById: async (id: string | number) => {
    const data = await http<BackendOrder>(`/api/order/${id}`);

    return mapBackendOrderToOrder(data);
  },

  create: async (order: CreateOrderRequest) => {
    const data = await http<BackendOrder>("/api/order", {
      method: "POST",
      body: JSON.stringify(mapCreateOrderToBackendDto(order)),
    });

    return mapBackendOrderToOrder(data);
  },

  updateStatus: async (id: string | number, status: OrderStatus | number) => {
    const backendStatus = mapOrderStatusToBackend(status);

    const data = await http<BackendOrder>(
      `/api/order/${id}/status?newStatus=${backendStatus}`,
      {
        method: "PUT",
      }
    );

    return mapBackendOrderToOrder(data);
  },
};