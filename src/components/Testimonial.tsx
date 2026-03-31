import "../styles/Testimonial.css";
import { useState, useRef } from "react";

const testimonials = [
  { id: 1, name: "Anna", city: "Chisinau", text: "Beautiful flowers and very fast delivery. Everything looked fresh and elegant." },
  { id: 2, name: "Maria", city: "Balti", text: "I ordered a bouquet for my mother and she loved it. Amazing quality." },
  { id: 3, name: "Elena", city: "Orhei", text: "Very aesthetic shop and high quality plants. Will order again." },
  { id: 4, name: "Sofia", city: "Chisinau", text: "The order arrived on time and matched photos perfectly." },
  { id: 5, name: "Diana", city: "Cahul", text: "Perfect for gifts. Everything looked premium and beautiful." },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  const visible = [
    testimonials[(activeIndex - 1 + testimonials.length) % testimonials.length],
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = Math.abs(touchStartY.current - e.changedTouches[0].clientY);

    if (deltaY > Math.abs(deltaX)) return;

    if (deltaX > 50) next();
    if (deltaX < -50) prev();
  };

  return (
    <section className="testimonials">
      <h2 className="testimonials__title">What our customers say</h2>

      <div
        className="testimonials__wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="testimonials__arrow testimonials__arrow--left" onClick={prev} aria-label="Previous">
          ‹
        </button>

        <div className="testimonials__track">
          {visible.map((item, i) => (
            <article
              key={item.id}
              className={`testimonial-card ${i === 1 ? "testimonial-card--active" : ""}`}
            >
              <div className="testimonial-card__header">
                <div className="testimonial-card__avatar">{item.name[0]}</div>
                <div className="testimonial-card__info">
                  <div className="testimonial-card__name">{item.name}</div>
                  <div className="testimonial-card__city">{item.city}</div>
                </div>
              </div>
              <div className="testimonial-card__rating">★★★★★</div>
              <p className="testimonial-card__text">{item.text}</p>
            </article>
          ))}
        </div>

        <button className="testimonials__arrow testimonials__arrow--right" onClick={next} aria-label="Next">
          ›
        </button>
      </div>
    </section>
  );
}

export default Testimonials;