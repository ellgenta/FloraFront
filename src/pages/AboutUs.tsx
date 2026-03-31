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
      <section className="about-intro">
  <div className="about-intro__container">
    <h2 className="about-intro__title">About FloraShop</h2>

    <p className="about-intro__text">
      FloraShop was created for people who love natural beauty, soft interiors,
      and elegant details.
    </p>

    <p className="about-intro__text">
      We carefully select flowers, plants, and decor that make your home feel
      calm, fresh, and full of life.
    </p>
  </div>
</section>
    </main>
  );
}