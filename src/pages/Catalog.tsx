import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { productApi } from "../api/productApi";
import { categoryApi } from "../api/categoryApi";

import type { Product } from "../types/product";
import type { SubcategoriesMap } from "../types/category";

import { useCart } from "../contexts/CartContext";

import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";

import "../styles/Catalog.css";

type SortOption = "" | "price-asc" | "price-desc" | "discount";

type CategoryOption = {
  value: string;
  label: string;
};

const PAGE_SIZE = 12;

export default function Catalog() {
  const location = useLocation();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoriesMap>({});

  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = (location.state as { category?: string } | null)?.category;
    return cat ? [cat] : [];
  });

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<SortOption>("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const categories: CategoryOption[] = useMemo(() => {
    return Object.keys(subcategories).map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    }));
  }, [subcategories]);

  const allSubcategoryValues = useMemo(() => {
    return Object.values(subcategories)
      .flat()
      .map((subcategory) => subcategory.value);
  }, [subcategories]);

  const loadCatalogData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [productsData, subcategoriesData] = await Promise.all([
        productApi.getAll(),
        categoryApi.getSubcategories(),
      ]);

      setProducts(productsData);
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
    const cat = (location.state as { category?: string } | null)?.category;

    if (cat) {
      setSelectedCategories([cat]);
      setCurrentPage(1);
    }
  }, [location.state]);

  const toggleCategory = (cat: string) => {
    setCurrentPage(1);

    setSelectedCategories((prev) => {
      const isSubcategory = allSubcategoryValues.includes(cat);

      if (prev.includes(cat)) {
        const subsToRemove =
          subcategories[cat]?.map((subcategory) => subcategory.value) ?? [];

        return prev.filter(
          (category) => category !== cat && !subsToRemove.includes(category)
        );
      }

      if (isSubcategory) {
        const parentCategory = Object.entries(subcategories).find(([, subs]) =>
          subs.some((subcategory) => subcategory.value === cat)
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

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategories.length === 0) {
          return true;
        }

        const activeSubcategories = selectedCategories.filter((category) =>
          allSubcategoryValues.includes(category)
        );

        const activeCategories = selectedCategories.filter(
          (category) => !allSubcategoryValues.includes(category)
        );

        const categoryMatch = activeCategories.includes(product.category);

        if (!categoryMatch) {
          return false;
        }

        const subsForThisCategory =
          subcategories[product.category]?.map(
            (subcategory) => subcategory.value
          ) ?? [];

        const activeSubsForThisCategory = activeSubcategories.filter(
          (subcategory) => subsForThisCategory.includes(subcategory)
        );

        if (activeSubsForThisCategory.length > 0) {
          return product.subcategory
            ? activeSubsForThisCategory.includes(product.subcategory)
            : false;
        }

        return true;
      })
      .filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      )
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.price - b.price;
        }

        if (sortBy === "price-desc") {
          return b.price - a.price;
        }

        return 0;
      });
  }, [
    products,
    selectedCategories,
    allSubcategoryValues,
    subcategories,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  if (isLoading) {
    return (
      <div className="catalog">
        <div className="catalog__inner">
          <main className="catalog__main">
            <p>Loading catalog...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog">
        <div className="catalog__inner">
          <main className="catalog__main">
            <p>{error}</p>

            <button type="button" onClick={loadCatalogData}>
              Try Again
            </button>
          </main>
        </div>
      </div>
    );
  }

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
            onSortChange={(sortOption) => {
              setSortBy(sortOption);
              setCurrentPage(1);
            }}
            categories={categories}
            subcategories={subcategories}
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
                aria-label="Previous page"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`catalog__pagination-btn${
                      page === safePage
                        ? " catalog__pagination-btn--active"
                        : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === safePage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

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