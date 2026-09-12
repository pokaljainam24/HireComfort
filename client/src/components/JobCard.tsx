import React from "react";
import type { Job } from "../recruiterDashboard/types/job.ts";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const brandImg = job?.companyId?.companyLogo || "/imgs/avatars/avatar-5.png";
  const companyName = job?.companyId?.companyName || "Company";
  const location = job.city || "Remote / Anywhere";
  const hasSalary = typeof job?.salaryRange === "number" && job.salaryRange > 0;
  const salaryText = hasSalary ? `Rs ${job.salaryRange.toLocaleString()} lacs` : "N/A";

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="card-grid-2 hover-up" style={{ padding: "20px", borderRadius: "12px" }}>
        <div className="card-grid-2-image-left" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

        <div className="card-block-info" style={{ marginTop: "16px" }}>
          <h6 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>
            <a href={`/job-details/${job._id}`} style={{ color: "#1e293b" }}>
              {job.title}
            </a>
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
            const maxChars = 80;
            const truncated = rawText.length > maxChars ? `${rawText.slice(0, maxChars)}...` : rawText;
            return (
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  minHeight: "40px",
                  maxHeight: "40px",
                  margin: "0 0 12px 0",
                  lineHeight: "1.5",
                  overflow: "hidden"
                }}
              >
                {truncated}
              </p>
            );
          })()}

          <div className="mt-15" style={{ display: "flex", flexWrap: "wrap", gap: "6px", minHeight: "30px" }}>
            {Array.isArray(job.skills) && job.skills.length > 0
              ? job.skills.slice(0, 3).map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="btn btn-grey-small"
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    backgroundColor: "#f1f5f9",
                    color: "#475569"
                  }}
                >
                  {skill}
                </span>
              ))
              : ["Fulltime", "Remote"].map((tag, sIdx) => (
                <span
                  key={sIdx}
                  className="btn btn-grey-small"
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    backgroundColor: "#f1f5f9",
                    color: "#475569"
                  }}
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="card-2-bottom mt-20" style={{ paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
            <div className="row align-items-center">
              <div className="col-lg-7 col-7">
                <span className="card-text-price" style={{ fontSize: "16px", fontWeight: 700, color: "#3b82f6" }}>
                  {salaryText}
                </span>
              </div>
              <div className="col-lg-5 col-5 text-end">
                <div
                  className="btn btn-apply-now"
                  data-bs-toggle="modal"
                  data-bs-target="#ModalApplyJobForm"
                  style={{ borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: 600 }}
                >
                  Apply now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
