import { http } from "./http";
import type { ProductReview } from "../types/productReview";

export type ProductReviewCreateRequest = {
  productId: string | number;
  rating: number;
  text: string;
};

export const productReviewApi = {
  getByProductId: (productId: string | number) => {
    return http<ProductReview[]>(`/api/review/product/${productId}`);
  },

  create: (review: ProductReviewCreateRequest) => {
    return http<ProductReview>("/api/review/product", {
      method: "POST",
      body: JSON.stringify(review),
    });
  },

  delete: (id: string | number) => {
    return http<void>(`/api/review/product/${id}`, {
      method: "DELETE",
    });
  },
};