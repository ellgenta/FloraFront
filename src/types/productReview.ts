export type ProductReview = {
  id: string | number;
  productId: string | number;
  userName?: string;
  rating: number;
  text: string;
};