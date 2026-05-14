import { useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";

import { siteReviewApi } from "../api/siteReviewApi";
import type { SiteReview, TestimonialItem } from "../types/siteReview";

import "../styles/Testimonial.css";

const normalizeSiteReview = (
  review: SiteReview,
  index: number
): TestimonialItem => {
  return {
    id: review.id ?? review.siteReviewId ?? index,
    name: review.userName || review.name || "Customer",
    city: review.city || review.location || "",
    text: review.text || review.message || review.comment || "",
    rating: review.rating,
  };
};

const getStars = (rating?: number) => {
  if (!rating) {
    return "";
  }

  const safeRating = Math.max(1, Math.min(5, Math.round(rating)));

  return "★".repeat(safeRating) + "☆".repeat(5 - safeRating);
};

function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await siteReviewApi.getAll();

      const normalizedTestimonials = data
        .map(normalizeSiteReview)
        .filter((review) => review.text.trim().length > 0);

      setTestimonials(normalizedTestimonials);
      setActiveIndex(0);
    } catch (error) {
      console.error("Load site reviews error:", error);
      setError("Failed to load customer reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const prev = () => {
    if (testimonials.length <= 1) {
      return;
    }

    setActiveIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );
  };

  const next = () => {
    if (testimonials.length <= 1) {
      return;
    }

    setActiveIndex((index) => (index + 1) % testimonials.length);
  };

  const visibleTestimonials = useMemo(() => {
    if (testimonials.length <= 3) {
      return testimonials;
    }

    return [
      testimonials[
        (activeIndex - 1 + testimonials.length) % testimonials.length
      ],
      testimonials[activeIndex],
      testimonials[(activeIndex + 1) % testimonials.length],
    ];
  }, [testimonials, activeIndex]);

  const isActiveCard = (item: TestimonialItem, index: number) => {
    if (testimonials.length > 3) {
      return index === 1;
    }

    return String(item.id) === String(testimonials[activeIndex]?.id);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const deltaX = touchStartX.current - event.changedTouches[0].clientX;
    const deltaY = Math.abs(
      touchStartY.current - event.changedTouches[0].clientY
    );

    if (deltaY > Math.abs(deltaX)) {
      return;
    }

    if (deltaX > 50) {
      next();
    }

    if (deltaX < -50) {
      prev();
    }
  };

  return (
    <section className="testimonials">
      <h2 className="testimonials__title">What our customers say</h2>

      {isLoading && (
        <p className="testimonials__status">Loading customer reviews...</p>
      )}

      {!isLoading && error && (
        <div className="testimonials__empty">
          <p>{error}</p>

          <button
            type="button"
            className="testimonials__retry"
            onClick={loadTestimonials}
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && testimonials.length === 0 && (
        <p className="testimonials__status">No customer reviews yet.</p>
      )}

      {!isLoading && !error && testimonials.length > 0 && (
        <div
          className="testimonials__wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="testimonials__arrow testimonials__arrow--left"
            onClick={prev}
            aria-label="Previous"
            disabled={testimonials.length <= 1}
          >
            ‹
          </button>

          <div className="testimonials__track">
            {visibleTestimonials.map((item, index) => (
              <article
                key={item.id}
                className={`testimonial-card ${
                  isActiveCard(item, index) ? "testimonial-card--active" : ""
                }`}
              >
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar">
                    {item.name[0]?.toUpperCase()}
                  </div>

                  <div className="testimonial-card__info">
                    <div className="testimonial-card__name">{item.name}</div>

                    {item.city && (
                      <div className="testimonial-card__city">{item.city}</div>
                    )}
                  </div>
                </div>

                {item.rating && (
                  <div className="testimonial-card__rating">
                    {getStars(item.rating)}
                  </div>
                )}

                <p className="testimonial-card__text">{item.text}</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="testimonials__arrow testimonials__arrow--right"
            onClick={next}
            aria-label="Next"
            disabled={testimonials.length <= 1}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}

export default Testimonials;