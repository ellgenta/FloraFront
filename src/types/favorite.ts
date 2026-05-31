import type { Product } from "./product";

export type Favorite = {
  id: number;
  userId: number;
  productId: number;
  product: Product;
};

export type FavoriteCreateRequest = {
  userId: number;
  productId: number | string;
};