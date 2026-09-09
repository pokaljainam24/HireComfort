import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Application, ApplicationStatus } from "../../types/application.ts";
import { applicationApi } from "../../api/applicationApi.ts";
import type { ColumnDef } from "../../components/common/DataTable.tsx";
import DataTable from "../../components/common/DataTable.tsx";
import PageHeader from "../../components/common/PageHeader.tsx";

const statusBadge: Record<ApplicationStatus, string> = {
  applied: "badge badge-blue",
  shortlisted: "badge badge-orange",
  interview: "badge badge-orange",
  hired: "badge badge-green",
  rejected: "badge badge-red",
};

const Applications: React.FC = () => {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    applicationApi
      .getAll()
      .then(setRows)
      .catch((err) => setError(err?.response?.data?.message || "Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  const columns: ColumnDef<Application>[] = [
    { header: "Candidate", render: (r) => <b>{r.candidateName}</b> },
    { header: "Job", render: (r) => r.jobTitle },
    { header: "Email", render: (r) => <span className="cell-muted">{r.candidateEmail}</span> },
    {
      header: "Applied On",
      render: (r) => (r.appliedAt ? new Date(r.appliedAt).toLocaleDateString() : "—"),
    },
    { header: "Status", render: (r) => <span className={statusBadge[r.status]}>{r.status}</span> },
  ];

  return (
    <>
      <PageHeader title="Applications" section="Applications" />

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
            onEdit={(r) => navigate(`/recruiter/applications/${r._id}`)}
            editIcon="eye"
            editLabel="View"
          />
        )}
      </div>
    </>
  );
};

export default Applications;
