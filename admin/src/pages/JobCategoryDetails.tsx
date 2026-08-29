import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";

import type { Category, SubCategory, CategoryFormState, SubCategoryFormState } from "../types/job";
import { API_ROOT, getItems } from "../services/api";

const emptyCategoryForm: CategoryFormState = {
  name: "",
  description: "",
  icon: "",
};

const emptySubCategoryForm: SubCategoryFormState = {
  name: "",
  description: "",
  icon: "",
  categoryName: "",
};

// TODO: Currently we are taking icon as a string it should be an image.



function JobCategoryDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyCategoryForm);
  const [subCategoryForm, setSubCategoryForm] = useState<SubCategoryFormState>(emptySubCategoryForm);
  const [editingSubCategoryId, setEditingSubCategoryId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const visibleSubCategories = useMemo(
    () =>
      subCategories.filter((subCategory) => {
        const catId =
          typeof subCategory.categoryId === "object" && subCategory.categoryId !== null
            ? (subCategory.categoryId as any)._id
            : subCategory.categoryId;
        return catId === id;
      }),
    [id, subCategories],
  );

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [categoryResponse, subCategoryResponse] = await Promise.all([
        fetch(`${API_ROOT}/job-categories/${id}`),
        fetch(`${API_ROOT}/job-subcategories`),
      ]);

      if (!categoryResponse.ok || !subCategoryResponse.ok) {
        throw new Error("Could not load data.");
      }

      const [categoryPayload, subCategoryPayload] = await Promise.all([
        categoryResponse.json(),
        subCategoryResponse.json(),
      ]);

      if (categoryPayload.data) {
        setCategory(categoryPayload.data);
        setCategoryForm({
          name: categoryPayload.data.name,
          description: categoryPayload.data.description ?? "",
          icon: categoryPayload.data.icon ?? "",
        });
      }

      const nextSubCategories = getItems<SubCategory>(
        subCategoryPayload,
        "data",
      );
      setSubCategories(nextSubCategories);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      void loadData();
    }
  }, [id]);

  const resetSubCategoryForm = () => {
    setSubCategoryForm(emptySubCategoryForm);
    setEditingSubCategoryId(null);
  };

  const saveCategory = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_ROOT}/job-categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryForm.name.trim(),
          description: categoryForm.description.trim(),
          icon: categoryForm.icon?.trim(),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message ?? "Could not update category.");
      }

      await loadData();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not update category.",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async () => {
    if (!category || !window.confirm(`Delete category ${category.name}?`)) return;

    setError("");
    setSaving(true);

    try {
      const response = await fetch(`${API_ROOT}/job-categories/${id}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message ?? "Could not delete category.");
      }

      navigate("/job-categories");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete category.",
      );
      setSaving(false);
    }
  };

  const saveSubCategory = async (event: FormEvent) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `${API_ROOT}/job-subcategories${editingSubCategoryId ? `/${editingSubCategoryId}` : ""}`,
        {
          method: editingSubCategoryId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: subCategoryForm.name.trim(),
            description: subCategoryForm.description.trim(),
            icon: subCategoryForm.icon?.trim(),
            categoryName: subCategoryForm.categoryName?.trim() || category?.name,
          }),
        },
      );

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message ?? "Could not save subcategory.");
      }

      resetSubCategoryForm();
      await loadData();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save subcategory.",
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteSubCategory = async (subId: string, name: string) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    setError("");

    try {
      const response = await fetch(`${API_ROOT}/job-subcategories/${subId}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message ?? "Could not delete record.");
      }

      resetSubCategoryForm();
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete record.",
      );
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!category) {
    return <div className="p-8 text-center text-red-600">Category not found.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Category Details
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {category.name}
            </h1>
          </div>
          <button
            onClick={() => navigate("/job-categories")}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            ← Back to Categories
          </button>
        </header>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-fit">
            <div className="mb-5">
              <h2 className="text-lg font-bold">Update category</h2>
              <p className="mt-1 text-sm text-slate-500">
                Modify category details.
              </p>
            </div>

            <form className="space-y-4" onSubmit={saveCategory}>
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                Name
                <input
                  required
                  value={categoryForm.name}
                  onChange={(event) =>
                    setCategoryForm({
                      ...categoryForm,
                      name: event.target.value,
                    })
                  }
                  className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                Description
                <textarea
                  rows={3}
                  value={categoryForm.description}
                  onChange={(event) =>
                    setCategoryForm({
                      ...categoryForm,
                      description: event.target.value,
                    })
                  }
                  className="mt-2 block w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                Icon
                <input
                  value={categoryForm.icon}
                  onChange={(event) =>
                    setCategoryForm({
                      ...categoryForm,
                      icon: event.target.value,
                    })
                  }
                  className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </label>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Update category"}
                </button>
                <button
                  type="button"
                  onClick={deleteCategory}
                  disabled={saving}
                  className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">Subcategories</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Manage the services under {category.name}.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {visibleSubCategories.length} records
              </span>
            </div>

            <form
              onSubmit={saveSubCategory}
              className="mb-6 grid gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_auto]"
            >
              <input
                required
                value={subCategoryForm.name}
                onChange={(event) =>
                  setSubCategoryForm({
                    ...subCategoryForm,
                    name: event.target.value,
                  })
                }
                placeholder="Subcategory name"
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500"
              />
              <input
                value={subCategoryForm.description}
                onChange={(event) =>
                  setSubCategoryForm({
                    ...subCategoryForm,
                    description: event.target.value,
                  })
                }
                placeholder="Description"
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500"
              />
              <input
                value={subCategoryForm.icon}
                onChange={(event) =>
                  setSubCategoryForm({
                    ...subCategoryForm,
                    icon: event.target.value,
                  })
                }
                placeholder="Icon"
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500"
              />
              <button
                disabled={saving}
                className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
              >
                {editingSubCategoryId ? "Update" : "Add"} subcategory
              </button>
            </form>

            {visibleSubCategories.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-sm text-slate-500">
                No subcategories found.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleSubCategories.map((subCategory) => (
                      <tr
                        key={subCategory._id}
                        className="border-t border-slate-100 hover:bg-emerald-50/40"
                      >
                        <td className="px-4 py-4 font-semibold">
                          {subCategory.name}
                        </td>
                        <td className="px-4 py-4 text-slate-500">
                          {subCategory.description || "—"}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => {
                              setEditingSubCategoryId(subCategory._id);
                              setSubCategoryForm({
                                name: subCategory.name,
                                description: subCategory.description ?? "",
                                icon: subCategory.icon ?? "",
                                categoryName: category.name,
                              });
                            }}
                            className="mr-4 font-semibold text-emerald-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              void deleteSubCategory(
                                subCategory._id,
                                subCategory.name,
                              )
                            }
                            className="font-semibold text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobCategoryDetails;
