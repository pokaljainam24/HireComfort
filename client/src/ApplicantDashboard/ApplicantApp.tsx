import React from "react";
import { Routes, Route } from "react-router";

// Applicant panel stylesheet
import "./index.css";

import { AuthProvider } from "./context/AuthContext.tsx";

import ApplicantLayout from "./components/layout/ApplicantLayout.tsx";

import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ApplicantProfile from "./pages/Profile/ApplicantProfile.tsx";

// Uncomment these when the pages are ready
// import ApplicantEducation from "./pages/Education/ApplicantEducation.tsx";
// import ApplicantCertificate from "./pages/Certificates/ApplicantCertificates.tsx";
// import ApplicantExperience from "./pages/Experience/ApplicantExperience.tsx";
// import ApplicantProject from "./pages/Project/ApplicantProject.tsx";

// =====================================
// Mounted at /applicant-panel/* from the
// main client App.tsx.
//
// Paths below are relative to the mount point.
//
// Example:
// path="applicant-profile"
// resolves to:
// /applicant-panel/applicant-profile
// =====================================

 

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
            path="applicant-profile"
            element={<ApplicantProfile />}
          />

          {/* Applicant Education */}
          {/* <Route
            path="applicant-education"
            element={<ApplicantEducation />}
          /> */}

          {/* Applicant Certificates */}
          {/* <Route
            path="applicant-certificates"
            element={<ApplicantCertificate />}
          /> */}

          {/* Applicant Experience */}
          {/* <Route
            path="applicant-experience"
            element={<ApplicantExperience />}
          /> */}

          {/* Applicant Project */}
          {/* <Route
            path="applicant-project"
            element={<ApplicantProject />}
          /> */}

        </Route>
      </Routes>
    </div>
  </AuthProvider>
};

export default ApplicantApp;