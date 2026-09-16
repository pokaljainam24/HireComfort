import React from "react";

interface JobSortHeaderProps {
  startItem: number;
  endItem: number;
  totalJobs: number;
  sortBy: "newest" | "oldest";
  onSortChange: (sort: "newest" | "oldest") => void;
}

const JobSortHeader: React.FC<JobSortHeaderProps> = ({
  startItem,
  endItem,
  totalJobs,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="box-filters-job">
      <div className="row">
        <div className="col-xl-6 col-lg-5">
          <span className="text-small text-showing">
            Showing <strong>{startItem}-{endItem}</strong> of{" "}
            <strong>{totalJobs}</strong> jobs
          </span>
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
                  <span>{sortBy === "newest" ? "Newest Post" : "Oldest Post"}</span>
                  <i className="fi-rr-angle-small-down"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-light"
                  aria-labelledby="dropdownSort2"
                >
                  <li>
                    <a
                      className={`dropdown-item ${sortBy === "newest" ? "active" : ""}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onSortChange("newest");
                      }}
                    >
                      Newest Post
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${sortBy === "oldest" ? "active" : ""}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onSortChange("oldest");
                      }}
                    >
                      Oldest Post
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSortHeader;

