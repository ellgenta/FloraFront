export type SiteReview = {
  id?: string | number;
  siteReviewId?: string | number;
  userName?: string;
  name?: string;
  city?: string;
  location?: string;
  rating?: number;
  text?: string;
  message?: string;
  comment?: string;
};

export type TestimonialItem = {
  id: string | number;
  name: string;
  city: string;
  text: string;
  rating?: number;
};