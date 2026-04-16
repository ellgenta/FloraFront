import { Link} from "react-router-dom";
import "../styles/AuthPage.css";

function LoginPage() {
  

  return (
    <main className="auth-page">
      <div className="auth-card">

        <h2 className="auth-card__title">Welcome back</h2>
        <p className="auth-card__subtitle">Sign in to your account</p>

        <div className="auth-card__field">
          <label className="auth-card__label">Login or Email</label>
          <input
            className="auth-card__input"
            type="text"
            placeholder="your@email.com"
          />
        </div>

        <div className="auth-card__field">
          <label className="auth-card__label">Password</label>
          <input
            className="auth-card__input"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <label className="auth-card__checkbox-row">
          <input type="checkbox" className="auth-card__checkbox" />
          <span className="auth-card__checkbox-label">Remember me</span>
        </label>

        <button className="auth-card__submit">Sign In</button>

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