import { createContext, useContext, useState, type ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (productId: string | number) => void;
  isFavorite: (productId: string | number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string | number) => {
    const normalizedProductId = String(productId);

    setFavorites((prev) =>
      prev.includes(normalizedProductId)
        ? prev.filter((id) => id !== normalizedProductId)
        : [...prev, normalizedProductId]
    );
  };

  const isFavorite = (productId: string | number) => {
    return favorites.includes(String(productId));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
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