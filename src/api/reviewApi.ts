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
        const reviews = await productReviewApi.getByProductId(product.id);

        return reviews.map(
          (review): AdminReview => ({
            id: review.id,
            source: "product",
            type: "Product",
            userName: review.userName || "Customer",
            productName: product.name,
            rating: review.rating ?? 0,
            text: review.text || "",
            createdAt: review.createdAt,
          })
        );
      })
    );

    const productReviews = productReviewGroups.flat();

    const normalizedSiteReviews: AdminReview[] = siteReviews.map(
      (review): AdminReview => ({
        id: review.id,
        source: "site",
        type: "Site",
        userName: review.userName || "Customer",
        productName: undefined,
        rating: review.rating ?? 0,
        text: review.text || "",
        createdAt: review.createdAt,
      })
    );

    return [...productReviews, ...normalizedSiteReviews];
  },

  delete: async (review: AdminReview) => {
  const reviewId = Number(review.id);

  if (!Number.isFinite(reviewId) || reviewId <= 0) {
    throw new Error("Invalid review id");
  }

  if (review.source === "product") {
    return productReviewApi.delete(reviewId);
  }

  return siteReviewApi.delete(reviewId);
},
};