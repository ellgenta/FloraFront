import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/auth";
import { isAdmin } from "../utils/auth";
import "../styles/AuthPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/";
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
  try {
    setError("");

    const response = await login({ login: loginValue, password });

    if (!response.token) {
      setError(response.message || "Login failed. Token was not received.");
      return;
    }

    localStorage.setItem("token", response.token);
    window.dispatchEvent(new Event("tokenChanged"));

    if (isAdmin()) {
      navigate("/admin");
    } else {
      navigate(from, { replace: true });
    }
  } catch (err) {
    setError("Invalid login or password");
  }
};

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2 className="auth-card__title">Welcome back</h2>
        <p className="auth-card__subtitle">Sign in to your account</p>

        {error && <p className="auth-card__error">{error}</p>}

        <div className="auth-card__field">
          <label className="auth-card__label">Login or Email</label>
          <input
            className="auth-card__input"
            type="text"
            placeholder="your@email.com"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
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

        <button className="auth-card__submit" onClick={handleSubmit}>
          Sign In
        </button>

        <p className="auth-card__switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-card__switch-link">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;