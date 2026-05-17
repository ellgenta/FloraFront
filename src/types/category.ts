export type Category = {
  id: number;
  name: string;
};

export type Subcategory = {
  id: number;
  name: string;
  categoryId: number;
};