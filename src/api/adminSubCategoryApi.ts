import { http } from "./http";
import type {
  AdminSubCategory,
  SubCategoryCreateRequest,
  SubCategoryUpdateRequest,
} from "../types/adminCatalog";

export const adminSubCategoryApi = {
  getAll: () => {
    return http<AdminSubCategory[]>("/api/SubCategory/all");
  },

  getById: (id: number) => {
    return http<AdminSubCategory>(`/api/SubCategory/${id}`);
  },

  getByCategoryId: (categoryId: number) => {
    return http<AdminSubCategory[]>(
      `/api/SubCategory/category/${categoryId}`
    );
  },

  create: (subCategory: SubCategoryCreateRequest) => {
    return http<AdminSubCategory>("/api/SubCategory/create", {
      method: "POST",
      body: JSON.stringify(subCategory),
    });
  },

  update: (id: number, subCategory: SubCategoryUpdateRequest) => {
    return http<AdminSubCategory>(`/api/SubCategory/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(subCategory),
    });
  },

  delete: (id: number) => {
    return http<void>(`/api/SubCategory/delete/${id}`, {
      method: "DELETE",
    });
  },
};