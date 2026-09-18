import React from "react";

const CompanyBanner: React.FC = () => {
  return (
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
              Discover top companies hiring now and explore your dream workplace{" "}
              <br className="d-none d-xl-block" />
              with culture insights, and active opportunities.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyBanner;
