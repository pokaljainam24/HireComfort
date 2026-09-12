import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { jobApi } from "../recruiterDashboard/api/jobApi.ts";
import type { Job } from "../recruiterDashboard/types/job.ts";
import { getCountries } from "../recruiterDashboard/api/countryApi.ts";
import { getStates } from "../recruiterDashboard/api/stateApi.ts";
import { getCities } from "../recruiterDashboard/api/cityApi.ts";

const JobDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [locationStr, setLocationStr] = useState<string>("");

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        jobApi
            .getOne(id)
            .then(async (data: any) => {
                setJob(data);

                try {
                    const cId = data.city || data.cityId;
                    const sId = data.state || data.stateId;
                    const cntryId = data.country || data.countryId;

                    let locParts: string[] = [];

                    if (cId || sId || cntryId) {
                        const [allCountries, allStates, allCities] = await Promise.all([
                            getCountries().catch(() => []),
                            getStates().catch(() => []),
                            getCities().catch(() => [])
                        ]);

                        if (cId) {
                            const c = allCities.find(x => String(x.id) === String(cId));
                            if (c) locParts.push(c.name);
                        }
                        if (sId) {
                            const s = allStates.find(x => String(x.id) === String(sId));
                            if (s) locParts.push(s.name);
                        }
                        if (cntryId) {
                            const ctry = allCountries.find(x => String(x.id) === String(cntryId));
                            if (ctry) locParts.push(ctry.name);
                        }
                    }

                    if (locParts.length > 0) {
                        setLocationStr(locParts.join(", "));
                    } else if (data.city) {
                        setLocationStr(String(data.city));
                    } else {
                        setLocationStr("Remote");
                    }
                } catch (err) {
                    console.error("Failed to parse location", err);
                    setLocationStr(data.city ? String(data.city) : "Remote");
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load job details:", err);
                setError("Failed to load job details. Please try again.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <main className="main">
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading job details...</p>
                </div>
            </main>
        );
    }
    console.log(job?.salaryRange, "job is this");

    if (error || !job) {
        return (
            <main className="main">
                <div className="container py-5 text-center">
                    <h3 className="text-danger">{error || "Job not found"}</h3>
                    <Link to="/jobs" className="btn btn-default mt-3">
                        Back to Jobs
                    </Link>
                </div>
            </main>
        );
    }

    const brandImg = job?.companyId?.companyLogo || "/imgs/avatars/avatar-5.png";
    const companyName = job?.companyId?.companyName || "Company";

    return (
        <div className="main" style={{ backgroundColor: "#f8fafc" }}>
            {/* Banner / Header */}
            <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", paddingTop: 40, paddingBottom: 40 }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 col-md-12">
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    style={{
                                        width: 72,
                                        height: 72,
                                        minWidth: 72,
                                        borderRadius: 14,
                                        overflow: "hidden",
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e2e8f0",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 8,
                                    }}
                                >
                                    <img
                                        src={brandImg}
                                        alt={companyName}
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                    />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                                        {job.title}
                                    </h2>
                                    <div className="d-flex flex-wrap align-items-center gap-3" style={{ fontSize: 14, color: "#64748b" }}>
                                        <span style={{ fontWeight: 600, color: "#3b82f6" }}>
                                            <i className="fi-rr-briefcase me-1" />
                                            {companyName}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            <i className="fi-rr-marker me-1" />
                                            {locationStr || ""}
                                        </span>
                                        {job.createdAt && (
                                            <>
                                                <span>•</span>
                                                <span>
                                                    <i className="fi-rr-clock me-1" />
                                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 text-lg-end mt-4 mt-lg-0">
                            <button
                                className="btn btn-apply-now hover-up"
                                data-bs-toggle="modal"
                                data-bs-target="#ModalApplyJobForm"
                                style={{
                                    backgroundColor: "#2563eb",
                                    color: "#ffffff",
                                    padding: "12px 28px",
                                    borderRadius: 10,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    boxShadow: "0 4px 12px rgba(37,99,235,0.25)"
                                }}
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* Content Section */}
            <section className="mt-40">
                <div className="container">
                    <div className="row">
                        {/* Left Main Area */}
                        <div className="col-lg-8 col-md-12">
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 16,
                                    padding: 32,
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                                    marginBottom: 24
                                }}
                            >
                                <h4 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                                    Job Description
                                </h4>
                                <div
                                    style={{ lineHeight: "1.7", color: "#334155", fontSize: 15 }}
                                    dangerouslySetInnerHTML={{
                                        __html: job.description || "No detailed description provided for this job role."
                                    }}
                                />

                                {Array.isArray(job.skills) && job.skills.length > 0 && (
                                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #f1f5f9" }}>
                                        <h5 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
                                            Required Skills & Qualifications
                                        </h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            {job.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        fontSize: 13,
                                                        padding: "6px 14px",
                                                        borderRadius: 8,
                                                        backgroundColor: "#f1f5f9",
                                                        color: "#1e293b",
                                                        fontWeight: 500,
                                                        border: "1px solid #e2e8f0"
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Company Card */}
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 16,
                                    padding: 28,
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 20
                                }}
                            >
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        minWidth: 60,
                                        borderRadius: 12,
                                        backgroundColor: "#f8fafc",
                                        border: "1px solid #e2e8f0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 6
                                    }}
                                >
                                    <img
                                        src={brandImg}
                                        alt={companyName}
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                    />
                                </div>
                                <div>
                                    <h5 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                                        About {companyName}
                                    </h5>
                                    <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>
                                        {job.companyId?.aboutCompany || "Leading employer offering dynamic career opportunities."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    borderRadius: 16,
                                    padding: 28,
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                                }}
                            >
                                <h5 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>
                                    Job Overview
                                </h5>

                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    {job.jobType && (
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                                <i className="fi-rr-briefcase" />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 12, color: "#64748b" }}>Employment Type</div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{job.jobType}</div>
                                            </div>
                                        </div>
                                    )}

                                    {locationStr && (
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                                <i className="fi-rr-marker" />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 12, color: "#64748b" }}>Location</div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{locationStr}</div>
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                        <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                            <i className="fi-rr-dollar" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 12, color: "#64748b" }}>Offered Salary</div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>
                                                {typeof job?.salaryRange === "number" && job.salaryRange > 0
                                                    ? `Rs ${job.salaryRange.toLocaleString()} lacs`
                                                    : "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    {job.exp !== undefined && job.exp !== null && (
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                                <i className="fi-rr-user" />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 12, color: "#64748b" }}>Experience Required</div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{job.exp ? `${job.exp} Years` : "Entry Level"}</div>
                                            </div>
                                        </div>
                                    )}

                                    {job.status && (
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                                <i className="fi-rr-time-fast" />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 12, color: "#64748b" }}>Job Status</div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#16a34a", textTransform: "capitalize" }}>{job.status}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="btn btn-apply-now w-100 mt-4"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                    style={{
                                        backgroundColor: "#2563eb",
                                        color: "#ffffff",
                                        padding: "12px 20px",
                                        borderRadius: 10,
                                        fontSize: 14,
                                        fontWeight: 600
                                    }}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JobDetails;