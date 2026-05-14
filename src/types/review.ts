export type ReviewSource = "product" | "site";

export type ProductReview = {
  id: string | number;
  userName?: string;
  userId?: string | number;
  productName?: string;
  productId?: string | number;
  rating?: number;
  text?: string;
  reviewText?: string;
  comment?: string;
  message?: string;
};

export type SiteReview = {
  id: string | number;
  userName?: string;
  userId?: string | number;
  text?: string;
  reviewText?: string;
  comment?: string;
  message?: string;
};

export type AdminReview = {
  id: string | number;
  source: ReviewSource;
  type: "Product" | "Site";
  userName: string;
  productName?: string;
  rating?: number;
  text: string;
};