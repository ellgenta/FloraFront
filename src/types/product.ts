export const ProductStatus = {
  Unknown: 0,
  Active: 1,
  Inactive: 2,
  Discontinued: 3,
  Sold: 4,
} as const;

export type ProductStatus =
  (typeof ProductStatus)[keyof typeof ProductStatus];

export interface Product {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  } | null;
  subcategory: {
    id: number;
    name: string;
    categoryId: number;
  } | null;
  price: number;
  image: string;
  description: string;
  status: ProductStatus;
}

export type ProductCreateRequest = {
  name: string;
  categoryId: number;
  subCategoryId?: number;
  price: number;
  image: string;
  description: string;
};

export type ProductUpdateRequest = {
  name: string;
  categoryId: number;
  subCategoryId?: number;
  price: number;
  image: string;
  description: string;
  status: ProductStatus;
};