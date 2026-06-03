import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../../api/productApi";
import { ProductStatus, type Product } from "../../types/product";

const getProductStatusLabel = (status?: ProductStatus) => {
  switch (status) {
    case ProductStatus.Active:
      return "Active";
    case ProductStatus.Inactive:
      return "Inactive";
    case ProductStatus.Discontinued:
      return "Discontinued";
    case ProductStatus.Sold:
      return "Sold";
    case ProductStatus.Unknown:
    default:
      return "Unknown";
  }
};

const AdminProducts = () => {
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await productApi.getAll();
      setAdminProducts(data);
    } catch (error) {
      console.error("Load products error:", error);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Products</h2>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Products</h2>
          <p>{error}</p>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={loadProducts}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-top">
        <div>
          <h2>Products</h2>
          <p>Manage plants, flowers and accessories</p>
        </div>

        <Link to="/admin/products/create" className="admin-primary-btn">
          + Add Product
        </Link>
      </div>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {adminProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image || "/flower.png"}
                    alt={product.name}
                    className="admin-product-img"
                  />
                </td>

                <td>{product.name}</td>
                <td>{product.category?.name ?? "—"}</td>
                <td>{product.subcategory?.name ?? "—"}</td>
                <td>${product.price}</td>
                <td>{getProductStatusLabel(product.status)}</td>

                <td>
                  <div className="admin-actions">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="admin-edit-btn"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {adminProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="admin-empty-cell">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminProducts;