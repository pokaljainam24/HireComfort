import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { usePageTitle } from "./usePageTitle.ts";

const ApplicantLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = usePageTitle();

  return (
    <div className={"app-shell" + (collapsed ? " collapsed" : "")}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="main-area">
        <Header
          title={title}
          onToggleSidebar={() => setCollapsed((c) => !c)}
          onToggleMobile={() => setMobileOpen((o) => !o)}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ApplicantLayout;
