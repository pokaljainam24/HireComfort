import { Link } from "react-router";

import jobImage from "../assets/imgs/page/job-single-2/img.png";

import industryIcon from "../assets/imgs/page/job-single/industry.svg";
import jobLevelIcon from "../assets/imgs/page/job-single/job-level.svg";
import salaryIcon from "../assets/imgs/page/job-single/salary.svg";
import experienceIcon from "../assets/imgs/page/job-single/experience.svg";
import jobTypeIcon from "../assets/imgs/page/job-single/job-type.svg";
import deadlineIcon from "../assets/imgs/page/job-single/deadline.svg";
import updatedIcon from "../assets/imgs/page/job-single/updated.svg";
import locationIcon from "../assets/imgs/page/job-single/location.svg";
function ServiceResumeWriting() {
    return (
        <>

            {/* =========================
                MOBILE HEADER
            ========================== */}
            <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        <li>
                                            <Link to="/">Home</Link>
                                        </li>

                                        <li className="has-children">
                                            <Link to="/jobs">Jobs</Link>

                                            <ul className="sub-menu">
                                                <li>
                                                    <Link to="/jobs">Browse Jobs</Link>
                                                </li>
                                                <li>
                                                    <Link to="/jobs-latest">Latest Jobs</Link>
                                                </li>
                                                <li>
                                                    <Link to="/jobs-featured">
                                                        Featured Jobs
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/jobs-remote">Remote Jobs</Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="has-children">
                                            <Link to="/companies">Companies</Link>

                                            <ul className="sub-menu">
                                                <li>
                                                    <Link to="/companies">Browse Companies</Link>
                                                </li>
                                                <li>
                                                    <Link to="/companies-featured">
                                                        Featured Companies
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="has-children">
                                            <Link to="/services">Services</Link>

                                            <ul className="sub-menu">
                                                <li>
                                                    <Link to="/services">
                                                        Recruitment Services
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/service-resume-writing">
                                                        Resume Writing
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/service-career-guidance">
                                                        Career Guidance
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/service-executive-search">
                                                        Executive Search
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="has-children">
                                            <Link to="/blog">Blogs</Link>

                                            <ul className="sub-menu">
                                                <li>
                                                    <Link to="/blog">Latest Blogs</Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-career-tips">
                                                        Career Tips
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-interview-tips">
                                                        Interview Tips
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-resume-tips">
                                                        Resume Tips
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <Link to="/about">About Us</Link>
                                        </li>

                                        <li>
                                            <Link to="/contact">Contact Us</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            {/* Mobile Account */}
                            <div className="mobile-account">
                                <h6 className="mb-15">Account</h6>

                                <div className="d-grid gap-2">
                                    <Link
                                        to="/login"
                                        className="btn btn-default btn-sm"
                                    >
                                        Login / Register
                                    </Link>

                                    <Link
                                        to="/login?tab=register&type=recruiter"
                                        className="btn btn-brand-1 btn-sm mt-10"
                                    >
                                        Post a Job
                                    </Link>
                                </div>
                            </div>

                            <div className="site-copyright text-center mt-30">
                                © 2026 HireComfort. All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================
          MAIN CONTENT
      ========================== */}
            <main className="main">
                <section className="section-box mt-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="box-border-single">

                                    {/* Job Header */}
                                    <div className="row mt-10">
                                        <div className="col-lg-8 col-md-12">
                                            <h3>
                                                Senior Full Stack Engineer, Creator Success Full Time
                                            </h3>

                                            <div className="mt-0 mb-15">
                                                <span className="card-briefcase">
                                                    Fulltime
                                                </span>

                                                <span className="card-time">
                                                    3 mins ago
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-bottom pt-10 pb-10"></div>

                                    {/* Main Job Image */}
                                    <div className="banner-hero banner-image-single mt-10 mb-20">
                                        <img
                                            src={jobImage}
                                            alt="Senior Full Stack Engineer"
                                        />
                                    </div>

                                    {/* =========================
                      OVERVIEW
                  ========================== */}
                                    <div className="job-overview">
                                        <h5 className="border-bottom pb-15 mb-30">
                                            Overview
                                        </h5>

                                        {/* Row 1 */}
                                        <div className="row">
                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={industryIcon}
                                                        alt="Industry"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description industry-icon mb-10">
                                                        Industry
                                                    </span>

                                                    <strong className="small-heading">
                                                        Mechanical / Auto / Automotive, Civil /
                                                        Construction
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={jobLevelIcon}
                                                        alt="Job level"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description joblevel-icon mb-10">
                                                        Job level
                                                    </span>

                                                    <strong className="small-heading">
                                                        Experienced (Non - Manager)
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 2 */}
                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={salaryIcon}
                                                        alt="Salary"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description salary-icon mb-10">
                                                        Salary
                                                    </span>

                                                    <strong className="small-heading">
                                                        $800 - $1000
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 d-flex">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={experienceIcon}
                                                        alt="Experience"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description experience-icon mb-10">
                                                        Experience
                                                    </span>

                                                    <strong className="small-heading">
                                                        1 - 2 years
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 3 */}
                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={jobTypeIcon}
                                                        alt="Job type"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description jobtype-icon mb-10">
                                                        Job type
                                                    </span>

                                                    <strong className="small-heading">
                                                        Permanent
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={deadlineIcon}
                                                        alt="Deadline"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description mb-10">
                                                        Deadline
                                                    </span>

                                                    <strong className="small-heading">
                                                        10/08/2026
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 4 */}
                                        <div className="row mt-25">
                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={updatedIcon}
                                                        alt="Updated"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description jobtype-icon mb-10">
                                                        Updated
                                                    </span>

                                                    <strong className="small-heading">
                                                        10/07/2026
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 d-flex mt-sm-15">
                                                <div className="sidebar-icon-item">
                                                    <img
                                                        src={locationIcon}
                                                        alt="Location"
                                                    />
                                                </div>

                                                <div className="sidebar-text-info ml-10">
                                                    <span className="text-description mb-10">
                                                        Location
                                                    </span>

                                                    <strong className="small-heading">
                                                        Dallas, Texas Remote Friendly
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* =========================
                      JOB CONTENT
                  ========================== */}
                                    <div className="content-single">

                                        <h4>Welcome to AliStudio Team</h4>

                                        <p>
                                            The AliStudio Design team has a vision to
                                            establish a trusted platform that enables
                                            productive and healthy enterprises in a world of
                                            digital and remote everything, constantly
                                            changing work patterns and norms, and the need
                                            for organizational resiliency.
                                        </p>

                                        <p>
                                            The ideal candidate will have strong creative
                                            skills and a portfolio of work which demonstrates
                                            their passion for illustrative design and
                                            typography. This candidate will have experiences
                                            in working with numerous different design
                                            platforms such as digital and print forms.
                                        </p>

                                        <h4>
                                            Essential Knowledge, Skills, and Experience
                                        </h4>

                                        <ul>
                                            <li>
                                                A portfolio demonstrating well thought through
                                                and polished end to end customer journeys
                                            </li>

                                            <li>
                                                5+ years of industry experience in interactive
                                                design and / or visual design
                                            </li>

                                            <li>
                                                Excellent interpersonal skills
                                            </li>

                                            <li>
                                                Aware of trends in mobile, communications, and
                                                collaboration
                                            </li>

                                            <li>
                                                Ability to create highly polished design
                                                prototypes, mockups, and other communication
                                                artifacts
                                            </li>

                                            <li>
                                                The ability to scope and estimate efforts
                                                accurately and prioritize tasks and goals
                                                independently
                                            </li>

                                            <li>
                                                History of impacting shipping products with
                                                your work
                                            </li>

                                            <li>
                                                A Bachelor’s Degree in Design (or related
                                                field) or equivalent professional experience
                                            </li>

                                            <li>
                                                Proficiency in a variety of design tools such
                                                as Figma, Photoshop, Illustrator, and Sketch
                                            </li>
                                        </ul>

                                        <h4>Preferred Experience</h4>

                                        <ul>
                                            <li>
                                                Designing user experiences for enterprise
                                                software / services
                                            </li>

                                            <li>
                                                Creating and applying established design
                                                principles and interaction patterns
                                            </li>

                                            <li>
                                                Aligning or influencing design thinking with
                                                teams working in other geographies
                                            </li>
                                        </ul>

                                        <h4>Product Designer</h4>

                                        <p>
                                            <strong>Product knowledge:</strong> Deeply
                                            understand the technology and features of the
                                            product area to which you are assigned.
                                        </p>

                                        <p>
                                            <strong>Research:</strong> Provide human and
                                            business impact and insights for products.
                                        </p>

                                        <p>
                                            <strong>Deliverables:</strong> Create
                                            deliverables for your product area (for example
                                            competitive analyses, user flows, low fidelity
                                            wireframes, high fidelity mockups, prototypes,
                                            etc.) that solve real user problems through the
                                            user experience.
                                        </p>

                                        <p>
                                            <strong>Communication:</strong> Communicate the
                                            results of UX activities within your product area
                                            to the design team department, cross-functional
                                            partners within your product area, and other
                                            interested Superformula team members using clear
                                            language that simplifies complexity.
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ServiceResumeWriting;