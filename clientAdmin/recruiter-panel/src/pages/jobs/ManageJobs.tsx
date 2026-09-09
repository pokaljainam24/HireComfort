import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { Job } from "@/types/job";
import { jobApi } from "@/api/jobApi";
import { useCrudResource } from "@/api/useCrudResource";

const statusBadge: Record<Job["status"], string> = {
  open: "badge badge-green",
  closed: "badge badge-red",
  draft: "badge badge-blue",
};

const ManageJobs: React.FC = () => {
  const { rows, loading, error, remove } = useCrudResource<Job>(jobApi);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const navigate = useNavigate();

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
      <PageHeader
        title="Manage Jobs"
        section="Jobs"
        action={
          <Link to="/post-job" className="btn btn-primary btn-sm">
            <Icon name="plus" size={14} /> Post a Job
          </Link>
        }
      />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Your Job Postings</h2>
            <p>{rows.length} job{rows.length !== 1 ? "s" : ""} posted</p>
          </div>
        </div>
        {loading ? (
          <div className="empty-state">Loading jobs...</div>
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(r) => r._id}
            searchPlaceholder="Search jobs..."
            onSearch={(r, q) => r.title.toLowerCase().includes(q) || r.jobType.toLowerCase().includes(q)}
            onEdit={(r) => navigate(`/post-job/${r._id}`)}
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
          if (deleteTarget) await remove(deleteTarget._id);
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default ManageJobs;
