import { useEffect, useState } from "react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import { dashboardApi } from "../../api/dashboardApi";
import type { DashboardData } from "../../types/dashboard";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await dashboardApi.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Load dashboard error:", error);
      setError("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Dashboard</h2>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Dashboard</h2>
          <p>{error || "Dashboard data is not available"}</p>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={loadDashboardData}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Dashboard</h2>
        <p>Welcome back, Admin 🌿</p>
      </div>

      <div className="admin-stats-grid">
        <AdminStatCard
          title="Total Products"
          value={dashboardData.stats.totalProducts}
          iconSrc="/care.png"
          iconAlt="Products"
          to="/admin/products"
        />

        <AdminStatCard
          title="Orders"
          value={dashboardData.stats.totalOrders}
          iconSrc="/orders.png"
          iconAlt="Orders"
          to="/admin/orders"
        />

        <AdminStatCard
          title="Users"
          value={dashboardData.stats.totalUsers}
          iconSrc="/users.png"
          iconAlt="Users"
          to="/admin/users"
        />

        <AdminStatCard
          title="Reviews"
          value={dashboardData.stats.totalReviews}
          iconSrc="/Favorites.png"
          iconAlt="Reviews"
          to="/admin/reviews"
        />
      </div>

      <section className="admin-section">
        <div className="admin-section-header">
          <h3>Recent Orders</h3>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {dashboardData.recentOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>${order.total}</td>
                <td>
                  <span
                    className={
                      order.status.toLowerCase() === "completed"
                        ? "admin-badge badge-done"
                        : "admin-badge badge-new"
                    }
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="admin-table-btn">
                    View
                  </button>
                </td>
              </tr>
            ))}

            {dashboardData.recentOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="admin-empty-cell">
                  No recent orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;