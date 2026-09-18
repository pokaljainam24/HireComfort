import { Link } from "react-router";

import careerImage from "../assets/imgs/page/job-single-2/img.png";

import careerDirectionIcon from "../assets/imgs/page/job-single/industry.svg";
import careerStageIcon from "../assets/imgs/page/job-single/job-level.svg";
import opportunityIcon from "../assets/imgs/page/job-single/salary.svg";
import skillsIcon from "../assets/imgs/page/job-single/experience.svg";
import planningIcon from "../assets/imgs/page/job-single/job-type.svg";
import jobSearchIcon from "../assets/imgs/page/job-single/deadline.svg";
import progressIcon from "../assets/imgs/page/job-single/updated.svg";
import transitionIcon from "../assets/imgs/page/job-single/location.svg";

function ServiceCareerGuidance() {
  return (
    <>
      {/* =========================
          MOBILE HEADER
      ========================== */}
      <div className="career-guidance-mobile-header mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="career-guidance-mobile-inner mobile-header-wrapper-inner">
          <div className="career-guidance-mobile-content mobile-header-content-area">
            <div className="career-guidance-mobile-scroll perfect-scroll">
              <div className="career-guidance-mobile-menu mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="career-guidance-nav mobile-menu font-heading">
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li className="has-children">
                      <Link to="/jobs">Jobs</Link>
                      <ul className="career-guidance-submenu sub-menu">
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
                      <ul className="career-guidance-submenu sub-menu">
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
                      <ul className="career-guidance-submenu sub-menu">
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
                      <ul className="career-guidance-submenu sub-menu">
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
              <div className="career-guidance-mobile-account mobile-account">
                <h6 className="mb-15">Account</h6>

                <div className="career-guidance-account-buttons d-grid gap-2">
                  <Link
                    to="/login"
                    className="career-guidance-login-btn btn btn-default btn-sm"
                  >
                    Login / Register
                  </Link>

                  <Link
                    to="/login?tab=register&type=recruiter"
                    className="career-guidance-post-btn btn btn-brand-1 btn-sm mt-10"
                  >
                    Post a Job
                  </Link>
                </div>
              </div>

              <div className="career-guidance-copyright site-copyright text-center mt-30">
                © 2026 HireComfort. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <main className="career-guidance-page-main main">
        <section className="career-guidance-section section-box mt-50">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="career-guidance-card box-border-single">
                  {/* =========================
                      PAGE HEADER
                  ========================== */}
                  <div className="career-guidance-header row mt-10">
                    <div className="col-12">
                      <h3 className="career-guidance-title">
                        Plan Your Career With Greater Clarity
                      </h3>

                      <div className="career-guidance-meta mt-0 mb-15">
                        <span className="career-guidance-service-tag card-briefcase">
                          Career Guidance
                        </span>

                        <span className="career-guidance-service-time card-time">
                          Professional Career Guidance Service
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="career-guidance-divider border-bottom pt-10 pb-10"></div>

                  {/* =========================
                      MAIN IMAGE
                  ========================== */}
                  <div className="career-guidance-banner banner-hero banner-image-single mt-10 mb-20">
                    <img
                      src={careerImage}
                      alt="Career Guidance Service"
                      className="career-guidance-image img-fluid w-100"
                    />
                  </div>

                  {/* =========================
                      OVERVIEW
                  ========================== */}
                  <div className="career-guidance-overview job-overview">
                    <h5 className="career-guidance-overview-title border-bottom pb-15 mb-30">
                      Overview
                    </h5>

                    {/* Row 1 */}
                    <div className="career-guidance-overview-row row g-4">
                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={careerDirectionIcon}
                            alt="Career Direction"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Career Direction
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Goals, skills, interests, experience, and career
                            objectives
                          </strong>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={careerStageIcon}
                            alt="Career Stage"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Career Stage
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Freshers and working professionals
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="career-guidance-overview-row row g-4 mt-1">
                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={opportunityIcon}
                            alt="Career Opportunities"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Career Opportunities
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Roles and industries aligned with your goals
                          </strong>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={skillsIcon}
                            alt="Skills Development"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Skills Development
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Skills required for your target role
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="career-guidance-overview-row row g-4 mt-1">
                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={planningIcon}
                            alt="Career Planning"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Career Planning
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Practical roadmap for professional development
                          </strong>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={jobSearchIcon}
                            alt="Job Search"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Job Search
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Resume, skills, applications, and interview
                            preparation
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="career-guidance-overview-row row g-4 mt-1">
                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={progressIcon}
                            alt="Career Progress"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Career Progress
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Regularly review and adjust your career plan
                          </strong>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-12 d-flex">
                        <div className="career-guidance-icon-box sidebar-icon-item">
                          <img
                            src={transitionIcon}
                            alt="Career Transition"
                            className="career-guidance-icon img-fluid"
                          />
                        </div>

                        <div className="career-guidance-info sidebar-text-info ms-3">
                          <span className="career-guidance-label text-description mb-2 d-block">
                            Career Transition
                          </span>

                          <strong className="career-guidance-value small-heading">
                            Structured planning for role or industry changes
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      CAREER GUIDANCE CONTENT
                  ========================== */}
                  <div className="career-guidance-content content-single">
                    <h4 className="career-guidance-heading">
                      Plan Your Career With Greater Clarity
                    </h4>

                    <p className="career-guidance-paragraph">
                      Making career decisions can be challenging when you are
                      unsure about your goals, skills, industry options, or next
                      professional step. Career guidance can help you understand
                      your options and create a practical direction based on
                      your interests, experience, and career objectives.
                    </p>

                    <h4 className="career-guidance-heading">
                      Understand Your Career Direction
                    </h4>

                    <p className="career-guidance-paragraph">
                      The first step is understanding where you currently are
                      and where you want to go.
                      <br />
                      <br />
                      Career planning can involve evaluating:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Current education</li>
                      <li>Professional experience</li>
                      <li>Skills and strengths</li>
                      <li>Interests</li>
                      <li>Career goals</li>
                      <li>Preferred industries</li>
                      <li>Desired job roles</li>
                      <li>Professional development needs</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      This creates a foundation for making more informed career
                      decisions.
                    </p>

                    <h4 className="career-guidance-heading">
                      Identify Your Strengths
                    </h4>

                    <p className="career-guidance-paragraph">
                      Understanding your strengths can help you identify roles
                      and professional environments where your existing
                      abilities can be useful.
                      <br />
                      <br />
                      Consider your:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Technical abilities</li>
                      <li>Communication skills</li>
                      <li>Leadership capabilities</li>
                      <li>Analytical skills</li>
                      <li>Creativity</li>
                      <li>Problem-solving approach</li>
                      <li>Teamwork</li>
                      <li>Industry knowledge</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      Recognizing your strengths can also help you communicate
                      your value more effectively during applications and
                      interviews.
                    </p>

                    <h4 className="career-guidance-heading">
                      Explore Career Opportunities
                    </h4>

                    <p className="career-guidance-paragraph">
                      Different industries and job roles require different
                      combinations of skills and experience. Explore roles based
                      on your qualifications, interests, experience, and
                      long-term goals.
                      <br />
                      <br />
                      Research:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Job responsibilities</li>
                      <li>Required qualifications</li>
                      <li>Skills in demand</li>
                      <li>Career progression</li>
                      <li>Industry expectations</li>
                      <li>Learning opportunities</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      Understanding the requirements of a career path can help
                      you identify the skills you need to develop.
                    </p>

                    <h4 className="career-guidance-heading">
                      Develop a Career Plan
                    </h4>

                    <p className="career-guidance-paragraph">
                      A career plan provides a practical roadmap for your
                      professional development.
                      <br />
                      <br />
                      Your plan may include:
                      <br />
                      <br />
                      <strong className="career-guidance-roadmap">
                        Current Position → Target Role → Required Skills →
                        Learning Plan → Practical Experience → Job Search
                      </strong>
                      <br />
                      <br />
                      Break larger goals into smaller and achievable steps so
                      that progress can be reviewed regularly.
                    </p>

                    <h4 className="career-guidance-heading">
                      Improve Your Skills
                    </h4>

                    <p className="career-guidance-paragraph">
                      Career development often requires continuous learning.
                      <br />
                      <br />
                      Depending on your target role, you may benefit from
                      developing:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Technical skills</li>
                      <li>Industry-specific knowledge</li>
                      <li>Communication</li>
                      <li>Leadership</li>
                      <li>Digital skills</li>
                      <li>Project management</li>
                      <li>Analytical thinking</li>
                      <li>Problem-solving</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      Identify the skills required for your target position and
                      create a learning plan around them.
                    </p>

                    <h4 className="career-guidance-heading">
                      Career Guidance for Freshers
                    </h4>

                    <p className="career-guidance-paragraph">
                      Starting a career can be difficult when you have limited
                      professional experience.
                      <br />
                      <br />
                      Freshers can focus on:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Understanding suitable career options</li>
                      <li>Building relevant skills</li>
                      <li>Creating a professional resume</li>
                      <li>Developing practical projects</li>
                      <li>Completing relevant internships</li>
                      <li>Preparing for interviews</li>
                      <li>Building professional networks</li>
                      <li>Applying for suitable entry-level opportunities</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      Practical experience can help bridge the gap between
                      education and employment.
                    </p>

                    <h4 className="career-guidance-heading">
                      Career Guidance for Working Professionals
                    </h4>

                    <p className="career-guidance-paragraph">
                      Professionals may seek guidance when they want to change
                      roles, industries, responsibilities, or career direction.
                      <br />
                      <br />
                      Career planning can include evaluating:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Current skills</li>
                      <li>Professional achievements</li>
                      <li>Transferable skills</li>
                      <li>Career growth opportunities</li>
                      <li>Additional qualifications</li>
                      <li>Target positions</li>
                      <li>Industry requirements</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      A structured review can help identify possible next steps.
                    </p>

                    <h4 className="career-guidance-heading">
                      Career Change Planning
                    </h4>

                    <p className="career-guidance-paragraph">
                      Changing careers requires careful preparation. Before
                      making a transition, understand the differences between
                      your current role and your target role.
                      <br />
                      <br />
                      Identify:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Transferable skills</li>
                      <li>Missing technical skills</li>
                      <li>Required qualifications</li>
                      <li>Relevant experience</li>
                      <li>Training requirements</li>
                      <li>Potential target roles</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      Then create a step-by-step transition plan.
                    </p>

                    <h4 className="career-guidance-heading">
                      Prepare for the Job Search
                    </h4>

                    <p className="career-guidance-paragraph">
                      Career guidance should also connect your career goals with
                      your job-search strategy.
                      <br />
                      <br />
                      Make sure your:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Resume reflects your target role</li>
                      <li>Professional profile is updated</li>
                      <li>Skills are clearly presented</li>
                      <li>Applications are relevant</li>
                      <li>Interview preparation is complete</li>
                      <li>Career goals are clearly understood</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      A focused approach can make the job-search process more
                      organized.
                    </p>

                    <h4 className="career-guidance-heading">
                      Review Your Career Progress
                    </h4>

                    <p className="career-guidance-paragraph">
                      Career planning is not a one-time activity.
                      <br />
                      <br />
                      Review your progress periodically and ask:
                    </p>

                    <ul className="career-guidance-list">
                      <li>Am I moving toward my target role?</li>
                      <li>Which skills have I developed?</li>
                      <li>What skills do I still need?</li>
                      <li>What opportunities should I explore?</li>
                      <li>Has my career goal changed?</li>
                      <li>What should my next professional step be?</li>
                    </ul>

                    <p className="career-guidance-paragraph">
                      Regular reviews allow you to adjust your plan as your
                      experience and goals evolve.
                    </p>

                    <h4 className="career-guidance-heading">
                      Our Career Guidance Approach
                    </h4>

                    <p className="career-guidance-paragraph">
                      At HireComfort, career guidance focuses on helping
                      individuals understand their career direction, identify
                      relevant opportunities, recognize skill-development areas,
                      and create practical next steps.
                      <br />
                      <br />
                      Whether you are starting your career, looking for a new
                      opportunity, or considering a career transition,
                      structured planning can help you approach your
                      professional development with greater clarity.
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

export default ServiceCareerGuidance;
