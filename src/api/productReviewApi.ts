import { http } from "./http";
import type { ProductReview, ProductReviewCreateRequest } from "../types/productReview";

type BackendProductReview = {
  id: number;
  authorName?: string;
  userId: number;
  productId: number;
  content?: string;
  mark?: number;
};

type BackendProductReviewDto = {
  userId: number;
  productId: number;
  content: string;
  mark: number;
};

const mapBackendReviewToProductReview = (review: BackendProductReview): ProductReview => ({
  id: review.id,
  userId: review.userId,
  productId: review.productId,
  userName: review.authorName || `User #${review.userId}`,
  rating: review.mark ?? 0,
  text: review.content || "",
});

const mapReviewToBackendDto = (review: ProductReviewCreateRequest): BackendProductReviewDto => ({
  userId: Number(review.userId),
  productId: Number(review.productId),
  content: review.text,
  mark: review.rating,
});

export const productReviewApi = {
  getByProductId: async (productId: number) => {
    const data = await http<BackendProductReview[]>(`/review/product/${productId}`);
    return data.map(mapBackendReviewToProductReview);
  },

  create: async (review: ProductReviewCreateRequest) => {
    const data = await http<BackendProductReview>("/review/product", {
      method: "POST",
      body: JSON.stringify(mapReviewToBackendDto(review)),
    });
    return mapBackendReviewToProductReview(data);
  },

  delete: (id: number) => {
    return http<void>(`/review/product/${id}`, { method: "DELETE" });
  },
};