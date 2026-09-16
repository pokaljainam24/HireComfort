import { useState } from "react";
import CompanyCard from "../components/CompanyCard";
import { companyCardData } from "../dummy-data/CompanyCardData";

function Company() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedLetter, setSelectedLetter] = useState("");

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <main className="main">
      {/* =========================================
          RESPONSIVE FILTER OVERLAY
      ========================================= */}
      {isFilterOpen && (
        <div
          className="company-filter-overlay"
          onClick={closeFilter}
        ></div>
      )}

      {/* =========================================
          BANNER
      ========================================= */}
      <section className="section-box-2">
        <div className="container">
          <div className="banner-hero banner-company">
            <div className="block-banner text-center">
              <h3 className="wow animate__animated animate__fadeInUp">
                Browse Companies
              </h3>

              <div
                className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                repellendus magni, <br className="d-none d-xl-block" />
                atque delectus molestias quis?
              </div>

              <div className="box-list-character">
                <ul>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <li key={letter}>
                      <a
                        href="#"
                        className={selectedLetter === letter ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedLetter(letter);
                        }}
                      >
                        {letter}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <section className="section-box mt-30">
        <div className="container">
          <div className="row flex-row-reverse">
            {/* =====================================
                COMPANY LIST
            ===================================== */}
            <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
              <div className="content-page">
                {/* =================================
                    FILTER TOP BAR
                ================================= */}
                <div className="box-filters-job">
                  <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-5 col-md-12">
                      <div className="company-mobile-filter-row">
                        {/* RESPONSIVE FILTER BUTTON */}
                        <button
                          type="button"
                          className="company-mobile-filter-btn"
                          onClick={() => setIsFilterOpen(true)}
                          aria-label="Open filters"
                        >
                          <i className="fi-rr-menu-burger"></i>
                        </button>

                        <span className="text-small text-showing">
                          Showing <strong>41-60 </strong>of{" "}
                          <strong>944 </strong>
                          jobs
                        </span>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-7 col-md-12 text-lg-end mt-sm-15">
                      <div className="display-flex2">
                        {/* SHOW */}
                        <div className="box-border mr-10">
                          <span className="text-sortby">Show:</span>

                          <div className="dropdown dropdown-sort">
                            <button
                              className="btn dropdown-toggle"
                              id="dropdownSort"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              data-bs-display="static"
                            >
                              <span>12</span>
                              <i className="fi-rr-angle-small-down"></i>
                            </button>

                            <ul
                              className="dropdown-menu dropdown-menu-light"
                              aria-labelledby="dropdownSort"
                            >
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  10
                                </a>
                              </li>

                              <li>
                                <a
                                  className="dropdown-item active"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  12
                                </a>
                              </li>

                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  20
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* SORT BY */}
                        <div className="box-border">
                          <span className="text-sortby">Sort by:</span>

                          <div className="dropdown dropdown-sort">
                            <button
                              className="btn dropdown-toggle"
                              id="dropdownSort2"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              data-bs-display="static"
                            >
                              <span>Newest Post</span>
                              <i className="fi-rr-angle-small-down"></i>
                            </button>

                            <ul
                              className="dropdown-menu dropdown-menu-light"
                              aria-labelledby="dropdownSort2"
                            >
                              <li>
                                <a
                                  className="dropdown-item active"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Newest Post
                                </a>
                              </li>

                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Oldest Post
                                </a>
                              </li>

                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Rating Post
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================
                    COMPANY CARDS
                ================================= */}
                <div className="row">
                  {companyCardData
                    .filter((company) =>
                      company.name
                        ?.trim()
                        .toUpperCase()
                        .startsWith(selectedLetter)
                    )
                    .map((company, ind) => (
                      <CompanyCard
                        key={`company-${ind}`}
                        {...company}
                      />
                    ))}
                </div>
              </div>

              {/* =================================
                  PAGINATION
              ================================= */}
              <div className="paginations">
                <ul className="pager">
                  <li>
                    <a className="pager-prev" href="#"></a>
                  </li>

                  <li>
                    <a className="pager-number" href="#">
                      1
                    </a>
                  </li>

                  <li>
                    <a className="pager-number" href="#">
                      2
                    </a>
                  </li>

                  <li>
                    <a className="pager-number" href="#">
                      3
                    </a>
                  </li>

                  <li>
                    <a className="pager-number" href="#">
                      4
                    </a>
                  </li>

                  <li>
                    <a className="pager-number" href="#">
                      5
                    </a>
                  </li>

                  <li>
                    <a className="pager-number active" href="#">
                      6
                    </a>
                  </li>

                  <li>
                    <a className="pager-number" href="#">
                      7
                    </a>
                  </li>

                  <li>
                    <a className="pager-next" href="#"></a>
                  </li>
                </ul>
              </div>
            </div>

            {/* =====================================
                FILTER SIDEBAR
            ===================================== */}
            <div className="col-lg-3 col-md-12 col-sm-12 col-12">
              <div
                className={`sidebar-shadow none-shadow mb-30 company-filter-sidebar ${isFilterOpen ? "company-filter-sidebar-open" : ""
                  }`}
              >
                <div className="sidebar-filters">

                  {/* MOBILE FILTER HEADER */}
                  <div className="company-mobile-filter-header">
                    <h5>Advance Filter</h5>

                    <button
                      type="button"
                      className="company-filter-close"
                      onClick={closeFilter}
                      aria-label="Close filters"
                    >
                      <i className="fi-rr-cross-small"></i>
                    </button>
                  </div>

                  {/* DESKTOP FILTER HEADER */}
                  <div className="filter-block head-border mb-30 company-desktop-filter-header">
                    <h5>
                      Advance Filter{" "}
                      <a
                        className="link-reset"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        Reset
                      </a>
                    </h5>
                  </div>

                  {/* MOBILE RESET */}
                  <div className="company-mobile-reset">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Reset
                    </a>
                  </div>

                  {/* LOCATION */}
                  <div className="filter-block mb-30">
                    <div className="form-group select-style select-style-icon">
                      <select className="form-control form-icons select-active">
                        <option>New York, US</option>
                        <option>London</option>
                        <option>Paris</option>
                        <option>Berlin</option>
                      </select>

                      <i className="fi-rr-marker"></i>
                    </div>
                  </div>

                  {/* INDUSTRY */}
                  <div className="filter-block mb-20">
                    <h5 className="medium-heading mb-15">
                      Industry
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["All", "180", true],
                          ["Software", "12", false],
                          ["Finance", "23", false],
                          ["Recruting", "43", false],
                          ["Management", "65", false],
                          ["Advertising", "76", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`industry-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />
                              <span className="text-small">
                                {label}
                              </span>
                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* SALARY RANGE */}
                  <div className="filter-block mb-20">
                    <h5 className="medium-heading mb-25">
                      Salary Range
                    </h5>

                    <div className="list-checkbox pb-20">
                      <div className="row position-relative mt-10 mb-20">
                        <div className="col-sm-12 box-slider-range">
                          <div id="slider-range"></div>
                        </div>

                        <div className="box-input-money">
                          <input
                            className="input-disabled form-control min-value-money"
                            type="text"
                            name="min-value-money"
                            disabled
                            value=""
                            readOnly
                          />

                          <input
                            className="form-control min-value"
                            type="hidden"
                            name="min-value"
                            value=""
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="box-number-money">
                        <div className="row mt-30">
                          <div className="col-sm-6 col-6">
                            <span className="font-sm color-brand-1">
                              $0
                            </span>
                          </div>

                          <div className="col-sm-6 col-6 text-end">
                            <span className="font-sm color-brand-1">
                              $500
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group mb-20">
                      <ul className="list-checkbox">
                        {[
                          ["All", "145", true],
                          ["$0k - $20k", "56", false],
                          ["$20k - $40k", "37", false],
                          ["$40k - $60k", "75", false],
                          ["$60k - $80k", "98", false],
                          ["$80k - $100k", "14", false],
                          ["$100k - $200k", "25", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`salary-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* POPULAR KEYWORD */}
                  <div className="filter-block mb-30">
                    <h5 className="medium-heading mb-10">
                      Popular Keyword
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["Software", "24", true],
                          ["Developer", "45", false],
                          ["Web", "57", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`keyword-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* POSITION */}
                  <div className="filter-block mb-30">
                    <h5 className="medium-heading mb-10">
                      Position
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["Senior", "12", false],
                          ["Junior", "35", true],
                          ["Fresher", "56", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`position-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* EXPERIENCE LEVEL */}
                  <div className="filter-block mb-30">
                    <h5 className="medium-heading mb-10">
                      Experience Level
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["Internship", "56", false],
                          ["Entry Level", "87", false],
                          ["Associate", "24", true],
                          ["Mid Level", "45", false],
                          ["Director", "76", false],
                          ["Executive", "89", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`experience-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ONSITE / REMOTE */}
                  <div className="filter-block mb-30">
                    <h5 className="medium-heading mb-10">
                      Onsite/Remote
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["On-site", "12", false],
                          ["Remote", "65", true],
                          ["Hybrid", "58", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`remote-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* JOB POSTED */}
                  <div className="filter-block mb-30">
                    <h5 className="medium-heading mb-10">
                      Job Posted
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["All", "78", true],
                          ["1 day", "65", false],
                          ["7 days", "24", false],
                          ["30 days", "56", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`posted-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* JOB TYPE */}
                  <div className="filter-block mb-20">
                    <h5 className="medium-heading mb-15">
                      Job type
                    </h5>

                    <div className="form-group">
                      <ul className="list-checkbox">
                        {[
                          ["Full Time", "25", false],
                          ["Part Time", "64", true],
                          ["Remote Jobs", "78", false],
                          ["Freelancer", "97", false],
                        ].map(([label, count, checked], index) => (
                          <li key={`jobtype-${index}`}>
                            <label className="cb-container">
                              <input
                                type="checkbox"
                                defaultChecked={Boolean(checked)}
                              />

                              <span className="text-small">
                                {label}
                              </span>

                              <span className="checkmark"></span>
                            </label>

                            <span className="number-item">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Company;