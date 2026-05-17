import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import type { User } from "../types/user";
import "../styles/ProfilePage.css";

const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return userId ? Number(userId) : null;
  } catch {
    return null;
  }
};

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: 0,
    defaultPaymentMethod: 0,
    state: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
  });

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      navigate("/login");
      return;
    }

    userApi.getById(userId)
      .then((user: User) => {
        setForm({
          name: user.name,
          email: user.email,
          password: "",
          gender: user.gender ?? 0,
          defaultPaymentMethod: user.defaultPaymentMethod ?? 0,
          state: user.defaultAddress?.state ?? "",
          city: user.defaultAddress?.city ?? "",
          street: user.defaultAddress?.street ?? "",
          house: user.defaultAddress?.house ?? "",
          apartment: user.defaultAddress?.apartment ?? "",
        });
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    try {
      setIsSaving(true);
      await userApi.update(userId, {
        name: form.name,
        email: form.email,
        password: form.password || undefined,
        gender: Number(form.gender),
        defaultPaymentMethod: Number(form.defaultPaymentMethod),
        defaultAddress: form.state ? {
          state: form.state,
          city: form.city,
          street: form.street,
          house: form.house,
          apartment: form.apartment || undefined,
        } : undefined,
      });
      navigate("/profile");
    } catch {
      setError("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="profile-page"><p>Loading...</p></div>;

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-page__header">
          <h1 className="profile-page__title">Edit Profile</h1>
          <button className="profile-page__btn profile-page__btn--edit"
            onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </div>

        {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

        <div className="profile-page__grid">
          <section className="profile-card">
            <h2 className="profile-card__title">Personal Info</h2>

            <div className="profile-card__row">
              <span className="profile-card__label">Username</span>
              <input className="edit-profile__input" name="name"
                value={form.name} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Email</span>
              <input className="edit-profile__input" name="email" type="email"
                value={form.email} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">New Password</span>
              <input className="edit-profile__input" name="password" type="password"
                placeholder="Leave empty to keep current"
                value={form.password} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Gender</span>
              <select className="edit-profile__input" name="gender"
                value={form.gender} onChange={handleChange}>
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={2}>Not specified</option>
              </select>
            </div>
          </section>

          <section className="profile-card">
            <h2 className="profile-card__title">Default Address</h2>
            <div className="profile-card__row">
              <span className="profile-card__label">State</span>
              <input className="edit-profile__input" name="state"
                value={form.state} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">City</span>
              <input className="edit-profile__input" name="city"
                value={form.city} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Street</span>
              <input className="edit-profile__input" name="street"
                value={form.street} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">House</span>
              <input className="edit-profile__input" name="house"
                value={form.house} onChange={handleChange} />
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Apartment</span>
              <input className="edit-profile__input" name="apartment"
                value={form.apartment} onChange={handleChange} />
            </div>
          </section>

          <section className="profile-card">
            <h2 className="profile-card__title">Payment</h2>
            <div className="profile-card__row">
              <span className="profile-card__label">Default Method</span>
              <select className="edit-profile__input" name="defaultPaymentMethod"
                value={form.defaultPaymentMethod} onChange={handleChange}>
                <option value={0}>Cash</option>
                <option value={1}>Card</option>
                <option value={2}>Online</option>
              </select>
            </div>
          </section>
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="profile-page__btn profile-page__btn--edit"
            onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}