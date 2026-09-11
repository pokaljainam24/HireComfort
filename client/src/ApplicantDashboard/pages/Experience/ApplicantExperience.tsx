import React, { useEffect, useState } from "react";

import {
  createApplicantExperienceApi,
  getApplicantExperienceByApplicantIdApi,
  updateApplicantExperienceApi,
  deleteApplicantExperienceApi,
} from "../../api/applicantExperienceApi.ts";

import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";

import type {
  ApplicantExperienceType,
  ApplicantExperienceForm,
} from "../../types/applicantExperience.ts";

const emptyForm: ApplicantExperienceForm = {
  applicantId: "",
  companyName: "",
  role: "",
  startDate: new Date(),
  endDate: null,
  description: "",
};

const ApplicantExperience: React.FC = () => {
  const [form, setForm] =
    useState<ApplicantExperienceForm>(emptyForm);

  const [experiences, setExperiences] = useState<
    ApplicantExperienceType[]
  >([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState("");

  const [saved, setSaved] = useState(false);

  // ---------------------------------------
  // Get logged-in applicant
  // ---------------------------------------

  let user: any = {};

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
  } catch {
    user = {};
  }

  const applicantId =
    user._id || user.id || "";

  // ---------------------------------------
  // Load applicant experiences
  // ---------------------------------------

  useEffect(() => {
    if (!applicantId) {
      setLoading(false);
      setFormError(
        "Applicant ID is not found. Please login again."
      );
      return;
    }

    setForm({
      ...emptyForm,
      applicantId: applicantId,
    });

    getApplicantExperienceByApplicantIdApi(
      applicantId
    )
      .then((data) => {
        setExperiences(data || []);
      })
      .catch((error) => {
        console.error(
          "Experience loading error:",
          error
        );

        setFormError(
          "Unable to load applicant experience."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicantId]);

  // ---------------------------------------
  // Date helper
  // ---------------------------------------

  const getDateValue = (date?: Date | null) => {
    if (!date) {
      return "";
    }

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "";
    }

    const year = d.getFullYear();

    const month = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      d.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // ---------------------------------------
  // Validation
  // ---------------------------------------

  const validate = () => {
    const e: Record<string, string> = {};

    // Company Name
    if (!form.companyName.trim()) {
      e.companyName =
        "Company name is required";
    }

    // Role
    if (!form.role.trim()) {
      e.role =
        "Job role is required";
    }

    // Start Date
    if (!form.startDate) {
      e.startDate =
        "Start date is required";
    }

    // End Date
    if (form.endDate && form.startDate) {
      const startDate = new Date(
        form.startDate
      );

      const endDate = new Date(
        form.endDate
      );

      if (
        endDate.getTime() <
        startDate.getTime()
      ) {
        e.endDate =
          "End date cannot be before start date";
      }
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
      setFormError(
        "Applicant ID not found. Please login again."
      );
      return;
    }

    setSaving(true);
    setFormError("");
    setSaved(false);

    try {
      const data: ApplicantExperienceForm = {
        applicantId: applicantId,
        companyName:
          form.companyName.trim(),
        role: form.role.trim(),
        startDate: form.startDate,
        endDate: form.endDate || null,
        description:
          form.description?.trim() || "",
      };

      // -----------------------------------
      // UPDATE EXISTING EXPERIENCE
      // -----------------------------------

      if (editingId) {
        const updated =
          await updateApplicantExperienceApi(
            editingId,
            data
          );

        setExperiences((prev) =>
          prev.map((experience) =>
            experience._id === editingId
              ? updated
              : experience
          )
        );

        setSaved(true);
      }

      // -----------------------------------
      // CREATE NEW EXPERIENCE
      // -----------------------------------

      else {
        const created =
          await createApplicantExperienceApi(
            data
          );

        setExperiences((prev) => [
          ...prev,
          created,
        ]);

        setSaved(true);
      }

      resetForm();
    } catch (err: any) {
      console.error(
        "Experience save error:",
        err
      );

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
      applicantId: applicantId,
      startDate: new Date(),
      endDate: null,
    });

    setEditingId(null);
    setErrors({});
  };

  // ---------------------------------------
  // Edit experience
  // ---------------------------------------

  const handleEdit = (
    experience: ApplicantExperienceType
  ) => {
    setEditingId(experience._id);

    setForm({
      applicantId:
        experience.applicantId,

      companyName:
        experience.companyName,

      role:
        experience.role,

      startDate:
        new Date(experience.startDate),

      endDate:
        experience.endDate
          ? new Date(experience.endDate)
          : null,

      description:
        experience.description || "",
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
  // Delete experience
  // ---------------------------------------

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this experience?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplicantExperienceApi(id);

      setExperiences((prev) =>
        prev.filter(
          (experience) =>
            experience._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (err: any) {
      console.error(
        "Delete experience error:",
        err
      );

      setFormError(
        err?.response?.data?.message ||
          "Unable to delete experience."
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Applicant Experience"
        section="Experience"
      />

      {/* -----------------------------------
          Experience Form
      ----------------------------------- */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              {editingId
                ? "Edit Experience"
                : "Add Experience"}
            </h2>

            <p>
              Add your professional work
              experience and employment
              details.
            </p>
          </div>
        </div>

        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">
              Loading experience...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Error */}

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

              {/* Success */}

              {saved && (
                <p
                  style={{
                    color:
                      "var(--bs-success, #198754)",
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  Experience saved
                  successfully.
                </p>
              )}

              <div className="form-grid">
                {/* --------------------------------
                    Company Name
                -------------------------------- */}

                <Field
                  label="Company Name"
                  required
                  error={errors.companyName}
                >
                  <input
                    type="text"
                    value={
                      form.companyName
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        companyName:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. TCS"
                  />
                </Field>

                {/* --------------------------------
                    Role
                -------------------------------- */}

                <Field
                  label="Role"
                  required
                  error={errors.role}
                >
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. Software Developer"
                  />
                </Field>

                {/* --------------------------------
                    Start Date
                -------------------------------- */}

                <Field
                  label="Start Date"
                  required
                  error={errors.startDate}
                >
                  <input
                    type="date"
                    value={getDateValue(
                      form.startDate
                    )}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        startDate:
                          e.target.value
                            ? new Date(
                                `${e.target.value}T00:00:00`
                              )
                            : new Date(),
                      })
                    }
                  />
                </Field>

                {/* --------------------------------
                    End Date
                -------------------------------- */}

                <Field
                  label="End Date"
                  error={errors.endDate}
                >
                  <input
                    type="date"
                    value={getDateValue(
                      form.endDate
                    )}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        endDate:
                          e.target.value
                            ? new Date(
                                `${e.target.value}T00:00:00`
                              )
                            : null,
                      })
                    }
                  />

                  <small
                    style={{
                      display: "block",
                      marginTop: 6,
                      color: "#6c757d",
                      fontSize: 12,
                    }}
                  >
                    Leave empty if you
                    currently work here.
                  </small>
                </Field>

                {/* --------------------------------
                    Description
                -------------------------------- */}

                <Field
                  label="Description"
                  span2
                  error={errors.description}
                >
                  <textarea
                    value={
                      form.description || ""
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      })
                    }
                    placeholder="Describe your responsibilities, achievements, technologies used, etc."
                    rows={5}
                  />
                </Field>
              </div>

              {/* --------------------------------
                  Buttons
              -------------------------------- */}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Experience"
                    : "Save Experience"}
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
          Existing Experiences
      ----------------------------------- */}

      {!loading && (
        <div
          className="card-panel"
          style={{
            marginTop: 20,
          }}
        >
          <div className="card-panel-head">
            <div>
              <h2>
                Your Experience
              </h2>

              <p>
                Your added professional
                experience.
              </p>
            </div>
          </div>

          <div className="card-panel-body">
            {experiences.length === 0 ? (
              <div className="empty-state">
                No experience added yet.
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        Company
                      </th>

                      <th>
                        Role
                      </th>

                      <th>
                        Start Date
                      </th>

                      <th>
                        End Date
                      </th>

                      <th>
                        Description
                      </th>

                      <th>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {experiences.map(
                      (experience) => (
                        <tr
                          key={
                            experience._id
                          }
                        >
                          <td>
                            {
                              experience.companyName
                            }
                          </td>

                          <td>
                            {
                              experience.role
                            }
                          </td>

                          <td>
                            {getDateValue(
                              experience.startDate
                            )}
                          </td>

                          <td>
                            {experience.endDate
                              ? getDateValue(
                                  experience.endDate
                                )
                              : "Present"}
                          </td>

                          <td>
                            <div
                              style={{
                                maxWidth: 300,
                                whiteSpace:
                                  "normal",
                              }}
                            >
                              {experience.description ||
                                "-"}
                            </div>
                          </td>

                          <td>
                            <div
                              style={{
                                display:
                                  "flex",
                                gap: 8,
                              }}
                            >
                              {/* Edit */}

                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  handleEdit(
                                    experience
                                  )
                                }
                              >
                                Edit
                              </button>

                              {/* Delete */}

                              <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                  handleDelete(
                                    experience._id
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

export default ApplicantExperience;