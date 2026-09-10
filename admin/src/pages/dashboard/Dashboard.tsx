import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import PageHeader from "@/components/common/PageHeader";
import { Icon } from "@/components/common/Icon";

import { getCountries } from "@/api/CountryApi";
import { getStates } from "@/api/stateApi";
import { getCities } from "@/api/CityApi";
import { getJobCategories } from "@/api/jobCategoryApi";
import { getJobSubCategories } from "@/api/jobSubCategoryApi";
import { getBlogs } from "@/api/blogApi";
import { getCms } from "@/api/cmsApi";
import { getVisitorCount } from "@/api/VisitorApi";

const Dashboard: React.FC = () => {
  const [countryCount, setCountryCount] = useState(0);
  const [stateCount, setStateCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);
  const [jobCategoryCount, setJobCategoryCount] = useState(0);
  const [jobSubCategoryCount, setJobSubCategoryCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [cmsSectionCount, setCmsSectionCount] = useState(0);
  const [newsletterCount, setNewsletterCount] = useState(0);
  const [contactQueryCount, setContactQueryCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);

  // =====================================
  // Fetch Dashboard Counts
  // =====================================

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const [
          countries,
          states,
          cities,
          jobCategories,
          jobSubCategories,
          blogs,
          cmsSections,
          visitors,
        ] = await Promise.all([
          getCountries(),
          getStates(),
          getCities(),
          getJobCategories(),
          getJobSubCategories(),
          getBlogs(),
          getCms(),
          getVisitorCount(),
        ]);

        setCountryCount(countries.length);
        setStateCount(states.length);
        setCityCount(cities.length);
        setJobCategoryCount(jobCategories.length);
        setJobSubCategoryCount(jobSubCategories.length);
        setBlogCount(blogs.length);
        setCmsSectionCount(cmsSections.length);

        // Temporary values as in your existing dashboard
        setNewsletterCount(3);
        setContactQueryCount(2);

        // Visitor count from backend
        setVisitorCount(visitors);
      } catch (error) {
        console.error(
          "Failed to fetch dashboard counts:",
          error,
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
      label: "Countries",
      value: countryCount,
      icon: "globe",
      color: "#0d6efd",
      to: "/country-master",
    },
    {
      label: "States",
      value: stateCount,
      icon: "map",
      color: "#6610f2",
      to: "/state-master",
    },
    {
      label: "Cities",
      value: cityCount,
      icon: "pin",
      color: "#d63384",
      to: "/city-master",
    },
    {
      label: "Job Categories",
      value: jobCategoryCount,
      icon: "briefcase",
      color: "#fd7e14",
      to: "/job-category",
    },
    {
      label: "Sub Categories",
      value: jobSubCategoryCount,
      icon: "layers",
      color: "#198754",
      to: "/job-sub-category",
    },
    {
      label: "Blogs",
      value: blogCount,
      icon: "file-text",
      color: "#0dcaf0",
      to: "/blogs",
    },
    {
      label: "CMS Sections",
      value: cmsSectionCount,
      icon: "layout",
      color: "#6c757d",
      to: "/cms",
    },
    {
      label: "Newsletter Subs",
      value: newsletterCount,
      icon: "mail",
      color: "#20c997",
      to: "/newsletter",
    },
    {
      label: "Contact Queries",
      value: contactQueryCount,
      icon: "message",
      color: "#dc3545",
      to: "/contact",
    },
    {
      label: "Visitors",
      value: visitorCount,
      icon: "users",
      color: "#6f42c1",
      to: "#",
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        section="Overview"
      />

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

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Welcome back</h2>

            <p>
              Use the sidebar to manage every master
              listed in your data model.
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
            Each menu item on the left maps to one
            master from your data sheet — Country,
            State, City, Job Category, Job Sub Category,
            Newsletter, Blogs, CMS and Contact — with
            its own dedicated form and list, matching
            the fields you defined.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
