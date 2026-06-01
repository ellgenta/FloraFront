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

  const isProductInCart = (productId: string | number) =>
    cartItems.some((item) => String(item.productId) === String(productId));

  const handleRemoveFromCart = (productId: number) => {
    const cartItem = cartItems.find((item) => String(item.productId) === String(productId));
    if (cartItem) removeFromCart(cartItem.id);
  };

  if (isLoading) {
    return (
      <main className="favorites-page">
        <div className="favorites-page__container">
          <h1 className="favorites-page__heading">Favorites</h1>
          <p className="favorites-page__message">Loading favorite products...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="favorites-page">
        <div className="favorites-page__container">
          <h1 className="favorites-page__heading">Favorites</h1>
          <p className="favorites-page__message">{error}</p>
          <button className="favorites-page__button" onClick={loadFavorites}>Try Again</button>
        </div>
      </main>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <main className="favorites-page">
        <div className="favorites-page__container">
          <div className="favorites-page__empty">
            <h1 className="favorites-page__title">Favorites</h1>
            <p className="favorites-page__subtitle">Your favorite products will appear here.</p>
            <button className="favorites-page__button" onClick={() => navigate("/catalog")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <div className="favorites-page__container">
        <h1 className="favorites-page__heading favorites-page__heading--top">Favorites</h1>
        <div className="favorites-page__grid">
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
      </div>
    </main>
  );
}