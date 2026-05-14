import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { productApi } from "../api/productApi";
import type { Product } from "../types/product";

import "../styles/FavoritesPage.css";

export default function FavoritesPage() {
  const navigate = useNavigate();

  const { favorites } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Load favorite products error:", error);
      setError("Failed to load favorite products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const favoriteProducts = useMemo(() => {
    return products.filter((product) =>
      favorites.includes(String(product.id))
    );
  }, [products, favorites]);

  const isProductInCart = (productId: string | number) => {
    return cartItems.some((item) => String(item.id) === String(productId));
  };

  if (isLoading) {
    return (
      <section className="favorites-page">
        <div className="favorites-page__empty">
          <h1 className="favorites-page__title">Favorites</h1>
          <p className="favorites-page__subtitle">
            Loading favorite products...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="favorites-page">
        <div className="favorites-page__empty">
          <h1 className="favorites-page__title">Favorites</h1>
          <p className="favorites-page__subtitle">{error}</p>

          <button
            type="button"
            className="favorites-page__button"
            onClick={loadProducts}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <section className="favorites-page">
        <div className="favorites-page__empty">
          <h1 className="favorites-page__title">Favorites</h1>

          <p className="favorites-page__subtitle">
            Your favorite products will appear here.
          </p>

          <button
            type="button"
            className="favorites-page__button"
            onClick={() => navigate("/catalog")}
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="favorites-page__container">
        <h1 className="favorites-page__title favorites-page__title--top">
          Favorites
        </h1>

        <div className="favorites-page__grid">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              isInCart={isProductInCart(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}