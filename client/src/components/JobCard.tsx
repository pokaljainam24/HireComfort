import React from "react";
import type { Job } from "../recruiterDashboard/types/job.ts";

import profileIcon from "../assets/imgs/profile.svg";
import { Link } from "react-router";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const brandImg = job?.companyId?.companyLogo || "/imgs/avatars/avatar-5.png";
  const companyName = job?.companyId?.companyName || "Company";
  const location = job.city || "Remote / Anywhere";
  const positionsCount = job.nop ?? 1;

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="card-grid-2 hover-up" style={{ borderRadius: "12px" }}>
        <div className="card-grid-2-image-left" style={{ display: "flex", alignItems: "center", gap: "12px", "marginTop": "0" }}>
          <div
            className="image-box"
            style={{
              width: "52px",
              height: "52px",
              minWidth: "52px",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
              padding: "4px"
            }}
          >
            <img
              src={brandImg}
              alt={companyName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "6px"
              }}
            />
          </div>
          <div className="right-info" style={{ overflow: "hidden" }}>
            <a
              className="name-job"
              href={`/job-details/${job._id}`}
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f172a",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                display: "block"
              }}
            >
              {companyName}
            </a>
            <span className="location-small" style={{ fontSize: "12px", color: "#64748b" }}>
              {location}
            </span>
          </div>
        </div>

        <div className="card-block-info">
          <h6 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
            <Link to={`/job-details/${job._id}`} style={{ color: "#1e293b" }}>
              {job.title}
            </Link>
          </h6>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
            <span className="card-briefcase" style={{ fontSize: "12px", color: "#475569" }}>
              {job.jobType}
            </span>
            <span className="card-time" style={{ fontSize: "12px", color: "#475569" }}>
              {job.exp ? `${job.exp} yrs exp` : "Entry Level"}
            </span>
          </div>

          {(() => {
            const rawText = (job.description || "No description provided.").replace(/<[^>]*>/g, "").trim();
            return (
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  margin: "0 0 12px 0",
                  lineHeight: "1.5",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "39px"
                }}
              >
                {rawText}
              </p>
            );
          })()}

          <div className="mt-15" style={{ display: "flex", flexWrap: "wrap", gap: "6px", minHeight: "30px" }}>
            {(Array.isArray(job.skills) && job.skills.length > 0 ? job.skills : ["Fulltime", "Remote"])
              .slice(0, 3)
              .map((tag, sIdx) => {
                const maxTagChars = 10;
                const truncatedTag = tag.length > maxTagChars ? `${tag.slice(0, maxTagChars)}...` : tag;
                return (
                  <span
                    key={sIdx}
                    className="btn btn-grey-small"
                    title={tag}
                    style={{
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      backgroundColor: "#f1f5f9",
                      color: "#475569",
                      maxWidth: "110px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      lineHeight: "1"
                    }}
                  >
                    {truncatedTag}
                  </span>
                );
              })}
          </div>

          <div className="card-2-bottom mt-20" style={{ paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
            <div className="row align-items-center">
              <div className="col-lg-7 col-7" title="Number of positions" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <img src={profileIcon} alt="Number of positions" style={{ width: "15px", height: "18px" }} />
                <span className="card-text-price" style={{ fontSize: "15px", fontWeight: 700, color: "#4f5e64" }}>
                  {positionsCount}
                </span>
              </div>
              <Link
                className="btn btn-default btn-shadow hover-up"
                to={`/job-details/${job._id}`}
                onClick={() =>
                  window.scrollTo(0, 0)
                }
                style={{ borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: 600, color: "white", "maxWidth": "100px" }}
              >
                Apply now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
