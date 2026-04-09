import { useState } from 'react';
import { products } from '../data/products';
import { SUBCATEGORIES } from '../data/subcategories';
import { useCart } from '../contexts/CartContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import '../styles/Catalog.css';

type SortOption = '' | 'price-asc' | 'price-desc' | 'discount';

const ALL_SUBCATEGORY_VALUES = Object.values(SUBCATEGORIES).flat().map(s => s.value);

export default function Catalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<SortOption>('');
  const { cartItems, addToCart, removeFromCart } = useCart();

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => {
      const isSubcategory = ALL_SUBCATEGORY_VALUES.includes(cat);

      if (prev.includes(cat)) {
        const subsToRemove = SUBCATEGORIES[cat]?.map(s => s.value) ?? [];
        return prev.filter(c => c !== cat && !subsToRemove.includes(c));
      }

      if (isSubcategory) {
        const parentCategory = Object.entries(SUBCATEGORIES).find(([, subs]) =>
          subs.some(s => s.value === cat)
        )?.[0];
        const next = [...prev, cat];
        if (parentCategory && !next.includes(parentCategory)) {
          next.push(parentCategory);
        }
        return next;
      }

      return [...prev, cat];
    });
  };

  const filteredProducts = products
    .filter(product => {
      if (selectedCategories.length === 0) return true;

      const activeSubcategories = selectedCategories.filter(c =>
        ALL_SUBCATEGORY_VALUES.includes(c)
      );
      const activeCategories = selectedCategories.filter(c =>
        !ALL_SUBCATEGORY_VALUES.includes(c)
      );

      const categoryMatch = activeCategories.includes(product.category);
      if (!categoryMatch) return false;

      const subsForThisCategory = SUBCATEGORIES[product.category]?.map(s => s.value) ?? [];
      const activeSubsForThisCategory = activeSubcategories.filter(s =>
        subsForThisCategory.includes(s)
      );

      if (activeSubsForThisCategory.length > 0) {
        return product.subcategory
          ? activeSubsForThisCategory.includes(product.subcategory)
          : false;
      }

      return true;
    })
    .filter(product => product.price >= minPrice && product.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
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
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </aside>

        <main className="catalog__main">
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