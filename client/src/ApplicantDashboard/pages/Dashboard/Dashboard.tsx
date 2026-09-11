import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/common/PageHeader.tsx";
import { Icon } from "../../components/common/Icon.tsx";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const http = axios.create({
  baseURL: API_BASE_URL,
});

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState([
    {
      label: "Applicant certificate",
      value: 0,
      icon: "briefcase",
      color: "#0d6efd",
      to: "/applicant-panel/applicant-certificates",
    },
    {
      label: "Applicant education",
      value: 0,
      icon: "grid",
      color: "#198754",
      to: "/applicant-panel/applicant-education",
    },
    {
      label: "Applicant project",
      value: 0,
      icon: "inbox",
      color: "#fd7e14",
      to: "/applicant-panel/applicant-project",
    },
    {
      label: "Applicant Experience",
      value: 0,
      icon: "eye",
      color: "#6610f2",
      to: "/applicant-panel/applicant-experience",
    },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get logged-in applicant
      const storedUser = localStorage.getItem(
        "applicant_panel_auth_user"
      );

      if (!storedUser) {
        console.error("Applicant user not found in localStorage");
        return;
      }

      const applicantUser = JSON.parse(storedUser);

      const applicantId =
        applicantUser?._id ||
        applicantUser?.id ||
        applicantUser?.applicantId;

      if (!applicantId) {
        console.error("Applicant ID not found");
        return;
      }

      const token = localStorage.getItem("applicant_panel_token");

      const response = await Promise.all([
        http.get(`/applicant-certificates/${applicantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        http.get(`/applicant-education/${applicantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        http.get(`/applicant-project/${applicantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        http.get(`/applicant-experience/${applicantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const certificates = response[0].data?.data || [];
      const education = response[1].data?.data || [];
      const projects = response[2].data?.data || [];
      const experience = response[3].data?.data || [];

      setStats([
        {
          label: "Applicant certificate",
          value: certificates.length,
          icon: "briefcase",
          color: "#0d6efd",
          to: "/applicant-panel/applicant-certificates",
        },
        {
          label: "Applicant education",
          value: education.length,
          icon: "grid",
          color: "#198754",
          to: "/applicant-panel/applicant-education",
        },
        {
          label: "Applicant project",
          value: projects.length,
          icon: "inbox",
          color: "#fd7e14",
          to: "/applicant-panel/applicant-project",
        },
        {
          label: "Applicant Experience",
          value: experience.length,
          icon: "eye",
          color: "#6610f2",
          to: "/applicant-panel/applicant-experience",
        },
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  return (
    <>
      <PageHeader title="Dashboard" section="Overview" />

      <div className="stat-grid">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="stat-card"
          >
            <div
              className="stat-ic"
              style={{ background: s.color }}
            >
              <Icon name={s.icon} size={20} />
            </div>

            <div>
              <div className="stat-num">
                {s.value}
              </div>

              <div className="stat-lbl">
                {s.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Welcome back</h2>
            <p>Manage your profile</p>
          </div>
        </div>

        <div className="card-panel-body">
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            Use the sidebar to keep your applicant profile up to date.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;