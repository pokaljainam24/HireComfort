import React, { useEffect, useState } from "react";

import { getJobCategories } from "../recruiterDashboard/api/jobCategoryApi.ts";
import { jobApi } from "../recruiterDashboard/api/jobApi.ts";

import type { JobCategory } from "../recruiterDashboard/types/jobCategory.ts";
import type { Job } from "../recruiterDashboard/types/job.ts";

import JobCard from "../components/JobCard.tsx";
import JobsBanner from "../components/JobsBanner.tsx";
import JobSortHeader from "../components/JobSortHeader.tsx";
import JobPagination from "../components/JobPagination.tsx";
import JobFilterSidebar from "../components/JobFilterSidebar.tsx";
import NewsletterBox from "../components/NewsletterBox.tsx";

const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
  "Freelance",
];

function Jobs() {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const limit = 15;

  const [loading, setLoading] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = 
    useState<string>("");

  const [selectedJobType, setSelectedJobType] =
    useState<string>("");

  const [searchKeyword, setSearchKeyword] =
    useState<string>("");

  const [activeSearch, setActiveSearch] =
    useState<string>("");

  const [sortBy, setSortBy] =
    useState<"newest" | "oldest">("newest");

  // =========================================
  // MOBILE FILTER DRAWER
  // =========================================

  const [isFilterOpen, setIsFilterOpen] =
    useState<boolean>(false);

  // =========================================
  // LOAD CATEGORIES
  // =========================================

  useEffect(() => {
    getJobCategories()
      .then((data) => {
        setCategories(data || []);
      })
      .catch((err) => {
        console.error(
          "Failed to load categories",
          err
        );
      });
  }, []);

  // =========================================
  // FETCH JOBS
  // =========================================

  useEffect(() => {
    setLoading(true);

    jobApi
      .getAll({
        page,
        limit,
        search: activeSearch,
        categoryId: selectedCategory,
        jobType: selectedJobType,
        sort: sortBy,
      })
      .then((res) => {
        setJobs(res.jobs || []);
        setTotalJobs(res.totalJobs || 0);
        setTotalPages(res.totalPages || 1);
      })
      .catch((err) => {
        console.error(
          "Failed to load jobs",
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    page,
    activeSearch,
    selectedCategory,
    selectedJobType,
    sortBy,
  ]);

  // =========================================
  // SEARCH
  // =========================================

  const handleSearchSubmit = (
    e?: React.FormEvent
  ) => {
    if (e) {
      e.preventDefault();
    }

    setPage(1);
    setActiveSearch(searchKeyword);
  };

  // =========================================
  // RESET FILTERS
  // =========================================

  const handleResetFilters = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    setSelectedCategory("");
    setSelectedJobType("");
    setSearchKeyword("");
    setActiveSearch("");
    setSortBy("newest");
    setPage(1);
  };

  // =========================================
  // CATEGORY CHANGE
  // =========================================

  const handleCategoryChange = (
    catId: string
  ) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  // =========================================
  // JOB TYPE CHANGE
  // =========================================

  const handleJobTypeChange = (
    type: string
  ) => {
    setSelectedJobType(
      type === selectedJobType ? "" : type
    );

    setPage(1);
  };

  // =========================================
  // SORT CHANGE
  // =========================================

  const handleSortChange = (
    newSort: "newest" | "oldest"
  ) => {
    setSortBy(newSort);
    setPage(1);
  };

  // =========================================
  // PAGINATION
  // =========================================

  const startItem =
    totalJobs === 0
      ? 0
      : (page - 1) * limit + 1;

  const endItem = Math.min(
    page * limit,
    totalJobs
  );

  // =========================================
  // OPEN FILTER
  // =========================================

  const openFilter = () => {
    setIsFilterOpen(true);

    // Prevent background page scrolling
    document.body.style.overflow = "hidden";
  };

  // =========================================
  // CLOSE FILTER
  // =========================================

  const closeFilter = () => {
    setIsFilterOpen(false);

    // Restore page scrolling
    document.body.style.overflow = "";
  };

  // Restore body scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <main className="main">

        {/* =========================================
            MOBILE FILTER OVERLAY
        ========================================= */}

        {isFilterOpen && (
          <div
            className="jobs-filter-overlay"
            onClick={closeFilter}
          ></div>
        )}

        {/* =========================================
            JOB BANNER
        ========================================= */}

        <JobsBanner
          totalJobs={totalJobs}
          searchValue={searchKeyword}
          onSearchChange={setSearchKeyword}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* =========================================
            JOB SECTION
        ========================================= */}

        <section className="section-box mt-30">
          <div className="container">

            <div className="row flex-row-reverse">

              {/* =====================================
                  JOB LIST
              ===================================== */}

              <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">

                <div className="content-page">

                  {/* =================================
                      MOBILE FILTER BUTTON
                  ================================= */}

                  <div className="jobs-mobile-filter-row">

                    <button
                      type="button"
                      className="jobs-mobile-filter-btn"
                      onClick={openFilter}
                      aria-label="Open filters"
                    >
                      <i className="fi-rr-menu-burger"></i>
                    </button>

                    <span className="jobs-mobile-showing">
                      Showing{" "}
                      <strong>
                        {startItem}-{endItem}
                      </strong>{" "}
                      of{" "}
                      <strong>
                        {totalJobs}
                      </strong>{" "}
                      jobs
                    </span>

                  </div>

                  {/* =================================
                      SORT HEADER
                  ================================= */}

                  <JobSortHeader
                    startItem={startItem}
                    endItem={endItem}
                    totalJobs={totalJobs}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                  />

                  {/* =================================
                      JOB CARDS
                  ================================= */}

                  <div className="row">

                    {loading ? (
                      <div className="col-12 text-center py-5">
                        <h4>
                          Loading jobs...
                        </h4>
                      </div>
                    ) : jobs.length === 0 ? (
                      <div className="col-12 text-center py-5">

                        <h4>
                          No jobs found
                        </h4>

                        <p className="text-muted">
                          Try adjusting your
                          filters or search
                          keywords.
                        </p>

                      </div>
                    ) : (
                      jobs.map((job) => (
                        <JobCard
                          key={job._id}
                          job={job}
                        />
                      ))
                    )}

                  </div>

                  {/* =================================
                      PAGINATION
                  ================================= */}

                  <JobPagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />

                </div>
              </div>

              {/* =====================================
                  FILTER SIDEBAR
              ===================================== */}

              <div className="col-lg-3 col-md-12 col-sm-12 col-12">

                <div
                  className={`jobs-filter-drawer ${
                    isFilterOpen
                      ? "jobs-filter-drawer-open"
                      : ""
                  }`}
                >

                  {/* =================================
                      MOBILE FILTER HEADER
                  ================================= */}

                  <div className="jobs-mobile-filter-header">

                    <h5>
                      Advance Filter
                    </h5>

                    <button
                      type="button"
                      className="jobs-filter-close-btn"
                      onClick={closeFilter}
                      aria-label="Close filters"
                    >
                      <i className="fi-rr-cross-small"></i>
                    </button>

                  </div>

                  {/* =================================
                      FILTER SIDEBAR
                  ================================= */}

                  <JobFilterSidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    selectedJobType={selectedJobType}
                    jobTypes={JOB_TYPES}
                    onCategoryChange={
                      handleCategoryChange
                    }
                    onJobTypeChange={
                      handleJobTypeChange
                    }
                    onResetFilters={
                      handleResetFilters
                    }
                  />

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================
            NEWSLETTER
        ========================================= */}

        <NewsletterBox />

      </main>

      
    </>
  );
}

export default Jobs;