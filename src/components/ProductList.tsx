import ProductCard from "./ProductCard";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import type { Product } from "../types/product";

import "../styles/ProductList.css";

interface ProductListProps {
  products: Product[];
  cartItems: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string | number) => void;
}

export default function ProductList({
  products,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: ProductListProps) {
  const { lastViewedProductId } = useRecentlyViewed();

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          isInCart={cartItems.some(
            (item) => String(item.id) === String(product.id)
          )}
          isRecentlyViewed={String(lastViewedProductId) === String(product.id)}
        />
      ))}

      {products.length === 0 && (
        <p className="product-list__empty">No products found</p>
      )}
    </div>
  );
}