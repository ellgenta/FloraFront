import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src="/flower.png" alt="FloraShop" className="admin-logo-img" />
          <div>
            <h2>FloraShop</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end>
            <img src="/home.png" alt="Dashboard" className="admin-nav-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/products">
            <img src="/care.png" alt="Products" className="admin-nav-icon" />
            <span>Products</span>
          </NavLink>

          <NavLink to="/admin/orders">
            <img src="/orders.png" alt="Orders" className="admin-nav-icon" />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/admin/users">
            <img src="/users.png" alt="Users" className="admin-nav-icon" />
            <span>Users</span>
          </NavLink>

          <NavLink to="/admin/reviews">
            <img src="/Favorites.png" alt="Reviews" className="admin-nav-icon" />
            <span>Reviews</span>
          </NavLink>
        </nav>
      </div>

      <button type="button" className="admin-logout" onClick={handleLogout}>
        <img src="/logout.png" alt="Logout" className="admin-nav-icon" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AdminSidebar;