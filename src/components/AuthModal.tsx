import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Tiny delay so the CSS transition fires after mount
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`auth-backdrop ${visible ? "auth-backdrop--visible" : ""}`}
      onClick={handleBackdrop}
    >
      <div className={`auth-modal ${visible ? "auth-modal--visible" : ""}`}>
        <button className="auth-modal__close" onClick={onClose} aria-label="Close">
          <X size={20} strokeWidth={1.8} />
        </button>

        {mode === "login" ? (
          <>
            <h2 className="auth-modal__title">Welcome back</h2>
            <p className="auth-modal__subtitle">Sign in to your account</p>

            <div className="auth-modal__field">
              <label className="auth-modal__label">Login or Email</label>
              <input className="auth-modal__input" type="text" placeholder="your@email.com" />
            </div>

            <div className="auth-modal__field">
              <label className="auth-modal__label">Password</label>
              <input className="auth-modal__input" type="password" placeholder="••••••••" />
            </div>

            <label className="auth-modal__checkbox-row">
              <input type="checkbox" className="auth-modal__checkbox" />
              <span className="auth-modal__checkbox-label">Remember me</span>
            </label>

            <button className="auth-modal__submit">Sign In</button>

            <p className="auth-modal__switch">
              Don't have an account?{" "}
              <span className="auth-modal__switch-link" onClick={() => setMode("register")}>
                Create one
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="auth-modal__title">Join FloraShop</h2>
            <p className="auth-modal__subtitle">Create your free account</p>

            <div className="auth-modal__field">
              <label className="auth-modal__label">Username</label>
              <input className="auth-modal__input" type="text" placeholder="flowerLover42" />
            </div>

            <div className="auth-modal__field">
              <label className="auth-modal__label">Email</label>
              <input className="auth-modal__input" type="email" placeholder="your@email.com" />
            </div>

            <div className="auth-modal__field">
              <label className="auth-modal__label">Password</label>
              <input className="auth-modal__input" type="password" placeholder="••••••••" />
            </div>

            <label className="auth-modal__checkbox-row">
              <input type="checkbox" className="auth-modal__checkbox" />
              <span className="auth-modal__checkbox-label">
                I'd like to receive news about discounts and special offers
              </span>
            </label>

            <button className="auth-modal__submit">Create Account</button>

            <p className="auth-modal__switch">
              Already have an account?{" "}
              <span className="auth-modal__switch-link" onClick={() => setMode("login")}>
                Sign in
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;