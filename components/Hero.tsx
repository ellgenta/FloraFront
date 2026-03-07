function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__badge">Fresh flowers for your cozy space</div>

        <h2 className="hero__title">
          Bring floral magic
          <br />
          into your home
        </h2>

        <p className="hero__text">
          Discover delicate flowers, elegant bouquets, and beautiful plants
          that make every room feel softer, fresher, and more alive.
        </p>

        <div className="hero__buttons">
          <button className="hero__button hero__button--primary">
            Shop now
          </button>
          <button className="hero__button hero__button--secondary">
            View catalog
          </button>
        </div>

        <div className="hero__features">
          <div className="hero__feature">Fresh daily</div>
          <div className="hero__feature">Soft floral style</div>
          <div className="hero__feature">Fast delivery</div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__image-wrap">
          <img
            src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=900&q=80"
            alt="Pink flowers in vase"
            className="hero__image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;