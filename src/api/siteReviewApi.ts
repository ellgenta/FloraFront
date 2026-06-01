import { http } from "./http";
import type { SiteReview, SiteReviewCreateRequest } from "../types/siteReview";

type BackendSiteReview = {
  id: number;
  userId: number;
  authorName?: string;
  content?: string | null;
  mark?: number;
};

const mapBackendSiteReviewToSiteReview = (review: BackendSiteReview): SiteReview => ({
  id: review.id,
  userId: review.userId,
  userName: review.authorName || `User #${review.userId}`,
  text: review.content || "",
  rating: review.mark ?? 0,
});

export const siteReviewApi = {
  getAll: async () => {
    const data = await http<BackendSiteReview[]>("/api/review/site/all");
    return data.map(mapBackendSiteReviewToSiteReview);
  },

  create: async (review: SiteReviewCreateRequest) => {
    const data = await http<BackendSiteReview>("/api/review/site", {
      method: "POST",
      body: JSON.stringify({
        userId: Number(review.userId),
        content: review.text,
        mark: review.rating,
      }),
    });
    return mapBackendSiteReviewToSiteReview(data);
  },

  delete: (id: number) => http<void>(`/api/review/site?id=${id}`, { method: "DELETE" }),
};