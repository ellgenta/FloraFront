import { productApi } from "./productApi";
import type { Category, SubcategoriesMap } from "../types/category";
import type { Product } from "../types/product";

const DEFAULT_CATEGORIES: Category[] = [
  {
    value: "plants",
    label: "Plants",
    description: "Indoor and garden plants for your home",
  },
  {
    value: "pots",
    label: "Pots",
    description: "Stylish pots and planters in all sizes",
  },
  {
    value: "fertilizers",
    label: "Fertilizers",
    description: "Everything you need to nourish and help your plants grow",
  },
  {
    value: "tools",
    label: "Garden tools",
    description: "Tools for maintenance and planting",
  },
];

const formatLabel = (value: string) => {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const buildSubcategoriesFromProducts = (
  products: Product[]
): SubcategoriesMap => {
  return products.reduce<SubcategoriesMap>((acc, product) => {
    const category = product.category;
    const subcategory = product.subcategory;

    if (!category || !subcategory) {
      return acc;
    }

    if (!acc[category]) {
      acc[category] = [];
    }

    const alreadyExists = acc[category].some(
      (item) => item.value === subcategory
    );

    if (!alreadyExists) {
      acc[category].push({
        value: subcategory,
        label: formatLabel(subcategory),
      });
    }

    return acc;
  }, {});
};

const buildCategoriesFromProducts = (products: Product[]): Category[] => {
  const productCategories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  );

  const categoriesFromProducts = productCategories.map<Category>((category) => {
    const defaultCategory = DEFAULT_CATEGORIES.find(
      (item) => item.value === category
    );

    return {
      value: category,
      label: defaultCategory?.label || formatLabel(category),
      description:
        defaultCategory?.description || "Explore products from this category",
    };
  });

  if (categoriesFromProducts.length > 0) {
    return categoriesFromProducts;
  }

  return DEFAULT_CATEGORIES;
};

export const categoryApi = {
  getCategories: async () => {
    const products = await productApi.getAll();

    return buildCategoriesFromProducts(products);
  },

  getSubcategories: async () => {
    const products = await productApi.getAll();

    return buildSubcategoriesFromProducts(products);
  },
};