import React from "react";

interface PageHeaderProps {
  title: string;
  section: string;
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, section, action }) => (
  <div className="page-head">
    <div>
      <h1>{title}</h1>
      <div className="crumb">
        Admin &middot; <b>{section}</b>
      </div>
    </div>
    {action}
  </div>
);

export default PageHeader;
