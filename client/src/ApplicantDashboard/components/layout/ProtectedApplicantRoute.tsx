import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";
import { getToken } from "../../api/http.ts";

const ProtectedApplicantRoute: React.FC = () => {
  const { loading } = useAuth();
  const token = getToken() || localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (loading) {
    return (
      <div className="empty-state" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading session...
      </div>
    );
  }

  if (!token || (role && role !== "applicant" && role !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedApplicantRoute;