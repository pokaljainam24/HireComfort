import React from "react";
import HomePageSearchForm from "./HomePageSearchForm.tsx";

interface JobsBannerProps {
  totalJobs: number;
  searchValue: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
}

const JobsBanner: React.FC<JobsBannerProps> = ({
  totalJobs,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <section className="section-box-2">
      <div className="container">
        <div className="banner-hero banner-single banner-single-bg">
          <div className="block-banner text-center">
            <h3 className="wow animate__animated animate__fadeInUp">
              <span className="color-brand-2">{totalJobs} Jobs</span> Available Now
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
              <HomePageSearchForm
                searchValue={searchValue}
                onSearchChange={onSearchChange}
                onSearchSubmit={onSearchSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsBanner;
