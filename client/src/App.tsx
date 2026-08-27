// imports from packages
import { Route, Routes } from "react-router";

// import components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import JobsLatest from "./pages/JobsLatest";
import JobsRemote from "./pages/JobsRemote";
import JobsFeatured from "./pages/JobsFeatured";
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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs-latest" element={<JobsLatest />} />
        <Route path="/jobs-featured" element={<JobsFeatured />} />
        <Route path="/jobs-remote" element={<JobsRemote />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/jobs-remote" element={<JobsRemote />} />
        <Route path="/companies-featured" element={<CompaniesFeatured />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-career-tips" element={<BlogCareerTips />} />
        <Route path="/blog-interview-tips" element={<BlogInterviewTips />} />
        <Route path="/blog-resume-tips" element={<BlogResumeTips />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog-details" element={<BlogDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
