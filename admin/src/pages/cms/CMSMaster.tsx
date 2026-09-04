import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import type { CmsSection, CmsSectionForm } from "@/types/cms";

import { getCms, createCms, updateCms, deleteCms } from "@/api/cmsApi";

const emptyForm: CmsSectionForm = {
  sectionName: "",
  code: "",
  content: "",
};

const CMSMaster: React.FC = () => {
  // =====================================
  // States
  // =====================================

  const [rows, setRows] = useState<CmsSection[]>([]);

  const [form, setForm] = useState<CmsSectionForm>(emptyForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<CmsSection | null>(null);

  const [viewTarget, setViewTarget] = useState<CmsSection | null>(null);

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [deleting, setDeleting] = useState(false);

  // =====================================
  // Get CMS
  // =====================================

  const fetchCms = async () => {
    try {
      setLoading(true);

      const data = await getCms();

      setRows(data);
    } catch (error) {
      console.error("Failed to fetch CMS sections:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Page Load
  // =====================================

  useEffect(() => {
    fetchCms();
  }, []);

  // =====================================
  // Reset Form
  // =====================================

  const resetForm = () => {
    setForm({
      ...emptyForm,
    });

    setEditingId(null);

    setErrors({});
  };

  // =====================================
  // Input Change
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
  // Validation
  // =====================================

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Section Name
    if (!form.sectionName.trim()) {
      newErrors.sectionName = "Section name is required";
    } else if (form.sectionName.trim().length < 2) {
      newErrors.sectionName = "Section name must contain at least 2 characters";
    }

    // Code
    if (!form.code.trim()) {
      newErrors.code = "Code is required";
    } else if (form.code.trim().length < 2) {
      newErrors.code = "Code must contain at least 2 characters";
    }

    // Content
    if (!form.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      const payload: CmsSectionForm = {
        sectionName: form.sectionName.trim(),
        code: form.code.trim(),
        content: form.content.trim(),
      };

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updatedCms = await updateCms(editingId, payload);

        setRows((currentRows) =>
          currentRows.map((row) => (row._id === editingId ? updatedCms : row)),
        );
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const newCms = await createCms(payload);

        setRows((currentRows) => [newCms, ...currentRows]);
      }

      resetForm();
    } catch (error) {
      console.error("CMS submit failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================
  // Edit
  // =====================================

  const handleEdit = (row: CmsSection) => {
    setEditingId(row._id);

    setForm({
      sectionName: row.sectionName,
      code: row.code,
      content: row.content,
    });

    setErrors({});

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // Delete
  // =====================================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);

      await deleteCms(deleteTarget._id);

      setRows((currentRows) =>
        currentRows.filter((row) => row._id !== deleteTarget._id),
      );

      // If deleted row is currently editing
      if (editingId === deleteTarget._id) {
        resetForm();
      }

      setDeleteTarget(null);
    } catch (error) {
      console.error("CMS delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  // =====================================
  // Table Columns
  // =====================================

  const columns: ColumnDef<CmsSection>[] = [
    {
      header: "Section Name",

      render: (row) => <b>{row.sectionName}</b>,
    },

    {
      header: "Code",

      render: (row) => <span className="badge badge-gray">{row.code}</span>,
    },

    {
      header: "Content Preview",

      render: (row) => (
        <span className="cell-muted">
          {row.content.slice(0, 60)}

          {row.content.length > 60 ? "..." : ""}
        </span>
      ),
    },

  ];

  // =====================================
  // View Modal Fields
  // =====================================

  const viewFields: ViewField[] = viewTarget
    ? [
        {
          label: "Section Name",
          value: viewTarget.sectionName,
        },

        {
          label: "Section Code",
          value: <span className="badge badge-gray">{viewTarget.code}</span>,
        },

        {
          label: "Content",
          value: (
            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.7,
              }}
            >
              {viewTarget.content}
            </div>
          ),
          fullWidth: true,
        },

        {
          label: "Display",
          value: viewTarget.isDisplay ? "Yes" : "No",
        },

        {
          label: "Created By",
          value: viewTarget.createdBy,
        },

        {
          label: "Created At",
          value: viewTarget.createdAt
            ? new Date(viewTarget.createdAt).toLocaleString()
            : "-",
        },

        {
          label: "Updated By",
          value: viewTarget.updatedBy || "-",
        },

        {
          label: "Updated At",
          value: viewTarget.updatedAt
            ? new Date(viewTarget.updatedAt).toLocaleString()
            : "-",
        },

        {
          label: "Deleted By",
          value: viewTarget.deleteBy || "-",
        },

        {
          label: "Deleted At",
          value: viewTarget.deleteAt
            ? new Date(viewTarget.deleteAt).toLocaleString()
            : "-",
        },
      ]
    : [];

  // =====================================
  // JSX
  // =====================================

  return (
    <>
      <PageHeader title="CMS Pages" section="Content" />

      {/* =====================================
          ADD / EDIT CMS
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{editingId ? "Edit Section" : "Add Section"}</h2>

            <p>Manage website content sections dynamically.</p>
          </div>

          {editingId && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={resetForm}
            >
              <Icon name="x" size={14} />
              Cancel edit
            </button>
          )}
        </div>

        <div className="card-panel-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Section Name */}

              <Field label="Section Name" required error={errors.sectionName}>
                <input
                  value={form.sectionName}
                  onChange={(event) =>
                    handleChange("sectionName", event.target.value)
                  }
                  placeholder="e.g. About Us"
                />
              </Field>

              {/* Section Code */}

              <Field
                label="Section Code"
                required
                error={errors.code}
                hint="Used as the page slug"
              >
                <input
                  value={form.code}
                  onChange={(event) => handleChange("code", event.target.value)}
                  placeholder="e.g. about-us"
                />
              </Field>

              {/* Content */}

              <Field label="Content" required error={errors.content} span2>
                <textarea
                  value={form.content}
                  onChange={(event) =>
                    handleChange("content", event.target.value)
                  }
                  placeholder="Enter CMS content..."
                  style={{
                    minHeight: 180,
                  }}
                />
              </Field>
            </div>

            {/* Actions */}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
                disabled={submitting}
              >
                Reset
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                <Icon name={editingId ? "edit" : "plus"} size={15} />

                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Update Section"
                    : "Add Section"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* =====================================
          CMS TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Sections</h2>

            <p>
              {loading
                ? "Loading CMS sections..."
                : `${rows.length} CMS sections`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="card-panel-body">
            <p className="cell-muted">Loading CMS sections...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(row) => row._id}
            searchPlaceholder="Search sections..."
            onSearch={(row, query) =>
              row.sectionName.toLowerCase().includes(query) ||
              row.code.toLowerCase().includes(query) ||
              row.content.toLowerCase().includes(query)
            }
            onView={(row) => setViewTarget(row)}
            onEdit={handleEdit}
            onDelete={(row) => setDeleteTarget(row)}
          />
        )}
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="CMS Section Details"
        fields={viewFields}
        onClose={() => setViewTarget(null)}
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete section?"
        message={`"${deleteTarget?.sectionName}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CMSMaster;
