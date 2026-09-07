import React, { useEffect, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import type { Faq, FaqForm } from "@/types/faq";

import { getFaqs, createFaq, updateFaq, deleteFaq } from "@/api/faqApi";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const emptyForm: FaqForm = {
  que: "",
  ans: "",
};

// =====================================
// COMPONENT
// =====================================

const FaqMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<Faq[]>([]);

  const [form, setForm] = useState<FaqForm>({
    ...emptyForm,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);

  const [viewTarget, setViewTarget] = useState<Faq | null>(null);

  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const faqs = await getFaqs();

      setRows(faqs);
    } catch (error) {
      console.error("Error loading FAQs:", error);

      showError("Failed to load FAQ data");
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
    // QUESTION
    // =====================================

    if (!form.que.trim()) {
      e.que = "Question is required";
    }

    // =====================================
    // ANSWER
    // =====================================

    const plainAnswer = form.ans.replace(/<[^>]*>/g, "").trim();

    if (!plainAnswer) {
      e.ans = "Answer is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (field: keyof FaqForm, value: string) => {
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

      const payload: FaqForm = {
        que: form.que.trim(),
        ans: form.ans,
      };

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updated = await updateFaq(editingId, payload);

        setRows((rows) =>
          rows.map((row) => (row._id === editingId ? updated : row)),
        );

        showSuccess("FAQ updated successfully");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const created = await createFaq(payload);

        setRows((rows) => [created, ...rows]);

        showSuccess("FAQ added successfully");
      }

      closeForm();
    } catch (error) {
      console.error("Error saving FAQ:", error);

      showError("Something went wrong while saving FAQ");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (row: Faq) => {
    setEditingId(row._id);

    setForm({
      que: row.que,
      ans: row.ans,
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

      await deleteFaq(deleteTarget._id);

      setRows((rows) => rows.filter((row) => row._id !== deleteTarget._id));

      setDeleteTarget(null);

      showSuccess("FAQ deleted successfully");
    } catch (error) {
      console.error("Error deleting FAQ:", error);

      showError("Something went wrong while deleting FAQ");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<Faq>[] = [
    {
      header: "Question",

      render: (row) => (
        <div>
          <b>{row.que}</b>
        </div>
      ),
    },

    {
      header: "Answer",

      render: (row) => {
        const plainText = row.ans.replace(/<[^>]*>/g, "").trim();

        return (
          <span className="cell-muted">
            {plainText.slice(0, 100)}

            {plainText.length > 100 ? "..." : ""}
          </span>
        );
      },
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: Faq): ViewField[] => [
    {
      label: "Question",

      value: row.que,
    },

    {
      label: "Answer",

      value: (
        <div
          className="cms-content-preview"
          dangerouslySetInnerHTML={{
            __html: row.ans,
          }}
        />
      ),

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
      <PageHeader title="FAQ" section="Content" />

      {/* =====================================
          FORM
      ===================================== */}

      {showForm && (
        <div className="card-panel">
          <div className="card-panel-head">
            <div>
              <h2>{editingId ? "Edit FAQ" : "Add FAQ"}</h2>

              <p>Manage frequently asked questions and answers.</p>
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
                    QUESTION
                ===================================== */}

                <Field label="Question" required error={errors.que} span2>
                  <input
                    value={form.que}
                    onChange={(e) => handleChange("que", e.target.value)}
                    placeholder="Enter FAQ question"
                    disabled={loading}
                  />
                </Field>

                {/* =====================================
                    ANSWER
                ===================================== */}

                <Field label="Answer" required error={errors.ans} span2>
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
                    value={form.ans}
                    onEditorChange={(content: string) =>
                      handleChange("ans", content)
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

                  {loading ? "Saving..." : editingId ? "Update FAQ" : "Add FAQ"}
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
              Add FAQ
            </button>
          )}
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row._id}
          searchPlaceholder="Search FAQ..."
          onSearch={(row, query) =>
            row.que.toLowerCase().includes(query) ||
            row.ans.toLowerCase().includes(query)
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
        title="FAQ Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => setViewTarget(null)}
      />

      {/* =====================================
          DELETE MODAL
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete FAQ?"
        message={`"${deleteTarget?.que}" FAQ will be deleted.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default FaqMaster;
