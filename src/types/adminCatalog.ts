export type AdminCategoryImage = {
  url: string;
};

export type AdminCategory = {
  id: number;
  name: string;
  image: AdminCategoryImage | null;
};

export type AdminSubCategory = {
  id: number;
  name: string;
  categoryId: number;
  category?: AdminCategory | null;
};

export type CategoryCreateRequest = {
  name: string;
  image: AdminCategoryImage;
};

export type CategoryUpdateRequest = {
  name: string;
  image: AdminCategoryImage;
};


export type SubCategoryCreateRequest = {
  name: string;
  categoryId: number;
};

export type SubCategoryUpdateRequest = {
  name: string;
  categoryId: number;
};