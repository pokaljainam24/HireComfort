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
  smtpServer: "",
  emailFrom: "",
  username: "",
  securityType: "",
  password: "",
  port: "",
};

// =====================================
// COMPONENT
// =====================================

const EmailCredentialMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<EmailCredential[]>([]);

  const [form, setForm] = useState<EmailCredentialForm>({
    ...empty,
  });

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
    setForm({
      ...empty,
    });

    setEditingId(null);
    setErrors({});
    setShowForm(true);
  };

  // =====================================
  // RESET / CLOSE FORM
  // =====================================

  const closeForm = () => {
    setForm({
      ...empty,
    });

    setEditingId(null);
    setErrors({});
    setShowForm(false);
  };

  const resetForm = () => {
    setForm({
      ...empty,
    });
  };

  // =====================================
  // FORM CHANGE
  // =====================================

  const handleChange = (field: keyof EmailCredentialForm, value: string) => {
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
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // =====================================
    // SMTP SERVER
    // =====================================

    if (!form.smtpServer.trim()) {
      e.smtpServer = "SMTP server is required";
    }

    // =====================================
    // EMAIL FROM
    // =====================================

    if (!form.emailFrom.trim()) {
      e.emailFrom = "Email from is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailFrom.trim())) {
      e.emailFrom = "Please enter a valid email address";
    }

    // =====================================
    // USERNAME
    // =====================================

    if (!form.username.trim()) {
      e.username = "Username is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.username.trim())) {
      e.username = "Please enter a valid email address";
    }

    // =====================================
    // SECURITY TYPE
    // =====================================

    if (!form.securityType.trim()) {
      e.securityType = "Security type is required";
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
      smtpServer: row.smtpServer,
      emailFrom: row.emailFrom,
      username: row.username,
      securityType: row.securityType,
      password: "",
      port: row.port,
    });

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
      header: "SMTP Server",
      render: (row) => (
        <div>
          <b>{row.smtpServer}</b>
        </div>
      ),
    },

    {
      header: "Email From",
      render: (row) => <div className="cell-muted">{row.emailFrom}</div>,
    },

    {
      header: "Username",
      render: (row) => <div className="cell-muted">{row.username}</div>,
    },

    {
      header: "Security Type",
      render: (row) => <div className="cell-muted">{row.securityType}</div>,
    },

    {
      header: "Port",
      render: (row) => <div className="cell-muted">{row.port}</div>,
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
      label: "SMTP Server",
      value: row.smtpServer,
      fullWidth: true,
    },

    {
      label: "Email From",
      value: row.emailFrom,
    },

    {
      label: "Username",
      value: row.username,
    },

    {
      label: "Security Type",
      value: row.securityType,
    },

    {
      label: "Port",
      value: row.port,
    },

    {
      label: "Password",
      value: (
        <div className="d-flex align-items-center justify-content-between gap-2">
          <span>{showPassword ? "Password is protected" : "••••••••"}</span>

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

              <p>Manage SMTP email credentials.</p>
            </div>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={closeForm}
              disabled={loading}
            >
              <Icon name="x" size={14} />
              Close
            </button>
          </div>

          <div className="card-panel-body">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* SMTP SERVER */}

                <Field label="SMTP Server" required error={errors.smtpServer}>
                  <input
                    value={form.smtpServer}
                    onChange={(e) => handleChange("smtpServer", e.target.value)}
                    placeholder="smtp.gmail.com"
                    disabled={loading}
                  />
                </Field>

                {/* EMAIL FROM */}

                <Field label="Email From" required error={errors.emailFrom}>
                  <input
                    type="email"
                    value={form.emailFrom}
                    onChange={(e) => handleChange("emailFrom", e.target.value)}
                    placeholder="otp@otpmanager.com"
                    disabled={loading}
                  />
                </Field>

                {/* USERNAME */}

                <Field label="Username" required error={errors.username}>
                  <input
                    type="email"
                    value={form.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="otp@otpmanager.com"
                    disabled={loading}
                  />
                </Field>

                {/* SECURITY TYPE */}

                <Field
                  label="Security Type"
                  required
                  error={errors.securityType}
                >
                  <select
                    value={form.securityType}
                    onChange={(e) =>
                      handleChange("securityType", e.target.value)
                    }
                    disabled={loading}
                  >
                    <option value="">Select Security Type</option>

                    <option value="SSL">SSL</option>

                    <option value="TLS">TLS</option>

                    <option value="STARTTLS">STARTTLS</option>

                    <option value="NONE">None</option>
                  </select>
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
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder={
                      editingId ? "Enter new password" : "Enter password"
                    }
                    disabled={loading}
                  />
                </Field>

                {/* PORT */}

                <Field label="Port" required error={errors.port}>
                  <input
                    value={form.port}
                    onChange={(e) => handleChange("port", e.target.value)}
                    placeholder="465"
                    inputMode="numeric"
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
        <div className="card-panel-header">

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
            row.smtpServer.toLowerCase().includes(query) ||
            row.emailFrom.toLowerCase().includes(query) ||
            row.username.toLowerCase().includes(query) ||
            row.securityType.toLowerCase().includes(query) ||
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
        subject={`"${deleteTarget?.emailFrom}" email credential will be deleted.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default EmailCredentialMaster;
