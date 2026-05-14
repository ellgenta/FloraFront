export type OrderStatusCode = 0 | 1 | 2 | 3 | 4;

export type OrderStatus =
  | "New"
  | "Processing"
  | "Completed"
  | "Cancelled"
  | "Delivered"
  | string;

export type AddressRequest = {
  state: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
};

export type OrderItem = {
  id?: string | number;
  productId: string | number;
  quantity: number;
  price: number;
};

export type Order = {
  id: string | number;
  userId: string | number;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  deliveryAddress?: AddressRequest;
};

export type CreateOrderItemRequest = {
  productId: string | number;
  quantity: number;
  price: number;
};

export type CreateOrderRequest = {
  userId: string | number;
  items: CreateOrderItemRequest[];
  deliveryAddress?: AddressRequest;
};