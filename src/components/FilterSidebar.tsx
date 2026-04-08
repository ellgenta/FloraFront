import '../styles/FilterSidebar.css';

const PLANT_SUBCATEGORIES = [
  { value: 'decorative-foliage', label: 'Decorative Foliage' },
  { value: 'flowering', label: 'Flowering Plants' },
  { value: 'succulents', label: 'Succulents' },
  { value: 'palms-trees', label: 'Palms & Trees' },
];

const CATEGORIES = [
  { value: 'plants', label: 'Plants', hasSubcategories: true },
  { value: 'accessories', label: 'Accessories' },
  { value: 'fertilizers', label: 'Fertilizers' },
  { value: 'tools', label: 'Tools' },
];

type SortOption = '' | 'price-asc' | 'price-desc' | 'discount';

interface FilterSidebarProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterSidebar({
  minPrice,
  maxPrice,
  onPriceChange,
  selectedCategories,
  onToggleCategory,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  const PRICE_MIN = 0;
  const PRICE_MAX = 1000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - 10);
    onPriceChange(val, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + 10);
    onPriceChange(minPrice, val);
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - 10);
    if (!isNaN(val)) onPriceChange(val, maxPrice);
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + 10);
    if (!isNaN(val)) onPriceChange(minPrice, val);
  };

  const leftPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const rightPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <div className="filter-sidebar">

      <p className="filter-sidebar__title">Filters</p>
      <div className="filter-sidebar__divider" />

      <p className="filter-sidebar__section-title">Price</p>

      <div className="filter-sidebar__range-wrapper">
        <div className="filter-sidebar__range-track">
          <div
            className="filter-sidebar__range-fill"
            style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
          />
        </div>
        <input
          type="range" min={PRICE_MIN} max={PRICE_MAX} step={10}
          value={minPrice} onChange={handleMinChange}
          className="filter-sidebar__range"
        />
        <input
          type="range" min={PRICE_MIN} max={PRICE_MAX} step={10}
          value={maxPrice} onChange={handleMaxChange}
          className="filter-sidebar__range"
        />
      </div>

      <div className="filter-sidebar__price-inputs">
        <div className="filter-sidebar__price-input-group">
          <span className="filter-sidebar__price-input-label">From</span>
          <input
            type="number" min={PRICE_MIN} max={maxPrice - 10} step={10}
            value={minPrice}
            onChange={handleMinInput}
            className="filter-sidebar__price-input"
          />
        </div>
        <div className="filter-sidebar__price-input-sep">—</div>
        <div className="filter-sidebar__price-input-group">
          <span className="filter-sidebar__price-input-label">To</span>
          <input
            type="number" min={minPrice + 10} max={PRICE_MAX} step={10}
            value={maxPrice}
            onChange={handleMaxInput}
            className="filter-sidebar__price-input"
          />
        </div>
      </div>

      <div className="filter-sidebar__divider" />

      <p className="filter-sidebar__section-title">Products</p>
      <div className="filter-sidebar__categories">
        {CATEGORIES.map(cat => (
          <div key={cat.value}>
            <div className="filter-sidebar__toggle-row">
              <span className="filter-sidebar__toggle-label">{cat.label}</span>
              <label className="filter-sidebar__toggle">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => onToggleCategory(cat.value)}
                />
                <span className="filter-sidebar__toggle-track" />
                <span className="filter-sidebar__toggle-thumb" />
              </label>
            </div>

            {cat.hasSubcategories && (
              <div className="filter-sidebar__subcategories">
                {PLANT_SUBCATEGORIES.map(sub => (
                  <label key={sub.value} className="filter-sidebar__checkbox-row filter-sidebar__checkbox-row--sub">
                    <input
                      type="checkbox"
                      className="filter-sidebar__checkbox filter-sidebar__checkbox--sub"
                      checked={selectedCategories.includes(sub.value)}
                      onChange={() => onToggleCategory(sub.value)}
                    />
                    <span className="filter-sidebar__checkbox-label filter-sidebar__checkbox-label--sub">
                      {sub.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="filter-sidebar__divider" />

      <div className="filter-sidebar__sort">
        <span className="filter-sidebar__section-title">Sort by</span>
        <select
          className="filter-sidebar__sort-select"
          value={sortBy}
          onChange={e => onSortChange(e.target.value as SortOption)}
        >
          <option value="">— Select —</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

    </div>
  );
}