import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import '../styles/Catalog.css';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'discount';

export default function Catalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const { cartItems, addToCart, removeFromCart } = useCart();

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="catalog">
      <div className="catalog__inner">
        <aside className="catalog__sidebar">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
        </aside>

        <main className="catalog__main">
          <div className="catalog__top-bar">
            <h1 className="catalog__title">Flora Catalog</h1>
            <div className="catalog__sort">
              <label className="catalog__sort-label">Sort by</label>
              <select
                className="catalog__sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          <ProductList
            products={filteredProducts}
            cartItems={cartItems}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        </main>
      </div>
    </div>
  );
}