import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Icon } from "@/components/common/Icon";
import { jobApi } from "@/api/jobApi";
import { applicationApi } from "@/api/applicationApi";
import { Job } from "@/types/job";
import { Application } from "@/types/application";

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      jobApi.getAll().catch(() => []),
      applicationApi.getAll().catch(() => []),
    ]).then(([j, a]) => {
      setJobs(j);
      setApplications(a);
      setLoading(false);
    });
  }, []);

  const openJobs = jobs.filter((j) => j.status === "open").length;
  const shortlisted = applications.filter((a) => a.status === "shortlisted").length;

  const stats = [
    { label: "Jobs Posted", value: jobs.length, icon: "briefcase", color: "#0d6efd", to: "/manage-jobs" },
    { label: "Open Jobs", value: openJobs, icon: "grid", color: "#198754", to: "/manage-jobs" },
    { label: "Total Applications", value: applications.length, icon: "inbox", color: "#fd7e14", to: "/applications" },
    { label: "Shortlisted", value: shortlisted, icon: "eye", color: "#6610f2", to: "/applications" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" section="Overview" />

      <div className="stat-grid">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="stat-card">
            <div className="stat-ic" style={{ background: s.color }}>
              <Icon name={s.icon} size={20} />
            </div>
            <div>
              <div className="stat-num">{loading ? "—" : s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Welcome back</h2>
            <p>Manage your company profile, post jobs and review applications.</p>
          </div>
          <Link to="/post-job" className="btn btn-primary btn-sm">
            <Icon name="plus" size={14} /> Post a Job
          </Link>
        </div>
        <div className="card-panel-body">
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
            Use the sidebar to keep your company and personal profile up to date, post new
            openings, track every application across all your jobs, and change your account
            password.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
