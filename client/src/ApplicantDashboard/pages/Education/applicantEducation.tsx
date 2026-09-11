import React, { useEffect, useState } from "react";

import {
  createApplicantEducationApi,
  getApplicantEducationByApplicantIdApi,
  updateApplicantEducationApi,
  deleteApplicantEducationApi,
} from "../../api/applicantEducationApi.ts"

import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";

import type {
  ApplicantEducationType,
  ApplicantEducationForm,
} from "../../types/applicantEducation.ts";

const emptyForm: ApplicantEducationForm = {
  applicantId: "",
  education: "",
  passingYear: new Date().getFullYear(),
  percentageOrCGPA: 0,
  isActive: true,
  createdBy: "",
  updatedBy: "",
};

const ApplicantEducation: React.FC = () => {
  const [form, setForm] =
    useState<ApplicantEducationForm>(emptyForm);

  const [educations, setEducations] = useState<
    ApplicantEducationType[]
  >([]);

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [errors, setErrors] = useState<Record<string, string>>(
    {}
  );

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState("");

  const [saved, setSaved] = useState(false);

  // ---------------------------------------
  // Get logged-in applicant
  // ---------------------------------------

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const applicantId = user._id || user.id || "";

  // ---------------------------------------
  // Load education
  // ---------------------------------------

  useEffect(() => {
    if (!applicantId) {
      setLoading(false);
      setFormError("Applicant ID is not found.");
      return;
    }

    setForm({
      ...emptyForm,
      applicantId,
    });

    getApplicantEducationByApplicantIdApi(applicantId)
      .then((data) => {
        setEducations(data || []);
      })
      .catch(() => {
        setFormError(
          "Unable to load applicant education."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicantId]);

  // ---------------------------------------
  // Validation
  // ---------------------------------------

  const validate = () => {
    const e: Record<string, string> = {};

    // Education
    if (!form.education.trim()) {
      e.education = "Education is required";
    }

    // Passing Year
    const currentYear = new Date().getFullYear();

    if (!form.passingYear) {
      e.passingYear = "Passing year is required";
    } else if (
      form.passingYear < 1950 ||
      form.passingYear > currentYear
    ) {
      e.passingYear = "Enter a valid passing year";
    }

    // Percentage / CGPA
    if (
      form.percentageOrCGPA === undefined ||
      form.percentageOrCGPA === null ||
      Number.isNaN(form.percentageOrCGPA)
    ) {
      e.percentageOrCGPA =
        "Percentage or CGPA is required";
    } else if (form.percentageOrCGPA < 0) {
      e.percentageOrCGPA =
        "Percentage or CGPA cannot be negative";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // ---------------------------------------
  // Submit
  // ---------------------------------------

  const handleSubmit = async (
    ev: React.FormEvent
  ) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    if (!applicantId) {
      setFormError("Applicant ID not found.");
      return;
    }

    setSaving(true);
    setFormError("");
    setSaved(false);

    try {
      const data: ApplicantEducationForm = {
        applicantId,
        education: form.education,
        passingYear: Number(form.passingYear),
        percentageOrCGPA: Number(
          form.percentageOrCGPA
        ),
        isActive: form.isActive ?? true,
        createdBy: form.createdBy,
        updatedBy: form.updatedBy,
      };

      if (editingId) {
        // ---------------------------------
        // Update education
        // ---------------------------------

        const updated =
          await updateApplicantEducationApi(
            editingId,
            data
          );

        setEducations((prev) =>
          prev.map((education) =>
            education._id === editingId
              ? updated
              : education
          )
        );

        setSaved(true);
      } else {
        // ---------------------------------
        // Create education
        // ---------------------------------

        const created =
          await createApplicantEducationApi(data);

        setEducations((prev) => [
          ...prev,
          created,
        ]);

        setSaved(true);
      }

      resetForm();
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------
  // Reset form
  // ---------------------------------------

  const resetForm = () => {
    setForm({
      ...emptyForm,
      applicantId,
    });

    setEditingId(null);
    setErrors({});
  };

  // ---------------------------------------
  // Edit education
  // ---------------------------------------

  const handleEdit = (
    education: ApplicantEducationType
  ) => {
    setEditingId(education._id);

    setForm({
      applicantId: education.applicantId,
      education: education.education,
      passingYear: education.passingYear,
      percentageOrCGPA:
        education.percentageOrCGPA,
      isActive: education.isActive,
      createdBy: education.createdBy || "",
      updatedBy: education.updatedBy || "",
    });

    setErrors({});
    setSaved(false);
    setFormError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ---------------------------------------
  // Delete education
  // ---------------------------------------

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplicantEducationApi(id);

      setEducations((prev) =>
        prev.filter(
          (education) =>
            education._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message ||
          "Unable to delete education."
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Applicant Education"
        section="Education"
      />

      {/* -----------------------------------
          Education Form
      ----------------------------------- */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              {editingId
                ? "Edit Education"
                : "Add Education"}
            </h2>

            <p>
              Add your educational qualifications
              and academic details.
            </p>
          </div>
        </div>

        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">
              Loading education...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formError && (
                <p
                  className="err"
                  style={{
                    marginBottom: 12,
                  }}
                >
                  {formError}
                </p>
              )}

              {saved && (
                <p
                  style={{
                    color:
                      "var(--bs-success, #198754)",
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  Education saved successfully.
                </p>
              )}

              <div className="form-grid">
                {/* Education */}

                <Field
                  label="Education"
                  required
                  error={errors.education}
                >
                  <input
                    value={form.education}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        education:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. B.Tech Computer Science"
                  />
                </Field>

                {/* Passing Year */}

                <Field
                  label="Passing Year"
                  required
                  error={errors.passingYear}
                >
                  <input
                    type="number"
                    value={
                      form.passingYear || ""
                    }
                    min="1950"
                    max={new Date().getFullYear()}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        passingYear:
                          Number(
                            e.target.value
                          ),
                      })
                    }
                    placeholder="e.g. 2024"
                  />
                </Field>

                {/* Percentage / CGPA */}

                <Field
                  label="Percentage / CGPA"
                  required
                  error={
                    errors.percentageOrCGPA
                  }
                >
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={
                      form.percentageOrCGPA ??
                      ""
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        percentageOrCGPA:
                          Number(
                            e.target.value
                          ),
                      })
                    }
                    placeholder="e.g. 85 or 8.5"
                  />
                </Field>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Education"
                    : "Save Education"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn"
                    onClick={resetForm}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* -----------------------------------
          Existing Education
      ----------------------------------- */}

      {!loading && (
        <div
          className="card-panel"
          style={{ marginTop: 20 }}
        >
          <div className="card-panel-head">
            <div>
              <h2>Your Education</h2>

              <p>
                Your added educational
                qualifications.
              </p>
            </div>
          </div>

          <div className="card-panel-body">
            {educations.length === 0 ? (
              <div className="empty-state">
                No education added yet.
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        Education
                      </th>

                      <th>
                        Passing Year
                      </th>

                      <th>
                        Percentage / CGPA
                      </th>

                      <th>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {educations.map(
                      (education) => (
                        <tr
                          key={
                            education._id
                          }
                        >
                          <td>
                            {
                              education.education
                            }
                          </td>

                          <td>
                            {
                              education.passingYear
                            }
                          </td>

                          <td>
                            {
                              education.percentageOrCGPA
                            }
                          </td>

                          <td>
                            <div
                              style={{
                                display:
                                  "flex",
                                gap: 8,
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  handleEdit(
                                    education
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                  handleDelete(
                                    education._id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicantEducation;