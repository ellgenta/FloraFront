import { Heart, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, type KeyboardEvent } from "react";
import { getToken } from "../utils/auth";
import "../styles/Header.css";

interface HeaderProps {
  cartItemCount: number;
}

function Header({ cartItemCount }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const isAuthorized = () => Boolean(getToken());

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate("/catalog", { state: { searchQuery: searchQuery.trim() } });
    }
  };

  const handleProfileClick = () => {
    if (isAuthorized()) {
      navigate("/profile");
      return;
    }

    navigate("/login");
  };

  const handleFavoritesClick = () => {
    if (isAuthorized()) {
      navigate("/favorites");
      return;
    }

    navigate("/register", { state: { from: "/favorites" } });
  };

  const handleCartClick = () => {
    if (isAuthorized()) {
      navigate("/cart");
      return;
    }

    navigate("/register", { state: { from: "/cart" } });
  };

  return (
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

          <h1
            className="header__logo-text"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            FloraShop
          </h1>
        </div>

        <nav className="header__nav">
          <Link to="/catalog" className="header__link">
            Catalog
          </Link>

          <Link to="/about" className="header__link">
            About
          </Link>

          <Link to="/delivery" className="header__link">
            Delivery
          </Link>
        </nav>
      </div>

      <div className="header__right">
        <input
          type="text"
          placeholder="Search by product name..."
          className="header__search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />

        <div className="header__actions">
          <button
            className="header__icon-button"
            aria-label="User profile"
            onClick={handleProfileClick}
          >
            <User size={28} strokeWidth={1.8} />
          </button>

          <button
            className="header__icon-button"
            aria-label="Favorites"
            onClick={handleFavoritesClick}
          >
            <Heart size={28} strokeWidth={1.8} />
          </button>

          <button
            className="header__icon-button header__cart-button"
            aria-label="Shopping cart"
            onClick={handleCartClick}
          >
            <ShoppingCart size={30} strokeWidth={1.8} />

            {isAuthorized() && cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;