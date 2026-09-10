import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import PageHeader from "../../components/common/PageHeader";
import { Icon } from "../../components/common/Icon";

import { getApplicantsApi } from "../../api/applicantProfileApi";
import { getApplicantEducationApi } from "../../api/applicantEducationApi";
import { getAllApplicantProjectsApi } from "../../api/applicantProjectApi";
import { getAllApplicantExperienceApi } from "../../api/applicantExperienceApi";
import { getAllApplicantCertificatesApi } from "../../api/applicantCertificateApi";

const Dashboard: React.FC = () => {
  const [applicantCount, setApplicantCount] = useState(0);
  const [educationCount, setEducationCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);

  // =====================================
  // Fetch Dashboard Counts
  // =====================================

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const [
          applicants,
          education,
          experience,
          projects,
          certificates,
        ] = await Promise.all([
          getApplicantsApi(1, 10000),
          getApplicantEducationApi(),
          getAllApplicantExperienceApi(),
          getAllApplicantProjectsApi(),
          getAllApplicantCertificatesApi(),
        ]);

        /*
         * getApplicantsApi returns:
         * {
         *   applicants: [...],
         *   pagination: {
         *     total: number
         *   }
         * }
         */

       setApplicantCount(applicants.length);

        setEducationCount(education.length);
        setExperienceCount(experience.length);
        setProjectCount(projects.length);
        setCertificateCount(certificates.length);
      } catch (error) {
        console.error(
          "Failed to fetch applicant dashboard counts:",
          error
        );
      }
    };

    fetchDashboardCounts();
  }, []);

  // =====================================
  // Dashboard Stats
  // =====================================

  const stats = [
    {
      label: "Applicants",
      value: applicantCount,
      icon: "user",
      color: "#0d6efd",
      to: "applicant-profile",
    },
    {
      label: "Education",
      value: educationCount,
      icon: "education",
      color: "#6610f2",
      to: "applicant-education",
    },
    {
      label: "Experience",
      value: experienceCount,
      icon: "briefcase",
      color: "#fd7e14",
      to: "applicant-experience",
    },
    {
      label: "Projects",
      value: projectCount,
      icon: "briefcase",
      color: "#198754",
      to: "applicant-project",
    },
    {
      label: "Certificates",
      value: certificateCount,
      icon: "file-text",
      color: "#d63384",
      to: "applicant-certificates",
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        section="Overview"
      />

      {/* =====================================
          Dashboard Stats
      ===================================== */}

      <div className="stat-grid">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="stat-card"
          >
            <div
              className="stat-ic"
              style={{
                background: s.color,
              }}
            >
              <Icon
                name={s.icon}
                size={20}
              />
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

      {/* =====================================
          Welcome Section
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Welcome back</h2>

            <p>
              Use the sidebar to manage applicants
              and their information.
            </p>
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
            Each menu item on the left maps to an
            applicant section — Applicant Profile,
            Education, Certificates, Experience and
            Projects — with its own dedicated form
            and list.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;