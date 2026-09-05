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
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "@/api/IndustryApi";

import {
  Industry,
  IndustryForm,
} from "@/types/Industry";

import {
  showSuccess,
  showError,
} from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: IndustryForm = {
  IndustryName: "",
};

// =====================================
// COMPONENT
// =====================================

const IndustryMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<Industry[]>([]);
  const [form, setForm] =
    useState<IndustryForm>(empty);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [deleteTarget, setDeleteTarget] =
    useState<Industry | null>(null);

  const [viewTarget, setViewTarget] =
    useState<Industry | null>(null);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const industries = await getIndustries();

      setRows(industries ?? []);
    } catch (error) {
      console.error(
        "Error loading industries:",
        error,
      );

      showError(
        "Something went wrong while loading industries",
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
  // RESET
  // =====================================

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // =====================================
    // INDUSTRY NAME
    // =====================================

    if (!form.IndustryName.trim()) {
      e.IndustryName =
        "Industry name is required";
    } else if (
      form.IndustryName.trim().length < 2
    ) {
      e.IndustryName =
        "Industry name must contain at least 2 characters";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (
    ev: React.FormEvent,
  ) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // =====================================
      // UPDATE
      // =====================================

      if (editingId !== null) {
        await updateIndustry(
          editingId,
          form,
        );

        await loadData();

        showSuccess(
          "Industry updated successfully",
        );
      }

      // =====================================
      // CREATE
      // =====================================

      else {
        await createIndustry(form);

        await loadData();

        showSuccess(
          "Industry added successfully",
        );
      }

      resetForm();
    } catch (error) {
      console.error(
        "Error saving industry:",
        error,
      );

      showError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving industry",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: Industry) => {
    setEditingId(row.IndustryId);

    setForm({
      IndustryName: row.IndustryName,
    });

    setErrors({});
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

      await deleteIndustry(
        deleteTarget.IndustryId,
      );

      setRows((rows) =>
        rows.filter(
          (row) =>
            row.IndustryId !==
            deleteTarget.IndustryId,
        ),
      );

      setDeleteTarget(null);

      showSuccess(
        "Industry deleted successfully",
      );
    } catch (error) {
      console.error(
        "Error deleting industry:",
        error,
      );

      showError(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting industry",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<Industry>[] = [
    {
      header: "Industry Name",
      render: (row) => (
        <div>
          <b>{row.IndustryName}</b>
        </div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (
    row: Industry,
  ): ViewField[] => [
    {
      label: "Industry Name",
      value: row.IndustryName,
      fullWidth: true,
    },

    {
      label: "Display",
      value: row.isDisplay
        ? "Yes"
        : "No",
    },

    {
      label: "Created By",
      value: row.createdBy || "-",
    },

    {
      label: "Created At",
      value: row.createdAt
        ? new Date(
            row.createdAt,
          ).toLocaleString()
        : "-",
    },

    {
      label: "Updated By",
      value: row.updatedBy || "-",
    },

    {
      label: "Updated At",
      value: row.updatedAt
        ? new Date(
            row.updatedAt,
          ).toLocaleString()
        : "-",
    },

    {
      label: "Delete By",
      value: row.deleteBy || "-",
    },

    {
      label: "Delete At",
      value: row.deleteAt
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
      <PageHeader
        title="Industry"
        section="Job Masters"
      />

      {/* =====================================
          FORM
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              {editingId !== null
                ? "Edit Industry"
                : "Add Industry"}
            </h2>

            <p>
              Manage industries.
            </p>
          </div>

          {editingId !== null && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={resetForm}
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
          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              {/* INDUSTRY NAME */}

              <Field
                label="Industry Name"
                required
                error={
                  errors.IndustryName
                }
                span2
              >
                <input
                  value={
                    form.IndustryName
                  }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      IndustryName:
                        e.target.value,
                    });

                    setErrors({
                      ...errors,
                      IndustryName: "",
                    });
                  }}
                  placeholder="e.g. Information Technology"
                  disabled={loading}
                />
              </Field>

            </div>

            {/* ACTIONS */}

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
                    editingId !== null
                      ? "edit"
                      : "plus"
                  }
                  size={15}
                />

                {loading
                  ? "Saving..."
                  : editingId !== null
                  ? "Update Industry"
                  : "Add Industry"}
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
            <h2>All Industries</h2>

            <p>
              {rows.length} industries
              available
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
         rowKey={(row) =>
            String(row.IndustryId)
        }
          searchPlaceholder="Search industries..."
          onSearch={(row, query) =>
            row.IndustryName
              .toLowerCase()
              .includes(query)
          }
          onView={(row) =>
            setViewTarget(row)
          }
          onEdit={handleEdit}
          onDelete={(row) =>
            setDeleteTarget(row)
          }
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="Industry Details"
        fields={
          viewTarget
            ? getViewFields(
                viewTarget,
              )
            : []
        }
        onClose={() =>
          setViewTarget(null)
        }
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Industry?"
        message={`"${deleteTarget?.IndustryName}" will be permanently removed.`}
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
};

export default IndustryMaster;