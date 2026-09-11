import React, { useEffect, useState } from "react";

import {
  createApplicantProjectApi,
  getApplicantProjectsByApplicantIdApi,
  updateApplicantProjectApi,
  deleteApplicantProjectApi,
} from "../../api/applicantProjectApi.ts";

import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";

import type {
  ApplicantProjectType,
  ApplicantProjectForm,
} from "../../types/applicantProject.ts";

const emptyForm: ApplicantProjectForm = {
  applicantId: "",
  title: "",
  description: "",
  startDate: new Date(),
  endDate: null,
  link: "",
};

const ApplicantProject: React.FC = () => {
  const [form, setForm] =
    useState<ApplicantProjectForm>(emptyForm);

  const [projects, setProjects] = useState<
    ApplicantProjectType[]
  >([]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [formError, setFormError] =
    useState("");

  const [saved, setSaved] =
    useState(false);

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
  // Load applicant projects
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

    getApplicantProjectsByApplicantIdApi(
      applicantId
    )
      .then((data) => {
        setProjects(data || []);
      })
      .catch((error) => {
        console.error(
          "Project loading error:",
          error
        );

        setFormError(
          "Unable to load applicant projects."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicantId]);

  // ---------------------------------------
  // Date helper
  // ---------------------------------------

  const getDateValue = (
    date?: Date | null
  ) => {
    if (!date) {
      return "";
    }

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "";
    }

    const year =
      d.getFullYear();

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

    // Title
    if (!form.title.trim()) {
      e.title =
        "Project title is required";
    }

    // Start Date
    if (!form.startDate) {
      e.startDate =
        "Start date is required";
    }

    // End Date
    if (
      form.endDate &&
      form.startDate
    ) {
      const startDate =
        new Date(form.startDate);

      const endDate =
        new Date(form.endDate);

      if (
        endDate.getTime() <
        startDate.getTime()
      ) {
        e.endDate =
          "End date cannot be before start date";
      }
    }

    // Link
    if (form.link?.trim()) {
      try {
        new URL(form.link.trim());
      } catch {
        e.link =
          "Please enter a valid URL";
      }
    }

    setErrors(e);

    return (
      Object.keys(e).length === 0
    );
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
      const data: ApplicantProjectForm = {
        applicantId: applicantId,

        title:
          form.title.trim(),

        description:
          form.description?.trim() || "",

        startDate:
          form.startDate,

        endDate:
          form.endDate || null,

        link:
          form.link?.trim() || "",
      };

      // -----------------------------------
      // UPDATE PROJECT
      // -----------------------------------

      if (editingId) {
        const updated =
          await updateApplicantProjectApi(
            editingId,
            data
          );

        setProjects((prev) =>
          prev.map((project) =>
            project._id === editingId
              ? updated
              : project
          )
        );

        setSaved(true);
      }

      // -----------------------------------
      // CREATE PROJECT
      // -----------------------------------

      else {
        const created =
          await createApplicantProjectApi(
            data
          );

        setProjects((prev) => [
          ...prev,
          created,
        ]);

        setSaved(true);
      }

      resetForm();
    } catch (err: any) {
      console.error(
        "Project save error:",
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

      applicantId:
        applicantId,

      startDate:
        new Date(),

      endDate:
        null,
    });

    setEditingId(null);
    setErrors({});
  };

  // ---------------------------------------
  // Edit project
  // ---------------------------------------

  const handleEdit = (
    project: ApplicantProjectType
  ) => {
    setEditingId(project._id);

    setForm({
      applicantId:
        project.applicantId,

      title:
        project.title,

      description:
        project.description || "",

      startDate:
        new Date(project.startDate),

      endDate:
        project.endDate
          ? new Date(project.endDate)
          : null,

      link:
        project.link || "",
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
  // Delete project
  // ---------------------------------------

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplicantProjectApi(
        id
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (err: any) {
      console.error(
        "Delete project error:",
        err
      );

      setFormError(
        err?.response?.data?.message ||
          "Unable to delete project."
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Applicant Projects"
        section="Project"
      />

      {/* -----------------------------------
          Project Form
      ----------------------------------- */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              {editingId
                ? "Edit Project"
                : "Add Project"}
            </h2>

            <p>
              Add your projects, achievements,
              and project links.
            </p>
          </div>
        </div>

        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">
              Loading projects...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
            >
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
                  Project saved
                  successfully.
                </p>
              )}

              <div className="form-grid">
                {/* --------------------------------
                    Project Title
                -------------------------------- */}

                <Field
                  label="Project Title"
                  required
                  error={errors.title}
                >
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. Job Portal Website"
                  />
                </Field>

                {/* --------------------------------
                    Project Link
                -------------------------------- */}

                <Field
                  label="Project Link"
                  error={errors.link}
                >
                  <input
                    type="url"
                    value={
                      form.link || ""
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        link:
                          e.target.value,
                      })
                    }
                    placeholder="https://github.com/username/project"
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
                    Leave empty if the
                    project is still
                    ongoing.
                  </small>
                </Field>

                {/* --------------------------------
                    Description
                -------------------------------- */}

                <Field
                  label="Description"
                  span2
                  error={
                    errors.description
                  }
                >
                  <textarea
                    value={
                      form.description ||
                      ""
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      })
                    }
                    placeholder="Describe your project, technologies used, your role, achievements, etc."
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
                    ? "Update Project"
                    : "Save Project"}
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
          Existing Projects
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
                Your Projects
              </h2>

              <p>
                Your added projects and
                project details.
              </p>
            </div>
          </div>

          <div className="card-panel-body">
            {projects.length === 0 ? (
              <div className="empty-state">
                No projects added yet.
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        Project
                      </th>

                      <th>
                        Start Date
                      </th>

                      <th>
                        End Date
                      </th>

                      <th>
                        Link
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
                    {projects.map(
                      (project) => (
                        <tr
                          key={
                            project._id
                          }
                        >
                          <td>
                            <strong>
                              {
                                project.title
                              }
                            </strong>
                          </td>

                          <td>
                            {getDateValue(
                              project.startDate
                            )}
                          </td>

                          <td>
                            {project.endDate
                              ? getDateValue(
                                  project.endDate
                                )
                              : "Present"}
                          </td>

                          <td>
                            {project.link ? (
                              <a
                                href={
                                  project.link
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Project
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>

                          <td>
                            <div
                              style={{
                                maxWidth: 300,
                                whiteSpace:
                                  "normal",
                              }}
                            >
                              {project.description ||
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
                                    project
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
                                    project._id
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

export default ApplicantProject;