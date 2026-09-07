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
  title: "",
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

    // =====================================
    // TITLE
    // =====================================

    if (!form.title.trim()) {
      e.title = "Title is required";
    }

    // =====================================
    // CONTENT
    // =====================================

    const plainContent = form.content.replace(/<[^>]*>/g, "").trim();

    if (!plainContent) {
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

      // =====================================
      // PAYLOAD
      // =====================================

      const payload: CmsSectionForm = {
        title: form.title.trim(),
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

        showSuccess("CMS updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createCms(payload);

        setRows((rows) => [created, ...rows]);

        showSuccess("CMS added successfully");
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
      title: row.title,
      content: row.content,
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

      await deleteCms(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("CMS deleted successfully");
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
      header: "Title",

      render: (row) => (
        <div>
          <b>{row.title}</b>
        </div>
      ),
    },

    {
      header: "Content",

      render: (row) => {
        const plainText = row.content.replace(/<[^>]*>/g, "").trim();

        return (
          <span className="cell-muted">
            {plainText.slice(0, 80)}

            {plainText.length > 80 ? "..." : ""}
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
      label: "Title",

      value: row.title,
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

              <p>Manage CMS title and content.</p>
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
                {/* =====================================
                    TITLE
                ===================================== */}

                <Field label="Title" required error={errors.title} span2>
                  <input
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter CMS title"
                    disabled={loading}
                  />
                </Field>

                {/* =====================================
                    CONTENT
                ===================================== */}

                <Field label="Content" required error={errors.content} span2>
                  <Editor
                    apiKey={
                      (
                        import.meta as ImportMeta & {
                          env: {
                            VITE_TINYMCE_API_KEY?: string;
                          };
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
        <div className="card-panel-header">

          {/* =====================================
              ADD BUTTON
          ===================================== */}

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
            row.title.toLowerCase().includes(query) ||
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
        message={`"${deleteTarget?.title}" CMS will be deleted.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default CMSMaster;
