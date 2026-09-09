import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import CompanyProfile from "@/pages/company/CompanyProfile";
import RecruiterProfile from "@/pages/recruiterProfile/RecruiterProfile";
import PostJob from "@/pages/jobs/PostJob";
import ManageJobs from "@/pages/jobs/ManageJobs";
import Applications from "@/pages/applications/Applications";
import ApplicationDetail from "@/pages/applications/ApplicationDetail";
import ChangePassword from "@/pages/account/ChangePassword";

const App: React.FC = () => (
  <Routes>
    <Route element={<AdminLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
      <Route path="/recruiter-profile" element={<RecruiterProfile />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/post-job/:id" element={<PostJob />} />
      <Route path="/manage-jobs" element={<ManageJobs />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/applications/:id" element={<ApplicationDetail />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Route>
  </Routes>
);

export default App;
