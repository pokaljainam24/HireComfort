import React, { useEffect, useState } from "react";
import {
  createApplicantCertificateApi,
  getApplicantCertificatesByApplicantIdApi,
  updateApplicantCertificateApi,
  deleteApplicantCertificateApi,
} from "../../api/applicantCertificateApi.ts";

import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";

import type {
  ApplicantCertificateType,
  ApplicantCertificateForm,
} from "../../types/applicantCertificate.ts";

const emptyForm: ApplicantCertificateForm = {
  applicantId: "",
  credentialId: "",
  IssuedBy: "",
  IssuedDate: new Date(),
  ExpirationDate: new Date(),
  certificationName: "",
};

const ApplicantCertificate: React.FC = () => {
  const [form, setForm] =
    useState<ApplicantCertificateForm>(emptyForm);

  const [certificates, setCertificates] = useState<
    ApplicantCertificateType[]
  >([]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState("");

  const [saved, setSaved] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const applicantId = user._id || "";

  // ---------------------------------------
  // Load certificates
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

    getApplicantCertificatesByApplicantIdApi(applicantId)
      .then((data) => {
        setCertificates(data || []);
      })
      .catch(() => {
        setFormError("Unable to load applicant certificates.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [applicantId]);

  // ---------------------------------------
  // Date helper
  // ---------------------------------------

  const getDateValue = (date?: Date) => {
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

    if (!form.certificationName.trim()) {
      e.certificationName =
        "Certification name is required";
    }

    if (!form.credentialId.trim()) {
      e.credentialId =
        "Credential ID is required";
    }

    if (!form.IssuedBy.trim()) {
      e.IssuedBy =
        "Issued by is required";
    }

    if (!form.IssuedDate) {
      e.IssuedDate =
        "Issued date is required";
    }

    if (!form.ExpirationDate) {
      e.ExpirationDate =
        "Expiration date is required";
    }

    if (
      form.IssuedDate &&
      form.ExpirationDate
    ) {
      const issuedDate = new Date(
        form.IssuedDate
      );

      const expirationDate = new Date(
        form.ExpirationDate
      );

      if (
        expirationDate.getTime() <
        issuedDate.getTime()
      ) {
        e.ExpirationDate =
          "Expiration date cannot be before issued date";
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
      setFormError("Applicant ID not found.");
      return;
    }

    setSaving(true);
    setFormError("");
    setSaved(false);

    try {
      const data: ApplicantCertificateForm = {
        applicantId,
        credentialId: form.credentialId,
        IssuedBy: form.IssuedBy,
        IssuedDate: form.IssuedDate,
        ExpirationDate: form.ExpirationDate,
        certificationName:
          form.certificationName,
      };

      if (editingId) {
        // Update existing certificate
        const updated =
          await updateApplicantCertificateApi(
            editingId,
            data
          );

        setCertificates((prev) =>
          prev.map((certificate) =>
            certificate._id === editingId
              ? updated
              : certificate
          )
        );

        setSaved(true);
      } else {
        // Create new certificate
        const created =
          await createApplicantCertificateApi(
            data
          );

        setCertificates((prev) => [
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
  // Edit certificate
  // ---------------------------------------

  const handleEdit = (
    certificate: ApplicantCertificateType
  ) => {
    setEditingId(certificate._id);

    setForm({
      applicantId: certificate.applicantId,
      credentialId: certificate.credentialId,
      IssuedBy: certificate.IssuedBy,
      IssuedDate: new Date(
        certificate.IssuedDate
      ),
      ExpirationDate: new Date(
        certificate.ExpirationDate
      ),
      certificationName:
        certificate.certificationName,
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
  // Delete certificate
  // ---------------------------------------

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplicantCertificateApi(id);

      setCertificates((prev) =>
        prev.filter(
          (certificate) =>
            certificate._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message ||
          "Unable to delete certificate."
      );
    }
  };

  return (
    <>
      <PageHeader
        title="Applicant Certificates"
        section="Certificates"
      />

      {/* -----------------------------------
          Certificate Form
      ----------------------------------- */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>
              {editingId
                ? "Edit Certificate"
                : "Add Certificate"}
            </h2>

            <p>
              Add your professional certifications
              and credentials.
            </p>
          </div>
        </div>

        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">
              Loading certificates...
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
                  Certificate saved successfully.
                </p>
              )}

              <div className="form-grid">
                {/* Certification Name */}

                <Field
                  label="Certification Name"
                  required
                  error={
                    errors.certificationName
                  }
                >
                  <input
                    value={
                      form.certificationName
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        certificationName:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. AWS Certified Developer"
                  />
                </Field>

                {/* Credential ID */}

                <Field
                  label="Credential ID"
                  required
                  error={errors.credentialId}
                >
                  <input
                    value={form.credentialId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        credentialId:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. AWS-123456"
                  />
                </Field>

                {/* Issued By */}

                <Field
                  label="Issued By"
                  required
                  error={errors.IssuedBy}
                >
                  <input
                    value={form.IssuedBy}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        IssuedBy:
                          e.target.value,
                      })
                    }
                    placeholder="e.g. Amazon Web Services"
                  />
                </Field>

                {/* Issued Date */}

                <Field
                  label="Issued Date"
                  required
                  error={errors.IssuedDate}
                >
                  <input
                    type="date"
                    value={getDateValue(
                      form.IssuedDate
                    )}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        IssuedDate: e.target
                          .value
                          ? new Date(
                              `${e.target.value}T00:00:00`
                            )
                          : new Date(),
                      })
                    }
                  />
                </Field>

                {/* Expiration Date */}

                <Field
                  label="Expiration Date"
                  required
                  error={
                    errors.ExpirationDate
                  }
                >
                  <input
                    type="date"
                    value={getDateValue(
                      form.ExpirationDate
                    )}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ExpirationDate: e.target
                          .value
                          ? new Date(
                              `${e.target.value}T00:00:00`
                            )
                          : new Date(),
                      })
                    }
                  />
                /
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
                    ? "Update Certificate"
                    : "Save Certificate"}
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
          Existing Certificates
      ----------------------------------- */}

      {!loading && (
        <div
          className="card-panel"
          style={{ marginTop: 20 }}
        >
          <div className="card-panel-head">
            <div>
              <h2>Your Certificates</h2>

              <p>
                Your added certifications and
                credentials.
              </p>
            </div>
          </div>

          <div className="card-panel-body">
            {certificates.length === 0 ? (
              <div className="empty-state">
                No certificates added yet.
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        Certification
                      </th>

                      <th>
                        Credential ID
                      </th>

                      <th>
                        Issued By
                      </th>

                      <th>
                        Issued Date
                      </th>

                      <th>
                        Expiration Date
                      </th>

                      <th>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {certificates.map(
                      (certificate) => (
                        <tr
                          key={
                            certificate._id
                          }
                        >
                          <td>
                            {
                              certificate.certificationName
                            }
                          </td>

                          <td>
                            {
                              certificate.credentialId
                            }
                          </td>

                          <td>
                            {
                              certificate.IssuedBy
                            }
                          </td>

                          <td>
                            {getDateValue(
                              certificate.IssuedDate
                            )}
                          </td>

                          <td>
                            {getDateValue(
                              certificate.ExpirationDate
                            )}
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
                                    certificate
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
                                    certificate._id
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

export default ApplicantCertificate;