import { http } from "./http";
import type { Favorite } from "../types/favorite";
import type { Product } from "../types/product";

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

type BackendCategory = {
  id?: number;
  name?: string | number;
};

type BackendSubCategory = {
  id?: number;
  name?: string;
  categoryId?: number;
};

type BackendProduct = {
  id: number;
  name: string;
  description?: BackendProductDescription | string | null;
  category?: BackendCategory | string | number | null;
  subCategory?: BackendSubCategory | string | null;
  images?: BackendProductImage[] | null;
  price: number;
  status?: number;
};

type BackendFavorite = {
  id: number;
  userId: number;
  productId: number;
  product: BackendProduct;
};

type FavoriteCheckResponse = {
  isFavorite?: boolean;
  IsFavorite?: boolean;
};

const mapCategoryToFrontend = (
  category: BackendProduct["category"]
): Product["category"] => {
  if (!category) {
    return null;
  }

  if (typeof category === "string" || typeof category === "number") {
    return {
      id: 0,
      name: String(category),
    };
  }

  return {
    id: category.id ?? 0,
    name: category.name !== undefined ? String(category.name) : "",
  };
};

const mapSubCategoryToFrontend = (
  subCategory: BackendProduct["subCategory"]
): Product["subcategory"] => {
  if (!subCategory) {
    return null;
  }

  if (typeof subCategory === "string") {
    return {
      id: 0,
      name: subCategory,
      categoryId: 0,
    };
  }

  return {
    id: subCategory.id ?? 0,
    name: subCategory.name || "",
    categoryId: subCategory.categoryId ?? 0,
  };
};

const mapDescriptionToFrontend = (
  description: BackendProduct["description"]
): string => {
  if (!description) {
    return "";
  }

  if (typeof description === "string") {
    return description;
  }

  return description.description || "";
};

const mapBackendProductToProduct = (product: BackendProduct): Product => {
  return {
    id: product.id,
    name: product.name,
    category: mapCategoryToFrontend(product.category),
    subcategory: mapSubCategoryToFrontend(product.subCategory),
    price: product.price,
    image: product.images?.[0]?.url || "/flower.png",
    description: mapDescriptionToFrontend(product.description),
  };
};

const mapBackendFavoriteToFavorite = (
  favorite: BackendFavorite
): Favorite => {
  return {
    id: favorite.id,
    userId: favorite.userId,
    productId: favorite.productId,
    product: mapBackendProductToProduct(favorite.product),
  };
};

const favoriteApi = {
  getByUserId: async (userId: number) => {
    const data = await http<BackendFavorite[]>(
      `/api/favorite/user/${userId}`
    );

    return data.map(mapBackendFavoriteToFavorite);
  },

  add: async (userId: number, productId: string | number) => {
    const data = await http<BackendFavorite>("/api/favorite", {
      method: "POST",
      body: JSON.stringify({
        userId,
        productId: Number(productId),
      }),
    });

    return mapBackendFavoriteToFavorite(data);
  },

  remove: (userId: number, productId: string | number) => {
    return http<void>(`/api/favorite/${userId}/${productId}`, {
      method: "DELETE",
    });
  },

  check: async (userId: number, productId: string | number) => {
    const data = await http<FavoriteCheckResponse>(
      `/api/favorite/check/${userId}/${productId}`
    );

    return Boolean(data.isFavorite ?? data.IsFavorite);
  },

  clear: (userId: number) => {
    return http<void>(`/api/favorite/clear/${userId}`, {
      method: "DELETE",
    });
  },
};
export { favoriteApi };
export default favoriteApi;