import { http } from "./http";
import type { SiteReview, SiteReviewCreateRequest } from "../types/siteReview";

type BackendSiteReview = {
  id: number;
  userId: number;
  user?: {
    id?: number;
    userName?: string;
    email?: string;
  } | null;
  content?: string | null;
  mark?: number;
  createdAt?: string;
};

type BackendSiteReviewCreateDto = {
  userId: number;
  content: string;
  mark: number;
};

const mapBackendSiteReviewToSiteReview = (review: BackendSiteReview): SiteReview => ({
  id: review.id,
  userId: review.userId,
  userName: review.user?.userName || `User #${review.userId}`,
  text: review.content || "",
  rating: review.mark ?? 0,
  createdAt: review.createdAt,
});

const mapSiteReviewToBackendDto = (review: SiteReviewCreateRequest): BackendSiteReviewCreateDto => ({
  userId: Number(review.userId),
  content: review.text,
  mark: review.rating,
});

export const siteReviewApi = {
  getAll: async () => {
    const data = await http<BackendSiteReview[]>("/api/review/site/all");
    return data.map(mapBackendSiteReviewToSiteReview);
  },

  create: async (review: SiteReviewCreateRequest) => {
    const data = await http<BackendSiteReview>("/api/review/site", {
      method: "POST",
      body: JSON.stringify(mapSiteReviewToBackendDto(review)),
    });
    return mapBackendSiteReviewToSiteReview(data);
  },

  delete: (id: string | number) => {
    return http<void>(`/api/review/site?id=${id}`, {
      method: "DELETE",
    });
  },
};