export type AdminCategory = {
  id: number;
  name: string;
};

export type AdminSubCategory = {
  id: number;
  name: string;
  categoryId: number;
  category?: AdminCategory | null;
};

export type CategoryCreateRequest = {
  name: string;
};

export type CategoryUpdateRequest = {
  name: string;
};

export type SubCategoryCreateRequest = {
  name: string;
  categoryId: number;
};

export type SubCategoryUpdateRequest = {
  name: string;
  categoryId: number;
};