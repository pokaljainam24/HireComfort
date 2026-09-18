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
                          <Link to="/jobs-featured">Featured Jobs</Link>
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
                          <Link to="/services">Recruitment Services</Link>
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
                          <Link to="/blog-career-tips">Career Tips</Link>
                        </li>
                        <li>
                          <Link to="/blog-interview-tips">Interview Tips</Link>
                        </li>
                        <li>
                          <Link to="/blog-resume-tips">Resume Tips</Link>
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
                  <Link to="/login" className="btn btn-default btn-sm">
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
                    <div className="col-lg-10 col-md-12">
                      <h3>
                        Build a Resume That Gets Your Professional Experience
                        Noticed
                      </h3>

                      <div className="mt-0 mb-15">
                        <span className="card-briefcase">Resume Writing</span>

                        <span className="card-time">
                          Professional Resume Service
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-bottom pt-10 pb-10"></div>

                  {/* Main Job Image */}
                  <div className="banner-hero banner-image-single mt-10 mb-20">
                    <img src={jobImage} alt="Resume Writing Service" />
                  </div>

                  {/* =========================
                      OVERVIEW
                  ========================== */}
                  <div className="job-overview">
                    <h5 className="border-bottom pb-15 mb-30">Overview</h5>

                    {/* Row 1 */}
                    <div className="row">
                      <div className="col-md-6 d-flex">
                        <div className="sidebar-icon-item">
                          <img src={industryIcon} alt="Career Profile" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description industry-icon mb-10">
                            Career Profile
                          </span>

                          <strong className="small-heading">
                            Professional Experience, education, skills,
                            achievements, and career goals
                          </strong>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <img src={jobLevelIcon} alt="Career Stage" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description joblevel-icon mb-10">
                            Career Stage
                          </span>

                          <strong className="small-heading">
                            Based on your professional profile
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <img src={salaryIcon} alt="Target Opportunities" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description salary-icon mb-10">
                            Target Opportunities
                          </span>

                          <strong className="small-heading">
                            Roles you are targeting
                          </strong>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex">
                        <div className="sidebar-icon-item">
                          <img
                            src={experienceIcon}
                            alt="Professional Experience"
                          />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description experience-icon mb-10">
                            Professional Experience
                          </span>

                          <strong className="small-heading">
                            Your actual professional journey
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <img src={jobTypeIcon} alt="Resume Structure" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description jobtype-icon mb-10">
                            Resume Structure
                          </span>

                          <strong className="small-heading">
                            Appropriate to your profile and target position
                          </strong>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <img src={deadlineIcon} alt="Resume Focus" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description mb-10">
                            Resume Focus
                          </span>

                          <strong className="small-heading">
                            Skills, experience, education, and achievements
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="row mt-25">
                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <img src={updatedIcon} alt="Resume Approach" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description jobtype-icon mb-10">
                            Resume Approach
                          </span>

                          <strong className="small-heading">
                            Clear, structured, and relevant
                          </strong>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex mt-sm-15">
                        <div className="sidebar-icon-item">
                          <img src={locationIcon} alt="Target Opportunities" />
                        </div>

                        <div className="sidebar-text-info ml-10">
                          <span className="text-description mb-10">
                            Target Opportunities
                          </span>

                          <strong className="small-heading">
                            Experience and skills that genuinely match the role
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      JOB CONTENT
                  ========================== */}
                  <div className="content-single">
                    <h4>Understand Your Career Profile</h4>

                    <p>
                      A well-written resume helps employers quickly understand
                      your professional background, skills, experience, and
                      career goals. Our resume writing service focuses on
                      presenting your profile clearly and professionally while
                      highlighting the information most relevant to your target
                      opportunities. Every professional background is different,
                      so it is important to understand your experience,
                      education, skills, achievements, career goals, and the
                      type of roles you are targeting.
                    </p>

                    <p>
                      A strong resume should represent your actual professional
                      journey rather than using a generic format. A
                      well-organized resume makes important information easier
                      to find, and the structure should be appropriate for your
                      profile and the type of position you are targeting.
                    </p>

                    <h4>Create a Professional Resume Structure</h4>

                    <ul>
                      <li>Professional summary</li>

                      <li>Key skills</li>

                      <li>Work experience</li>

                      <li>Education</li>

                      <li>Certifications</li>

                      <li>Projects</li>

                      <li>Professional achievements</li>

                      <li>Technical skills</li>

                      <li>Relevant additional experience</li>
                    </ul>

                    <h4>Write a Strong Professional Summary</h4>

                    <ul>
                      <li>
                        Your professional summary should provide a concise
                        introduction to your experience, strengths, and career
                        direction.
                      </li>

                      <li>
                        It should help the recruiter understand your
                        professional profile without requiring them to read the
                        entire resume first.
                      </li>

                      <li>
                        Avoid overly general statements and focus on information
                        that is relevant to your target role.
                      </li>
                    </ul>

                    <h4>Highlight Your Skills</h4>

                    <p>
                      Your resume should clearly communicate the skills you can
                      bring to an organization. Depending on your profession,
                      these may include technical skills, industry knowledge,
                      communication, leadership, project management,
                      problem-solving, team collaboration, software and tools,
                      and domain-specific expertise. Only include skills that
                      accurately reflect your knowledge and experience.
                    </p>

                    <p>
                      <strong>Present Experience Effectively:</strong> Work
                      experience should explain more than your job title and
                      employment dates. Describe your key responsibilities,
                      contributions, projects, and achievements in a clear and
                      concise manner. Where possible, include measurable
                      outcomes to demonstrate the impact of your work.
                    </p>

                    <p>
                      <strong>Focus on Achievements:</strong> Recruiters want to
                      understand the value you have created in previous roles.
                      Instead of listing only responsibilities, highlight
                      meaningful accomplishments such as improving a process,
                      completing important projects, increasing efficiency,
                      managing teams, supporting customers or clients, reducing
                      costs or errors, delivering projects within deadlines, and
                      introducing new systems or processes.
                    </p>

                    <p>
                    <strong>Customize Your Resume:</strong> A single resume may not be equally
                    relevant to every position. Review the requirements of the opportunity and
                    emphasize the experience and skills that genuinely match the role.
                    Customization can make your application more relevant while keeping the
                    information accurate.
                    <br /><br />

                    <strong>Maintain Professional Formatting:</strong> A professional resume
                    should be easy to read and visually consistent. Pay attention to font
                    selection, headings, spacing, bullet points, alignment, dates, section order,
                    and page layout. Avoid unnecessary graphics, excessive colors, or complicated
                    formatting that can make important information difficult to locate.
                    <br /><br />

                    <strong>Proofread Carefully:</strong> Before submitting, check spelling,
                    grammar, contact information, employment dates, job titles, company names,
                    email address, and formatting consistency.
                    <br /><br />

                    <strong>Keep Your Resume Updated:</strong> Regularly add new skills,
                    certifications, projects, responsibilities, achievements, and professional
                    experience. An updated resume ensures that you are prepared when a suitable
                    opportunity becomes available.
                    <br /><br />

                    <strong>Our Resume Writing Approach:</strong> At HireComfort, the objective
                    is to help present your professional experience in a clear, structured, and
                    relevant format. We focus on understanding your profile, organizing your
                    information, highlighting relevant strengths, and creating professional
                    resume content that accurately represents your career journey.
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
