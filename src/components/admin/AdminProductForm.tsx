import { useState } from "react";
import type { Product, ProductUpdateRequest } from "../../types/product";

type ProductFormState = {
  name: string;
  category: string;
  subcategory: string;
  price: string;
  stock: string;
  image: string;
  description: string;
};

type AdminProductFormProps = {
  mode?: "create" | "edit";
  initialData?: Product;
  onSubmit?: (product: ProductUpdateRequest) => void | Promise<void>;
};

const AdminProductForm = ({
  mode = "create",
  initialData,
  onSubmit,
}: AdminProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormState>({
    name: initialData?.name || "",
    category: initialData?.category || "plants",
    subcategory: initialData?.subcategory || "",
    price: initialData?.price ? String(initialData.price) : "",
    stock: initialData?.stock ? String(initialData.stock) : "0",
    image: initialData?.image || "",
    description: initialData?.description || "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preparedProduct: ProductUpdateRequest = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory || undefined,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image,
      description: formData.description,
    };

    if (onSubmit) {
      await onSubmit(preparedProduct);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-edit-layout">
        <div className="admin-edit-fields">
          <div className="admin-form-group">
            <label>Product name</label>
            <input
              type="text"
              name="name"
              placeholder="Monstera Deliciosa"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="plants">Plants</option>
              <option value="pots">Pots</option>
              <option value="fertilizers">Fertilizers</option>
              <option value="tools">Garden Tools</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label>Subcategory</label>
            <input
              type="text"
              name="subcategory"
              placeholder="decorative-foliage"
              value={formData.subcategory}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="45.99"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="12"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="/flower.png or https://..."
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write product description..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="admin-primary-btn">
            {mode === "edit" ? "Save Changes" : "Save Product"}
          </button>
        </div>

        <div className="admin-product-preview">
          <p>Preview</p>

          {formData.image ? (
            <img
              src={formData.image}
              alt={formData.name}
              className="admin-preview-img"
            />
          ) : (
            <div className="admin-preview-empty">No image</div>
          )}

          <h3>{formData.name || "Product name"}</h3>
          <span>{formData.category}</span>
          <strong>${formData.price || 0}</strong>
          <small>Stock: {formData.stock || 0}</small>
        </div>
      </div>
    </form>
  );
};

export default AdminProductForm;