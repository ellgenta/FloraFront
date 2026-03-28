import { User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

function Header({ onCartClick, cartItemCount }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/flower.png" alt="FloraShop logo" className="header__logo-image" />
        <h1 className="header__logo-text" onClick={() => navigate("/")}>FloraShop</h1>
      </div>

      <nav className="header__nav">
        <Link to="/catalog" className="header__link">Catalog</Link>
        <a href="#" className="header__link">About</a>
        <Link to="/delivery" className="header__link">Delivery</Link>
      </nav>

      <div className="header__actions">
        <button className="header__icon-button" aria-label="User profile">
          <User size={28} strokeWidth={1.8} />
        </button>

        <a href="#" className="header__signin">Sign in</a>

        <button className="header__icon-button header__cart-button" aria-label="Shopping cart" onClick={onCartClick}>
          <ShoppingCart size={30} strokeWidth={1.8} />
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
