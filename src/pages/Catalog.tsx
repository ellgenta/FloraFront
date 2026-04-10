import { useState } from 'react';
import { products } from '../data/products';
import { SUBCATEGORIES } from '../data/subcategories';
import { useCart } from '../contexts/CartContext';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import '../styles/Catalog.css';

type SortOption = '' | 'price-asc' | 'price-desc' | 'discount';

const ALL_SUBCATEGORY_VALUES = Object.values(SUBCATEGORIES).flat().map(s => s.value);
const PAGE_SIZE = 12;

export default function Catalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<SortOption>('');
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItems, addToCart, removeFromCart } = useCart();

  const toggleCategory = (cat: string) => {
    setCurrentPage(1);
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

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="catalog">
      <div className="catalog__inner">
        <aside className="catalog__sidebar">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
              setCurrentPage(1);
            }}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            sortBy={sortBy}
            onSortChange={(s) => { setSortBy(s); setCurrentPage(1); }}
          />
        </aside>

        <main className="catalog__main">
          <ProductList
            products={paginatedProducts}
            cartItems={cartItems}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />

          {totalPages > 1 && (
            <div className="catalog__pagination">
              <button
                className="catalog__pagination-btn catalog__pagination-btn--arrow"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                aria-label="Previous page"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`catalog__pagination-btn${page === safePage ? ' catalog__pagination-btn--active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === safePage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                className="catalog__pagination-btn catalog__pagination-btn--arrow"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}