import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { productApi } from "../api/productApi";
import { productReviewApi } from "../api/productReviewApi";

import type { Product } from "../types/product";
import type { ProductReview } from "../types/productReview";

import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useRecentlyViewed } from "../contexts/RecentlyViewedContext";

import "../styles/ProductPage.css";

const getSubcategoryLabel = (subcategory?: string) => {
  if (!subcategory) {
    return "";
  }

  return subcategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getStars = (rating: number) => {
  const roundedRating = Math.round(rating);
  return "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { setLastViewedProductId } = useRecentlyViewed();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState("");

  const productId = product ? String(product.id) : "";

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

  const loadProduct = async () => {
    if (!id) {
      setError("Product id is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await productApi.getById(id);
      setProduct(data);
    } catch (error) {
      console.error("Load product error:", error);
      setError("Product not found");
    } finally {
      setIsLoading(false);
    }
  };

  const loadReviews = async (currentProductId: string | number) => {
    try {
      setReviewsLoading(true);

      const data = await productReviewApi.getByProductId(currentProductId);
      setReviews(data);
    } catch (error) {
      console.error("Load product reviews error:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setLastViewedProductId(String(product.id));
      loadReviews(product.id);
    }
  }, [product, setLastViewedProductId]);

  const handleSubmitReview = async () => {
    if (!product) {
      return;
    }

    if (selectedRating === 0) {
      alert("Please select a rating");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write your comment");
      return;
    }

    try {
      const createdReview = await productReviewApi.create({
        productId: product.id,
        rating: selectedRating,
        text: reviewText.trim(),
      });

      setReviews((prevReviews) => [createdReview, ...prevReviews]);
      setSelectedRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Create product review error:", error);
      alert("Error while submitting review");
    }
  };

  if (isLoading) {
    return (
      <div className="product-page product-page--not-found">
        <div className="product-page__container">
          <h1 className="product-page__title">Loading product...</h1>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page product-page--not-found">
        <div className="product-page__container">
          <h1 className="product-page__title">Product not found</h1>
          <p className="product-page__description">
            We couldn’t find the product you’re looking for.
          </p>

          <button
            className="product-page__back-btn"
            onClick={() => navigate("/catalog")}
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const liked = isFavorite(productId);

  const isInCart = cartItems.some(
    (item) => String(item.id) === String(product.id)
  );

  return (
    <section className="product-page">
      <div className="product-page__container">
        <button
          className="product-page__back-btn"
          onClick={() => navigate("/catalog")}
        >
          ← Back to Catalog
        </button>

        <div className="product-page__grid">
          <div className="product-page__image-card">
            <img
              src={product.image || "/flower.png"}
              alt={product.name}
              className="product-page__image"
            />
          </div>

          <div className="product-page__info">
            <h1 className="product-page__title">{product.name}</h1>
            <p className="product-page__price">
              ${product.price.toFixed(2)}
            </p>
            <p className="product-page__description">
              {product.description}
            </p>

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
                className={`product-page__favorite-action${
                  liked ? " product-page__favorite-action--active" : ""
                }`}
                onClick={() => toggleFavorite(productId)}
                aria-label={liked ? "Remove from favorites" : "Add to favorites"}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <div className="product-page__details">
              <div className="product-page__detail">
                <span className="product-page__detail-label">Category</span>
                <span className="product-page__detail-value">
                  {product.category}
                </span>
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
                <span className="product-page__detail-value">
                  {product.stock && product.stock > 0 ? "In stock" : "Out of stock"}
                </span>
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
              <span className="product-page__reviews-rating">
                {averageRating || "—"}
              </span>
              <span className="product-page__reviews-count">
                {reviews.length} reviews
              </span>
            </div>
          </div>

          <div className="product-page__review-form">
            <h3 className="product-page__review-form-title">
              Share your opinion
            </h3>

            <p className="product-page__review-form-subtitle">
              Tell other customers what you think about this product
            </p>

            <div className="product-page__review-form-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  className={`product-page__review-star ${
                    star <= selectedRating
                      ? "product-page__review-star--active"
                      : ""
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
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            />

            <button
              type="button"
              className="product-page__review-form-submit"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>

          <div className="product-page__reviews-grid">
            {reviewsLoading && (
              <p className="product-page__description">Loading reviews...</p>
            )}

            {!reviewsLoading &&
              reviews.map((review) => (
                <article
                  key={review.id}
                  className="product-page__review-card"
                >
                  <div className="product-page__review-top">
                    <h3 className="product-page__review-name">
                      {review.userName || "Customer"}
                    </h3>

                    <span className="product-page__review-stars">
                      {getStars(review.rating)}
                    </span>
                  </div>

                  <p className="product-page__review-text">{review.text}</p>
                </article>
              ))}

            {!reviewsLoading && reviews.length === 0 && (
              <p className="product-page__description">
                No reviews yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}