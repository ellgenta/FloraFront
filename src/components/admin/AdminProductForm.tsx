import { useEffect, useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import type { Category, Subcategory } from "../../types/category";
import {
  ProductStatus,
  type Product,
  type ProductCreateRequest,
  type ProductUpdateRequest,
} from "../../types/product";

type ProductFormState = {
  name: string;
  categoryId: string;
  subCategoryId: string;
  price: string;
  image: string;
  description: string;
  status: string;
};

type AdminProductFormProps =
  | {
      mode?: "create";
      initialData?: Product;
      onSubmit?: (product: ProductCreateRequest) => void | Promise<void>;
    }
  | {
      mode: "edit";
      initialData?: Product;
      onSubmit?: (product: ProductUpdateRequest) => void | Promise<void>;
    };

const productStatusOptions = [
  {
    value: ProductStatus.Unknown,
    label: "Unknown",
  },
  {
    value: ProductStatus.Active,
    label: "Active",
  },
  {
    value: ProductStatus.Inactive,
    label: "Inactive",
  },
  {
    value: ProductStatus.Discontinued,
    label: "Discontinued",
  },
  {
    value: ProductStatus.Sold,
    label: "Sold",
  },
];

const AdminProductForm = (props: AdminProductFormProps) => {
  const mode = props.mode || "create";
  const initialData = props.initialData;

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const [formData, setFormData] = useState<ProductFormState>({
    name: initialData?.name || "",
    categoryId: initialData?.category ? String(initialData.category.id) : "",
    subCategoryId: initialData?.subcategory
      ? String(initialData.subcategory.id)
      : "",
    price: initialData?.price !== undefined ? String(initialData.price) : "",
    image: initialData?.image || "",
    description: initialData?.description || "",
    status:
      initialData?.status !== undefined
        ? String(initialData.status)
        : String(ProductStatus.Active),
  });

  useEffect(() => {
    Promise.all([categoryApi.getAll(), categoryApi.getAllSubcategories()])
      .then(([cats, subs]) => {
        setCategories(cats);
        setSubcategories(subs);

        if (!formData.categoryId && cats.length > 0) {
          setFormData((prev) => ({
            ...prev,
            categoryId: String(cats[0].id),
          }));
        }
      })
      .catch((err) => console.error("Load categories error:", err));
  }, []);

  const filteredSubcategories = subcategories.filter(
    (sub) => sub.categoryId === Number(formData.categoryId)
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "categoryId") {
      setFormData((prev) => ({
        ...prev,
        categoryId: value,
        subCategoryId: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const baseProduct: ProductCreateRequest = {
    name: formData.name.trim(),
    categoryId: Number(formData.categoryId),
    subCategoryId: formData.subCategoryId
      ? Number(formData.subCategoryId)
      : undefined,
    price: Number(formData.price),
    image: formData.image.trim(),
    description: formData.description.trim(),
  };

  if (props.mode === "edit") {
    const updateProduct: ProductUpdateRequest = {
      ...baseProduct,
      status: Number(formData.status) as ProductStatus,
    };

    if (props.onSubmit) {
      await props.onSubmit(updateProduct);
    }

    return;
  }

  if (props.onSubmit) {
    await props.onSubmit(baseProduct);
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
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label>Subcategory</label>
            <select
              name="subCategoryId"
              value={formData.subCategoryId}
              onChange={handleChange}
            >
              <option value="">— None —</option>

              {filteredSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
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

          {mode === "edit" && (
            <div className="admin-form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {productStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          )}

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

          <span>
            {categories.find((c) => c.id === Number(formData.categoryId))
              ?.name || "—"}
          </span>

          {mode === "edit" && (
            <span>
              Status:{" "}
              {
                productStatusOptions.find(
                  (status) => String(status.value) === formData.status
                )?.label
              }
            </span>
          )}

          <strong>${formData.price || 0}</strong>
        </div>
      </div>
    </form>
  );
};

export default AdminProductForm;