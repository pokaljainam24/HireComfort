import React from "react";
import { Routes, Route } from "react-router";

// Recruiter panel's own stylesheet. Every rule in it is scoped under
// .recruiter-app (see index.css), so it never leaks out and affects the
// public site's styling.
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import RecruiterProfile from "./pages/recruiterProfile/RecruiterProfile.tsx";
import PostJob from "./pages/jobs/PostJob.tsx";
import ManageJobs from "./pages/jobs/ManageJobs.tsx";
import Applications from "./pages/applications/Applications.tsx";
import ApplicationDetail from "./pages/applications/ApplicationDetail.tsx";
import ChangePassword from "./pages/account/ChangePassword.tsx";
import CompanyProfile from "./pages/company/CompanyProfile.tsx";

import ProtectedRecruiterRoute from "./components/layout/ProtectedRecruiterRoute.tsx";

// =====================================
// Mounted at /recruiter/* from the main client App.tsx.
// Paths below are relative to that mount point, e.g.
// path="company-profile" resolves to /recruiter/company-profile.
// =====================================
const RecruiterApp: React.FC = () => (
  <AuthProvider>
    <div className="recruiter-app">
      <Routes>
        <Route element={<ProtectedRecruiterRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="profile" element={<RecruiterProfile />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="post-job/:id" element={<PostJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetail />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </div>
  </AuthProvider>
);

export default RecruiterApp;
