import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
  getQualifications,
  createQualification,
  updateQualification,
  deleteQualification,
} from "@/api/qualificationApi";

import { Qualification, QualificationForm } from "@/types/qualification";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: QualificationForm = {
  qualificationTest: "",
};

// =====================================
// COMPONENT
// =====================================

const QualificationMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<Qualification[]>([]);

  const [form, setForm] = useState<QualificationForm>(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<Qualification | null>(null);

  const [viewTarget, setViewTarget] = useState<Qualification | null>(null);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getQualifications();

      setRows(data);
    } catch (error) {
      console.error("Error loading qualifications:", error);

      showError("Failed to load qualifications");
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
  // OPEN ADD FORM
  // =====================================

  const handleAdd = () => {
    setForm(empty);

    setEditingId(null);

    setErrors({});

    setShowForm(true);
  };

  // =====================================
  // RESET / CLOSE FORM
  // =====================================

  const resetForm = () => {
    setForm(empty);

    setEditingId(null);

    setErrors({});

    setShowForm(false);
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // =====================================
    // QUALIFICATION
    // =====================================

    if (!form.qualificationTest.trim()) {
      e.qualificationTest = "Qualification is required";
    } else if (form.qualificationTest.trim().length < 2) {
      e.qualificationTest = "Qualification must contain at least 2 characters";
    } else if (form.qualificationTest.trim().length > 50) {
      e.qualificationTest = "Qualification must not exceed 50 characters";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updated = await updateQualification(editingId, form);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );

        showSuccess("Qualification updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createQualification(form);

        setRows((rows) => [created, ...rows]);

        showSuccess("Qualification added successfully");
      }

      resetForm();
    } catch (error: any) {
      console.error("Error saving qualification:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while saving qualification",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: Qualification) => {
    setEditingId(row._id);

    setForm({
      qualificationTest: row.qualificationTest,
    });

    setErrors({});

    setShowForm(true);
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

      await deleteQualification(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("Qualification deleted successfully");
    } catch (error: any) {
      console.error("Error deleting qualification:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while deleting qualification",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<Qualification>[] = [
    {
      header: "Qualification",

      render: (row) => (
        <div>
          <b>{row.qualificationTest}</b>
        </div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: Qualification): ViewField[] => [
    {
      label: "Qualification",
      value: row.qualificationTest,
      fullWidth: true,
    },

    {
      label: "Active",
      value: row.isActive ? "Yes" : "No",
    },

    {
      label: "Display",
      value: row.isDisplay ? "Yes" : "No",
    },

    {
      label: "Created By",
      value: row.createdBy || "-",
    },

    {
      label: "Created At",
      value: row.createdAt ? new Date(row.createdAt).toLocaleString() : "-",
    },

    {
      label: "Updated By",
      value: row.updatedBy || "-",
    },

    {
      label: "Updated At",
      value: row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-",
    },

    {
      label: "Delete By",
      value: row.deleteBy || "-",
    },

    {
      label: "Delete At",
      value: row.deleteAt ? new Date(row.deleteAt).toLocaleString() : "-",
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader title="Qualification" section="Master" />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>{editingId ? "Edit Qualification" : "Add Qualification"}</h2>

              <p>Manage qualifications.</p>
            </div>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={resetForm}
              disabled={loading}
            >
              <Icon name="x" size={14} />
              Close
            </button>
          </div>

          <div className="card-panel-body">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* =====================================
                    QUALIFICATION
                ===================================== */}

                <Field
                  label="Qualification"
                  required
                  error={errors.qualificationTest}
                >
                  <input
                    value={form.qualificationTest}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        qualificationTest: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        qualificationTest: "",
                      });
                    }}
                    placeholder="e.g. B.Tech"
                    maxLength={50}
                    disabled={loading}
                  />
                </Field>
              </div>

              {/* =====================================
                  ACTIONS
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
                  <Icon name={editingId ? "edit" : "plus"} size={15} />

                  {loading
                    ? "Saving..."
                    : editingId
                      ? "Update Qualification"
                      : "Add Qualification"}
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
            <h2>Qualifications</h2>

            <p>{rows.length} qualifications available</p>
          </div>

          {/* ADD BUTTON */}

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              <Icon name="plus" size={15} />
              Add Qualification
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search qualifications..."
          onSearch={(row, query) =>
            row.qualificationTest.toLowerCase().includes(query)
          }
          onView={(row) => {
            setViewTarget(row);
          }}
          onEdit={handleEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="Qualification Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => {
          setViewTarget(null);
        }}
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Qualification?"
        message={`"${deleteTarget?.qualificationTest}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default QualificationMaster;
