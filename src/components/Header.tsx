import { User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthModal from "./AuthModal.tsx";
import "../styles/Header.css";

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

function Header({ onCartClick, cartItemCount }: HeaderProps) {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <img
              src="/flower.png"
              alt="FloraShop logo"
              className="header__logo-image"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <h1 className="header__logo-text" onClick={() => navigate("/")}>FloraShop</h1>
          </div>

          <nav className="header__nav">
            <Link to="/catalog" className="header__link">Catalog</Link>
            <Link to="/about" className="header__link">About</Link>
            <Link to="/delivery" className="header__link">Delivery</Link>
          </nav>
        </div>

        <div className="header__right">
          <input
            type="text"
            placeholder="Search by product name..."
            className="header__search-input"
          />

          <div className="header__actions">
            <button
              className="header__icon-button"
              aria-label="User profile"
              onClick={() => setAuthOpen(true)}
            >
              <User size={28} strokeWidth={1.8} />
            </button>

            <button
              className="header__icon-button header__cart-button"
              aria-label="Shopping cart"
              onClick={onCartClick}
            >
              <ShoppingCart size={30} strokeWidth={1.8} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Header;