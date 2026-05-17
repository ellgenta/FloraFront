import { useEffect, useState } from "react";
import { orderApi } from "../../api/orderApi";
import type { Order } from "../../types/order";

const statusLabel = (status: number) => {
  switch (status) {
    case 0: return "Pending";
    case 1: return "Confirmed";
    case 2: return "Canceled";
    case 3: return "Shipping";
    case 4: return "Delivered";
    default: return "Unknown";
  }
};

const getStatusClassName = (status: number) => {
  switch (status) {
    case 1: return "admin-badge badge-processing";
    case 2: return "admin-badge badge-cancelled";
    case 3: return "admin-badge badge-processing";
    case 4: return "admin-badge badge-done";
    default: return "admin-badge badge-new";
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await orderApi.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Load orders error:", error);
      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  if (isLoading) return (
    <div className="admin-page">
      <div className="admin-page-title"><h2>Orders</h2><p>Loading orders...</p></div>
    </div>
  );

  if (error) return (
    <div className="admin-page">
      <div className="admin-page-title"><h2>Orders</h2><p>{error}</p></div>
      <button type="button" className="admin-primary-btn" onClick={loadOrders}>Try Again</button>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Orders</h2>
        <p>Manage customer orders</p>
      </div>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.date || "—"}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <span className={getStatusClassName(order.status)}>
                    {statusLabel(order.status)}
                  </span>
                </td>
                <td>
                  <select className="admin-table-select" value={order.status}
                    onChange={async (e) => {
                      const newStatus = Number(e.target.value);
                      try {
                        await orderApi.updateStatus(order.id, newStatus);
                        setOrders((prev) =>
                          prev.map((o) => o.id === order.id ? { ...o, status: newStatus } : o)
                        );
                      } catch (error) {
                        console.error("Update status error:", error);
                        alert("Failed to update status");
                      }
                    }}>
                    <option value={0}>Pending</option>
                    <option value={1}>Confirmed</option>
                    <option value={2}>Canceled</option>
                    <option value={3}>Shipping</option>
                    <option value={4}>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={6} className="admin-empty-cell">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminOrders;