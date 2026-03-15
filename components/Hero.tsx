import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero__mist hero__mist--pink"></div>
      <div className="hero__mist hero__mist--green"></div>
      <div className="hero__mist hero__mist--soft"></div>

      <div className="hero__content">
        <div className="hero__badge">Fresh plants & floral harmony</div>

        <h2 className="hero__title">
          Bring nature and
          <br />
          floral softness
          <br />
          into your home
        </h2>

        <p className="hero__text">
          Discover elegant plants, blooming flowers, and cozy green details
          that make your space feel calm, fresh, and full of life.
        </p>

        <div className="hero__buttons">
          <button className="hero__button hero__button--primary" onClick={() => navigate("/catalog")}>
            Shop now
          </button>
          <button className="hero__button hero__button--secondary" onClick={() => navigate("/catalog")}>
            View catalog
          </button>
        </div>

        <div className="hero__features">
          <div className="hero__feature">Fresh daily</div>
          <div className="hero__feature">Natural beauty</div>
          <div className="hero__feature">Fast delivery</div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__image-wrap">
          <img
             src="/hero-shop.jpg"
              alt="Flower shop full of plants"
             className="hero__image"
/>
        </div>
      </div>
    </section>
  );
}

export default Hero;
