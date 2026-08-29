import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

import type { Category, CategoryFormState } from "../types/job";
import { API_ROOT, getItems } from "../services/api";

const emptyForm: CategoryFormState = {
  name: "",
  description: "",
  icon: "",
};

// TODO: Provide a search bar to search the categories and create pagingation for that.

function JobCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyForm);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_ROOT}/job-categories`);

      if (!response.ok) {
        throw new Error("Could not load job categories.");
      }

      const categoryPayload = await response.json();
      const nextCategories = getItems<Category>(categoryPayload, "data");
      setCategories(nextCategories);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load job categories.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const resetCategoryForm = () => {
    setCategoryForm(emptyForm);
  };

  const saveCategory = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_ROOT}/job-categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: categoryForm.name.trim(),
          description: categoryForm.description.trim(),
          icon: categoryForm.icon?.trim(),
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.message ?? "Could not save category.");
      }

      resetCategoryForm();
      setShowAddForm(false);
      await loadData();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save category.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              Administration
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Job categories
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Create and manage service categories.
            </p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-700">
              {categories.length}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </p>
          </div>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            {showAddForm ? "Cancel" : "Add new category"}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Add category</h2>
            <form className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr_auto] items-end" onSubmit={saveCategory}>
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
                  placeholder="e.g. Home Services"
                  className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                Description
                <input
                  value={categoryForm.description}
                  onChange={(event) =>
                    setCategoryForm({
                      ...categoryForm,
                      description: event.target.value,
                    })
                  }
                  placeholder="Brief description"
                  className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
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
                  placeholder="e.g. Activity"
                  className="mt-2 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
              </label>

              <button
                disabled={saving}
                className="h-9 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">All categories</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a category to view details and manage subcategories.
                </p>
              </div>
            </div>

            {loading ? (
              <p className="py-12 text-center text-sm text-slate-500">
                Loading categories...
              </p>
            ) : categories.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-500">
                No categories found.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => navigate(`/job-categories/${category._id}`)}
                    className="cursor-pointer rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {category.description || "No description"}
                        </p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default JobCategories;
