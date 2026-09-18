// imports from packages
import { Route, Routes, useLocation } from "react-router";

// import components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";

// import styles
import "./assets/css/style.css";
import CompaniesFeatured from "./pages/CompaniesFeatured";
import Blog from "./pages/Blog";
import BlogCareerTips from "./pages/BlogCareerTips";
import BlogResumeTips from "./pages/BlogResumeTips";
import BlogInterviewTips from "./pages/BlogInterviewTips";
import Login from "./pages/Login";
import BlogDetails from "./pages/BlogDetails";
import Signup from "./pages/Signup";
import Faq from "./pages/Faq.tsx";
import VisitorTracker from "./components/VisitorCount.tsx";
import RecruiterApp from "./recruiterDashboard/RecruiterApp.tsx";
import ApplicantApp from "./ApplicantDashboard/ApplicantApp.tsx";
import JobDetails from "./pages/JobDetails.tsx";
import Services from "./pages/Services.tsx";
import ServiceResumeWriting from "./pages/ServiceResumeWriting.tsx";
import CompanyDetails from "./pages/CompanyDetails.tsx";
import MyApplicationList from "./pages/ApplicationList.tsx";


function App() {
  const location = useLocation();
  const isHomeRoute = !location.pathname.startsWith("/recruiter-panel") && !location.pathname.startsWith("/applicant-panel");

  return (
    <>
      {isHomeRoute && <Navbar />}
      <VisitorTracker />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies-featured" element={<CompaniesFeatured />} />
        <Route path="/Companies/Details" element={<CompanyDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-career-tips" element={<BlogCareerTips />} />
        <Route path="/blog-interview-tips" element={<BlogInterviewTips />} />
        <Route path="/blog-resume-tips" element={<BlogResumeTips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/recruiter-panel/*" element={<RecruiterApp />} />
        <Route path="/applicant-panel/*" element={<ApplicantApp />} />

        <Route path="/service" element={<Services />} />
        <Route path="/service-resume-writing" element={<ServiceResumeWriting />} />
        <Route
          path="/applicant-panel/applications"
          element={<MyApplicationList />}
        />
      </Routes>
      {isHomeRoute && <Footer />}
    </>
  );
}

export default App;
