import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

interface FilterSidebarProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
}

export default function FilterSidebar({
  minPrice,
  maxPrice,
  onPriceChange,
  selectedCategories,
  onToggleCategory,
}: FilterSidebarProps) {
  const PRICE_MIN = 0;
  const PRICE_MAX = 1000;
  const [plantsExpanded, setPlantsExpanded] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxPrice - 10);
    onPriceChange(val, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minPrice + 10);
    onPriceChange(minPrice, val);
  };

  const leftPercent = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const rightPercent = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const handlePlantsToggle = () => {
    onToggleCategory('plants');
    if (!selectedCategories.includes('plants')) {
      setPlantsExpanded(true);
    } else {
      setPlantsExpanded(false);
    }
  };

  return (
    <div className="filter-sidebar">

      <p className="filter-sidebar__title">Filters</p>

      <div className="filter-sidebar__divider" />

      {/* Price */}
      <p className="filter-sidebar__section-title">Price</p>

      <div className="filter-sidebar__price-values">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>

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

      <div className="filter-sidebar__divider" />

      <p className="filter-sidebar__section-title">Products</p>
      <div className="filter-sidebar__categories">
        {CATEGORIES.map(cat => (
          <div key={cat.value}>
            <div className="filter-sidebar__category-row">
              <label className="filter-sidebar__checkbox-row">
                <input
                  type="checkbox"
                  className="filter-sidebar__checkbox"
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => cat.value === 'plants' ? handlePlantsToggle() : onToggleCategory(cat.value)}
                />
                <span className="filter-sidebar__checkbox-label">{cat.label}</span>
              </label>
              {cat.hasSubcategories && (
                <button
                  className={`filter-sidebar__expand-btn ${plantsExpanded ? 'filter-sidebar__expand-btn--open' : ''}`}
                  onClick={() => setPlantsExpanded(p => !p)}
                  aria-label="Toggle subcategories"
                >
                  <ChevronDown size={15} strokeWidth={2} />
                </button>
              )}
            </div>

            {/* Subcategories */}
            {cat.hasSubcategories && (
              <div className={`filter-sidebar__subcategories ${plantsExpanded ? 'filter-sidebar__subcategories--open' : ''}`}>
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

    </div>
  );
}