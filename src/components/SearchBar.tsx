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
  { image: plantsImg, title: 'Plants', description: 'Indoor and garden plants for your home' },
  { image: potsImg, title: 'Pots', description: 'Stylish pots and planters in all sizes' },
  { image: fertilizersImg, title: 'Fertilizers', description: 'Everything you need to nourish and help your plants grow' },
  { image: toolsImg, title: 'Garden tools', description: 'Tools for maintenance and planting' },
];

function SearchSection({ value, onChange }: SearchSectionProps) {
  return (
    <section className="search-section">
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
          <CategoryCard key={cat.title} {...cat} />
        ))}
      </div>
    </section>
  );
}

export default SearchSection;