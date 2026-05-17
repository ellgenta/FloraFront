import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import { orderApi } from "../api/orderApi";
import type { User } from "../types/user";
import type { Order } from "../types/order";
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

const getRoleFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? null;
  } catch {
    return null;
  }
};

const genderLabel = (gender: number) => {
  switch (gender) {
    case 0: return "Male";
    case 1: return "Female";
    default: return "Not specified";
  }
};

const paymentLabel = (method?: number | null) => {
  switch (method) {
    case 0: return "Cash";
    case 1: return "Card";
    case 2: return "Online";
    default: return "Not specified";
  }
};

const orderStatusLabel = (status: number) => {
  switch (status) {
    case 0: return "New";
    case 1: return "Processing";
    case 2: return "Completed";
    case 3: return "Cancelled";
    case 4: return "Delivered";
    default: return "Unknown";
  }
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const role = getRoleFromToken();
  const isAdmin = role === "Admin";

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      navigate("/login");
      return;
    }

    Promise.all([
      userApi.getById(userId),
      orderApi.getByUserId(userId),
    ])
      .then(([userData, ordersData]) => {
        setUser(userData);
        setOrders(ordersData);
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/");
  };

  if (isLoading) return <div className="profile-page"><p>Loading...</p></div>;
  if (error || !user) return <div className="profile-page"><p>{error || "User not found"}</p></div>;

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-page__header">
          <h1 className="profile-page__title">My Profile</h1>
          <div className="profile-page__header-actions">
            {isAdmin && (
              <button className="profile-page__btn profile-page__btn--edit"
                onClick={() => navigate("/admin")}>
                Go to Dashboard
              </button>
            )}
            <button className="profile-page__btn profile-page__btn--edit"
              onClick={() => navigate("/profile/edit")}>
              Edit Profile
            </button>
            <button className="profile-page__btn profile-page__btn--logout"
              onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        <div className="profile-page__grid">
          <section className="profile-card">
            <h2 className="profile-card__title">Personal Info</h2>
            <div className="profile-card__row">
              <span className="profile-card__label">Username</span>
              <span className="profile-card__value">{user.name}</span>
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Email</span>
              <span className="profile-card__value">{user.email}</span>
            </div>
            <div className="profile-card__row">
              <span className="profile-card__label">Gender</span>
              <span className="profile-card__value">{genderLabel(user.gender)}</span>
            </div>
          </section>

          <section className="profile-card">
            <h2 className="profile-card__title">Default Address</h2>
            {user.defaultAddress ? (
              <>
                <div className="profile-card__row">
                  <span className="profile-card__label">State</span>
                  <span className="profile-card__value">{user.defaultAddress.state}</span>
                </div>
                <div className="profile-card__row">
                  <span className="profile-card__label">City</span>
                  <span className="profile-card__value">{user.defaultAddress.city}</span>
                </div>
                <div className="profile-card__row">
                  <span className="profile-card__label">Street</span>
                  <span className="profile-card__value">{user.defaultAddress.street}</span>
                </div>
                <div className="profile-card__row">
                  <span className="profile-card__label">House</span>
                  <span className="profile-card__value">{user.defaultAddress.house}</span>
                </div>
                {user.defaultAddress.apartment && (
                  <div className="profile-card__row">
                    <span className="profile-card__label">Apartment</span>
                    <span className="profile-card__value">{user.defaultAddress.apartment}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="profile-card__empty">No default address set</p>
            )}
          </section>

          <section className="profile-card">
            <h2 className="profile-card__title">Payment</h2>
            <div className="profile-card__row">
              <span className="profile-card__label">Default Method</span>
              <span className="profile-card__value">{paymentLabel(user.defaultPaymentMethod)}</span>
            </div>
          </section>
        </div>

        <section className="profile-orders">
          <h2 className="profile-orders__title">Order History</h2>
          {orders.length === 0 ? (
            <p className="profile-card__empty">No orders yet</p>
          ) : (
            <div className="profile-orders__list">
              {orders.map((order) => (
                <div key={order.id} className="profile-order-card"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/orders/${order.id}`)}>
                  <div className="profile-order-card__header">
                    <span className="profile-order-card__id">Order #{order.id}</span>
                    <span className="profile-order-card__status">{orderStatusLabel(order.status)}</span>
                  </div>
                  <div className="profile-order-card__row">
                    <span>Items: {order.items.length}</span>
                    <span className="profile-order-card__total">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}