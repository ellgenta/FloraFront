import ProductCard from '../components/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { products } from '../data/products';
import '../styles/FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    return (
      <section className="favorites-page">
        <div className="favorites-page__empty">
          <h1 className="favorites-page__title">Favorites</h1>
          <p className="favorites-page__subtitle">
            Your favorite products will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="favorites-page__container">
        <h1 className="favorites-page__title favorites-page__title--top">
          Favorites
        </h1>

        <div className="favorites-page__grid">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => {}}
              onRemoveFromCart={() => {}}
              isInCart={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}