import React, { useEffect, useState } from "react";
import type {
  Application,
  ApplicationStatus,
} from "../../types/application.ts";
import { applicationApi } from "../../api/applicationApi.ts";
import type { ColumnDef } from "../../components/common/DataTable.tsx";
import DataTable from "../../components/common/DataTable.tsx";
import ViewModal, {
  type ViewField,
} from "../../components/common/ViewModal.tsx";

// ============================================
// Get number of rounds from JobMaster
// ============================================
const getNoOfRounds = (application: Application): number => {
  if (
    typeof application.jobId === "object" &&
    application.jobId !== null
  ) {
    return application.jobId.noOfRounds || 0;
  }

  return 0;
};

const getJobTitle = (application: Application): string => {
  if (
    typeof application.jobId === "object" &&
    application.jobId !== null
  ) {
    return application.jobId.title || "";
  }

  return application.jobTitle || "";
};

// ============================================
// Generate statuses dynamically
// ============================================
const getStatuses = (application: Application): string[] => {
  const noOfRounds = getNoOfRounds(application);

  return [
    "Viewed",
    "Shortlisted",

    ...Array.from(
      { length: noOfRounds },
      (_, index) => `Round ${index + 1}`
    ),

    "Hired",
    "Rejected",
  ];
};

const statusBadge: Record<string, string> = {
  Viewed: "badge badge-blue",
  Shortlisted: "badge badge-orange",
  Hired: "badge badge-green",
  Rejected: "badge badge-red",
};

const Applications: React.FC = () => {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    applicationApi
      .getAll()
      .then((data) => setRows(data))
      .catch((err) =>
        setError(
          err?.response?.data?.message ||
          "Failed to load applications"
        )
      )
      .finally(() => setLoading(false));
  }, []);

  
const handleStatusChange = async (newStatus: string) => {
  if (!selectedApplication) return;

  setUpdatingStatus(true);

  try {
    let rejectedAtRound: number | null = null;

    // If recruiter selects Rejected, determine the round
    if (newStatus === "Rejected") {
      const currentStatus =
        selectedApplication.applicationStatus;

      const match = currentStatus.match(/^Round (\d+)$/);

      if (match) {
        rejectedAtRound = Number(match[1]);
      } else {
        // If rejected before reaching an interview round
        rejectedAtRound = null;
      }
    }

    const updated = await applicationApi.updateStatus(
      selectedApplication._id,
      newStatus as ApplicationStatus,
      rejectedAtRound
    );

    setSelectedApplication(updated);

    setRows((prev) =>
      prev.map((item) =>
        item._id === updated._id
          ? updated
          : item
      )
    );
  } catch (err) {
    console.error(err);
  } finally {
    setUpdatingStatus(false);
  }
};



  const columns: ColumnDef<Application>[] = [
    {
      header: "Candidate",
      render: (r) => <b>{r.candidateName}</b>,
    },
    {
      header: "Job",
      render: (r) =>getJobTitle(r),
    },
    {
      header: "Email",
      render: (r) => (
        <span className="cell-muted">
          {r.candidateEmail}
        </span>
      ),
    },
    {
      header: "Applied On",
      render: (r) =>
        r.appliedAt
          ? new Date(
            r.appliedAt
          ).toLocaleDateString()
          : "—",
    },
    {
      header: "Status",
      render: (r) => (
        <span
          className={
            statusBadge[r.applicationStatus] ||
            "badge badge-blue"
          }
        >
          {r.applicationStatus}
        </span>
      ),
    },
  ];

  const modalFields: ViewField[] =
    selectedApplication
      ? [
        {
          label: "Candidate Name",
          value:
            selectedApplication.candidateName,
        },

        {
          label: "Email",
          value:
            selectedApplication.candidateEmail,
        },

        {
          label: "Phone",
          value:
            selectedApplication.candidatePhone,
        },

        {
          label: "Applied On",
          value:
            selectedApplication.appliedAt
              ? new Date(
                selectedApplication.appliedAt
              ).toLocaleString()
              : "—",
        },

        // ============================================
        // DYNAMIC APPLICATION STATUS
        // ============================================
        {
          label: "Update Application Status",
          fullWidth: true,
          value: (
            <select
              value={selectedApplication.applicationStatus}
              disabled={updatingStatus}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value
                )
              }
              className="form-select"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border:
                  "1px solid var(--border-c, #d0d5dd)",
              }}
            >
              {getStatuses(
                selectedApplication
              ).map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          ),
        },

        // ============================================
        // RESUME
        // ============================================
        {
          label: "Resume",
          fullWidth: true,
          value:
            selectedApplication.resumeUrl ? (
              <a
                href={
                  selectedApplication.resumeUrl
                }
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
              >
                View Resume
              </a>
            ) : (
              <span className="cell-muted">
                No resume uploaded
              </span>
            ),
        },

        // ============================================
        // COVER LETTER
        // ============================================
        ...(selectedApplication.coverLetter
          ? [
            {
              label:
                "Cover Letter / Notes",
              fullWidth: true,
              value: (
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    background:
                      "var(--surface, #f8f9fa)",
                    padding: 12,
                    borderRadius: 8,
                    border:
                      "1px solid var(--border-c, #eaecf0)",
                  }}
                >
                  {
                    selectedApplication.coverLetter
                  }
                </div>
              ),
            },
          ]
          : []),
      ]
      : [];

  return (
    <>
      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Applications</h2>

            <p>
              Every candidate who applied across
              all of your job postings
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            Loading applications...
          </div>
        ) : error ? (
          <div className="empty-state">
            {error}
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(r) => r._id}
            searchPlaceholder="Search by candidate or job..."
            onSearch={(r, q) =>
              r.candidateName
                .toLowerCase()
                .includes(q) ||
              getJobTitle(r).toLowerCase().includes(q) ||
              r.candidateEmail
                .toLowerCase()
                .includes(q)
            }
            onEdit={(r) =>
              setSelectedApplication(r)
            }
            editIcon="eye"
            editLabel="View"
          />
        )}
      </div>

      {selectedApplication && (
        <ViewModal
          open={!!selectedApplication}
          title={
            selectedApplication.candidateName
          }
          fields={modalFields}
          onClose={() =>
            setSelectedApplication(null)
          }
        />
      )}
    </>
  );
};

export default Applications;
