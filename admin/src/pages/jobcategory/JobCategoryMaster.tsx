import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";

import {
  getJobCategories,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory,
  type JobCategory,
} from "@/api/jobCategoryApi";

const empty = {
  name: "",
  description: "",
  icon: null as File | null,
};

// =====================================
// COMPONENT
// =====================================

const JobCategoryMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<JobCategory[]>([]);

  const [form, setForm] = useState(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] =
    useState<JobCategory | null>(null);

  const [loading, setLoading] = useState(false);

  const [iconPreview, setIconPreview] = useState("");

  const [showForm, setShowForm] = useState(false);

  // =====================================
  // GET ALL JOB CATEGORIES
  // =====================================

  const loadJobCategories = async () => {
    try {
      setLoading(true);

      const data = await getJobCategories();

      setRows(data ?? []);
    } catch (error) {
      console.error(
        "Error loading job categories:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {
    loadJobCategories();
  }, []);

  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {
    setForm(empty);

    setEditingId(null);

    setErrors({});

    setIconPreview("");

    setShowForm(false);
  };

  // =====================================
  // OPEN ADD FORM
  // =====================================

  const handleAdd = () => {
    setForm(empty);

    setEditingId(null);

    setErrors({});

    setIconPreview("");

    setShowForm(true);
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // =====================================
    // CATEGORY NAME
    // =====================================

    if (!form.name.trim()) {
      e.name = "Category name is required";
    } else if (form.name.trim().length < 2) {
      e.name =
        "Category name must contain at least 2 characters";
    }

    // =====================================
    // DESCRIPTION
    // =====================================

    if (!form.description.trim()) {
      e.description = "Description is required";
    } else if (
      form.description.trim().length < 2
    ) {
      e.description =
        "Description must contain at least 2 characters";
    }

    // =====================================
    // ICON
    // =====================================

    if (!editingId && !form.icon) {
      e.icon = "Icon is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // ICON CHANGE
  // =====================================

  const handleIconChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setForm({
      ...form,
      icon: file,
    });

    setIconPreview(
      URL.createObjectURL(file),
    );

    setErrors({
      ...errors,
      icon: "",
    });
  };

  // =====================================
  // CREATE / UPDATE
  // =====================================

  const handleSubmit = async (
    ev: React.FormEvent,
  ) => {
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
        const updatedCategory =
          await updateJobCategory(
            editingId,
            form.name,
            form.description,
            form.icon || undefined,
          );

        setRows((rows) =>
          rows.map((row) =>
            row._id === editingId
              ? updatedCategory
              : row,
          ),
        );
      }

      // =====================================
      // CREATE
      // =====================================

      else {
        if (!form.icon) {
          return;
        }

        const newCategory =
          await createJobCategory(
            form.name,
            form.description,
            form.icon,
          );

        setRows((rows) => [
          newCategory,
          ...rows,
        ]);
      }

      // =====================================
      // RESET AFTER SUCCESS
      // =====================================

      resetForm();
    } catch (error) {
      console.error(
        "Error saving job category:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (
    row: JobCategory,
  ) => {
    setEditingId(row._id);

    setForm({
      name: row.name,
      description: row.description,
      icon: null,
    });

    setIconPreview(
      row.icon
        ? `http://localhost:5000${row.icon}`
        : "",
    );

    setErrors({});

    setShowForm(true);

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

      await deleteJobCategory(
        deleteTarget._id,
      );

      setRows((rows) =>
        rows.filter(
          (row) =>
            row._id !== deleteTarget._id,
        ),
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error(
        "Error deleting job category:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE COLUMNS
  // =====================================

  const columns: ColumnDef<JobCategory>[] = [
    {
      header: "Category",

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
              <Icon
                name="folder"
                size={20}
              />
            )}
          </div>

          <b>{row.name}</b>
        </div>
      ),
    },

    {
      header: "Description",

      render: (row) => (
        <span className="cell-muted">
          {row.description}
        </span>
      ),
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader
        title="Job Category Master"
        section="Job Masters"
      />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>
                {editingId
                  ? "Edit Job Category"
                  : "Add Job Category"}
              </h2>

              <p>
                Top-level categories jobs are
                grouped under.
              </p>
            </div>

            {editingId && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={resetForm}
                type="button"
                disabled={loading}
              >
                <Icon
                  name="x"
                  size={14}
                />

                Cancel edit
              </button>
            )}
          </div>

          <div className="card-panel-body">
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                {/* =====================================
                    NAME
                ===================================== */}

                <Field
                  label="Category Name"
                  required
                  error={errors.name}
                >
                  <input
                    value={form.name}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        name: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        name: "",
                      });
                    }}
                    placeholder="e.g. Information Technology"
                    disabled={loading}
                  />
                </Field>

                {/* =====================================
                    ICON
                ===================================== */}

                <Field
                  label="Icon"
                  required={!editingId}
                  error={errors.icon}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleIconChange
                    }
                    disabled={loading}
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
                          objectFit:
                            "contain",
                        }}
                      />
                    </div>
                  )}
                </Field>

                {/* =====================================
                    DESCRIPTION
                ===================================== */}

                <Field
                  label="Description"
                  required
                  error={errors.description}
                  span2
                >
                  <textarea
                    value={
                      form.description
                    }
                    onChange={(e) => {
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      });

                      setErrors({
                        ...errors,
                        description: "",
                      });
                    }}
                    placeholder="Short description of this job category"
                    disabled={loading}
                  />
                </Field>
              </div>

              {/* =====================================
                  FORM ACTIONS
              ===================================== */}

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
                  <Icon
                    name={
                      editingId
                        ? "edit"
                        : "plus"
                    }
                    size={15}
                  />

                  {loading
                    ? "Saving..."
                    : editingId
                      ? "Update Category"
                      : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              All Job Categories
            </h2>

            <p>
              {rows.length} categories
              configured
            </p>
          </div>

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              <Icon
                name="plus"
                size={15}
              />

              Add Job Category
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search category..."
          onSearch={(row, query) =>
            row.name
              .toLowerCase()
              .includes(query) ||
            row.description
              .toLowerCase()
              .includes(query)
          }
          onEdit={handleEdit}
          onDelete={(row) =>
            setDeleteTarget(row)
          }
        />
      </div>

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete job category?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
};

export default JobCategoryMaster;
