import { http } from "./http";
import {
  ProductStatus,
  type Product,
  type ProductCreateRequest,
  type ProductUpdateRequest,
} from "../types/product";

type BackendProduct = {
  id: number;
  name: string;
  description?: {
    id?: number;
    description?: string;
    productId?: number;
  } | null;
  category?: {
    id: number;
    name: string;
  } | null;
  subCategory?: {
    id: number;
    name: string;
    categoryId: number;
  } | null;
  images?: {
    id?: number;
    url?: string;
    productId?: number;
  }[] | null;
  price: number;
  status?: ProductStatus;
};

const mapBackendProductToProduct = (product: BackendProduct): Product => ({
  id: product.id,
  name: product.name,
  category: product.category ?? null,
  subcategory: product.subCategory ?? null,
  price: product.price,
  image: product.images?.[0]?.url || "/flower.png",
  description: product.description?.description || "",
  status: product.status ?? ProductStatus.Unknown,
});

export const productApi = {
  getAll: async () => {
    const data = await http<BackendProduct[]>("/api/product/getAll");
    return data.map(mapBackendProductToProduct);
  },

  getById: async (id: number) => {
    const data = await http<BackendProduct>(`/api/product/getById?id=${id}`);
    return mapBackendProductToProduct(data);
  },

  getByCategory: async (categoryId: number) => {
    const data = await http<BackendProduct[]>(
      `/api/product/category/${categoryId}`
    );

    return data.map(mapBackendProductToProduct);
  },

  getBySubCategory: async (subCategoryId: number) => {
    const data = await http<BackendProduct[]>(
      `/api/product/subcategory/${subCategoryId}`
    );

    return data.map(mapBackendProductToProduct);
  },

  create: async (product: ProductCreateRequest) => {
    const data = await http<BackendProduct>("/api/product/create", {
      method: "POST",
      body: JSON.stringify({
        name: product.name,
        description: {
          description: product.description,
        },
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        images: product.image ? [{ url: product.image }] : [],
        price: product.price,
      }),
    });

    return mapBackendProductToProduct(data);
  },

  update: async (id: number, product: ProductUpdateRequest) => {
    const data = await http<BackendProduct>(`/api/product/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: product.name,
        description: {
          description: product.description,
        },
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        images: product.image ? [{ url: product.image }] : [],
        price: product.price,
        status: product.status,
      }),
    });

    return mapBackendProductToProduct(data);
  },

  delete: (id: number) => {
    return http<void>(`/api/product/delete/${id}`, {
      method: "DELETE",
    });
  },

  filter: async (categoryIds: number[], subCategoryIds: number[]) => {
    const data = await http<BackendProduct[]>("/api/product/filter", {
      method: "POST",
      body: JSON.stringify({
        categoryIds: categoryIds.length > 0 ? categoryIds : null,
        subCategoryIds: subCategoryIds.length > 0 ? subCategoryIds : null,
      }),
    });

    return data.map(mapBackendProductToProduct);
  },
};