export type OrderStatus = "New" | "Processing" | "Completed" | "Cancelled" | string;

export type Order = {
  id: string | number;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
};

export type CreateOrderItemRequest = {
  productId: string | number;
  quantity: number;
};

export type CreateOrderRequest = {
  items: CreateOrderItemRequest[];
};