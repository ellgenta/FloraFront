import { type Product } from '../data/products';
import ProductCard from './ProductCard';
import "../styles/ProductList.css";
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
    <div className="product-list">
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
