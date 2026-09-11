import React, { useEffect, useState } from "react";
import type { Application, ApplicationStatus } from "../../types/application.ts";
import { applicationApi } from "../../api/applicationApi.ts";
import type { ColumnDef } from "../../components/common/DataTable.tsx";
import DataTable from "../../components/common/DataTable.tsx";
import ViewModal, { type ViewField } from "../../components/common/ViewModal.tsx";

const statuses: ApplicationStatus[] = ["Applied", "Shortlisted", "Interview", "Hired", "Rejected"];

const statusBadge: Record<ApplicationStatus, string> = {
  Applied: "badge badge-blue",
  Shortlisted: "badge badge-orange",
  Interview: "badge badge-orange",
  Hired: "badge badge-green",
  Rejected: "badge badge-red",
};

const Applications: React.FC = () => {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    applicationApi
      .getAll()
      .then((data) => setRows(data))
      .catch((err) => setError(err?.response?.data?.message || "Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!selectedApplication) return;
    setUpdatingStatus(true);
    try {
      const updated = await applicationApi.updateStatus(selectedApplication._id, newStatus);
      setSelectedApplication(updated);
      setRows((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const columns: ColumnDef<Application>[] = [
    { header: "Candidate", render: (r) => <b>{r.candidateName}</b> },
    { header: "Job", render: (r) => r.jobTitle },
    { header: "Email", render: (r) => <span className="cell-muted">{r.candidateEmail}</span> },
    {
      header: "Applied On",
      render: (r) => (r.appliedAt ? new Date(r.appliedAt).toLocaleDateString() : "—"),
    },
    { header: "Status", render: (r) => <span className={statusBadge[r.status] || "badge badge-blue"}>{r.status}</span> },
  ];

  const modalFields: ViewField[] = selectedApplication
    ? [
      { label: "Candidate Name", value: selectedApplication.candidateName },
      { label: "Email", value: selectedApplication.candidateEmail },
      { label: "Phone", value: selectedApplication.candidatePhone },
      {
        label: "Applied On",
        value: selectedApplication.appliedAt
          ? new Date(selectedApplication.appliedAt).toLocaleString()
          : "—",
      },
      {
        label: "Resume",
        fullWidth: true,
        value: selectedApplication.resumeUrl ? (
          <a
            href={selectedApplication.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            View Resume
          </a>
        ) : (
          <span className="cell-muted">No resume uploaded</span>
        ),
      },
      ...(selectedApplication.coverLetter
        ? [
          {
            label: "Cover Letter / Notes",
            fullWidth: true,
            value: (
              <div style={{ whiteSpace: "pre-wrap", background: "var(--surface, #f8f9fa)", padding: 12, borderRadius: 8, border: "1px solid var(--border-c, #eaecf0)" }}>
                {selectedApplication.coverLetter}
              </div>
            ),
          },
        ]
        : []),
      {
        label: "Update Application Status",
        fullWidth: true,
        value: (
          <select
            value={selectedApplication.status}
            disabled={updatingStatus}
            onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
            className="form-select"
            style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border-c, #d0d5dd)" }}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ),
      },
    ]
    : [];

  return (
    <>
      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Applications</h2>
            <p>Every candidate who applied across all of your job postings</p>
          </div>
        </div>
        {loading ? (
          <div className="empty-state">Loading applications...</div>
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(r) => r._id}
            searchPlaceholder="Search by candidate or job..."
            onSearch={(r, q) =>
              r.candidateName.toLowerCase().includes(q) ||
              r.jobTitle.toLowerCase().includes(q) ||
              r.candidateEmail.toLowerCase().includes(q)
            }
            onEdit={(r) => setSelectedApplication(r)}
            editIcon="eye"
            editLabel="View"
          />
        )}
      </div>

      {selectedApplication && (
        <ViewModal
          open={!!selectedApplication}
          title={selectedApplication.candidateName}
          fields={modalFields}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </>
  );
};

export default Applications;
