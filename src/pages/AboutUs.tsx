import "../styles/About.css";
import { useNavigate } from "react-router-dom";


export default function AboutUs() {
  const navigate = useNavigate();
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
          <button className="about-hero__button" onClick={() => navigate("/catalog")}>View catalog</button>
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

<section className="about-stats">
  <div className="about-stats__container">
    <div className="about-stats__curve">
      <h2 className="about-stats__title">FloraShop in numbers</h2>
      <p className="about-stats__subtitle">
        What makes shopping with us feel special
      </p>

      <div className="about-stats__side about-stats__side--left">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="about-stats__side about-stats__side--right">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="about-stats__cards">
        <div className="about-stats__card about-stats__card--left">
          <h3>500+</h3>
          <p>happy customers</p>
        </div>

        <div className="about-stats__card about-stats__card--center">
          <div className="about-stats__center-arc">
            <span />   <span />   <span />  
            <span />   <span />   <span />
            <span />   <span />   <span />
            <span />   <span />   <span />
            <span />   <span />   <span />
            <span />   <span />   <span />
            <span />   <span />   <span />
            <span />   <span />   <span />
           <span />   <span />   <span />
           <span />   <span />   <span /> 
          </div>

          <h3>120+</h3>
          <p>curated collections</p>
        </div>

        <div className="about-stats__card about-stats__card--right">
          <h3>200+</h3>
          <p>daily orders</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className="about-values">
  <div className="about-values__container">
    <h2 className="about-values__title">Our values</h2>
    <p className="about-values__subtitle">
      What makes shopping with us feel special
    </p>

    <div className="about-values__cards">
      <div className="about-values__card">
        <div className="about-values__card-header">
          <img
            src="public/freshness.png"
            alt="Freshness icon"
            className="about-values__icon"
          />
          <h3 className="about-values__card-title">Freshness</h3>
        </div>

        <p className="about-values__card-text">
          We choose only fresh flowers and beautiful plants for every order.
        </p>
      </div>

      <div className="about-values__card">
        <div className="about-values__card-header">
          <img
            src="public/care.png"
            alt="Care icon"
            className="about-values__icon"
          />
          <h3 className="about-values__card-title">Care</h3>
        </div>

        <p className="about-values__card-text">
          Every bouquet and product is prepared with attention and love.
        </p>
      </div>

      <div className="about-values__card">
        <div className="about-values__card-header">
          <img
            src="public/aesthetic.png"
            alt="Aesthetic icon"
            className="about-values__icon"
          />
          <h3 className="about-values__card-title">Aesthetics</h3>
        </div>

        <p className="about-values__card-text">
          We focus on soft details, elegant forms, and calm visual harmony.
        </p>
      </div>

      <div className="about-values__card">
        <div className="about-values__card-header">
          <img
            src="public/delivery.png"
            alt="Delivery icon"
            className="about-values__icon"
          />
          <h3 className="about-values__card-title">Delivery</h3>
        </div>

        <p className="about-values__card-text">
          We make sure your order arrives safely, beautifully, and on time.
        </p>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}