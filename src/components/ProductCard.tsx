import { useNavigate } from "react-router-dom";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Product } from "../types/product";
import { useFavorites } from "../contexts/FavoritesContext";
import { getToken } from "../utils/auth";
import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string | number) => void;
  isInCart: boolean;
  isRecentlyViewed?: boolean;
}

const formatLabel = (value: string) => {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getSubcategoryLabel = (
  subcategory?: string | { id?: number; name?: string; categoryId?: number } | null
) => {
  if (!subcategory) {
    return "";
  }

  if (typeof subcategory === "string") {
    return formatLabel(subcategory);
  }

  return subcategory.name ? formatLabel(subcategory.name) : "";
};

export default function ProductCard({
  product,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
  isRecentlyViewed = false,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const productId = String(product.id);
  const liked = isFavorite(productId);

  const openProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductPage();
    }
  };

  const handleFavoriteClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!getToken()) {
      navigate("/login");
      return;
    }

    try {
      await toggleFavorite(product.id);
    } catch (error) {
      if (error instanceof Error && error.message === "AUTH_REQUIRED") {
        navigate("/login");
        return;
      }

      console.error("Toggle favorite error:", error);
    }
  };

  const handleCartClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!getToken()) {
      navigate("/login");
      return;
    }

    if (isInCart) {
      onRemoveFromCart(product.id);
      return;
    }

    onAddToCart(product);
  };

  return (
    <div
      className={`product-card${
        isRecentlyViewed ? " product-card--recently-viewed" : ""
      }`}
      onClick={openProductPage}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="product-card__image-wrapper">
        <img
          src={product.image || "/flower.png"}
          alt={product.name}
          className="product-card__image"
        />

        {product.subcategory && (
          <span className="product-card__tag">
            {getSubcategoryLabel(product.subcategory)}
          </span>
        )}

        <button
          type="button"
          className={`product-card__like${
            liked ? " product-card__like--active" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>

        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>

          <button
            type="button"
            className={`product-card__btn ${
              isInCart
                ? "product-card__btn--remove"
                : "product-card__btn--add"
            }`}
            onClick={handleCartClick}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>

      {isRecentlyViewed && (
        <div className="product-card__recent-overlay">
          <span className="product-card__recent-text">Viewed just now</span>
        </div>
      )}
    </div>
  );
}