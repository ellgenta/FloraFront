import { User, ShoppingCart } from "lucide-react";


function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/flower.png" alt="FloraShop logo" className="header__logo-image" />
        <h1 className="header__logo-text">FloraShop</h1>
      </div>

      <nav className="header__nav">
        <a href="#" className="header__link">Catalog</a>
        <a href="#" className="header__link">About</a>
        <a href="#" className="header__link">Delivery</a>
      </nav>

      <div className="header__actions">
        <button className="header__icon-button" aria-label="User profile">
          <User size={28} strokeWidth={1.8} />
        </button>

        <a href="#" className="header__signin">Sign in</a>

        <button className="header__icon-button" aria-label="Shopping cart">
          <ShoppingCart size={30} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}

export default Header;