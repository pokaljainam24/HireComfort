import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { navConfig } from "@/data/navConfig";
import { Icon } from "@/components/common/Icon";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  mobileOpen,
  onCloseMobile,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    logout();
    onCloseMobile();

    await Swal.fire({
      icon: "success",
      title: "Logout Successful!",
      text: "You have been logged out successfully.",
      confirmButtonText: "OK",
    });

    navigate("/login", { replace: true });
  };

  return (
    <>
      <aside
        className={[
          "sidebar",
          collapsed ? "collapsed" : "",
          mobileOpen ? "mobile-open" : "",
        ].join(" ")}
      >
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark">
            <img src="/logo.png" alt="Admin Panel Logo" />
          </div>
        </div>

        <nav className="sidebar-nav">
          {navConfig.map((group) => (
            <div key={group.label}>
              <div className="sidebar-group-label">{group.label}</div>

              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onCloseMobile}
                  data-tooltip={item.label}
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  <span className="ic">
                    <Icon name={item.icon} />
                  </span>

                  <span className="sidebar-link-text">{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-logout">
          <button
            className="sidebar-link logout-btn"
            data-tooltip="Logout"
            onClick={handleLogout}
          >
            <span className="ic">
              <Icon name="logout" />
            </span>

            <span className="sidebar-link-text">Logout</span>
          </button>
        </div>

        <div className="sidebar-foot">v1.0.0 &middot; Admin Panel</div>
      </aside>

      <div
        className={"sidebar-overlay" + (mobileOpen ? " show" : "")}
        onClick={onCloseMobile}
      />
    </>
  );
};

export default Sidebar;
