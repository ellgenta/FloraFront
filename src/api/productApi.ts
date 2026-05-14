import { http } from "./http";
import type {
  Product,
  ProductCreateRequest,
  ProductUpdateRequest,
} from "../types/product";

export const productApi = {
  getAll: () => {
    return http<Product[]>("/api/product/getAll");
  },

  getById: (id: string | number) => {
    return http<Product>(`/api/product/getById?id=${id}`);
  },

  getByCategory: (category: string) => {
    return http<Product[]>(`/api/product/getByCategory/${category}`);
  },

  getBySubCategory: (subCategory: string) => {
    return http<Product[]>(`/api/product/getBySubCategory/${subCategory}`);
  },

  create: (product: ProductCreateRequest) => {
    return http<Product>("/api/product/create", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  update: (id: string | number, product: ProductUpdateRequest) => {
    return http<Product>(`/api/product/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  },

  delete: (id: string | number) => {
    return http<void>(`/api/product/delete/${id}`, {
      method: "DELETE",
    });
  },
};