import React from "react";

type HeroProps = {
  title?: string;
  description?: string;
  onCtaClick?: () => void;
};

export default function Hero({
  title = "Modern Furniture Store",
  description = "Browse curated furniture and decor. Clean design, fair prices, fast delivery.",
  onCtaClick,
}: HeroProps) {
  return (
    <section className="hero">
      <h1 className="hero__title">{title}</h1>
      <p className="hero__desc">{description}</p>

      <div className="hero__actions">
        <button className="hero__btn" type="button" onClick={onCtaClick}>
          Go to catalog
        </button>
      </div>
    </section>
  );
}