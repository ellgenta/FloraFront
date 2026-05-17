import { useEffect, useState } from "react";
import { reviewApi } from "../../api/reviewApi";
import type { AdminReview } from "../../types/review";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await reviewApi.getAll();
      setReviews(data);
    } catch (error) {
      console.error("Load reviews error:", error);
      setError("Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadReviews(); }, []);

  const handleDeleteReview = async (review: AdminReview) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewApi.delete(review);
      setReviews((prev) => prev.filter(
        (item) => !(String(item.id) === String(review.id) && item.source === review.source)
      ));
    } catch (error) {
      console.error("Delete review error:", error);
      alert("Error while deleting review");
    }
  };

  if (isLoading) return (
    <div className="admin-page">
      <div className="admin-page-title"><h2>Reviews</h2><p>Loading reviews...</p></div>
    </div>
  );

  if (error) return (
    <div className="admin-page">
      <div className="admin-page-title"><h2>Reviews</h2><p>{error}</p></div>
      <button type="button" className="admin-primary-btn" onClick={loadReviews}>Try Again</button>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Reviews</h2>
        <p>Manage product and site reviews</p>
      </div>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>User</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Text</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={`${review.source}-${review.id}`}>
                <td>{review.type}</td>
                <td>{review.userName}</td>
                <td>{review.productName || "—"}</td>
                <td>{review.rating ?? "—"}</td>
                <td>{review.text}</td>
                <td>
                  <button type="button" className="admin-delete-btn"
                    onClick={() => handleDeleteReview(review)}>Delete</button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr><td colSpan={6} className="admin-empty-cell">No reviews found</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminReviews;