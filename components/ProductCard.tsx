import { type Product } from '../src/data/products';

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
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-card__image" />
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
