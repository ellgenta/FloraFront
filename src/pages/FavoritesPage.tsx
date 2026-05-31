import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { getToken } from "../utils/auth";
import "../styles/FavoritesPage.css";

export default function FavoritesPage() {
  const navigate = useNavigate();

  const { favoriteProducts, isLoading, error, loadFavorites } = useFavorites();

  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
      return;
    }

    loadFavorites();
  }, []);

  const isProductInCart = (productId: string | number) => {
    return cartItems.some(
      (item) => String(item.productId) === String(productId)
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    const cartItem = cartItems.find(
      (item) => String(item.productId) === String(productId)
    );

    if (!cartItem) {
      return;
    }

    removeFromCart(cartItem.id);
  };

  if (isLoading) {
    return (
      <main className="favorites-page">
        <h1>Favorites</h1>
        <p>Loading favorite products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="favorites-page">
        <h1>Favorites</h1>
        <p>{error}</p>
        <button onClick={loadFavorites}>Try Again</button>
      </main>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <main className="favorites-page">
        <h1>Favorites</h1>
        <p>Your favorite products will appear here.</p>
        <button onClick={() => navigate("/catalog")}>Continue Shopping</button>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <h1>Favorites</h1>

      <div className="favorites-grid">
        {favoriteProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isProductInCart(product.id)}
            onAddToCart={addToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </main>
  );
}