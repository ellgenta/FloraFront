export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
};

export type Cart = {
  id: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
  status: number;
};

export type CartItemCreateRequest = {
  productId: number;
  quantity: number;
  unitPrice: number;
};