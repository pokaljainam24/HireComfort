import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/common/PageHeader.tsx";
import { Icon } from "../../components/common/Icon.tsx";
import { dashboardApi } from "../../api/dashboardApi.ts";
import type { AnalyticsData } from "../../types/dashboardAnalytics.ts";



const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalJobs: 0,
    totalApplications: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData = await dashboardApi.getAnalytics();
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Failed to fetch recruiter analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const stats = [
    {
      label: "Jobs Posted",
      value: loading ? "..." : analytics.totalJobs,
      icon: "briefcase",
      color: "#0d6efd",
      to: "/recruiter-panel/manage-jobs",
    },
    {
      label: "Total Applications",
      value: loading ? "..." : analytics.totalApplications,
      icon: "inbox",
      color: "#fd7e14",
      to: "/recruiter-panel/applications",
    },
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
            <p>Manage your company profile, post jobs and review applications.</p>
          </div>
          <Link to="/recruiter-panel/post-job" className="btn btn-primary btn-sm">
            <Icon name="plus" size={14} /> Post a Job
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

