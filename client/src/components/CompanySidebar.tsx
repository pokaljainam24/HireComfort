import React from "react";
import shareFb from "../assets/imgs/template/icons/share-fb.svg";
import shareInstagram from "../assets/imgs/template/icons/instagram.jpeg";
import shareTw from "../assets/imgs/template/icons/share-tw.svg";
import linkedinIcon from "../assets/imgs/template/icons/linkedin.svg";

interface CompanySidebarProps {
  companyName: string;
  location: string;
  field: string;
  exactLocation: string;
  memberSince: string;
  addressLines: string[];
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  contactUrl?: string;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({
  companyName,
  location,
  field,
  exactLocation,
  memberSince,
  addressLines,
  phone,
  email,
  website,
  facebook,
  twitter,
  linkedin,
  instagram,
}) => {
  const hasSocials = Boolean(facebook || twitter || linkedin || instagram);
  return (
    <div className="sidebar-border">
      <div className="sidebar-heading">
        <div className="avatar-sidebar">
          <div className="sidebar-info pl-0">
            <span className="sidebar-company">{companyName}</span>
            <span className="card-location">{location}</span>
          </div>
        </div>
      </div>
      <div className="sidebar-list-job">
        <ul>
          <li>
            <div className="sidebar-icon-item">
              <i className="fi-rr-briefcase"></i>
            </div>
            <div className="sidebar-text-info">
              <span className="text-description">Industry</span>
              <strong className="small-heading">{field}</strong>
            </div>
          </li>
          <li>
            <div className="sidebar-icon-item">
              <i className="fi-rr-marker"></i>
            </div>
            <div className="sidebar-text-info">
              <span className="text-description">Location</span>
              <strong className="small-heading">{exactLocation}</strong>
            </div>
          </li>
          <li>
            <div className="sidebar-icon-item">
              <i className="fi-rr-clock"></i>
            </div>
            <div className="sidebar-text-info">
              <span className="text-description">Member Since</span>
              <strong className="small-heading">{memberSince}</strong>
            </div>
          </li>
        </ul>
      </div>
      <div className="sidebar-list-job">
        <ul className="ul-disc">
          {addressLines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
          {phone && <li>Phone: {phone}</li>}
          {email && <li>Email: {email}</li>}
          {website && (
            <li>
              Website:{" "}
              <a
                href={
                  website.startsWith("http") ? website : `https://${website}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {website}
              </a>
            </li>
          )}
        </ul>
        {hasSocials && (
          <div className="mt-20">
            <span className="text-description d-block mb-10">Social Links</span>
            <div className="share-social d-flex align-items-center flex-wrap gap-2">
              {facebook && (
                <a
                  className="mr-10 d-inline-flex align-items-center justify-content-center"
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <img
                    src={shareFb}
                    alt="Facebook"
                    width={35}
                    height={35}
                    style={{
                      display: "inline-block",
                      objectFit: "contain",
                    }}
                  />
                </a>
              )}
              {twitter && (
                <a
                  className="mr-10 d-inline-flex align-items-center justify-content-center"
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                >
                  <img
                    src={shareTw}
                    alt="Twitter"
                    width={35}
                    height={35}
                    style={{
                      display: "inline-block",
                      objectFit: "contain",
                    }}
                  />
                </a>
              )}
              {linkedin && (
                <a
                  className="mr-10 d-inline-flex align-items-center justify-content-center"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <img
                    src={linkedinIcon}
                    alt="LinkedIn"
                    width={35}
                    height={35}
                    style={{
                      display: "inline-block",
                      objectFit: "contain",
                    }}
                  />
                </a>
              )}
              {instagram && (
                <a
                  className="mr-10 d-inline-flex align-items-center justify-content-center"
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                >
                  <img
                    src={shareInstagram}
                    alt="Instagram"
                    width={35}
                    height={35}
                    style={{
                      display: "inline-block",
                      objectFit: "contain",
                    }}
                  />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySidebar;
