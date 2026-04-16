import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { getSubcategoryLabel } from '../data/subcategories';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import '../styles/ProductPage.css';
import { useRecentlyViewed } from '../contexts/RecentlyViewedContext';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { setLastViewedProductId } = useRecentlyViewed();
  const [selectedRating, setSelectedRating] = useState(0);

  const product = useMemo(
    () => products.find(item => item.id === id),
    [id]
  );

  useEffect(() => {
    if (product) {
      setLastViewedProductId(product.id);
    }
  }, [product, setLastViewedProductId]);

  if (!product) {
    return (
      <div className="product-page product-page--not-found">
        <div className="product-page__container">
          <h1 className="product-page__title">Product not found</h1>
          <p className="product-page__description">
            We couldn’t find the product you’re looking for.
          </p>
          <button className="product-page__back-btn" onClick={() => navigate('/catalog')}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const liked = isFavorite(product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <section className="product-page">
      <div className="product-page__container">
        <button className="product-page__back-btn" onClick={() => navigate('/catalog')}>
          ← Back to Catalog
        </button>

        <div className="product-page__grid">
          <div className="product-page__image-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-page__image"
            />
          </div>

          <div className="product-page__info">
            <h1 className="product-page__title">{product.name}</h1>
            <p className="product-page__price">${product.price.toFixed(2)}</p>
            <p className="product-page__description">{product.description}</p>

            <div className="product-page__actions">
              {isInCart ? (
                <button
                  className="product-page__btn product-page__btn--remove"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="product-page__btn product-page__btn--add"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              )}

              <button
                className={`product-page__favorite-action${liked ? ' product-page__favorite-action--active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
                aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <div className="product-page__details">
              <div className="product-page__detail">
                <span className="product-page__detail-label">Category</span>
                <span className="product-page__detail-value">{product.category}</span>
              </div>

              {product.subcategory && (
                <div className="product-page__detail">
                  <span className="product-page__detail-label">Type</span>
                  <span className="product-page__detail-value">
                    {getSubcategoryLabel(product.subcategory)}
                  </span>
                </div>
              )}

              <div className="product-page__detail">
                <span className="product-page__detail-label">Availability</span>
                <span className="product-page__detail-value">In stock</span>
              </div>
            </div>
          </div>
        </div>

        <section className="product-page__reviews">
          <div className="product-page__reviews-header">
            <div>
              <h2 className="product-page__reviews-title">Customer Reviews</h2>
              <p className="product-page__reviews-subtitle">
                See what other customers think about this product
              </p>
            </div>

            <div className="product-page__reviews-summary">
              <span className="product-page__reviews-rating">4.8</span>
              <span className="product-page__reviews-count">127 reviews</span>
            </div>
          </div>

          <div className="product-page__review-form">
  <h3 className="product-page__review-form-title">Share your opinion</h3>
  <p className="product-page__review-form-subtitle">
    Tell other customers what you think about this product
  </p>

  <div className="product-page__review-form-rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      type="button"
      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      className={`product-page__review-star ${
        star <= selectedRating ? 'product-page__review-star--active' : ''
      }`}
      onClick={() => setSelectedRating(star)}
    >
      ★
    </button>
  ))}
</div>

  <textarea
    className="product-page__review-form-textarea"
    placeholder="Write your comment here..."
  />

  <button className="product-page__review-form-submit">
    Submit Review
  </button>
</div>


          <div className="product-page__reviews-grid">
            <article className="product-page__review-card">
              <div className="product-page__review-top">
                <h3 className="product-page__review-name">Anna</h3>
                <span className="product-page__review-stars">★★★★★</span>
              </div>
              <p className="product-page__review-text">
                Beautiful healthy plant. It arrived in great condition and looks even better in real life.
              </p>
              <div className="product-page__review-reactions">
                <span>Healthy leaves</span>
                <span>Beautiful look</span>
              </div>
            </article>

            <article className="product-page__review-card">
              <div className="product-page__review-top">
                <h3 className="product-page__review-name">Maria</h3>
                <span className="product-page__review-stars">★★★★★</span>
              </div>
              <p className="product-page__review-text">
                Very happy with this purchase. The packaging was neat and the plant feels fresh and strong.
              </p>
              <div className="product-page__review-reactions">
                <span>Well packed</span>
                <span>Fresh plant</span>
              </div>
            </article>

            <article className="product-page__review-card">
              <div className="product-page__review-top">
                <h3 className="product-page__review-name">Elena</h3>
                <span className="product-page__review-stars">★★★★☆</span>
              </div>
              <p className="product-page__review-text">
                Nice plant and fast delivery. I would love the pot to be a little bigger, but overall it looks amazing.
              </p>
              <div className="product-page__review-reactions">
                <span>Fast delivery</span>
                <span>Looks amazing</span>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}