import React from "react";
import { useAuth } from "../../context/AuthContext.tsx";
import { Icon } from "../common/Icon.tsx";

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onToggleSidebar, onToggleMobile }) => {
  const { user } = useAuth();
  const initial = user?.fullName?.trim()?.[0]?.toUpperCase() || "A";

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="icon-btn only-desktop"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Icon name="menu" />
        </button>
        <button
          className="icon-btn only-mobile"
          onClick={onToggleMobile}
          aria-label="Open menu"
        >
          <Icon name="menu" />
        </button>
        <span className="page-title">{title}</span>
      </div>

      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          <Icon name="bell" />
        </button>
        <div className="admin-chip">
          <div className="admin-avatar">{initial}</div>
          <div className="admin-chip-info">
            <div className="admin-chip-name">{user?.fullName || "Applicant"}</div>
            <div className="admin-chip-role">Applicant</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
