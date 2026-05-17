export type AddressRequest = {
  state: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
};

export type OrderItem = {
  productId: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  userId: number;
  customerName: string;
  date: string;
  items: OrderItem[];
  totalPrice: number;
  total: number;
  deliveryAddress: AddressRequest;
  status: number;
};

export type CreateOrderRequest = {
  userId: number;
  items: OrderItem[];
  deliveryAddress: AddressRequest;
};