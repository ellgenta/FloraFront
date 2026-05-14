export type SiteReview = {
  id: string | number;
  userId?: string | number;
  userName: string;
  text: string;
  rating: number;
  createdAt?: string;
};

export type SiteReviewCreateRequest = {
  userId: string | number;
  text: string;
  rating: number;
};

export type TestimonialItem = SiteReview;