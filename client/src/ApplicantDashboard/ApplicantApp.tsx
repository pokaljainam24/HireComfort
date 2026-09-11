import React from "react";
import { Routes, Route } from "react-router";

// Applicant panel stylesheet
import "./index.css";

import { AuthProvider } from "./context/AuthContext.tsx";

import ApplicantLayout from "./components/layout/ApplicantLayout.tsx";

import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ApplicantProfile from "./pages/Profile/ApplicantProfile.tsx";
import ChangePassword from "./pages/changePassword/ChangePassword.tsx";
import ApplicantCertificate from "./pages/Certificates/applicantCertificate.tsx";
import ApplicantEducation from "./pages/Education/applicantEducation.tsx";
import ApplicantExperience from "./pages/Experience/ApplicantExperience.tsx";
import ApplicantProject from "./pages/Project/ApplicantProject.tsx";

const ApplicantApp: React.FC = () => {


  return <AuthProvider>
    <div className="applicant-app">
      <Routes>
        <Route element={<ApplicantLayout />}>

          {/* Dashboard */}
          <Route
            index
            element={(<Dashboard />)}
          />

          {/* Applicant Profile */}
          <Route
            path="profile"
            element={<ApplicantProfile />}
          />

          {/* Applicant Education */}
          <Route
            path="applicant-education"
            element={<ApplicantEducation />}
          />

          {/* Applicant Certificates */}
          <Route
            path="applicant-certificates"
            element={<ApplicantCertificate />}
          />

          {/* Applicant Experience */}
          <Route
            path="applicant-experience"
            element={<ApplicantExperience />}
          />

          {/* Applicant Project */}
          <Route
            path="applicant-project"
            element={<ApplicantProject />}
          />

          <Route path="change-password" element={<ChangePassword />} />

        </Route>
      </Routes>
    </div>
  </AuthProvider>
};

export default ApplicantApp;