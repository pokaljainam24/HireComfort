import { useEffect, useState } from "react";
import logo from "../assets/imgs/logo.png";
import loadingGif from "../assets/imgs/template/loading.gif";
import { Link } from "react-router";

function Navbar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // show preloader for 1 second

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div id="preloader-active">
          <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
              <div className="text-center">
                <img src={loadingGif} alt="HireComfort" />
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="header sticky-bar">
        <div className="container">
          <div className="main-header">
            <div className="header-left">
              <div className="header-logo">
                <Link className="d-flex" to="/">
                  <img
                    src={logo}
                    alt="HireComfort"
                    style={{ width: "320px" }}
                    onClick={() => window.scrollTo(0, 0)}
                  />
                </Link>
              </div>
            </div>
            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">
                  <li>
                    <Link
                      className="active"
                      to="/"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="has-children">
                    <Link to="/jobs" onClick={() => window.scrollTo(0, 0)}>
                      Jobs
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/jobs" onClick={() => window.scrollTo(0, 0)}>
                          Browse Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/jobs-latest"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Latest Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/jobs-featured"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Featured Jobs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/jobs-remote"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Remote Jobs
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-children">
                    <Link to="/companies" onClick={() => window.scrollTo(0, 0)}>
                      Companies
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="/companies"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Browse Companies
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/companies-featured"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Featured Companies
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-children">
                    <Link to="/service" onClick={() => window.scrollTo(0, 0)}>
                      Services
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="/service"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Recruitment Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/service-resume-writing"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Resume Writing
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/service-career-guidance"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Career Guidance
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/service-executive-search"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Executive Search
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-children">
                    <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>
                      Blogs
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>
                          Latest Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog-career-tips"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Career Tips
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog-interview-tips"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Interview Tips
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blog-resume-tips"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Resume Tips
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="burger-icon burger-icon-white mt-3">
                <span className="burger-icon-top"></span>
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>
            <div className="header-right">
              <div
                className="block-signin d-flex align-items-center"
                style={{ gap: "12px" }}
              >
                <Link
                  className="btn btn-default btn-shadow hover-up"
                  to="/login"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Login / Register
                </Link>
                <Link to="/signup" className="btn btn-brand-1">
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
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
                      <Link to="/service">Services</Link>
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
                          <Link to="service-executive-search.html">
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
              <div className="mobile-account">
                <h6 className="mb-15">Account</h6>
                <div className="d-grid gap-2">
                  <Link to="/login" className="btn btn-default btn-sm">
                    Login / Register
                  </Link>
                  <Link to="/signup" className="btn btn-brand-1 btn-sm mt-10">
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
    </>
  );
}

export default Navbar;
