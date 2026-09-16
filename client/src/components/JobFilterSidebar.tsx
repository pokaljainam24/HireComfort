import React from "react";
import type { JobCategory } from "../recruiterDashboard/types/jobCategory.ts";

interface JobFilterSidebarProps {
  categories: JobCategory[];
  selectedCategory: string;
  selectedJobType: string;
  jobTypes: string[];
  onCategoryChange: (catId: string) => void;
  onJobTypeChange: (type: string) => void;
  onResetFilters: (e: React.MouseEvent) => void;
}

const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({
  categories,
  selectedCategory,
  selectedJobType,
  jobTypes,
  onCategoryChange,
  onJobTypeChange,
  onResetFilters,
}) => {
  return (
    <div className="sidebar-shadow none-shadow mb-30">
      <div className="sidebar-filters">
        <div className="filter-block head-border mb-30">
          <h5>
            Advance Filter{" "}
            <a className="link-reset" href="#" onClick={onResetFilters}>
              Reset
            </a>
          </h5>
        </div>

        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-15">Job Categories</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    name="categorySidebar"
                    checked={selectedCategory === ""}
                    onChange={() => onCategoryChange("")}
                  />
                  <span className="text-small">All Categories</span>
                  <span className="checkmark"></span>
                </label>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <label className="cb-container">
                    <input
                      type="radio"
                      name="categorySidebar"
                      checked={selectedCategory === cat._id}
                      onChange={() => onCategoryChange(cat._id)}
                    />
                    <span className="text-small">{cat.name}</span>
                    <span className="checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-15">Job Type</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    name="jobTypeSidebar"
                    checked={selectedJobType === ""}
                    onChange={() => onJobTypeChange("")}
                  />
                  <span className="text-small">All Types</span>
                  <span className="checkmark"></span>
                </label>
              </li>
              {jobTypes.map((type) => (
                <li key={type}>
                  <label className="cb-container">
                    <input
                      type="radio"
                      name="jobTypeSidebar"
                      checked={selectedJobType === type}
                      onChange={() => onJobTypeChange(type)}
                    />
                    <span className="text-small">{type}</span>
                    <span className="checkmark"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilterSidebar;

