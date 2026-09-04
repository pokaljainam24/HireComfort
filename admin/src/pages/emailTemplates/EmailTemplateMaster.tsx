import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
  getEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "@/api/emailTemplateApi";

import { EmailTemplate, EmailTemplateForm } from "@/types/emailTemplate";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: EmailTemplateForm = {
  templateName: "",
  description: "",
};

// =====================================
// COMPONENT
// =====================================

const EmailTemplateMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<EmailTemplate[]>([]);

  const [form, setForm] = useState<EmailTemplateForm>(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<EmailTemplate | null>(null);

  const [viewTarget, setViewTarget] = useState<EmailTemplate | null>(null);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getEmailTemplates();

      setRows(data);
    } catch (error) {
      console.error("Error loading email templates:", error);

      showError("Failed to load email templates");
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
    // TEMPLATE NAME
    // =====================================

    if (!form.templateName.trim()) {
      e.templateName = "Template name is required";
    } else if (form.templateName.trim().length < 2) {
      e.templateName = "Template name must contain at least 2 characters";
    } else if (form.templateName.trim().length > 50) {
      e.templateName = "Template name must not exceed 50 characters";
    }

    // =====================================
    // DESCRIPTION
    // =====================================

    if (!form.description.trim()) {
      e.description = "Description is required";
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
        const updated = await updateEmailTemplate(editingId, form);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );

        showSuccess("Email template updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createEmailTemplate(form);

        setRows((rows) => [created, ...rows]);

        showSuccess("Email template added successfully");
      }

      resetForm();
    } catch (error: any) {
      console.error("Error saving email template:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while saving email template",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: EmailTemplate) => {
    setEditingId(row._id);

    setForm({
      templateName: row.templateName,
      description: row.description,
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

      await deleteEmailTemplate(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("Email template deleted successfully");
    } catch (error: any) {
      console.error("Error deleting email template:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while deleting email template",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<EmailTemplate>[] = [
    {
      header: "Template Name",

      render: (row) => (
        <div>
          <b>{row.templateName}</b>
        </div>
      ),
    },

    {
      header: "Description",

      render: (row) => <div className="cell-muted">{row.description}</div>,
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: EmailTemplate): ViewField[] => [
    {
      label: "Template Name",
      value: row.templateName,
      fullWidth: true,
    },

    {
      label: "Description",
      value: row.description,
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
      <PageHeader title="Email Template" section="Master" />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>
                {editingId ? "Edit Email Template" : "Add Email Template"}
              </h2>

              <p>Manage email templates.</p>
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
                    TEMPLATE NAME
                ===================================== */}

                <Field
                  label="Template Name"
                  required
                  error={errors.templateName}
                >
                  <input
                    value={form.templateName}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        templateName: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        templateName: "",
                      });
                    }}
                    placeholder="e.g. Welcome Email"
                    maxLength={50}
                    disabled={loading}
                  />
                </Field>

                {/* =====================================
                    DESCRIPTION
                ===================================== */}

                <Field label="Description" required error={errors.description}>
                  <textarea
                    value={form.description}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        description: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        description: "",
                      });
                    }}
                    placeholder="Enter email template description"
                    rows={5}
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
                      ? "Update Email Template"
                      : "Add Email Template"}
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
            <h2>Email Templates</h2>

            <p>{rows.length} email templates available</p>
          </div>

          {/* ADD BUTTON */}

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              <Icon name="plus" size={15} />
              Add Email Template
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search email templates..."
          onSearch={(row, query) =>
            row.templateName.toLowerCase().includes(query) ||
            row.description.toLowerCase().includes(query)
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
        title="Email Template Details"
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
        title="Delete Email Template?"
        message={`"${deleteTarget?.templateName}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default EmailTemplateMaster;
