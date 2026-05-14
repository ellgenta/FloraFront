import { http } from "./http";
import type { Category, SubcategoriesMap } from "../types/category";

export const categoryApi = {
  getSubcategories: () => {
    return http<SubcategoriesMap>("/api/Category/subcategories");
  },

  getCategories: async () => {
    const subcategories = await http<SubcategoriesMap>(
      "/api/Category/subcategories"
    );

    const categories: Category[] = Object.keys(subcategories).map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    }));

    return categories;
  },
};