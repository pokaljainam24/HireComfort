import React from "react";
import { Icon } from "@/components/common/Icon";

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onToggleSidebar,
  onToggleMobile,
}) => {
  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("admin_panel_auth_user");

  const adminUser = storedUser ? JSON.parse(storedUser) : null;

  const username = adminUser?.username || "Admin";

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
          {/* Dynamic first letter */}
          <div className="admin-avatar">{username.charAt(0).toUpperCase()}</div>

          <div>
            {/* Dynamic username */}
            <div className="admin-chip-name">{username}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
