import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { productApi } from "../api/productApi";
import { categoryApi } from "../api/categoryApi";

import type { Product } from "../types/product";
import type { Category, Subcategory } from "../types/category";

import { useCart } from "../contexts/CartContext";

import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";

import "../styles/Catalog.css";

type SortOption = "" | "price-asc" | "price-desc" | "discount";

const PAGE_SIZE = 12;

export default function Catalog() {
  const location = useLocation();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>(() => {
    const catId = (location.state as { categoryId?: number } | null)?.categoryId;
    return catId ? [catId] : [];
  });
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[]>([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCatalogData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [productsData, categoriesData, subcategoriesData] = await Promise.all([
        productApi.getAll(),
        categoryApi.getAll(),
        categoryApi.getAllSubcategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setSubcategories(subcategoriesData);
    } catch (error) {
      console.error("Load catalog data error:", error);
      setError("Failed to load catalog data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  useEffect(() => {
    const catId = (location.state as { categoryId?: number } | null)?.categoryId;
    if (catId) {
      setSelectedCategoryIds([catId]);
      setCurrentPage(1);
    }
  }, [location.state]);

  const toggleCategory = (id: number) => {
    setCurrentPage(1);
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    // Снимаем подкатегории этой категории если категория снята
    setSelectedSubcategoryIds((prev) =>
      prev.filter((subId) => {
        const sub = subcategories.find((s) => s.id === subId);
        return sub?.categoryId !== id;
      })
    );
  };

  const toggleSubcategory = (id: number) => {
    setCurrentPage(1);
    setSelectedSubcategoryIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategoryIds.length === 0) return true;
        if (!product.category) return false;

        const categoryMatch = selectedCategoryIds.includes(product.category.id);
        if (!categoryMatch) return false;

        if (selectedSubcategoryIds.length === 0) return true;
        if (!product.subcategory) return false;

        return selectedSubcategoryIds.includes(product.subcategory.id);
      })
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategoryIds, selectedSubcategoryIds, minPrice, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  if (isLoading) return <div className="catalog"><div className="catalog__inner"><main className="catalog__main"><p>Loading catalog...</p></main></div></div>;

  if (error) return (
    <div className="catalog"><div className="catalog__inner"><main className="catalog__main">
      <p>{error}</p>
      <button type="button" onClick={loadCatalogData}>Try Again</button>
    </main></div></div>
  );

  return (
    <div className="catalog">
      <div className="catalog__inner">
        <aside className="catalog__sidebar">
          <FilterSidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={(min, max) => { setMinPrice(min); setMaxPrice(max); setCurrentPage(1); }}
            categories={categories}
            subcategories={subcategories}
            selectedCategoryIds={selectedCategoryIds}
            selectedSubcategoryIds={selectedSubcategoryIds}
            onToggleCategory={toggleCategory}
            onToggleSubcategory={toggleSubcategory}
            sortBy={sortBy}
            onSortChange={(s) => { setSortBy(s); setCurrentPage(1); }}
          />
        </aside>

        <main className="catalog__main">
          <ProductList
            products={paginatedProducts}
            cartItems={cartItems}
            onAddToCart={(product) => addToCart(product)}
            onRemoveFromCart={(productId) => removeFromCart(String(productId))}
          />

          {totalPages > 1 && (
            <div className="catalog__pagination">
              <button
                className="catalog__pagination-btn catalog__pagination-btn--arrow"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
              >‹</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`catalog__pagination-btn${page === safePage ? " catalog__pagination-btn--active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="catalog__pagination-btn catalog__pagination-btn--arrow"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
              >›</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}