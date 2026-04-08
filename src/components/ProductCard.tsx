import { type Product } from '../data/products';
import { useFavorites } from '../contexts/FavoritesContext';
import '../styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  isInCart: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
}: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.name} className="product-card__image" />

        {product.subcategory && (
          <span className="product-card__tag">{product.subcategory}</span>
        )}

        <button
          className={`product-card__like${liked ? ' product-card__like--active' : ''}`}
          onClick={() => toggleFavorite(product.id)}
          aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
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
          {isInCart ? (
            <button
              className="product-card__btn product-card__btn--remove"
              onClick={() => onRemoveFromCart(product.id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="product-card__btn product-card__btn--add"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}