import { useEffect, useMemo, useState, type FormEvent } from "react";
import { adminCategoryApi } from "../../api/adminCategoryApi";
import { adminSubCategoryApi } from "../../api/adminSubCategoryApi";
import type {
  AdminCategory,
  AdminSubCategory,
} from "../../types/adminCatalog";

const AdminCatalog = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [subCategories, setSubCategories] = useState<AdminSubCategory[]>([]);

  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryCategoryId, setSubCategoryCategoryId] = useState("");
  const [editingSubCategoryId, setEditingSubCategoryId] = useState<
    number | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryNameById = useMemo(() => {
    return categories.reduce<Record<number, string>>((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {});
  }, [categories]);

  const loadCatalogData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [categoriesData, subCategoriesData] = await Promise.all([
        adminCategoryApi.getAll(),
        adminSubCategoryApi.getAll(),
      ]);

      setCategories(categoriesData);
      setSubCategories(subCategoriesData);
    } catch (error) {
      console.error("Load catalog data error:", error);
      setError("Failed to load categories and subcategories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  const resetCategoryForm = () => {
    setCategoryName("");
    setEditingCategoryId(null);
  };

  const resetSubCategoryForm = () => {
    setSubCategoryName("");
    setSubCategoryCategoryId("");
    setEditingSubCategoryId(null);
  };

  const handleSubmitCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      alert("Category name is required");
      return;
    }

    try {
      if (editingCategoryId) {
        const updatedCategory = await adminCategoryApi.update(
          editingCategoryId,
          { name: trimmedName }
        );

        setCategories((prev) =>
          prev.map((category) =>
            category.id === editingCategoryId ? updatedCategory : category
          )
        );
      } else {
        const createdCategory = await adminCategoryApi.create({
          name: trimmedName,
        });

        setCategories((prev) => [...prev, createdCategory]);
      }

      resetCategoryForm();
    } catch (error) {
      console.error("Save category error:", error);
      alert("Error while saving category");
    }
  };

  const handleEditCategory = (category: AdminCategory) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await adminCategoryApi.delete(categoryId);

      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );

      setSubCategories((prev) =>
        prev.filter((subCategory) => subCategory.categoryId !== categoryId)
      );

      if (editingCategoryId === categoryId) {
        resetCategoryForm();
      }
    } catch (error) {
      console.error("Delete category error:", error);
      alert(
        "Category cannot be deleted. Check if products or subcategories are linked to it."
      );
    }
  };

  const handleSubmitSubCategory = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = subCategoryName.trim();
    const categoryId = Number(subCategoryCategoryId);

    if (!trimmedName) {
      alert("Subcategory name is required");
      return;
    }

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      alert("Category is required");
      return;
    }

    try {
      if (editingSubCategoryId) {
        const updatedSubCategory = await adminSubCategoryApi.update(
          editingSubCategoryId,
          {
            name: trimmedName,
            categoryId,
          }
        );

        setSubCategories((prev) =>
          prev.map((subCategory) =>
            subCategory.id === editingSubCategoryId
              ? updatedSubCategory
              : subCategory
          )
        );
      } else {
        const createdSubCategory = await adminSubCategoryApi.create({
          name: trimmedName,
          categoryId,
        });

        setSubCategories((prev) => [...prev, createdSubCategory]);
      }

      resetSubCategoryForm();
    } catch (error) {
      console.error("Save subcategory error:", error);
      alert("Error while saving subcategory");
    }
  };

  const handleEditSubCategory = (subCategory: AdminSubCategory) => {
    setEditingSubCategoryId(subCategory.id);
    setSubCategoryName(subCategory.name);
    setSubCategoryCategoryId(String(subCategory.categoryId));
  };

  const handleDeleteSubCategory = async (subCategoryId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await adminSubCategoryApi.delete(subCategoryId);

      setSubCategories((prev) =>
        prev.filter((subCategory) => subCategory.id !== subCategoryId)
      );

      if (editingSubCategoryId === subCategoryId) {
        resetSubCategoryForm();
      }
    } catch (error) {
      console.error("Delete subcategory error:", error);
      alert(
        "Subcategory cannot be deleted. Check if products are linked to it."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Catalog</h2>
          <p>Loading categories and subcategories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page-title">
          <h2>Catalog</h2>
          <p>{error}</p>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={loadCatalogData}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <h2>Catalog</h2>
        <p>Manage product categories and subcategories</p>
      </div>

      <div className="admin-catalog-grid">
        <section className="admin-section">
          <div className="admin-section-header">
            <h3>Categories</h3>
          </div>

          <form className="admin-inline-form" onSubmit={handleSubmitCategory}>
            <input
              type="text"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Category name"
            />

            <button type="submit" className="admin-primary-btn">
              {editingCategoryId ? "Save Category" : "Add Category"}
            </button>

            {editingCategoryId && (
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={resetCategoryForm}
              >
                Cancel
              </button>
            )}
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Subcategories</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => {
                const count = subCategories.filter(
                  (subCategory) => subCategory.categoryId === category.id
                ).length;

                return (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{count}</td>
                    <td>
                      <div className="admin-actions">
                        <button
                          type="button"
                          className="admin-edit-btn"
                          onClick={() => handleEditCategory(category)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={4}>No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="admin-section">
          <div className="admin-section-header">
            <h3>Subcategories</h3>
          </div>

          <form
            className="admin-inline-form"
            onSubmit={handleSubmitSubCategory}
          >
            <input
              type="text"
              value={subCategoryName}
              onChange={(event) => setSubCategoryName(event.target.value)}
              placeholder="Subcategory name"
            />

            <select
              value={subCategoryCategoryId}
              onChange={(event) =>
                setSubCategoryCategoryId(event.target.value)
              }
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button type="submit" className="admin-primary-btn">
              {editingSubCategoryId
                ? "Save Subcategory"
                : "Add Subcategory"}
            </button>

            {editingSubCategoryId && (
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={resetSubCategoryForm}
              >
                Cancel
              </button>
            )}
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subcategory Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {subCategories.map((subCategory) => (
                <tr key={subCategory.id}>
                  <td>{subCategory.id}</td>
                  <td>{subCategory.name}</td>
                  <td>
                    {categoryNameById[subCategory.categoryId] ||
                      subCategory.category?.name ||
                      "—"}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        type="button"
                        className="admin-edit-btn"
                        onClick={() => handleEditSubCategory(subCategory)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={() =>
                          handleDeleteSubCategory(subCategory.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {subCategories.length === 0 && (
                <tr>
                  <td colSpan={4}>No subcategories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminCatalog;