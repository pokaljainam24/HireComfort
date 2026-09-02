import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Icon } from "@/components/common/Icon";

const stats = [
  { label: "Countries", value: 3, icon: "globe", color: "#0d6efd", to: "/country-master" },
  { label: "States", value: 3, icon: "map", color: "#6610f2", to: "/state-master" },
  { label: "Cities", value: 3, icon: "pin", color: "#d63384", to: "/city-master" },
  { label: "Job Categories", value: 3, icon: "briefcase", color: "#fd7e14", to: "/job-category" },
  { label: "Sub Categories", value: 3, icon: "layers", color: "#198754", to: "/job-sub-category" },
  { label: "Blogs", value: 2, icon: "file-text", color: "#0dcaf0", to: "/blogs" },
  { label: "CMS Sections", value: 3, icon: "layout", color: "#6c757d", to: "/cms" },
  { label: "Newsletter Subs", value: 3, icon: "mail", color: "#20c997", to: "/newsletter" },
  { label: "Contact Queries", value: 2, icon: "message", color: "#dc3545", to: "/contact" },
];

const Dashboard: React.FC = () => (
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
          <p>Use the sidebar to manage every master listed in your data model.</p>
        </div>
      </div>
      <div className="card-panel-body">
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
          Each menu item on the left maps to one master from your data sheet — Country, State, City,
          Job Category, Job Sub Category, Newsletter, Blogs, CMS and Contact — with its own dedicated
          form and list, matching the fields you defined.
        </p>
      </div>
    </div>
  </>
);

export default Dashboard;
