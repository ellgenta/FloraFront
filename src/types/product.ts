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
}

export type ProductCreateRequest = {
  name: string;
  categoryId: number;
  subCategoryId?: number;
  price: number;
  image: string;
  description: string;
};

export type ProductUpdateRequest = ProductCreateRequest;