import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import type { CmsSection, CmsSectionForm } from "@/types/cms";

import { getCms, createCms, updateCms, deleteCms } from "@/api/cmsApi";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const emptyForm: CmsSectionForm = {
  smtpServer: "",
  emailFrom: "",
  username: "",
  securityType: "",
  password: "",
  port: "",
  content: "",
};

// =====================================
// COMPONENT
// =====================================

const CMSMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<CmsSection[]>([]);

  const [form, setForm] = useState<CmsSectionForm>({
    ...emptyForm,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<CmsSection | null>(null);

  const [viewTarget, setViewTarget] = useState<CmsSection | null>(null);

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const cms = await getCms();

      setRows(cms);
    } catch (error) {
      console.error("Error loading CMS:", error);

      showError("Failed to load CMS data");
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
    setForm({
      ...emptyForm,
    });

    setEditingId(null);

    setErrors({});

    setShowPassword(false);
  };

  // =====================================
  // CLOSE FORM
  // =====================================

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // SMTP SERVER
    if (!form.smtpServer.trim()) {
      e.smtpServer = "SMTP server is required";
    }

    // EMAIL FROM
    if (!form.emailFrom.trim()) {
      e.emailFrom = "Email from is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailFrom.trim())) {
      e.emailFrom = "Enter a valid email address";
    }

    // USERNAME
    if (!form.username.trim()) {
      e.username = "Username is required";
    }

    // SECURITY TYPE
    if (!form.securityType.trim()) {
      e.securityType = "Security type is required";
    }

    // PASSWORD
    if (!form.password.trim()) {
      e.password = "Password is required";
    }

    // PORT
    if (!form.port.trim()) {
      e.port = "Port is required";
    } else if (Number(form.port) < 1 || Number(form.port) > 65535) {
      e.port = "Port must be between 1 and 65535";
    }

    // CONTENT
    if (!form.content.trim()) {
      e.content = "Content is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (field: keyof CmsSectionForm, value: string) => {
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

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const payload: CmsSectionForm = {
        smtpServer: form.smtpServer.trim(),
        emailFrom: form.emailFrom.trim(),
        username: form.username.trim(),
        securityType: form.securityType.trim(),
        password: form.password.trim(),
        port: form.port.trim(),
        content: form.content,
      };

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updated = await updateCms(editingId, payload);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );

        showSuccess("CMS configuration updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createCms(payload);

        setRows((rows) => [created, ...rows]);

        showSuccess("CMS configuration added successfully");
      }

      closeForm();
    } catch (error) {
      console.error("Error saving CMS:", error);

      showError("Something went wrong while saving CMS");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: CmsSection) => {
    setEditingId(row._id);

    setForm({
      smtpServer: row.smtpServer,
      emailFrom: row.emailFrom,
      username: row.username,
      securityType: row.securityType,
      password: row.password,
      port: String(row.port),
      content: row.content,
    });

    setErrors({});

    setShowPassword(false);

    // Open form when editing
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

      await deleteCms(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("CMS configuration deleted successfully");
    } catch (error) {
      console.error("Error deleting CMS:", error);

      showError("Something went wrong while deleting CMS");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<CmsSection>[] = [
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
      render: (row) => <span className="cell-muted">{row.emailFrom}</span>,
    },

    {
      header: "Username",
      render: (row) => <span className="cell-muted">{row.username}</span>,
    },

    {
      header: "Security Type",
      render: (row) => (
        <span className="badge badge-gray">{row.securityType}</span>
      ),
    },

    {
      header: "Port",
      render: (row) => <span className="cell-muted">{row.port}</span>,
    },

    {
      header: "Content",
      render: (row) => {
        const plainText = row.content.replace(/<[^>]*>/g, "").trim();

        return (
          <span className="cell-muted">
            {plainText.slice(0, 60)}
            {plainText.length > 60 ? "..." : ""}
          </span>
        );
      },
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: CmsSection): ViewField[] => [
    {
      label: "SMTP Server",
      value: row.smtpServer,
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
      value: <span className="badge badge-gray">{row.securityType}</span>,
    },

    {
      label: "Port",
      value: row.port,
    },

    {
      label: "Password",
      value: "••••••••",
    },

    {
      label: "Content",
      value: (
        <div
          className="cms-content-preview"
          dangerouslySetInnerHTML={{
            __html: row.content,
          }}
        />
      ),
      fullWidth: true,
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
      <PageHeader title="CMS" section="Content" />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>{editingId ? "Edit CMS" : "Add CMS"}</h2>

              <p>Manage email SMTP configuration and content.</p>
            </div>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={closeForm}
              disabled={loading}
            >
              <Icon name="x" size={14} />
              Cancel
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
                    placeholder="e.g. smtp.gmail.com"
                    disabled={loading}
                  />
                </Field>

                {/* EMAIL FROM */}

                <Field label="Email From" required error={errors.emailFrom}>
                  <input
                    type="email"
                    value={form.emailFrom}
                    onChange={(e) => handleChange("emailFrom", e.target.value)}
                    placeholder="e.g. otp@example.com"
                    disabled={loading}
                  />
                </Field>

                {/* USERNAME */}

                <Field label="Username" required error={errors.username}>
                  <input
                    value={form.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    placeholder="Enter username"
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
                    <option value="NONE">None</option>
                  </select>
                </Field>

                {/* PASSWORD */}

                <Field label="Password" required error={errors.password}>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      placeholder="Enter password"
                      disabled={loading}
                      style={{
                        paddingRight: 42,
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
                    </button>
                  </div>
                </Field>

                {/* PORT */}

                <Field label="Port" required error={errors.port}>
                  <input
                    type="number"
                    min="1"
                    max="65535"
                    value={form.port}
                    onChange={(e) => handleChange("port", e.target.value)}
                    placeholder="e.g. 465"
                    disabled={loading}
                  />
                </Field>

                {/* CONTENT */}

                <Field label="Content" required error={errors.content} span2>
                  <Editor
                    apiKey={
                      (
                        import.meta as ImportMeta & {
                          env: { VITE_TINYMCE_API_KEY?: string };
                        }
                      ).env.VITE_TINYMCE_API_KEY
                    }
                    value={form.content}
                    onEditorChange={(content: string) =>
                      handleChange("content", content)
                    }
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic underline forecolor | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | " +
                        "link image media table | " +
                        "removeformat | code fullscreen",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                    }}
                  />
                </Field>
              </div>

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

                  {loading ? "Saving..." : editingId ? "Update CMS" : "Add CMS"}
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
            <h2>All CMS Configurations</h2>

            <p>{rows.length} CMS configurations available</p>
          </div>

          {/* ADD BUTTON SAME CARD ME */}

          {!showForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              <Icon name="plus" size={15} />
              Add CMS
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search CMS..."
          onSearch={(row, query) =>
            row.smtpServer.toLowerCase().includes(query) ||
            row.emailFrom.toLowerCase().includes(query) ||
            row.username.toLowerCase().includes(query) ||
            row.securityType.toLowerCase().includes(query) ||
            String(row.port).includes(query) ||
            row.content.toLowerCase().includes(query)
          }
          onView={(row) => setViewTarget(row)}
          onEdit={handleEdit}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="CMS Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => setViewTarget(null)}
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete CMS?"
        message={`"${deleteTarget?.smtpServer}" configuration will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CMSMaster;
