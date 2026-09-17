import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import { jobApi } from "../recruiterDashboard/api/jobApi.ts";
import type { Job } from "../recruiterDashboard/types/job.ts";

import { getCountries } from "../recruiterDashboard/api/countryApi.ts";
import { getStates } from "../recruiterDashboard/api/stateApi.ts";
import { getCities } from "../recruiterDashboard/api/cityApi.ts";

// =========================================================
// STATIC ASSETS
// =========================================================

import shareFb from "../assets/imgs/template/icons/share-fb.svg";
import shareTw from "../assets/imgs/template/icons/share-tw.svg";
import shareRed from "../assets/imgs/template/icons/share-red.svg";
import shareWhatsapp from "../assets/imgs/template/icons/share-whatsapp.svg";
import newsletterLeft from "../assets/imgs/template/newsletter-left.png";
import newsletterRight from "../assets/imgs/template/newsletter-right.png";
import Swal from "sweetalert2";

// =========================================================
// API BASE URL
// =========================================================

const API_BASE_URL = "http://localhost:5000";

// =========================================================
// COMPONENT
// =========================================================

const JobDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // =========================================================
    // STATE
    // =========================================================

    const [job, setJob] = useState<Job | null>(null);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [error, setError] =
        useState<string>("");

    const [locationStr, setLocationStr] =
        useState<string>("");

    const [applying, setApplying] =
        useState<boolean>(false);

    const [applyMsg, setApplyMsg] =
        useState<string>("");

    const [applyError, setApplyError] =
        useState<string>("");

    const [applicationStatus, setApplicationStatus] =
        useState<string | null>(null);

    // =========================================================
    // COMPANY LOGO / AVATAR
    // =========================================================

    const getCompanyLogo = (): string => {
        const company: any = job?.companyId;

        if (!company) {
            return "";
        }

        const logoValue =
            company.companyLogo ||
            company.logo ||
            company.companyImg ||
            company.companyImage ||
            company.logoUrl ||
            company.avatar ||
            company.profileImage ||
            company.image ||
            "";

        if (
            typeof logoValue !== "string" ||
            !logoValue.trim()
        ) {
            return "";
        }

        const logo = logoValue.trim();

        console.log(
            "RAW COMPANY LOGO:",
            logo
        );

        // =====================================================
        // IMPORTANT:
        // Backend is returning Base64 image
        // Example:
        // data:image/avif;base64,AAAA...
        // =====================================================

        if (
            logo.startsWith("data:image/")
        ) {
            return logo;
        }

        // =====================================================
        // Backend already returns complete URL
        // =====================================================

        if (
            logo.startsWith("http://") ||
            logo.startsWith("https://")
        ) {
            return logo;
        }

        // =====================================================
        // Handle blob URL
        // =====================================================

        if (
            logo.startsWith("blob:")
        ) {
            return logo;
        }

        // =====================================================
        // Convert Windows path to URL path
        // =====================================================

        const cleanLogo = logo
            .replace(/\\/g, "/")
            .replace(/^\/+/, "");

        // =====================================================
        // Already uploads path
        // =====================================================

        if (
            cleanLogo.startsWith("uploads/")
        ) {
            return `${API_BASE_URL}/${cleanLogo}`;
        }

        // =====================================================
        // Normal backend company image path
        // =====================================================

        return `${API_BASE_URL}/uploads/company/${cleanLogo}`;
    };

    // =========================================================
    // COMPANY NAME
    // =========================================================

    const getCompanyName = (): string => {
        const company: any = job?.companyId;

        return (
            company?.companyName ||
            company?.name ||
            "Company"
        );
    };

    // =========================================================
    // SALARY
    // =========================================================

    const getSalary = (): string => {
        if (
            typeof job?.salaryRange === "number" &&
            job.salaryRange > 0
        ) {
            return `Rs ${job.salaryRange.toLocaleString()} lacs`;
        }

        return "Not disclosed";
    };

    // =========================================================
    // EXPERIENCE
    // =========================================================

    const getExperience = (): string => {
        if (
            job?.exp !== undefined &&
            job?.exp !== null
        ) {
            return job.exp
                ? `${job.exp} Years`
                : "Entry Level";
        }

        return "Not specified";
    };

    // =========================================================
    // POSTED DATE
    // =========================================================

    const getPostedDate = (): string => {
        if (!job?.createdAt) {
            return "";
        }

        return new Date(
            job.createdAt
        ).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =========================================================
    // APPLY JOB
    // =========================================================

    const handleApplyNow = async () => {
        setApplyMsg("");
        setApplyError("");

        const role = localStorage.getItem("role");
        const userStr = localStorage.getItem("user");

        // =====================================================
        // LOGIN FIRST
        // =====================================================

        if (role !== "applicant" || !userStr) {
            Swal.fire({
                icon: "info",
                title: "Login Required",
                text: "Please login as an applicant to apply for this job.",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                customClass: {
                    popup: "login-toast",
                    title: "login-toast-title",
                    htmlContainer: "login-toast-text",
                    timerProgressBar: "login-toast-progress",
                },
            });

            return;
        }

        let user: any;

        try {
            user = JSON.parse(userStr);
        } catch {
            Swal.fire({
                icon: "error",
                title: "Session Expired",
                text: "Please login again to continue.",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

            return;
        }

        if (!job || !user?._id) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Missing job or applicant information.",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

            return;
        }

        setApplying(true);

        try {
            const now = new Date().toISOString();

            const payload = {
                jobId: job._id,
                applicantId: user._id,
                applicationDate: now,
                appliedAt: now,
                createdBy:
                    user.userName ||
                    user.username ||
                    "applicant",
            };

            console.log("Apply Payload:", payload);

            const response = await fetch(
                `${API_BASE_URL}/api/job_application_master`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(payload),
                }
            );

            const resData = await response.json();

            // =====================================================
            // SUCCESS
            // =====================================================

            if (response.ok) {
                const status =
                    resData.jobApplication?.applicationStatus ||
                    "Applied";

                setApplicationStatus(status);

                Swal.fire({
                    icon: "success",
                    title: "Application Submitted!",
                    text:
                        resData.message ||
                        "Your application has been submitted successfully.",
                    position: "top-end",
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

            } else {
                // =================================================
                // API ERROR
                // =================================================

                Swal.fire({
                    icon: "error",
                    title: "Application Failed",
                    text:
                        resData.message ||
                        "Failed to submit job application.",
                    position: "top-end",
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }

        } catch (err) {
            console.error("Apply job error:", err);

            Swal.fire({
                icon: "error",
                title: "Network Error",
                text:
                    "Unable to submit your application. Please try again.",
                position: "top-end",
                toast: true,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

        } finally {
            setApplying(false);
        }
    };

    // =========================================================
    // LOAD JOB
    // =========================================================

    useEffect(() => {
        if (!id) {
            return;
        }

        const loadJobDetails =
            async () => {
                setLoading(true);
                setError("");

                try {
                    // =================================================
                    // GET JOB
                    // =================================================

                    const data: any =
                        await jobApi.getOne(id);

                    console.log(
                        "FULL JOB RESPONSE:",
                        data
                    );

                    console.log(
                        "COMPANY DATA:",
                        data?.companyId
                    );

                    console.log(
                        "RAW COMPANY LOGO:",
                        data?.companyId?.companyLogo
                    );

                    setJob(data);

                    // =================================================
                    // CHECK APPLICATION STATUS
                    // =================================================

                    const role =
                        localStorage.getItem(
                            "role"
                        );

                    const userStr =
                        localStorage.getItem(
                            "user"
                        );

                    if (
                        role === "applicant" &&
                        userStr
                    ) {
                        try {
                            const user =
                                JSON.parse(
                                    userStr
                                );

                            const appRes =
                                await fetch(
                                    `${API_BASE_URL}/api/job_application_master`
                                );

                            if (
                                appRes.ok
                            ) {
                                const appData =
                                    await appRes.json();

                                const applications =
                                    appData
                                        .jobApplications ||
                                    [];

                                const existingApp =
                                    applications.find(
                                        (
                                            app: any
                                        ) => {
                                            const appId =
                                                typeof app.applicantId ===
                                                    "object"
                                                    ? app
                                                        .applicantId
                                                        ?._id
                                                    : app.applicantId;

                                            const jId =
                                                typeof app.jobId ===
                                                    "object"
                                                    ? app
                                                        .jobId
                                                        ?._id
                                                    : app.jobId;

                                            return (
                                                String(
                                                    appId
                                                ) ===
                                                String(
                                                    user._id
                                                ) &&
                                                String(
                                                    jId
                                                ) ===
                                                String(
                                                    id
                                                )
                                            );
                                        }
                                    );

                                if (
                                    existingApp
                                ) {
                                    setApplicationStatus(
                                        existingApp
                                            .applicationStatus ||
                                        "Applied"
                                    );
                                }
                            }
                        } catch (
                        appErr
                        ) {
                            console.error(
                                "Failed to fetch application status:",
                                appErr
                            );
                        }
                    }

                    // =================================================
                    // LOCATION
                    // =================================================

                    try {
                        const cityId =
                            data.city ||
                            data.cityId;

                        const stateId =
                            data.state ||
                            data.stateId;

                        const countryId =
                            data.country ||
                            data.countryId;

                        const locParts: string[] =
                            [];

                        if (
                            cityId ||
                            stateId ||
                            countryId
                        ) {
                            const [
                                allCountries,
                                allStates,
                                allCities,
                            ] =
                                await Promise.all(
                                    [
                                        getCountries().catch(
                                            () => []
                                        ),

                                        getStates().catch(
                                            () => []
                                        ),

                                        getCities().catch(
                                            () => []
                                        ),
                                    ]
                                );

                            // =========================================
                            // CITY
                            // =========================================

                            if (cityId) {
                                const city =
                                    allCities.find(
                                        (
                                            x
                                        ) =>
                                            String(
                                                x.id
                                            ) ===
                                            String(
                                                cityId
                                            )
                                    );

                                if (city) {
                                    locParts.push(
                                        city.name
                                    );
                                }
                            }

                            // =========================================
                            // STATE
                            // =========================================

                            if (stateId) {
                                const state =
                                    allStates.find(
                                        (
                                            x
                                        ) =>
                                            String(
                                                x.id
                                            ) ===
                                            String(
                                                stateId
                                            )
                                    );

                                if (state) {
                                    locParts.push(
                                        state.name
                                    );
                                }
                            }

                            // =========================================
                            // COUNTRY
                            // =========================================

                            if (countryId) {
                                const country =
                                    allCountries.find(
                                        (
                                            x
                                        ) =>
                                            String(
                                                x.id
                                            ) ===
                                            String(
                                                countryId
                                            )
                                    );

                                if (country) {
                                    locParts.push(
                                        country.name
                                    );
                                }
                            }
                        }

                        if (
                            locParts.length > 0
                        ) {
                            setLocationStr(
                                locParts.join(
                                    ", "
                                )
                            );
                        } else if (
                            data.city
                        ) {
                            setLocationStr(
                                String(
                                    data.city
                                )
                            );
                        } else {
                            setLocationStr(
                                "Remote"
                            );
                        }
                    } catch (
                    locationErr
                    ) {
                        console.error(
                            "Failed to parse location:",
                            locationErr
                        );

                        setLocationStr(
                            data.city
                                ? String(
                                    data.city
                                )
                                : "Remote"
                        );
                    }
                } catch (
                err
                ) {
                    console.error(
                        "Failed to load job details:",
                        err
                    );

                    setError(
                        "Failed to load job details. Please try again."
                    );
                } finally {
                    setLoading(false);
                }
            };

        loadJobDetails();
    }, [id]);

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <main className="main">

                <section className="section-box-2">

                    <div className="container py-5 text-center">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <p className="mt-15 color-text-paragraph">
                            Loading job details...
                        </p>

                    </div>

                </section>

            </main>
        );
    }

    // =========================================================
    // ERROR
    // =========================================================

    if (
        error ||
        !job
    ) {
        return (
            <main className="main">

                <section className="section-box-2">

                    <div className="container py-5 text-center">

                        <h3 className="color-text-paragraph">
                            {error ||
                                "Job not found"}
                        </h3>

                        <Link
                            to="/jobs"
                            className="btn btn-default mt-20"
                        >
                            Back to Jobs
                        </Link>

                    </div>

                </section>

            </main>
        );
    }

    // =========================================================
    // DYNAMIC DATA
    // =========================================================

    const companyName =
        getCompanyName();

    const companyLogo =
        getCompanyLogo();

    const jobData =
        job as any;

    const industry =
        jobData.industry ||
        jobData.industryName ||
        jobData.industryId?.name;

    const jobLevel =
        jobData.jobLevel ||
        jobData.jobLevelName ||
        jobData.level;

    const deadline =
        jobData.deadline ||
        jobData.applicationDeadline;

    const updatedDate =
        jobData.updatedAt;

    const companyAddress =
        jobData.companyId?.location ||
        locationStr;

    const companyPhone =
        jobData.companyId?.phone ||
        jobData.companyId?.contactNumber;

    const companyEmail =
        jobData.companyId?.email;

    const companyAbout =
        job?.companyId?.aboutCompany;

    const mapLocation =
        companyAddress ||
        locationStr ||
        "";

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <main className="main">

            {/* =====================================================
                JOB HEADER
            ====================================================== */}

            <section className="section-box-2">

                <div className="container">

                    {/* Banner */}

                    <div className="banner-hero banner-image-single">

                        <img
                            src="https://www.atsinc.com/hubfs/Blogs/Corporate%20Recruiting/Pros%20and%20Cons%20of%20Open%20Office%20Environment/Employees-working-in-open-office.jpg"
                            alt="HireComfort"
                        />

                    </div>

                    {/* Job Header */}

                    <div className="row mt-10 align-items-center">

                        <div className="col-lg-8 col-md-12">

                            <h3>
                                {job.title}
                            </h3>

                            <div className="mt-0 mb-15">

                                {job.jobType && (
                                    <span className="card-briefcase">
                                        {job.jobType}
                                    </span>
                                )}

                                {getPostedDate() && (
                                    <span className="card-time">
                                        {getPostedDate()}
                                    </span>
                                )}

                            </div>

                            <div className="d-flex align-items-center flex-wrap gap-2">

                                <span className="color-brand-1">

                                    <i className="bi bi-building me-2"></i>

                                    {companyName}

                                </span>

                                {locationStr && (
                                    <span className="card-location">
                                        {locationStr}
                                    </span>
                                )}

                            </div>

                        </div>

                        <div className="col-lg-4 col-md-12 text-lg-end mt-md-15 mt-lg-0">

                            {applicationStatus ? (

                                <div
                                    className="btn btn-apply-icon btn-apply btn-apply-big"
                                    style={{
                                        backgroundColor:
                                            "#16a34a",
                                        borderColor:
                                            "#16a34a",
                                    }}
                                >
                                    Status:{" "}
                                    {
                                        applicationStatus
                                    }
                                </div>

                            ) : (

                                <button
                                    type="button"
                                    className="btn btn-apply-icon btn-apply btn-apply-big hover-up"
                                    onClick={
                                        handleApplyNow
                                    }
                                    disabled={
                                        applying
                                    }
                                >
                                    {applying
                                        ? "Applying..."
                                        : "Apply now"}
                                </button>

                            )}

                        </div>

                    </div>

                    <div className="border-bottom pt-10 pb-10"></div>

                </div>

            </section>

            {/* =====================================================
                MAIN CONTENT
            ====================================================== */}

            <section className="section-box mt-50">

                <div className="container">

                    <div className="row">

                        {/* =================================================
                            LEFT CONTENT
                        ================================================== */}

                        <div className="col-lg-8 col-md-12 col-sm-12 col-12">

                            {/* =================================================
                                EMPLOYMENT INFORMATION
                            ================================================== */}

                            <div className="job-overview">

                                <h5 className="border-bottom pb-15 mb-30">
                                    Employment Information
                                </h5>

                                {/* ROW 1 */}

                                <div className="row">

                                    {industry && (

                                        <div className="col-md-6 d-flex">

                                            <div className="sidebar-icon-item">

                                                <i className="bi bi-building"></i>

                                            </div>

                                            <div className="sidebar-text-info ml-10">

                                                <span className="text-description industry-icon mb-10">
                                                    Industry
                                                </span>

                                                <strong className="small-heading">
                                                    {industry}
                                                </strong>

                                            </div>

                                        </div>

                                    )}

                                    {jobLevel && (

                                        <div className="col-md-6 d-flex mt-sm-15">

                                            <div className="sidebar-icon-item">

                                                <i className="bi bi-bar-chart-fill"></i>

                                            </div>

                                            <div className="sidebar-text-info ml-10">

                                                <span className="text-description joblevel-icon mb-10">
                                                    Job level
                                                </span>

                                                <strong className="small-heading">
                                                    {jobLevel}
                                                </strong>

                                            </div>

                                        </div>

                                    )}

                                </div>

                                {/* ROW 2 */}

                                <div className="row mt-25">

                                    <div className="col-md-6 d-flex mt-sm-15">

                                        <div className="sidebar-icon-item">

                                            <i className="bi bi-currency-rupee"></i>

                                        </div>

                                        <div className="sidebar-text-info ml-10">

                                            <span className="text-description salary-icon mb-10">
                                                Salary
                                            </span>

                                            <strong className="small-heading">
                                                {getSalary()}
                                            </strong>

                                        </div>

                                    </div>

                                    <div className="col-md-6 d-flex">

                                        <div className="sidebar-icon-item">

                                            <i className="bi bi-briefcase-fill"></i>

                                        </div>

                                        <div className="sidebar-text-info ml-10">

                                            <span className="text-description experience-icon mb-10">
                                                Experience
                                            </span>

                                            <strong className="small-heading">
                                                {getExperience()}
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 3 */}

                                <div className="row mt-25">

                                    {job.jobType && (

                                        <div className="col-md-6 d-flex mt-sm-15">

                                            <div className="sidebar-icon-item">

                                                <i className="bi bi-person-workspace"></i>

                                            </div>

                                            <div className="sidebar-text-info ml-10">

                                                <span className="text-description jobtype-icon mb-10">
                                                    Job type
                                                </span>

                                                <strong className="small-heading">
                                                    {job.jobType}
                                                </strong>

                                            </div>

                                        </div>

                                    )}

                                    {deadline && (

                                        <div className="col-md-6 d-flex mt-sm-15">

                                            <div className="sidebar-icon-item">

                                                <i className="bi bi-calendar-event"></i>

                                            </div>

                                            <div className="sidebar-text-info ml-10">

                                                <span className="text-description mb-10">
                                                    Deadline
                                                </span>

                                                <strong className="small-heading">

                                                    {new Date(
                                                        deadline
                                                    ).toLocaleDateString(
                                                        "en-GB"
                                                    )}

                                                </strong>

                                            </div>

                                        </div>

                                    )}

                                </div>

                                {/* ROW 4 */}

                                <div className="row mt-25">

                                    {updatedDate && (

                                        <div className="col-md-6 d-flex mt-sm-15">

                                            <div className="sidebar-icon-item">

                                                <i className="bi bi-arrow-clockwise"></i>

                                            </div>

                                            <div className="sidebar-text-info ml-10">

                                                <span className="text-description jobtype-icon mb-10">
                                                    Updated
                                                </span>

                                                <strong className="small-heading">

                                                    {new Date(
                                                        updatedDate
                                                    ).toLocaleDateString(
                                                        "en-GB"
                                                    )}

                                                </strong>

                                            </div>

                                        </div>

                                    )}

                                    {locationStr && (

                                        <div className="col-md-6 d-flex mt-sm-15">

                                            <div className="sidebar-icon-item">

                                                <i className="bi bi-geo-alt-fill"></i>

                                            </div>

                                            <div className="sidebar-text-info ml-10">

                                                <span className="text-description mb-10">
                                                    Location
                                                </span>

                                                <strong className="small-heading">
                                                    {locationStr}
                                                </strong>

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                            {/* =================================================
                                JOB DESCRIPTION
                            ================================================== */}

                            <div className="content-single mt-50">

                                <h4>
                                    Job Description
                                </h4>

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            job.description ||
                                            "No detailed description provided for this job role.",
                                    }}
                                />

                            </div>

                            {/* =================================================
                                SKILLS
                            ================================================== */}

                            {Array.isArray(
                                job.skills
                            ) &&
                                job.skills.length > 0 && (

                                    <div className="content-single mt-30">

                                        <h4>
                                            Skills & Qualifications
                                        </h4>

                                        <div className="d-flex flex-wrap gap-2 mt-20">

                                            {job.skills.map(
                                                (
                                                    skill,
                                                    index
                                                ) => (

                                                    <span
                                                        key={
                                                            index
                                                        }
                                                        className="btn btn-grey-small"
                                                    >
                                                        {
                                                            skill
                                                        }
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    </div>

                                )}

                            {/* =================================================
                                ABOUT COMPANY
                            ================================================== */}

                            <div className="content-single mt-50">

                                <h4>
                                    About{" "}
                                    {companyName}
                                </h4>

                                <p>
                                    {
                                        companyAbout ||
                                        `Learn more about ${companyName} and the opportunities available with the company.`
                                    }
                                </p>

                            </div>

                            {/* =================================================
                                AUTHOR
                            ================================================== */}

                            <div className="author-single">

                                <span>
                                    {companyName}
                                </span>

                            </div>

                            {/* =================================================
                                APPLY SECTION
                            ================================================== */}

                            <div className="single-apply-jobs">

                                <div className="row align-items-center">

                                    <div className="col-md-5">

                                        {applicationStatus ? (

                                            <button
                                                type="button"
                                                className="btn btn-default mr-15"
                                                disabled
                                            >
                                                Applied
                                            </button>

                                        ) : (

                                            <button
                                                type="button"
                                                className="btn btn-default mr-15"
                                                onClick={
                                                    handleApplyNow
                                                }
                                                disabled={
                                                    applying
                                                }
                                            >
                                                {applying
                                                    ? "Applying..."
                                                    : "Apply now"}
                                            </button>

                                        )}

                                    </div>

                                    {/* SOCIAL SHARE */}

                                    <div className="col-md-7 text-lg-end social-share">

                                        <h6 className="color-text-paragraph-2 d-inline-block d-baseline mr-10">
                                            Share this
                                        </h6>

                                        {/* Facebook */}

                                        <a
                                            href="#"
                                            className="mr-5 d-inline-block d-middle"
                                            onClick={(
                                                e
                                            ) =>
                                                e.preventDefault()
                                            }
                                        >

                                            <img
                                                src={shareFb}
                                                alt="Facebook"
                                                width={35}
                                                height={35}
                                                style={{
                                                    display:
                                                        "inline-block",
                                                    objectFit:
                                                        "contain",
                                                }}
                                            />

                                        </a>

                                        {/* Twitter */}

                                        <a
                                            href="#"
                                            className="mr-5 d-inline-block d-middle"
                                            onClick={(
                                                e
                                            ) =>
                                                e.preventDefault()
                                            }
                                        >

                                            <img
                                                src={shareTw}
                                                alt="Twitter"
                                                width={35}
                                                height={35}
                                                style={{
                                                    display:
                                                        "inline-block",
                                                    objectFit:
                                                        "contain",
                                                }}
                                            />

                                        </a>

                                        {/* Pinterest */}

                                        <a
                                            href="#"
                                            className="mr-5 d-inline-block d-middle"
                                            onClick={(
                                                e
                                            ) =>
                                                e.preventDefault()
                                            }
                                        >

                                            <img
                                                src={shareRed}
                                                alt="Pinterest"
                                                width={35}
                                                height={35}
                                                style={{
                                                    display:
                                                        "inline-block",
                                                    objectFit:
                                                        "contain",
                                                }}
                                            />

                                        </a>

                                        {/* WhatsApp */}

                                        <a
                                            href="#"
                                            className="d-inline-block d-middle"
                                            onClick={(
                                                e
                                            ) =>
                                                e.preventDefault()
                                            }
                                        >

                                            <img
                                                src={
                                                    shareWhatsapp
                                                }
                                                alt="WhatsApp"
                                                width={35}
                                                height={35}
                                                style={{
                                                    display:
                                                        "inline-block",
                                                    objectFit:
                                                        "contain",
                                                }}
                                            />

                                        </a>

                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                                APPLY MESSAGE
                            ================================================== */}

                            {applyMsg && (

                                <div className="alert alert-success mt-20">
                                    {applyMsg}
                                </div>

                            )}

                            {applyError && (

                                <div className="alert alert-danger mt-20">
                                    {applyError}
                                </div>

                            )}

                        </div>

                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================== */}

                        <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">

                            {/* =================================================
                                COMPANY
                            ================================================== */}

                            <div className="sidebar-border">

                                <div className="sidebar-heading">

                                    <div className="avatar-sidebar">

                                        {/* =================================================
                                            COMPANY LOGO / AVATAR
                                        ================================================== */}

                                        <figure className="mb-0">

                                            {companyLogo ? (

                                                <img
                                                    src={
                                                        companyLogo
                                                    }
                                                    alt={
                                                        companyName
                                                    }
                                                    width={80}
                                                    height={80}
                                                    style={{
                                                        width:
                                                            "80px",
                                                        height:
                                                            "80px",
                                                        objectFit:
                                                            "contain",
                                                        display:
                                                            "block",
                                                    }}
                                                    onLoad={() => {
                                                        console.log(
                                                            "Company logo loaded successfully"
                                                        );
                                                    }}
                                                    onError={(
                                                        e
                                                    ) => {
                                                        console.error(
                                                            "Company logo failed to load:",
                                                            companyLogo
                                                        );

                                                        e.currentTarget.style.display =
                                                            "none";
                                                    }}
                                                />

                                            ) : (

                                                <div
                                                    className="d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width:
                                                            "80px",
                                                        height:
                                                            "80px",
                                                    }}
                                                >

                                                    <i
                                                        className="bi bi-building"
                                                        style={{
                                                            fontSize:
                                                                "45px",
                                                        }}
                                                    ></i>

                                                </div>

                                            )}

                                        </figure>

                                        <div className="sidebar-info">

                                            <span className="sidebar-company">
                                                {
                                                    companyName
                                                }
                                            </span>

                                            {locationStr && (
                                                <span className="card-location">
                                                    {
                                                        locationStr
                                                    }
                                                </span>
                                            )}

                                            {jobData.openJobs !==
                                                undefined && (

                                                    <span className="link-underline mt-15">

                                                        {
                                                            jobData.openJobs
                                                        }{" "}
                                                        Open Jobs

                                                    </span>

                                                )}

                                        </div>

                                    </div>

                                </div>

                                <div className="sidebar-list-job">

                                    {/* =================================================
                                        MAP
                                    ================================================== */}

                                    {mapLocation && (

                                        <div className="box-map">

                                            <iframe
                                                title="Company Location"
                                                src={`https://www.google.com/maps?q=${encodeURIComponent(
                                                    mapLocation
                                                )}&output=embed`}
                                                width="100%"
                                                height="250"
                                                style={{
                                                    border: 0,
                                                }}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />

                                        </div>

                                    )}

                                    {/* =================================================
                                        COMPANY CONTACT
                                    ================================================= */}

                                    <ul className="ul-disc mt-20">

                                        {companyAddress && (
                                            <li>
                                                {
                                                    companyAddress
                                                }
                                            </li>
                                        )}

                                        {companyPhone && (
                                            <li>
                                                Phone:{" "}
                                                {
                                                    companyPhone
                                                }
                                            </li>
                                        )}

                                        {companyEmail && (
                                            <li>
                                                Email:{" "}
                                                {
                                                    companyEmail
                                                }
                                            </li>
                                        )}

                                    </ul>

                                </div>

                            </div>

                            {/* =================================================
                                JOB SUMMARY
                            ================================================== */}

                            <div className="sidebar-border mt-30">

                                <h6 className="f-18">
                                    Job Summary
                                </h6>

                                <div className="sidebar-list-job">

                                    <ul className="ul-disc">

                                        <li>
                                            <strong>
                                                Position:
                                            </strong>{" "}
                                            {
                                                job.title
                                            }
                                        </li>

                                        {job.jobType && (
                                            <li>
                                                <strong>
                                                    Type:
                                                </strong>{" "}
                                                {
                                                    job.jobType
                                                }
                                            </li>
                                        )}

                                        {locationStr && (
                                            <li>
                                                <strong>
                                                    Location:
                                                </strong>{" "}
                                                {
                                                    locationStr
                                                }
                                            </li>
                                        )}

                                        <li>
                                            <strong>
                                                Salary:
                                            </strong>{" "}
                                            {
                                                getSalary()
                                            }
                                        </li>

                                        <li>
                                            <strong>
                                                Experience:
                                            </strong>{" "}
                                            {
                                                getExperience()
                                            }
                                        </li>

                                        {job.status && (
                                            <li>
                                                <strong>
                                                    Status:
                                                </strong>{" "}

                                                <span className="color-green">
                                                    {
                                                        job.status
                                                    }
                                                </span>

                                            </li>
                                        )}

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                NEWSLETTER
            ====================================================== */}

            <section className="section-box mt-50 mb-20">

                <div className="container">

                    <div className="box-newsletter">

                        <div className="row">

                            {/* LEFT */}

                            <div className="col-xl-3 col-12 text-center d-none d-xl-block">

                                <img src={newsletterLeft} alt="joxBox" />

                            </div>

                            {/* CENTER */}

                            <div className="col-lg-12 col-xl-6 col-12">

                                <h2 className="text-md-newsletter text-center">

                                    New Things Will Always
                                    <br />
                                    Update Regularly

                                </h2>

                                <div className="box-form-newsletter mt-40">

                                    <form
                                        className="form-newsletter"
                                        onSubmit={(
                                            e
                                        ) =>
                                            e.preventDefault()
                                        }
                                    >

                                        <input
                                            className="input-newsletter"
                                            type="email"
                                            placeholder="Enter your email here"
                                        />

                                        <button
                                            type="submit"
                                            className="btn btn-default font-heading icon-send-letter"
                                        >
                                            Subscribe
                                        </button>

                                    </form>

                                </div>

                            </div>

                            {/* RIGHT */}

                            <div className="col-xl-3 col-12 text-center d-none d-xl-block">

                                <img src={newsletterRight} alt="joxBox" />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default JobDetails;
