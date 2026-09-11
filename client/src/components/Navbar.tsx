
import { useEffect, useState, useRef } from "react";

import logo from "../assets/imgs/logo.png";

import loadingGif from "../assets/imgs/template/loading.gif";

import { Link } from "react-router";

interface LoggedInUser {
  firstName?: string;
  lastName?: string;
  userName?: string;
  profilePic?: string;
}

function Navbar() {
  const [loading, setLoading] = useState(true);
  const userType = localStorage.getItem("role") ?? "";

  const [user, setUser] =
    useState<LoggedInUser | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  // =====================================
  // PROFILE DROPDOWN
  // =====================================

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileMenuRef = useRef<HTMLDivElement | null>(
    null,
  );

  // =====================================
  // PRELOADER
  // =====================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // =====================================
  // CHECK LOGIN
  // =====================================

  useEffect(() => {
    const checkLogin = () => {
      const storedToken =
        localStorage.getItem("token");

      const storedUser =
        localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const parsedUser =
            JSON.parse(storedUser);

          setToken(storedToken);
          setUser(parsedUser);
        } catch (error) {
          console.error(
            "Failed to parse logged-in user:",
            error,
          );

          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");

          setToken(null);
          setUser(null);
        }
      } else {
        setToken(null);
        setUser(null);
      }
    };

    checkLogin();

    window.addEventListener(
      "storage",
      checkLogin,
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkLogin,
      );
    };
  }, []);

  // =====================================
  // CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
  // =====================================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target as Node,
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  // =====================================
  // PROFILE IMAGE
  // =====================================

  const getProfileImage = () => {
    if (!user?.profilePic) {
      return "/assets/imgs/avatar/default-avatar.png";
    }

    if (
      user.profilePic.startsWith("http://") ||
      user.profilePic.startsWith("https://")
    ) {
      return user.profilePic;
    }

    return `http://localhost:5000/${user.profilePic.replace(
      /^\/+/,
      "",
    )}`;
  };

  // =====================================
  // USER NAME
  // =====================================

  const getUserName = () => {
    if (user?.firstName) {
      return `${user.firstName}${user.lastName
        ? ` ${user.lastName}`
        : ""
        }`;
    }

    if (user?.userName) {
      return user.userName;
    }

    return "My Profile";
  };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setProfileOpen(false);

    window.location.href = "/login";
  };

  // =====================================
  // TOGGLE PROFILE DROPDOWN
  // =====================================

  const toggleProfileDropdown = () => {
    setProfileOpen((previous) => !previous);
  };

  // =====================================
  // CLOSE DROPDOWN
  // =====================================

  const closeProfileDropdown = () => {
    setProfileOpen(false);
  };

  return (
    <>
      {/* =====================================
          PRELOADER
      ===================================== */}

      {loading && (
        <div id="preloader-active">
          <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
              <div className="text-center">
                <img
                  src={loadingGif}
                  alt="HireComfort"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          DESKTOP HEADER
      ===================================== */}

      <header className="header sticky-bar">
        <div className="container">
          <div className="main-header">

            {/* =====================================
                LOGO
            ===================================== */}

            <div className="header-left">
              <div className="header-logo">
                <Link
                  className="d-flex"
                  to="/"
                >
                  <img
                    src={logo}
                    alt="HireComfort"
                    style={{
                      width: "320px",
                    }}
                    onClick={() =>
                      window.scrollTo(0, 0)
                    }
                  />
                </Link>
              </div>
            </div>

            {/* =====================================
                DESKTOP NAVIGATION
            ===================================== */}

            <div className="header-nav">
              <nav className="nav-main-menu">
                <ul className="main-menu">

                  {/* HOME */}

                  <li>
                    <Link
                      className="active"
                      to="/"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Home
                    </Link>
                  </li>

                  {/* JOBS */}

                  <li className="has-children">
                    <Link
                      to="/jobs"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Jobs
                    </Link>

                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="/jobs"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Browse Jobs
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/jobs-latest"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Latest Jobs
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/jobs-featured"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Featured Jobs
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/jobs-remote"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Remote Jobs
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* COMPANIES */}

                  <li className="has-children">
                    <Link
                      to="/companies"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Companies
                    </Link>

                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="/companies"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Browse Companies
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/companies-featured"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Featured Companies
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* SERVICES */}

                  <li className="has-children">
                    <Link
                      to="/service"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Services
                    </Link>

                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="/service"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Recruitment Services
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/service-resume-writing"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Resume Writing
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/service-career-guidance"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Career Guidance
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/service-executive-search"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Executive Search
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* BLOGS */}

                  <li className="has-children">
                    <Link
                      to="/blog"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Blogs
                    </Link>

                    <ul className="sub-menu">
                      <li>
                        <Link
                          to="/blog"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Latest Blogs
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/blog-career-tips"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Career Tips
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/blog-interview-tips"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Interview Tips
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/blog-resume-tips"
                          onClick={() =>
                            window.scrollTo(0, 0)
                          }
                        >
                          Resume Tips
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* ABOUT */}

                  <li>
                    <Link
                      to="/about"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      About Us
                    </Link>
                  </li>

                  {/* CONTACT */}

                  <li>
                    <Link
                      to="/contact"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Contact
                    </Link>
                  </li>

                </ul>
              </nav>

              {/* BURGER */}

              <div className="burger-icon burger-icon-white mt-3">
                <span className="burger-icon-top"></span>
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>

            {/* =====================================
                DESKTOP RIGHT SIDE
            ===================================== */}

            <div className="header-right">
              <div
                className="block-signin d-flex align-items-center"
                style={{
                  gap: "12px",
                }}
              >

                {/* LOGGED OUT */}

                {!token ? (
                  <>
                    <Link
                      className="btn btn-default btn-shadow hover-up"
                      to="/login"
                      onClick={() =>
                        window.scrollTo(0, 0)
                      }
                    >
                      Login / Register
                    </Link>

                    <Link
                      to="/signup"
                      className="btn btn-brand-1"
                    >
                      Post a Job
                    </Link>
                  </>
                ) : (

                  /* LOGGED IN */

                  <div
                    ref={profileMenuRef}
                    className="profile-menu"
                    style={{
                      position: "relative",
                    }}
                  >

                    {/* PROFILE TRIGGER */}

                    <div
                      className="profile-trigger d-flex align-items-center"
                      style={{
                        gap: "10px",
                        cursor: "pointer",
                      }}
                      onClick={
                        toggleProfileDropdown
                      }
                    >

                      {/* NAME */}

                      <span
                        style={{
                          fontWeight: 500,
                          color: "#25324B",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {getUserName()}
                      </span>

                      {/* PROFILE PHOTO */}

                      <img
                        src={getProfileImage()}
                        alt="Profile"
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #eee",
                        }}
                      />

                      <i
                        className={
                          profileOpen
                            ? "bi bi-chevron-up"
                            : "bi bi-chevron-down"
                        }
                      ></i>
                    </div>

                    {/* PROFILE DROPDOWN */}

                    <div
                      className={`profile-dropdown ${profileOpen
                        ? "profile-dropdown-open"
                        : ""
                        }`}
                    >

                      <Link
                        to={userType ? `${userType}-panel/profile` : "/login"}
                        className="profile-dropdown-item"
                        onClick={
                          closeProfileDropdown
                        }
                      >
                        <i className="bi bi-person"></i>
                        <span>My Profile</span>
                      </Link>

                      <button
                        type="button"
                        className="profile-dropdown-item"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                      </button>

                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* =====================================
          MOBILE HEADER
      ===================================== */}

      <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar">
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">
            <div className="perfect-scroll">

              {/* MOBILE MENU */}

              <div className="mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="mobile-menu font-heading">

                    <li>
                      <Link to="/">
                        Home
                      </Link>
                    </li>

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

                    <li className="has-children">
                      <Link to="/service">
                        Services
                      </Link>

                      <ul className="sub-menu">
                        <li>
                          <Link to="/service">
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

                    <li>
                      <Link to="/about">
                        About Us
                      </Link>
                    </li>

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

                {!token ? (
                  <div className="d-grid gap-2">

                    <Link
                      to="/login"
                      className="btn btn-default btn-sm"
                    >
                      Login / Register
                    </Link>

                    <Link
                      to="/signup"
                      className="btn btn-brand-1 btn-sm mt-10"
                    >
                      Post a Job
                    </Link>

                  </div>
                ) : (

                  <div className="d-grid gap-2">

                    {/* MOBILE PROFILE */}

                    <div
                      className="profile-menu"
                      style={{
                        position: "relative",
                      }}
                    >

                      {/* MOBILE PROFILE TRIGGER */}

                      <div
                        className="profile-trigger d-flex align-items-center"
                        style={{
                          gap: "10px",
                          cursor: "pointer",
                          padding: "10px 0",
                        }}
                        onClick={
                          toggleProfileDropdown
                        }
                      >

                        {/* NAME */}

                        <span
                          style={{
                            fontWeight: 500,
                            color: "#25324B",
                          }}
                        >
                          {getUserName()}
                        </span>

                        {/* PROFILE PHOTO */}

                        <img
                          src={getProfileImage()}
                          alt="Profile"
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />

                        <i
                          className={
                            profileOpen
                              ? "bi bi-chevron-up"
                              : "bi bi-chevron-down"
                          }
                        ></i>

                      </div>

                      {/* MOBILE PROFILE DROPDOWN */}

                      <div
                        className={`profile-dropdown ${profileOpen
                          ? "profile-dropdown-open"
                          : ""
                          }`}
                      >

                        <Link
                          to={`${userType}-panel/profile`}
                          className="profile-dropdown-item"
                          onClick={
                            closeProfileDropdown
                          }
                        >
                          <i className="bi bi-person"></i>
                          <span>My Profile</span>
                        </Link>

                        <button
                          type="button"
                          className="profile-dropdown-item"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Logout</span>
                        </button>

                      </div>

                    </div>

                  </div>
                )}
              </div>

              {/* COPYRIGHT */}

              <div className="site-copyright text-center mt-30">
                © 2026 HireComfort. All Rights Reserved.
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          PROFILE DROPDOWN CSS
      ===================================== */}

      <style>
        {`
          .profile-dropdown {
            display: none;
            position: absolute;
            top: 55px;
            right: 0;
            min-width: 180px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
            padding: 8px 0;
            z-index: 9999;
          }

          .profile-dropdown-open {
            display: block;
          }

          .profile-dropdown-item {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 10px 16px;
            border: none;
            background: transparent;
            color: #25324B;
            text-decoration: none;
            cursor: pointer;
            text-align: left;
            font-size: 14px;
          }

          .profile-dropdown-item:hover {
            background: #f5f5f5;
          }
        `}
      </style>
    </>
  );
}

export default Navbar;

