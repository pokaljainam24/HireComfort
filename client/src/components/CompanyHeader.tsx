import React from "react";

interface CompanyHeaderProps {
  bannerImg: string;
  logoImg: string;
  companyName: string;
  location: string;
  contactUrl?: string;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  bannerImg,
  logoImg,
  companyName,
  location,
}) => {
  return (
    <section className="section-box-2">
      <div className="container">
        <div
          className="banner-hero banner-image-single"
          style={{
            maxHeight: "250px",
            overflow: "hidden",
            borderRadius: "16px",
          }}
        >
          <img
            src={bannerImg}
            alt={companyName}
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
          />
        </div>
        <div className="box-company-profile">
          <div className="image-compay">
            <img
              src={logoImg}
              alt={companyName}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            className="row align-items-center"
            style={{ paddingLeft: "115px" }}
          >
            <div className="col-lg-8 col-md-12">
              <h5 className="f-18 mb-0">
                {companyName}{" "}
                <span className="card-location font-regular ml-20">
                  {location}
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="border-bottom pt-10 pb-10"></div>
      </div>
    </section>
  );
};

export default CompanyHeader;
