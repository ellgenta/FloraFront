function SearchSection() {
  return (
    <section className="search-section">
      <div className="search-section__form">
        <input
          type="text"
          placeholder="Search for flowers, plants, decor..."
          className="search-section__input"
        />
        <button className="search-section__button">Search</button>
      </div>
    </section>
  );
}

export default SearchSection;