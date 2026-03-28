import { type Product } from '../src/data/products';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
}

export default function ProductList({
  products,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: ProductListProps) {
  return (
    <div className="catalog__products">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          isInCart={cartItems.some(item => item.id === product.id)}
        />
      ))}
    </div>
  );
}
