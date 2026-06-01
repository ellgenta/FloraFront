import { http } from "./http";
import type {
  AdminCategory,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from "../types/adminCatalog";

export const adminCategoryApi = {
  getAll: () => {
    return http<AdminCategory[]>("/api/category/all");
  },

  getById: (id: number) => {
    return http<AdminCategory>(`/api/category/${id}`);
  },

  create: (category: CategoryCreateRequest) => {
    return http<AdminCategory>("/api/category/create", {
      method: "POST",
      body: JSON.stringify(category),
    });
  },

  update: (id: number, category: CategoryUpdateRequest) => {
    return http<AdminCategory>(`/api/category/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
  },

  delete: (id: number) => {
    return http<void>(`/api/category/delete/${id}`, {
      method: "DELETE",
    });
  },
};