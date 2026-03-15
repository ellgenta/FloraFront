import { useState } from 'react';
import { products, type Product } from '../data/products';
import '../pages/Catalog.css';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      className={`filter-btn ${isActive ? 'filter-btn--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  isInCart: boolean;
}

function ProductCard({ product, onAddToCart, onRemoveFromCart, isInCart }: ProductCardProps) {
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

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'flowers' | 'accessories'>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <div className="catalog">
      <div className="catalog__header">
        <h1 className="catalog__title">Product Catalog</h1>
        <div className="catalog__cart-summary">
          <span className="cart-count">{cartItems.length} items in cart</span>
        </div>
      </div>

      <div className="catalog__filters">
        <FilterButton
          label="All"
          isActive={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        />
        <FilterButton
          label="Flowers"
          isActive={selectedCategory === 'flowers'}
          onClick={() => setSelectedCategory('flowers')}
        />
        <FilterButton
          label="Accessories"
          isActive={selectedCategory === 'accessories'}
          onClick={() => setSelectedCategory('accessories')}
        />
      </div>

      <div className="catalog__products">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            isInCart={cartItems.some(item => item.id === product.id)}
          />
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="catalog__cart">
          <h2 className="cart__title">Your Cart</h2>
          <div className="cart__items">
            {cartItems.map(item => (
              <div key={item.id} className="cart__item">
                <span className="cart__item-name">{item.name}</span>
                <span className="cart__item-price">${item.price}</span>
                <button 
                  className="cart__remove-btn"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart__total">
            Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}