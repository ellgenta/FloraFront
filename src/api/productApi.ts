import { http } from "./http";
import type {
  Product,
  ProductCreateRequest,
  ProductUpdateRequest,
} from "../types/product";

type BackendProductCategory = {
  id?: number;
  name?: number;
  subCategories?: string[] | null;
};

type BackendProductDescription = {
  id?: number;
  description?: string;
  productId?: number;
};

type BackendProductImage = {
  id?: number;
  url?: string;
  productId?: number;
};

type BackendProduct = {
  id: number;
  name: string;
  description?: BackendProductDescription | null;
  category?: BackendProductCategory | number | null;
  subCategory?: string;
  images?: BackendProductImage[] | null;
  price: number;
  status?: number;
};

type BackendProductDto = {
  id?: number;
  name: string;
  description: {
    description: string;
  };
  category: {
    name: number;
  };
  subCategory: string;
  images: {
    url: string;
  }[];
  price: number;
};

const categoryMap: Record<string, number> = {
  plants: 0,
  pots: 1,
  fertilizers: 2,
  tools: 3,
};

const reverseCategoryMap: Record<number, string> = {
  0: "plants",
  1: "pots",
  2: "fertilizers",
  3: "tools",
};

const mapCategoryToBackend = (category: string): number => {
  return categoryMap[category] ?? 0;
};

const mapCategoryToFrontend = (
  category: BackendProduct["category"]
): string => {
  if (typeof category === "number") {
    return reverseCategoryMap[category] ?? "plants";
  }

  if (typeof category?.name === "number") {
    return reverseCategoryMap[category.name] ?? "plants";
  }

  return "plants";
};

const mapBackendProductToProduct = (product: BackendProduct): Product => {
  return {
    id: product.id,
    name: product.name,
    category: mapCategoryToFrontend(product.category),
    subcategory: product.subCategory || "",
    price: product.price,
    image: product.images?.[0]?.url || "/flower.png",
    description: product.description?.description || "",
    stock: undefined,
  };
};

const mapProductToBackendDto = (
  product: ProductCreateRequest | ProductUpdateRequest
): BackendProductDto => {
  return {
    name: product.name,
    description: {
      description: product.description,
    },
    category: {
      name: mapCategoryToBackend(product.category),
    },
    subCategory: product.subcategory || "",
    images: product.image
      ? [
          {
            url: product.image,
          },
        ]
      : [],
    price: product.price,
  };
};

export const productApi = {
  getAll: async () => {
    const data = await http<BackendProduct[]>("/api/product/getAll");

    return data.map(mapBackendProductToProduct);
  },

  getById: async (id: string | number) => {
    const data = await http<BackendProduct>(`/api/product/getById?id=${id}`);

    return mapBackendProductToProduct(data);
  },

  getByCategory: async (category: string) => {
    const backendCategory = mapCategoryToBackend(category);

    const data = await http<BackendProduct[]>(
      `/api/product/getByCategory/${backendCategory}`
    );

    return data.map(mapBackendProductToProduct);
  },

  getBySubCategory: async (subCategory: string) => {
    const data = await http<BackendProduct[]>(
      `/api/product/getBySubCategory/${subCategory}`
    );

    return data.map(mapBackendProductToProduct);
  },

  create: async (product: ProductCreateRequest) => {
    const data = await http<BackendProduct>("/api/product/create", {
      method: "POST",
      body: JSON.stringify(mapProductToBackendDto(product)),
    });

    return mapBackendProductToProduct(data);
  },

  update: async (id: string | number, product: ProductUpdateRequest) => {
    const data = await http<BackendProduct>(`/api/product/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(mapProductToBackendDto(product)),
    });

    return mapBackendProductToProduct(data);
  },

  delete: (id: string | number) => {
    return http<void>(`/api/product/delete/${id}`, {
      method: "DELETE",
    });
  },
};