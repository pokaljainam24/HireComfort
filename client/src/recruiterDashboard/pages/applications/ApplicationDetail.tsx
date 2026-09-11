import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Application, ApplicationStatus } from "../../types/application.ts";
import { applicationApi } from "../../api/applicationApi.ts";
import { Icon } from "../../components/common/Icon.tsx";
import Field from "../../components/common/Field.tsx";

const statuses: ApplicationStatus[] = ["Applied", "Shortlisted", "Interview", "Hired", "Rejected"];

const ApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    applicationApi
      .getOne(id)
      .then(setApplication)
      .catch((err) => setError(err?.response?.data?.message || "Could not load this application."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!id || !application) return;
    setSaving(true);
    setSaved(false);
    try {
      const updated = await applicationApi.updateStatus(id, status);
      setApplication(updated);
      setSaved(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not update status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="card-panel">
          <div className="empty-state">Loading application...</div>
        </div>
      ) : error && !application ? (
        <div className="card-panel">
          <div className="empty-state">{error}</div>
        </div>
      ) : application ? (
        <>
          <div className="card-panel">
            <div className="card-panel-head">
              <div>
                <h2>{application.candidateName}</h2>
                <p>Applied for {application.jobTitle}</p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => navigate("/recruiter-panel/applications")}>
                <Icon name="chevronLeft" size={14} /> Back to Applications
              </button>
            </div>
            <div className="card-panel-body">
              {error && <p className="err" style={{ marginBottom: 12 }}>{error}</p>}
              {saved && (
                <p style={{ color: "var(--bs-success, #198754)", fontSize: 13, marginBottom: 12 }}>
                  Status updated.
                </p>
              )}
              <div className="form-grid">
                <Field label="Candidate Name">
                  <input value={application.candidateName} disabled />
                </Field>
                <Field label="Email">
                  <input value={application.candidateEmail} disabled />
                </Field>
                <Field label="Phone">
                  <input value={application.candidatePhone} disabled />
                </Field>
                <Field label="Applied On">
                  <input
                    value={application.appliedAt ? new Date(application.appliedAt).toLocaleString() : "—"}
                    disabled
                  />
                </Field>
                <Field label="Resume" span2>
                  {application.resumeUrl ? (
                    <a href={application.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      <Icon name="file-text" size={14} /> View Resume
                    </a>
                  ) : (
                    <span className="cell-muted">No resume uploaded</span>
                  )}
                </Field>
                {application.coverLetter && (
                  <Field label="Cover Letter" span2>
                    <textarea rows={5} value={application.coverLetter} disabled />
                  </Field>
                )}
              </div>
            </div>
          </div>

          <div className="card-panel">
            <div className="card-panel-head">
              <div>
                <h2>Update Status</h2>
                <p>Move this candidate through your hiring pipeline.</p>
              </div>
            </div>
            <div className="card-panel-body">
              <div className="form-grid">
                <Field label="Application Status">
                  <select
                    value={application.status}
                    disabled={saving}
                    onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ApplicationDetail;
