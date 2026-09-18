import { useState, useEffect } from "react";
import defaultBrandLogo from "../assets/imgs/brands/brand-1.png";

interface CompanyCardProps {
  name: string;
  companyLogo?: string;
  reviews?: number;
  location?: string;
  jobsOpen?: number;
  href?: string;
}

const CompanyCard = ({
  name,
  companyLogo,
  location = "N/A",
  jobsOpen = 0,
  href = "/Companies/Details",
}: CompanyCardProps) => {
  const initialLogo = companyLogo || defaultBrandLogo;
  const [imgSrc, setImgSrc] = useState<string>(initialLogo);

  useEffect(() => {
    setImgSrc(companyLogo || defaultBrandLogo);
  }, [companyLogo]);

  const handleImgError = () => {
    setImgSrc(defaultBrandLogo);
  };

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-30">
      <div className="card-grid-1 hover-up wow animate__animated animate__fadeIn d-flex flex-column justify-content-between h-100 p-4">
        <div>
          <div
            className="image-box d-flex align-items-center justify-content-center mx-auto mb-15"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "12px",
              border: "1px solid #e0e6f7",
              backgroundColor: "#ffffff",
              padding: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            }}
          >
            <a
              href={href}
              className="d-flex align-items-center justify-content-center w-100 h-100"
            >
              <img
                src={imgSrc || defaultBrandLogo}
                alt={name}
                onError={handleImgError}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </a>
          </div>

          <div className="info-text text-center">
            <h5 className="font-bold fs-6 fs-md-5 mb-5">
              <a href={href} className="color-brand-1">
                {name}
              </a>
            </h5>
            <div className="mt-5">
              <span
                className="card-location text-truncate d-inline-block"
                style={{ maxWidth: "100%" }}
              >
                {location}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <a className="btn btn-grey-big w-100" href="jobs-grid">
            <span>{jobsOpen}</span>
            <span> Jobs Open</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
