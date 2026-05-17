import "../styles/FilterSidebar.css";
import type { Category, Subcategory } from "../types/category";

type SortOption = "" | "price-asc" | "price-desc" | "discount";

interface FilterSidebarProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  categories: Category[];
  subcategories: Subcategory[];
  selectedCategoryIds: number[];
  selectedSubcategoryIds: number[];
  onToggleCategory: (id: number) => void;
  onToggleSubcategory: (id: number) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterSidebar({
  minPrice, maxPrice, onPriceChange,
  categories, subcategories,
  selectedCategoryIds, selectedSubcategoryIds,
  onToggleCategory, onToggleSubcategory,
  sortBy, onSortChange,
}: FilterSidebarProps) {
  const PRICE_MIN = 0;
  const PRICE_MAX = 1000;

  const leftPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const rightPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="filter-sidebar">
      <p className="filter-sidebar__title">Filters</p>
      <div className="filter-sidebar__divider" />

      <p className="filter-sidebar__section-title">Price</p>
      <div className="filter-sidebar__range-wrapper">
        <div className="filter-sidebar__range-track">
          <div className="filter-sidebar__range-fill" style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }} />
        </div>
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={10} value={minPrice}
          onChange={(e) => onPriceChange(Math.min(Number(e.target.value), maxPrice - 10), maxPrice)}
          className="filter-sidebar__range" />
        <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={10} value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, Math.max(Number(e.target.value), minPrice + 10))}
          className="filter-sidebar__range" />
      </div>

      <div className="filter-sidebar__price-inputs">
        <div className="filter-sidebar__price-input-group">
          <span className="filter-sidebar__price-input-label">From</span>
          <input type="number" min={PRICE_MIN} max={maxPrice - 10} step={10} value={minPrice}
            onChange={(e) => onPriceChange(Math.min(Number(e.target.value), maxPrice - 10), maxPrice)}
            className="filter-sidebar__price-input" />
        </div>
        <div className="filter-sidebar__price-input-sep">—</div>
        <div className="filter-sidebar__price-input-group">
          <span className="filter-sidebar__price-input-label">To</span>
          <input type="number" min={minPrice + 10} max={PRICE_MAX} step={10} value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, Math.max(Number(e.target.value), minPrice + 10))}
            className="filter-sidebar__price-input" />
        </div>
      </div>

      <div className="filter-sidebar__divider" />
      <p className="filter-sidebar__section-title">Products</p>

      <div className="filter-sidebar__categories">
        {categories.map((cat) => (
          <div key={cat.id}>
            <div className="filter-sidebar__toggle-row">
              <span className="filter-sidebar__toggle-label">{cat.name}</span>
              <label className="filter-sidebar__toggle">
                <input type="checkbox"
                  checked={selectedCategoryIds.includes(cat.id)}
                  onChange={() => onToggleCategory(cat.id)} />
                <span className="filter-sidebar__toggle-track" />
                <span className="filter-sidebar__toggle-thumb" />
              </label>
            </div>

            <div className="filter-sidebar__subcategories">
              {subcategories.filter((sub) => sub.categoryId === cat.id).map((sub) => (
                <label key={sub.id} className="filter-sidebar__checkbox-row filter-sidebar__checkbox-row--sub">
                  <input type="checkbox"
                    className="filter-sidebar__checkbox filter-sidebar__checkbox--sub"
                    checked={selectedSubcategoryIds.includes(sub.id)}
                    onChange={() => onToggleSubcategory(sub.id)} />
                  <span className="filter-sidebar__checkbox-label filter-sidebar__checkbox-label--sub">
                    {sub.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
        {categories.length === 0 && <p className="filter-sidebar__empty">No categories found</p>}
      </div>

      <div className="filter-sidebar__divider" />
      <div className="filter-sidebar__sort">
        <span className="filter-sidebar__section-title">Sort by</span>
        <select className="filter-sidebar__sort-select" value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}>
          <option value="">— Select —</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>
    </div>
  );
}