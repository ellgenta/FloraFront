import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { favoriteApi } from "../api/favoriteApi";
import type { Favorite } from "../types/favorite";
import type { Product } from "../types/product";
import { getToken, getUserIdFromToken } from "../utils/auth";

interface FavoritesContextType {
  favorites: string[];
  favoriteProducts: Product[];
  isLoading: boolean;
  error: string;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (productId: string | number) => Promise<void>;
  isFavorite: (productId: string | number) => boolean;
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteItems, setFavoriteItems] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const favorites = useMemo(() => {
    return favoriteItems.map((favorite) => String(favorite.productId));
  }, [favoriteItems]);

  const favoriteProducts = useMemo(() => {
    return favoriteItems.map((favorite) => favorite.product);
  }, [favoriteItems]);

  const loadFavorites = async () => {
    const token = getToken();
    const userId = getUserIdFromToken();

    if (!token || !userId) {
      setFavoriteItems([]);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await favoriteApi.getByUserId(userId);
      setFavoriteItems(data);
    } catch (error) {
      console.error("Load favorites error:", error);
      setError("Failed to load favorites");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const isFavorite = (productId: string | number) => {
    return favorites.includes(String(productId));
  };

  const toggleFavorite = async (productId: string | number) => {
    const token = getToken();
    const userId = getUserIdFromToken();

    if (!token || !userId) {
      throw new Error("AUTH_REQUIRED");
    }

    const normalizedProductId = String(productId);

    if (favorites.includes(normalizedProductId)) {
      await favoriteApi.remove(userId, productId);

      setFavoriteItems((prev) =>
        prev.filter(
          (favorite) => String(favorite.productId) !== normalizedProductId
        )
      );

      return;
    }

    const createdFavorite = await favoriteApi.add(userId, productId);

    setFavoriteItems((prev) => {
      const alreadyExists = prev.some(
        (favorite) => String(favorite.productId) === normalizedProductId
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, createdFavorite];
    });
  };

  const clearFavorites = async () => {
    const token = getToken();
    const userId = getUserIdFromToken();

    if (!token || !userId) {
      throw new Error("AUTH_REQUIRED");
    }

    await favoriteApi.clear(userId);
    setFavoriteItems([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteProducts,
        isLoading,
        error,
        loadFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}