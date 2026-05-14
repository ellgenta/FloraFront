export type ReviewSource = "product" | "site";

export type AdminReview = {
  id: string | number;
  source: ReviewSource;
  type: "Product" | "Site";
  userName: string;
  productName?: string;
  rating: number;
  text: string;
  createdAt?: string;
};