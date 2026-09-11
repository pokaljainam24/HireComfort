import React from "react";
import { Link } from "react-router";
import PageHeader from "../../components/common/PageHeader.tsx";
import { Icon } from "../../components/common/Icon.tsx";

// =====================================
// STATIC DASHBOARD DATA
// (Not fetched from any API yet — wire this
// up to jobApi / applicationApi once the
// backend endpoints are ready.)
// =====================================
const stats = [
  { label: "Applicant certificate", value: 0, icon: "briefcase", color: "#0d6efd", to: "/applicant-panel/applicant-certificates" },
  { label: "Applicant education", value: 0, icon: "grid", color: "#198754", to: "/applicant-panel/applicant-education" },
  { label: "Applicant project", value: 0, icon: "inbox", color: "#fd7e14", to: "/applicant-panel/applicant-project" },
  { label: "Applicant Experience", value: 0, icon: "eye", color: "#6610f2", to: "/applicant-panel/applicant-experience" },
];

const Dashboard: React.FC = () => {
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
              <div className="stat-num">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Welcome back</h2>
            <p>Manage your profile, post jobs and review applications.</p>
          </div>
          <Link to="/applicant-panel/" className="btn btn-primary btn-sm">
            <Icon name="plus" size={14} /> Post a Job
          </Link>
        </div>
        <div className="card-panel-body">
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
            Use the sidebar to keep your applicant personal profile up to date,
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
