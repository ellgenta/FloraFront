import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";
import CategoryCard from "./CategoryCard";
import plantsImg from '../assets/images/Plants.jpg';
import potsImg from '../assets/images/Pots.jpg';
import toolsImg from '../assets/images/Garden Tools.jpg';
import fertilizersImg from '../assets/images/Fertilizers.jpg';

interface SearchSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  { image: plantsImg,       title: 'Plants',       description: 'Indoor and garden plants for your home',                  filterValue: 'plants' },
  { image: potsImg,         title: 'Pots',         description: 'Stylish pots and planters in all sizes',                  filterValue: 'pots' },
  { image: fertilizersImg,  title: 'Fertilizers',  description: 'Everything you need to nourish and help your plants grow', filterValue: 'fertilizers' },
  { image: toolsImg,        title: 'Garden tools', description: 'Tools for maintenance and planting',                      filterValue: 'tools' },
];

function SearchSection({ value, onChange }: SearchSectionProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (filterValue: string) => {
    navigate("/catalog", { state: { category: filterValue } });
  };

  return (
    <section id="search_section" className="search-section">
      <h2 className="search-section__title">Explore the web meadow</h2>

      <div className="search-section__form">
        <input
          type="text"
          placeholder="Search for plants, accessories, tools..."
          className="search-section__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="search-section__categories">
        {categories.map((cat) => (
          <div
            key={cat.title}
            onClick={() => handleCategoryClick(cat.filterValue)}
            style={{ cursor: "pointer" }}
          >
            <CategoryCard
              image={cat.image}
              title={cat.title}
              description={cat.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchSection;
