import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import { register } from "../api/auth";
import "../styles/AuthPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from || "/";

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      if (!userName.trim()) {
        setError("Username is required.");
        return;
      }

      if (!email.trim()) {
        setError("Email is required.");
        return;
      }

      if (!password.trim()) {
        setError("Password is required.");
        return;
      }

      if (!dob) {
        setError("Date of birth is required.");
        return;
      }

      if (gender === "") {
        setError("Gender is required.");
        return;
      }

      const response = await register({
        userName: userName.trim(),
        email: email.trim(),
        password,
        dob,
        gender: Number(gender),
      });

      if (response.isSuccess === false) {
        setError(response.message || "Registration failed.");
        return;
      }

      if (!response.token) {
        setError("Registration succeeded, but token was not received.");
        return;
      }

      localStorage.setItem("token", response.token);
      window.dispatchEvent(new Event("tokenChanged"));

      navigate(from, { replace: true });
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

        <div className="auth-card__field">
          <label className="auth-card__label">Date of birth</label>
          <input
            className="auth-card__input"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="auth-card__field">
          <label className="auth-card__label">Gender</label>
          <select
            className="auth-card__input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </div>

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