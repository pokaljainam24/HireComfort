import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Job } from "../../types/job.ts";
import { jobApi } from "../../api/jobApi.ts";
import type { ColumnDef } from "../../components/common/DataTable.tsx";
import { Icon } from "../../components/common/Icon.tsx";
import DataTable from "../../components/common/DataTable.tsx";
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
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const recruiterId = user?._id || user?.id || user?.recruiterId || "";

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await jobApi.getAll();
      const jobList = Array.isArray(res) ? res : res?.jobs || [];
      setJobs(jobList);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [recruiterId]);

  const handleDelete = async (id: string) => {
    try {
      await jobApi.remove(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err: any) {
      console.error("Failed to delete job", err);
    }
  };

  const columns: ColumnDef<Job>[] = [
    { header: "Job Title", render: (r) => <b>{r.title}</b> },
    { header: "Type", render: (r) => r.jobType },
    {
      header: "Applications",
      render: (r) => <span className="cell-muted">{r.applicationCount ?? 0}</span>,
    },
    { header: "Deadline", render: (r) => (r.deadline ? new Date(r.deadline).toLocaleDateString() : "—") },
    {
      header: "Status",
      render: (r) => <span className={statusBadge[r.status]}>{r.status}</span>,
    },
  ];

  return (
    <>
      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Your Job Postings</h2>
            <p>{jobs.length} job{jobs.length !== 1 ? "s" : ""} posted</p>
          </div>
          <Link to="/recruiter-panel/post-job" className="btn btn-primary btn-sm">
            <Icon name="plus" size={14} /> Post a Job
          </Link>
        </div>
        {loading ? (
          <div className="empty-state">Loading jobs...</div>
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            rows={jobs}
            rowKey={(r) => r._id}
            searchPlaceholder="Search jobs..."
            onSearch={(r, q) => r.title.toLowerCase().includes(q) || r.jobType.toLowerCase().includes(q)}
            onEdit={(r) => navigate(`/recruiter-panel/post-job/${r._id}`)}
            onDelete={(r) => setDeleteTarget(r)}
          />
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
