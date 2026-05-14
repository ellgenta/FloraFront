import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import AdminProductForm from "../../components/admin/AdminProductForm";
import { productApi } from "../../api/productApi";
import type { Product, ProductUpdateRequest } from "../../types/product";

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProduct = async () => {
    if (!id) {
      setError("Product id is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await productApi.getById(id);
      setProduct(data);
    } catch (error) {
      console.error("Load product error:", error);
      setError("Product not found or failed to load");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedProduct: ProductUpdateRequest) => {
    if (!id) {
      return;
    }

    try {
      await productApi.update(id, updatedProduct);

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Update product error:", error);
      alert("Error while updating product");
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Edit Product</h2>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Product not found</h2>
          <p>The product you want to edit does not exist.</p>
        </div>

        <Link to="/admin/products" className="admin-primary-btn">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-top">
        <div>
          <h2>Edit Product</h2>
          <p>Update product information</p>
        </div>

        <Link to="/admin/products" className="admin-secondary-btn">
          Back to Products
        </Link>
      </div>

      <section className="admin-section admin-form-section">
        <AdminProductForm
          mode="edit"
          initialData={product}
          onSubmit={handleUpdateProduct}
        />
      </section>
    </div>
  );
};

export default AdminProductEdit;