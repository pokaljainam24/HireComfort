import { useEffect, useState } from "react";
import NewsletterRight from "../assets/imgs/template/newsletter-right.png";
import NewsletterLeft from "../assets/imgs/template/newsletter-left.png";
import { getJobCategories } from "../recruiterDashboard/api/jobCategoryApi.ts";
import { jobApi } from "../recruiterDashboard/api/jobApi.ts";
import type { JobCategory } from "../recruiterDashboard/types/jobCategory.ts";
import type { Job } from "../recruiterDashboard/types/job.ts";
import JobCard from "../components/JobCard.tsx";
import HomePageSearchForm from "../components/HomePageSearchForm.tsx";

function Jobs() {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  // const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);


  useEffect(() => {
    Promise.all([getJobCategories(), jobApi.getAll()])
      .then(([categoriesData, jobsData]) => {
        setCategories(categoriesData || []);
        setJobs(jobsData || []);
      })
      .catch((err) => console.error("Failed to load jobs/categories", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesIndustry = selectedIndustry
      ? job.categoryId === selectedIndustry
      : true;
    // const matchesKeyword = searchKeyword
    //   ? job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    //   job.description?.toLowerCase().includes(searchKeyword.toLowerCase())
    //   : true;
    // return matchesIndustry && matchesKeyword;
    return matchesIndustry;

  });

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
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

        <section className="section-box-2">
          <div className="container">
            <div className="banner-hero banner-single banner-single-bg">
              <div className="block-banner text-center">
                <h3 className="wow animate__animated animate__fadeInUp">
                  <span className="color-brand-2">{jobs.length} Jobs</span> Available Now
                </h3>
                <div
                  className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".1s"
                >
                  Find your next dream job from top recruiters and companies worldwide.
                </div>
                <div
                  className="form-find text-start mt-40 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".2s"
                >
                  <HomePageSearchForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-30">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                <div className="content-page">
                  <div className="box-filters-job">
                    <div className="row">

                      <div className="col-xl-6 col-lg-5">
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
                            Showing <strong>1-{filteredJobs.length} </strong>of{" "}
                            <strong>{jobs.length} </strong>jobs
                          </span>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
                        <div className="display-flex2">
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
                                  <a className="dropdown-item active" href="#">
                                    Newest Post
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Oldest Post
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
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
                  <div className="row">
                    {loading ? (
                      <div className="col-12 text-center py-5">
                        <h4>Loading jobs...</h4>
                      </div>
                    ) : filteredJobs.length === 0 ? (
                      <div className="col-12 text-center py-5">
                        <h4>No jobs found</h4>
                        <p className="text-muted">Try adjusting your filters or search keywords.</p>
                      </div>
                    ) : (
                      filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
                    )}
                  </div>
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
              </div>
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

                    <div className="filter-block mb-20">
                      <h5 className="medium-heading mb-15">Industry</h5>
                      <div className="form-group">
                        <ul className="list-checkbox">
                          <li>
                            <label className="cb-container">
                              <input
                                type="radio"
                                name="industrySidebar"
                                checked={selectedIndustry === ""}
                                onChange={() => setSelectedIndustry("")}
                              />
                              <span className="text-small">All</span>
                              <span className="checkmark"></span>
                            </label>
                            <span className="number-item">{jobs.length}</span>
                          </li>
                          {categories.map((cat) => {
                            const count = jobs.filter((j) => j.categoryId === cat._id).length;
                            return (
                              <li key={cat._id}>
                                <label className="cb-container">
                                  <input
                                    type="radio"
                                    name="industrySidebar"
                                    checked={selectedIndustry === cat._id}
                                    onChange={() => setSelectedIndustry(cat._id)}
                                  />
                                  <span className="text-small">{cat.name}</span>
                                  <span className="checkmark"></span>
                                </label>
                                <span className="number-item">{count}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-25">Salary Range</h5>
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
                                disabled={false}
                                defaultValue=""
                              />
                              <input
                                className="form-control min-value"
                                type="hidden"
                                name="min-value"
                                value=""
                              />
                            </div>
                          </div>
                          <div className="box-number-money">
                            <div className="row mt-30">
                              <div className="col-sm-6 col-6">
                                <span className="font-sm color-brand-1">$0</span>
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
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">All</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">145</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$0k - $20k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$20k - $40k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">37</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$40k - $60k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">75</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$60k - $80k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">98</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$80k - $100k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">14</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$100k - $200k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">25</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Popular Keyword</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Software</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Developer</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">45</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Web</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">57</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Position</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Senior</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Junior</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">35</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Fresher</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Experience Level</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Internship</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Entry Level</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">87</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Associate</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Mid Level</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">45</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Director</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">76</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Executive</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">89</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Onsite/Remote</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">On-site</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Remote</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Hybrid</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">58</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Job Posted</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">All</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">78</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">1 day</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">7 days</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">30 days</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-15">Job type</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Full Time</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">25</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Part Time</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">64</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Remote Jobs</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">78</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Freelancer</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">97</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </section >
        <section className="section-box mt-50 mb-20">
          <div className="container">
            <div className="box-newsletter">
              <div className="row">
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={NewsletterLeft} alt="joxBox" />
                </div>
                <div className="col-lg-12 col-xl-6 col-12">
                  <h2 className="text-md-newsletter text-center">
                    New Things Will Always
                    <br /> Update Regularly
                  </h2>
                  <div className="box-form-newsletter mt-40">
                    <form className="form-newsletter">
                      <input
                        className="input-newsletter"
                        type="text"
                        defaultValue=""
                        placeholder="Enter your email here"
                      />
                      <button className="btn btn-default font-heading icon-send-letter">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={NewsletterRight} alt="joxBox" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
}

export default Jobs;
