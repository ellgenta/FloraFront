import { useEffect, useMemo, useState } from "react";
import { reviewApi } from "../../api/reviewApi";
import type { AdminReview } from "../../types/review";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    loadReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    if (!normalizedQuery) {
      return reviews;
    }

    return reviews.filter((review) => {
      return (
        review.type.toLowerCase().includes(normalizedQuery) ||
        review.userName.toLowerCase().includes(normalizedQuery) ||
        review.text.toLowerCase().includes(normalizedQuery) ||
        review.productName?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [reviews, searchQuery]);

  const handleDeleteReview = async (review: AdminReview) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await reviewApi.delete(review);

      setReviews((prevReviews) =>
        prevReviews.filter(
          (item) =>
            !(
              String(item.id) === String(review.id) &&
              item.source === review.source
            )
        )
      );
    } catch (error) {
      console.error("Delete review error:", error);
      alert("Error while deleting review");
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Reviews</h2>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Reviews</h2>
          <p>{error}</p>
        </div>

        <button type="button" className="admin-primary-btn" onClick={loadReviews}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Reviews</h2>
        <p>Manage product and site reviews</p>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search by type, user, product or text..."
          className="admin-search-wide"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
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
            {filteredReviews.map((review) => (
              <tr key={`${review.source}-${review.id}`}>
                <td>{review.type}</td>
                <td>{review.userName}</td>
                <td>{review.productName || "—"}</td>
                <td>{review.rating ?? "—"}</td>
                <td>{review.text}</td>
                <td>
                  <button
                    type="button"
                    className="admin-delete-btn"
                    onClick={() => handleDeleteReview(review)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredReviews.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-empty-cell">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminReviews;