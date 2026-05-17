import ProductCard from "./ProductCard";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

import "../styles/ProductList.css";

interface ProductListProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (itemId: number) => void;
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
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.productId === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onRemoveFromCart={() => cartItem && onRemoveFromCart(cartItem.id)}
            isInCart={!!cartItem}
            isRecentlyViewed={String(lastViewedProductId) === String(product.id)}
          />
        );
      })}

      {products.length === 0 && (
        <p className="product-list__empty">No products found</p>
      )}
    </div>
  );
}