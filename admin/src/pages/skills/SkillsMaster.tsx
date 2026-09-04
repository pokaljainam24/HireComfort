import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/api/skillsApi";

import { Skills, SkillsForm } from "@/types/skills";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: SkillsForm = {
  skillsTest: "",
};

// =====================================
// COMPONENT
// =====================================

const SkillsMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<Skills[]>([]);

  const [form, setForm] = useState<SkillsForm>(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<Skills | null>(null);

  const [viewTarget, setViewTarget] = useState<Skills | null>(null);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getSkills();

      setRows(data);
    } catch (error) {
      console.error("Error loading skills:", error);

      showError("Failed to load skills");
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
    // SKILLS
    // =====================================

    if (!form.skillsTest.trim()) {
      e.skillsTest = "Skills is required";
    } else if (form.skillsTest.trim().length < 2) {
      e.skillsTest = "Skills must contain at least 2 characters";
    } else if (form.skillsTest.trim().length > 50) {
      e.skillsTest = "Skills must not exceed 50 characters";
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
        const updated = await updateSkill(editingId, form);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );

        showSuccess("Skills updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createSkill(form);

        setRows((rows) => [created, ...rows]);

        showSuccess("Skills added successfully");
      }

      resetForm();
    } catch (error: any) {
      console.error("Error saving skills:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while saving skills",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: Skills) => {
    setEditingId(row._id);

    setForm({
      skillsTest: row.skillsTest,
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

      await deleteSkill(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("Skills deleted successfully");
    } catch (error: any) {
      console.error("Error deleting skills:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while deleting skills",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<Skills>[] = [
    {
      header: "Skills",

      render: (row) => (
        <div>
          <b>{row.skillsTest}</b>
        </div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: Skills): ViewField[] => [
    {
      label: "Skills",
      value: row.skillsTest,
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
      <PageHeader title="Skills" section="Master" />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>{editingId ? "Edit Skills" : "Add Skills"}</h2>

              <p>Manage skills.</p>
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
                    SKILLS
                ===================================== */}

                <Field label="Skills" required error={errors.skillsTest}>
                  <input
                    value={form.skillsTest}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        skillsTest: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        skillsTest: "",
                      });
                    }}
                    placeholder="e.g. React JS"
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
                      ? "Update Skills"
                      : "Add Skills"}
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
            <h2>Skills</h2>

            <p>{rows.length} skills available</p>
          </div>

          {/* ADD BUTTON */}

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              <Icon name="plus" size={15} />
              Add Skills
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search skills..."
          onSearch={(row, query) =>
            row.skillsTest.toLowerCase().includes(query)
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
        title="Skills Details"
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
        title="Delete Skills?"
        message={`"${deleteTarget?.skillsTest}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default SkillsMaster;
