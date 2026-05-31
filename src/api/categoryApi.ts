import { http } from "./http";
import type { Category, Subcategory } from "../types/category";

export const categoryApi = {
  getAll: () => http<Category[]>("/api/Category/all"),
  getById: (id: number) => http<Category>(`/api/Category/${id}`),
  getSubcategoriesByCategoryId: (categoryId: number) =>
    http<Subcategory[]>(`/api/SubCategory/byCategory/${categoryId}`),
  getAllSubcategories: () => http<Subcategory[]>("/api/SubCategory/all"),
};