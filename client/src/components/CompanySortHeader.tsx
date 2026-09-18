import React from "react";

export type SortOption = "newest" | "oldest";

interface CompanySortHeaderProps {
  onOpenFilter: () => void;
  showingStart?: number;
  showingEnd?: number;
  totalCompanies?: number;
  sortBy?: string;
  onSortChange?: (newSort: string) => void;
}

const CompanySortHeader: React.FC<CompanySortHeaderProps> = ({
  onOpenFilter,
  showingStart = 0,
  showingEnd = 0,
  totalCompanies = 0,
  sortBy = "newest",
  onSortChange,
}) => {
  const sortLabelMap: Record<string, string> = {
    newest: "Newest Post",
    oldest: "Oldest Post",
  };

  const handleSelect = (sortValue: string) => {
    if (onSortChange) {
      onSortChange(sortValue);
    }
  };

  return (
    <div className="box-filters-job">
      <div className="row align-items-center">
        <div className="col-xl-6 col-lg-5 col-md-12">
          <div className="company-mobile-filter-row">
            {/* RESPONSIVE FILTER BUTTON */}
            <button
              type="button"
              className="company-mobile-filter-btn"
              onClick={onOpenFilter}
              aria-label="Open filters"
            >
              <i className="fi-rr-menu-burger"></i>
            </button>

            <span className="text-small text-showing">
              Showing{" "}
              <strong>
                {showingStart}-{showingEnd}{" "}
              </strong>
              of <strong>{totalCompanies} </strong>
              companies
            </span>
          </div>
        </div>

        <div className="col-xl-6 col-lg-7 col-md-12 text-lg-end mt-sm-15">
          <div className="display-flex2">
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
                  <span>{sortLabelMap[sortBy] || "Newest Post"}</span>
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
                        handleSelect("newest");
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
                        handleSelect("oldest");
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

export default CompanySortHeader;
