import "./Testimonial.css"
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
    text: "The order arrived on time and matched the photos perfectly.",
  },
  {
    id: 5,
    name: "Diana",
    city: "Cahul",
    text: "Perfect for gifts. Everything looked premium and beautiful.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2 className="testimonials__title">What our customers say</h2>

      <div className="testimonials__track">
        {testimonials.map((item) => (
          <div key={item.id} className="testimonial-card">
            
            <div className="testimonial-card__top">
              <div className="testimonial-card__avatar">
                {item.name[0]}
              </div>

              <div>
                <div className="testimonial-card__name">{item.name}</div>
                <div className="testimonial-card__city">{item.city}</div>
              </div>
            </div>

            <div className="testimonial-card__rating">
              ★★★★★
            </div>

            <p className="testimonial-card__text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;