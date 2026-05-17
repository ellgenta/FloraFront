import { http } from "./http";
import type { Category, Subcategory } from "../types/category";

export const categoryApi = {
  getAll: () => http<Category[]>("/Category/all"),
  getById: (id: number) => http<Category>(`/Category/${id}`),
  getSubcategoriesByCategoryId: (categoryId: number) =>
    http<Subcategory[]>(`/SubCategory/byCategory/${categoryId}`),
  getAllSubcategories: () => http<Subcategory[]>("/SubCategory/all"),
};