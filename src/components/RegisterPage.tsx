import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import { register } from "../api/auth";
import "../styles/AuthPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await register({ userName, email, password });
      if (!response.isSuccess) {
        setError(response.message);
        return;
      }
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <button
          className="auth-card__close"
          onClick={() => navigate("/")}
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.8} />
        </button>

        <h2 className="auth-card__title">Join FloraShop</h2>
        <p className="auth-card__subtitle">Create your free account</p>

        {error && <p className="auth-card__error">{error}</p>}

        <div className="auth-card__field">
          <label className="auth-card__label">Username</label>
          <input
            className="auth-card__input"
            type="text"
            placeholder="flowerLover42"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="auth-card__field">
          <label className="auth-card__label">Email</label>
          <input
            className="auth-card__input"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-card__field">
          <label className="auth-card__label">Password</label>
          <input
            className="auth-card__input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <label className="auth-card__checkbox-row">
          <input type="checkbox" className="auth-card__checkbox" />
          <span className="auth-card__checkbox-label">
            I'd like to receive news about discounts and special offers
          </span>
        </label>

        <button className="auth-card__submit" onClick={handleSubmit}>
          Create Account
        </button>

        <p className="auth-card__switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-card__switch-link">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default RegisterPage;