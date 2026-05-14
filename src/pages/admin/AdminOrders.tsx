import { useEffect, useMemo, useState } from "react";
import { orderApi } from "../../api/orderApi";
import type { Order } from "../../types/order";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    if (!normalizedQuery) {
      return orders;
    }

    return orders.filter((order) =>
      String(order.id).toLowerCase().includes(normalizedQuery) ||
      order.customerName.toLowerCase().includes(normalizedQuery) ||
      order.status.toLowerCase().includes(normalizedQuery)
    );
  }, [orders, searchQuery]);

  const getStatusClassName = (status: string) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "completed") {
      return "admin-badge badge-done";
    }

    if (normalizedStatus === "cancelled") {
      return "admin-badge badge-cancelled";
    }

    if (normalizedStatus === "processing") {
      return "admin-badge badge-processing";
    }

    return "admin-badge badge-new";
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Orders</h2>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Orders</h2>
          <p>{error}</p>
        </div>

        <button type="button" className="admin-primary-btn" onClick={loadOrders}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Orders</h2>
        <p>Manage customer orders</p>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search by order id, customer or status..."
          className="admin-search-wide"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
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
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.date}</td>
                <td>${order.total}</td>
                <td>
                  <span className={getStatusClassName(order.status)}>
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

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-empty-cell">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminOrders;