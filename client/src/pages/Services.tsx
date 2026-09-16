import { Link } from "react-router";

// =====================================
// IMAGES
// =====================================

import profileImg from "../assets/imgs/page/homepage5/img-profile.png";
import jobSearchImg from "../assets/imgs/page/homepage3/img-job-search.png";

function Services() {
  return (
    <>

      {/* =====================================
          MOBILE HEADER
      ===================================== */}

      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">

            <div className="perfect-scroll">

              <div className="mobile-menu-wrap mobile-header-border">

                <nav>
                  <ul className="mobile-menu font-heading">

                    {/* HOME */}
                    <li>
                      <Link to="/">
                        Home
                      </Link>
                    </li>

                    {/* JOBS */}
                    <li className="has-children">

                      <Link to="/jobs">
                        Jobs
                      </Link>

                      <ul className="sub-menu">

                        <li>
                          <Link to="/jobs">
                            Browse Jobs
                          </Link>
                        </li>

                        <li>
                          <Link to="/jobs-latest">
                            Latest Jobs
                          </Link>
                        </li>

                        <li>
                          <Link to="/jobs-featured">
                            Featured Jobs
                          </Link>
                        </li>

                        <li>
                          <Link to="/jobs-remote">
                            Remote Jobs
                          </Link>
                        </li>

                      </ul>

                    </li>

                    {/* COMPANIES */}
                    <li className="has-children">

                      <Link to="/companies">
                        Companies
                      </Link>

                      <ul className="sub-menu">

                        <li>
                          <Link to="/companies">
                            Browse Companies
                          </Link>
                        </li>

                        <li>
                          <Link to="/companies-featured">
                            Featured Companies
                          </Link>
                        </li>

                      </ul>

                    </li>

                    {/* SERVICES */}
                    <li className="has-children">

                      <Link to="/services">
                        Services
                      </Link>

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

                    {/* BLOG */}
                    <li className="has-children">

                      <Link to="/blog">
                        Blogs
                      </Link>

                      <ul className="sub-menu">

                        <li>
                          <Link to="/blog">
                            Latest Blogs
                          </Link>
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

                    {/* ABOUT */}
                    <li>
                      <Link to="/about">
                        About Us
                      </Link>
                    </li>

                    {/* CONTACT */}
                    <li>
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </li>

                  </ul>
                </nav>

              </div>

              {/* MOBILE ACCOUNT */}
              <div className="mobile-account">

                <h6 className="mb-15">
                  Account
                </h6>

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

              {/* MOBILE COPYRIGHT */}
              <div className="site-copyright text-center mt-30">
                © 2026 HireComfort. All Rights Reserved.
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="main">

        {/* =====================================
            BREADCRUMB
        ===================================== */}

        <section className="section-box">

          <div className="breacrumb-cover bg-img-about">

            <div className="container">

              <div className="row align-items-center">

                {/* LEFT */}
                <div className="col-lg-6">

                  <h2 className="mb-10">
                    About Us
                  </h2>

                  <p className="font-lg color-text-paragraph-2">
                    Get the latest news, updates and tips
                  </p>

                </div>

                {/* RIGHT */}
                <div className="col-lg-6 text-lg-end">

                  <ul className="breadcrumbs mt-40">

                    <li>
                      <Link
                        className="home-icon"
                        to="/"
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      About Us
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            CREATE PROFILE
        ===================================== */}

        <section className="section-box mb-30 bg-border-3 pt-100 pb-100">

          <div className="container">

            <div className="row align-items-center">

              {/* IMAGE */}
              <div className="col-lg-6">

                <img
                  className="bdrd-10 w-100"
                  src={profileImg}
                  alt="Create Profile"
                  style={{
                    display: "block",
                    height: "auto",
                  }}
                />

              </div>

              {/* CONTENT */}
              <div className="col-lg-6">

                <div className="pl-30">

                  <h5 className="color-brand-2 mb-15 mt-15">
                    Create Profile
                  </h5>

                  <h2 className="color-brand-1 mt-0 mb-15">
                    Create Your Personal Account Profile
                  </h2>

                  <p className="font-lg color-text-paragraph-2">
                    Work Profile is a personality assessment that
                    measures an individual's work personality through
                    their workplace traits, social and emotional traits;
                    as well as the values and aspirations that drive
                    them forward.
                  </p>

                  <div className="mt-20">

                    <Link
                      className="btn btn-default"
                      to="/login"
                    >
                      Create Profile
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            HOW IT WORKS
        ===================================== */}

        <section className="section-box mt-70 mb-40">

          <div className="container">

            {/* TITLE */}
            <div className="text-start">

              <h2 className="section-title mb-10">
                How It Works
              </h2>

              <p className="font-lg color-text-paragraph-2">
                Just via some simple steps, you will find your ideal
                candidates you're looking for!
              </p>

            </div>

            {/* STEPS */}
            <div className="mt-70">

              <div className="row">

                {/* STEP 1 */}
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">

                  <div className="box-step step-1">

                    <h1 className="number-element">
                      1
                    </h1>

                    <h4 className="mb-20">
                      Register an
                      <br className="d-none d-lg-block" />
                      account to start
                    </h4>

                    <p className="font-lg color-text-paragraph-2">
                      Lorem ipsum dolor sit amet,
                      <br className="d-none d-lg-block" />
                      consectetur adipisicing elit, sed do
                    </p>

                  </div>

                </div>

                {/* STEP 2 */}
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">

                  <div className="box-step step-2">

                    <h1 className="number-element">
                      2
                    </h1>

                    <h4 className="mb-20">
                      Explore over
                      <br className="d-none d-lg-block" />
                      thousands of resumes
                    </h4>

                    <p className="font-lg color-text-paragraph-2">
                      Lorem ipsum dolor sit amet,
                      <br className="d-none d-lg-block" />
                      consectetur adipisicing elit, sed do
                    </p>

                  </div>

                </div>

                {/* STEP 3 */}
                <div className="col-lg-4 col-md-6 col-sm-12 mb-30">

                  <div className="box-step">

                    <h1 className="number-element">
                      3
                    </h1>

                    <h4 className="mb-20">
                      Find the most
                      <br className="d-none d-lg-block" />
                      suitable candidate
                    </h4>

                    <p className="font-lg color-text-paragraph-2">
                      Lorem ipsum dolor sit amet,
                      <br className="d-none d-lg-block" />
                      consectetur adipisicing elit, sed do
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-50 text-center">

              <Link
                className="btn btn-default"
                to="/login"
              >
                Get Started
              </Link>

            </div>

          </div>

        </section>

        {/* =====================================
            JOB SEARCH
        ===================================== */}

        <section className="section-box bg-15 pt-50 pb-50 mt-80">

          <div className="container">

            <div className="row align-items-center">

              {/* IMAGE */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text-center mb-30">

                <img
                  className="img-job-search mt-20"
                  src={jobSearchImg}
                  alt="Job Search"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "inline-block",
                  }}
                />

              </div>

              {/* CONTENT */}
              <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">

                <h2 className="mb-40">
                  Job search for people passionate about startup
                </h2>

                {/* CREATE ACCOUNT */}
                <div className="box-checkbox mb-30">

                  <h6>
                    Create an account
                  </h6>

                  <p className="font-md color-text-paragraph-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Donec nec justo a quam varius maximus.
                    Maecenas sodales tortor quis tincidunt commodo.
                  </p>

                </div>

                {/* SEARCH JOBS */}
                <div className="box-checkbox mb-30">

                  <h6>
                    Search for Jobs
                  </h6>

                  <p className="font-md color-text-paragraph-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Donec nec justo a quam varius maximus.
                    Maecenas sodales tortor quis tincidunt commodo.
                  </p>

                </div>

                {/* SAVE APPLY */}
                <div className="box-checkbox mb-30">

                  <h6>
                    Save &amp; Apply
                  </h6>

                  <p className="font-md color-text-paragraph-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Donec nec justo a quam varius maximus.
                    Maecenas sodales tortor quis tincidunt commodo.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </>
  );
}

export default Services;