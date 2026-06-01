export type SiteReview = {
  id: number;
  userId: number;
  userName: string;
  text: string;
  rating: number;
};

export type SiteReviewCreateRequest = {
  userId: number;
  text: string;
  rating: number;
};

export type TestimonialItem = {
  id: number;
  name: string;
  city: string;
  text: string;
  rating: number;
};