import { Route, Routes } from "react-router";
import Location from "./pages/Location.tsx";
import Home from "./pages/Home.tsx";
import JobCategories from "./pages/JobCategories.tsx";

import JobCategoryDetails from "./pages/JobCategoryDetails.tsx";
import Recruiters from "./pages/Recruiters.tsx";
import RecruiterDetails from "./pages/RecruiterDetails.tsx";
import CompaniesDetails from "./pages/CompaniesDetails.tsx";
import Companies from "./pages/Companies.tsx";
import Applicants from "./pages/Applicants.tsx";
import ApplicantDetails from "./pages/ApplicantDetails.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/location" element={<Location />} />
      <Route path="/job-categories" element={<JobCategories />} />
      <Route path="/job-categories/:id" element={<JobCategoryDetails />} />
      <Route path="/recruiters" element={<Recruiters />} />
      <Route path="/recruiters/:id" element={<RecruiterDetails />} />
      <Route path="/companies/:id" element={<CompaniesDetails />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/applicants" element={<Applicants />}></Route>
      <Route path="/applicant/:id" element={<ApplicantDetails />}></Route>


    </Routes>
  );
}

// TODO: Test remaining for Recruiters, Companies.
export default App;
