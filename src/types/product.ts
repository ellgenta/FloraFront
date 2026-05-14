export type ProductCategory = "plants" | "pots" | "fertilizers" | "tools";

export interface Product {
  id: string | number;
  name: string;
  category: ProductCategory | string;
  subcategory?: string;
  price: number;
  image: string;
  description: string;
  stock?: number;
}

export type ProductCreateRequest = {
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  description: string;
  stock?: number;
};

export type ProductUpdateRequest = {
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  description: string;
  stock?: number;
};