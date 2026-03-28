import "../styles/SearchBar.css";

interface SearchSectionProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchSection({ value, onChange }: SearchSectionProps) {
  return (
    <section className="search-section">
      <div className="search-section__form">
        <input
          type="text"
          placeholder="Search for flowers, plants, decor..."
          className="search-section__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </section>
  );
}

export default SearchSection;