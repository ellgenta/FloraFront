import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CategoryCard from "./CategoryCard";
import { categoryApi } from "../api/categoryApi";
import type { Category } from "../types/category";

import plantsImg from "../assets/images/Plants.jpg";
import potsImg from "../assets/images/Pots.jpg";
import toolsImg from "../assets/images/Garden Tools.jpg";
import fertilizersImg from "../assets/images/Fertilizers.jpg";

import "../styles/ExploreBar.css";

const getCategoryImage = (name: string) => {
  switch (name.toLowerCase()) {
    case "plants": return plantsImg;
    case "pots": return potsImg;
    case "fertilizers": return fertilizersImg;
    case "tools": return toolsImg;
    default: return plantsImg;
  }
};

const getCategoryDescription = (name: string) => {
  switch (name.toLowerCase()) {
    case "plants": return "Indoor and garden plants for your home";
    case "pots": return "Stylish pots and planters in all sizes";
    case "fertilizers": return "Everything you need to nourish and help your plants grow";
    case "tools": return "Tools for maintenance and planting";
    default: return "Explore products from this category";
  }
};

function SearchSection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoryApi.getAll()
      .then(setCategories)
      .catch((error) => console.error("Load categories error:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCategoryClick = (id: number) => {
    navigate("/catalog", { state: { categoryId: id } });
  };

  return (
    <section id="search_section" className="search-section">
      <h2 className="search-section__title">Explore the web meadow</h2>

      <div className="search-section__categories">
        {isLoading && <p>Loading categories...</p>}

        {!isLoading && categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            style={{ cursor: "pointer" }}
          >
            <CategoryCard
              image={getCategoryImage(category.name)}
              title={category.name}
              description={getCategoryDescription(category.name)}
            />
          </div>
        ))}

        {!isLoading && categories.length === 0 && (
          <p>No categories found</p>
        )}
      </div>
    </section>
  );
}

export default SearchSection;