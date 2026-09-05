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
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "@/api/faqApi";

import { Faq, FaqForm } from "@/types/faq";

import {
  showSuccess,
  showError,
} from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: FaqForm = {
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

  const [form, setForm] =
    useState<FaqForm>(empty);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] =
    useState<Faq | null>(null);

  const [viewTarget, setViewTarget] =
    useState<Faq | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const faqs = await getFaqs();

      setRows(faqs ?? []);
    } catch (error) {
      console.error(
        "Error loading FAQs:",
        error,
      );

      setRows([]);
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

    setShowForm(false);
  };

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
  // VALIDATION
  // =====================================

  const validate = () => {
    const e: Record<string, string> = {};

    // =====================================
    // QUESTION
    // =====================================

    if (!form.que.trim()) {
      e.que = "Question is required";
    } else if (
      form.que.trim().length < 5
    ) {
      e.que =
        "Question must contain at least 5 characters";
    }

    // =====================================
    // ANSWER
    // =====================================

    if (!form.ans.trim()) {
      e.ans = "Answer is required";
    } else if (
      form.ans.trim().length < 2
    ) {
      e.ans =
        "Answer must contain at least 2 characters";
    }

    setErrors(e);

    return (
      Object.keys(e).length === 0
    );
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

      const payload: FaqForm = {
        que: form.que.trim(),
        ans: form.ans.trim(),
      };

      // =====================================
      // UPDATE
      // =====================================

      if (editingId) {
        const updated =
          await updateFaq(
            editingId,
            payload,
          );

        setRows((rows) =>
          rows.map((row) =>
            row._id === editingId
              ? updated
              : row,
          ),
        );

        showSuccess(
          "FAQ updated successfully",
        );
      }

      // =====================================
      // CREATE
      // =====================================

      else {
        const created =
          await createFaq(payload);

        setRows((rows) => [
          created,
          ...rows,
        ]);

        showSuccess(
          "FAQ added successfully",
        );
      }

      resetForm();
    } catch (error) {
      console.error(
        "Error saving FAQ:",
        error,
      );

      showError(
        "Something went wrong while saving FAQ",
      );
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

      await deleteFaq(
        deleteTarget._id,
      );

      setRows((rows) =>
        rows.filter(
          (row) =>
            row._id !==
            deleteTarget._id,
        ),
      );

      // If deleted row is currently
      // being edited
      if (
        editingId ===
        deleteTarget._id
      ) {
        resetForm();
      }

      setDeleteTarget(null);

      showSuccess(
        "FAQ deleted successfully",
      );
    } catch (error) {
      console.error(
        "Error deleting FAQ:",
        error,
      );

      showError(
        "Something went wrong while deleting FAQ",
      );
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

      render: (row) => (
        <div
          className="cell-muted"
          style={{
            maxWidth: 500,
            fontSize: 13,
          }}
        >
          {row.ans.slice(0, 100)}

          {row.ans.length > 100
            ? "..."
            : ""}
        </div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (
    row: Faq,
  ): ViewField[] => [
    {
      label: "Question",
      value: row.que,
      fullWidth: true,
    },

    {
      label: "Answer",
      value: row.ans,
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
      value:
        row.createdBy || "-",
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
      value:
        row.updatedBy || "-",
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
      value:
        row.deleteBy || "-",
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
        title="FAQ"
        section="Engagement"
      />

      {/* =====================================
          MAIN FAQ CARD
      ===================================== */}

      <div className="card-panel">

        {/* =====================================
            CARD HEADER
        ===================================== */}

        <div className="card-panel-head">
          <div>
            <h2>
              {editingId
                ? "Edit FAQ"
                : "FAQ Management"}
            </h2>

            <p>
              {loading
                ? "Loading FAQs..."
                : `${rows.length} FAQs available`}
            </p>
          </div>

          <div>
            {!showForm && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAdd}
              >
                <Icon
                  name="plus"
                  size={15}
                />

                Add FAQ
              </button>
            )}

            {showForm && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
                disabled={loading}
              >
                <Icon
                  name="x"
                  size={14}
                />

                Cancel
              </button>
            )}
          </div>
        </div>

        {/* =====================================
            FORM
        ===================================== */}

        {showForm && (
          <div className="card-panel-body">
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-grid">

                {/* =====================================
                    QUESTION
                ===================================== */}

                <Field
                  label="Question"
                  required
                  error={errors.que}
                  span2
                >
                  <input
                    value={form.que}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        que: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        que: "",
                      });
                    }}
                    placeholder="e.g. How can I create an account?"
                    disabled={loading}
                  />
                </Field>

                {/* =====================================
                    ANSWER
                ===================================== */}

                <Field
                  label="Answer"
                  required
                  error={errors.ans}
                  span2
                >
                  <textarea
                    value={form.ans}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        ans: e.target.value,
                      });

                      setErrors({
                        ...errors,
                        ans: "",
                      });
                    }}
                    placeholder="Enter the answer..."
                    style={{
                      minHeight: 160,
                    }}
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
                  <Icon
                    name={
                      editingId
                        ? "edit"
                        : "plus"
                    }
                    size={15}
                  />

                  {loading
                    ? "Saving..."
                    : editingId
                      ? "Update FAQ"
                      : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =====================================
            TABLE
        ===================================== */}

        {!loading ? (
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(row) =>
              row._id
            }
            searchPlaceholder="Search FAQs..."
            onSearch={(
              row,
              query,
            ) =>
              row.que
                .toLowerCase()
                .includes(query) ||
              row.ans
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
        ) : (
          <div className="card-panel-body">
            <p className="cell-muted">
              Loading FAQs...
            </p>
          </div>
        )}
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="FAQ Details"
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
        title="Delete FAQ?"
        message={`"${deleteTarget?.que}" will be permanently removed.`}
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={
          handleDelete
        }
      />
    </>
  );
};

export default FaqMaster;
