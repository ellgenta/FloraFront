import "../styles/About.css";

export default function AboutUs() {
  return (
    <main className="about">
      <section className="about-hero">
        <img
          src="/about1.png"
          alt="Plants for FloraShop"
          className="about-hero__image"
        />

        <div className="about-hero__overlay" />

        <div className="about-hero__content">
          <h1 className="about-hero__title">FloraShop</h1>
          <p className="about-hero__subtitle">Nature in every detail</p>
          <p className="about-hero__text">
            We bring calm, beauty and freshness into your everyday life.
          </p>
          <button className="about-hero__button">View catalog</button>
        </div>
      </section>
    </main>
  );
}