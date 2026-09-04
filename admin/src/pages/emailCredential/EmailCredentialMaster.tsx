import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
  getEmailCredentials,
  createEmailCredential,
  updateEmailCredential,
  deleteEmailCredential,
} from "@/api/emailCredentialApi";

import { EmailCredential, EmailCredentialForm } from "@/types/emailCredential";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: EmailCredentialForm = {
  emailSetUpName: "",
  email: "",
  host: "",
  port: "",
  isSSL: false,
  password: "",
};

// =====================================
// COMPONENT
// =====================================

const EmailCredentialMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<EmailCredential[]>([]);

  const [form, setForm] = useState<EmailCredentialForm>(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<EmailCredential | null>(
    null,
  );

  const [viewTarget, setViewTarget] = useState<EmailCredential | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getEmailCredentials();

      setRows(data);
    } catch (error) {
      console.error("Error loading email credentials:", error);

      showError("Failed to load email credentials");
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
    // EMAIL SETUP NAME
    // =====================================

    if (!form.emailSetUpName.trim()) {
      e.emailSetUpName = "Email setup name is required";
    } else if (form.emailSetUpName.trim().length < 2) {
      e.emailSetUpName = "Email setup name must contain at least 2 characters";
    }

    // =====================================
    // EMAIL
    // =====================================

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email address";
    }

    // =====================================
    // HOST
    // =====================================

    if (!form.host.trim()) {
      e.host = "Host is required";
    }

    // =====================================
    // PORT
    // =====================================

    if (!form.port.trim()) {
      e.port = "Port is required";
    } else if (!/^\d+$/.test(form.port.trim())) {
      e.port = "Port must contain only numbers";
    }

    // =====================================
    // PASSWORD
    // =====================================

    // Create time password required
    // Update time blank means old password
    // will remain unchanged.

    if (!editingId && !form.password.trim()) {
      e.password = "Password is required";
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
        const updated = await updateEmailCredential(editingId, form);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );

        showSuccess("Email credential updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createEmailCredential(form);

        setRows((rows) => [created, ...rows]);

        showSuccess("Email credential added successfully");
      }

      resetForm();
    } catch (error: any) {
      console.error("Error saving email credential:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while saving email credential",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: EmailCredential) => {
    setEditingId(row._id);

    setForm({
      emailSetUpName: row.emailSetUpName,
      email: row.email,
      host: row.host,
      port: row.port,
      isSSL: row.isSSL,

      // Password GET API se nahi aayega
      password: "",
    });

    setErrors({});

    // Edit par form open
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

      await deleteEmailCredential(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("Email credential deleted successfully");
    } catch (error: any) {
      console.error("Error deleting email credential:", error);

      showError(
        error?.response?.data?.message ||
          "Something went wrong while deleting email credential",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<EmailCredential>[] = [
    {
      header: "Setup Name",
      render: (row) => (
        <div>
          <b>{row.emailSetUpName}</b>
        </div>
      ),
    },

    {
      header: "Email",
      render: (row) => <div className="cell-muted">{row.email}</div>,
    },

    {
      header: "Host",
      render: (row) => <div className="cell-muted">{row.host}</div>,
    },

    {
      header: "Port",
      render: (row) => <div className="cell-muted">{row.port}</div>,
    },

    {
      header: "Password",
      render: (row) => (
        <div className="cell-muted">
          {showPassword ? row.password || "Password not available" : "••••••••"}
        </div>
      ),
    },

    {
      header: "SSL",
      render: (row) => (
        <span
          className={`badge ${
            row.isSSL ? "text-bg-success" : "text-bg-secondary"
          }`}
        >
          {row.isSSL ? "Enabled" : "Disabled"}
        </span>
      ),
    },
  ];

  // =====================================
  // VIEW
  // =====================================

  const handleView = (row: EmailCredential) => {
    setShowPassword(false);
    setViewTarget(row);
  };

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: EmailCredential): ViewField[] => [
    {
      label: "Email Setup Name",
      value: row.emailSetUpName,
      fullWidth: true,
    },

    {
      label: "Email",
      value: row.email,
    },

    {
      label: "Host",
      value: row.host,
    },

    {
      label: "Port",
      value: row.port,
    },

    {
      label: "SSL",
      value: row.isSSL ? "Enabled" : "Disabled",
    },

    {
      label: "Password",
      value: (
        <div className="d-flex align-items-center justify-content-between gap-2">
          <span>
            {showPassword
              ? row.password || "Password not available"
              : "••••••••"}
          </span>

          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            <Icon name={showPassword ? "eye-off" : "eye"} size={16} />
          </button>
        </div>
      ),
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
      <PageHeader title="Email Credential" section="Master" />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>
                {editingId ? "Edit Email Credential" : "Add Email Credential"}
              </h2>

              <p>Manage email server credentials.</p>
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
                {/* EMAIL SETUP NAME */}

                <Field
                  label="Email Setup Name"
                  required
                  error={errors.emailSetUpName}
                >
                  <input
                    value={form.emailSetUpName}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        emailSetUpName: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        emailSetUpName: "",
                      });
                    }}
                    placeholder="e.g. Gmail SMTP"
                    disabled={loading}
                  />
                </Field>

                {/* EMAIL */}

                <Field label="Email" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        email: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        email: "",
                      });
                    }}
                    placeholder="example@gmail.com"
                    disabled={loading}
                  />
                </Field>

                {/* HOST */}

                <Field label="Host" required error={errors.host}>
                  <input
                    value={form.host}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        host: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        host: "",
                      });
                    }}
                    placeholder="smtp.gmail.com"
                    disabled={loading}
                  />
                </Field>

                {/* PORT */}

                <Field label="Port" required error={errors.port}>
                  <input
                    value={form.port}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        port: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        port: "",
                      });
                    }}
                    placeholder="587"
                    disabled={loading}
                  />
                </Field>

                {/* PASSWORD */}

                <Field
                  label={
                    editingId
                      ? "Password (leave blank to keep existing)"
                      : "Password"
                  }
                  required={!editingId}
                  error={errors.password}
                >
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        password: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        password: "",
                      });
                    }}
                    placeholder={
                      editingId ? "Enter new password" : "Enter password"
                    }
                    disabled={loading}
                  />
                </Field>

                {/* SSL */}

                <Field label="SSL">
                  <div className="form-check mt-2 ssl-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isSSL"
                      checked={form.isSSL}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          isSSL: e.target.checked,
                        });
                      }}
                      disabled={loading}
                    />

                    <label htmlFor="isSSL" className="form-check-label">
                      Enable SSL
                    </label>
                  </div>
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
                  <Icon name={editingId ? "edit" : "plus"} size={15} />

                  {loading
                    ? "Saving..."
                    : editingId
                      ? "Update Email Credential"
                      : "Add Email Credential"}
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
            <h2>Email Credentials</h2>

            <p>{rows.length} email credentials available</p>
          </div>

          {/* ADD BUTTON */}

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAdd}
            >
              <Icon name="plus" size={15} />
              Add Email Credential
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search email credentials..."
          onSearch={(row, query) =>
            row.emailSetUpName.toLowerCase().includes(query) ||
            row.email.toLowerCase().includes(query) ||
            row.host.toLowerCase().includes(query) ||
            row.port.toLowerCase().includes(query)
          }
          onView={handleView}
          onEdit={handleEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="Email Credential Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => {
          setViewTarget(null);
          setShowPassword(false);
        }}
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Email Credential?"
        message={`"${deleteTarget?.emailSetUpName}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default EmailCredentialMaster;
