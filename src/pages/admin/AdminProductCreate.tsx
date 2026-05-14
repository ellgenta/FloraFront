import { Link, useNavigate } from "react-router-dom";

import AdminProductForm from "../../components/admin/AdminProductForm";
import { productApi } from "../../api/productApi";
import type { ProductCreateRequest } from "../../types/product";

const AdminProductCreate = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (newProduct: ProductCreateRequest) => {
    try {
      await productApi.create(newProduct);

      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Create product error:", error);
      alert("Error while creating product");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-top">
        <div>
          <h2>Add New Product</h2>
          <p>Create a new plant, flower or accessory</p>
        </div>

        <Link to="/admin/products" className="admin-secondary-btn">
          Back to Products
        </Link>
      </div>

      <section className="admin-section admin-form-section">
        <AdminProductForm mode="create" onSubmit={handleCreateProduct} />
      </section>
    </div>
  );
};

export default AdminProductCreate;