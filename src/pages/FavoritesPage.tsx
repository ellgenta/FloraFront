import ProductCard from '../components/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { products } from '../data/products';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <section className="favorites-page">
      <h1>Favorites</h1>

      {favoriteProducts.length === 0 ? (
        <p>Your favorite products will appear here.</p>
      ) : (
        <div className="products-grid">
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
      )}
    </section>
  );
}