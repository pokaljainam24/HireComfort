import React from "react";

interface CompanyAboutTabProps {
  htmlContent: string;
}

const CompanyAboutTab: React.FC<CompanyAboutTabProps> = ({ htmlContent }) => {
  return (
    <div className="content-single">
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>No description available.</p>
      )}
    </div>
  );
};

export default CompanyAboutTab;
