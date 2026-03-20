import "./Testimonial.css";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Anna",
    city: "Chisinau",
    text: "Beautiful flowers and very fast delivery. Everything looked fresh and elegant.",
  },
  {
    id: 2,
    name: "Maria",
    city: "Balti",
    text: "I ordered a bouquet for my mother and she loved it. Amazing quality.",
  },
  {
    id: 3,
    name: "Elena",
    city: "Orhei",
    text: "Very aesthetic shop and high quality plants. Will order again.",
  },
  {
    id: 4,
    name: "Sofia",
    city: "Chisinau",
    text: "The order arrived on time and matched photos perfectly.",
  },
  {
    id: 5,
    name: "Diana",
    city: "Cahul",
    text: "Perfect for gifts. Everything looked premium and beautiful.",
  },
];

function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="testimonials">
      <h2 className="testimonials__title">What our customers say</h2>

      <div className="testimonials__wrapper">
        <button
          className="testimonials__arrow testimonials__arrow--left"
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="testimonials__track" ref={trackRef}>
          {testimonials.map((item) => (
            <article key={item.id} className="testimonial-card">
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

        <button
          className="testimonials__arrow testimonials__arrow--right"
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default Testimonials;