import { http } from "./http";
import type { SiteReview } from "../types/siteReview";

export const siteReviewApi = {
  getAll: () => {
    return http<SiteReview[]>("/api/review/site/all");
  },

  create: (review: Omit<SiteReview, "id" | "siteReviewId">) => {
    return http<SiteReview>("/api/review/site", {
      method: "POST",
      body: JSON.stringify(review),
    });
  },

  delete: (id: string | number) => {
    return http<void>("/api/review/site", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  },
};