function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <h2 className="footer__brand">FloraShop</h2>
        <p className="footer__description">
          Fresh flowers and elegant plants to make your home feel calm, natural,
          and beautiful.
        </p>
      </div>

      <div className="footer__contacts">
        <span className="footer__contact">hello@florashop.com</span>
        <span className="footer__divider">•</span>
        <span className="footer__contact">+373 60 123 456</span>
        <span className="footer__divider">•</span>
        <span className="footer__contact">Chisinau, Moldova</span>
        <span className="footer__divider">•</span>
        <span className="footer__contact">Mon–Sat: 9:00–19:00</span>
      </div>
    </footer>
  );
}

export default Footer;