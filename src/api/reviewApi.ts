import { productApi } from "./productApi";
import { productReviewApi } from "./productReviewApi";
import { siteReviewApi } from "./siteReviewApi";

import type { AdminReview } from "../types/review";

export const reviewApi = {
  getAll: async (): Promise<AdminReview[]> => {
    const [siteReviews, products] = await Promise.all([
      siteReviewApi.getAll(),
      productApi.getAll(),
    ]);

    const productReviewGroups = await Promise.all(
      products.map(async (product) => {
        const reviews = await productReviewApi.getByProductId(Number(product.id));

        return reviews.map<AdminReview>((review) => ({
          id: review.id,
          source: "product",
          type: "Product",
          userName: review.userName,
          productName: product.name,
          rating: review.rating,
          text: review.text,
          createdAt: review.createdAt,
        }));
      })
    );

    const productReviews = productReviewGroups.flat();

    const normalizedSiteReviews = siteReviews.map<AdminReview>((review) => ({
      id: review.id,
      source: "site",
      type: "Site",
      userName: review.userName,
      productName: undefined,
      rating: review.rating,
      text: review.text,
      createdAt: review.createdAt,
    }));

    return [...productReviews, ...normalizedSiteReviews];
  },

  delete: async (review: AdminReview) => {
    if (review.source === "product") {
      return productReviewApi.delete(Number(review.id));
    }

    return siteReviewApi.delete(Number(review.id));
  },
};