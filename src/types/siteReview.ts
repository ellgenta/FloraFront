export type SiteReview = {
  id: string | number;
  siteReviewId?: string | number;
  userId?: string | number;

  userName?: string;
  name?: string;

  city?: string;
  location?: string;

  text?: string;
  message?: string;
  comment?: string;

  rating?: number;
  mark?: number;

  createdAt?: string;
};

export type SiteReviewCreateRequest = {
  userId: string | number;
  text: string;
  rating: number;
};

export type TestimonialItem = {
  id: string | number;
  name: string;
  city: string;
  text: string;
  rating: number;
};