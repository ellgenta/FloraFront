export type CategoryImage = {
  id: number;
  url: string;
  categoryId: number;
};

export type Category = {
  id: number;
  name: string;
  image: CategoryImage | null;
};

export type Subcategory = {
  id: number;
  name: string;
  categoryId: number;
};