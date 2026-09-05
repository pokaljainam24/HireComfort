import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import CountryMaster from "@/pages/country/CountryMaster";
import StateMaster from "@/pages/state/StateMaster";
import CityMaster from "@/pages/city/CityMaster";
import JobCategoryMaster from "@/pages/jobcategory/JobCategoryMaster";
import JobSubCategoryMaster from "@/pages/jobsubcategory/JobSubCategoryMaster";
import BlogsMaster from "@/pages/blogs/BlogsMaster";
import CMSMaster from "@/pages/cms/CMSMaster";
import NewsletterMaster from "@/pages/newsletter/NewsletterMaster";
import ContactMaster from "@/pages/contact/ContactMaster";
import FaqMaster from "./pages/Faq/FaqMaster.js";
import EmailCredentialMaster from "./pages/emailCredential/EmailCredentialMaster.js";
import EmailTemplateMaster from "./pages/emailTemplates/EmailTemplateMaster.js";
import SkillsMaster from "./pages/skills/SkillsMaster.js";
import QualificationMaster from "./pages/qualifications/QualificationMaster.js";
import employmentTypesMaster from "./pages/EmploymentTypes/EmploymentTypes.js";
import industryTypesMaster from "./pages/Industry/IndustryTypes.js";
import EmploymentTypes from "./pages/EmploymentTypes/EmploymentTypes.js";
import IndustryTypes from "./pages/Industry/IndustryTypes.js";

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/" element={<Dashboard />} />
      <Route path="/country-master" element={<CountryMaster />} />
      <Route path="/state-master" element={<StateMaster />} />
      <Route path="/city-master" element={<CityMaster />} />
      <Route path="/job-category" element={<JobCategoryMaster />} />
      <Route path="/job-sub-category" element={<JobSubCategoryMaster />} />
      <Route path="/blogs" element={<BlogsMaster />} />
      <Route path="/cms" element={<CMSMaster />} />
      <Route path="/newsletter" element={<NewsletterMaster />} />
      <Route path="/contact" element={<ContactMaster />} />
      <Route path="/faq" element={<FaqMaster />} />
      <Route path="/email-credential" element={<EmailCredentialMaster />} />
      <Route path="/email-templates" element={<EmailTemplateMaster />} />
      <Route path="/skills-master" element={<SkillsMaster />} />
      <Route path="/qualification-master" element={<QualificationMaster />} />
      <Route path="/employment-types" element={<EmploymentTypes />} />
      <Route path="/industry" element={<IndustryTypes />} />
    </Route>
  </Routes>
);

export default App;
