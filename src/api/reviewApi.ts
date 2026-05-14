import { http } from "./http";
import type {
  AdminReview,
  ProductReview,
  SiteReview,
} from "../types/review";

const PRODUCT_REVIEW_ENDPOINT = "/api/ProductReview";
const SITE_REVIEW_ENDPOINT = "/api/SiteReview";

const mapProductReview = (review: ProductReview): AdminReview => {
  return {
    id: review.id,
    source: "product",
    type: "Product",
    userName: review.userName || String(review.userId || "—"),
    productName: review.productName || String(review.productId || "—"),
    rating: review.rating,
    text:
      review.text ||
      review.reviewText ||
      review.comment ||
      review.message ||
      "",
  };
};

const mapSiteReview = (review: SiteReview): AdminReview => {
  return {
    id: review.id,
    source: "site",
    type: "Site",
    userName: review.userName || String(review.userId || "—"),
    productName: undefined,
    rating: undefined,
    text:
      review.text ||
      review.reviewText ||
      review.comment ||
      review.message ||
      "",
  };
};

export const reviewApi = {
  getAll: async () => {
    const [productReviews, siteReviews] = await Promise.all([
      http<ProductReview[]>(PRODUCT_REVIEW_ENDPOINT),
      http<SiteReview[]>(SITE_REVIEW_ENDPOINT),
    ]);

    return [
      ...productReviews.map(mapProductReview),
      ...siteReviews.map(mapSiteReview),
    ];
  },

  deleteProductReview: (id: string | number) => {
    return http<void>(`${PRODUCT_REVIEW_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
  },

  deleteSiteReview: (id: string | number) => {
    return http<void>(`${SITE_REVIEW_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
  },

  delete: (review: AdminReview) => {
    if (review.source === "product") {
      return reviewApi.deleteProductReview(review.id);
    }

    return reviewApi.deleteSiteReview(review.id);
  },
};