import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";

import {
  getJobSubCategories,
  createJobSubCategory,
  updateJobSubCategory,
  deleteJobSubCategory,
} from "@/api/jobSubCategoryApi";

import { getJobCategories } from "@/api/jobCategoryApi";

import { JobSubCategory } from "@/types/jobSubCategory";
import { JobCategory } from "@/types/jobCategory";

// =====================================
// EMPTY FORM
// =====================================

const empty = {
  categoryId: "",
  name: "",
  description: "",
  icon: null as File | null,
};

// =====================================
// COMPONENT
// =====================================

const JobSubCategoryMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<JobSubCategory[]>([]);

  const [categories, setCategories] = useState<JobCategory[]>([]);

  const [form, setForm] = useState(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<JobSubCategory | null>(null);

  const [loading, setLoading] = useState(false);

  const [iconPreview, setIconPreview] = useState("");

  // =====================================
  // GET ALL DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const [subCategories, jobCategories] = await Promise.all([
        getJobSubCategories(),
        getJobCategories(),
      ]);

      setRows(subCategories);
      setCategories(jobCategories);
    } catch (error) {
      console.error("Error loading job sub categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {
    loadData();
  }, []);

  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {
    setForm(empty);

    setEditingId(null);

    setErrors({});

    setIconPreview("");
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // Category validation
    if (!form.categoryId) {
      e.categoryId = "Select a job category";
    }

    // Name validation
    if (!form.name.trim()) {
      e.name = "Sub category name is required";
    } else if (form.name.trim().length < 2) {
      e.name = "Sub category name must contain at least 2 characters";
    }

    // Description validation
    if (!form.description.trim()) {
      e.description = "Description is required";
    } else if (form.description.trim().length < 2) {
      e.description = "Description must contain at least 2 characters";
    }

    // Icon required only while creating
    if (!editingId && !form.icon) {
      e.icon = "Icon is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // ICON CHANGE
  // =====================================

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setForm({
      ...form,
      icon: file,
    });

    setIconPreview(URL.createObjectURL(file));

    setErrors({
      ...errors,
      icon: "",
    });
  };

  // =====================================
  // CREATE / UPDATE
  // =====================================

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    // =====================================
    // VALIDATION
    // =====================================

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updated = await updateJobSubCategory(editingId, {
          categoryId: form.categoryId,
          name: form.name,
          description: form.description,
          icon: form.icon,
        });

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        if (!form.icon) {
          return;
        }

        const newSubCategory = await createJobSubCategory({
          categoryId: form.categoryId,
          name: form.name,
          description: form.description,
          icon: form.icon,
        });

        setRows((rows) => [newSubCategory, ...rows]);
      }

      // =====================================
      // RESET AFTER SUCCESS
      // =====================================

      resetForm();
    } catch (error) {
      console.error("Error saving job sub category:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: JobSubCategory) => {
    setEditingId(row._id);

    setForm({
      categoryId: row.categoryId,
      name: row.name,
      description: row.description,
      icon: null,
    });

    setIconPreview(row.icon ? `http://localhost:5000${row.icon}` : "");

    setErrors({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setLoading(true);

      await deleteJobSubCategory(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting job sub category:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // CATEGORY NAME
  // =====================================

  const categoryName = (categoryId: string) => {
    const category = categories.find((category) => category._id === categoryId);

    return category?.name || "Unknown";
  };

  // =====================================
  // TABLE COLUMNS
  // =====================================

  const columns: ColumnDef<JobSubCategory>[] = [
    {
      header: "Sub Category",

      render: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div className="icon-preview">
            {row.icon ? (
              <img
                src={`http://localhost:5000${row.icon}`}
                alt={row.name}
                style={{
                  width: 35,
                  height: 35,
                  objectFit: "contain",
                }}
              />
            ) : (
              <Icon name="folder" size={20} />
            )}
          </div>

          <b>{row.name}</b>
        </div>
      ),
    },

    {
      header: "Parent Category",

      render: (row) => (
        <span className="badge badge-blue">{categoryName(row.categoryId)}</span>
      ),
    },

    {
      header: "Description",

      render: (row) => <span className="cell-muted">{row.description}</span>,
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader title="Job Sub Category Master" section="Job Masters" />

      {/* =====================================
          FORM
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              {editingId ? "Edit Job Sub Category" : "Add Job Sub Category"}
            </h2>

            <p>Sub categories are linked to a parent job category.</p>
          </div>

          {editingId && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={resetForm}
              type="button"
            >
              <Icon name="x" size={14} />
              Cancel edit
            </button>
          )}
        </div>

        <div className="card-panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* CATEGORY */}

              <Field label="Parent Category" required error={errors.categoryId}>
                <select
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      categoryId: e.target.value,
                    })
                  }
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Field>

              {/* NAME */}

              <Field label="Sub Category Name" required error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Frontend Developer"
                />
              </Field>

              {/* ICON */}

              <Field label="Icon" required={!editingId} error={errors.icon}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                />

                {iconPreview && (
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <img
                      src={iconPreview}
                      alt="Icon preview"
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
              </Field>

              {/* DESCRIPTION */}

              <Field
                label="Description"
                required
                error={errors.description}
                span2
              >
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Short description of this job sub category"
                />
              </Field>
            </div>

            {/* FORM ACTIONS */}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
                disabled={loading}
              >
                Reset
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                <Icon name={editingId ? "edit" : "plus"} size={15} />

                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Sub Category"
                    : "Add Sub Category"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Job Sub Categories</h2>

            <p>{rows.length} sub categories configured</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search sub category..."
          onSearch={(row, query) =>
            row.name.toLowerCase().includes(query) ||
            row.description.toLowerCase().includes(query)
          }
          onEdit={handleEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete job sub category?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default JobSubCategoryMaster;
