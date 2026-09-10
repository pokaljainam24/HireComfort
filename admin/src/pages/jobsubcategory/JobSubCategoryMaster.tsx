import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, {
  ColumnDef,
} from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, {
  ViewField,
} from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
  getJobSubCategories,
  createJobSubCategory,
  updateJobSubCategory,
  deleteJobSubCategory,
} from "@/api/jobSubCategoryApi";

import { getJobCategories } from "@/api/jobCategoryApi";

import {
  showSuccess,
  showError,
} from "@/utils/swal";

import type { JobSubCategory } from "@/types/jobSubCategory";
import type { JobCategory } from "@/types/jobCategory";

// =====================================
// TYPES
// =====================================

interface JobSubCategoryForm {
  categoryId: string;
  name: string;
  description: string;
  icon: File | null;
}

// =====================================
// API BASE URL
// =====================================

const API_BASE_URL = "http://localhost:5000";

// =====================================
// EMPTY FORM
// =====================================

const emptyForm: JobSubCategoryForm = {
  categoryId: "",
  name: "",
  description: "",
  icon: null,
};

// =====================================
// COMPONENT
// =====================================

const JobSubCategoryMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] =
    useState<JobSubCategory[]>([]);

  const [categories, setCategories] =
    useState<JobCategory[]>([]);

  const [form, setForm] =
    useState<JobSubCategoryForm>(
      emptyForm,
    );

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] =
    useState<JobSubCategory | null>(null);

  const [viewTarget, setViewTarget] =
    useState<JobSubCategory | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [iconPreview, setIconPreview] =
    useState<string>("");

  const [showForm, setShowForm] =
    useState(false);

  // =====================================
  // IMAGE URL HELPER
  // =====================================

  const getImageUrl = (
    imagePath?: string | null,
  ) => {
    if (!imagePath) {
      return "";
    }

    if (
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }

    if (imagePath.startsWith("/")) {
      return `${API_BASE_URL}${imagePath}`;
    }

    return `${API_BASE_URL}/${imagePath}`;
  };

  // =====================================
  // GET CATEGORY ID
  // =====================================

  const getCategoryId = (
    categoryId: any,
  ): string => {
    if (!categoryId) {
      return "";
    }

    if (typeof categoryId === "string") {
      return categoryId;
    }

    if (
      typeof categoryId === "object" &&
      categoryId._id
    ) {
      return String(categoryId._id);
    }

    return "";
  };

  // =====================================
  // GET CATEGORY NAME
  // =====================================

  const getCategoryName = (
    categoryId: any,
  ): string => {
    if (!categoryId) {
      return "Unknown";
    }

    // If API returns populated object
    if (
      typeof categoryId === "object" &&
      categoryId.name
    ) {
      return categoryId.name;
    }

    // If API returns ObjectId/string
    const id = getCategoryId(
      categoryId,
    );

    const category =
      categories.find(
        (category) =>
          category._id === id,
      );

    return category?.name || "Unknown";
  };

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        subCategories,
        jobCategories,
      ] = await Promise.all([
        getJobSubCategories(),
        getJobCategories(),
      ]);

      setRows(
        subCategories ?? [],
      );

      setCategories(
        jobCategories ?? [],
      );
    } catch (error) {
      console.error(
        "Error loading job sub categories:",
        error,
      );

      showError(
        "Failed to load job sub category data",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadData();
  }, []);

  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {
    setForm({
      ...emptyForm,
    });

    setEditingId(null);

    setErrors({});

    setIconPreview("");
  };

  // =====================================
  // CLOSE FORM
  // =====================================

  const closeForm = () => {
    resetForm();

    setShowForm(false);
  };

  // =====================================
  // OPEN ADD FORM
  // =====================================

  const handleAdd = () => {
    resetForm();

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<
      string,
      string
    > = {};

    // =====================================
    // PARENT CATEGORY
    // =====================================

    if (!form.categoryId) {
      e.categoryId =
        "Select a job category";
    }

    // =====================================
    // NAME
    // =====================================

    if (!form.name.trim()) {
      e.name =
        "Sub category name is required";
    } else if (
      form.name.trim().length < 2
    ) {
      e.name =
        "Sub category name must contain at least 2 characters";
    }

    // =====================================
    // DESCRIPTION
    // =====================================

    if (
      !form.description.trim()
    ) {
      e.description =
        "Description is required";
    } else if (
      form.description.trim()
        .length < 2
    ) {
      e.description =
        "Description must contain at least 2 characters";
    }

    // =====================================
    // ICON
    // =====================================

    // Icon required only while creating
    if (
      !editingId &&
      !form.icon
    ) {
      e.icon =
        "Icon is required";
    }

    setErrors(e);

    return (
      Object.keys(e).length === 0
    );
  };

  // =====================================
  // ICON CHANGE
  // =====================================

  const handleIconChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // =====================================
    // FILE TYPE VALIDATION
    // =====================================

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (
      !allowedTypes.includes(
        file.type,
      )
    ) {
      setErrors((prev) => ({
        ...prev,
        icon:
          "Only JPG, JPEG, PNG, WEBP and SVG images are allowed",
      }));

      event.target.value = "";

      return;
    }

    // =====================================
    // FILE SIZE VALIDATION
    // =====================================

    const maxSize =
      2 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        icon:
          "Icon size must be less than 2MB",
      }));

      event.target.value = "";

      return;
    }

    // =====================================
    // SET FILE
    // =====================================

    setForm((prev) => ({
      ...prev,
      icon: file,
    }));

    // =====================================
    // PREVIEW
    // =====================================

    const previewUrl =
      URL.createObjectURL(file);

    setIconPreview(
      previewUrl,
    );

    // =====================================
    // CLEAR ERROR
    // =====================================

    setErrors((prev) => ({
      ...prev,
      icon: "",
    }));
  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (
    field:
      | "categoryId"
      | "name"
      | "description",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (
    ev: React.FormEvent,
  ) => {
    ev.preventDefault();

    // =====================================
    // VALIDATE
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
        const updatedSubCategory =
          await updateJobSubCategory(
            editingId,
            {
              categoryId:
                form.categoryId,
              name:
                form.name.trim(),
              description:
                form.description.trim(),
              icon:
                form.icon,
            },
          );

        setRows(
          (currentRows) =>
            currentRows.map(
              (row) =>
                row._id ===
                  editingId
                  ? updatedSubCategory
                  : row,
            ),
        );

        showSuccess(
          "Job sub category updated successfully",
        );
      }

      // =====================================
      // CREATE
      // =====================================

      else {
        if (!form.icon) {
          setErrors({
            icon:
              "Icon is required",
          });

          return;
        }

        const newSubCategory =
          await createJobSubCategory({
            categoryId:
              form.categoryId,
            name:
              form.name.trim(),
            description:
              form.description.trim(),
            icon:
              form.icon,
          });

        setRows(
          (currentRows) => [
            newSubCategory,
            ...currentRows,
          ],
        );

        showSuccess(
          "Job sub category added successfully",
        );
      }

      // =====================================
      // CLOSE FORM
      // =====================================

      closeForm();
    } catch (error) {
      console.error(
        "Error saving job sub category:",
        error,
      );

      showError(
        "Something went wrong while saving job sub category",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (
    row: JobSubCategory,
  ) => {
    if (!row._id) {
      showError(
        "Job sub category ID not found",
      );

      return;
    }

    const categoryId =
      getCategoryId(
        row.categoryId,
      );

    setEditingId(row._id);

    setForm({
      categoryId,
      name:
        row.name || "",
      description:
        row.description || "",
      icon: null,
    });

    // =====================================
    // OLD ICON PREVIEW
    // =====================================

    setIconPreview(
      row.icon
        ? getImageUrl(row.icon)
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
    if (!deleteTarget?._id) {
      return;
    }

    try {
      setLoading(true);

      await deleteJobSubCategory(
        deleteTarget._id,
      );

      setRows(
        (currentRows) =>
          currentRows.filter(
            (row) =>
              row._id !==
              deleteTarget._id,
          ),
      );

      setDeleteTarget(null);

      showSuccess(
        "Job sub category deleted successfully",
      );
    } catch (error) {
      console.error(
        "Error deleting job sub category:",
        error,
      );

      showError(
        "Something went wrong while deleting job sub category",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE COLUMNS
  // =====================================

  const columns: ColumnDef<JobSubCategory>[] =
    [
      // =====================================
      // SUB CATEGORY
      // =====================================

      {
        header: "Sub Category",

        render: (row) => (
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 10,
            }}
          >
            {/* =====================================
                ICON
            ===================================== */}

            <div
              className="icon-preview"
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {row.icon ? (
                <img
                  src={getImageUrl(
                    row.icon,
                  )}
                  alt={
                    row.name
                  }
                  style={{
                    width: 35,
                    height: 35,
                    objectFit:
                      "contain",
                  }}
                />
              ) : (
                <Icon
                  name="folder"
                  size={20}
                />
              )}
            </div>

            {/* =====================================
                NAME
            ===================================== */}

            <b>
              {row.name}
            </b>
          </div>
        ),
      },

      // =====================================
      // PARENT CATEGORY
      // =====================================

      {
        header:
          "Parent Category",

        render: (row) => (
          <span className="badge badge-blue">
            {getCategoryName(
              row.categoryId,
            )}
          </span>
        ),
      },

      // =====================================
      // DESCRIPTION
      // =====================================

      {
        header:
          "Description",

        render: (row) => (
          <span className="cell-muted">
            {row.description ||
              "-"}
          </span>
        ),
      },
    ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (
    row: JobSubCategory,
  ): ViewField[] => [
      // =====================================
      // SUB CATEGORY NAME
      // =====================================

      {
        label:
          "Sub Category Name",

        value:
          row.name || "-",
      },

      // =====================================
      // PARENT CATEGORY
      // =====================================

      {
        label:
          "Parent Category",

        value:
          getCategoryName(
            row.categoryId,
          ),
      },

      // =====================================
      // DESCRIPTION
      // =====================================

      {
        label:
          "Description",

        value:
          row.description ||
          "-",

        fullWidth: true,
      },

      // =====================================
      // ICON
      // =====================================

      {
        label: "Icon",

        value: row.icon ? (
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
            }}
          >
            <img
              src={getImageUrl(
                row.icon,
              )}
              alt={
                row.name
              }
              style={{
                width: 80,
                height: 80,
                objectFit:
                  "contain",
              }}
            />
          </div>
        ) : (
          "-"
        ),
      },

      // =====================================
      // ACTIVE
      // =====================================

      {
        label: "Active",

        value:
          row.isActive
            ? "Yes"
            : "No",
      },

      // =====================================
      // DISPLAY
      // =====================================

      {
        label: "Display",

        value:
          row.isDisplay
            ? "Yes"
            : "No",
      },

      // =====================================
      // CREATED BY
      // =====================================

      {
        label:
          "Created By",

        value:
          row.createdBy ||
          "-",
      },

      // =====================================
      // CREATED AT
      // =====================================

      {
        label:
          "Created At",

        value:
          row.createdAt
            ? new Date(
              row.createdAt,
            ).toLocaleString()
            : "-",
      },

      // =====================================
      // UPDATED BY
      // =====================================

      {
        label:
          "Updated By",

        value:
          row.updatedBy ||
          "-",
      },

      // =====================================
      // UPDATED AT
      // =====================================

      {
        label:
          "Updated At",

        value:
          row.updatedAt
            ? new Date(
              row.updatedAt,
            ).toLocaleString()
            : "-",
      },

      // =====================================
      // DELETE BY
      // =====================================

      {
        label:
          "Delete By",

        value:
          row.deleteBy ||
          "-",
      },

      // =====================================
      // DELETE AT
      // =====================================

      {
        label:
          "Delete At",

        value:
          row.deleteAt
            ? new Date(
              row.deleteAt,
            ).toLocaleString()
            : "-",
      },
    ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <PageHeader
        title="Job Sub Category Master"
        section="Job Masters"
      />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          {/* =====================================
              FORM HEADER
          ===================================== */}

          <div
            className="card-panel-head"
            style={{
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap: 20,
            }}
          >
            <div>
              <h2>
                {editingId
                  ? "Edit Job Sub Category"
                  : "Add Job Sub Category"}
              </h2>

              <p>
                Sub categories are
                grouped under job
                categories.
              </p>
            </div>

            {/* =====================================
                CANCEL
            ===================================== */}

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={
                closeForm
              }
              disabled={
                loading
              }
            >
              <Icon
                name="x"
                size={14}
              />

              Cancel
            </button>
          </div>

          {/* =====================================
              FORM BODY
          ===================================== */}

          <div className="card-panel-body">
            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="form-grid">
                {/* =====================================
                    PARENT CATEGORY
                ===================================== */}

                <Field
                  label="Parent Category"
                  required
                  error={
                    errors.categoryId
                  }
                >
                  <select
                    value={
                      form.categoryId
                    }
                    onChange={(
                      e,
                    ) =>
                      handleChange(
                        "categoryId",
                        e.target
                          .value,
                      )
                    }
                    disabled={
                      loading
                    }
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map(
                      (
                        category,
                      ) => (
                        <option
                          key={
                            category._id
                          }
                          value={
                            category._id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      ),
                    )}
                  </select>
                </Field>

                {/* =====================================
                    SUB CATEGORY NAME
                ===================================== */}

                <Field
                  label="Sub Category Name"
                  required
                  error={
                    errors.name
                  }
                >
                  <input
                    type="text"
                    value={
                      form.name
                    }
                    onChange={(
                      e,
                    ) =>
                      handleChange(
                        "name",
                        e.target
                          .value,
                      )
                    }
                    placeholder="e.g. Frontend Developer"
                    disabled={
                      loading
                    }
                  />
                </Field>

                {/* =====================================
                    ICON
                ===================================== */}

                <Field
                  label="Icon"
                  required={
                    !editingId
                  }
                  error={
                    errors.icon
                  }
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.svg,image/jpeg,image/png,image/webp,image/svg+xml"
                    onChange={
                      handleIconChange
                    }
                    disabled={
                      loading
                    }
                  />

                  {/* =====================================
                      ICON PREVIEW
                  ===================================== */}

                  {iconPreview && (
                    <div
                      style={{
                        marginTop: 10,
                        width: 70,
                        height: 70,
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        border:
                          "1px solid #ddd",
                        borderRadius: 8,
                        padding: 5,
                      }}
                    >
                      <img
                        src={
                          iconPreview
                        }
                        alt="Icon preview"
                        style={{
                          width: 55,
                          height: 55,
                          objectFit:
                            "contain",
                        }}
                      />
                    </div>
                  )}

                  {/* =====================================
                      EDIT NOTE
                  ===================================== */}

                  {editingId && (
                    <small
                      style={{
                        display:
                          "block",
                        marginTop: 6,
                        color:
                          "#777",
                      }}
                    >
                      Leave empty to
                      keep the existing
                      icon.
                    </small>
                  )}
                </Field>

                {/* =====================================
                    DESCRIPTION
                ===================================== */}

                <Field
                  label="Description"
                  required
                  error={
                    errors.description
                  }
                  span2
                >
                  <textarea
                    value={
                      form.description
                    }
                    onChange={(
                      e,
                    ) =>
                      handleChange(
                        "description",
                        e.target
                          .value,
                      )
                    }
                    placeholder="Short description of this job sub category"
                    disabled={
                      loading
                    }
                    rows={4}
                  />
                </Field>
              </div>

              {/* =====================================
                  FORM ACTIONS
              ===================================== */}

              <div className="form-actions">
                {/* =====================================
                    RESET
                ===================================== */}

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={
                    resetForm
                  }
                  disabled={
                    loading
                  }
                >
                  Reset
                </button>

                {/* =====================================
                    SUBMIT
                ===================================== */}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading
                  }
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
                      ? "Update Sub Category"
                      : "Add Sub Category"}
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
        {/* =====================================
            TABLE HEADER
        ===================================== */}

        <div className="card-panel-header">
          {/* =====================================
              ADD BUTTON
          ===================================== */}

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={
                handleAdd
              }
            >
              <Icon
                name="plus"
                size={15}
              />

              Add Job Sub Category
            </button>
          )}
        </div>

        {/* =====================================
            TABLE
        ===================================== */}

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) =>
            row._id
          }
          searchPlaceholder="Search sub category..."
          onSearch={(
            row,
            query,
          ) => {
            const search =
              query.toLowerCase();

            const subCategoryName =
              row.name
                ?.toLowerCase() ||
              "";

            const description =
              row.description
                ?.toLowerCase() ||
              "";

            const parentCategory =
              getCategoryName(
                row.categoryId,
              ).toLowerCase();

            return (
              subCategoryName.includes(
                search,
              ) ||
              description.includes(
                search,
              ) ||
              parentCategory.includes(
                search,
              )
            );
          }}
          onView={(row) =>
            setViewTarget(
              row,
            )
          }
          onEdit={
            handleEdit
          }
          onDelete={(
            row,
          ) =>
            setDeleteTarget(
              row,
            )
          }
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={
          !!viewTarget
        }
        title="Job Sub Category Details"
        fields={
          viewTarget
            ? getViewFields(
              viewTarget,
            )
            : []
        }
        onClose={() =>
          setViewTarget(
            null,
          )
        }
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={
          !!deleteTarget
        }
        title="Delete Job Sub Category?"
        message={`"${deleteTarget?.name}" job sub category will be deleted.`}
        onCancel={() =>
          setDeleteTarget(
            null,
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </>
  );
};

export default JobSubCategoryMaster;