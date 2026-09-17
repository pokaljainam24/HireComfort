import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Job } from "../../types/job.ts";
import { jobApi } from "../../api/jobApi.ts";
import type { ColumnDef } from "../../components/common/DataTable.tsx";
import { Icon } from "../../components/common/Icon.tsx";
import ConfirmModal from "../../components/common/ConfirmModal.tsx";

const statusBadge: Record<Job["status"], string> = {
  open: "badge badge-green",
  closed: "badge badge-red",
  draft: "badge badge-blue",
};

const ManageJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);

  // Pagination & Search State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const limit = 10;

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      let params: { page?: number; limit?: number; search?: string } = {
        page,
        limit,
      };
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const res = await jobApi.getAllJobsByRecruiter(params);
      setJobs(res.jobs);
      setTotalJobs(res.totalJobs);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(handler);
  }, [page, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await jobApi.remove(id);
      fetchJobs();
    } catch (err: any) {
      console.error("Failed to delete job", err);
    }
  };

  const columns: ColumnDef<Job>[] = [
    { header: "Job Title", render: (r) => <b>{r.title}</b> },
    { header: "Type", render: (r) => r.jobType },
    {
      header: "Applications",
      render: (r) => (
        <span className="cell-muted">{r.applicationCount ?? 0}</span>
      ),
    },
    {
      header: "Deadline",
      render: (r) =>
        r.deadline ? new Date(r.deadline).toLocaleDateString() : "—",
    },
    {
      header: "Status",
      render: (r) => (
        <span className={statusBadge[r.status] || "badge"}>{r.status}</span>
      ),
    },
  ];

  return (
    <>
      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Your Job Postings</h2>
            <p>
              {totalJobs} job{totalJobs !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            to="/recruiter-panel/post-job"
            className="btn btn-primary btn-sm"
          >
            <Icon name="plus" size={14} /> Post a Job
          </Link>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <Icon name="search" size={16} />
            <input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <span className="cell-muted" style={{ fontSize: 12.5 }}>
            {totalJobs} record{totalJobs !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="empty-state">Loading jobs...</div>
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : (
          <>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th key={c.header} style={{ width: c.width }}>
                        {c.header}
                      </th>
                    ))}
                    <th style={{ width: 90, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((row) => (
                    <tr key={row._id}>
                      {columns.map((c) => (
                        <td key={c.header}>{c.render(row)}</td>
                      ))}
                      <td>
                        <div className="cell-actions">
                          <button
                            className="icon-btn btn-sm"
                            style={{ width: 32, height: 32 }}
                            onClick={() =>
                              navigate(`/recruiter-panel/post-job/${row._id}`)
                            }
                            aria-label="Edit"
                          >
                            <Icon name="edit" size={15} />
                          </button>
                          <button
                            className="icon-btn btn-sm"
                            style={{
                              width: 32,
                              height: 32,
                              color: "var(--bs-danger)",
                            }}
                            onClick={() => setDeleteTarget(row)}
                            aria-label="Delete"
                          >
                            <Icon name="trash" size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {jobs.length === 0 && (
                <div className="empty-state">No jobs found.</div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination-row">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="pager-btns">
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Icon name="chevronLeft" size={14} />
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <Icon name="chevronRight" size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete job?"
        message={`"${deleteTarget?.title}" will be permanently removed along with its listing.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (deleteTarget) await handleDelete(deleteTarget._id);
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default ManageJobs;
