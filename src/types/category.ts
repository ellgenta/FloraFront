export type Subcategory = {
  value: string;
  label: string;
};

export type SubcategoriesMap = Record<string, Subcategory[]>;

export type Category = {
  value: string;
  label: string;
  description?: string;
  image?: string;
};