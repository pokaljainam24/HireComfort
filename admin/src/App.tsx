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
    </Route>
  </Routes>
);

export default App;
