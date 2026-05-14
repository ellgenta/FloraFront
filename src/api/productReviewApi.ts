import { http } from "./http";
import type {
  ProductReview,
  ProductReviewCreateRequest,
} from "../types/productReview";

type BackendProductReview = {
  id: number;
  userId: number;
  user?: {
    id?: number;
    userName?: string;
    email?: string;
  } | null;
  productId: number;
  content?: string;
  mark?: number;
  createdAt?: string;
};

type BackendProductReviewDto = {
  userId: number;
  productId: number;
  content: string;
  mark: number;
};

const mapBackendReviewToProductReview = (
  review: BackendProductReview
): ProductReview => {
  return {
    id: review.id,
    userId: review.userId,
    productId: review.productId,
    userName: review.user?.userName || `User #${review.userId}`,
    rating: review.mark ?? 0,
    text: review.content || "",
    createdAt: review.createdAt,
  };
};

const mapReviewToBackendDto = (
  review: ProductReviewCreateRequest
): BackendProductReviewDto => {
  return {
    userId: Number(review.userId),
    productId: Number(review.productId),
    content: review.text,
    mark: review.rating,
  };
};

export const productReviewApi = {
  getByProductId: async (productId: string | number) => {
    const data = await http<BackendProductReview[]>(
      `/api/review/product/${productId}`
    );

    return data.map(mapBackendReviewToProductReview);
  },

  create: async (review: ProductReviewCreateRequest) => {
    const data = await http<BackendProductReview>("/api/review/product", {
      method: "POST",
      body: JSON.stringify(mapReviewToBackendDto(review)),
    });

    return mapBackendReviewToProductReview(data);
  },

  delete: (id: string | number) => {
    return http<void>(`/api/review/product/${id}`, {
      method: "DELETE",
    });
  },
};