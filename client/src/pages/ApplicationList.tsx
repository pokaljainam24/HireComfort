import React, { useEffect, useState } from "react";
import { Link } from "react-router";

type ApplicationStatus =
    | "Viewed"
    | "Shortlisted"
    | "Interview"
    | "Hired"
    | "Rejected"
    | string;

type Application = {
    _id: string;

    applicantId:
    | string
    | {
        _id: string;
        userName?: string;
        name?: string;
        email?: string;
    };

    jobId:
    | string
    | {
        _id: string;
        title?: string;
        jobTitle?: string;
        companyId?: {
            companyName?: string;
            companyLogo?: string;
        };
    };

    applicationDate?: string;
    appliedAt?: string;
    applicationStatus?: ApplicationStatus;

    resumeUrl?: string;
    coverLetter?: string;
};

const MyApplicationList: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadApplications = async () => {
            try {
                setLoading(true);
                setError("");

                const role = localStorage.getItem("role");
                const userStr = localStorage.getItem("user");

                if (role !== "applicant" || !userStr) {
                    setError("Please log in as an applicant.");
                    return;
                }

                const user = JSON.parse(userStr);

                if (!user?._id) {
                    setError("Applicant information is missing.");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/api/job_application_master"
                );

                if (!response.ok) {
                    throw new Error("Failed to load applications.");
                }

                const data = await response.json();

                const allApplications: Application[] =
                    data.jobApplications || [];

                // Only show applications belonging to logged-in applicant
                const myApplications = allApplications.filter((app) => {
                    const applicantId =
                        typeof app.applicantId === "object"
                            ? app.applicantId?._id
                            : app.applicantId;

                    return String(applicantId) === String(user._id);
                });

                setApplications(myApplications);
            } catch (err) {
                console.error("Failed to load applications:", err);
                setError("Failed to load your applications.");
            } finally {
                setLoading(false);
            }
        };

        loadApplications();
    }, []);

    const getJobTitle = (application: Application) => {
        if (typeof application.jobId === "object") {
            return (
                application.jobId.title ||
                application.jobId.jobTitle ||
                "Job"
            );
        }

        return "Job";
    };

    const getCompanyName = (application: Application) => {
        if (
            typeof application.jobId === "object" &&
            application.jobId.companyId
        ) {
            return (
                application.jobId.companyId.companyName ||
                "Company"
            );
        }

        return "Company";
    };

    const getCompanyLogo = (application: Application) => {
        if (
            typeof application.jobId === "object" &&
            application.jobId.companyId
        ) {
            return (
                application.jobId.companyId.companyLogo ||
                "/imgs/avatars/avatar-5.png"
            );
        }

        return "/imgs/avatars/avatar-5.png";
    };

    const getStatusClass = (status?: string) => {
        switch (status?.toLowerCase()) {
            case "shortlisted":
                return "my-application-status shortlisted";

            case "interview":
                return "my-application-status interview";

            case "hired":
                return "my-application-status hired";

            case "rejected":
                return "my-application-status rejected";

            case "applied":
            default:
                return "my-application-status applied";
        }
    };

    if (loading) {
        return (
            <main className="main">
                <div className="container py-5 text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3 text-muted">
                        Loading your applications...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="main">
                <div className="container py-5">
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main
            className="main"
            style={{
                backgroundColor: "#f8fafc",
                minHeight: "100vh",
                paddingBottom: 60,
            }}
        >
            <section
                style={{
                    backgroundColor: "#ffffff",
                    borderBottom: "1px solid #e2e8f0",
                    padding: "35px 0",
                }}
            >
                <div className="container">
                    <h2
                        style={{
                            margin: 0,
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#0f172a",
                        }}
                    >
                        My Applications
                    </h2>

                    <p
                        style={{
                            margin: "8px 0 0",
                            color: "#64748b",
                            fontSize: 14,
                        }}
                    >
                        Track all the jobs you have applied for.
                    </p>
                </div>
            </section>

            <section style={{ paddingTop: 35 }}>
                <div className="container">
                    {applications.length === 0 ? (
                        <div
                            style={{
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: 16,
                                padding: 50,
                                textAlign: "center",
                            }}
                        >
                            <i
                                className="fi-rr-briefcase"
                                style={{
                                    fontSize: 40,
                                    color: "#94a3b8",
                                }}
                            />

                            <h4
                                style={{
                                    marginTop: 18,
                                    color: "#0f172a",
                                }}
                            >
                                No applications yet
                            </h4>

                            <p
                                style={{
                                    color: "#64748b",
                                    marginBottom: 20,
                                }}
                            >
                                You haven't applied to any jobs yet.
                            </p>

                            <Link
                                to="/jobs"
                                className="btn btn-primary"
                            >
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            {applications.map((application) => {
                                const status =
                                    application.applicationStatus ||
                                    "Viewed";

                                return (
                                    <div
                                        key={application._id}
                                        style={{
                                            background: "#ffffff",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: 16,
                                            padding: 22,
                                            boxShadow:
                                                "0 2px 8px rgba(0,0,0,0.02)",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                gap: 20,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {/* Job information */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 16,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 58,
                                                        height: 58,
                                                        borderRadius: 12,
                                                        border:
                                                            "1px solid #e2e8f0",
                                                        background: "#ffffff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        overflow: "hidden",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <img
                                                        src={getCompanyLogo(
                                                            application
                                                        )}
                                                        alt={getCompanyName(
                                                            application
                                                        )}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "contain",
                                                            padding: 6,
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <h4
                                                        style={{
                                                            margin: 0,
                                                            color: "#0f172a",
                                                            fontSize: 17,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {getJobTitle(application)}
                                                    </h4>

                                                    <div
                                                        style={{
                                                            marginTop: 5,
                                                            color: "#64748b",
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {getCompanyName(
                                                            application
                                                        )}
                                                    </div>

                                                    <div
                                                        style={{
                                                            marginTop: 5,
                                                            color: "#94a3b8",
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        Applied on{" "}
                                                        {application.appliedAt ||
                                                            application.applicationDate
                                                            ? new Date(
                                                                application.appliedAt ||
                                                                application.applicationDate!
                                                            ).toLocaleDateString()
                                                            : "—"}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 15,
                                                }}
                                            >
                                                <span
                                                    className={getStatusClass(
                                                        status
                                                    )}
                                                >
                                                    {status}
                                                </span>

                                                <Link
                                                    to={
                                                        typeof application.jobId === "object"
                                                            ? `/job-details/${application.jobId._id}`
                                                            : `/job-details/${application.jobId}`
                                                    }
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    View Job
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Shortlisted message */}
                                        {status.toLowerCase() ===
                                            "shortlisted" && (
                                                <div
                                                    style={{
                                                        marginTop: 18,
                                                        padding: "12px 15px",
                                                        borderRadius: 8,
                                                        background: "#eff6ff",
                                                        border:
                                                            "1px solid #bfdbfe",
                                                        color: "#1d4ed8",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    🎉 You have been shortlisted
                                                    for this position.
                                                </div>
                                            )}

                                        {/* Interview message */}
                                        {status.toLowerCase() ===
                                            "interview" && (
                                                <div
                                                    style={{
                                                        marginTop: 18,
                                                        padding: "12px 15px",
                                                        borderRadius: 8,
                                                        background: "#fff7ed",
                                                        border:
                                                            "1px solid #fed7aa",
                                                        color: "#c2410c",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Your interview process is
                                                    currently in progress.
                                                </div>
                                            )}

                                        {/* Rejected message */}
                                        {status.toLowerCase() ===
                                            "rejected" && (
                                                <div
                                                    style={{
                                                        marginTop: 18,
                                                        padding: "12px 15px",
                                                        borderRadius: 8,
                                                        background: "#fef2f2",
                                                        border:
                                                            "1px solid #fecaca",
                                                        color: "#b91c1c",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Your application was not
                                                    selected for this position.
                                                </div>
                                            )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default MyApplicationList;