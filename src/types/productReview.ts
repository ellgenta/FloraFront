export type ProductReview = {
  id: string | number;
  userId?: string | number;
  productId: string | number;
  userName: string;
  rating: number;
  text: string;
  createdAt?: string;
};

export type ProductReviewCreateRequest = {
  userId: string | number;
  productId: string | number;
  rating: number;
  text: string;
};